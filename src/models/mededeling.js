export class Mededeling {
  constructor(id, filiaalId, dateCreated, dateModified, body) {
    this.id = id;
    this.filiaalId = filiaalId;
    this.dateCreated = dateCreated;
    this.dateModified = dateModified;
    this.body = body;
  }
  updateBody(body) {
    return new Mededeling(
      this.id,
      this.filiaalId,
      this.dateCreated,
      this.dateModified,
      body
    );
  }
}
