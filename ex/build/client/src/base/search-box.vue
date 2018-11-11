<template>
    <div class="search-box">
        <div class="box">
            <input type="text" :placeholder="placeholder" v-model="query" ref="query">
            <i class="icon-dismiss" v-show="query" @click="clear"></i>
        </div>
        <i class="icon-search"></i>
    </div>
</template>

<script>
  import {debounce} from '../assets/js/util'

  export default {
    props: {
      placeholder: {
        type: String,
        default: '搜索歌曲、歌手'
      }
    },
    data() {
      return {
        query: ''
      }
    },
    methods: {
      clear() {
        this.query = ''
      },
      setQuery(query) {
        this.query = query
      },
      blur() {
        this.$refs.query.blur()
      }
    },
    created() {
      this.$watch('query', debounce((newquery) => {
        this.$emit('query', newquery)
      }, 200))
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .search-box {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 0.48rem;
        border: 0.02rem solid white;
        background: white;
        border-radius: 1rem;
        overflow: hidden;
        .icon-search {
            width: 15%;
            height: 100%;
            background: #ff318d;
            font-size: 0.3rem;
            color: white;
            text-align: center;
            line-height: 0.5rem;
        }
        .box {
            flex: 1;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            color: rgba(0, 0, 0, 0.85);
            font-size: 0.26rem;
            padding-left: 0.3rem;
            box-sizing: border-box;
            input {
                flex: 1;
                height: 100%;
                outline: none;
                list-style: none;
                border: none;
                font-size: 0.26rem;
                background: transparent;
                &::placeholder {
                    font-size: 0.26rem;
                    color: rgba(0, 0, 0, 0.85)
                }
            }
            .icon-dismiss {
                padding: 0.1rem;
                font-size: 0.32rem;
            }
        }
    }
</style>
