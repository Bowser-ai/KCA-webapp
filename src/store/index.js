import { createStore } from 'vuex';
import { formatDate } from '@/utils/formatdate';
import { Filiaal } from '@/models/filiaal';
import { Mededeling } from '@/models/mededeling';

export default createStore({
  state: {
    filialen: {},
    repository: null,
  },
  mutations: {
    setAllFilialen(state, filialen) {
      for (const filiaal of filialen) {
        state.filialen[filiaal.filiaalNumber] = filiaal;
      }
    },
    setAllMededelingen(state, mededelingen) {
      for (const mededeling of mededelingen) {
        const filiaal = state.filialen[mededeling.filiaalId];
        filiaal.addMededeling(mededeling);
      }
    },
    updateMededeling(state, mededeling) {
      const filiaal = state.filialen[mededeling.filiaalId]
      const updatedMededelingen = filiaal.mededelingen.reduce((acc, m) => {
        if (m.id === mededeling.id) return [...acc, mededeling]
        return [...acc, m]
      }, []);
      filiaal.mededelingen = updatedMededelingen;
    },
    setMededeling(state, {id, filiaalId, body}) {
      const mededeling = new Mededeling(
        id,
        filiaalId,
        formatDate(new Date),
        formatDate(new Date),
        body
      );
      state.filialen[filiaalId].prependMededeling(mededeling);
    },
    setRepository(state, repository) {
      state.repository = repository;
    },
  },
  actions: {
    async getAllFilialen({ state, commit }) {
      const filialen = await state.repository.getAllFilialen();
      commit(
        'setAllFilialen',
        filialen.map(
          f => new Filiaal(f.filiaalNumber, f.address, f.zipcode, f.tel, f.info)
        )
      );
    },

    async getAllMededelingen({ state, commit }) {
      const mededelingen = await state.repository.getAllMededelingen();
      commit(
        'setAllMededelingen',
        mededelingen.map(
          m => new Mededeling(m.id, m.filiaalId, m.dateCreated, m.dateModified, m.body)
        )
      );
    },

    async updateMededeling({ state, commit }, mededeling) {
      state.repository.updateMededeling(mededeling);
      commit('updateMededeling', mededeling);
    },

    async createMededeling({ state, commit }, {filiaalId, mededeling: body}) {
      const id = await state.repository.createMededeling(filiaalId, body);
      commit('setMededeling', {id, filiaalId, body});
    }
  },
  modules: {
  }
})
