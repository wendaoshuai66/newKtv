<template>
    <div class="risk" v-if="s">
        <header>
            <div class="back" @click="$router.go(-1)"></div>
            <b>· 猜猜乐 ·</b>
            <div class="tmp"></div>
        </header>
        <section>
            <div :class="flag?'active':''" @click="tt=2" class="guessbox">
                <transition name="fade" mode="out-in">
                    <img src="../assets/img/question_03.png" alt="" v-if="tt==0" class="filter">
                    <div v-else-if="tt==1" class="question">
                        <p v-if="aid==0">{{risk[0].question}}</p>
                        <img v-else-if="aid==1" :src='risk[0].question' alt="">
                    </div>
                    <div class="answer" v-else>
                        <span >{{risk[0].answer}}</span>
                    </div>
                </transition>
            </div>
        </section>
        <footer>
            <main>
                <div class="zhen" @click="f(0)"></div>
                <div class="da" @click="f(1)"></div>
            </main>
        </footer>
    </div>
    <div v-else><img src="../assets/img/loading.gif" alt=""
                     style="width: 100%;height: 100%;display: block;padding-top: 50%"></div>
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
        tt: 0,
      }
    },
    computed: {
      arr() {
        let newarr = [];
        this.ku.forEach(val => {
          if (val.typeid == this.aid) {
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
        this.risk = this.getarr(this.arr, 1)
        return this.risk
      },
      f(id) {
        setTimeout(() => {
          this.tt = 1
          if (this.fa) {
            this.aid = id
            this.flag = true;
            this.newget()
            this.fa = false
            setTimeout(() => {
              this.flag = false
              this.fa = true
            }, 3000)
          }
        }, 2000)

      }
    },
    watch: {
      tt() {
        if (this.tt == 2) {
          setTimeout(() => {
            this.tt = 0
            if (this.fa) {
              this.flag = true;
              this.newget()
              this.fa = false
              setTimeout(() => {
                this.tt = 1
                this.flag = false
                this.fa = true
              }, 2000)
            }
          }, 2000)
        }
      }
    },
    beforeMount() {
      this.$http.get('/ktv/guess').then(mess => {
        this.ku = mess.body
        this.s = true
        setTimeout(this.f(0), 1000)
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
        height: 0.4rem;
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
        .tmp {
            width: 0.4rem;
            height: 0.4rem;
        }
    }

    section {
        margin: 3%;
        height: 53%;
        padding: 3%;
        box-sizing: border-box;
        background: white;
        border-radius: 0.1rem;
        box-shadow: 0 0 .2rem 0.05rem rgba(255, 47, 138, 0.4);
        position: relative;
        .guessbox {
            width: 100%;
            height: 100%;
            background: #ff318d;
            box-sizing: border-box;
            margin: auto;
            position: relative;
            z-index: 0;
            .filter, .question, .answer {
                display: block;
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-wrap: wrap;
                line-height: 0.5rem;
                font-size: 0.26rem;
            }
            .question {
                img {
                    display: block;
                    width: 100%;
                    height:100%;
                    background: white;
                }
            }
            .answer {
                background: url("../assets/img/zxh-background.png") no-repeat center/cover;
                span{
                    width: 38%;
                    padding-top: 14%;
                }
            }
        }
        .guessbox.active {
            animation: div ease 2s;
        }
    }

    @keyframes div {
        0% {
            transform: scale(0.8, 0.8);
        }
        20% {
            transform: scale(0.6, 0.6);
        }
        30% {
            transform: rotate(20deg) scale(0.6, 0.6);
        }
        40% {
            transform: rotate(-20deg) scale(0.6, 0.6);
        }
        50% {
            transform: rotate(20deg) scale(0.6, 0.6);
        }
        60% {
            transform: rotate(-20deg) scale(0.6, 0.6);
        }
        70% {
            transform: rotate(20deg) scale(0.6, 0.6);
        }
        80% {
            transform: rotate(0deg) scale(0.6, 0.6);
        }
        100% {
            transform: scale(1, 1);
        }
    }

    footer {
        background: url("../assets/img/guess_02.png") no-repeat center;
        background-size: cover;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 32%;
        padding: 3%;
        box-sizing: border-box;
        main {
            position: absolute;
            bottom: 0.4rem;
            left: 0;
            width: 100%;
            height: 0.6rem;
            display: flex;
            justify-content: space-around;
            align-items: center;
            div {
                width: 3rem;
                height: 100%;
            }
        }

    }
</style>
