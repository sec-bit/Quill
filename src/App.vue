<template>
  <div id="app">
    <div class="image_content">
      <img src="./assets/logo.png">
    </div>
    <div class="title_content">
      <span class="main_title">Quill</span>
      <span class="sub_content">—— An open source cryptocurrency signature tool</span>
    </div>
    <br/>
    <router-view/>
    <!-- <footer class="footer-content">designed by secbit labs</footer> -->
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 20px;
}
.image_content{
  width: 80%;
  margin:auto;
}
.title_content{
  text-align:center;
  padding: 20px;
}
.main_title{
  font-size:48px;
  font-weight: bold;
}
.sub_content{
  font-size: 20px;
  font-weight: bold;
}
.footer-content{
  text-align: center;
  color: #6c7075;
  font-size: 14px;
}
</style>
