<template>
    <div class="register-window">
        <form @submit.prevent="register">
            <ul class="r-form">
                <li class="register-window__headline">
                    <h1>Регистрация</h1>
                </li>
                <li class="r-form__login r-form__item">
                    <label class="r-form__label" for="name">Ваше имя</label>
                    <input class="r-form__input" id="name" type="text" v-model="firstName" required autofocus>
                </li>
                <li class="r-form__password r-form__item">
                    <label class="r-form__label" for="last-name" >Ваша фамилия</label>
                    <input class="r-form__input" id="last-name" type="text" v-model="lastName" required>
                <li class="r-form__sign-up r-form__item">
                    <label class="r-form__label" for="password">Логин</label>
                    <input class="r-form__input" id="password" type="text" v-model="login" required>
                </li>
                <li class="r-form__sign-up r-form__item">
                    <label class="r-form__label" for="email">Почта</label>
                    <input class="r-form__input" id="email" type="email" v-model="email" required>
                </li>
                <li class="r-form__sign-up r-form__item">
                    <label class="r-form__label" for="password-confirm">Пароль</label>
                    <input class="r-form__input" id="password-confirm" type="password" v-model="password" required>
                </li>
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
                email: "",
            }
        },
        methods: {
            register: function () {
                let data = {
                    firstName: this.firstName,
                    lastName: this.lastName,
                    login: this.login,
                    password: this.password,
                    email: this.email,
                }
                this.$store.dispatch('register', data)
                    .then(() => this.$router.push("/"))
                    .catch(err => alert(err))
            },
        }
    }
</script>

<style scoped>
</style>