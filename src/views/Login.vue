<template>
   <div class="login-window">
    <div class="login-form">
        <form class="login-form__field" @submit.prevent="authorization">
            <ul class="user-form">
                <li>
                    <h1 class="login-window__headline">
                        Вход в личный кабинет
                    </h1>
                </li>
                <li class="user-form__login user-form__item">
                        <label class="user-form__label">Ваш логин</label>
                        <input class="user-form__input" required v-model="login" type="text"/>
                </li>
                <li class="user-form__password user-form__item">
                        <label class="user-form__label">Пароль</label>
                        <input class="user-form__input" required v-model="password" type="password"/>
                </li>
                <li class="user-form__item error">{{error}}</li>
                <li class="user-form__sign-in user-form__item">
                    <button class="user-form__button" type="submit">Войти</button>
                    <div class="user-form__link">
                        <router-link to="/Registration" class="user-form__link--register">Зарегистрироваться</router-link>
                    </div>
                </li>
            </ul>
        </form>
    </div>
   </div>
</template>

<script>
    import { mapGetters } from "vuex";
    export default {
        data(){
            return {
                login : "",
                password : "",
                error: ""
            }
        },
        methods: {
            authorization: function () {
                let login = this.login
                let password = this.password
                this.$store.dispatch('authorization', { login, password })
                    .then(() => this.$router.push("/home"))
                    .catch(err => {
                        this.$store.dispatch('logout')
                        this.error = 'Неправильный логин или пароль'
                    });
            }
        },
        computed: {
            ...mapGetters({
                isLoggedIn: "isLoggedIn"
            })
        },
    }
</script>

<style scoped>
</style>
