<template>
    <div class="risk" v-if="s">
        <header>
            <div class="back" @click="$router.go(-1)"></div>
            <b>· 真心話大冒險 ·</b>
            <div class="tmp"></div>
        </header>
        <section>
            <ul :class="flag?'active':''">
                <li :class="flag?'active':''" v-for="(r,index) in risk" @click="change(index,r.typeid)" :key="index">
                    <transition name="fade" mode="out-in">
                        <img src="../assets/img/question_03.png" alt="" v-if="r.status==0">
                        <span v-else>{{r.content}}</span>
                    </transition>
                </li>
            </ul>
        </section>
        <footer>
            <main>
                <div class="zhen" @click="f(0)"></div>
                <div class="da" @click="f(1)"></div>
            </main>

        </footer>
    </div>
    <div v-else><img src="../assets/img/loading.gif" alt="" style="width: 100%;height: 100%;display: block;padding-top: 50%"></div>
</template>

<script>
  export default {
    data() {
      return {
        s: false,
        flag: true,
        fa: true,
        ku: [],
        aid: 0,
        risk: [],
      }
    },
    computed: {
      arr() {
        let newarr=[];
        this.ku.forEach(val => {
          if (val.typeid == this.aid){
            let obj = Object.assign({}, val)
            newarr.push(obj)
          }
        })
        return newarr
      },
    },
    methods: {
      getarr(arr, count) {
        var shuffled = arr.slice(0),
          i = arr.length,
          min = i - count,
          temp,
          index;
        while (i-- > min) {
          index = Math.floor((i + 1) * Math.random());
          temp = shuffled[index];
          shuffled[index] = shuffled[i];
          shuffled[i] = temp;
        }
        return shuffled.slice(min);
      },
      newget() {
        this.risk = this.getarr(this.arr, 9)
        return this.risk
      },
      change(index, tid) {
        if (this.risk.filter(val => val.status == 1).length >= 2) {
          this.risk.forEach(val=>val.status=0)
          this.f(tid)
        } else {
          this.risk[index].status = 1;
        }
      },
      f(id) {
        if (this.fa) {
          this.aid = id
          this.flag = true;
          this.newget()
          this.fa = false
          setTimeout(() => {
            this.flag = false
            this.fa = true
          }, 2000)
        }
      }
    },
    mounted(){

    },
    beforeMount() {
      this.$http.get('/ktv/risk').then(mess => {
        this.ku = mess.body
        this.s = true
        setTimeout(this.f(0),1000)
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */
    {
        opacity: 0
    }

    .slide-fade-enter-active {
        transition: all .3s ease;
    }

    .slide-fade-leave-active {
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }

    .slide-fade-enter, .slide-fade-leave-to
        /* .slide-fade-leave-active for below version 2.1.8 */
    {
        transform: translateX(10px);
        opacity: 0;
    }

    .risk {
        width: 100%;
        height: 100%;
    }

    header {
        padding: 3%;
        height:0.4rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10%;
        .back {
            width: 0.4rem;
            height: 0.4rem;
            z-index: 5;
            background: url("../assets/img/icon_03.png") no-repeat center/cover;
        }
        b {
            font-size: 0.36rem;
            font-weight: normal;
        }
        .tmp{
            width: 0.4rem;
            height:0.4rem;
        }
    }
    section {
        box-sizing: border-box;
        width: 94%;
        margin: 3%;
        height: 53%;
        padding: 3%;
        background: white;
        border-radius: 0.1rem;
        box-shadow: 0 0 .2rem 0.05rem rgba(255, 47, 138, 0.4);
        position: relative;
        ul {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: space-between;
            align-content: space-between;
            flex-wrap: wrap;
            li {
                width: 31%;
                height: 31%;
                background: #ff318d;
                text-align: center;
                img {
                    width: 100%;
                }
                span {
                    display: block;
                    width: 100%;
                    height: 100%;
                    padding-top:5%;
                    font-size: 0.24rem;
                    color: white;
                }
            }
            li.active {
                animation: li 2s ease;
            }
        }
        ul.active {
            animation: ul ease 2s;
        }
    }

    @keyframes ul {
        0% {
            display: block;
            position: relative;
        }
        50% {
            position: relative;
        }
        100% {
            display: flex;
            justify-content: space-between;
            align-content: space-between;
            flex-wrap: wrap;
        }

    }

    @keyframes li {
        0% {
            position: static;
        }
        20% {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
        }
        30% {
            transform: rotate(20deg);
        }
        40% {
            transform: rotate(-20deg);
        }
        50% {
            transform: rotate(20deg);
        }
        60% {
            transform: rotate(-20deg);
        }
        70% {
            transform: rotate(20deg);
        }
        80% {
            transform: rotate(0deg);
        }
        100% {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
        }
    }

    footer {
        background: url("../assets/img/maoxian_09.png") no-repeat center/cover;
        height: 33%;
        position: relative;
        main {
            position: absolute;
            bottom: 5%;
            left: 0;
            width: 100%;
            height: 1rem;
            display: flex;
            justify-content: space-around;
            align-items: center;
            div {
                width: 46%;
                height: 100%;
            }
        }

    }
</style>
