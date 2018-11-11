<template>
    <div class="music">
        <mhead/>
        <mnav/>
        <keep-alive>
            <router-view/>
        </keep-alive>
        <player/>
    </div>
</template>
<script>
    import Mhead from './header.vue'
    import Mnav from './nav.vue'
    import Player from './player.vue'
  export default {
      components:{
        Mhead,
        Mnav,
        Player
      },
  }
</script>

