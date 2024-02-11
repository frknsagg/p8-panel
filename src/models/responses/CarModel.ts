export interface CarModel {
 
    id: number;
    daily_price: number;
    kilometer: number;
    plate: string;
    year: number;
    modelResponse: {
      id: number;
      name: string;
    };
    colorResponse: {
      id: number;
      name: string;
    };

}
