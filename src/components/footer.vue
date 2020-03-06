<template>
    <footer v-if="isLoggedIn" class="main-footer">
        <div class="main-footer__report">
            <p>Один момент… это не конечный релиз проекта. Поэтому, если заметите баги, дайте пожалуйста знать.</p>
            <img class="main-footer__img" src="../assets/mail.png">
        </div>
    </footer>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "footer",
        computed: {
            ...mapGetters({
                isLoggedIn: "isLoggedIn",
            }),

        },
    }
</script>

<style scoped>

</style>