import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "@/assets/custom/bootstrap.custom.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import {
  HomePage,
  ProductPage,
  CartPage,
  ErrorPage,
  LoginPage,
  RegisterPage,
  ShippingPage,
  ProtectedRoute,
  PaymentPage,
  OrderPage,
  OrderSummaryPage,
} from "@/pages/index.ts";

const queryClient = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<ErrorPage />}>
      <Route path="/" element={<HomePage />} index={true} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/signin" element={<LoginPage />} />
      <Route path="/signup" element={<RegisterPage />} />
      <Route path="" element={<ProtectedRoute />}>
        <Route path="/shipping" element={<ShippingPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/placeorder" element={<OrderPage />} />
        <Route path="/order/:order_id" element={<OrderSummaryPage />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <PayPalScriptProvider options={{ clientId: "test" }} deferLoading={true}>
        <Toaster position="top-right" offset={70} duration={500} richColors />
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </PayPalScriptProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
