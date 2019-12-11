<template>
  <section class="main__list">
    <agile>
    <div class="main__item">
      <img src="../assets/cabin.jpg" width="600"/>
      <div class="main_description">
        <p>
          Блаблабла
        </p>
      </div>
    </div>
    <div class="main__item">
      <img/>
      <div class="main_description">
        <p>
          Блаблабла
        </p>
      </div>
    </div>
    <div class="main__item">
      <img/>
      <div class="main_description">
        <p>
          Блаблабла
        </p>
      </div>
    </div>
    </agile>
  </section>
</template>

<script>
  import { VueAgile } from 'vue-agile'

  export default {
    components: {
      agile: VueAgile
    }
  }
</script>
<style>
</style>