

// import './App.css';
// import Navbar from './Components/Navbar/Navbar';
// import Shop from './Pages/Shop';
// import Shopcategory from './Pages/Shopcategory';
// import Product from './Pages/Product';
// import Cart from './Pages/Cart';
// import LoginSignup from './Pages/LoginSignup';
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Footer from './Components/Footer/Footer'
// import men_banner from './Components/Assets/banner_mens.png'
// import women_banner from './Components/Assets/banner_women.png'
// import kid_banner from './Components/Assets/banner_kids.png'
// import ShopcontextProvider from './Context/Shopcontext';
// function App() {
//   return (
//     <div>
//       <Router>
//         {/* <ShopcontextProvider> */}
//           <Navbar />
        
//         <Routes>
//           <Route exact path="/" element={<Shop/>} />
//           <Route exact path="/men" element={<ShopcontextProvider><Shopcategory banner={men_banner} category="men" /></ShopcontextProvider>} />
//           <Route exact path="/women" element={<ShopcontextProvider><Shopcategory banner={women_banner} category="women" /></ShopcontextProvider>} />
//           <Route exact path="/kids" element={<ShopcontextProvider><Shopcategory banner={kid_banner} category="kid" /></ShopcontextProvider>} />
//           <Route exact path="/product/:productID" element={<ShopcontextProvider><Product /></ShopcontextProvider>} />
//           <Route exact path="/cart" element={<ShopcontextProvider><Cart /></ShopcontextProvider>} />
//           <Route exact path="/login" element={<LoginSignup />} />
//         </Routes>
//         <Footer/>
//         {/* </ShopcontextProvider> */}
//       </Router>
//     </div>
//   );
// }

// export default App;

import './App.css';
import { useState } from 'react';
import Donate from './Components/Donate/Donate';
import Navbar from './Components/Navbar/Navbar';
import Shop from './Pages/Shop';
import Shopcategory from './Pages/Shopcategory';
import Product from './Pages/Product';
import Donation from './Pages/Donation';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from './Components/Footer/Footer';
import men_banner from './Components/Assets/banner_mens.png';
import women_banner from './Components/Assets/banner_women.png';
import kid_banner from './Components/Assets/banner_kids.png';
import ShopcontextProvider from './Context/Shopcontext';
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min";


function App() {
  const [isBarVisible, setIsBarVisible] = useState(true); 
  return (
    <ShopcontextProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* The Routes component is a container for multiple Route components.  */}
          {/* Routes ensures only the most relevant route is rendered for the current URL. */}
          {/* They allow developers to define paths (URLs) and specify which components should render for each path. */}
          <Route exact path="/" element={<Shop />} />
          <Route exact path="/men" element={<Shopcategory banner={men_banner} category="men" />} />
          <Route exact path="/women" element={<Shopcategory banner={women_banner} category="women" />} />
          <Route exact path="/kids" element={<Shopcategory banner={kid_banner} category="kid" />} />
          <Route exact path="/product/:productID" element={<Product />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/login" element={<LoginSignup />} />
          <Route exact path="/donation" element={<Donation/>}/>
        </Routes>
        <Donate isBarVisible={isBarVisible} setIsBarVisible={setIsBarVisible} /> {/* Pass state as prop */}
        <Footer />
      </Router>
    </ShopcontextProvider>
  );
}

export default App;
