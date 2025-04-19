import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router";
import Index from "./Pages/Index/Index";
import HomePage from "./Pages/HomePage/HomePage";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />}>
            <Route path="/" element={<HomePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
