<template>
    <div class="rank" ref="rank">
        <scroll :data="topList" class="toplist" ref="topList">
            <ul>
                <li @click="selectItem(item)" class="item" v-for="item in topList">
                    <div class="icon">
                        <img  v-lazy="item.picUrl"/>
                    </div>
                    <ul class="songlist">
                        <li class="song" v-for="(song,index) in item.songList" :key="song.key">
                            <span>{{index + 1}}</span>
                            <span>{{song.songname}}-{{song.singername}}</span>
                        </li>
                    </ul>
                </li>
            </ul>
            <div class="loading-container" v-show="!topList.length">
                <loading></loading>
            </div>
        </scroll>
        <router-view></router-view>
    </div>
</template>

<script>
  import Scroll from '../base/scroll'
  import Loading from '../base/loading'
  import {getTopList} from '../api/rank'
  import {ERR_OK} from '../api/config'
  import {playlistMixin} from '../assets/js/mixin'
  import {mapMutations} from 'vuex'

  export default {
    mixins: [playlistMixin],
    data() {
      return {
        topList: []
      }
    },
    created() {
      this._getTopList()
    },
    methods: {
      handlePlaylist(playlist) {
        const bottom = playlist.length ? '.8rem' : ''
        this.$refs.rank.style.bottom = bottom
        this.$refs.topList.refresh()
      },
      selectItem(item) {
        this.$router.push({
          path: `/music/rank/${item.id}`
        })
        this.setTopList(item)
      },
      _getTopList() {
        getTopList().then((res) => {
          if (res.code == ERR_OK) {
            this.topList = res.data.topList
          }
        })
      },
      ...mapMutations({
        setTopList: 'SET_TOP_LIST'
      })
    },
    components: {
      Scroll,
      Loading
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .rank {
        position: fixed;
        top: 11%;
        bottom: 0;
        width: 100%;
        box-sizing: border-box;
        .toplist {
            height: 100%;
            overflow: hidden;
            padding: 0 0.2rem;
            box-sizing: border-box;
            .item {
                display: flex;
                margin-bottom: .2rem;
                height: 2rem;
                border: 0.03rem solid white;
                border-radius: 0.08rem;
                box-shadow: 0 0 0.1rem 0 rgba(255,40,130,0.2);
                overflow: hidden;
                .icon{
                    flex: 0 0 2rem;
                    img{
                        display: block;
                        width: 100%;
                        height:100%;
                    }
                }
                .songlist {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    padding: 0 20px;
                    height: 2rem;
                    overflow: hidden;
                    background: #63CBFF;
                    color: white;
                    font-size: 0.24rem;
                    text-align: left;
                    .song {
                        white-space: nowrap;
                        line-height: 0.46rem;
                    }
                }
            }

        }
        .loading-container {
            position: absolute;
            width: 100%;
            top: 50%;
            transform: translateY(-50%)
        }

    }
</style>
