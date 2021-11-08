<template>
  <div class="container">
    <router-view />
    <JDFooter />
  </div>
</template>

<script>
import JDFooter from './components/JDFooter'
export default {
  components: {
    JDFooter
  }
}
</script>

<style lang="scss">
html {
    font-size: 20px;
    font-size: 5.33333vw;
}
html, body, .container {
  width: 100%;
  height: 100%;
}
.container{
  display: flex;
  overflow: auto;
  flex-direction: column;
}
</style>
