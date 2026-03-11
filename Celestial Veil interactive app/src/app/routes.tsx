import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { Tools } from "./pages/Tools";
import { Journeys } from "./pages/Journeys";
import { Oracle } from "./pages/Oracle";
import { Library } from "./pages/Library";
import { Profile } from "./pages/Profile";
import { Layout } from "./components/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "tools", Component: Tools },
      { path: "journeys", Component: Journeys },
      { path: "oracle", Component: Oracle },
      { path: "library", Component: Library },
      { path: "profile", Component: Profile },
    ],
  },
]);
