export class Filiaal {
  constructor(filiaalNumber, address, zipcode, tel, info) {
    this.filiaalNumber = filiaalNumber;
    this.address = address;
    this.zipcode = zipcode;
    this.tel = tel;
    this.info = info;
    this.mededelingen = [];
  }
  addMededeling(mededeling) {
    this.mededelingen.push(mededeling);
  }
  prependMededeling(mededeling) {
    this.mededelingen.unshift(mededeling);
  }
}
