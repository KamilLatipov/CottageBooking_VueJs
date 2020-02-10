<template>
  <section class="main__list">
    <div class="main__item">
      <div class="main__images">
        <img class="main__image main__image--1" src="../assets/cabin.jpg"/>
        <img class="main__image" src="../assets/cabin.jpg"/>
        <img class="main__image" src="../assets/cabin.jpg"/>
        <img class="main__image" src="../assets/cabin.jpg"/>
      </div>
      <div class="main__description">
        <div class="box">
          <section class="box-width">
            <date-picker v-model="value1" type="text" value-type="format" range placeholder="Выберите даты"  :disabled-date="disabledDate" inline></date-picker>
            <form @submit="sendDate">
              <button class="box-button" type="submit">Забронировать</button>
            </form>
          </section>
        </div>
        <div class="main__user">
        <span class="main__title">
          <p class="main__dates">Выбранные даты:</p>
          <p class="main__status">Статус:</p>
        </span>
          <ul class="main__user--list">
            <li class="main__user--item" v-for="item in userList" v-bind:key="item">
              <p class="a">C {{  item.startOfInterval }} по {{ item.endOfInterval}}</p>
              <span class="border"></span>
              <p class="b">{{ item.intervalStatus }}</p>
            </li>
          </ul>
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
            <date-picker v-model="value2" type="text" value-type="format" range placeholder="Select date range" :disabled-date="disabledDate2" inline></date-picker>
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
        dates1: null,
        status: null,
        showTimePanel: true,
        showTimeRangePanel: true,
        list: [],
        userList: [],
      };
    },
    //?token=u1TgIsKIv8
    //TODO Реализовать список так , чтобы список забронированных дат начинался с последнего
    //TODO Блокировать даы в зависимости от статуса
    mounted() {
      axios({url: 'https://abrom-booking.herokuapp.com/api/v1/date-intervals', method: 'GET'})
              .then(response => {
                this.list = response.data;
             });
      axios({url: 'https://abrom-booking.herokuapp.com/api/v1/date-intervals/my-dates', method: 'GET'})
              .then(response => {
                this.userList = response.data;
                for (let i = 0; i < this.userList.length; i++) {
                  if (this.userList[i].intervalStatus === 'PENDING') {
                    this.userList[i].intervalStatus = 'В ожидании согласнования'
                  }
                  else if (this.userList[i].intervalStatus === 'BOOKED') {
                    this.userList[i].intervalStatus = 'Одобрено'
                  }
                  else {
                    this.userList[i].intervalStatus = 'Отклонено'
                  }
                }
              });
    },
    methods: {
      disabledDate(date) {
        let intervals = date < today;
        for (let i = 0; i < this.list.length; i++) {
         if (this.list[i].cottageID != 1) {continue}
           let string = this.list[i].startOfInterval;
           let string2 = this.list[i].endOfInterval;
           let splited = string.split("-");
           let splited2 = string2.split("-");
           let a2 = parseInt(splited2[0], 10);
           let b2 = parseInt(splited2[1], 10) - 1;
           let c2 = parseInt(splited2[2], 10);
           let a = parseInt(splited[0], 10);
           let b = parseInt(splited[1], 10) - 1;
           let c = parseInt(splited[2], 10);
           intervals = intervals || (date > new Date(a, b, c) && date < new Date(a2, b2, c2));
       }
        return intervals;
      },
      disabledDate2(date) {
        let intervals = date < today;
        for (let i = 0; i < this.list.length; i++) {
          if (this.list[i].cottageID != 2) {continue}
          let string = this.list[i].startOfInterval;
          let string2 = this.list[i].endOfInterval;
          let splited = string.split("-");
          let splited2 = string2.split("-");
          let a2 = parseInt(splited2[0], 10);
          let b2 = parseInt(splited2[1], 10) - 1;
          let c2 = parseInt(splited2[2], 10);
          let a = parseInt(splited[0], 10);
          let b = parseInt(splited[1], 10) - 1;
          let c = parseInt(splited[2], 10);
          intervals = intervals || (date > new Date(a, b, c) && date < new Date(a2, b2, c2));
        }
        return intervals;
      },
      sendDate: function() {
        let dates = {};
        dates.startOfInterval = this.value1[0];
        dates.endOfInterval = this.value1[1];
        dates.cottageID = 1;
        this.$store.dispatch('sendDates', dates)
                .then(() => alert(dates.startOfInterval))
               .catch(err => alert(err))
      },
    },
    components: {
      DatePicker ,
    }
  }
</script>
<style>
</style>