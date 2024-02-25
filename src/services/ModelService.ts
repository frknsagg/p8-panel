import axios, { AxiosResponse } from "axios";

import { Model } from "../models/responses/Model";
import { ModelUpdate } from "../models/requests/ModelUpdate";
import { ModelAdd } from "../models/requests/ModelAdd";

class ModelService {

  async getAll(): Promise<AxiosResponse<any>> {
    try {
      const response = await axios.get<any>('http://localhost:8080/api/models/getAll');
      return response;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; 
    }
  }
  async getById(id: number): Promise<AxiosResponse<{ data: Model }>> {
    try {
      const response = await axios.get<{ data: Model }>(`http://localhost:8080/api/models/${id}`);
      return response;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }
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
  async deleteById(id: number): Promise<AxiosResponse<{ data: Model }>> {
    try {
      const response = await axios.delete<{ data: Model }>(`http://localhost:8080/api/models/${id}`);
      return response;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }
  async add(modelData: ModelAdd): Promise<AxiosResponse<{ data: ModelAdd }>> {
    try {
      const response = await axios.post<{ data: ModelAdd }>(
        "http://localhost:8080/api/models/add",
        JSON.stringify(modelData),
        {
          headers: {
            "Content-Type": "application/json", 
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Error adding car:", error);
      throw error;
    }
  }
  async update(brandData: ModelUpdate): Promise<AxiosResponse<{ data: ModelUpdate }>> {
    try {
      const response = await axios.put<{ data: ModelUpdate }>(
        "http://localhost:8080/api/models/update",
        JSON.stringify(brandData),
        {
          headers: {
            "Content-Type": "application/json", 
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Error adding car:", error);
      throw error;
    }
  }
}

export default ModelService;
