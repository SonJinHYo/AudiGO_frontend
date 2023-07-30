import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import Home from "./routes/Home";
import KakaoConfirm from "./routes/KakaoConfirm";
import NotFound from "./routes/Notfound";
import CreateScript from "./routes/CreateScript";
import MyScripts from "./routes/MyScripts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "social",
        children: [
          {
            path: "kakao",
            element: <KakaoConfirm />,
          },
        ],
      },
      {
        path: "users",
        children: [
          {
            path: "me",
            element: <MyScripts />,
          },
        ],
      },
      {
        path: "scripts",
        children: [
          {
            path: "create",
            element: <CreateScript />,
          },
        ],
      },
    ],
  },
]);

export default router;
