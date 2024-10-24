import { RouterProvider, createRouter } from "@tanstack/react-router";
import ReactDOM from "react-dom/client";
import { ServicesProvider } from "../core/services";

import "./styles.css";
import "normalize.css";
import "antd/dist/reset.css";

import "reflect-metadata";
import { routeTree } from "../routeTree.gen.ts";

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
const rootElement = document.getElementById("root");

if (rootElement) {
  if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <ServicesProvider>
        <RouterProvider router={router} />
      </ServicesProvider>,
    );
  }
} else {
  console.error("Root element not found");
}
