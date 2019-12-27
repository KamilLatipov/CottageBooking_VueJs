<template>
  <section class="main__list">
    <agile>
    <div class="main__item">
      <img src="../assets/cabin.jpg" width="600"/>
      <div class="main_description">
        <p class="wo">
          Блаблабла
        </p>
        <div class="box">
          <section>
            <date-picker v-model="value1" type="date" range placeholder="Select date range"></date-picker>
          </section>
        </div>
      </div>
    </div>
    <div class="main__item">
      <img/>
      <div class="main_description">
        <p>
          Блаблабла
        </p>
        <div class="box">
          <section>
            <date-picker v-model="value1" type="date" range placeholder="Select date range"></date-picker>
          </section>
        </div>
      </div>
    </div>
    <div class="main__item">
      <img/>
      <div class="main_description">
        <p>
          Блаблабла
        </p>
        <div class="box">
          <section>
            <date-picker v-model="value1" type="date" range placeholder="Select date range"></date-picker>
          </section>
        </div>
      </div>
    </div>
    </agile>
  </section>
</template>

<script>
  import { VueAgile } from 'vue-agile'
  import DatePicker from 'vue2-datepicker';
  import 'vue2-datepicker/index.css';
  export default {
    name: "header",
    data() {
      return {
        value1: [new Date(2019, 9, 8), new Date(2019, 9, 19)],
        value2: [],
        showTimePanel: true,
        showTimeRangePanel: true,
      };
    },
    components: {
      DatePicker ,
      agile: VueAgile
    }
  }
</script>
<style>
  .agile__dots {
    display: flex;
    justify-content: space-between;

    width: 100px;
    bottom: -90px;
    left: 50%;
    position: absolute;
    transform: translateX(-50%);
  }
  .agile__dot button {
    background-color: white;

    height: 20px;
    width: 20px;

    border: 1.5px solid black;
    border-radius: 50% 50%;
  }
  .agile__dot--current button{
    background-color: rgba(139,197,64, 0.4);
  }
  .agile__dot:hover button{
    opacity: 0.8;
    background-color: #8bc540;
  }
  .main__item  {
    display: flex;
    justify-content: space-around;

    margin-top: 60px;
    height: 450px;
  }
  .agile__slides {
    border-bottom: 1px solid black;
  }
  .agile__nav-button {
     background: transparent;
     border: none;
     color: black;
     cursor: pointer;
     font-size: 37px;
     height: 100%;
     position: absolute;
     top: 0;
     transition-duration: .3s;
     width: 90px;
    opacity: 0.6;
   }
  .agile__nav-button:hover {
    background-color: rgba(139,197,64, 0.14);
    opacity: 1;
  }
  .agile__nav-button--next {
    right: 0;
  }
  .agile__nav-button--prev {
    left: 0;
  }
</style>