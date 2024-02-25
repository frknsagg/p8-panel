import { ReactElement, useCallback, useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import TableHOC from "../components/TableHOC";
import { Column } from "react-table";
import { Link, Navigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { Dropdown, DropdownMenu } from "react-bootstrap";
import BrandService from "../services/BrandService";
import { BrandModel } from "../models/responses/BrandModel";

interface DataType {
  id:number;
  name: string;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  
  {
    Header: "Araç Modeli",
    accessor: "name",
  },
  {
    Header: "İşlemler",
    accessor: "action",
  },
];



const Brands = () => {
  let service: BrandService = new BrandService();
  
  const handleEditClick = (brandId: number) => () => {
    // EditBrand sayfasına yönlendir ve ID'yi gönder
    <Navigate to= "/p8-admin/brands/edit/${brandId}" replace={true} />
  };

  const handleDeleteClick = async (brandId: number) => {
    const userConfirmed = window.confirm("Bu aracı silmek istediğinize emin misiniz?");
  
    if (userConfirmed) {
      try {
        // Delete işlemleri
        const response = await service.deleteById(brandId);
        console.log(`Car with ID ${brandId} deleted successfully.`, response);

        alert("Marka Başarıyla Silindi.!!")
  
        // Silme işlemi başarılı olduktan sonra verileri tekrar çek ve state'i güncelle
      
      } catch (error) {
        console.error(`Error deleting car with ID ${brandId}:`, error);
      }
      finally{
        fetchBrands();
        console.log("Silme işlemi başarılı");
      }
    } else {
      console.log(`Silme işlemi iptal edildi.`);
    }
  };
  
  
  
  const [data, setData] = useState<DataType[]>([]);

  const fetchBrands = async () => {
    try {
      
      const response = await service.getAll();
      if (Array.isArray(response.data.data)) {
        const formattedProducts: DataType[] = response.data.data.map((brand: BrandModel) => ({
          id:brand.id,
          name: brand.name,
          action: (
            <Dropdown className="btn btn-success">
              <Dropdown.Toggle variant="success" id={`dropdown-${brand.id}`}>
                Yönet
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to={`/admin/product/${brand.id}`}>
                  Detaylarını İncele
                </Dropdown.Item>
                <Dropdown.Item  as={Link} to={`/p8-admin/brands/edit/${brand.id}`}>Düzenle</Dropdown.Item>
                <Dropdown.Item onClick={() => handleDeleteClick(brand.id)}>Sil</Dropdown.Item>

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
    fetchBrands();
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
      <Link to="/p8-admin/brands/new" className="create-product-btn">
        <FaPlus />
      </Link>
    </div>
  );
};

export default Brands;
