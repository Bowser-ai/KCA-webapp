<template>
  <div class="pagination-container">
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
        currentPage: 1
      };
    },
    props: {
      resultAmount: {
        type: Number,
        default: 0
      },
    },
    computed: {
      paginationSize() {
        const totalPagination = this.resultAmount / import.meta.env.VITE_PAGINATION_SIZE + 1;
        const paginationArray = []
        if (totalPagination > 0) {
          for (let i = 1; i < totalPagination; ++i) {
            paginationArray.push(i);
          }
          return paginationArray;
        }
        return [];
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
        this.$emit('paginationChanged', this.currentPage);
      }
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
