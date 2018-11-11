<template>
    <div class="login">
        <header>房间链接</header>
        <section>
            <label for="tell">
                <span>请输入您的手机号</span>
                <input type="text" name="tell" id="tell" placeholder="手机号" v-model="tell" class="i">
                <p v-show="err1">{{mess1}}</p>
            </label>
            <label for="room">
                <span style="margin-top: 40px">请输入您的房间号（4位）</span>
                <input type="text" name="room" id="room" placeholder="房间号" v-model="room" class="i">
                <p v-show="err2">{{mess2}}</p>
            </label>
        </section>
        <footer>
            <div class="submit" ref="sub" @click="sub">进入房间</div>
        </footer>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        tell: '',
        room: '',
        err1: false,
        err2: false,
        mess1: '',
        mess2: '',
        a: false,
        s: false,
        d: false,
        f: false,
      }
    },
    methods: {
      sub() {
        this.err1 = false
        this.err2 = false
        if (!this.tell.length) {
          this.err1 = true
          this.mess1 = '请输入您的手机号'
        } else {
          this.a = true
        }
        if (!this.room.length) {
          this.err2 = true
          this.mess2 = '请输入您的房间号'
          return
        } else {
          this.s = true
        }
        if (/^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(this.tell)) {
          this.d = true
        } else {
          this.err1 = true
          this.mess1 = '请输入正确的11位手机号'
        }
        if (/^((8)\d{3})$/.test(this.room)) {
          this.f = true
        } else {
          this.err2 = true
          this.mess2 = '请输入正确的4位房间号'
        }
        if (this.a && this.s && this.d && this.f) {
          const info = {tell: this.tell, room: this.room}
          sessionStorage.info = JSON.stringify(info)
          this.$router.push({
            name:'index'
          })
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .login {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: url("../assets/img/login.png") no-repeat center/cover;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        header {
            padding: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 36px;
        }
        section {
            width: 60%;
            text-align: left;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            span {
                font-size: 24px;
                padding: 10px 30px;
                display: block;
            }
            input {
                display: block;
                border: none;
                outline: none;
                list-style: none;
                background: #DD198B;
                width: 400px;
                height: 80px;
                border-radius: 200px;
                margin: 10px 0;
                font-size: 28px;
                padding-left: 20px;
                box-sizing: border-box;
                color: white;
                &::placeholder {
                    color: #cccccc;
                }
            }
            p {
                color: red;
                font-size: 20px;
                padding-left: 30px;
            }
        }
        footer {
            margin-bottom: 100px;
            div {
                width: 320px;
                height: 60px;
                border: 10px solid #f3f3f3;
                border-radius: 100px;
                background: white;
                color: #dd198b;
                font-size: 24px;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
    }
</style>
