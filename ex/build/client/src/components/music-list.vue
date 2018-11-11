<template>
    <div class="music-list">
        <div class="back" @click="$router.go(-1)"></div>
        <div class="title" v-html="title"></div>
        <div class="bg-image" :style="bgStyle" ref="bgImage">
            <div class="play-wrapper">
                <div class="play" v-show="songs.length>0" ref="play" @click="random">
                    <i class="icon-play"></i>
                    <span class="text">随机播放全部</span>
                </div>
            </div>
            <div class="filter"></div>
            <div class="bot" ref="bot"></div>
        </div>
        <div class="bg-layer" ref="layer">
            <div class="top"></div>
        </div>
        <scroll :data="songs" class="list" ref="list"
                :probe-type="probeType" :listen-scroll="listenScroll"
                @scroll="scroll">
            <div class="song-list-wrapper">
                <song-list :songs="songs" :rank="rank" @select="selectItem"></song-list>
            </div>
            <div class="loading-container" v-show="!songs.length">
                <loading></loading>
            </div>
        </scroll>
    </div>
</template>

<script>
  import Scroll from '../base/scroll'
  import SongList from '../base/song-list'
  import Loading from '../base/loading'
  import {prefixStyle} from '../assets/js/dom'
  import {mapActions} from 'vuex'
  import {playlistMixin} from '../assets/js/mixin'

  const RESERVED_HEIGHT = 120
  const transform = prefixStyle('transform')
  export default {
    mixins:[playlistMixin],
    props: {
      bgImage: {
        type: String,
        default: ''
      },
      songs: {
        type: Array,
        default: []
      },
      title: {
        type: String,
        default: ''
      },
      rank: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scrollY: 0
      }
    },
    computed: {
      bgStyle() {
        return `background-image:url(${this.bgImage})`
      }
    },
    created() {
      this.probeType = 3
      this.listenScroll = true
    },
    mounted() {
      this.imageHeight = this.$refs.bgImage.clientHeight
      this.minTranslateY = -this.imageHeight + RESERVED_HEIGHT
      this.$refs.list.$el.style.top = `${this.imageHeight}px`
    },
    methods: {
      handlePlaylist(playList){
        const bottom=playList.length>0?"0.9rem":""
        this.$refs.list.$el.style.bottom=bottom
        this.$refs.list.refresh()
      },
      scroll(pos) {
        this.scrollY = pos.y
      },
      selectItem(item, index) {
        this.selectPlay({
          list: this.songs,
          index
        })
      },
      random(){
        this.randomPlay({
          list:this.songs
        })
      },
      ...mapActions([
        'selectPlay',
        'randomPlay'
      ])
    },

    watch: {
      scrollY(newY) {
        let zIndex = 0
        let scale = 1
        let translateY = Math.max(this.minTranslateY, newY)
        const percent = Math.abs(newY / this.imageHeight)
        if (newY > 0) {
          scale = 1 + percent
          zIndex = 10
        }
        this.$refs.layer.style[transform] = `translate3d(0,${translateY}px,0)`
        if (newY < translateY) {
          zIndex = 10
          this.$refs.bgImage.style.paddingTop = 0
          this.$refs.bgImage.style.height = `120px`
          this.$refs.play.style.display = 'none'
          this.$refs.bot.style.display = 'block'
          this.$refs.bgImage.style.zIndex = zIndex
        } else {
          this.$refs.bgImage.style.paddingTop = `70%`
          this.$refs.bgImage.style.height = 0
          this.$refs.play.style.display = ''
          this.$refs.bot.style.display = 'none'
          this.$refs.bgImage.style.zIndex = 0
        }
        this.$refs.bgImage.style[transform] = `scale(${scale})`
      }
    },
    components: {
      Scroll,
      SongList,
      Loading
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .music-list {
        position: fixed;
        z-index: 100;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: white;
        .back {
            width: .4rem;
            height: .4rem;
            position: absolute;
            top: .2rem;
            left: .2rem;
            z-index: 50;
            background: url("../assets/img/icon_03.png") no-repeat center/cover;
        }
        .title {
            position: absolute;
            top: .2rem;
            left: 10%;
            z-index: 40;
            width: 80%;
            text-align: center;
            line-height: 40px;
            font-size: 0.34rem;
            color: white;
            font-weight: bold;
        }
        .bg-image {
            position: relative;
            width: 100%;
            height: 0;
            padding-top: 70%;
            transform-origin: top;
            background-size: cover;
            .play-wrapper {
                position: absolute;
                bottom: .6rem;
                z-index: 50;
                width: 100%;
                .play {
                    box-sizing: border-box;
                    width: 2.3rem;
                    padding: 0.1rem 0;
                    margin: 0 auto;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border: 0.02rem solid white;
                    color: white;
                    border-radius: 1rem;
                    font-size: 0.24rem;
                    .icon-play {
                        margin-right: .1rem;
                    }
                }
            }
            .filter {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(255, 50, 140, 0.3)
            }
            .bot {
                position: absolute;
                bottom: 0;
                padding-top: 10%;
                width: 100%;
                z-index: 100;
                background: url("../assets/img/simg121.png") no-repeat center/cover;
            }
        }
        .bg-layer {
            position: relative;
            height: 100%;
            background: white;
            .top {
                position: absolute;
                top: -5%;
                padding-top: 10%;
                width: 100%;
                z-index: 100;
                background: url("../assets/img/simg121.png") no-repeat center/cover;
            }
        }
        .list {
            position: fixed;
            top: 0;
            bottom: 0;
            width: 100%;
            .song-list-wrapper {
                box-sizing: border-box;
                padding: 0 .2rem;
            }
            .loading-container {
                position: absolute;
                width: 100%;
                top: 50%;
                transform: translateY(-50%);
            }
        }
    }

</style>
