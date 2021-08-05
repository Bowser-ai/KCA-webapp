<template>
  <div class="container">
    <h2 style="text-align:center;font-size: 1.4em">Filiaal Zoeken</h2>
    <div class="search-choices">
      <label>
        <input id="filiaal-number" @change="changeSearchMode" checked type="radio" name="search-type" value="filiaal-nummer">
        FiliaalNummer
      </label>
      <label>
        <input type="radio" @change="changeSearchMode" name="search-type" value="adres/plaats">
        Adres/plaats
      </label>
      <label>
        <input type="radio" @change="changeSearchMode" name="search-type" value="postcode">
        Postcode
      </label>
    </div>
    <div class="search-form">
      <input
      :placeholder="searchBarMode.placeholder"
      :type="searchBarMode.type"
      id="search-field"
      class="search-input-field"
      @keyup.enter="search($event, searchBarMode.fn)"
      >
    </div>
    <Pagination @paginationChanged="changePagination($event)" v-if="showPagination" :resultAmount="resultSet.length"/>
    <div class="results">
      <FiliaalCard v-for="filiaal in results" :key="filiaal.filiaalnummer" :filiaal="filiaal"/>
      <p class="error" v-if="error"> {{ error }}</p>
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
      type: Object
    }
  },
  data() {
    return {
      resultSet: [],
      error: '',
      searchMode: 'filiaal-nummer',
    };
  },
  computed: {
    searchBarMode() {
      const mapping = {
        'filiaal-nummer': {
          type: 'number',
          placeholder: 'Voer filiaalnummer in',
          fn: this.searchFiliaalNummer,
        },
        'adres/plaats': {
          type: 'text',
          placeholder: 'Voer adres of plaats in',
          fn: this.searchAddress,
        },
        'postcode': {
          type: 'text',
          placeholder: 'Voer postcode in',
          fn: this.searchPostcode,
        }
      }
      return mapping[this.searchMode];
    },
    results() {
      return this.currentPaginatedResultSet.length > 0 ?
        this.currentPaginatedResultSet : this.resultSet;
    },
  },
  methods: {
    searchFiliaalNummer(e) {
      const filiaalNummer = e.target.value;
      const filiaal = this.filialen[filiaalNummer];
      if (filiaal === undefined) {
        this.error = `filiaal met nummer: "${filiaalNummer}" niet gevonden`;
        return;
      }
      this.resultSet.push(filiaal);
    },
    searchAddress(e) {
      const searchTerm = e.target.value;
      if (searchTerm === '') return;
      this.searchImpl(searchTerm, 'address', address =>
        address.toLowerCase().includes(searchTerm.toLowerCase())
      );
    },
    searchPostcode(e) {
      const searchTerm = e.target.value;
      const postCodeRegex = /(^\d{4}\s*\w{2}$)|(^[B|b]*\s*\d{4,5}$)/

      if (!postCodeRegex.test(searchTerm)) {
        this.error = "Postcode moet naar geldig Nederlandse of Belgische conventie ingevoerd worden";
        return;
      }

      const removeWsRegex = /\s+/g;
      this.searchImpl(
        searchTerm,
        'postcode',
        postcode => postcode.toLowerCase().replace(removeWsRegex, '') ===
          searchTerm.toLowerCase().replace(removeWsRegex, '')
      );
    },
    searchImpl(searchTerm, key, predicate) {
      for (let filiaal of Object.values(this.filialen)) {
        if (filiaal && filiaal[key] && predicate(filiaal[key])) {
          this.resultSet.push(filiaal);
        }
      }
      if (this.resultSet.length === 0) {
        this.error = `Geen filialen gevonden met zoekterm: "${searchTerm}"`;
      }
    },
    search(e, searchFunc) {
      this.resetScreen();
      searchFunc(e);
      const pageNumber = 1;
      this.changePagination(pageNumber);
      this.clearInput();
    },
    resetScreen() {
      this.resultSet = [];
      this.error = '';
    },
    changeSearchMode(e) {
      this.searchMode = e.target.value;
    },
    clearInput() {
      document.querySelector('#search-field').value = '';
    },
  },
}
</script>

<style scoped>
  .container {
    margin: 9em 0;
    padding: 0.5em;
  }

  .search-label {
    font-size: 1.5em;
    margin-bottom: 1.1em;
  }

  #search-field {
    width: 70%;
    height: 2.5em;
    margin: auto;
    font-size: 1.2em;
  }

  .search-choices {
    display: flex;
    align-content: space-around;
    justify-content: center;
    margin-top: 1em;
    margin-bottom: 0.7em;
  }

  .search-choices > label {
    margin: 0.7em;
  }

  .search-form {
    text-align: center;
    display: flex;
    flex-direction: column;
  }

  
  .error {
    color: red;
    font-size: 24px;
    font-weight: bold;
  }
</style>
