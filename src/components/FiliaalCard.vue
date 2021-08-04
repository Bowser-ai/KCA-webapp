<template>
  <div class="result-card">
    <p class="header">FiliaalNummer:</p>
    <p>{{ filiaal.filiaalnummer }}</p>
    <p class="header">Adres:</p>
    <a class="address-link" href=""><p>{{ filiaal.address }}</p></a>
    <p v-if="filiaal.postcode" class="header">Postcode</p>
    <p v-if="filiaal.postcode"> {{ filiaal.postcode }}</p>
    <p v-if="filiaal.info" class="header">Info:</p>
    <p v-if="filiaal.info">{{ filiaal.info }}</p>
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
    font-size: 1.3em;
    background-color: #d0a3a7;
    padding: 20px;
    box-shadow: 3px 5px 5px 3px;
    width: 90%;
    margin: 1.5em auto;
  }

  .header {
    text-decoration: underline;
    font-weight: bold;
  }

  .address-link:hover {
    color: red;
  }
</style>
