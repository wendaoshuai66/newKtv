<template>
    <div class="progress-circle">
        <svg :width="radius" :height="radius" viewBox="0 0 120 120"
             version="1.1" xmlns="http://www.w3.org/2000/svg">
            <circle class="progress-background" r="60" cx="60" cy="60" fill="transparent"/>
            <circle class="progress-bar" r="60" cx="60" cy="60" fill="transparent"
                    :stroke-dasharray="dashArray" :stroke-dashoffset="dashOffset"/>
        </svg>
        <slot></slot>
    </div>
</template>

<script>
  export default {
    props: {
      radius: {
        type: Number,
        default: 100
      },
      percent: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        dashArray: Math.PI * 120
      }
    },
    computed: {
      dashOffset() {
        return (1 - this.percent) * this.dashArray
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .progress-circle {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        circle {
            stroke-width: .1rem;
            transform-origin: center;
            &.progress-background {
                transform: scale(0.9);
                stroke: white;
            }
            &.progress-bar {
                transform: scale(0.9) rotate(-90deg);
                stroke: red;
            }
        }
    }


</style>
