export interface CarModel {
 
    id: number;
    dailyPrice: number;
    kilometer: number;
    imagePath: string;
    plate: string;
    year: number;
    carState:string;
    modelResponse: {
      id: number;
      name: string;
    };
    colorResponse: {
      id: number;
      name: string;
    };

}
