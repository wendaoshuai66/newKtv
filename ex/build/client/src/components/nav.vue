<template>
    <nav>
        <router-link tag="div" class="item" to="/music/recommend">
            <span class="tab-link">推荐</span>
        </router-link>
        <router-link tag="div" class="item" to="/music/singer">
            <span class="tab-link">歌手</span>
        </router-link>
        <router-link tag="div" class="item" to="/music/rank">
            <span class="tab-link">排行</span>
        </router-link>
        <router-link tag="div" class="item" to="/music/search">
            <span class="tab-link">搜索</span>
        </router-link>
    </nav>
</template>

<script>
  export default {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    nav{
        width: 100%;
        height: 0.6rem;
        line-height: 0.6rem;
        font-size: 0.26rem;
        display: flex;
        .item{
            flex: 1;
            text-align: center;
            .tab-link{
                padding-bottom: 0.04rem;
                color: #e8e8e8;
            }
            &.router-link-active{
                .tab-link{
                    color: white;
                    border-bottom: 0.03rem solid white;
                }
             }

        }

    }

</style>
