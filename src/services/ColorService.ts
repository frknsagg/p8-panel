import axios, { AxiosResponse } from 'axios';

import { BrandModel } from '../models/responses/BrandModel';
import { ColorModel } from '../models/responses/ColorModel';

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
  async deleteById(id: number): Promise<AxiosResponse<{ data: ColorModel }>> {
    try {
      const response = await axios.delete<{ data: ColorModel }>(`http://localhost:8080/api/colors/${id}`);
      return response;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }
}

export default ColorService;