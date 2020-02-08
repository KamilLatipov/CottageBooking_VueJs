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
            </div>
            <div class="admin-panel">
                
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
                let count = date < today;
                for (let i = 0; i < 4; i++) {
                    let string = this.list[i].endOfInterval;
                    let string2 = this.list[i].startOfInterval;
                    let splited = string.split("-");
                    let splited2 = string2.split("-");
                    let a2 = parseInt(splited2[0], 10);
                    let b2 = parseInt(splited2[1], 10);
                    let c2 = parseInt(splited2[2], 10);
                    let a = parseInt(splited[0], 10);
                    let b = parseInt(splited[1], 10);
                    let c = parseInt(splited[2], 10);
                    count = count || (date > new Date(a, b, c) && date < new Date (a2, b2, c2));
                }
                return count;
            },
            sendDate: function() {
                let dates = this.value1;
                this.dates1 = "c " + this.value1[0] + " по " + this.value1[1];
                this.status = "В ожидании";
                this.$store.dispatch('sendDates', dates)
                    .then(() => alert(dates))
                    .catch(err => alert(err))
            }
        },
        components: {
            DatePicker ,
        }
    }
</script>

<style scoped>

</style>