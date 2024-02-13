import axios, { AxiosResponse } from "axios";

import { Model } from "../models/responses/Model";

class ModelService {
  async getByBrandId(id: number): Promise<AxiosResponse<{ data: Model[] }>> {
    try {
      const response = await axios.get<{ data: Model[] }>(
        `http://localhost:8080/api/models/getByBrandId/${id}`
      );
      return response;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }
}

export default ModelService;
