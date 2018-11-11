<template>
    <transition name="list-fade">
        <div class="playlist" v-show="showFlag" @click="hide">
            <div class="list-wrapper" @click.stop>
                <div class="list-header">
                    <div class="title">
                        <i class="icon" :class="iconMode" @click="changeMode"></i>
                        <span class="text">
                            <p class="p1">{{modetext}}</p>
                            <p class="p2">({{sequenceList.length}}首)</p>
                        </span>
                        <span class="clear" @click="showConfirm">
                            <i class="icon-clear"></i>
                        </span>
                    </div>
                </div>
                <scroll class="list-content" :data="sequenceList" ref="listcontent" :refreshDelay="refreshDelay">
                    <transition-group name="list" tag="ul" ref="list">
                        <li class="item" v-for="(item,index) in sequenceList" :key="item.id"
                            @click="selectItem(item,index)" ref="listitem">
                            <i class="current" :class="getCurrentIcon(item)"></i>
                            <span class="text" :class="{'active':item.id == currentSong.id}">{{item.name}}</span>
                            <span class="like" @click.stop="toggleFavorite(item)">
                                <i :class="getFavoriteIcon(item)"></i>
                            </span>
                            <span class="delete" @click.stop="deleteOne(item)">
                            <i class="icon-delete"></i>
                        </span>
                        </li>
                    </transition-group>
                </scroll>
                <div class="list-operate">
                    <div class="add" @click="addSong">
                        <i class="icon-add"></i>
                        <span class="text">添加歌曲到队列</span>
                    </div>
                </div>
                <div class="list-close" @click="hide">
                    <span>关闭</span>
                </div>
            </div>
            <confirm ref="confirm" @confirm="confirmClear" text="是否清空播放列表" confirmBtnText="清空"></confirm>
            <add-song ref="addsong"></add-song>
        </div>
    </transition>
</template>

<script>
  import Scroll from '../base/scroll.vue'
  import Confirm from '../base/confirm.vue'
  import AddSong from './add-song.vue'
  import {mapActions} from 'vuex'
  import {playMode} from '../assets/js/config'
  import {playerMixin} from '../assets/js/mixin'

  export default {
    mixins: [playerMixin],
    data() {
      return {
        showFlag: false,
        refreshDelay: 120
      }
    },
    computed: {
      modetext() {
        return this.mode === playMode.sequence ? '顺序播放' : this.mode === playMode.loop ? '单曲循环' : '随机播放'
      }
    },
    methods: {
      show() {
        this.showFlag = true
        setTimeout(() => {
          this.$refs.listcontent.refresh()
          this.scrollToCurrent(this.currentSong)
        }, 20)
      },
      hide() {
        this.showFlag = false
      },
      getCurrentIcon(item) {
        return item.id == this.currentSong.id ? 'icon-play' : ''
      },
      selectItem(item, index) {
        if (this.mode == playMode.random) {
          index = this.playList.findIndex((song) => {
            return song.id == item.id
          })
        }
        this.setCurrentIndex(index)
        this.setPlayingState(true)
      },
      scrollToCurrent(current) {
        const index = this.sequenceList.findIndex((song) => {
          return current.id == song.id
        })
        this.$refs.listcontent.scrollToElement(this.$refs.listitem[index], 300)
      },
      deleteOne(item) {
        this.deleteSong(item)
        if (!this.playList.length) {
          this.hide()
        }
      },
      showConfirm() {
        this.$refs.confirm.show()
      },
      confirmClear() {
        this.deleteSongList()
        this.hide()
      },
      addSong() {
        this.$refs.addsong.show()
      },
      ...mapActions([
        'deleteSong',
        'deleteSongList',
      ])
    },
    watch: {
      currentSong(newsong, oldsong) {
        if (!this.showFlag || newsong.id == oldsong.id) {
          return
        } else {
          setTimeout(() => {
            this.scrollToCurrent(newsong)
          }, 20)
        }
      },
    },
    components: {
      Scroll,
      Confirm,
      AddSong
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .playlist {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 200;
        background-color: rgba(0, 0, 0, 0.25);
        &.list-fade-enter-active, &.list-fade-leave-active {
            transition: opacity 0.3s;
            .list-wrapper {
                transition: all 0.3s
            }
        }
        &.list-fade-enter, &.list-fade-leave-to {
            opacity: 0;
            .list-wrapper {
                transform: translate3d(0, 100%, 0)
            }
        }
        .list-wrapper {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            background-color: rgba(0, 0, 0, 0.65);
            .list-header {
                padding: 0.2rem 0.3rem;
                .title {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    color: #ccc;
                    font-size: 0.28rem;
                    .icon {
                        color: white;
                    }
                    .text {
                        color: white;
                        p{
                            display: inline-block;
                        }
                        .p2{
                            color: #ccc;
                        }
                    }
                    .icon-clear {
                        color: #ccc;
                    }
                }
            }
            .list-content {
                padding: .1rem 0.3rem;
                max-height: 240px;
                overflow: hidden;
                .item {
                    display: flex;
                    align-items: center;
                    height: 0.5rem;
                    overflow: hidden;
                    font-size: .24rem;
                    &.list-enter-active, &.list-leave-active {
                        transition: all 0.1s
                    }

                    &.list-enter, &.list-leave-to {
                        height: 0
                    }
                    .current {
                        flex: 0 0 20px;
                        width: 24px;
                        color: #ff318d;
                    }
                    .text {
                        flex: 1;
                        color: white;
                        &.active {
                            color: #ff318d;
                        }
                    }
                    .like {
                        margin-right: .2rem;
                        color: gold;
                        .icon-favorite {
                            color: red;
                        }
                    }
                    .delete {
                        color: #ccc;
                    }

                }

            }
            .list-operate {
                margin: 30px auto 30px auto;
                display: flex;
                justify-content: center;
                align-items: center;
                .add {
                    display: flex;
                    align-items: center;
                    padding: 8px 16px;
                    border: 2px solid white;
                    border-radius: 100px;
                    color: white;
                    .icon-add {
                        margin-right: .1rem;
                        font-size: .2rem;
                    }
                    .text {
                        font-size: .2rem;
                    }
                }
            }
            .list-close {
                border-top: 0.02rem solid #ccc;
                height: .8rem;
                text-align: center;
                line-height: .8rem;
                font-size: 24px;
                color: white;
            }

        }

    }


</style>
