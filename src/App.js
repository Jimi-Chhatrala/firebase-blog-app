import "./App.css";
import "./style.scss";
import "./media-query.css";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router-dom";
import Detail from "./pages/Detail";
import AddEditBlog from "./pages/AddEditBlog";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import Auth from "./pages/Auth";
import { auth } from "./firebase";

function App() {
  const [active, setActive] = useState("home");
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <div className="App">
      <Header setActive={setActive} active={active} user={user} />
      <ToastContainer position="top-center" />
      <Routes>
        <Route path="firebase-blog-app/" element={<Home />} />
        <Route path="firebase-blog-app/detail/:id" element={<Detail />} />
        <Route path="firebase-blog-app/create" element={<AddEditBlog />} />
        <Route path="firebase-blog-app/update/:id" element={<AddEditBlog />} />
        <Route path="firebase-blog-app/about" element={<About />} />
        <Route
          path="firebase-blog-app/auth"
          element={<Auth setActive={setActive} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
