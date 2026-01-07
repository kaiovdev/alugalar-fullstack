import { createBrowserRouter } from "react-router-dom";
import { Login } from "./pages/Login/Login";
import { Home } from "./pages/Home/Home";
import { MyHouses } from "./pages/MyHouses/MyHouses";
import { NewHouse } from "./pages/NewHouse/NewHouse";
import { PrivateRoute } from "./services/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: (
      <PrivateRoute>
        <Home />
      </PrivateRoute>
    ),
  },
  {
    path: "/myhouses",
    element: (
      <PrivateRoute>
        <MyHouses />
      </PrivateRoute>
    ),
  },
  {
    path: "/newhouse",
    element: (
      <PrivateRoute>
        <NewHouse />
      </PrivateRoute>
    ),
  },
]);

export { router };
