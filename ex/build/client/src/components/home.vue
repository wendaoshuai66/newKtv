<template>
    <div class="home">
        <router-link :to="{name:'index'}" class="back"></router-link>
        <router-link :to="{name:'login'}" class="login"></router-link>
        <header>
            <img src="../assets/img/logo_03.png">
            <div>
                <i>
                    {{mess.room}}
                </i>
                <p>
                    房间
                </p>
            </div>
            <div>
                <i>
                   {{mess.tell}}
                </i>
                <p>
                    用户
                </p>
            </div>
        </header>
        <nav>
            <li class="gedan" @click="state=0">
                <div class="title">
                    <b>{{playHistory.length}}</b>
                    <span>播放历史</span>
                </div>
                <i>Play history</i>
            </li>
            <li class="shoucang" @click="state=1">
                <div class="title">
                    <b>{{favoriteList.length}}</b>
                    <span>收藏歌曲</span>
                </div>
                <i>Collect songs</i>
            </li>
            <li class="dingdan" @click="state=2">
                <div class="title">
                    <b>{{order.length}}</b>
                    <span>我的订单</span>
                </div>
                <i>My order</i>
            </li>
        </nav>
        <div class="tishi">{{prompt}}</div>
        <div class="scroll" ref="scroll">
            <scroll ref="playList" class="list-scroll" v-if="state===0" :data="playHistory">
                <div class="list-inner">
                    <song-list :songs="playHistory" @select="selectSong"></song-list>
                </div>
            </scroll>
            <scroll ref="favoriteList" class="list-scroll" v-if="state===1" :data="favoriteList" >
                <div class="list-inner">
                    <song-list :songs="favoriteList" @select="selectSong"></song-list>
                </div>
            </scroll>
            <scroll ref="orderList" class="list-scroll" v-if="state===2" :data="order">
                <ul class="order-inner">
                    <li v-for="(i,n) in order" @click="detail(i.id,i.room)">
                        <h3>{{n+1}}</h3>
                        <div>
                        <i><h5>下单房间：<b>{{i.room}}</b></h5> <p v-if="i.status">已支付</p><p v-else>未支付</p></i>
                        <span>下单时间：<b>{{i.time}}</b></span>
                        </div>
                    </li>
                </ul>
            </scroll>
        </div>
        <div class="no-result-wrapper" v-show="noResult">
            <no-result :title="noResultDesc"></no-result>
        </div>
        <player/>
    </div>
</template>

<script>
  import SongList from '../base/song-list.vue'
  import Scroll from '../base/scroll.vue'
  import NoResult from '../base/no-result.vue'
  import Player from './player.vue'
  import Song from '../assets/js/song'
  import {mapGetters, mapActions} from 'vuex'
  import {playlistMixin} from '../assets/js/mixin'

  export default {
    mixins: [playlistMixin],
    data() {
      return {
//        status: true,
        state: 0,
        order: [],
        refreshDelay:120,
        mess:{}
      }
    },
    computed: {
      prompt() {
        return this.state == 0 ? '播放历史' : this.state == 1 ? '收藏歌曲' : '我的订单'
      },
      noResult() {
        if (this.state === 0) {
          return !this.playHistory.length
        } else if (this.state === 1) {
          return !this.favoriteList.length
        } else if (this.state === 2) {
          return !this.order.length
        }
      },
      noResultDesc() {
        if (this.state === 0) {
          return '你还没有听过歌曲'
        } else if (this.state === 1) {
          return '暂无收藏歌曲'
        } else if (this.state === 2) {
          return '赶紧去购物吧'
        }
      },
      ...mapGetters([
        'favoriteList',
        'playHistory'
      ])
    },
    methods: {
      handlePlaylist(playlist) {
        setTimeout(() => {
          const bottom = playlist.length > 0 ? '1.1rem' : ''
          this.$refs.scroll.style.bottom = bottom
          this.$refs.favoriteList && this.$refs.favoriteList.refresh()
          this.$refs.playList && this.$refs.playList.refresh()
          this.$refs.orderList && this.$refs.orderList.refresh()
        }, 40)
      },
      selectSong(song) {
        this.insertSong(new Song(song))
      },
      detail(id, room) {
        this.$router.push({name: 'detail', query: {id: id, room: room}})
      },
      ...mapActions([
        'insertSong'
      ])
    },
    watch:{
      state(){
        setTimeout(() => {
          if (this.state === 0) {
            this.$refs.playList.refresh()
          } else if (this.state === 1) {
            this.$refs.favoriteList.refresh()
          } else if (this.state === 2) {
            this.$refs.orderList.refresh()
          }
        }, 20)
      }
    },
    mounted() {
      this.mess=JSON.parse(sessionStorage.info)
        this.$http.post('/ktv/order_goods',{mess:this.mess}).then(mess=>{
          this.arr=mess.body
        })
    },
    components: {
      SongList,
      Scroll,
      NoResult,
      Player
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .home {
        position: fixed;
        top: 0;
        bottom: 0;
        z-index: 100;
        width: 100%;
        padding: 0.3rem;
        box-sizing: border-box;
        background: url("../assets/img/home.png") no-repeat center/cover;
        .back {
            position: absolute;
            top: 0.3rem;
            left: 0.3rem;
            width: 0.4rem;
            height: 0.4rem;
            background: url("../assets/img/icon_03.png") no-repeat center/cover;
        }
        .login{
            position: absolute;
            top: 0.3rem;
            right: 0.3rem;
            width: 0.4rem;
            height: 0.4rem;
            background: url("../assets/img/recommend01.png") no-repeat center/cover;
        }
        header {
            width: 100%;
            padding-top: 0.9rem;
            text-align: right;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-end;
            margin-right: 0.2rem;
            margin-bottom: 0.2rem;
            img {
                display: block;
                width: 1.8rem;
                height: 1.8rem;
                border-radius: 50%;
                margin: 0 0.05rem 0.1rem 0;
                box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.5);
            }
            div {
                font-size: 0.28rem;
                color: #31d6ff;
                line-height: 0.5rem;
                width: auto;
                margin-right: 0.2rem;
                p {
                    margin-left: 0.1rem;
                    color: black;
                    display: inline-block;
                }
            }
        }
        nav {
            width: 100%;
            height: 1.2rem;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            li {
                width: 32%;
                height: 100%;
                border-radius: 0.1rem;
                overflow: hidden;
                box-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.3);
                display: flex;
                flex-direction: column;
                justify-content: flex-end;
                align-items: flex-start;
                padding-left: 0.2rem;
                box-sizing: border-box;
                .title {
                    display: flex;
                    justify-content: flex-start;
                    align-items: baseline;
                    b {
                        font-size: 0.3rem;
                        color: #ff318d;
                        margin-right: 0.1rem;
                    }
                    span {
                        font-size: 0.24rem;
                        color: #22B0FC;
                    }
                }
                i {
                    margin: 0.04rem 0 0.2rem;
                    font-size: 0.18rem;
                    color: #565eff;
                }

            }
            .gedan {
                background: url("../assets/img/yxfs.png") no-repeat center/cover;
            }
            .dingdan {
                background: url("../assets/img/yxdd.png") no-repeat center/cover;
            }
            .shoucang {
                background: url("../assets/img/yxgz.png") no-repeat center/cover;
            }
        }
        .tishi {
            text-align: left;
            color: #ff318d;
            font-weight: bold;
            font-size: 0.3rem;
            padding: 0.15rem 0;
        }
        .scroll {
            position: absolute;
            bottom: 0.2rem;
            top: 6.1rem;
            left: 0;
            width: 100%;
            .list-scroll {
                height: 100%;
                overflow: hidden;
                padding: 0 0.3rem;
                box-sizing: border-box;
                .order-inner {
                    li {
                        width: 100%;
                        height: 0.8rem;
                        background: white;
                        border-bottom: 0.02rem dotted #CCCCCC;
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        h3 {
                            color: #ff318d;
                            margin-left: 0.2rem;
                            font-size: 0.4rem;
                        }
                        div {
                            width: calc(100% - 0.4rem);
                            display: flex;
                            flex-direction: column;
                            justify-content: space-around;
                            color: #CCCCCC;
                            i {
                                width: 100%;
                                display: flex;
                                justify-content: space-around;
                                font-size: 0.24rem;
                                b {
                                    color: #565eff;
                                }
                                p {
                                    color: #ff318d;
                                }
                            }
                            span {
                                font-size: 0.24rem;
                                b {
                                    color: #22B0FC;
                                }
                            }
                        }
                    }
                }
            }

        }
        .no-result-wrapper {
            position: absolute;
            width: 100%;
            bottom: 0;
            left: 0;
            transform: translateY(-50%);
        }

    }
</style>
