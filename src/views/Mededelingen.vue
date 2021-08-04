<template>
  <div class="container">
    <div class="mededelingen">
      <FiliaalCard v-for="mededeling in mededelingen" :key="mededeling.filiaalNummer" :filiaal="mededeling" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import FiliaalCard from '@/components/FiliaalCard';

export default {
  components: {
    FiliaalCard,
  },
  computed: {
    ...mapState({
      filialen: state => state.filialen
    }),
    mededelingen() {
      return Object.values(this.filialen).filter(
        filiaal => filiaal.mededeling
      ).map(
        filiaal => ({
          filiaalNummer: filiaal['filiaalNummer'],
          address: filiaal['address'],
          mededeling: filiaal['mededeling']
        })
      );
    }
  }
}
</script>

<style scoped>
  .container {
    margin-top: 11em;
  }
</style>
