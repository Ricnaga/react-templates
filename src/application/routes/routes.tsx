import { Route, Routes } from "react-router-dom";
import { HomeScreen } from "../../screens/Home";
import { HOME } from "./paths";

export function RoutesPages() {
  return (
    <Routes>
      <Route path={HOME} element={<HomeScreen />} />
    </Routes>
  );
}
