import { createStore } from 'vuex';
import db from '@/utils/firebase';

export default createStore({
  state: {
    filialen: {}
  },
  mutations: {
    setAllFilialen(state, data) {
      for (const filiaal of Object.values(data)) {
        state.filialen[filiaal.filiaalnummer]= filiaal;
      }
    },
    setMededeling(state, filiaal) {
      state.filialen[filiaal.filiaalnummer].mededeling = filiaal.mededeling;
    }
  },
  actions: {
    async getAllFilialen({ commit }) {
      const snapshot = await db.ref().once('value');
      if (!snapshot.exists()) throw new Error('database error, try again later');
      const filialen = await snapshot.val();
      commit('setAllFilialen', filialen);
    },
    async addMededeling({ commit }, filiaal) {
      const snapshot = await db.ref()
        .orderByChild('filiaalnummer')
        .equalTo(filiaal.filiaalnummer)
        .once('value');

      if (!snapshot.exists()) {
        throw new Error('filiaal niet gevonden in de database');
      }

      await db.ref(Object.keys(snapshot.val())[0]).update(filiaal);
      commit('setMededeling', filiaal);
    }
  },
  modules: {
  }
})
