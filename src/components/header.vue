<template>
    <div id="app">
        <header class="main-header">
           <nav class="main-nav">
            <router-link to="/home" class="main-nav__link main-nav__image">
                <img width="67" height="67" src="../assets/house.png"/>
            </router-link>
             <div class="main-nav__user">
              <div v-if="isLoggedIn">
                  <a class="main-nav__logout" @click="logout">Выйти</a>
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
                isLoggedIn: "isLoggedIn",
                isAdmin: "isAdmin"
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
</style>