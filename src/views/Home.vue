<template>
  <section class="main__list">
    <div class="main__item">
      <img src="../assets/cabin.jpg" width="600"/>
      <div class="main_description">
        <p class="wo">
          Блаблабла
        </p>
        <a v-on:click="test">test</a>
        <div class="box">
          <section>
            <date-picker v-model="value1" type="date" range placeholder="Выберите даты"></date-picker>
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
            <date-picker v-model="value2" type="date" range placeholder="Select date range"></date-picker>
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
            <date-picker v-model="value3" type="date" range placeholder="Select date range"></date-picker>
          </section>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import DatePicker from 'vue2-datepicker';
  import 'vue2-datepicker/index.css';
  import axios from 'axios'

  export default {
    name: "header",
    data() {
      return {
        value1: [],
        value2: [new Date(2019, 9, 8), new Date(2019, 9, 19)],
        value3: [new Date(2019, 9, 8), new Date(2019, 9, 19)],
        showTimePanel: true,
        showTimeRangePanel: true,
      };
    },
    methods:  {
      test: function () {
      axios({url: 'https://abrom-booking.herokuapp.com/users?token=u1TgIsKIv8', method: 'GET'})
            .then(function(response){
              alert(response)
            })
  }
    },
    components: {
      DatePicker ,
    }
  }
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