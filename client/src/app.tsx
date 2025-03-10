import { RouterProvider } from "@tanstack/react-router";
import { BrowserRouter, Routes, Route } from "react-router";

import { useAuthStore } from "@store/auth";
import { Home } from "@routes/home";
import { Build } from "@routes/builds/build";
import { Builds } from "@routes/builds";

export const App = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="build">
        <Route element={<Builds />} index />
        <Route element={<Build />} path=":buildId" />
      </Route>
    </Routes>
  );
};
