import { ReactElement, useCallback, useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import TableHOC from "../components/TableHOC";
import { Column } from "react-table";
import { Link, Navigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { Dropdown } from "react-bootstrap";
import ColorService from "../services/ColorService";
import { ColorModel } from "../models/responses/ColorModel";

interface DataType {
  id:number;
  name: string;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  
  {
    Header: "Renk",
    accessor: "name",
  },
  {
    Header: "İşlemler",
    accessor: "action",
  },
];



const Colors = () => {
  let service: ColorService = new ColorService();
  
  const handleEditClick = (colorId: number) => () => {
    <Navigate to= "/p8-admin/colors/edit/${colordId}" replace={true} />
  };

  const handleDeleteClick = async (colorId: number) => {
    const userConfirmed = window.confirm("Bu aracı silmek istediğinize emin misiniz?");
  
    if (userConfirmed) {
      try {
        // Delete işlemleri
        const response = await service.deleteById(colorId);
        console.log(`Renk with ID ${colorId} deleted successfully.`, response);

        alert("Marka Başarıyla Silindi.!!")
  
        // Silme işlemi başarılı olduktan sonra verileri tekrar çek ve state'i güncelle
      
      } catch (error) {
        console.error(`Error deleting car with ID ${colorId}:`, error);
      }
      finally{
        fetchColors();
        console.log("Silme işlemi başarılı");
      }
    } else {
      console.log(`Silme işlemi iptal edildi.`);
    }
  };
  
  
  
  const [data, setData] = useState<DataType[]>([]);

  const fetchColors = async () => {
    try {
      
      const response = await service.getAll();
      if (Array.isArray(response.data.data)) {
        const formattedProducts: DataType[] = response.data.data.map((color: ColorModel) => ({
          id:color.id,
          name: color.name,
          action: (
            <Dropdown className="btn btn-success">
              <Dropdown.Toggle variant="success" id={`dropdown-${color.id}`}>
                Yönet
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to={`/admin/colors/${color.id}`}>
                  Detaylarını İncele
                </Dropdown.Item>
                <Dropdown.Item  as={Link} to={`/p8-admin/colors/edit/${color.id}`}>Düzenle</Dropdown.Item>
                <Dropdown.Item onClick={() => handleDeleteClick(color.id)}>Sil</Dropdown.Item>

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
    fetchColors();
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
      <Link to="/p8-admin/colors/new" className="create-product-btn">
        <FaPlus />
      </Link>
    </div>
  );
};

export default Colors;
