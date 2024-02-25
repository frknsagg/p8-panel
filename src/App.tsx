import { BrowserRouter as Router, Routes, Route, Link, useNavigate, Navigate } from "react-router-dom";
import { Suspense, lazy, useContext } from "react";
import Loader from "./components/Loader";
import Login from "./pages/auth/Login";
import { AuthContext } from "./contexts/AuthContext";
import EditBrand from "./pages/management/EditBrand";
import EditCar from "./pages/management/EditCar";
import Colors from "./pages/Colors";
import Models from "./pages/Models";
import EditModel from "./pages/management/EditModel";
import NewModel from "./pages/management/NewModel";
import Users from "./pages/Users";


const Dashboard = lazy(() => import("./pages/Dashboard"));
const Products = lazy(() => import("./pages/Products"));
const Transaction = lazy(() => import("./pages/Transaction"));
const Customers = lazy(() => import("./pages/Customers"));
const NewProduct = lazy(() => import("./pages/management/NewProduct"));
const Brand = lazy(() => import("./pages/Brands"));
const NewBrand = lazy(() => import("./pages/management/NewBrand"));
const ProductManagement = lazy(
  () => import("./pages/management/ProductManagement")
);
const TransactionManagement = lazy(
  () => import("./pages/management/TransactionManagement")
);
const Coupon = lazy(() => import("./pages/apps/Coupon"));
const Toss = lazy(() => import("./pages/apps/Toss"));

const App = () => {
  const authContext: any = useContext(AuthContext);

  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route
            path="/"
            element={
              authContext.isAuthenticated ? (
                <Navigate to="/p8-admin/dashboard" replace={true} />
              ) : (
                <Navigate to="/p8-admin/auth/login" replace={true} />
              )
            }
          />
  
          <Route path="/p8-admin/dashboard" element={<Dashboard />} />
          <Route path="/p8-admin/cars" element={<Products />} />
          <Route path="/p8-admin/cars/new" element={<NewProduct />} />
          <Route path="/p8-admin/cars/edit/:id" element={<EditCar />} />
          <Route path="/p8-admin/brands/new" element={<NewBrand />} />
          <Route path="/p8-admin/brands/edit/:id" element={<EditBrand />} />
          <Route path="/p8-admin/brands/" element={<Brand />} />
          <Route path="/p8-admin/models/" element={<Models/>} />
          <Route path="/p8-admin/models/new" element={<NewModel/>} />
          <Route path="/p8-admin/models/edit/:id" element={<EditModel/>} />
          <Route path="/p8-admin/users/" element={<Users/>} />
          <Route path="/p8-admin/customer" element={<Customers />} />
          <Route path="/p8-admin/transaction" element={<Transaction />} />
          <Route path="/p8-admin/auth/login" element={<Login />} />
  
          {/* ... diğer rotalar ... */}
          
        </Routes>
      </Suspense>
    </Router>
  );
  
};

export default App;
