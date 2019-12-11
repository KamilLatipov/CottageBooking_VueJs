<template>
    <div>
        <h1>Register</h1>
        <form @submit.prevent="register">
            <ul class="user-form">
                <li class="user-form__login user-form__item">
                    <label for="name">Name</label>
                    <input id="name" type="text" v-model="name" required autofocus>
                </li>
                <li class="user-form__password user-form__item">
                    <label for="email" >E-Mail Address</label>
                    <input id="email" type="email" v-model="email" required>
                <li class="user-form__sign-in user-form__item">
                    <label for="password"></label>
                    <input id="password" type="password" v-model="password" required>
                </li>
                <li class="user-form__sign-in user-form__item">
                    <label for="password-confirm">Confirm Password</label>
                    <input id="password-confirm" type="password" v-model="password_confirmation" required>
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
                name : "",
                email : "",
                password : "",
                password_confirmation : "",
                is_admin : null
            }
        },
        methods: {
            register: function () {
                let data = {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    is_admin: this.is_admin
                }
                this.$store.dispatch('register', data)
                    .then(() => this.$router.push('/'))
                    .catch(err => alert(err))
            }
        }
    }
</script>

<style scoped>
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
    input {
        height: 45px;
        width: 100%;

        font-size: 20px;
        line-height: 26px;
    }
</style>