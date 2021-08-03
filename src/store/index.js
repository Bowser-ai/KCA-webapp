import { createStore } from 'vuex';
import db from '@/utils/firebase';

export default createStore({
  state: {
    filialen: {}
  },
  mutations: {
    getAllFilialen(state, data) {
      for (const filiaal of Object.values(data)) {
        state.filialen[filiaal.filiaalnummer]= filiaal;
      }
    }
  },
  actions: {
    async getAllFilialen({
      commit
    }
    )
    {
      const snapshot = await db.ref().once('value');
      if (!snapshot.exists()) throw new Error('database error, try again later');
      const filialen = await snapshot.val();
      commit('getAllFilialen', filialen);
    }
  },
  modules: {
  }
})
