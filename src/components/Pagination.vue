<template>
  <div v-if="showPagination" class="pagination-container">
    <p class="result-amount">Resultaten: {{ resultAmount }}</p>
    <div class="pagination-btns" v-if="paginationSize.length > 1">
      <button
        class="pagination-btn"
        role="button"
        @click="setPagination(i)"
        v-for="i in paginationSize"
        :key="i"
        :style="paginationButtonSelected(i)"
        >
        {{ i }}
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        currentPage: 1,
      };
    },
    props: {
      resultSet: {
        type: Array,
        default: () => [],
      }
    },
    mounted() {
      this.setPagination(1);
    },
    computed: {
      resultAmount() {
        return this.resultSet.length;
      },
      paginationSize() {
        const totalPagination = this.resultAmount / process.env.VUE_APP_PAGINATION_SIZE + 1;
        const paginationArray = [];
        if (totalPagination > 0) {
          for (let i = 1; i < totalPagination; ++i) {
            paginationArray.push(i);
          }
          return paginationArray;
        }
        return [];
      },
      showPagination() {
        return this.resultAmount > process.env.VUE_APP_PAGINATION_SIZE;
      },
    },
    methods: {
      paginationButtonSelected(page) {
        if (page === this.currentPage) {
          return {
            backgroundColor: '#f9bca3'
          };
        }
        return {};
      },
      setPagination(page) {
        this.currentPage = page;
        const lowerBound = (page - 1) * process.env.VUE_APP_PAGINATION_SIZE
        const upperBound = page * process.env.VUE_APP_PAGINATION_SIZE
        this.$emit('paginationChanged', lowerBound, upperBound);
      },
    },
  }
</script>

<style scoped>
  .pagination-btn {
    font-size: 1.1em;
    margin: 0.2em;
    cursor: pointer;
  }
</style>
