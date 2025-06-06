import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router";
import Index from "./Pages/Index/Index";
import HomePage from "./Pages/HomePage/HomePage";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import { Toaster } from "react-hot-toast";
import AuthWrapper from "./Components/AuthWrapper/AuthWrapper";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <AuthWrapper>
          <Routes>
            <Route path="/" element={<Index />}>
              <Route path="/" element={<HomePage />} />
            </Route>

            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
          </Routes>
        </AuthWrapper>
      </BrowserRouter>

      <Toaster />
    </>
  );
}
