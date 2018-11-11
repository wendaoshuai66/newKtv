<template>
    <div class="search">
        <div class="search-box-wrapper">
            <search-box ref="searchBox" @query="onQueryChange"></search-box>
        </div>
        <div class="shortcut-wrapper" v-show="!query" ref="shortcutwrapper">
            <scroll class="shortcut" :data="shortcut" ref="shortcut" :refreshDelay="refreshDelay">
                <div>
                    <div class="hot-key">
                        <div class="title">热门搜索</div>
                        <ul>
                            <li class="item" v-for="item in hotKey" @click="addQuery(item.k)" :key="item.key">
                                <span>{{item.k}}</span>
                            </li>
                        </ul>
                    </div>
                    <div class="search-history" v-show="searchHistory.length">
                        <h1 class="title">
                            <span class="text">搜索历史</span>
                            <span class="clear" @click="showConfirm">
                            <i class="icon-clear"></i>
                        </span>
                        </h1>
                        <search-list @select="addQuery" @delete="deleteSearchHistory" :searches="searchHistory"></search-list>
                    </div>
                </div>
            </scroll>
        </div>
        <div class="search-result" v-show="query" ref="searchresult">
            <suggest :query="query" @listScroll="blurInput" @select="saveSearch" ref="suggest"></suggest>
        </div>
        <confirm ref="confirm" text="是否清空所有搜索历史" @confirm="clearSearchHistory"></confirm>
        <router-view></router-view>
    </div>
</template>

<script>
  import SearchBox from '../base/search-box.vue'
  import SearchList from '../base/search-list.vue'
  import Suggest from './suggest.vue'
  import Confirm from '../base/confirm.vue'
  import Scroll from '../base/scroll.vue'
  import {getHotKey} from '../api/search'
  import {ERR_OK} from '../api/config'
  import {playlistMixin,searchMixin} from '../assets/js/mixin'
  import {mapActions} from 'vuex'

  export default {
    mixins:[playlistMixin,searchMixin],
    data() {
      return {
        hotKey: [],
      }
    },
    computed:{
      shortcut(){
        return this.hotKey.concat(this.searchHistory)
      },
    },
    created() {
      this._getHotKey()
    },
    methods: {
      handlePlaylist(playlist){
        const bottom=playlist.length>0?"0.9rem":""
        this.$refs.shortcutwrapper.style.bottom=bottom
        this.$refs.searchresult.style.bottom=bottom
        this.$refs.shortcut.refresh()
        this.$refs.suggest.refresh()
      },
      _getHotKey() {
        getHotKey().then(res => {
          if (res.code == ERR_OK) {
            this.hotKey = res.data.hotkey.slice(0, 12)
          }
        })
      },
      showConfirm(){
        this.$refs.confirm.show()
      },
      ...mapActions([
        'clearSearchHistory'
      ])
    },
    watch:{
      query(newquery){
        if(!newquery){
          setTimeout(()=>{
            this.$refs.shortcut.refresh()
          },20)
        }
      }
    },
    components: {
      SearchBox,
      Suggest,
      SearchList,
      Confirm,
      Scroll,
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .search {
        .search-box-wrapper {
            margin: 0.2rem 0.3rem;
        }
        .shortcut-wrapper {
            position: fixed;
            top: 2.2rem;
            bottom: 0;
            width: 100%;
            .shortcut {
                height: 100%;
                overflow: hidden;
                .hot-key {
                    padding: 0 20px 20px 20px;
                    .title {
                        margin-bottom: 20px;
                        padding-left: 0.3rem;
                        box-sizing: border-box;
                        font-size: 0.26rem;
                        color: white;
                        text-align: left;
                    }
                    ul{
                        display: flex;
                        flex-wrap: wrap;
                        .item {
                            display: inline-block;
                            padding: .1rem .3rem;
                            margin: .1rem .2rem;
                            border-radius: 1rem;
                            background: #3AB7FF;
                            font-size: 0.24rem;
                            color: white;
                        }
                    }
                }
                .search-history {
                    position: relative;
                    margin: 0 .3rem;
                    .title {
                        text-align: left;
                        padding-left: 0.2rem;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        height: .5rem;
                        font-size: 0.28rem;
                        color: rgba(0, 0, 0, 0.85);
                        .text {
                            flex: 1
                        }
                        .clear {
                            .icon-clear {
                                font-size: 0.24rem;
                                color: #ccc;
                            }
                        }
                    }
                }
            }
        }
        .search-result {
            position: fixed;
            width: 100%;
            top: 18%;
            bottom: 0;
            background: white;
        }
    }
</style>
