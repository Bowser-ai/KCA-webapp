export class BaseRepository {
  getAllFilialen() {
    this.abstractError();
  }

  getAllMededelingen() {
    this.abstractError();
  }

  createMededeling(filiaalId, body) {
    this.abstractError(filiaalId, body);
  }

  updateMededeling(mededeling) {
    this.abstractError(mededeling);
  }

  abstractError() {
    throw new Error('This class is abstract');
  }
}
