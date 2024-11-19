import { RouterProvider } from "react-router-dom";
import "./css/App.css";
import router from "./router/app.router";

function App() {
  return (
    <main>
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
