<template>
<div  id="app">
    <Header/>
    <router-view></router-view>
    <Footer/>
</div>
</template>
<script>
    import Header from '@/components/header'
    import Footer from '@/components/footer'
  export default {
    components : {
       Header,
       Footer,
    },
  }
</script>

<style lang="scss">
@import 'assets/global';
#app {
    -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
    margin: 0;
    font-family: 'Montserrat', sans-serif;
}
    a {
        text-decoration: none;
        color: #8bc540;
        font-size: 25px;
        outline : none;
        cursor: pointer;
    }
    ul {
        list-style: none;
    }
</style>
