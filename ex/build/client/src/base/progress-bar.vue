<template>
    <div class="progress-bar" ref="progressBar" @click="progressClick">
        <div class="bar-inner">
            <div class="progress" ref="progress"></div>
            <div class="progress-btn-wrapper"
                 ref="progressBtn"
                 @touchstart.prevent="progressTouchStart"
                 @touchmove.prevent="progressTouchMove"
                 @touchend="progressTouchEnd">
                <div class="progress-btn"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import {prefixStyle} from '../assets/js/dom'
    const transform=prefixStyle('transform')
    const progressBtnWidth=16
  export default {
    props:{
      percent:{
        type:Number,
        default:0
      }
    },
    created(){
      this.touch={}//用于共享数据
    },
    methods:{
      progressTouchStart(e){
        this.touch.initiated=true
        this.touch.startX=e.touches[0].pageX
        this.touch.left=this.$refs.progress.clientWidth
      },
      progressTouchMove(e){
        if(!this.touch.initiated){
          return
        }
        const deltaX=e.touches[0].pageX-this.touch.startX
        const offsetWidth=Math.min(this.$refs.progressBar.clientWidth-progressBtnWidth,
        Math.max(0,this.touch.left+deltaX))
        this._offset(offsetWidth)
      },
      progressTouchEnd(){
        this.touch.initiated=false
        this._triggerPercent()
      },
      progressClick(e){
        //直接获取offsetx会出现突然归零的bug，改用的函数可以获取dom距client的距离
        const rect=this.$refs.progressBar.getBoundingClientRect()
        const offsetWidth=e.pageX-rect.left
        this._offset(offsetWidth)
        this._triggerPercent()
      },
      _triggerPercent(){
        const barWidth=this.$refs.progressBar.clientWidth-progressBtnWidth
        const percent=this.$refs.progress.clientWidth/barWidth
        this.$emit('percentChange',percent)
      },
      _offset(offsetWidth){
        this.$refs.progress.style.width=`${offsetWidth}px`
        this.$refs.progressBtn.style[transform]=`translate3d(${offsetWidth}px,0,0)`
      }
    },
    watch:{
      percent(newPercent){
        if(newPercent>=0&&!this.touch.initiated){
          const barWidth=this.$refs.progressBar.clientWidth-progressBtnWidth
          const offsetWidth=newPercent*barWidth
            this._offset(offsetWidth)
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .progress-bar {
        box-sizing: border-box;
        margin: 0 0.2rem;
        height: .4rem;
        display: flex;
        align-items: center;
        justify-content: center;
        .bar-inner {
            background: rgba(0, 0, 0, 0.3);
            border-radius: 1rem;
            position: relative;
            height: 0.06rem;
            width: 100%;
            .progress {
                position: absolute;
                height: 100%;
                background: #ff318d;
                border-radius: 1rem;
            }
            .progress-btn-wrapper {
                position: absolute;
                top:-18px;
                left: 0;
                width: 0.4rem;
                height: 0.4rem;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                .progress-btn {
                    width: .1rem;
                    height:.1rem;
                    border: 0.05rem solid white;
                    border-radius: 50%;
                    background: #ff318d;
                }
            }
        }
    }
</style>
