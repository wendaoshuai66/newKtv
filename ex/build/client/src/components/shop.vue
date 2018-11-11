<template>
    <div class="shop" v-if="status">
        <header>
            <img src="../assets/img/icon_03.png" onclick="history.go(-1)">
            <main>
                <div v-for="(a,i) in type" :class="{active:aid==i}" :key="i" @click="aid=i,id=i">
                    <span>{{a}}</span>
                    <p :style="{left:i==0?'100%':'-100%'}"></p>
                </div>
            </main>
        </header>
        <iscroll-view  class ="scroll-view"  :options="{preventDefault: false}" ref="scroll">
            <ul>
                <li v-for="good in goods">
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
                        <div class="price">
                            <p>￥<b>{{good.price}}</b></p>
                            <span>/{{good.unit}}</span>
                        </div>
                        <div class="count">
                            <span class="jian" @click="good.count=good.count==0?0:good.count-1">-</span>
                            <span class="con">{{good.count}}</span>
                            <span class="jia" @click="good.count++">+</span>
                        </div>
                    </div>
                </li>
            </ul>
        </iscroll-view>
        <footer>
            <div class="selected">
                <span v-if="car.length>0">已选</span>
                <ul>
                    <li v-for="l in car.slice(0,2)"><span>{{l.name}}</span>&nbsp;<p>{{l.count}}{{l.unit}}</p></li>
                </ul>
                <img v-if="car.length>2" src="../assets/img/011_03.png" alt="">
            </div>
            <div class="foot">
                <div class="total">
                    <span>合计：</span>
                    <b>{{total}}</b>
                    <p>RMB</p>
                </div>
                <div class="select" @click="save"><router-link :to="{name:'affirm'}" >· 選好了 ·</router-link></div>
            </div>
        </footer>
    </div>
    <div v-else><img src="../assets/img/loading.gif" alt="" style="width: 100%;height: 100%;display: block;padding-top: 50%"></div>
</template>
<script>
  export default {
    name:'shop',
    data(){
      return {
        aid:0,
        id:0,
        type:['饮料','零食'],
        arr:[],
        status:false,

      }
    },
    computed:{
      goods() {
        let newarr = this.arr.filter(val => val.cid == this.id)
        return newarr
      },
      car(){
        let cararr=[]
        this.arr.forEach(val=>{if(val.count>0){
          cararr.push(val)
        }})
        return cararr
      },
      total(){
        let t=0;
        this.car.forEach(val=>{t+=val.count*val.price})
        return t
      }
    },
    methods:{
      save(){
        localStorage.lists=JSON.stringify(this.car)
      }
    },
    watch:{
      id(){
        this.$refs.scroll.refresh()
        this.$refs.scroll.scrollTo(0,0)
      },
    },
    mounted(){
      this.$http.get(`/ktv/good`).then(mess=>{
        this.arr=mess.body;
        if(localStorage.lists){
          var brr=JSON.parse(localStorage.lists)
          brr.forEach(val=>{
            this.arr.forEach(v=>{
              if(val.id==v.id){
                v.count=val.count
              }
            })

          })
        }
        this.status=true;
      })
    },
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .shop{
        width: 100%;
        height: 100%;
        background: url("../assets/img/bg1.png") no-repeat center;
        background-size: cover;
        padding: 3%;
        box-sizing: border-box;
    }
    header{
        width: 100%;
        height: 10%;
        position: relative;
        img{
            float: left;
            margin-top: 2%;
            width: 0.4rem;
            height:.4rem;
            display: block;
        }
        main{
            position: absolute;
            top: 0;
            bottom: 0;
            left:0;
            right: 0;
            margin: auto;
            width: 45%;
            height: 45%;
            background: white;
            border: 0.1rem solid white;
            border-radius: 1rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            overflow: hidden;
            div{
                width: 50%;
                height: 100%;
                position: relative;
                text-align: center;
                line-height: 0.5rem;
                font-size: 0.24rem;
                color: black;
                overflow: hidden;
                span{
                    position: relative;
                    z-index: 1;
                }
                p{
                    width: 100%;
                    height: 100%;
                    border-radius: 1rem;
                    background: #ff318d;
                    position: absolute;
                    top: 0;
                    z-index: 0;
                    transition: all 0.3s;
                }

            }
            div.active{
                color: white;
                p{
                    left: 0!important;
                }
            }
        }
    }
    .scroll-view{
        width: 100%;
        height: auto;
        position: absolute;
        top:15%;
        left: 0;
        bottom: 20%;
        overflow: hidden;
        touch-action: none;
        padding: 0 3%;
        box-sizing: border-box;
        ul{
            width: 100%;
            height: auto;
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
                        span{
                            font-size: 0.28rem;
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
                            color: #ccc;
                            font-size: 0.24rem;
                        }
                    }
                }
            }
        }
    }
    footer{
        width: 100%;
        height: 20%;
        position: absolute;
        bottom: 0;
        left:0;
        padding: 0 3% 3%;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .selected{
            margin: 0.4rem 0 0;
            width: 100%;
            height: 0.5rem;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            span{
                display: block;
                font-size: 0.26rem;
                color: black;
            }
            ul{
                width: auto;
                height: 100%;
                li{
                    width: auto;
                    padding: 0 0.2rem;
                    height: 100%;
                    background: #ff318d;
                    border: 0.01rem solid #e12c7e;
                    border-radius: 0.05rem;
                    text-align: center;
                    line-height: 0.5rem;
                    font-size: 0.24rem;
                    float: left;
                    margin-left:0.1rem ;
                    display: flex;
                    justify-content: flex-start;
                    span{
                        font-size: 0.24rem;
                        color: white ;
                    }
                    p{
                        color: white ;
                    }
                }
            }
            img{
                width: 0.6rem;
                height: 100%;
            }
        }
        .foot{
            width:100%;
            height: 0.8rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .total{
                display: flex;
                justify-content: space-between;
                align-items: baseline;
                color: #ff318d;
                span{
                    font-size: 0.32rem;
                }
                b{
                    font-size: 0.4rem;
                }
                p{
                    font-size: 0.2rem;
                }
            }
            .select{
                width: 3rem;
                height: 100%;
                background: url("../assets/img/done.png") no-repeat center;
                background-size: 100% 100%;
                text-align: center;
                line-height: 0.8rem;
                font-size: 0.4rem;
                a{
                    width: 100%;
                    height:100%;
                    display: block;
                    color: white;
                }

            }
        }
    }
</style>
