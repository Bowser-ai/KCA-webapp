<template>
  <div class="result-card">
    <p class="header">FiliaalNummer:</p>
    <p>{{ mededeling.filiaalId }}</p>
    <p class="header">Adres:</p>
    <a class="address-link" :href="addressMapUrl"><p>{{ address }}</p></a>
    <p class="header">Mededeling:</p>
    <p class="mededeling-header" >{{ formatDate(mededeling.dateCreated) }}</p>
    <textarea
      v-if="editMededelingMode"
      rows="10"
      cols="50"
      :value="mededeling.body"
      @input="updateBody"
    ></textarea>
    <p v-else class="mededeling"> <pre>{{ mededeling.body }}</pre></p>
    <button
      v-if="editMededelingMode"
      role="button"
      class="btn edit-mededeling-btn"
      @click="editMededeling(mededeling)"
    >
      Opslaan
    </button>
    <button
      v-else
      @click="editMededelingMode = true"
      role="button"
      class="btn edit-mededeling-btn"
    >
      Aanpassen
    </button>
  </div>
</template>

<script>
import { formatDate } from '@/utils/formatdate';
export default {
  props: {
    mededeling: Object,
  },
  data() {
    return {
      formatDate,
      editMededelingMode: false,
      updatedMededelingBody: '',
    };
  },
  computed: {
    address() {
      return this.$store.state.filialen[this.mededeling.filiaalId].address;
    },
    addressMapUrl() {
      return `${process.env.VUE_APP_MAPS_APPLICATION_URL}?q=${this.address}`;
    },
  },
  methods: {
    editMededeling(mededeling) {
      const updatedMededeling = mededeling.updateBody(this.updatedMededelingBody);
      this.$store.dispatch('updateMededeling', updatedMededeling).then(
        () => this.$emit('mededelingUpdated', mededeling)
      );
      this.editMededelingMode = false;
    },
    updateBody(e) {
      this.updatedMededelingBody = e.target.value;
    },
  }
}
</script>
