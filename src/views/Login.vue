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
                        <label>Ваша почта</label>
                        <input required v-model="login" type="text"/>
                </li>
                <li class="user-form__password user-form__item">
                        <label>Пароль</label>
                        <input required v-model="password" type="password"/>
                <li class="user-form__sign-in user-form__item">
                    <button type="submit">Войти</button>
                    <div class="user-form__item--register">
                        <router-link to="/Registration" style="font-size: 18px">Зарегистрироваться</router-link>
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
                password : ""
            }
        },
        methods: {
            authorization: function () {
                let login = this.login
                let password = this.password
                this.$store.dispatch('authorization', { login, password })
                    .then(() => this.$router.push("/home"))
                    .catch(err => alert(err));
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

      padding-bottom: 25px;
      font-size: 19px;
  }
  .user-form__item--register {
      padding-top: 13px;
  }
  .user-form__sign-in {
      margin-top: 15px;
  }
  label {
      margin-bottom: 10px;
  }
  input {
      height: 45px;
      width: 100%;
      padding: 5px 10px;

      border-radius: 7px;

      font-size: 20px;
      line-height: 26px;
  }
  button {
      padding: 15px 36px 15px 36px;

      background-color: #8bc540;
      text-decoration: none;
      border: none;
      border-radius: 10px;
      color: white;

      font-size: 15px;
  }
  .login-window {
      width: 600px;

      margin: 60px auto 0 auto;

      border: 1px solid rgba(0,0,0 , 0.2);
      border-radius: 10px 10px;
  }
    .login-window__headline {
        padding-top: 30px;
        padding-bottom: 25px;
    }
</style>
