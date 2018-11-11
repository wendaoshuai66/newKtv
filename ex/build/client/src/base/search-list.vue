<template>
    <div class="search-list" v-show="searches.length">
        <transition-group name="list" tag="ul">
            <li @click=selectItem(item) class="search-item" v-for="item in searches" :key="item">
                <span class="text">{{item}}</span>
                <span class="icon" @click.stop="deleteOne(item)">
                    <i class="icon-delete"></i>
                </span>
            </li>
        </transition-group>
    </div>
</template>

<script>
  export default {
    props: {
      searches: {
        type: Array,
        default: []
      }
    },
    methods: {
      selectItem(item) {
        this.$emit('select', item)
      },
      deleteOne(item){
        this.$emit('delete', item)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .search-list {
        .search-item {
            width:100%;
            height:0.6rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin: 20px 0;
            &.list-enter-active, &.list-leave-active {
                transition: all 0.1s
            }
            &.list-enter, &.list-leave-to {
                height: 0
            }
            .text {
                flex: 1;
                font-size: 0.26rem;
                padding-left: 0.1rem;
                color: rgba(0,0,0,0.85);
                overflow: hidden;
                text-align: left;
                line-height: 0.6rem;
            }
            .icon-delete {
                display: block;
                font-size: 0.26rem;
                color: #ccc;
                }
        }
    }
</style>
