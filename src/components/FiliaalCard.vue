<template>
  <div class="result-card">
    <p class="header">FiliaalNummer:</p>
    <p>{{ filiaal.filiaalNumber }}</p>
    <p class="header">Adres:</p>
    <a class="address-link" :href="addressMapUrl"><p>{{ filiaal.address }}</p></a>
    <p v-if="filiaal.zipcode" class="header">Postcode</p>
    <p v-if="filiaal.zipcode"> {{ filiaal.zipcode }}</p>
    <p v-if="filiaal.info" class="header">Info:</p>
    <p v-if="filiaal.info">{{ filiaal.info }}</p>
    <div class="mededelingen" v-for="(mededeling, i) in filiaal.mededelingen" :key="mededeling.id">
      <p class="header" >Mededeling {{filiaal.mededelingen.length > 1 ? i + 1 : ''}}</p>
      <p class="mededeling-header" >{{ formatDate(mededeling.dateCreated) }}</p>
      <p class="mededeling"> <pre>{{ mededeling.body }}</pre></p>
    </div>
  </div>
</template>

<script>
  import { formatDate } from '@/utils/formatdate';
  export default{
    data() {
      return {
        formatDate,
        mededelingen: this.filiaal.mededelingen,
      };
    },
    props: {
      filiaal: {
        type: Object,
      },
    },
    computed: {
      addressMapUrl() {
        return `${process.env.VUE_APP_MAPS_APPLICATION_URL}?q=${this.filiaal.address}`;
      },
    },
}
</script>
