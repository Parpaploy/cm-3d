import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "../router";
import "../i18n";

createRoot(document.getElementById("root")!).render(
  <Suspense fallback={<div>Loading...</div>}>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </Suspense>
);
