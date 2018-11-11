<template>
    <scroll class="listview" :data="data" ref="listview"
            :listen-scroll="listenScroll" @scroll="scroll"
            :probe-type="probeType">
        <ul>
            <li v-for="group in data" class="list-group" ref="listGroup" :key="group.key">
                <h2 class="list-group-title">{{group.title}}</h2>
                <ul>
                    <li @click="selectItem(item)"
                        v-for="item in group.items"
                        class="list-group-item"
                        :key="item.key">
                        <img v-lazy="item.avatar" class="avatar">
                        <span class="name">{{item.name}}</span>
                    </li>
                </ul>
            </li>
        </ul>
        <div class="list-shortcut" @touchstart.stop.prevent="onShortcutTouchStart"
             @touchmove.stop.prevent="onShortcutTouchMove" @touchend.stop>
            <ul>
                <li v-for="(v,i) in shortcutList" class="item"
                    :data-index="i" :key="v.key"
                    :class="{'current':currentIndex==i}">
                    {{v}}
                </li>
            </ul>
        </div>
        <div class="list-fixed" ref="fixed" v-show="fixedTitle">
            <div class="fixed-title">{{fixedTitle}} </div>
        </div>
        <div v-show="!data.length" class="loading-container">
            <loading></loading>
        </div>
    </scroll>
</template>
<script>
  import Scroll from './scroll'
  import {getData} from '../assets/js/dom'
  import Loading from './loading'

  const ANCHOR_HEIGHT = 18
  const TITLE_HEIGHT = 50
  export default {
    props: {
      data: {
        type: Array,
        default: []
      }
    },
    data() {
      return {
        scrollY: -1,
        currentIndex: 0,
        diff: -1
      }
    },
    computed: {
      shortcutList() {
        return this.data.map((group) => {
          return group.title.substr(0, 1)
        })
      },
      fixedTitle() {
        if (this.scrollY > 0) {
          return ''
        }
        return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
      }
    },
    created() {
      this.probeType = 3
      this.listenScroll = true
      this.touch = {}
      this.listHeight = []
    },
    methods: {
      selectItem(item){
        this.$emit('select',item)
      },
      onShortcutTouchStart(e) {
        let anchorIndex = getData(e.target, 'index')
        let firstTouch = e.touches[0]
        this.touch.y1 = firstTouch.pageY
        this.touch.anchorIndex = anchorIndex
        this._scrollTo(anchorIndex)
      },
      onShortcutTouchMove(e) {
        let firstTouch = e.touches[0]
        this.touch.y2 = firstTouch.pageY
        let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
        let anchorIndex = parseInt(this.touch.anchorIndex) + delta
        this._scrollTo(anchorIndex)
      },
      refresh() {
        this.$refs.listview.refresh()
      },
      scroll(pos) {
        this.scrollY = pos.y
      },
      _scrollTo(index) {
        if (!index && index !== 0) {
          return
        }
        if (index < 0) {
          index = 0
        } else if (index > this.listHeight.length - 2) {
          index = this.listHeight.length - 2
        }
        this.scrollY = -this.listHeight[index]
        this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
      },
      _calculateHeight() {
        this.listHeight = []
        const list = this.$refs.listGroup
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < list.length; i++) {
          let item = list[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }

      }
    },
    watch: {
      data() {
        setTimeout(() => {
          this._calculateHeight()
        }, 20)
      },
      scrollY(newY) {
        const listHeight = this.listHeight
        //当滚动到顶部，newy>0
        if (newY > 0) {
          this.currentIndex = 0
          return
        }
        //在中间部分滚动

        for (let i = 0; i < listHeight.length - 1; i++) {
          let height1 = listHeight[i]
          let height2 = listHeight[i + 1]
          if (-newY >= height1 && -newY <= height2) {
            this.currentIndex = i
            this.diff = newY + height2
            return
          }
        }
        //滚动到底部，且newY大于最后一个元素的上限
        this.currentIndex = listHeight.length - 2
      },
      diff(newVal) {
        let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
        if (this.fixedTop == fixedTop) {
          return
        }
        this.fixedTop = fixedTop
        this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
      }
    },
    components: {
      Scroll,
      Loading
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .listview {
        position: relative;
        width: 100%;
        height: 100%;
        padding: 0 0.2rem;
        box-sizing: border-box;
        overflow: hidden;
        .list-group {
            padding-bottom: 0.3rem;
            .list-group-title {
                width: 95%;
                height: 0.5rem;
                line-height: 0.5rem;
                padding-left: 0.2rem;
                text-align: left;
                font-size: 0.2rem;
                color: white;
                background: #ff318d;
                border-radius: 0.05rem;
                margin-bottom: 0.1rem;
            }
            ul {
                display: flex;
                justify-content: flex-start;
                flex-wrap: wrap;
                .list-group-item {
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                    align-items: center;
                    width: 33%;
                    .avatar {
                        height: 69%;
                        width: 90%;
                        border: 0.02rem solid white;
                        box-shadow: 0 0 0.02rem #FFF0F4;
                        border-radius: 0.08rem;
                    }
                    .name {
                        height: 0.8rem;
                        font-size: 0.24rem;
                        text-align: center;
                        color: #404040;
                        padding: 0.1rem;
                        padding-bottom: 0;
                    }
                }
            }
        }
        .list-shortcut {
            position: absolute;
            z-index: 30;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 26px;
            padding: 20px 0;
            border-radius: 10px;
            text-align: center;
            background: white;
            .item {
                padding: 3px;
                height: 20px;
                width: 20px;
                line-height: 1;
                text-align: center;
                color: #404040;
                font-size: 0.2rem;
                &.current {
                    background: #ff318d;
                    border-radius: 50%;
                    color: white;
                }
            }

        }
        .list-fixed {
            position: absolute;
            top: -0.01rem;
            left: 0;
            width: 100%;
            .fixed-title {
                height: 0.5rem;
                line-height: 0.5rem;
                padding-left: 0.4rem;
                text-align: left;
                font-size: 0.2rem;
                color: white;
                background: #ff318d;
            }

        }
        .loading-container {
            position: absolute;
            width: 100%;
            top: 50%;
            transform: translateY(-50%)
        }

    }
</style>
