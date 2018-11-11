<template>
    <div class="game">
        <header>
            <div class="back" @click="$router.go(-1)"></div>
            <b>· 游戲中心 ·</b>
        </header>
        <section>
            <ul>
                <li @click="$router.push({name:'risk'})">
                    <span>真心话大冒险</span>
                </li>
                <li @click="$router.push({name:'guess'})">
                    <span>猜字谜</span>
                </li>
                <li @click="$router.push({name:'puzzle'})">
                    <span>智力拼图</span>
                </li>
                <li>
                    <span>敬请期待</span>
                </li>
                <li>
                    <span>敬请期待</span>
                </li>
                <li>
                    <span>敬请期待</span>
                </li>
            </ul>
        </section>
    </div>
</template>
<script>
  export default {
    
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .game{
        width: 100%;
        height:100%;
        background: #F3E8FB;
        header{
            width: 100%;
            padding: 3%;
            height:4rem;
            box-sizing: border-box;
            background: url("../assets/img/8.png") no-repeat center;
            background-size: cover;
            .back{
                position: absolute;
                top:0.36rem;
                left:0.24rem;
                z-index: 2;
                width: 0.4rem;
                height:0.4rem;
                background: url("../assets/img/icon_03.png") no-repeat center;
            }
            b{
                font-size: 0.32rem;
                position: absolute;
                font-weight: normal;
                top:30px;
                left: 0;
                right: 0;
                margin: auto;
            }
        }
        section{
            box-sizing: border-box;
            width: 94%;
            margin: 3%;
            height: 86%;
            position: absolute;
            padding: 3%;
            padding-bottom: 15%;
            top: 10%;
            left: 0;
            background: white;
            box-shadow: 0 0.1rem .5rem  rgba(0,0,0,0.2);
            ul{
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: space-between;
                align-content: space-between;
                flex-wrap: wrap;
                li{
                    width: 48%;
                    height: 32%;
                    border-radius: 0.1rem;
                    overflow: hidden;
                    background-size: cover;
                    box-shadow: 0 0 0.3rem  rgba(255,47,138,0.2);
                    display: flex;
                    justify-content: center;
                    align-items: flex-end;
                    span{
                        color: #333333;
                        font-size: 0.3rem;
                        padding-bottom: 20%;
                    }
                }
                li:nth-of-type(1),li:nth-of-type(4){
                    background: url("../assets/img/game_content_03.png") no-repeat center/cover;
                }
                li:nth-of-type(2),li:nth-of-type(5){
                    background: url("../assets/img/game_content_05.png") no-repeat center/cover;
                }
                li:nth-of-type(3),li:nth-of-type(6){
                    background: url("../assets/img/game_content_10.png") no-repeat center/cover;
                }
            }

        }

    }
</style>
