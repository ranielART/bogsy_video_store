import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Navigate,
} from "react-router-dom";

import RedirectToHome from "./pages/RedirectToHome";
import MainLayout from "./layouts/MainLayout";
import Customers from "./pages/Customers";
import Videos from "./pages/Videos";
import Rentals from "./pages/Rentals";
import Reports from "./pages/Report";
import Returned from "./pages/Returned";
import Rent from "./pages/Rent";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Navigate to="/customers" replace />} />

      <Route path="/customers" element={<Customers />} />
      <Route path="/videos" element={<Videos />} />
      <Route path="/rentals" element={<Rentals />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/returned" element={<Returned />} />
      <Route path="/rent/:id" element={<Rent />} />

      <Route path="*" element={<RedirectToHome />} />
    </Route>
  )
);

function App() {
  return (
    <div className="relative">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
