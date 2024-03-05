import './App.css';
import Header from './Components/Header';
import AddBlog from './Components/AddBlog';
import UpdateBlog from './Components/UpdateBlog';
import Home from './Components/Home';
import {BrowserRouter as Router, Route, Routes, Switch} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          
          <Route path="/add" element={<AddBlog />} />
          <Route path="/getall" element={<Home />} />
          <Route path="/update/:id" element={<UpdateBlog />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
