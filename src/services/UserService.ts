import axios, { AxiosResponse } from "axios";
import { UserModel } from "../models/responses/UserModel";

class UserService{
    async getAll(): Promise<AxiosResponse<any>> {
        try {
          const response = await axios.get<any>('http://localhost:8080/api/users/getAll');
          return response;
        } catch (error) {
          console.error('Error fetching data:', error);
          throw error; 
        }
      }

      async getById(id: number): Promise<AxiosResponse<{ data: UserModel }>> {
        try {
          const response = await axios.get<{ data: UserModel }>(`http://localhost:8080/api/users/${id}`);
          return response;
        } catch (error) {
          console.error('Error fetching data:', error);
          throw error;
        }
      }
    
      async deleteById(id: number): Promise<AxiosResponse<{ data: UserModel }>> {
        try {
          const response = await axios.delete<{ data: UserModel }>(`http://localhost:8080/api/users/${id}`);
          return response;
        } catch (error) {
          console.error('Error fetching data:', error);
          throw error;
        }
      }
}

export default UserService;