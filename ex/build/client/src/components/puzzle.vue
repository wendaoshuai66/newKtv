<template>
    <div class="puzzle">
        <header>
            <div class="back" @click="$router.go(-1)"></div>
            <b>· 智力拼图 ·</b>
        </header>
        <section>
            <ul>
                <li :class="{'puzzle': true, 'puzzle-empty': !puzzle}"
                    v-for="(puzzle,index) in puzzles"
                    v-text="puzzle"
                    @touchstart="moveFn (index)">
                </li>
            </ul>
        </section>
        <footer>
            <img src="../assets/img/puzzle_03.png" alt="">
            <div class="btn-reset" @touchstart="rest">重置游戏</div>
        </footer>
    </div>
</template>

<script>
  export default {
    data () {
      return {
        puzzles: [],
      }
    },
    computed:{


    },
    methods: {
      // 重置渲染
      renders () {
        let puzzleArr = [],
          i = 1

        // 生成包含1 ~ 15数字的数组
        for (i; i < 16; i++) {
          puzzleArr.push(i)
        }

        // 随机打乱数组
        puzzleArr = puzzleArr.sort(() => {
          return Math.random() - 0.5
        });

        // 页面显示
        this.puzzles = puzzleArr
        this.puzzles.push('')
      },

      // 点击方块
      moveFn(index) {

        // 获取点击位置及其上下左右的值
        let curNum = this.puzzles[index],
          leftNum = this.puzzles[index - 1],
          rightNum = this.puzzles[index + 1],
          topNum = this.puzzles[index - 4],
          bottomNum = this.puzzles[index + 4]

        // 和为空的位置交换数值
        if (leftNum === '' && index % 4) {
          this.$set(this.puzzles,index - 1, curNum)
          this.$set(this.puzzles,index, "")
        } else if (rightNum === '' && 3 !== index % 4) {
          this.$set(this.puzzles,index + 1, curNum)
          this.$set(this.puzzles,index, '')
        } else if (topNum === '') {
          this.$set(this.puzzles,index - 4, curNum)
          this.$set(this.puzzles,index, '')
        } else if (bottomNum === '') {
          this.$set(this.puzzles,index + 4, curNum)
          this.$set(this.puzzles,index, '')
        }

        this.passFn()
      },

      // 校验是否过关
      passFn () {
        if (this.puzzles[15] === '') {
          const newPuzzles = this.puzzles.slice(0, 15)

          const isPass = newPuzzles.every((e, i) => e === i + 1)

          if (isPass) {
            alert ('恭喜，闯关成功！')
          }
        }
      },

      //重置
      rest(){
        this.renders();
      }
    },
    beforeMount(){
      this.renders();
    }
  }
</script>

<style scoped lang="scss">
    .puzzle {
        width: 100%;
        height: 100%;
        header {
            width: 100%;
            padding: 3%;
            height: 1.5rem;
            box-sizing: border-box;
            background: url("../assets/img/8.png") no-repeat center;
            background-size: cover;

            .back {
                position: absolute;
                top: 0.36rem;
                left: 0.24rem;
                width: 0.4rem;
                height: 0.4rem;
                z-index: 5;
                background: url("../assets/img/icon_03.png") no-repeat center;
            }
            b {
                font-size: 0.36rem;
                position: absolute;
                top: 30px;
                left: 0;
                right: 0;
                margin: auto;
                font-weight: normal;
            }
        }
        section{
            height: 53%;
            ul {
                width: 93.6%;
                height: 100%;
                margin: 0 auto;
                background: #fff;
                border-radius: 5px;
                box-shadow: 0 0 20px rgba(255, 48, 139, 0.4);
                display: flex;
                flex-wrap: wrap;
                .puzzle {
                    width: 25%;
                    height: 25%;
                    box-sizing: border-box;
                    font-size: 32px;
                    background: #f90;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border: 1px solid #ccc;
                    box-shadow: 1px 1px 4px;
                    text-shadow: 1px 1px 1px #B9B4B4;
                    cursor: pointer;
                }
                .puzzle-empty {
                    background: #ccc;
                    box-shadow: inset 2px 2px 18px;
                }
            }
        }
        footer {
            width: 100%;
            padding: 0.5rem 0.2rem 0;
            box-sizing: border-box;
            img{
                width: 100%;
                display: block;
            }
            background-size: 100%;
            position: relative;
            .btn-reset {
                background: url("../assets/img/done.png") no-repeat center/100%;
                width: 60%;
                height: 1rem;
                margin: auto;
                font-size: 0.32rem;
                color: white;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
    }


</style>