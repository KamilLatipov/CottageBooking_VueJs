<template>
    <div>
        <header class="main-header">
           <nav class="main-nav">
            <div class="main-nav__link main-nav__image">
                <img width="67" height="67" src="../assets/house.png"/>
            </div>
             <div v-if="isLoggedIn" class="main-nav__user">
                  <p>Приветствуем на сайте rent-abrom.ru! </p>
                  <a class="main-nav__logout" @click="logout">Выйти</a>
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
            ...mapGetters({
                isLoggedIn: "isLoggedIn",
            }),

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