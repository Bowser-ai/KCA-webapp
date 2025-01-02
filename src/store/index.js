import { createStore } from 'vuex';

export default createStore({
  state: {
    filialen: {},
    repository: null,
  },
  mutations: {
    setAllFilialen(state, data) {
      for (const filiaal of Object.values(data)) {
        state.filialen[filiaal.filiaalnummer]= filiaal;
      }
    },
    setMededeling(state, filiaal) {
      state.filialen[filiaal.filiaalnummer].mededeling = filiaal.mededeling;
    },
    setRepository(state, repository) {
      state.repository = repository;
    }
  },
  actions: {
    async getAllFilialen({ state, commit }) {
      const filialen = await state.repository.getAllFilialen();
      commit('setAllFilialen', filialen);
    },
    async addMededeling({ state, commit }, filiaal) {
      await state.repository.addMededeling(filiaal);
      commit('setMededeling', filiaal);
    }
  },
  modules: {
  }
})
