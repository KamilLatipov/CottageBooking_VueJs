<template>
    <div class="register-window">
        <form @submit.prevent="register">
            <ul class="user-form">
                <li class="register-window__headline">
                    <h1>Регистрация</h1>
                </li>
                <li class="user-form__login user-form__item">
                    <label for="name">Ваше имя</label>
                    <input id="name" type="text" v-model="firstName" required autofocus>
                </li>
                <li class="user-form__password user-form__item">
                    <label for="email" >Ваша фамилия</label>
                    <input id="email" type="text" v-model="lastName" required>
                <li class="user-form__sign-up user-form__item">
                    <label for="password">Логин</label>
                    <input id="password" type="text" v-model="login" required>
                </li>
                <li class="user-form__sign-up user-form__item">
                    <label for="password-confirm">Пароль</label>
                    <input id="password-confirm" type="password" v-model="password" required>
                </li>
                <li class="user-form__sign-up user-form__item user-form__item--last">
                    <button type="submit">Зарегистрироваться</button>
                    <div class="user-form__item--login">
                        <router-link to="/" style="font-size: 16px">Войти в аккаунт</router-link>
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
            }
        },
        methods: {
            register: function () {
                let data = {
                    firstName: this.firstName,
                    lastName: this.lastName,
                    login: this.login,
                    password: this.password,
                }
                this.$store.dispatch('register', data)
                    .then(() => this.$router.push("/"))
                    .catch(err => alert(err))
            },
        }
    }
</script>

<style scoped>
    .register-window {
        width: 600px;

        margin: 22px auto 0 auto;

        border: 1px solid rgba(0,0,0 , 0.2);
        border-radius: 10px 10px;
    }
    .register-window__headline {
        display: flex;
        margin: 0 auto;

        padding-top: 30px;
        padding-bottom: 25px;
    }
    .user-form {
        display: flex;
        flex-wrap: wrap;

        width: 400px;

        padding: 0;
        margin: 0 auto;
    }
    .user-form__item {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        width: 500px;

        padding-bottom: 20px;
    }
    .user-form__item--last {
        margin-top: 10px;
    }
    .user-form__item--login {
        padding-top: 13px;
    }
    h1 {
        margin: 0;
    }
    label {
        margin-bottom: 10px;
    }
    input {
        height: 45px;
        width: 100%;
        padding: 3px 10px;

        border-radius: 7px;

        font-size: 20px;
        line-height: 26px;

        outline : none;
    }
    button {
        padding: 15px 36px 15px 36px;

        background-color: #8bc540;
        text-decoration: none;
        border: none;
        border-radius: 10px;
        color: white;

        font-size: 14px;

        outline: none;
        cursor: pointer;
    }
</style>