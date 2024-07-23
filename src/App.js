import "./App.css";
import "./style.scss";
import "./media-query.css";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Detail from "./pages/Detail";
import AddEditBlog from "./pages/AddEditBlog";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import Auth from "./pages/Auth";
import { auth } from "./firebase";
import { signOut } from "firebase/auth";

function App() {
  const [active, setActive] = useState("home");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
  }, []);

  const handleLogout = () => {
    signOut(auth).then(() => {
      setUser(null);
      setActive("login");
      navigate("/firebase-blog-app/auth");
    });
  };

  return (
    <div className="App">
      <Header
        setActive={setActive}
        active={active}
        user={user}
        handleLogout={handleLogout}
      />
      <ToastContainer position="top-center" />
      <Routes>
        <Route path="firebase-blog-app/" element={<Home />} />
        <Route path="firebase-blog-app/detail/:id" element={<Detail />} />
        <Route
          path="firebase-blog-app/create"
          element={
            user?.uid ? (
              <AddEditBlog user={user} setActive={setActive} />
            ) : (
              <Navigate to={"/firebase-blog-app"} />
            )
          }
        />
        <Route
          path="firebase-blog-app/update/:id"
          element={
            user?.uid ? (
              <AddEditBlog user={user} setActive={setActive} />
            ) : (
              <Navigate to={"/firebase-blog-app"} />
            )
          }
        />
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
