<template>
  <div class="result-card">
    <p class="header">FiliaalNummer:</p>
    <p>{{ filiaal.filiaalnummer }}</p>
    <p class="header">Adres:</p>
    <p>{{ filiaal.address }}</p>
    <p class="header">Postcode</p>
    <p>{{ filiaal.postcode }}</p>
    <p class="header">Info:</p>
    <p>{{ filiaal.info }}</p>
    <p v-if="filiaal.mededeling" class="header">Mededeling</p>
    <p v-if="filiaal.mededeling"> {{ filiaal.mededeling }}</p>
  </div>
</template>

<script>
  export default{
    props: {
      filiaal: {
        type: Object,
      }
    },
  }
</script>

<style scoped>
  .result-card {
    background-color: #d0a3a7;
    padding: 20px;
    box-shadow: 3px 5px 5px 3px;
  }

  .header {
    text-decoration: underline;
    font-weight: bold;
  }
</style>
