<template>
    <main>
        <div class="add-house">
            <div class="add-house__wrapper">
               <h3 class="add-house__title">Добавить новый дом</h3>
                <form class="add-house__form">
                    <fieldset class="add-house__rooms">
                        <legend>Количество комнат</legend>
                        <label class="add-house__label">
                            Общая площадь
                            <input class="add-house__room" type="number">
                            кв. м.
                        </label>
                        <label class="add-house__label">
                            <span>Хол</span>
                            <input class="add-house__room" type="number">
                        </label>
                        <label class="add-house__label">
                            <span>Спальные комнаты</span>
                            <input class="add-house__room" type="number">
                        </label>
                        <label class="add-house__label">
                            <span>Уборная комната</span>
                            <input class="add-house__room" type="number">
                        </label>
                        <label class="add-house__label">
                            <span>Кухонная зона</span>
                            <input class="add-house__room" type="number">
                        </label>
                    </fieldset>
                    <fieldset class="add-house__description">
                        <legend>Описание</legend>
                        <textarea class="add-house__text"></textarea>
                    </fieldset>
                    <fieldset class="add-house__wishes">
                        <legend>Пожелания</legend>
                        <textarea class="add-house__text"></textarea>
                    </fieldset>
                    <span class="add-house__submit">
                        <input class="add-house__file" type="file" multiple>
                        <button class="add-house__button" type="submit">Добавить</button>
                    </span>
                </form>
            </div>
        </div>
        <router-link class="main__admin" to="/home">
            <p>
                Главная
            </p>
        </router-link>
    <section class="admin__list">
        <div class="admin__item">
            <div class="admin__description">
                <div class="admin__images">
                    <img class="admin__image admin__image--1" src="../assets/cabin.jpg"/>
                </div>
                <div class="admin__calendar">
                    <div class="box">
                        <section class="box-width">
                            <date-picker v-model="values[items.id]" type="text" value-type="format" range placeholder="Выберите даты"  :disabled-date="disabledDate" inline></date-picker>
                        </section>
                    </div>
                </div>
            </div>
            <div class="user user--admin">
                <p class="user__title first">Запросы:</p>
                <p class="user__title third">Одобрено:</p>
                <ul class="user__list second">
                    <li class="user__item" v-for="item in reverseList(requestList1)" v-bind:key="item.id">
                        <p class="user__dates user__dates--admin">C {{  item.startOfInterval }} по {{ item.endOfInterval}}</p>
                        <p class="user__name">{{item.owner.firstname}} {{item.owner.lastname}}</p>
                        <div class="buttons">
                            <button class="buttons__admin" @click="acceptDate(item.id)">Да</button>
                            <button class="buttons__admin" @click="declineDate(item.id)">Нет</button>
                        </div>
                    </li>
                </ul>
                <ul class="user__list fourth">
                    <li class="user__item" v-for="item in reverseList(bookedList1)" v-bind:key="item.id">
                        <p class="user__dates">C {{  item.startOfInterval }} по {{ item.endOfInterval}}</p>
                        <div class="user__switch">
                            <div class="user__hover">
                                <p>&times;</p>
                            </div>
                            <p class="user__decline" @click="declineDate(item.id)">Отменить</p>
                            <p class="user__name">{{item.owner.firstname}} {{item.owner.lastname}}</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </section>
    </main>
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
                values: [],
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
        mounted() {
            axios({url: http + '/api/v1/admin/requests', method: 'GET'})
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
            axios({url: http + '/api/v1/admin/booked', method: 'GET'})
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
                axios({url: http + '/api/v1/admin/requests/' + id + '/accept', method: 'POST'})
                  .then(resp => {
                      location.reload();
                  })
                  .catch( err => alert(err))

            },
            declineDate: function(id) {
                axios({url: http + '/api/v1/admin/requests/' + id + '/reject', method: 'POST'})
                    .then(resp => {
                        location.reload();
                    })
                    .catch( err => alert(err))
            },
            reverseList: function(list) {
                return list.slice().reverse();
            }
        },
        components: {
            DatePicker ,
        }
    }
</script>

<style scoped>

</style>