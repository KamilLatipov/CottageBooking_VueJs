<template>
    <section class="main__list">
        <div class="main__item">
            <div class="main__images">
                <img class="main__image main__image--1" src="../assets/cabin.jpg"/>
            </div>
            <div class="main__description">
                <p class="wo">
                    Блаблабла
                </p>
                <div class="box">
                    <section class="box-width">
                        <date-picker v-model="value1" type="text" value-type="format" range placeholder="Выберите даты"  :disabled-date="disabledDate" inline></date-picker>
                    </section>
                </div>
                <ul class="main__user--list">
                    <li class="main__user--item" v-for="item in requestList" v-bind:key="item.id">
                        <p class="a">C {{  item.startOfInterval }} по {{ item.endOfInterval}}</p>
                        <button type="submit" @submit="acceptDate(item.id)">Да</button>
                        <button @click="declineDate(item.id)">Нет</button>
                        <p>{{item.owner.firstname}} {{item.owner.lastname}}</p>
                    </li>
                </ul>
                <ul class="main__user--list">
                    <li class="main__user--item" v-for="item in acceptedList" v-bind:key="item.id">
                        <p class="a">C {{  item.startOfInterval }} по {{ item.endOfInterval}}</p>
                        <p class="b">{{item.owner.firstname}} {{item.owner.lastname}}</p>
                    </li>
                </ul>
            </div>
        </div>
        <div class="main__item">
            <div class="main__images">
                <img class="main__image main__image--1" src="../assets/cabin.jpg"/>
            </div>
            <div class="main_description">
                <p>
                    Блаблабла
                </p>
                <div class="box">
                    <section>
                        <date-picker v-model="value2" type="text" value-type="format" range placeholder="Select date range" :disabled-date="disabledDate" inline></date-picker>
                    </section>
                </div>
            </div>
        </div>
        <div class="main__item">
            <div class="main__images">
                <img class="main__image main__image--1" src="../assets/cabin.jpg"/>
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
                dates1: null,
                status: null,
                showTimePanel: true,
                showTimeRangePanel: true,
                requestList: [],
                list: [],
                acceptedList: []
            };
        },
//?token=u1TgIsKIv8
        mounted() {
            axios({url: 'https://abrom-booking.herokuapp.com/api/v1/admin/requests', method: 'GET'})
                .then(response => {
                    this.requestList = response.data;
                });
            axios({url: 'https://abrom-booking.herokuapp.com/api/v1/date-intervals', method: 'GET'})
                .then(response => {
                    this.list = response.data;
                });
            axios({url: 'https://abrom-booking.herokuapp.com/api/v1/admin/booked', method: 'GET'})
                .then(response => {
                    this.acceptedList = response.data;
                });
        },
        methods: {
            disabledDate(date) {
                let count = date < today;
                for (let i = 0; i < this.list.length; i++) {
                    if (this.list[i].cottageID != 1 || (this.list[i].intervalStatus != "PENDING" && this.list[i].intervalStatus != "BOOKED")) {continue}
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
                    count = count || (date > new Date(a, b, c) && date < new Date(a2, b2, c2));
                }
                return count;
            },
            acceptDate: function(id) {
                axios({url: 'https://abrom-booking.herokuapp.com/api/v1/admin/requests/' + id + '/accept', method: 'POST'})
                  .then(resp => {
                  })
                  .catch( err => alert(err))

            },
            declineDate: function(id) {
                axios({url: 'https://abrom-booking.herokuapp.com/api/v1/admin/requests/' + id + '/reject', method: 'POST'})
                    .catch( err => alert(err))
            }
        },
        components: {
            DatePicker ,
        }
    }
</script>

<style scoped>

</style>