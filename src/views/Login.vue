<template>
   <div class="login-window">
    <h1 class="login-window__headline">
        Вход в личный кабинет
    </h1>
    <div class="login-form">
        <form class="login-form__field" @submit.prevent="authorization">
            <ul class="user-form">
                <li class="user-form__login user-form__item">
                        <label>Ваша почта</label>
                        <input required v-model="login" type="text"/>
                </li>
                <li class="user-form__password user-form__item">
                        <label>Пароль</label>
                        <input required v-model="password" type="password"/>
                <li class="user-form__sign-in user-form__item">
                    <button type="submit">authorization</button>
                </li>
                <li>
                    <router-link to="/Registration">Some</router-link>
                </li>
            </ul>
        </form>
    </div>
   </div>
</template>

<script>
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
  .login-window {
      width: 600px;
      height: 440px;

      margin: 70px auto 0 auto;

      border: 1px solid rgba(0,0,0 , 0.2);
      border-radius: 10px 10px;
  }
    .login-window__headline {
        padding-top: 45px;
        padding-bottom: 25px;
    }
</style>
