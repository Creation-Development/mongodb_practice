import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './Components/HomePage';
import SignUp from './Components/RegistrationForm';
import AllUsers from './Components/AllUsers';
import UpdateForm from './Components/UpdateForm';
import EnhancedTable from './Components/TablePagination';
import AddProduct from './Components/products/AddProducts';
import AllProducts from './Components/products/AllProducts';
import ProductDetail from './Components/products/ProductDetail';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/add-user" element={<SignUp />} />
          <Route exact path="/all-user" element={<AllUsers />} />
          <Route exact path="/update-user/:index/:id" element={<UpdateForm />} />
          <Route exact path='/product/add' element={<AddProduct />} />
          <Route exact path='/product/all' element={<AllProducts />} />
          <Route exact path='/product/view/:id' element={<ProductDetail />} />
        </Routes>
      </BrowserRouter>
      {/* <EnhancedTable/> */}
    </>
  );
}

export default App;
