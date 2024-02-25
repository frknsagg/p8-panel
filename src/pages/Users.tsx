import { ReactElement, useCallback, useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import TableHOC from "../components/TableHOC";
import { Column } from "react-table";
import { Link, Navigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { Dropdown, DropdownMenu } from "react-bootstrap";
import { BrandModel } from "../models/responses/BrandModel";
import UserService from "../services/UserService";
import { UserModel } from "../models/responses/UserModel";

interface DataType {
  id:number;
  name: string;
  email:string;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  
  {
    Header: "FullName",
    accessor: "name",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "İşlemler",
    accessor: "action",
  },
];



const Users = () => {
  let service: UserService = new UserService();
  
  const handleEditClick = (userId: number) => () => {
    // EditBrand sayfasına yönlendir ve ID'yi gönder
    <Navigate to= "/p8-admin/users/edit/${brandId}" replace={true} />
  };

  const handleDeleteClick = async (userId: number) => {
    const userConfirmed = window.confirm("Bu kullanıcıyı silmek istediğinize emin misiniz?");
  
    if (userConfirmed) {
      try {
        // Delete işlemleri
        const response = await service.deleteById(userId);
        console.log(`User with ID ${userId} deleted successfully.`, response);

        alert("Marka Başarıyla Silindi.!!")
  
        // Silme işlemi başarılı olduktan sonra verileri tekrar çek ve state'i güncelle
      
      } catch (error) {
        console.error(`Error deleting car with ID ${userId}:`, error);
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
        const formattedProducts: DataType[] = response.data.data.map((user: UserModel) => ({
          id:user.id,
          name: user.name + " " + user.surname,
          email:user.email,
          action: (
            <Dropdown className="btn btn-success">
              <Dropdown.Toggle variant="success" id={`dropdown-${user.id}`}>
                Yönet
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to={`/admin/users/${user.id}`}>
                  Detaylarını İncele
                </Dropdown.Item>
                <Dropdown.Item  as={Link} to={`/p8-admin/users/edit/${user.id}`}>Düzenle</Dropdown.Item>
                <Dropdown.Item onClick={() => handleDeleteClick(user.id)}>Sil</Dropdown.Item>

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
      <Link to="/p8-admin/users/new" className="create-product-btn">
        <FaPlus />
      </Link>
    </div>
  );
};

export default Users;
