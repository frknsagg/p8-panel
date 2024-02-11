import { ReactElement, useCallback, useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import TableHOC from "../components/TableHOC";
import { Column } from "react-table";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { CarModel } from "../models/responses/CarModel";
import CarService from "../services/CarService";
import { Dropdown, DropdownMenu } from "react-bootstrap";

interface DataType {
  id:number;
  photo: ReactElement;
  name: string;
  price: number;
  stock: number;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "Foto",
    accessor: "photo",
  },
  {
    Header: "Araç Modeli",
    accessor: "name",
  },
  {
    Header: "Fiyat",
    accessor: "price",
  },
  {
    Header: "Kilometre",
    accessor: "stock",
  },
  {
    Header: "İşlemler",
    accessor: "action",
  },
];

const img =
  "https://imageio.forbes.com/specials-images/imageserve/5d35eacaf1176b0008974b54/0x0.jpg?format=jpg&crop=4560,2565,x790,y784,safe&height=900&width=1600&fit=bounds";



const Products = () => {
  let service: CarService = new CarService();
  const handleEditClick = (carId : number) => () => {
    // Edit işlemleri
    console.log(`Edit car with ID: ${carId}`);
  };
  

  const handleDeleteClick = async (carId: number) => {
    const userConfirmed = window.confirm("Bu aracı silmek istediğinize emin misiniz?");
  
    if (userConfirmed) {
      try {
        // Delete işlemleri
        const response = await service.deleteById(carId);
        console.log(`Car with ID ${carId} deleted successfully.`, response);
  
        // Silme işlemi başarılı olduktan sonra verileri tekrar çek ve state'i güncelle
      
      } catch (error) {
        console.error(`Error deleting car with ID ${carId}:`, error);
      }
      finally{
        fetchProducts();
        console.log("Silme işlemi başarılı");
      }
    } else {
      console.log(`Silme işlemi iptal edildi.`);
    }
  };
  
  
  
  const [data, setData] = useState<DataType[]>([]);

  const fetchProducts = async () => {
    try {
      
      const response = await service.getAll();
      if (Array.isArray(response.data.data)) {
        const formattedProducts: DataType[] = response.data.data.map((car: CarModel) => ({
          id:car.id,
          photo: <img src={img} alt="Shoes" />,
          name: car.modelResponse.name,
          price: car.daily_price,
          stock: car.kilometer,
          action: (
            <Dropdown className="btn btn-success">
              <Dropdown.Toggle variant="success" id={`dropdown-${car.id}`}>
                Yönet
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to={`/admin/product/${car.id}`}>
                  Detaylarını İncele
                </Dropdown.Item>
                <Dropdown.Item onClick={handleEditClick(car.id)}>Düzenle</Dropdown.Item>
                <Dropdown.Item onClick={() => handleDeleteClick(car.id)}>Sil</Dropdown.Item>

              </Dropdown.Menu>
            </Dropdown>
          ),
        }));
        setData(formattedProducts);
      } else {
        console.error("Hatalı veri formatı");
      }
    } catch (error) {
      console.error("Fetch işlemi sırasında bir hata oluştu:", error);
    }
  };
  
  
  useEffect(() => {
    fetchProducts();
  }, []);
  
  
  const Table = useCallback(
    TableHOC<DataType>(
      columns,
      data,
      "dashboard-product-box",
      "Araçlar",
      true
    ),
    [data]
  );
  
  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>{Table()}</main>
      <Link to="/p8-admin/cars/new" className="create-product-btn">
        <FaPlus />
      </Link>
    </div>
  );
};

export default Products;
