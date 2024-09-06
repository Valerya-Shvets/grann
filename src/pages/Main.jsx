import { Catalog } from "./Catalog";
import { Product } from "./Product";
import { OrderProduct } from "./OrderProduct";
import { Home } from "./Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./Login";
import { LoginChef } from "./Chef/LoginChef";

function Main() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/order" element={<OrderProduct />} />
      <Route path="/login" element={<Login />} />
      <Route path="/login-chef" element={<LoginChef />} />
    </Routes>
  );
  <>
    {/* <BrowserRouter> */}

    {/* </BrowserRouter> */}
  </>;
}

export { Main };
