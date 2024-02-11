import axios, { AxiosResponse } from 'axios';

import { BrandModel } from '../models/responses/BrandModel';

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
}

export default BrandService;