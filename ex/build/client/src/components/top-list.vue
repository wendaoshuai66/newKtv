<template>
    <transition name="slide">
        <music-list :title="title" :bg-image="bgImage" :songs="songs" :rank="rank"></music-list>
    </transition>
</template>

<script>
  import MusicList from './music-list'
  import {getMusicList} from '../api/rank'
  import {ERR_OK} from '../api/config'
  import {mapGetters} from 'vuex'
  import {createSong} from '../assets/js/song'

  export default {
    data() {
      return {
        songs: [],
        rank: true
      }
    },
    computed: {
      title() {
        return this.topList.topTitle
      },
      bgImage() {
        if (this.songs.length) {
          return this.songs[0].image
        } else {
          return this.topList.picUrl
        }

      },
      ...mapGetters(['topList'])
    },
    created() {
      this._getMusicList()
    },
    methods: {
      _getMusicList() {
        if (!this.topList.id) {
          this.$router.push('/music/rank')
          return
        }
        getMusicList(this.topList.id).then((res) => {
          if (res.code == ERR_OK) {
            this.songs = this._normalizeSongs(res.songlist)
          }
        })
      },
      _normalizeSongs(list) {
        let ret = []
        list.forEach(i => {
          const musicData = i.data
          if (musicData.songid && musicData.albumid) {
            ret.push(createSong(musicData))
          }
        })
        return ret
      }
    },
    components: {
      MusicList
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .slide-enter-active, .slide-leave-active {
        transition: all 0.5s ease;
    }

    .slide-enter, .slide-leave-to {
        transform: translate3d(100%, 0, 0);
    }
</style>
