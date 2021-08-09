<template>
  <div class="result-card">
    <p class="header">FiliaalNummer:</p>
    <p>{{ filiaal.filiaalnummer }}</p>
    <p class="header">Adres:</p>
    <a class="address-link" :href="addressMapUrl"><p>{{ filiaal.address }}</p></a>
    <p v-if="filiaal.postcode" class="header">Postcode</p>
    <p v-if="filiaal.postcode"> {{ filiaal.postcode }}</p>
    <p v-if="filiaal.info" class="header">Info:</p>
    <p v-if="filiaal.info">{{ filiaal.info }}</p>
    <div v-if="filiaal.mededeling">
      <p class="header" >Mededeling</p>
      <p v-if="!editMededelingMode" class="mededeling"> <pre>{{ mededeling }}</pre></p>
      <textarea class="edit-mededeling" v-model="mededeling" v-else cols="50" rows="4"></textarea>
    </div>
    <slot></slot>
  </div>
</template>

<script>
  export default{
    data() {
      return {
        enteredMededeling: this.filiaal.mededeling
      };
    },
    props: {
      filiaal: {
        type: Object,
      },
      editMededelingMode: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      addressMapUrl() {
        return `${process.env.VUE_APP_MAPS_APPLICATION_URL}?q=${this.filiaal.address}`;
      },
      mededeling: {
        get() {
          return this.enteredMededeling;
        },
        set(value) {
          this.enteredMededeling = value;
          this.$emit('mededelingAdded', value);
        }
      }
    }
  }
</script>

<style scoped>
  .result-card {
    font-size: 1.3em;
    background-color: #d0a3a7;
    padding: 20px;
    box-shadow: 3px 5px 5px 3px;
    width: 90%;
    margin: 1.5em auto;
    border-radius: 10px;
  }

  .header {
    text-decoration: underline;
    font-weight: bold;
  }

  .address-link:hover {
    color: red;
  }

  .edit-mededeling {
    display: block;
    width: 90%;
    height: max-content;
    font-size: 1.1em;
    margin: 1em auto;
  }

</style>
