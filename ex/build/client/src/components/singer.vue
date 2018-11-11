<template>
    <div class="singer" ref="singer">
        <list-view :data="singers" @select="selectSinger" ref="list"></list-view>
        <router-view></router-view>
    </div>
</template>

<script>
  import {getSingerList} from '../api/singer'
  import {ERR_OK} from '../api/config'
  import Singer from '../assets/js/singer'
  import ListView from '../base/listview'
  import {mapMutations} from 'vuex'
  import {playlistMixin} from '../assets/js/mixin'

  const HOT_NAME = '热门'
  const HOT_SINGER_LEN = 10
  export default {
    mixins:[playlistMixin],
    data() {
      return {
        singers: []
      }
    },
    created() {
      this._getSingerList()
    },
    methods: {
      handlePlaylist(playList){
        const bottom=playList.length>0?"0.9rem":""
        this.$refs.singer.style.bottom=bottom
        this.$refs.list.refresh()
      },
      selectSinger(singer){
        this.$router.push({
          path:`/music/singer/${singer.id}`
        })
        this.setSinger(singer)
      },
      _getSingerList() {
        getSingerList().then((res) => {
          if (res.code == ERR_OK) {
            this.singers = this._normalizeSinger(res.data.list)
          }
        })
      },
      _normalizeSinger(list) {
        let map = {
          hot: {
            title: HOT_NAME,
            items: []
          }
        }
        list.forEach((v, i) => {
          if (i < HOT_SINGER_LEN) {
            map.hot.items.push(new Singer({
              id: v.Fsinger_mid,
              name: v.Fsinger_name
            }))
          }
          const key = v.Findex
          if (!map[key]) {
            map[key] = {
              title: key,
              items: []
            }
          }
          map[key].items.push(new Singer({
            id: v.Fsinger_mid,
            name: v.Fsinger_name
          }))
        })
        //map处理，得到有序列表
        let hot = []
        let ret = []
        for (let k in map) {
          let val = map[k]
          if (val.title.match(/[a-zA-Z]/)) {
            ret.push(val)
          } else if (val.title == HOT_NAME) {
            hot.push(val)
          }
        }
        ret.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })
        return hot.concat(ret)
      },
      ...mapMutations({
        setSinger:'SET_SINGER'
      })
    },
    components: {
      ListView
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .singer {
        position: fixed;
        top: 11%;
        bottom: 0;
        width: 100%;
        box-sizing: border-box;
    }
</style>
