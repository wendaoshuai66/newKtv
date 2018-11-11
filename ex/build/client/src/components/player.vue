<template>
    <div class="player" v-show="playList.length>0">
        <transition name="normal"
                    @enter="enter"
                    @after-enter="afterEnter"
                    @leave="leave"
                    @after-leave="afterLeave">
            <!--全屏播放-->
            <div class="normal-player" v-show="fullScreen">
                <!--背景模糊-->
                <div class="background">
                    <img :src="currentSong.image" alt="" width="100%" height="100%">
                </div>
                <!--顶部-->
                <div class="top">
                    <div class="back" @click="back"></div>
                    <h1 class="title" v-html="currentSong.name"></h1>
                    <h2 class="subtitle" v-html="currentSong.singer"></h2>
                </div>
                <!--唱片-->
                <div class="middle"
                     @touchstart.prevent="middleTouchStart"
                     @touchmove.prevent="middleTouchMove"
                     @touchend="middleTouchEnd">
                    <div class="middle-l" ref="middleL">
                        <div class="cd-wrapper" ref="cdWrapper">
                            <div class="cd" :class="cdCls">
                                <img class="image" :src="currentSong.image">
                            </div>
                        </div>
                        <div class="playing-lyric-wrapper">
                            <div class="playing-lyric">
                                {{playingLyric}}
                            </div>
                        </div>
                    </div>
                    <!--歌词滚动-->
                    <scroll class="middle-r" ref="lyriclist" :data="currentLyric && currentLyric.lines">
                        <div class="lyric-wrapper">
                            <div v-if="currentLyric">
                                <p ref="lyricLine"
                                   class="text"
                                   v-for="(line, index) in currentLyric.lines"
                                   :key="line.key"
                                   :class="{'current': currentLineNum === index}">
                                    {{line.txt}}
                                </p>
                            </div>
                        </div>
                    </scroll>
                    <div class="middle-b">
                        <div class="dot-wrapper">
                            <span class="dot" :class="{'active':currentShow==='cd'}"></span>
                            <span class="dot" :class="{'active':currentShow==='lyric'}"></span>
                        </div>
                    </div>
                </div>
                <!--底部控制-->
                <div class="bottom">
                    <div class="progress-wrapper">
                        <span class="time time-l">{{format(currentTime)}}</span>
                        <div class="progress-bar-wrapper">
                            <progress-bar :percent="percent" @percentChange="onProgressBarChange"></progress-bar>
                        </div>
                        <span class="time time-r">{{format(currentSong.duration)}}</span>
                    </div>
                    <div class="operators">
                        <div class="icon i-left2" @click.stop="showPlaylist">
                            <i class="icon-playlist"></i>
                        </div>
                        <div class="icon i-left" :class="disableCls">
                            <i @click="prev" class="icon-prev"></i>
                        </div>
                        <div class="icon i-center" :class="disableCls">
                            <i @click="togglePlaying" :class="playIcon"></i>
                        </div>
                        <div class="icon i-right" :class="disableCls">
                            <i @click="next" class="icon-next"></i>
                        </div>
                        <div class="icon i-right2">
                            <i @click="toggleFavorite(currentSong)" :class="getFavoriteIcon(currentSong)"></i>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!--播放页面小屏 底部-->
        <transition class="mini">
            <div class="mini-player" v-show="!fullScreen" @click="open">
                <div class="icon">
                    <img :class="cdCls" width="55" height="55" :src="currentSong.image">
                </div>
                <div class="text">
                    <h2 class="name" v-html="currentSong.name"></h2>
                    <p class="desc" v-html="currentSong.singer"></p>
                </div>
                <div class="control">
                    <progress-circle :radius="radius" :percent="percent">
                        <i @click.stop.prevent="togglePlaying" class="icon-mini" :class="miniIcon"></i>
                    </progress-circle>
                </div>
                <div class="control" @click.stop="showPlaylist">
                    <i class="icon-playlist"></i>
                </div>
            </div>
        </transition>
        <play-list ref="playlist"></play-list>
        <audio :src="currentSong.url" ref="audio" @play="ready" @error="error" @timeupdate="updateTime" @ended="end">
            暂不支持播放
        </audio>
    </div>
</template>

<script>
  import {mapGetters, mapMutations, mapActions} from 'vuex'
  import animations from 'create-keyframe-animation'
  import Lyric from 'lyric-parser'
  import {prefixStyle} from '../assets/js/dom'
  import {playMode} from '../assets/js/config'
  import {shuffle} from '../assets/js/util'
  import ProgressBar from '../base/progress-bar.vue'
  import ProgressCircle from '../base/progress-circle.vue'
  import Scroll from '../base/scroll.vue'
  import PlayList from './play-list.vue'
  import {playerMixin} from '../assets/js/mixin'

  const transform = prefixStyle('transform')
  const transitionDuration = prefixStyle('transitionDuration')
  export default {
    mixins: [playerMixin],
    data() {
      return {
        songReady: false,
        currentTime: 0,
        radius: 60,
        currentLyric: null,
        currentLineNum: 0,
        currentShow: 'cd',
        playingLyric: '暂无歌词'
      }
    },
    created() {
      this.touch = {}
    },
    // 填充歌曲信息 控制歌曲播放
    computed: {
      cdCls() {
        return this.playing ? 'play' : 'play pause'
      },
      playIcon() {
        return this.playing ? 'icon-pause' : 'icon-play'
      },
      miniIcon() {
        return this.playing ? 'icon-pause-mini' : 'icon-play-mini'
      },
      disableCls() {
        return this.songReady ? '' : "disable"
      },
      percent() {
        return this.currentTime / this.currentSong.duration
      },
      ...mapGetters([
        'fullScreen',
        'playing',
        'currentIndex',
      ])
    },
    watch: {
      currentSong(newsong, oldsong) {
        // 当列表没有歌曲时 直接return
        if (!newsong.id) {
          return
        }
        // 防止歌词切换跳动
        if (newsong.id == oldsong.id) {
          return
        }
        if (this.currentLyric) {
          this.currentLyric.stop()
          this.currentTime = 0
          this.playingLyric = ''
          this.currentLineNum = 0
        }
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.$refs.audio.play()
          this.getLyric()
        }, 1000)
      },
      playing(newPlaying) {
        const audio = this.$refs.audio
        this.$nextTick(() => {
          newPlaying ? audio.play() : audio.pause()
        })
      },
      fullScreen(newVal) {
        if (newVal) {
          setTimeout(() => {
            this.$refs.lyriclist.refresh()
          }, 20)
        }
      }
    },
    methods: {
      ...mapMutations({
        setFullScreen: 'SET_FULL_SCREEN',
      }),
      ...mapActions([
        'savePlayHistory'
      ]),
      back() {
        this.setFullScreen(false)
      },
      open() {
        this.setFullScreen(true)
      },
      enter(el, done) {
        const {x, y, scale} = this._getPosAndScale()
        let animation = {
          0: {
            transform: `translate3d(${x}px,${y}px,0) scale(${scale})`
          },
          60: {
            transform: `translate3d(0,0,0) scale(1.1)`
          },
          100: {
            transform: `translate3d(0,0,0) scale(1)`
          }
        }
        animations.registerAnimation({
          name: 'move',
          animation,
          presets: {
            duration: 500,
            easing: 'linear'
          }
        })
        animations.runAnimation(this.$refs.cdWrapper, 'move', done)
      },
      afterEnter() {
        animations.unregisterAnimation('move')
        this.$refs.cdWrapper.style.animation = ''
      },
      leave(el, done) {
        this.$refs.cdWrapper.style.transition = 'all 0.5s'
        const {x, y, scale} = this._getPosAndScale()
        this.$refs.cdWrapper.style[transform] = `translate3d(${x}px,${y}px,0) scale(${scale})`
        this.$refs.cdWrapper.addEventListener('transitionend', done)
      },
      afterLeave() {
        this.$refs.cdWrapper.style.transition = ''
        this.$refs.cdWrapper.style[transform] = ''
      },

      _getPosAndScale() {
        const targetWidth = 40
        const paddingLeft = 40
        const paddingBottom = 30
        const paddingTop = 80
        const Width = window.innerWidth * 0.8
        const scale = targetWidth / Width
        const x = -(window.innerWidth / 2 - paddingLeft)
        const y = (window.innerHeight - paddingTop - Width / 2 - paddingBottom)
        return {x, y, scale}
      },
      togglePlaying() {
        if (!this.songReady) {
          return
        }
        this.setPlayingState(!this.playing)
        if (this.currentLyric) {
          this.currentLyric.togglePlay()
        }
      },
      prev() {
        if (!this.songReady) {
          return
        }
        if (this.playList.length == 1) {
          this.loop()
          return
        } else {
          let index = this.currentIndex - 1
          if (index == -1) {
            index = this.playList.length - 1
          }
          this.setCurrentIndex(index)
          if (!this.playing) {
            this.togglePlaying()
          }
        }
        this.songReady = false
      },
      next() {
        if (!this.songReady) {
          return
        }
        // 列表只有一首歌曲则单曲循环
        if (this.playList.length == 1) {
          this.loop()
        } else {
          let index = this.currentIndex + 1
          if (index == this.playList.length) {
            index = 0
          }
          this.setCurrentIndex(index)
          if (!this.playing) {
            this.togglePlaying()
          }
          this.songReady = false
        }

      },
      loop() {
        this.$refs.audio.currentTime = 0
        this.$refs.audio.play()
        // 循环播放 歌词回到开始的时候
        if (this.currentLyric) {
          this.currentLyric.seek(0)
        }
      },
      end() {
        if (this.mode == playMode.loop) {
          this.loop()
        } else {
          this.next()
        }
      },
      // 防止快速点击 产生错误
      ready() {
        this.songReady = true
        this.savePlayHistory(this.currentSong)
      },
      error() {
        this.songReady = true
      },
      updateTime(e) {
        this.currentTime = e.target.currentTime
      },
      format(interval) {
        interval = interval | 0
        const minute = interval / 60 | 0
        const second = this._pad(interval % 60)
        return `${minute}:${second}`
      },
      onProgressBarChange(percent) {
        const currentTime = this.currentSong.duration * percent
        this.$refs.audio.currentTime = currentTime
        if (!this.playing) {
          this.togglePlaying()
        }
        if (this.currentLyric) {
          this.currentLyric.seek(currentTime * 1000)
        }
      },
      getLyric() {
        this.currentSong.getLyric().then((lyric) => {
          if (this.currentSong.lyric !== lyric) {
            return
          }
          this.currentLyric = new Lyric(lyric, this.handleLyric)
          if (this.playing) {
            this.currentLyric.play()
          }
        }).catch(() => {
          this.currentLyric = null
          this.playingLyric = ""
          this.currentLineNum = 0
        })
      },
      handleLyric({lineNum, txt}) {
        this.currentLineNum = lineNum
        if (lineNum > 5) {
          let lineEl = this.$refs.lyricLine[lineNum - 5]
          this.$refs.lyriclist.scrollToElement(lineEl, 1000)
        } else {
          this.$refs.lyriclist.scrollTo(0, 0, 1000)
        }
        this.playingLyric = txt
      },
      middleTouchStart(e) {
        this.touch.initiated = true
        // 用来判断是否是一次移动
        this.touch.moved = false
        const touch = e.touches[0]
        this.touch.startX = touch.pageX
        this.touch.startY = touch.pageY
      },
      middleTouchMove(e) {
        // 没有touchstart 返回
        if (!this.touch.initiated) {
          return
        }
        const touch = e.touches[0]
        const deltaX = touch.pageX - this.touch.startX
        const deltaY = touch.pageY - this.touch.startY
        // y轴距离大于x轴距离 => 纵向滚动 => 返回
        if (Math.abs(deltaY) > Math.abs(deltaX)) {
          return
        }
        if (!this.touch.moved) {
          this.touch.moved = true
        }
        const left = this.currentShow == 'cd' ? 0 : -window.innerWidth
        const offsetwidth = Math.min(0, Math.max(-window.innerWidth, left + deltaX))
        this.touch.percent = Math.abs(offsetwidth / window.innerWidth)
        this.$refs.lyriclist.$el.style[transform] = `translate3d(${offsetwidth}px,0,0)`
        this.$refs.lyriclist.$el.style[transitionDuration] = 0
        this.$refs.middleL.style.opacity = 1 - this.touch.percent
        this.$refs.middleL.style[transitionDuration] = 0
      },
      middleTouchEnd() {
        if (!this.touch.moved) {
          return
        }
        let offsetwidth
        let opacity
        if (this.currentShow == 'cd') {
          if (this.touch.percent > 0.1) {
            offsetwidth = -window.innerWidth
            this.currentShow = 'lyric'
            opacity = 0
          } else {
            offsetwidth = 0
            opacity = 1
          }
        } else {
          if (this.touch.percent < 0.9) {
            offsetwidth = 0
            this.currentShow = 'cd'
            opacity = 1
          } else {
            offsetwidth = -window.innerWidth
            opacity = 0
          }
        }
        const time = 300
        this.$refs.lyriclist.$el.style[transform] = `translate3d(${offsetwidth}px,0,0)`
        this.$refs.lyriclist.$el.style[transitionDuration] = `${time}ms`
        this.$refs.middleL.style.opacity = opacity
        this.$refs.middleL.style[transitionDuration] = `${time}ms`
        this.touch.initiated = false
      },
      showPlaylist() {
        this.$refs.playlist.show()
      },
      _pad(num, n = 2) {
        let len = num.toString().length
        while (len < n) {
          num = "0" + num,
            len++
        }
        return num
      }
    },
    components: {
      ProgressBar,
      ProgressCircle,
      Scroll,
      PlayList
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .player {
        .normal-player {
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            position: fixed;
            z-index: 150;
            background: url("../assets/img/bg4.jpg") no-repeat center/cover;
            .background {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                z-index: -1;
                opacity: 0.6;
                filter: blur(20px);
            }
            .top {
                position: relative;
                margin-top: 3%;
                margin-bottom: 0.3rem;
                .back {
                    position: absolute;
                    top: 0;
                    left: 0.3rem;
                    z-index: 50;
                    width: .4rem;
                    height: .4rem;
                    background: url("../assets/img/icon_03.png") no-repeat center/cover;
                }
                .title {
                    width: 70%;
                    margin: 0 auto;
                    line-height: 40px;
                    text-align: center;
                    white-space: nowrap;
                    font-size: 0.32rem;
                    color: white;
                }
                .subtitle {
                    line-height: 0.24rem;
                    text-align: center;
                    font-size: 0.24rem;
                    color: white;
                }
            }
            .middle {
                position: fixed;
                width: 100%;
                top: 1.4rem;
                bottom: 3rem;
                white-space: nowrap;
                font-size: 0;
                .middle-l {
                    display: inline-block;
                    vertical-align: top;
                    position: relative;
                    width: 100%;
                    height: 0;
                    padding-top: 80%;
                    .cd-wrapper {
                        position: absolute;
                        left: 10%;
                        top: 0;
                        width: 80%;
                        height: 100%;
                        .cd {
                            width: 100%;
                            height: 100%;
                            box-sizing: border-box;
                            border: 10px solid rgba(255, 255, 255, 0.1);
                            border-radius: 50%;
                            &.play {
                                animation: rotate 20s linear infinite;
                            }
                            &.pause {
                                animation-play-state: paused;
                            }
                            .image {
                                position: absolute;
                                left: 0;
                                top: 0;
                                width: 100%;
                                height: 100%;
                                border-radius: 50%;
                            }

                        }
                    }
                    .playing-lyric-wrapper {
                        width: 80%;
                        margin: 0.5rem auto 0;
                        overflow: hidden;
                        text-align: center;
                        .playing-lyric {
                            height: 0.26rem;
                            line-height: 0.26rem;
                            font-size: 0.26rem;
                            color: white;
                        }

                    }

                }
                .middle-r {
                    display: inline-block;
                    vertical-align: top;
                    width: 100%;
                    height: 95%;
                    overflow: hidden;
                    .lyric-wrapper {
                        width: 80%;
                        margin: 0 auto;
                        overflow: hidden;
                        text-align: center;
                    }
                    .text {
                        line-height: 0.5rem;
                        color: #d9d9d9;
                        font-size: 0.28rem;
                        &.current {
                            color: white;
                            font-size: 0.36rem;
                            line-height: 0.6rem;
                        }
                    }

                }
                .middle-b {
                    position: absolute;
                    bottom: 0;
                    width: 100%;
                    .dot-wrapper {
                        text-align: center;
                        font-size: 0;
                    }
                    .dot {
                        display: inline-block;
                        vertical-align: middle;
                        margin: 0 4px;
                        width: .1rem;
                        height: .1rem;
                        border-radius: 50%;
                        background: #d9d9d9;
                        &.active {
                            width: .2rem;
                            border-radius: 0.05rem;
                            background: white;
                        }
                    }
                }
            }
            .bottom {
                position: absolute;
                bottom: 0;
                width: 100%;
                padding: 0.7rem 0 0.5rem;
                background: url("../assets/img/player_03.png") no-repeat top/cover;
                .progress-wrapper {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    width: 80%;
                    height: 0.4rem;
                    margin: auto;
                    padding: .1rem 0;
                    .time {
                        color: #575861;
                        font-size: 0.2rem;
                        line-height: .4rem;
                        display: block;
                        &.time-l {
                            text-align: left
                        }
                        &.time-r {
                            text-align: right
                        }
                    }
                    .progress-bar-wrapper {
                        flex: 1
                    }
                }
                .operators {
                    display: flex;
                    align-items: center;
                    justify-content: space-around;
                    .icon {
                        width: .9rem;
                        height: .9rem;
                        border-radius: 50%;
                        color: white;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        &.disable {
                            background: #ccc;
                        }
                        i {
                            display: block;
                            font-size: 0.6rem
                        }
                    }
                    .i-left, .i-right {
                        background: #31d6ff;
                    }
                    .i-left2 {
                        background: #ffcc31;
                    }
                    .i-center {
                        width: 1.1rem;
                        height: 1.1rem;
                        background: #af31ff;
                        i {
                            font-size: 0.8rem
                        }
                    }
                    .i-right2 {
                        background: #ff6b31;
                    }
                    .icon-favorite {
                        color: red;
                    }
                }

            }
            &.normal-enter-active, &.normal-leave-active {
                transition: all 0.4s;
                .top, .bottom {
                    transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
                }
            }
            &.normal-enter, &.normal-leave-to {
                opacity: 0;
                .top {
                    transform: translate3d(0, -100px, 0)
                }
                .bottom {
                    transform: translate3d(0, 100px, 0)
                }

            }
        }
        .mini-player {
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: fixed;
            left: 0;
            bottom: 0;
            z-index: 180;
            width: 100%;
            height: 0.9rem;
            background: #fbfbfb;
            border-top: #5a5a5a;
            &.mini-enter-active, &.mini-leave-active {
                transition: all 0.4s
            }
            &.mini-enter, &.mini-leave-to {
                opacity: 0
            }
            .icon {
                width: 60px;
                height: 60px;
                padding: 0 0.3rem;
                img {
                    display: block;
                    border-radius: 50%;
                    &.play {
                        animation: rotate 10s linear infinite
                    }

                    &.pause {
                        animation-play-state: paused
                    }
                }
            }
            .text {
                display: flex;
                flex-direction: column;
                justify-content: center;
                flex: 1;
                line-height: 0.3rem;
                overflow: hidden;
                .name {
                    margin-bottom: 0.05rem;
                    white-space: nowrap;
                    font-size: 0.24rem;
                    color: black;
                }
                .desc {
                    white-space: nowrap;
                    font-size: 0.18rem;
                    color: #404040;
                }
            }
            .control {
                width: 0.6rem;
                height: 0.6rem;
                padding: 0 .2rem;
                .icon-play-mini, .icon-pause-mini, .icon-playlist {
                    font-size: 0.58rem;
                    color: #ff318d;
                    display: block;
                }
                .icon-mini {
                    font-size: 0.58rem;
                    position: absolute;
                    left: 0.01rem;
                    top: 0.01rem;
                    color: #ff318d;
                    display: block;
                }
            }
        }
        @keyframes rotate {
            0% {
                transform: rotate(0)
            }

            100% {
                transform: rotate(360deg)
            }
        }
    }
</style>
