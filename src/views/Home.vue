<template>
  <main>
      <router-link class="main__admin" to="/admin">
          <p>Запросы</p>
      </router-link>
  <section class="main__list" v-for="items in list" v-bind:key="items.id">
    <div class="main__item">
      <div class="main__wrapper">
        <div class="main__images">
            <img class="main__image main__image--1" src="../assets/cabin.jpg"/>
            <img class="main__image" src="../assets/cabin.jpg"/>
            <img class="main__image" src="../assets/cabin.jpg"/>
            <img class="main__image" src="../assets/cabin.jpg"/>
        </div>
      <div class="main__description">
        <div class="details">
          <h4 class="details__title">Общая площадь {{ items.rooms.square }} кв. м</h4>
          <ul class="details__rooms">
              <li class="details__room">Хол ( {{ items.rooms.hall }} )</li>
              <li class="details__room">Спальные комнаты ( {{ items.rooms.bedroom }} )</li>
              <li class="details__room">Уборная ( {{ items.rooms.bathroom }} )</li>
              <li class="details__room">Кухонная зона ( {{ items.rooms.kitchen }} )</li>
          </ul>
          <p class="details__description">
              {{ items.description }}
          </p>
          <div class="details__wishes">
              <h4 class="details__title">Пожелания :</h4>
              <ul class="details__list">
                  <li>Машины загоняем на территорию.</li>
                  <li>После себя оставляем порядок</li>
              </ul>
          </div>
        </div>
      </div>
      <div class="main__tools">
        <button class="buttons__main" type="button" @click="show(items.id)">Выбрать даты</button>
        <div class="main__calendar" :id=items.id>
          <span class="main__close" @click="close(items.id)">&times;</span>
          <p class="main__calendar--title">Бронируйте дом, ожидайте подтверждения.</p>
          <div class="box">
              <section class="box-width">
                  <date-picker v-model="values[items.id - 1]" type="text" value-type="format" range placeholder="Выберите даты"  :disabled-date="((date) => disabledDate(date, items.id)) " inline>1</date-picker>
                  <form @submit="sendDate(items.id)">
                      <button class="box-button buttons__calendar" type="submit">Забронировать</button>
                  </form>
              </section>
          </div>
         </div>
         <div class="user">
            <p class="user__title">Выбранные даты :</p>
            <p class="user__title">Статус:</p>
          <ul class="user__list second">
            <li class="user__item" v-for="item in reverseList(userList[items.id - 1])" v-bind:key="item.id">
                <p class="user__dates">C {{  item.startOfInterval }} по {{ item.endOfInterval}}</p>
                <div class="user__switch" v-if="item.intervalStatus === 'Одобрено' || item.intervalStatus === 'В ожидании согласнования'">
                    <div class="user__hover">
                        <p>&times;</p>
                    </div>
                    <p class="user__decline" @click="declineDate(item.id)">Отменить</p>
                    <p class="user__status">{{ item.intervalStatus }}</p>
                </div>
                <p class="user__status" v-else>{{ item.intervalStatus }}</p>
            </li>
          </ul>
        </div>
       </div>
      </div>
      </div>
  </section>
  </main>
</template>

<script>
  import DatePicker from 'vue2-datepicker';
  import 'vue2-datepicker/index.css';
  import axios from 'axios';
  
  const http = "https://abrom-booking.herokuapp.com";

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  export default {
    name: "header",
    data() {
      return {
        values: [],
        showTimePanel: true,
        list: [],
        userList: [],
      };
    },
      mounted() {
      axios({url: http + '/api/v1/cottages/all', method: 'GET'})
          .then(response => {
              this.list = response.data;
              for (let i = 0 ; i < this.list.length ; i++ ) {
                  let listOfDates = [];

                  this.values.push(new Date);

                  for (let a = 0 ; a < this.list[i].dateIntervalDTOList.length ; a++ ) {
                      if (this.list[i].dateIntervalDTOList[a].intervalStatus === 'PENDING') {
                          this.list[i].dateIntervalDTOList[a].intervalStatus = 'В ожидании согласнования'
                      }
                      else if (this.list[i].dateIntervalDTOList[a].intervalStatus === 'BOOKED') {
                          this.list[i].dateIntervalDTOList[a].intervalStatus = 'Одобрено'
                      }
                      else {
                          this.list[i].dateIntervalDTOList[a].intervalStatus = 'Отклонено'
                      }

                      if (this.list[i].dateIntervalDTOList[a].owner.login === localStorage.getItem('login')) {
                          listOfDates.push(this.list[i].dateIntervalDTOList[a]);
                      }

                  }

                  this.userList.push(listOfDates);
                  listOfDates = [];
              }
          })
    },
    computed: {
      isAdmin: function () {
        return (localStorage.getItem('admin') === 'ROLE_ADMIN');
      },
    },
    methods: {
      disabledDate(date, id) {
        let intervals = date < today;
        for (let i = 0; i < this.list[id - 1].dateIntervalDTOList.length; i++) {
                let startOfInterval = this.list[id - 1].dateIntervalDTOList[i].startOfInterval.split("-");
                let endOfInterval = this.list[id - 1].dateIntervalDTOList[i].endOfInterval.split("-");

                let endOfIntervalYear = parseInt(endOfInterval[0], 10);
                let endOfIntervalMonth = parseInt(endOfInterval[1], 10) - 1;
                let endOfIntervalDay = parseInt(endOfInterval[2], 10);
                let startOfIntervalYear = parseInt(startOfInterval[0], 10);
                let startOfIntervalMonth = parseInt(startOfInterval[1], 10) - 1;
                let startOfIntervalDay = parseInt(startOfInterval[2], 10);
                intervals = intervals || (!(date < new Date(startOfIntervalYear, startOfIntervalMonth, startOfIntervalDay)) && !(date > new Date(endOfIntervalYear, endOfIntervalMonth, endOfIntervalDay)));
       }
        return intervals;
      },
      sendDate: function(id) {
        let dates = {};
        dates.startOfInterval = this.values[id - 1][0];
        dates.endOfInterval = this.values[id - 1][1];
        dates.cottageID = id;
        this.$store.dispatch('sendDates', dates)
               .catch(err => console.log(err))
      },
      declineDate: function(id) {
        axios({url: http + '/api/v1/date-intervals/' + id , method: 'POST'})
                .then(resp => {
                    location.reload();
                })
                .catch( err => alert(err))
        },
        show: function(id) {
            let block = document.getElementById(id);
            block.style.display = "flex";
            block.classList.add("show");
        },
        close: function(id) {
            let block = document.getElementById(id);
            block.style.display = "none";
        },
        reverseList: function(list) {
          return list.slice().reverse();
        },
    },
    components: {
      DatePicker ,
    },
  }
</script>
<style>
</style>