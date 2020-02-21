<template>
  <!-- eslint-disable vue/no-use-v-if-with-v-for,vue/no-confusing-v-for-v-if -->
  <section class="main__list">
    <router-link class="main__admin" to="/admin" v-show="isAdmin" >
      <p >
        Запросы
      </p>
    </router-link>
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
              <form @submit="sendDate()">
                  <button class="box-button" type="submit">Забронировать</button>
              </form>
          </section>
        </div>
<<<<<<< HEAD
          <div class="user">
          <span class="user__title">
            <p class="user__dates">Выбранные даты:</p>
            <p class="user__status">Статус:</p>
          </span>
              <ul class="user__list">
                  <li class="user__item" v-for="item1 in userList1.reverse()" v-bind:key="item1.id">
                      <p class="user__booked">C {{  item1.startOfInterval }} по {{ item1.endOfInterval}}</p>
                      <span class="border"></span>
                      <div class="user__case">
                          <p class="user__pending">{{ item1.intervalStatus }}</p>
                          <button class="user__decline" @click="declineDate(item1.id)">Отменить</button>
                          <p class="user__decline--side">&times;</p>
                      </div>
                  </li>
              </ul>
          </div>
=======
        <div class="main__user">
        <span class="main__title">
          <p class="main__dates">Выбранные даты:</p>
          <p class="main__status">Статус:</p>
        </span>
          <ul class="main__user--list">
            <li class="main__user--item" v-for="item1 in userList1" v-bind:key="item1.id">
                <p class="a">C {{  item1.startOfInterval }} по {{ item1.endOfInterval}}</p>
                <span class="border"></span>
                <p class="b">{{ item1.intervalStatus }}</p>
            </li>
          </ul>
        </div>
>>>>>>> parent of e1e5ac5... release 1.5
      </div>
    </div>
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
            <date-picker v-model="value2" type="text" value-type="format" range placeholder="Выберите даты"  :disabled-date="disabledDate2" inline></date-picker>
            <form @submit="sendDate2()">
              <button class="box-button" type="submit">Забронировать</button>
            </form>
          </section>
        </div>
<<<<<<< HEAD
        <div class="user">
          <span class="user__title">
            <p class="user__dates">Выбранные даты:</p>
            <p class="user__status">Статус:</p>
=======
        <div class="main__user">
          <span class="main__title">
          <p class="main__dates">Выбранные даты:</p>
          <p class="main__status">Статус:</p>
>>>>>>> parent of e1e5ac5... release 1.5
          </span>
          <ul class="main__user--list">
            <li class="main__user--item" v-for="item in userList2" v-bind:key="item.id">
                <p class="a">C {{  item.startOfInterval }} по {{ item.endOfInterval}}</p>
                <span class="border"></span>
<<<<<<< HEAD
                <div class="user__case">
                    <p class="user__pending">{{ item.intervalStatus }}</p>
                    <button class="user__decline" @click="declineDate(item.id)">Отменить</button>
                    <p class="user__decline--side">&times;</p>
                </div>
=======
                <p class="b">{{ item.intervalStatus }}</p>
>>>>>>> parent of e1e5ac5... release 1.5
            </li>
          </ul>
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
        list1: [],
        list2: [],
        userList: [],
        userList1: [],
        userList2: []
      };
    },
    //TODO Реализовать список так , чтобы список забронированных дат начинался с последнего
    mounted() {
      axios({url: 'https://abrom-booking.herokuapp.com/api/v1/date-intervals/1', method: 'GET'})
              .then(response => {
                this.list1 = response.data;
             })
              .catch(err => {
                if (err.name === '403') {
                  this.$router.push("/")
                }
             })
      axios({url: 'https://abrom-booking.herokuapp.com/api/v1/date-intervals/2', method: 'GET'})
              .then(response => {
                this.list2 = response.data;
              })
              .catch(err => {
                if (err.name === '403') {
                  this.$router.push("/")
                }
              })
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
        //  dates.endOfInterval = this.value1[1];
        //if (id === 1) {
        //  dates.startOfInterval = this.value1[0];
        //  dates.endOfInterval = this.value1[1];
        //}
        //else {
        //  dates.startOfInterval = this.value2[0];
        //  dates.endOfInterval = this.value2[1];
        //}
        dates.cottageID = 1;
        this.$store.dispatch('sendDates', dates)
               .catch(err => console.log(err))
      },
      sendDate2: function() {
        let dates = {};
        dates.startOfInterval = this.value2[0];
        dates.endOfInterval = this.value2[1];
        //  dates.endOfInterval = this.value1[1];
        //if (id === 1) {
        //  dates.startOfInterval = this.value1[0];
        //  dates.endOfInterval = this.value1[1];
        //}
        //else {
        //  dates.startOfInterval = this.value2[0];
        //  dates.endOfInterval = this.value2[1];
        //}
        dates.cottageID = 2;
        this.$store.dispatch('sendDates', dates)
                .catch(err => console.log(err))
<<<<<<< HEAD
      },
        declineDate: function(id) {
            axios({url: 'https://abrom-booking.herokuapp.com/api/v1/date-intervals/' + id , method: 'POST'})
                .then(resp => {
                    location.reload();
                })
                .catch( err => alert(err))
        }
=======
      }
>>>>>>> parent of e1e5ac5... release 1.5
    },
    components: {
      DatePicker ,
    },
  }
</script>
<style>
</style>