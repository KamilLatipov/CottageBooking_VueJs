<template>
    <div class="register-window">
        <form @submit.prevent="register">
            <ul class="r-form">
                <li class="register-window__headline">
                    <h1>Регистрация</h1>
                </li>
                <li class="r-form__item">
                    <label class="r-form__label" for="name">Ваше имя</label>
                    <input class="r-form__input" id="name" type="text" v-model="firstName" required autofocus>
                </li>
                <li class="r-form__item">
                    <label class="r-form__label" for="last-name" >Ваша фамилия</label>
                    <input class="r-form__input" id="last-name" type="text" v-model="lastName" required>
                <li class="r-form__sign-up r-form__item">
                    <label class="r-form__label" for="login">Логин</label>
                    <input class="r-form__input" id="login" type="text" v-model="login" required>
                </li>
                <li class="r-form__sign-up r-form__item">
                    <label class="r-form__label" for="email">Почта</label>
                    <input class="r-form__input" id="email" type="email" v-model="email" required>
                </li>
                <li class="r-form__sign-up r-form__item r-form__password">
                    <label class="r-form__label" for="password">
                        Пароль
                        <input class="r-form__input r-form__input--password" id="password" type="password" v-model="password" required></label>
                    <label class="r-form__label" for="password-confirm">
                        Повторите пароль
                        <input class="r-form__input r-form__input--password" id="password-confirm" type="password" v-model="password_conf" required>
                    </label>
                </li>
                <li class="user-form__sign-in r-form__item error"> {{error}} </li>
                <li class="r-form__sign-up r-form__item r-form__item--last">
                    <button class="r-form__button" type="submit">Зарегистрироваться</button>
                    <div class="r-form__link">
                        <router-link to="/" class="user-form__link--register">Войти в аккаунт</router-link>
                    </div>
                </li>
            </ul>
        </form>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                firstName : "",
                lastName : "",
                login : "",
                password : "",
                password_conf: "",
                email: "",
                error: "",
            }
        },
        methods: {
            register: function () {
                let data = {
                    firstname: this.firstName,
                    lastname: this.lastName,
                    login: this.login,
                    password: this.password,
                    email: this.email,
                }
                if (this.password === this.password_conf) {
                    this.$store.dispatch('register', data)
                        .then(() => this.$router.push("/"))
                        .catch(err => alert(err))
                }
                else {
                    this.error = 'Пароли не совпадают'
                }
            },
        }
    }
</script>

<style scoped>
</style>