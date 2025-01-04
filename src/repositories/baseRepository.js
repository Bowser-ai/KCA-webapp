export class BaseRepository {
  getAllFilialen() {
    this.abstractError();
  }
  addMededeling() {
    this.abstractError();
  }
  abstractError() {
    throw new Error('This class is abstract');
  }
}
