<template>
  <section class="main__list">
    <div class="main__item">
      <img/>
      <p>
        Блаблабла
      </p>
    </div>
    <div class="main__item">
      <img/>
      <p>
        Блаблабла
      </p>
    </div>
    <div class="main__item">
      <img/>
      <p>
        Блаблабла
      </p>
    </div>
  </section>
</template>

<script>
export default {
  name: 'home',
}

</script>
<style>
  .main__list {
    margin: 0 auto;

    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .main__item {
    width: 800px;
    border: 1px solid black;
    border-radius: 10px 10px;
  }
</style>