<template>
    <div id="app">
        <header class="main-header">
           <nav class="main-nav">
            <router-link to="/home" class="main-nav__link main-nav__image">
                <img width="67" height="67" src="../assets/house.png"/>
            </router-link>
             <div class="main-nav__user">
              <div v-if="isLoggedIn">
                  <a @click="logout">Выйти</a>
              </div>
             </div>
           </nav>
        </header>
    </div>
</template>

<script>
    import { mapGetters } from "vuex";

    export default {
        data() {
            return {};
        },
        computed: {
            //isLoggedIn : function(){ return this.$store.getters.isLoggedIn},
            ...mapGetters({
                isLoggedIn: "isLoggedIn"
            })
        },
        methods: {
            logout: function () {
                this.$store.dispatch('logout')
                    .then(() => {
                        this.$router.push('/')
                    })
            },
        }
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