<template>
    <scroll class="suggest" :data="result"
            :pullUp="pullUp"
            @scrollToEnd="searchMore"
            ref="suggest"
            :beforeScroll="beforeScroll"
            @beforeScroll="listScroll">
        <ul class="suggest-list">
            <li @click=selectItem(item) class="suggest-item" v-for="item in result" :key="item.key">
                <div class="icon">
                    <i :class="getIconCls(item)"></i>
                </div>
                <div class="name">
                    <p class="text" v-html="getDisplayName(item)"></p>
                </div>
            </li>
            <loading v-show="hasMore" title=""></loading>
        </ul>
        <div class="no-result-wrapper" v-show="!hasMore&&!result.length">
            <no-result title="暂无搜索结果"></no-result>
        </div>
    </scroll>
</template>

<script>
  import Scroll from '../base/scroll.vue'
  import Loading from '../base/loading.vue'
  import NoResult from '../base/no-result.vue'
  import {search} from '../api/search'
  import {ERR_OK} from '../api/config'
  import {createSong} from '../assets/js/song'
  import Singer from '../assets/js/singer'
  import {mapMutations} from 'vuex'
  import {mapActions} from 'vuex'

  const TYPE_SINGER = 'singer'
  const PERPAGE = 20
  export default {
    props: {
      query: {
        type: String,
        default: ''
      },
      showSinger: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        page: 1,
        result: [],
        pullUp: true,
        beforeScroll: true,
        hasMore: true,
      }
    },
    methods: {
      search() {
        this.page = 1
        this.$refs.suggest.scrollTo(0, 0)
        this.hasMore = true
        search(this.query, this.page, this.showSinger, PERPAGE).then(res => {
          if (res.code === ERR_OK) {
            this.result = this._genResult(res.data)
            this._checkMore(res.data)
          }
        })
      },
      searchMore() {
        if (!this.hasMore) {
          return
        }
        this.page++
        search(this.query, this.page, this.showSinger, PERPAGE).then(res => {
          if (res.code === ERR_OK) {
            this.result = this.result.concat(this._genResult(res.data))
            this._checkMore(res.data)
          }
        })
      },
      getDisplayName(item) {
        if (item.type == TYPE_SINGER) {
          return item.singer.name
        } else {
          return `${item.name}-${item.singer}`
        }
      },
      getIconCls(item) {
        if (item.type == TYPE_SINGER) {
          return 'icon-mine'
        } else {
          return 'icon-music'
        }
      },
      selectItem(item) {
        if (item.type == TYPE_SINGER) {
          const singer = new Singer({
            id: item.singermid,
            name: item.singername
          })
          this.$router.push({
            path: `/music/search/${singer.id}`
          })
          this.setSinger(singer)
        } else {
          this.insertSong(item)
        }
        this.$emit('select', item)
      },
      listScroll() {
        this.$emit('listScroll')
      },
      refresh() {
        this.$refs.suggest.refresh
      },
      _checkMore(data) {
        const song = data.song
        if (!song.list.length || (song.curnum + song.curpage * PERPAGE) > song.totalnum) {
          this.hasMore = false
        }
      },
      _genResult(data) {
        let ret = []
        if (data.zhida && data.zhida.singerid) {
          ret.push(...data.zhida, ...{type: TYPE_SINGER})
        }
        if (data.song) {
          ret = ret.concat(this._normalizeSong(data.song.list))
        }
        return ret
      },
      _normalizeSong(list) {
        let ret = []
        list.forEach(musicData => {
          if (musicData.songid && musicData.albummid) {
            ret.push(createSong(musicData))
          }
        })
        return ret
      },
      ...mapMutations({
        setSinger: 'SET_SINGER'
      }),
      ...mapActions([
        'insertSong'
      ])
    },
    watch: {
      query(newQuery) {
        this.search(newQuery)
      }
    },
    components: {
      Scroll,
      Loading,
      NoResult,
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .suggest {
        height: 100%;
        overflow: hidden;
        .suggest-list {
            padding: 0 0.3rem;
            .suggest-item {
                width:100%;
                height:0.6rem;
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin: 20px 0;
                border-bottom: 0.01rem dotted #cccccc;
                .icon {
                    padding: 0.1rem;
                    margin-right: 0.2rem;
                    text-align: center;
                    [class^="icon-"] {
                        display: block;
                        font-size: 0.3rem;
                        color: #ff318d;
                    }
                }
                .name {
                    flex: 1;
                    font-size: 0.24rem;
                    color: rgba(0,0,0,0.85);
                    overflow: hidden;
                    text-align: left;
                    line-height: 0.6rem;
                    .text {
                        white-space: nowrap;
                    }
                }
            }
        }
        .no-result-wrapper {
            position: absolute;
            width: 100%;
            top: 50%;
            transform: translateY(-50%);
        }

    }
</style>
