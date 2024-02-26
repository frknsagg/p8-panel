import axios, { AxiosResponse } from 'axios';
import { CarModel } from '../models/responses/CarModel';
import { CarModelAdd } from '../models/requests/CarModelAdd';
import { CarModelUpdate } from '../models/requests/CarModelUpdate';

class CarService {
  async getAll(): Promise<AxiosResponse<any>> {
    try {
      const response = await axios.get<any>('http://localhost:8080/api/cars/getAll');
      return response;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; 
    }
  }

  async getById(id: number): Promise<AxiosResponse<{ data: CarModel }>> {
    try {
      const response = await axios.get<{ data: CarModel }>(`http://localhost:8080/api/cars/${id}`);
      return response;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  async deleteById(id: number): Promise<AxiosResponse<{ data: CarModel }>> {
    try {
      const response = await axios.delete<{ data: CarModel }>(`http://localhost:8080/api/cars/${id}`);
      return response;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  async add(formData: FormData): Promise<AxiosResponse<{ data: CarModel }>> {
    try {
      const response = await axios.post<{ data: CarModel }>(
        'http://localhost:8080/api/cars/add',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data', // FormData olduğu için content type multipart/form-data olmalı
          },
        }
      );
      return response;
    } catch (error) {
      console.error('Error adding car:', error);
      throw error;
    }
  }
  async update(carData: CarModelUpdate): Promise<AxiosResponse<{ data: CarModelUpdate }>> {
    try {
      const response = await axios.put<{ data: CarModelUpdate }>(
        "http://localhost:8080/api/cars/update",
        JSON.stringify(carData),
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

export default CarService;
