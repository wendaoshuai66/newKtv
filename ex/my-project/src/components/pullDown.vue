<template>
<div class="pullDownBox" ref="pullDownBox" @touchstart="start($event)">
        {{message}}
    <div class="pullDownCon" ref="pullDownCon">
        <slot></slot>
    </div>
</div>
</template>

<script>
export default {
    name: 'pullDown',
    props:["fn","autoload"],
    data(){
        return{
            startX:0,
            startY:0,
            moveX:0,
            moveY:0,
            pullDownBox:null,
            pullDownCon:null,
            message:"下拉刷新",
            flag:true,
        }
    },
    mounted(){
        this.pullDownBox=this.$refs["pullDownBox"];
        this.pullDownCon=this.$refs["pullDownCon"];
        if(this.autoload&&this.fn){
            this.fn(this);
        }
    },
    methods:{
        start(e){
            if(!this.flag){
                return;
            };
            this.pullDownCon.style.transition="none";
            this.startX=e.touches[0].pageX;
            this.startY=e.touches[0].pageY;
            this.pullDownBox.addEventListener("touchmove",this.move);
            this.pullDownBox.addEventListener("touchend",this.end)
        },
        move(e){
            this.moveX=e.touches[0].pageX;
            this.moveY=e.touches[0].pageY;
            if(this.moveY>this.startY&&Math.abs(this.moveY-this.startY)>5){
                var length=(this.moveY-this.startY-5)/5;
                this.pullDownCon.style.transform="translate(0,"+length+"px)";
            }
        },
        end(e){
            this.flag=false;
            this.message="正在更新...";
            this.pullDownBox.removeEventListener("touchmove",this.move);
            this.pullDownBox.removeEventListener("touchstart",this.start);
            this.pullDownCon.style.transition="transform .5s ease";
            this.pullDownCon.style.transform="translate(0,24px)";
            if(this.fn){
                this.fn(this);
            }

        },
        over(){
            this.flag=true;
            this.message="更新完毕";
            this.pullDownCon.style.transform="translate(0,0px)";
        }
    }
}
</script>

<style scoped>
    .pullDownBox{
        width:100%;
        height:auto;
        font-size:16px;
        text-align: center;
        position:relative;
    }
    .pullDownCon{
        width:100%;
        height:auto;
        background:#fff;
        padding: 0 0.1rem 0.87rem 0.1rem;
        position:absolute;
        top:0;
        left:0;
        z-index:10;
    }
</style>
