import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import HomePage from './Components/HomePage';
import SignUp from './Components/RegistrationForm';
import AllUsers from './Components/AllUsers';
import UpdateForm from './Components/UpdateForm';

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<HomePage/>} />
        <Route exact path="/add-user" element={<SignUp/>} />
        <Route exact path="/all-user" element={<AllUsers/>} />
        <Route exact path="/update-user/:index/:id" element={<UpdateForm/>} />
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
