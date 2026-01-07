import { createBrowserRouter } from "react-router-dom";
import Homepage from "./src/homepage";
import ARPage from "./src/ar-page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/ar",
    element: <ARPage />,
  },
]);
