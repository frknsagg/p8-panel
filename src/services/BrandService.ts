import axios, { AxiosResponse } from 'axios';

import { BrandModel } from '../models/responses/BrandModel';
import { BrandModelAdd } from '../models/requests/BrandModelAdd';

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
}

export default BrandService;