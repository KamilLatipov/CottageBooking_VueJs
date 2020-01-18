<template>
  <section class="main__list">
    <div class="main__item">
      <img class="main__image" src="../assets/cabin.jpg"/>
      <div class="main_description">
        <p class="wo">
          Блаблабла
        </p>
        <a v-on:click="test">test</a>
        <div class="box">
          <section>
            <date-picker v-model="value1" type="text" value-type="format" range placeholder="Выберите даты" :disabled-date="notBeforeToday"></date-picker>
            <form @submit="getDate">
              <button type="submit">Click</button>
            </form>
          </section>
        </div>
      </div>
    </div>
    <div class="main__item">
      <img src="../assets/cabin.jpg" class="main__image"/>
      <div class="main_description">
        <p>
          Блаблабла
        </p>
        <div class="box">
          <section>
            <date-picker v-model="value2" type="date" value-type="format" range placeholder="Select date range" :disabled-date="notBeforeToday"></date-picker>
          </section>
        </div>
      </div>
    </div>
    <div class="main__item">
      <img src="../assets/cabin.jpg" class="main__image"/>
      <div class="main_description">
        <p>
          Блаблабла
        </p>
        <div class="box">
          <section>
            <date-picker v-model="value3" type="date" value-type="format" range placeholder="Select date range" :disabled-date="notBeforeToday"></date-picker>
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
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  export default {
    name: "header",
    data() {
      return {
        value1: new Date(),
        value2: new Date(),
        value3: new Date(),
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
      },
      notBeforeToday() {
        return  new Date(2019, 9, 8), today;
      },
      getDate: function() {
        alert(this.value1);
      }
    },
    components: {
      DatePicker ,
    }
  }
</script>
<style>
</style>