import { RouterProvider } from "@tanstack/react-router";
import { BrowserRouter, Routes, Route } from "react-router";

import { useAuthStore } from "@store/auth";
import { Home } from "@routes/home";

export const App = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
    </Routes>
  );
};
