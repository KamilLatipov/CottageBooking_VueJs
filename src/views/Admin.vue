<template>
    <section class="admin__list">
        <div class="admin__item">
            <div class="admin__description">
                <div class="admin__images">
                    <img class="admin__image admin__image--1" src="../assets/cabin.jpg"/>
                </div>
                <div class="admin__calendar">
                    <div class="box">
                        <section class="box-width">
                            <date-picker v-model="value1" type="text" value-type="format" range placeholder="Выберите даты"  :disabled-date="disabledDate" inline></date-picker>
                        </section>
                    </div>
                </div>
            </div>
            <div class="user user--admin">
                <h3 class="user__title first">Запросы:</h3>
                <h3 class="user__title third">Одобрено:</h3>
                <ul class="user__list second">
                    <li class="user__item" v-for="item in requestList1" v-bind:key="item.id">
                        <p class="user__dates user__dates--admin">C {{  item.startOfInterval }} по {{ item.endOfInterval}}</p>
                        <p class="user__name">{{item.owner.firstname}} {{item.owner.lastname}}</p>
                        <div class="buttons">
                            <button class="buttons__admin" @click="acceptDate(item.id)">Да</button>
                            <button class="buttons__admin" @click="declineDate(item.id)">Нет</button>
                        </div>
                    </li>
                </ul>
                <ul class="user__list fourth">
                    <li class="user__item" v-for="item in bookedList1" v-bind:key="item.id">
                        <p class="user__dates">C {{  item.startOfInterval }} по {{ item.endOfInterval}}</p>
                        <p class="user__name">{{item.owner.firstname}} {{item.owner.lastname}}</p>
                        <div class="buttons buttons--booked">
                            <div class="buttons__admin--cover">
                                <p class="cover">&times;</p>
                                <span class="buttons__admin--decline" @click="declineDate(item.id)">
                                    Отменить
                                </span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="admin__item">
            <div class="admin__description">
                <div class="admin__images">
                    <img class="admin__image admin__image--1" src="../assets/cabin.jpg"/>
                </div>
                <div class="admin__calendar">
                    <div class="box">
                        <section class="box-width">
                            <date-picker v-model="value2" type="text" value-type="format" range placeholder="Выберите даты"  :disabled-date="disabledDate2" inline></date-picker>
                        </section>
                    </div>
                </div>
            </div>
            <div class="user user--admin">
                <h3 class="user__title user__title--first">Запросы:</h3>
                <h3 class="user__title user__title--second">Одобрено:</h3>
                <ul class="user__list">
                    <li class="user__item" v-for="item in requestList2" v-bind:key="item.id">
                        <p class="user__dates">C {{  item.startOfInterval }} по {{ item.endOfInterval}}</p>
                        <p class="user__name">{{item.owner.firstname}} {{item.owner.lastname}}</p>
                        <div class="buttons">
                            <button class="buttons__admin" @click="acceptDate(item.id)">Да</button>
                            <button class="buttons__admin" @click="declineDate(item.id)">Нет</button>
                        </div>
                    </li>
                </ul>
                <ul class="user__list">
                    <li class="user__item" v-for="item in bookedList2" v-bind:key="item.id">
                        <p class="user__dates">C {{  item.startOfInterval }} по {{ item.endOfInterval}}</p>
                        <p class="user__name">{{item.owner.firstname}} {{item.owner.lastname}}</p>
                        <div class="buttons buttons--booked">
                            <div class="buttons__admin--cover">
                                <p class="cover">&times;</p>
                                <span class="buttons__admin--decline" @click="declineDate(item.id)">
                                    Отменить
                                </span>
                            </div>
                            <button class="buttons__admin buttons__admin--mobile" @click="declineDate(item.id)">Отменить</button>
                        </div>
                    </li>
                </ul>
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
                requestList1: [],
                requestList2: [],
                list1: [],
                list2: [],
                bookedList: [],
                bookedList1: [],
                bookedList2: [],
            };
        },
//?token=u1TgIsKIv8
        mounted() {
            axios({url: 'https://abrom-booking.herokuapp.com/api/v1/admin/requests', method: 'GET'})
                .then(response => {
                    this.requestList = response.data;
                    for (let c = 0; c < this.requestList.length; c++) {
                        if (this.requestList[c].cottageID === 1) {
                            this.requestList1.push(this.requestList[c]);
                        }
                        else if (this.requestList[c].cottageID === 2) {
                            this.requestList2.push(this.requestList[c]);
                        }
                    }
                });
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
            axios({url: 'https://abrom-booking.herokuapp.com/api/v1/admin/booked', method: 'GET'})
                .then(response => {
                    this.bookedList = response.data;
                    for (let c = 0; c < this.bookedList.length; c++) {
                        if (this.bookedList[c].cottageID === 1) {
                            this.bookedList1.push(this.bookedList[c]);
                        }
                        else if (this.bookedList[c].cottageID === 2) {
                            this.bookedList2.push(this.bookedList[c]);
                        }
                    }
                });
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
            acceptDate: function(id) {
                axios({url: 'https://abrom-booking.herokuapp.com/api/v1/admin/requests/' + id + '/accept', method: 'POST'})
                  .then(resp => {
                      location.reload();
                  })
                  .catch( err => alert(err))

            },
            declineDate: function(id) {
                axios({url: 'https://abrom-booking.herokuapp.com/api/v1/admin/requests/' + id + '/reject', method: 'POST'})
                    .then(resp => {
                        location.reload();
                    })
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