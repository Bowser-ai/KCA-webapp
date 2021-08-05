<template>
  <div class="container">
    <button
      class="btn add-mededeling-btn"
      role="button"
      @click="toggleAddMededelingModal"
      >
        Mededeling toevoegen
    </button>
    <Pagination
      @paginationChanged="changePagination($event)"
      v-if="showPagination"
      :resultAmount="resultSet.length"
    />
    <div class="modal" v-if="showAddMededelingModal">
      <div class="modal-body">
        <p class="modal-body-text">Mededeling toevoegen</p>
        <span class="input-field">
          <label for="modal-filiaal-nummer">FiliaalNummer:</label>
          <input
            style="width: 4.5em;"
            type="Number"
            id="modal-filiaal-nummer"
            data-role="input-filiaalnummer"
          >
        </span>
        <span class="input-field">
          <label for="modal-mededeling">Mededeling:</label>
          <textarea
            id="modal-mededeling"
            data-role="input-mededeling"
            cols="50"
            rows="5"
          />
        </span>
        <span v-if="error">
          <p class="error">{{ error }}</p>
        </span>
        <div class="modal-btns">
          <button
            role="button"
            class="modal-btn"
            @click="addMededeling"
          >
            Toevoegen
          </button>
          <button
            @click="toggleAddMededelingModal"
            role="button"
            class="modal-btn"
          >
            Annuleren
          </button>
        </div>
      </div>
    </div>
    <div class="results">
      <FiliaalCard
        v-for="mededeling in results"
        :key="mededeling.filiaalNummer"
        :filiaal="mededeling"
      >
        <button role="button" class="btn edit-mededeling-btn">Aanpassen</button>
      </FiliaalCard>
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
      showAddMededelingModal: false,
      error: '',
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
  },
  methods: {
    toggleAddMededelingModal() {
      this.showAddMededelingModal = !this.showAddMededelingModal;
      this.toggleScrolling();
    },
    toggleScrolling() {
      const bodyEl = document.querySelector('body');
      if (this.showAddMededelingModal) {
        bodyEl.style.overflow = 'hidden';
      } else {
        bodyEl.style.overflow = 'auto';
      }
    },
    addMededeling() {
      const filiaalnummer = document.querySelector('[data-role="input-filiaalnummer"]').value;
      const filiaal = this.filialen[filiaalnummer];
      if (filiaal === undefined) {
        this.error = `Filiaal met nummer: ${filiaalnummer} bestaat niet`;
        return;
      }
      if (filiaal.mededeling) {
        this.error = `Filiaal met nummer: ${filiaalnummer} heeft al een mededeling`;
        return;
      }
      filiaal.mededeling = document.querySelector('[data-role="input-mededeling"]').value;
      this.$store.dispatch('addMededeling', filiaal);
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
    background-color: rgba(0, 0, 0, 0.85);
    z-index: 3;
    pointer-events: auto;
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

  .error {
    font-size: 1.2em;
    color: #4a3030;
    font-weight: 800;
  }

  .add-mededeling-btn {
    font-size: 1.1em;
    margin-bottom: 0.9em;
  }
</style>
