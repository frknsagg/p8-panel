import { ReactElement, useCallback, useEffect, useState } from "react";
import { Column } from "react-table";
import { Link, Navigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { Dropdown } from "react-bootstrap";
import ModelService from "../services/ModelService";
import { Model } from "../models/responses/Model";
import TableHOC from "../components/TableHOC";
import AdminSidebar from "../components/AdminSidebar";


interface DataType {
  id:number;
  name: string;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  
  {
    Header: "Model Adı",
    accessor: "name",
  },
  {
    Header: "İşlemler",
    accessor: "action",
  },
];



const Models = () => {
  let service: ModelService = new ModelService();
  
  const handleEditClick = (modelId: number) => () => {
    <Navigate to= "/p8-admin/models/edit/${colordId}" replace={true} />
  };

  const handleDeleteClick = async (modelId: number) => {
    const userConfirmed = window.confirm("Bu modeli silmek istediğinize emin misiniz?");
  
    if (userConfirmed) {
      try {
        // Delete işlemleri
        const response = await service.deleteById(modelId);
        console.log(`Renk with ID ${modelId} deleted successfully.`, response);

        alert("Marka Başarıyla Silindi.!!")
  
        // Silme işlemi başarılı olduktan sonra verileri tekrar çek ve state'i güncelle
      
      } catch (error) {
        console.error(`Error deleting car with ID ${modelId}:`, error);
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
        const formattedProducts: DataType[] = response.data.data.map((model: Model) => ({
          id:model.id,
          name: model.name,
          action: (
            <Dropdown className="btn btn-success">
              <Dropdown.Toggle variant="success" id={`dropdown-${model.id}`}>
                Yönet
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to={`/admin/models/${model.id}`}>
                  Detaylarını İncele
                </Dropdown.Item>
                <Dropdown.Item  as={Link} to={`/p8-admin/models/edit/${model.id}`}>Düzenle</Dropdown.Item>
                <Dropdown.Item onClick={() => handleDeleteClick(model.id)}>Sil</Dropdown.Item>

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
      <AdminSidebar/>
      <main>{Table()}</main>
      <Link to="/p8-admin/models/new" className="create-product-btn">
        <FaPlus />
      </Link>
    </div>
  );
};

export default Models;
