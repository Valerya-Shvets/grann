import { Main } from "./pages/Main";
import { Admin } from "./pages/Admin/Admin";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Chef } from "./pages/Chef/Chef";
import { Login } from "./pages/Login";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { AuthProvider } from "./context/AuthContext";
import { MainChef } from "./pages/Chef/MainChef";
import { OrderDetailsChef } from "./pages/Chef/OrderDetailsChef";
import { OrdersChef } from "./pages/Chef/OrdersChef";
import { PrivateChef } from "./pages/Chef/PrivateChef";
import { SettingsChef } from "./pages/Chef/SettingsChef";
import Auth from "./components/Auth";
import { MainPage } from "./pages/Admin/MainPage";
import { CatalogPage } from "./pages/Admin/CatalogPage";
import { ChefsPage } from "./pages/Admin/ChefsPage";
import { SettingsPage } from "./pages/Admin/SettingsPage";
import { OrdersPage } from "./pages/Admin/OrdersPage";
import { ChangeProductPage } from "./pages/Admin/ChangeProductPage";

function App() {
  return (
    <>
      <Provider store={store}>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/*" element={<Main />} />

              <Route element={<Auth allowedRoles={["Admin"]} />}>
                <Route path="/admin" element={<MainPage />} />
                <Route path="/products" element={<CatalogPage />} />
                <Route path="/chefs" element={<ChefsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/products/:id" element={<ChangeProductPage />} />
              </Route>

              <Route element={<Auth allowedRoles={["Chef"]} />}>
                <Route path="/chef" element={<MainChef />} />
                <Route path="/chef-password" element={<SettingsChef />} />
                <Route path="/chef-private" element={<PrivateChef />} />
                <Route path="/chef-orders" element={<OrdersChef />} />
                <Route path="/chef-orders/:id" element={<OrderDetailsChef />} />
              </Route>
            </Routes>
          </BrowserRouter>
          {/* <>
            <Admin />
          </>

          <>
            <Chef />
          </>

          <>
            <Main />
          </> */}
        </AuthProvider>
      </Provider>
    </>
  );
}

export default App;
