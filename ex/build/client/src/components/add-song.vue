<template>
    <transition name="slide">
        <div class="add-song" v-show="showFlag" @click.stop>
            <div class="header">
                <h1 class="title">添加歌曲到列表</h1>
                <div class="close" @click="hide">
                    <i class="icon-close"></i>
                </div>
            </div>
            <div class="search-box-wrapper">
                <search-box ref="searchBox" placeholder="搜索歌曲" @query="onQueryChange"></search-box>
            </div>
            <div class="shortcut" v-show="!query">
                <switches :switches="switches" :currentIndex="currentIndex" @switch="switchItem"></switches>
                <div class="list-wrapper">
                    <scroll class="list-scroll" :data="playHistory" v-if="currentIndex==0" ref="songList">
                        <div class="list-inner">
                            <song-list :songs="playHistory" @select="selectSong"></song-list>
                        </div>
                    </scroll>
                    <scroll class="list-scroll"  :data="searchHistory" v-if="currentIndex==1"ref="searchList" :refreshDelay="refreshDelay">
                        <div class="list-inner">
                            <search-list @delete="deleteSearchHistory" @select="addQuery" :searches="searchHistory"></search-list>
                        </div>
                    </scroll>
                </div>
            </div>
            <div class="search-result" v-show="query">
                <suggest :query="query" :showSinger="showSinger" @select="selectSuggest" @listScroll="blurInput"></suggest>
            </div>
            <top-tip ref="topTip">
                <div class="tip-title">
                    <i class="icon-ok"></i>
                    <span class="text">1首歌曲已经添加到播放列表</span>
                </div>
            </top-tip>
        </div>
    </transition>
</template>

<script>
  import SearchBox from '../base/search-box'
  import SongList from '../base/song-list'
  import SearchList from '../base/search-list'
  import Scroll from '../base/scroll'
  import Switches from '../base/switches'
  import TopTip from '../base/top-tip'
  import Suggest from './suggest'
  import Song from '../assets/js/song'
  import {mapGetters, mapActions} from 'vuex'
  import {searchMixin} from '../assets/js/mixin'

  export default {
    mixins: [searchMixin],
    data() {
      return {
        showFlag: false,
        showSinger: false,
        currentIndex: 0,
        switches: [{name: '最近播放'}, {name: '搜索历史'}]
      }
    },
    computed: {
      ...mapGetters([
        'playHistory'
      ])
    },
    methods: {
      show() {
        this.showFlag = true
        setTimeout(() => {
          if(this.currentIndex==0){
            this.$refs.songList.refresh()
          }else{
            this.$refs.searchList.refresh()
          }
        }, 20)
      },
      hide() {
        this.showFlag = false
      },
      selectSuggest() {
        this.saveSearch()
        this.showTip()
      },
      switchItem(index) {
        this.currentIndex = index
      },
      selectSong(song, index) {
        if (index !== 0) {
          this.insertSong(new Song(song))
          this.showTip()
        }
      },
      showTip(){
        this.$refs.topTip.show()
      },
      ...mapActions([
        'insertSong'
      ])
    },
    components: {
      SearchBox,
      SongList,
      SearchList,
      Scroll,
      Switches,
      TopTip,
      Suggest
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .add-song {
        position: fixed;
        top: 0;
        bottom: 0;
        width: 100%;
        z-index: 200;
        background: url("../assets/img/bg3.png") no-repeat center/cover;
        &.slide-enter-active, &.slide-leave-active {
            transition: all 0.3s
        }
        &.slide-enter, &.slide-leave-to {
            transform: translate3d(100%, 0, 0)
        }
        .header {
            position: relative;
            padding: 0.1rem 0.3rem;
            height: .4rem;
            text-align: center;
            .title {
                line-height: .6rem;
                font-size: .3rem;
                color: white;
            }
            .close {
               position: absolute;
                right: 0.4rem;
                top:0.2rem;
                .icon-close {
                    display: block;
                    padding: 10px;
                    font-size: 20px;
                    color: white;
                }
            }
        }
        .search-box-wrapper {
            margin: 20px 30px
        }
        .shortcut {
            .list-wrapper {
                position: absolute;
                top: 200px;
                bottom: 0;
                width: 100%;
                .list-scroll {
                    height: 100%;
                    overflow: hidden;
                    .list-inner {
                        padding: 20px 30px
                    }
                }
            }

        }
        .search-result {
            position: fixed;
            top: 124px;
            bottom: 0;
            width: 100%;
        }

        .tip-title {
            text-align: center;
            padding: 18px 0;
            font-size: 0;
            .icon-ok {
                font-size: 24px;
                color: green;
                margin-right: 4px
            }

            .text {
                font-size: 24px;
                color: white;
            }

        }

    }
</style>
