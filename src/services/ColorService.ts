import axios, { AxiosResponse } from 'axios';

import { BrandModel } from '../models/responses/BrandModel';

class ColorService {
  async getAll(): Promise<AxiosResponse<any>> {
    try {
      const response = await axios.get<any>('http://localhost:8080/api/colors/getAll');
      return response;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; 
    }
  }
}

export default ColorService;