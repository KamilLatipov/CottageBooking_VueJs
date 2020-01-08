<template>
  <section class="main__list">
    <form  @submit="heck">
      <button type="submit">Register</button>
    </form>
    <div class="main__item">
      <img src="../assets/cabin.jpg" width="600"/>
      <div class="main_description">
        <p class="wo">
          Блаблабла
        </p>
        <div class="box">
          <section>
            <date-picker v-model="value1" type="date" range placeholder="Select date range"></date-picker>
          </section>
        </div>
      </div>
    </div>
    <div class="main__item">
      <img src="../assets/cabin.jpg" width="600"/>
      <div class="main_description">
        <p>
          Блаблабла
        </p>
        <div class="box">
          <section>
            <date-picker v-model="value1" type="date" range placeholder="Select date range"></date-picker>
          </section>
        </div>
      </div>
    </div>
    <div class="main__item">
      <img src="../assets/cabin.jpg" width="600"/>
      <div class="main_description">
        <p>
          Блаблабла
        </p>
        <div class="box">
          <section>
            <date-picker v-model="value1" type="date" range placeholder="Select date range"></date-picker>
          </section>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import axios from 'axios'
  import DatePicker from 'vue2-datepicker';
  import 'vue2-datepicker/index.css';
  export default {
    name: "header",
    data() {
      return {
        value1: [new Date(2019, 9, 8), new Date(2019, 9, 19)],
        value2: [],
        showTimePanel: true,
        showTimeRangePanel: true,
      };
    },
    components: {
      DatePicker ,
    }
  }
  axios({
    method:'get',
    url:'https://abrom-booking.herokuapp.com/users',
  })
          .then(function(response) {
            alert(response.data);
          });
</script>
<style>
  .main__list {
    display: flex;
    flex-wrap: wrap;

    width: 1100px;
    margin: 0 auto 80px auto;
  }
  .main__item  {
    display: flex;
    justify-content: space-around;

    width: 100%;

    margin-top: 60px;
    margin-bottom: 40px;
    height: 450px;

    border: 1px solid rgba(0,0,0, 0.2);
    border-radius: 20px;
  }
</style>