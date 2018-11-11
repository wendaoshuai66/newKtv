<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
  export default {
    name: 'app',
    beforeUpdate() {
      if (!sessionStorage.info) {
        this.$router.push({
          name: 'login'
        })
      }
    },

  }
</script>

