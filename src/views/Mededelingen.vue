<template>
  <div class="container">
    <Pagination @paginationChanged="changePagination($event)" v-if="showPagination" :resultAmount="resultSet.length"/>
    <div class="modal" v-if="showAddMededelingModal">
      <div class="modal-body">
        <p class="modal-body-text">Mededeling toevoegen</p>
        <span class="input-field">
          <label for="modal-filiaal-nummer">FiliaalNummer:</label>
          <input style="width: 4.5em;" type="Number" id="modal-filiaal-nummer">
        </span>
        <span class="input-field">
          <label for="modal-mededeling">Mededeling:</label>
          <textarea id="modal-mededeling" cols="50" rows="5"/>
        </span>
        <div class="modal-btns">
          <button role="button" class="modal-btn">Toevoegen</button>
          <button role="button" class="modal-btn">Annuleren</button>
        </div>
      </div>
    </div>
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
  data() {
    return {
      showAddMededelingModal: true
    };
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
  .modal {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 3
  }
  .input-field {
    display: flex;
    text-align: left;
  }
  .modal-body {
    display: flex;
    flex-direction: column;
    align-content: center;
    background-color: #dc7f7f;
    box-shadow: 5px 5px 5px 5px black;
    padding: 1em;
  }
  .modal-body > span {
    margin-top: 1.0em;
  }
  .modal-body label {
    margin-right: 1em;
    width: 7em;
  }
  .modal-btns {
    display: flex;
    margin-top: 2em;
    justify-content: space-evenly;
  }
  .modal-btn {
    cursor: pointer;
  }
</style>
