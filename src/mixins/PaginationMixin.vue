<script>
  export default {
    data() {
      return {
        currentPaginatedResultSet: [],
      };
  },
  computed: {
    showPagination() {
      return this.resultSet.length > import.meta.env.VITE_PAGINATION_SIZE;
    },
  },
  methods: {
    changePagination(page) {
      this.currentPaginatedResultSet = this.resultSet.slice(
        (page - 1) * import.meta.env.VITE_PAGINATION_SIZE,
        page * import.meta.env.VITE_PAGINATION_SIZE
      );
    },
  }
}
</script>
