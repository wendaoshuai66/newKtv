<template>
    <transition name="confirm-fade">
        <div class="confirm" v-show="showFlag" @click.stop>
            <div class="confirm-wrapper">
                <div class="confirm-content">
                    <div class="head">
                        <img src="../assets/img/M-ktv_03.png">
                        <p>温馨提示</p>
                    </div>
                    <p class="text">{{text}}</p>
                    <div class="operate">
                        <div @click='cancel' class="btn left">{{cancelBtnText}}</div>
                        <div @click="confirm" class="btn">{{confirmBtnText}}</div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
  export default {
    props: {
      text: {
        type: String,
        default: ''
      },
      confirmBtnText: {
        type: String,
        default: '确定'
      },
      cancelBtnText: {
        type: String,
        default: '取消'
      }
    },
    data() {
      return {
        showFlag: false
      }
    },
    methods: {
      show() {
        this.showFlag = true
      },
      hide() {
        this.showFlag = false
      },
      cancel() {
        this.hide()
        this.$emit('cancel')
      },
      confirm() {
        this.hide()
        this.$emit('confirm')
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .confirm {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 998;
        background-color: rgba(0, 0, 0, 0.65);
        &.confirm-fade-enter-active {
            animation: confirm-fadein 0.3s;
            .confirm-content {
                animation: confirm-zoom 0.3s
            }
        }
        .confirm-wrapper {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 999;
            .confirm-content {
                width: 3rem;
                border-radius: .2rem;
                background: #F2E8F2;
                overflow: hidden;
                .head{
                    background: #ff318d;
                    padding: 0.2rem;
                    text-align: left;
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    color: white;
                    font-size: 0.24rem;
                    img{
                        display: block;
                        border-radius: 10px;
                        width: .4rem;
                        margin-right: .2rem;
                    }
                }
                .text {
                    padding: .3rem;
                    line-height: 0.24rem;
                    text-align: left;
                    font-size: 0.2rem;
                    color: rgba(0, 0, 0, 0.85);
                }
                .operate {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    font-size: 0.24rem;
                    padding: 0 0 0.3rem;
                    .btn {
                        flex: 1;
                        line-height: 0.24rem;
                        padding: 0.12rem 0.24rem;
                        margin: 0 0.1rem;
                        color: rgba(0, 0, 0, 0.85);
                        border: 0.01rem solid #BCC6C5;
                        border-radius: 0.05rem;
                    }
                    .left {
                         border: 0.01rem solid #FF90C2;
                         background: #FFEFF6;
                         color: #ff318d;
                     }
                }
            }
        }
        @keyframes confirm-fadein {
            0% {
                opacity: 0;
            }
            100% {
                opacity: 1
            }
        }
        @keyframes confirm-zoom {
            0% {
                transform: scale(0)
            }
            50% {
                transform: scale(1.1)
            }
            100% {
                transform: scale(1)
            }
        }
    }
</style>
