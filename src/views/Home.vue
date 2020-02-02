<template>
  <section class="main__list">
    <div class="main__item">
      <div class="main__images">
        <img class="main__image main__image--1" :src="lol" :id="myImg" v-on:click="zoom"/>
        <div :id="myModal" class="modal" :style="{display: gone}">
          <span class="close" v-on:click="close">&times;</span>
          <img class="modal-content" :id="img01" :src="gole">
        </div>
        <img class="main__image" src="../assets/cabin.jpg"/>
        <img class="main__image" src="../assets/cabin.jpg"/>
        <img class="main__image" src="../assets/cabin.jpg"/>
      </div>
      <div class="main_description">
        <p class="wo">
          Блаблабла
        </p>
        <ul>
          <li v-for="item in list" :key="item.startOfInterval">
            {{item.startOfInterval}}
          </li>
        </ul>
        <div class="box">
          <section class="box-width">
            <date-picker v-model="value1" type="text" value-type="format" range placeholder="Выберите даты"  :disabled-date="disabledDate" inline></date-picker>
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
            <date-picker v-model="value2" type="date" value-type="format" range placeholder="Select date range" :disabled-date="disabledDate" inline></date-picker>
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
            <date-picker v-model="value3" type="date" value-type="format" range placeholder="Select date range" :disabled-date="disabledDate" inline></date-picker>
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
        gole: "",
        myModal: "dude",
        img01: "1",
        myImg: "myImg",
        gone: "none",
        list: [],
      };
    },
    //?token=u1TgIsKIv8
    mounted() {
      axios({url: 'https://abrom-booking.herokuapp.com/dates?token=u1TgIsKIv8', method: 'GET'})
              .then(response => {
                this.list = response.data;

              });
    },
    methods: {
      disabledDate(date) {
        const b = date > new Date(2020, 1, 1) && date < new Date(2020, 1, 3);
        const c = date > new Date(2020, 1 , 11) && date < new Date(2020,1,14);
        const a = date > new Date(2019, 11, 1) && date < new Date(2020, 0, 10) || b ;
        const d = a || c;

        //for (let i = 0; i<3; i++) {
         // var count = date > new Date(2019, 11, 1) && date < new Date(2020, 0, 10);
         // let string = this.list[i].endOfInterval;
         // let string2 = this.list[i].startOfInterval;
         // let splited = string.split("-");
         // let splited2 = string2.split("-");
        //  let a2 = parseInt(splited2[0], 10);
        //  let b2 = parseInt(splited2[1], 10);
        //  let c2 = parseInt(splited2[2], 10);
        //  let a = parseInt(splited[0], 10);
        //  let b = parseInt(splited[1], 10);
        //  let c = parseInt(splited[2], 10);
        //  count = count || date > new Date(a, b, c) && date < new Date (a2, b2, c2);
       // }
        return d;
      },
      getDate: function() {
        alert(this.value1);
      },
      ore: function(){

  },
      zoom: function() {
        this.gole = this.lol;
        this.gone = "block";
      },
      close: function () {
        this.gone = "none";
      }
    },
    components: {
      DatePicker ,
    }
  }
</script>
<style>
</style>