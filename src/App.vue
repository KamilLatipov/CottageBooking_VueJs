<template>
    <div>
    <Header/>
    <router-view></router-view>
    </div>
</template>
<script>
    import Header from '@/components/header'
  export default {
    components : {
       Header,
    },

  }
</script>

<style lang="scss">
@import 'assets/main.scss';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
    margin: 0;
}
    a {
        text-decoration: none;
        color: #8bc540;
    }
    ul {
        list-style: none;
    }
</style>
