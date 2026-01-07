import { createBrowserRouter } from "react-router-dom";
import ARPage from "./src/ar-page";
import Homepage from "./src/homepage";

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
