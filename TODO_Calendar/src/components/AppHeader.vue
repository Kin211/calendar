<script>
export default {
  methods: {
    goCalendar() {
      this.$router.push({
        name: 'calendar'
      })
    },
    goToday() {
      this.$router.push({
        name: 'today'
      })
    }
  }
}
</script>
<template>
  <div class="container">
    <header class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
      <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
        <img class="bi me-2" width="40" height="40" src="../assets/free-icon-clipboard-8913065.png">
        <span class="fs-4 text-dark">ToDo</span>
      </a>

      <ul class="nav nav-pills gap-3">
        <button @click="goCalendar()" type="button"
            class="btn btn-secondary">Календарь</button>
        <button @click="goToday()" type="button"
            class="btn btn-secondary">Сегодня</button>
      </ul>
    </header>
  </div>
</template>

<style></style>