<template>
  <div class="container">
    <div v-show="message" class="message"> {{ message }} </div>
    <button
      class="btn add-mededeling-btn"
      role="button"
      @click="toggleAddMededelingModal"
      >
        Mededeling toevoegen
    </button>
    <Pagination
      :resultSet="mededelingen"
      @paginationChanged="updatePagination"
    />
    <div>
      <label for="sorting">Sortering</label>
      <select v-model="sortMethod" class="sorting" id="sorting">
        <option value="filiaalId" >FiliaalNummer</option>
        <option value="date">Datum</option>
      </select>
    </div>
    <div class="modal" v-if="showAddMededelingModal">
      <div class="modal-body">
        <p class="modal-body-text">Mededeling toevoegen</p>
        <span class="input-field">
          <label for="modal-filiaal-nummer">FiliaalNummer:</label>
          <input
            style="width: 4.5em;"
            type="Number"
            id="modal-filiaal-nummer"
            @input="enteredFiliaalNumber = $event.target.value"
          >
        </span>
        <span class="input-field">
          <label for="modal-mededeling">Mededeling:</label>
          <textarea
            id="modal-mededeling"
            cols="50"
            rows="5"
            @input="enteredMededeling = $event.target.value"
          />
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
      <MededelingCard
        v-for="mededeling in result"
        :key="mededeling.id"
        :mededeling="mededeling"
        @mededelingUpdated="handleUpdatedMededeling(mededeling)"
      />
    </div>
  </div>
</template>

<script>
import MededelingCard from '@/components/MededelingCard';
import Pagination from '@/components/Pagination';

const sortMethods = {
  filiaalId: (m1, m2) => m1.filiaalId - m2.filiaalId,
  date: (m1, m2) => {
    const d1 = new Date(m1.dateCreated)
    const d2 = new Date(m2.dateCreated)
    return d2 - d1;
  },
};
export default {
  components: {
    MededelingCard,
    Pagination,
  },
  props: {
    filialen: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      showAddMededelingModal: false,
      message: '',
      lowerPage: 0,
      upperPage: null,
      sortMethod: 'filiaalId',
      enteredFiliaalNumber: 0,
      enteredMededeling: ""
    };
  },
  computed: {
    mededelingen() {
      return Object.values(this.filialen).filter(
        filiaal => filiaal.mededelingen.length > 0
      ).reduce((acc, filiaal) => [...acc, ...filiaal.mededelingen], [])
        .sort(sortMethods[this.sortMethod])
    },
    result() {
      return this.upperPage ? this.mededelingen.slice(this.lowerPage, this.upperPage) : this.mededelingen;
    },
  },
  methods: {
    updatePagination(lower, upper) {
      this.lowerPage = lower;
      this.upperPage = upper;
    },
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
    handleUpdatedMededeling(mededeling) {
      this.setMessage(`Mededeling is aangepast voor filiaal met nummer: ${mededeling.filiaalId}`, true);
    },
    addMededeling() {
      const filiaal = this.filialen[this.enteredFiliaalNumber];
      if (filiaal === undefined) {
        this.setMessage(`Filiaal met nummer: ${this.enteredFiliaalNumber} bestaat niet`, false);
      }
      else {
        this.createMededeling(filiaal.filiaalNumber, this.enteredMededeling);
      }
      this.toggleAddMededelingModal();
    },
    async createMededeling(filiaalId, mededeling) {
      try{
        await this.$store.dispatch('createMededeling', {filiaalId, mededeling});
        this.setMessage(`Mededeling toevoegd aan filiaal met nummer: ${filiaalId}`, true);
      }
      catch (error) {
        this.setMessage('Er is iets misgegaan', false);
      }
      finally {
        this.enteredMededeling = "";
        this.enteredFiliaalNumber = 0;
      }
    },
    setMessage(msg, isSuccessFull) {
      this.message = msg;
      const addedClass = isSuccessFull ? 'success' : 'error'
      const messageElem = document.querySelector('.message');
      messageElem.classList.add(addedClass);
      setTimeout(() => {
        messageElem.classList.remove(addedClass);
        this.message = '';
      }, 3000);
    },
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

  .error {
    display: flex;
    background-color: red;
  }

  .success {
    display: flex;
    background-color: #aeeaaefc;
  }

  .message {
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    transform: translateX(50%);
    font-size: 1.4em;
    position: fixed;
    width: 50%;
    padding: 1em;
    height: 3.0em;
    border-radius: 2em;
  }
  .sorting {
    font-size: 17pt;
    margin: 1.2rem;
  }
</style>
