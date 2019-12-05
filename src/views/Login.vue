<template>
   <div class="login-window">
    <h1 class="login-window__headline">
        Вход на сайт
    </h1>
    <div class="login-form">
        <form class="login-form__field" @submit.prevent="login">
            <ul class="user-form">
                <li class="user-form__login">
                    <label></label>
                    <div class="bottom-line">
                        <input required v-model="email" type="email" placeholder="Name"/>
                    </div>
                </li>
                <li class="user-form__password">
                    <label></label>
                    <div class="bottom-line">
                        <input required v-model="password" type="password" placeholder="Password"/>
                    </div>
                <li class="user-form__sign-in">
                    <button type="submit">Login</button>
                </li>
            </ul>
        </form>
        <div class="sideline"></div>
        <div class="user-registration">
            <p class="user-registration__text">У Вас еще нет аккаунта?
            </p>
            <a href="/abd_war/registration" class="user-registration__link" >
                <p>Создать аккаунт.
                </p>
            </a>
        </div>
    </div>
   </div>
</template>

<script>
    export default {
        data(){
            return {
                email : "",
                password : ""
            }
        },
        methods: {
            login: function () {
                let email = this.email
                let password = this.password
                this.$store.dispatch('login', { email, password })
                    .then(() => this.$router.push('/'))
                    .catch(err => alert(err))
            }
        }

    }

</script>

<style scoped>
    .sideline {
        width: 1px;
        height: 240px;
        border-left: 1.1px solid grey;
    }
    .login-window {
        width: 750px;
        margin: 0 auto;
        margin-top: 40px;
    }
    .login-window__headline {
        font-size: 40px;
        font-weight: 200;
        padding-top: 25px;
        margin-bottom: 55px;
        text-transform: lowercase;
    }
    .login-window__headline:first-letter {
        text-transform: uppercase;
    }
    .user-form {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
        width: 330px;
        margin-right: 40px;
        list-style: none;
    }
    .user-form li {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
    }
    .user-form input {
        width: 300px;
        font-size: 20px;
        font-family: 'Montserrat';
        padding: 6px 0 4px 10px;
        border: none;
        outline: none;
    }
    .user-form__login,
    .user-form__password {
        margin-bottom: 20px;
    }
    .user-form__login label,
    .user-form__password label {
        margin-bottom: 5px;
    }
    .user-form__help {
        margin-bottom: 25px;
        font-size: 12px;
        /* Заменить теги на классы */
    }
    .user-form__help label {
        margin-right: 55px;
    }
    .user-form__help a {
        color: black;
    }
    .user-form__remember input {
        width: 15px;
    }
    .user-form__sign-in {
        margin-bottom: 35px;
        margin-top: 20px;
    }
    .user-form__sign-in input {
        width: 150px;
        padding: 10px 0 10px 2px;
        font-size: 17px;
        color: #7cbbf2;
        background-color: white;
        border: 2px solid #7cbbf2;
        border-radius: 20px 20px;
        -webkit-box-shadow: none;
        box-shadow: none;
    }
    .bottom-line {
        border-bottom: 1px solid rgba(191, 191, 191, 0.9);
    }
    .login-form {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
    }
    .user-registration {
        width: 335px;
        margin-left: 35px;
        margin-top: 30px;
        font-size: 20px;
    }
    .user-registration__link p {
        width: 240px;
        padding: 8px 0 8px 0;
        margin-left: 30px;
        color: #7cbbf2;
    }
    .sideline {
        width: 1px;
        height: 240px;
        border-left: 1.1px solid grey;
    }
    .login-checkbox {
        position: relative;
        padding-left: 19px;
        cursor: pointer;
    }
    .login-checkbox input[type="checkbox"] + .checkbox-indicator {
        position: absolute;
        top: 0;
        left: 0;
        width: 14px;
        height: 14px;
        border-radius: 4px 4px;
        background-color: #3899eb;
    }
    .login-checkbox input[type="checkbox"]:focus + .checkbox-indicator {
        border-color: #663d15;
        outline: thin dotted;
        outline: 5px auto -webkit-focus-ring-color;
    }
    .login-checkbox input[type="checkbox"]:checked + .checkbox-indicator::before,
    .login-checkbox input[type="checkbox"]:checked + .checkbox-indicator::after {
        content: "";
        position: absolute;
        top: 6px;
        left: 1.5px;
        width: 11px;
        height: 2px;
        background-color: white;
    }
    .login-checkbox input[type="checkbox"]:checked + .checkbox-indicator::before {
        -webkit-transform: rotate(45deg);
        transform: rotate(45deg);
    }
    .login-checkbox input[type="checkbox"]:checked + .checkbox-indicator::after {
        -webkit-transform: rotate(-45deg);
        transform: rotate(-45deg);
    }
</style>
