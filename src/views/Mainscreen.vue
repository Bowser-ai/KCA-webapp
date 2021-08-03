<template>
  <div class="container">
    <h2 style="text-align:center;">Filiaal Zoeken</h2>
    <div class="search-choices">
      <label>
        <input id="filiaal-number" checked type="radio" name="search-type" value="filiaal-number">
        FiliaalNummer
      </label>
      <label>
        <input type="radio" name="search-type" value="adres/plaats">
        Adres/plaats
      </label>
      <label>
        <input type="radio" name="search-type" value="postcode">
        Postcode
      </label>
    </div>
    <div class="search-form">
      <input
      placeholder="Voer filiaalnummer in"
      type="number"
      id="search-field"
      class="search-input-field"
      @keyup.enter="handleSearchInput"
      >
    </div>
    <div class="results">
      <FiliaalCard v-for="filiaal in resultSet" :key="filiaal.filiaalnummer" :filiaal="filiaal"/>
      <p class="error" v-if="error"> {{ error }}</p>
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
  data() {
    return {
      resultSet: [],
      error: '',
    };
  },
  async mounted() {
    try{
      await this.$store.dispatch('getAllFilialen');
    }
    catch(error) {
      this.error = error;
    }
  },
  computed: {
    ...mapState ({
      filialen: state => state.filialen
    })
  },
  methods: {
    handleSearchInput(e) {
      e.preventDefault();
      this.resetScreen();
      const filiaalNummer = e.target.value;
      const filiaal = this.filialen[filiaalNummer];
      if (filiaal === undefined) {
        this.error = 'filiaal niet gevonden';
        return;
      }
      this.resultSet.push(filiaal);
    },
    resetScreen() {
      this.resultSet = [];
      this.error = '';
    }
  }
}
</script>

<style scoped>
  .container {
    margin: 40px;
    padding: 10px;
  }

  .search-label {
    font-size: 25px;
    margin-bottom: 20px;
  }

  #search-field {
    width: 50%;
    height: 40px;
    margin: auto;
    font-size: 20px;
  }

  .search-choices {
    display: flex;
    align-content: space-around;
    justify-content: center;
    margin-top: 190px;
    margin-bottom: 10px;
  }

  .search-choices > label {
    margin: 10px;
  }

  .search-form {
    text-align: center;
    display: flex;
    flex-direction: column;
  }

  .results {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px;
    padding: 10px;
  }

  .error {
    color: red;
    font-size: 24px;
    font-weight: bold;
  }
</style>
