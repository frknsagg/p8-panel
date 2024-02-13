import { BrowserRouter as Router, Routes, Route, Link, useNavigate, Navigate } from "react-router-dom";
import { Suspense, lazy, useContext } from "react";
import Loader from "./components/Loader";
import Login from "./pages/auth/Login";
import { AuthContext } from "./contexts/AuthContext";


const Dashboard = lazy(() => import("./pages/Dashboard"));
const Products = lazy(() => import("./pages/Products"));
const Transaction = lazy(() => import("./pages/Transaction"));
const Customers = lazy(() => import("./pages/Customers"));
const NewProduct = lazy(() => import("./pages/management/NewProduct"));
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
          <Route path="/p8-admin/brands/new" element={<NewBrand />} />
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
