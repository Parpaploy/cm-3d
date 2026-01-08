import { createBrowserRouter } from "react-router-dom";
import Homepage from "./src/homepage";
import ARMode from "./src/ar-mode";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/ar",
    element: <ARMode />,
  },
]);
