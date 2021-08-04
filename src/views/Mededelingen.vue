<template>
  <div class="container">
    <Pagination @paginationChanged="changePagination($event)" v-if="showPagination" :resultAmount="resultSet.length"/>
    <div class="results">
      <FiliaalCard v-for="mededeling in results" :key="mededeling.filiaalNummer" :filiaal="mededeling" />
    </div>
  </div>
</template>

<script>
import FiliaalCard from '@/components/FiliaalCard';
import Pagination from '@/components/Pagination';

import PaginationMixin from '@/mixins/PaginationMixin';

export default {
  mixins: [PaginationMixin],
  components: {
    FiliaalCard,
    Pagination,
  },
  props: {
    filialen: {
      type: Object,
    }
  },
  computed: {
    resultSet() {
      return Object.values(this.filialen).filter(
        filiaal => filiaal.mededeling
      ).map(
        filiaal => ({
          filiaalnummer: filiaal['filiaalnummer'],
          address: filiaal['address'],
          mededeling: filiaal['mededeling']
        })
      );
    },
    results() {
      return this.currentPaginatedResultSet.length === 0 ?
        this.resultSet.slice(0, process.env.VUE_APP_PAGINATION_SIZE) :
        this.currentPaginatedResultSet;
    }
  }
}
</script>

<style scoped>
  .container {
    margin-top: 11em;
  }
</style>
