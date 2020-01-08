<template>
    <div class="register-window">
        <h1>Регистрация</h1>
        <form @submit.prevent="register">
            <ul class="user-form">
                <li class="user-form__login user-form__item">
                    <label for="name">Ваше имя</label>
                    <input id="name" type="text" v-model="firstName" required autofocus>
                </li>
                <li class="user-form__password user-form__item">
                    <label for="email" >Ваша почта</label>
                    <input id="email" type="email" v-model="lastName" required>
                <li class="user-form__sign-in user-form__item">
                    <label for="password">Пароль</label>
                    <input id="password" type="password" v-model="login" required>
                </li>
                <li class="user-form__sign-in user-form__item">
                    <label for="password-confirm">Подвердите пароль</label>
                    <input id="password-confirm" type="password" v-model="password" required>
                </li>
                <li class="user-form__sign-in user-form__item">
                    <button type="submit">Register</button>
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
                    .then(() => this.$router.push('/'))
                    .catch(err => alert(err))
            }
        }
    }
</script>

<style scoped>
    .register-window {
        width: 600px;
        height: 530px;

        margin: 50px auto 0 auto;

        border: 1px solid rgba(0,0,0 , 0.2);
        border-radius: 10px 10px;
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

        width: 500px;

        padding-bottom: 25px;
    }
    label {
        margin-bottom: 10px;
    }
    input {
        height: 45px;
        width: 100%;

        padding: 0 10px;

        font-size: 20px;
        line-height: 26px;
    }
</style>