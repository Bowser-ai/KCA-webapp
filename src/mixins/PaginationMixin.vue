<script>
  export default {
    data() {
      return {
        currentPaginatedResultSet: [],
      };
  },
  computed: {
    showPagination() {
      return this.resultSet.length > process.env.VUE_APP_PAGINATION_SIZE;
    },
  },
  methods: {
    changePagination(page) {
      this.currentPaginatedResultSet = this.resultSet.slice(
        (page - 1) * process.env.VUE_APP_PAGINATION_SIZE,
        page * process.env.VUE_APP_PAGINATION_SIZE
      );
    },
  }
}
</script>
