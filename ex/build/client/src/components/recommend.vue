<template>
    <div class="recommend" ref="recommend">
        <scroll ref="scroll" class="recommend-content" :data="discList">
            <div>
                <div v-if="recommends.length" class="slider-wrapper" ref="sliderWrapper">
                    <slider>
                        <div v-for="item in recommends" :key="item.key">
                            <img class="needsclick" @load="loadImage" :src="item.picUrl">
                        </div>
                    </slider>
                </div>
                <div class="recommend-list">
                    <div class="list-title">热门歌单推荐</div>
                    <ul>
                        <li @click="selectItem(item)" v-for="item in discList" class="item" :key="item.key">
                            <div class="icon">
                                <img v-lazy="item.imgurl">
                            </div>
                            <div class="text">
                                <h2 class="name" v-html="item.creator.name"></h2>
                                <p class="desc" v-html="item.dissname"></p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="loading-container" v-show="!discList.length">
                <loading></loading>
            </div>
        </scroll>
        <router-view></router-view>
    </div>
</template>

<script>
  import {getRecommend,getDiscList} from '../api/recommend'
  import {ERR_OK} from '../api/config'
  import Slider from '../base/slider'
  import Scroll from '../base/scroll'
  import Loading from '../base/loading'
  import {playlistMixin} from '../assets/js/mixin'
  import {mapMutations} from 'vuex'
  export default {
    mixins:[playlistMixin],
    data() {
      return {
        recommends: [],
        discList:[]
      }
    },
    created() {
      this._getRecommend()
      this._getDiscList()
    },
    methods: {
      handlePlaylist(playList){
        const bottom=playList.length>0?"0.9rem":""
        this.$refs.recommend.style.bottom=bottom
        this.$refs.scroll.refresh()
      },
      selectItem(item){
        this.$router.push({
          path:`/music/recommend/${item.dissid}`
        })
        this.setDisc(item)
      },
      _getRecommend() {
        getRecommend().then((res) => {
          if (res.code == ERR_OK) {
            this.recommends = res.data.slider
          }
        })
      },
      _getDiscList(){
        getDiscList().then((res)=>{
          if (res.code == ERR_OK) {
            this.discList=res.data.list
          }
        })
      },
      loadImage(){
        if(!this.checkLoaded){
          this.$refs.scroll.refresh()
          this.checkLoaded=true
        }
      },
      ...mapMutations({
        setDisc:'SET_DISC'
      })
    },

    components: {
      Slider,
      Scroll,
      Loading
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .recommend {
        position: fixed;
        width: 100%;
        top: 11%;
        bottom: 0;
        .recommend-content{
            height: 100%;
            overflow: hidden;
            .slider-wrapper{
                position: relative;
                width: 100%;
                overflow: hidden;
            }
            .recommend-list{
                padding: 0 0.2rem;
                background: white;
                box-sizing: border-box;
                background: white;
                margin-bottom:10px;
                .list-title{
                    width: 100%;
                    height: 0.8rem;
                    text-align: center;
                    line-height: 0.8rem;
                    font-size: 0.32rem;
                    color: #ff318d;
                }
                .item{
                    width:100%;
                    height: 1.6rem;
                    border-bottom: 0.02rem dotted #ccc;
                    display: flex;
                    box-sizing: border-box;
                    align-items: center;
                    justify-content: flex-start;
                    padding: 0.2rem 0;
                    .icon{
                        width: 1.2rem;
                        height: 1.2rem;
                        background: url("../assets/img/singerimg_03.png") no-repeat center/cover;
                        margin-right: 0.4rem;
                        overflow: hidden;
                        position: relative;
                        img{
                            position: absolute;
                            left: -1px;
                            bottom: 3px;
                            border: 0.02rem solid white;
                            border-radius: 0.15rem;
                            width: 1.1rem;
                            height: 1.1rem;
                        }
                    }
                    .text{
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: flex-start;
                        overflow: hidden;
                        text-align: left;
                        .name{
                            margin-bottom: 12px;
                            color: #58606d;
                            font-size: 0.3rem;
                            font-weight: normal;
                        }
                        .desc{
                            color: #c6c6c6;
                            font-size: 0.22rem;
                        }
                    }
                }
            }
            .loading-container{
                position: absolute;
                width: 100%;
                top: 50%;
                transform: translateY(-50%)
            }
        }
    }

</style>
