import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "../router";
import "../i18n";
import GlobalLoading from "../loading";

createRoot(document.getElementById("root")!).render(
  <Suspense fallback={<GlobalLoading />}>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </Suspense>
);
