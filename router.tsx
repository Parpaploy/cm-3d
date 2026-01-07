import { createBrowserRouter } from "react-router-dom";
import ARPage from "./src/ar-page";
import Homepage from "./src/homepage";
import HittestARPage from "./src/hittest-ar-page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/ar",
    element: <ARPage />,
  },
  {
    path: "/hittest-ar",
    element: <HittestARPage />,
  },
]);
