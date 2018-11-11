<template>
<div class="slider">
    <div class="slider-container" ref="container" @touchstart="start($event)">
        <slot></slot>
    </div>
</div>
</template>

<script>
export default {
    name: 'silder',
    data(){
      return{
          num:0,
          container:null,
          startX:0,
          startY:0,
          moveX:0,
          moveY:0,
          direction:"",
          current:"",
          moveNum:0,
          length:200,
      }
    },
    mounted(){
        var container=this.$refs["container"];
        this.container=container;
        var list=document.querySelectorAll(".slider-list");
        this.num=list.length;
        var num=this.num;
        container.style.width=num*100+"%";
        for(var i=0;i<list.length;i++){
            list[i].style.width=100/num+"%";
        }
    },
    methods:{
        start(e){
            this.current=this.container.style.marginLeft;
            this.startX=e.touches[0].pageX;
            this.startY=e.touches[0].pageY;
            this.container.addEventListener("touchmove",this.move);
            this.container.addEventListener("touchend",this.end)
        },
        move(e){
            this.moveX=e.touches[0].pageX;
            this.moveY=e.touches[0].pageY;
            if(this.moveX>this.startX&&Math.abs(this.moveX-this.startX)>3){
                this.direction='right';
                this.container.style.marginLeft=(this.moveX-this.startX)+'px';
            }else{
                this.direction='left';
                this.container.style.marginLeft=(this.moveX-this.startX)+'px';
            }
        },
        end(e){
            this.container.removeEventListener("touchmove",this.move);
            this.container.removeEventListener("touchstart",this.start);
            if(this.direction=='right'){
                if(Math.abs(this.moveX-this.startX)>this.length){
                    this.moveNum++;
                    if(this.moveNum>0){
                        this.moveNum=0;
                    }
                }
            }else if(this.direction=='left'){
                if(Math.abs(this.moveX-this.startX)>this.length){
                    this.moveNum--;
                    if(this.moveNum<-(this.num-1)){
                        this.moveNum=-(this.num-1);
                        console.log(this.moveNum);
                    }
                }
            }
            this.container.style.transition="margin 0.5s ease";
            this.container.style.marginLeft=this.moveNum*document.documentElement.clientWidth+'px';
        }
    }
}
</script>

<style scoped>
    .slider{
        width:100%;
        height:200px;
        overflow: hidden;
    }
    .slider-container{
        width:200%;
        height:100%;
    }
    .slider-list{
        width:50%;
        height:100%;
        background:#fff;
        float:left;
    }
</style>
