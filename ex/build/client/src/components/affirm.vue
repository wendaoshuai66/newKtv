<template>
    <div class="affirm">
        <header>
            <div class="back" @click="back"></div>
            <div class="head">
                <div class="room">
                    <p>·  <b>{{info.room}}</b>房间已选商品 ·</p>
                </div>
                <div class="con"><p>共 <b>{{goods.length}}</b> 件</p></div>
            </div>
        </header>
        <iscroll-view  class ="scroll-view"  :options="{preventDefault: false}" ref="scroll">
            <ul v-if="goods.length>0">
                <li v-for="(good,index) in goods">
                    <div class="left">
                        <img :src="good.img" alt="">
                    </div>
                    <div class="right">
                        <div class="name">
                            <span>{{good.name}}</span>
                            <ol>
                                <li v-for="n in Number(good.hot)"><img src="../assets/img/fire.png" alt=""></li>
                            </ol>
                        </div>
                        <div class="count">
                            <span class="jian" @click="down(index)">-</span>
                            <span class="con">{{good.count}}</span>
                            <span class="jia" @click="good.count++">+</span>
                        </div>
                        <div class="price">
                            <p><i><b>{{good.price*good.count}}</b></i></p>
                            <img src="../assets/img/rmb1.png" alt="">
                        </div>
                    </div>
                </li>
            </ul>
            <ul v-else><img src="../assets/img/kong.jpg" class="kong"></ul>
        </iscroll-view>
        <footer>
            <div class="total">
                <img src="../assets/img/tu-31.png" alt="">
                <b>{{total}}</b>
            </div>
            <div @click="ok" class="ok"></div>
        </footer>
    </div>
</template>
<script>
  export default {
    data(){
      return{
        goods:[],
        info:{}
      }
  },
    computed:{
      total(){
        let t=0;
        this.goods.forEach(val=>{t+=val.count*val.price})
        return t
      }

    },
    mounted(){
      this.mess=JSON.parse(sessionStorage.info)
      this.goods= JSON.parse(localStorage.lists)
      this.$refs.scroll.refresh()
      this.$refs.scroll.scrollTo(0,0)
    },
    methods:{
      back(){
        this.$router.go(-1)
        localStorage.lists=JSON.stringify(this.goods)
      },
      down(index){
        if(this.goods[index].count==1){
          this.goods.splice(index,1)
        }else{
          this.goods[index].count--
        }
        return this.goods
      },
      ok(){
        if(this.goods.length>0){
          this.$http.post('/ktv/order',{goods:JSON.stringify(this.goods),mess:this.mess}).then(mess=>{
            if(mess.body=='yes'){
              localStorage.removeItem('lists')
              this.$router.replace({name:'ok'})
            }else{
              this.$router.push({name:'fail'})
            }
          })
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .affirm{
        width:100%;
        height: 100%;
        background: url("../assets/img/tu-30.png") no-repeat center;
        background-size: cover;
        header{
            width: 100%;
            height: 0.6rem;
            position: absolute;
            top: 0.6rem;
            left:0;
            .back{
                position: absolute;
                top:-0.1rem;
                left:0.2rem;
                width: 0.4rem;
                height: 0.4rem;
                z-index: 5;
            }
            .head{
                width: 100%;
                height: 100%;
                text-align: center;
                p{
                    font-size: 0.26rem;
                    b{
                        font-size: 0.3rem;
                    }
                }
            }
        }
        .scroll-view{
            width: 94%;
            height: auto;
            position: absolute;
            top:15%;
            left: 0;
            bottom: 20%;
            overflow: hidden;
            touch-action: none;
            margin: 0 3%;
            box-sizing: border-box;
            background: white;
            border-radius: 0.05rem;
            box-shadow: 0 0.05rem 0.2rem rgba(0,0,0,0.2);
            ul{
                width: 100%;
                height: auto;
                .kong{
                    width: 100%;
                    height: 100%;
                }
                li{
                    width: 100%;
                    height: 2.7rem;
                    padding: 0.3rem 0 0.2rem 0;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 0.03rem dotted #ccc;
                    .left{
                        width: 50%;
                        height: 100%;
                        position: relative;
                        img{
                            position: absolute;
                            top: 0;
                            bottom: 0;
                            left:0;
                            right: 0;
                            margin: auto;
                            width: 80%;
                            height: 80%;
                        }
                    }
                    .right{
                        width: 50%;
                        height: 100%;
                        padding: 5% 0;
                        box-sizing: border-box;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-around;
                        align-items: flex-start;
                        .name{
                            width: 100%;
                            height: 0.6rem;
                            display: flex;
                            justify-content: flex-start;
                            align-items: center;
                            span{
                                font-size: 0.24rem;
                                color: black;
                                display: inline-block;
                                margin-right: 0.15rem;
                            }
                            li{
                                width: 0.2rem;
                                height: 0.2rem;
                                margin-right: 0.1rem;
                                padding: 0;
                                float: left;
                                vertical-align: baseline;
                                border: none;
                                img{
                                    width: 100%;
                                    height: 100%;
                                    vertical-align: baseline;
                                }
                            }
                        }
                        .price{
                            width: 100%;
                            display: flex;
                            justify-content: flex-start;
                            align-items: center;
                            color: #ff318d;
                            p{
                                font-size:0.2rem;
                                b{
                                    font-size: 0.3rem;
                                }
                            }
                            img{
                                margin-left: 0.1rem;
                                display: block;
                                vertical-align: middle;
                            }
                        }
                        .count{
                            width:100%;
                            display: flex;
                            justify-content: flex-start;
                            align-items: center;
                            .jian,.jia{
                                width: 0.4rem;
                                height:0.4rem;
                                border-radius: 50%;
                                background: #ccc;
                                color: white;
                                font-size: 0.36rem;
                                line-height: 0.4rem;
                                text-align:center;
                            }
                            .jia{
                                background: #33affe;
                            }
                            .con{
                                width: 0.8rem;
                                height: 0.4rem;
                                background: white;
                                border-radius: 1rem;
                                border: 0.05rem solid #ccc;
                                margin: 0 0.2rem;
                                text-align: center;
                                line-height: 0.4rem;
                                color: #ff318d;
                                font-size: 0.24rem;
                            }
                        }
                    }
                }
            }
        }
        footer{
            position: absolute;
            left:0;
            bottom: 0;
            height: 20%;
            padding: 0 3% 3%;
            width: 100%;
            box-sizing: border-box;
            .total{
                padding-top: 0.4rem;
                width: 100%;
                height: 0.6rem;
                display: flex;
                justify-content: flex-end;
                align-items: center;
                b{
                    padding-left: 0.2rem;
                    width: 2rem;
                    font-size: 0.54rem;
                    color: #ff318d;
                }
                img{
                    height: 100%;
                }
            }
            .ok{
                margin: 0.8rem auto 0;
                display: block;
                width: 6rem;
                height: 1rem;
            }
        }
    }
</style>
