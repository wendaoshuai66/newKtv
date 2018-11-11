<template>
    <div class="song-list">
        <ul>
            <li @click="selectItem(song,index)" v-for="(song,index) in songs" class="item" :key="index">
                <div class="rank" v-show="rank">
                    <span :class="getRankCls(index)">{{getRankText(index)}}</span>
                </div>
                <div class="content">
                    <h2 class="name">{{song.name}}</h2>
                    <p class="desc">{{getDesc(song)}}</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
  export default {
    props: {
      songs: {
        type: Array,
        default: []
      },
      rank: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      selectItem(item, index) {
        this.$emit('select', item, index)
      },
      getDesc(song) {
        return `${song.singer}-${song.album}`
      },
      getRankCls(index) {
        if (index <= 2) {
          return `icon icon${index}`
        } else {
          return 'text'
        }
      },
      getRankText(index) {
        if (index > 2) {
          return index + 1
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .song-list {
        ul {
            .item {
                width: 100%;
                height: 0.9rem;
                border-bottom: 0.02rem dotted #ccc;
                margin: 0.2rem 0;
                display: flex;
                align-items: center;
                .rank {
                    flex: 0 0 25px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: .4rem;
                    height: .4rem;
                    margin: 0 .3rem 0 0.1rem;
                    .icon {
                        display: inline-block;
                        width: 30px;
                        height: 30px;
                        &.icon0 {
                            background: url('../assets/img/first@3x.png') no-repeat center/cover;
                        }
                        &.icon1 {
                            background: url('../assets/img/second@3x.png') no-repeat center/cover;
                        }

                        &.icon2 {
                            background: url('../assets/img/third@3x.png') no-repeat center/cover;
                        }
                    }
                    .text {
                        color: #ff318d;
                        font-size: 0.32rem
                    }
                }
                .content {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                    align-content: space-around;
                    text-align: left;
                    overflow: hidden;
                    .name {
                        color: #5a5a5a;
                        font-size: 0.28rem;
                    }
                    .desc {
                        color: #919191;
                        font-size: 0.24rem;
                        white-space: nowrap;
                    }

                }

            }
        }
    }

</style>
