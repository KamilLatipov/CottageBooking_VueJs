<template>
  <section class="main__list">
    <div class="main__item">
      <div class="main__images">
        <img class="main__image main__image--1" :src="lol" :id="myImg" v-on:click="zoom"/>
        <div :id="myModal" class="modal" :style="{display: gone}">
          <img class="modal-content" :id="img01" :src="lol">
        </div>
        <img class="main__image" src="../assets/cabin.jpg"/>
        <img class="main__image" src="../assets/cabin.jpg"/>
        <img class="main__image" src="../assets/cabin.jpg"/>
      </div>
      <div class="main_description">
        <p class="wo">
          Блаблабла
        </p>
        <div class="box">
          <section class="box-width">
            <date-picker v-model="value1" type="text" value-type="format" range placeholder="Выберите даты" popup-style="display: block" :disabled-date="notBeforeToday" inline></date-picker>
          </section>
        </div>
      </div>
    </div>
    <div class="main__item">
      <div class="main__images">
        <img class="main__image main__image--1" src="../assets/cabin.jpg"/>
        <img class="main__image" src="../assets/cabin.jpg"/>
        <img class="main__image" src="../assets/cabin.jpg"/>
        <img class="main__image" src="../assets/cabin.jpg"/>
      </div>
      <div class="main_description">
        <p>
          Блаблабла
        </p>
        <div class="box">
          <section>
            <date-picker v-model="value2" type="date" value-type="format" range placeholder="Select date range" :disabled-date="notBeforeToday" inline></date-picker>
          </section>
        </div>
      </div>
    </div>
    <div class="main__item">
      <div class="main__images">
        <img class="main__image main__image--1" src="../assets/cabin.jpg"/>
        <img class="main__image" src="../assets/cabin.jpg"/>
        <img class="main__image" src="../assets/cabin.jpg"/>
        <img class="main__image" src="../assets/cabin.jpg"/>
      </div>
      <div class="main_description">
        <p>
          Блаблабла
        </p>
        <div class="box">
          <section>
            <date-picker v-model="value3" type="date" value-type="format" range placeholder="Select date range" :disabled-date="notBeforeToday" inline></date-picker>
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
        lol: "/img/cabin.05fc830a.jpg",
        myModal: "dude",
        img01: "1",
        myImg: "myImg",
        gone: "none",
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
       
      },
      getDate: function() {
        alert(this.value1);
      },
      zoom: function() {
        this.gone = "block";
      }
    },
    components: {
      DatePicker ,
    }
  }
</script>
<style>
</style>