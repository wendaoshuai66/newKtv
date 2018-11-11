<template>
    <ul class="switches">
        <li class="switch-item" v-for="(item,index) in switches" :class="{'active':currentIndex==index}" @click="switchItem(index)">
            <span>{{item.name}}</span>
        </li>
    </ul>
</template>

<script>
  export default {
    props:{
      switches:{
        type:Array,
        default:[]
      },
      currentIndex:{
        type:Number,
        default:0
      }
    },
    methods:{
      switchItem(index){
        this.$emit('switch',index)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .switches{
        display: flex;
        align-items: center;
        width: 300px;
        margin: 0 auto;
        border: 2px solid white;
        border-radius: 8px;
        overflow: hidden;
        .switch-item{
            flex: 1;
            padding: 10px;
            text-align: center;
            font-size: 24px;
            background: white;
            color: #ff318d;
            &.active{
                background:#ff318d;
                color: white;
            }

        }

    }



</style>
