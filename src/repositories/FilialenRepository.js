import { BaseRepository } from "@/repositories/BaseRepository";
import { Api } from "@/Api.js";

export class FilialenRepository extends BaseRepository {
  async getAllFilialen() {
    const { data } = await Api.get("/filialen");
    return data;
  }

  async getAllMededelingen() {
    const { data } = await Api.get("/mededelingen");
    return data;
  }

  async updateMededeling(mededeling) {
    return Api.put("/mededelingen", {
      id: mededeling.id,
      body: mededeling.body,
    });
  }

  async createMededeling(filiaalId, body) {
    return Api.post("/mededelingen", { filiaalId: filiaalId, body: body });
  }
}
