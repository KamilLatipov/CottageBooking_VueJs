<template>
  <section class="main__list">
    <router-link class="main__admin" to="/admin" v-show="isAdmin" >
      <p >
        Запросы
      </p>
    </router-link>
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
          <h4 class="details__title">Общая площадь xxx кв. м</h4>
          <ul class="details__rooms">
              <li class="details__room">Хол (1)</li>
              <li class="details__room">Спальные комнаты (3)</li>
              <li class="details__room">Уборная (2)</li>
              <li class="details__room">Кухонная зона (1)</li>
          </ul>
          <p class="details__description">
              Домик стоит в глухой татарской деревне, расположенной высоко в горах.
              Неподалеку озерце с омолаживающей водичкой и прекрасным видом.
              Остальное не передать словами, приезжайте…
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
        <button class="buttons__main" type="button" @click="show(1)">Выбрать даты</button>
        <div class="main__calendar" id="1">
          <span class="main__close" @click="close(1)">&times;</span>
          <div class="box">
              <section class="box-width">
                  <date-picker v-model="value1" type="text" value-type="format" range placeholder="Выберите даты"  :disabled-date="disabledDate" inline></date-picker>
                  <form @submit="sendDate()">
                      <button class="box-button" type="submit">Забронировать</button>
                  </form>
              </section>
          </div>
         </div>
         <div class="user">
            <p class="user__title">Выбранные даты :</p>
            <p class="user__title">Статус:</p>
          <ul class="user__list second">
            <li class="user__item" v-for="item in userList1" v-bind:key="item.id">
                <p class="user__dates">C {{  item.startOfInterval }} по {{ item.endOfInterval}}</p>
                <div class="user__switch" v-if="item.intervalStatus === 'Одобрено'">
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
</template>

<script>
  import DatePicker from 'vue2-datepicker';
  import 'vue2-datepicker/index.css';
  import axios from 'axios'
  
  const http = "http://rent-abrom.ru:8000";

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  export default {
    name: "header",
    data() {
      return {
        value1: new Date(),
        value2: new Date(),
        showTimePanel: true,
        list1: [],
        list2: [],
        userList: [],
        userList1: [],
        userList2: []
      };
    },
      mounted() {
      axios({url: http + '/api/v1/date-intervals/1', method: 'GET'})
              .then(response => {
                this.list1 = response.data;
             })
              .catch(err => {
                if (err.name === '403') {
                  this.$router.push("/")
                }
             })
      axios({url: http + '/api/v1/date-intervals/2', method: 'GET'})
              .then(response => {
                this.list2 = response.data;
              })
              .catch(err => {
                if (err.name === '403') {
                  this.$router.push("/")
                }
              })
      axios({url: http + '/api/v1/date-intervals/my-dates', method: 'GET'})
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
                for (let i = 0; i < this.userList.length; i++) {
                  if (this.userList[i].cottageID === 1) {
                    this.userList1.push(this.userList[i])
                  }
                  else {
                    this.userList2.push(this.userList[i])
                  }
                }
              })
              .catch(err => {
                if (err.name === '403') {
                  this.$router.push("/")
                }
              })
    },
    computed: {
      isAdmin: function () {
        return (localStorage.getItem('admin') === 'ROLE_ADMIN');
      }
    },
    methods: {
      disabledDate(date) {
        let intervals = date < today;
        for (let i = 0; i < this.list1.length; i++) {
           let string = this.list1[i].startOfInterval;
           let string2 = this.list1[i].endOfInterval;
           let splited = string.split("-");
           let splited2 = string2.split("-");
           let a2 = parseInt(splited2[0], 10);
           let b2 = parseInt(splited2[1], 10) - 1;
           let c2 = parseInt(splited2[2], 10);
           let a = parseInt(splited[0], 10);
           let b = parseInt(splited[1], 10) - 1;
           let c = parseInt(splited[2], 10);
           intervals = intervals || (!(date < new Date(a,b,c)) && !(date > new Date(a2, b2, c2)));
       }
        return intervals;
      },
      disabledDate2(date) {
        let intervals = date < today;
        for (let i = 0; i < this.list2.length; i++) {
          let string = this.list2[i].startOfInterval;
          let string2 = this.list2[i].endOfInterval;
          let splited = string.split("-");
          let splited2 = string2.split("-");
          let a2 = parseInt(splited2[0], 10);
          let b2 = parseInt(splited2[1], 10) - 1;
          let c2 = parseInt(splited2[2], 10);
          let a = parseInt(splited[0], 10);
          let b = parseInt(splited[1], 10) - 1;
          let c = parseInt(splited[2], 10);
          intervals = intervals || (!(date < new Date(a,b,c)) && !(date > new Date(a2, b2, c2)));
        }
        return intervals;
      },
      sendDate: function() {
        let dates = {};
        dates.startOfInterval = this.value1[0];
        dates.endOfInterval = this.value1[1];
        dates.cottageID = 1;
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
        }
    },
    components: {
      DatePicker ,
    },
  }
</script>
<style>
</style>