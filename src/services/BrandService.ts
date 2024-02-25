import axios, { AxiosResponse } from 'axios';

import { BrandModel } from '../models/responses/BrandModel';
import { BrandModelAdd } from '../models/requests/BrandModelAdd';
import { BrandModelUpdate } from '../models/requests/BrandModelUpdate';

class BrandService {
  async getAll(): Promise<AxiosResponse<any>> {
    try {
      const response = await axios.get<any>('http://localhost:8080/api/brands/getAll');
      return response;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; 
    }
  }
  async getById(id: number): Promise<AxiosResponse<{ data: BrandModel }>> {
    try {
      const response = await axios.get<{ data: BrandModel }>(`http://localhost:8080/api/brands/${id}`);
      return response;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  async deleteById(id: number): Promise<AxiosResponse<{ data: BrandModel }>> {
    try {
      const response = await axios.delete<{ data: BrandModel }>(`http://localhost:8080/api/brands/${id}`);
      return response;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }
  async add(brandData: BrandModelAdd): Promise<AxiosResponse<{ data: BrandModelAdd }>> {
    try {
      const response = await axios.post<{ data: BrandModelAdd }>(
        "http://localhost:8080/api/brands/add",
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
  async update(brandData: BrandModelUpdate): Promise<AxiosResponse<{ data: BrandModelUpdate }>> {
    try {
      const response = await axios.put<{ data: BrandModelUpdate }>(
        "http://localhost:8080/api/brands/update",
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

export default BrandService;