<template>
    <div id="app">
        <header class="main-header">
           <nav class="main-nav" >
            <router-link to="/" class="main-nav__link main-nav__image">
                <img width="67" height="67" src="../assets/house.png"/>
            </router-link>
             <div class="main-nav__user">
              <span v-if="isLoggedIn"> | <a @click="logout">Logout</a></span>
              <router-link to="/Login" v-if="!isLoggedIn" class="main-nav__link">Войти</router-link>
                 <router-link to="/Registration" v-if="!isLoggedIn" class="main-nav__link">Зарегистрироваться</router-link>
             </div>
           </nav>
        </header>
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: "header",
        computed : {
            isLoggedIn : function(){ return this.$store.getters.isLoggedIn}
        },
        methods: {
            logout: function () {
                this.$store.dispatch('logout')
                    .then(() => {
                        this.$router.push('/login')
                    })
            }
        },
    }

</script>

<style scoped>
  .main-header {
      width: 100%;

      box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.09);
  }
  .main-nav {
      display: flex;
      align-items: center;
      justify-content: space-between;

      margin: 0 200px;
      padding: 5px 0;
  }
  .main-nav__user  {
      display: flex;
      justify-content: space-around;

      width: 250px;
  }

</style>