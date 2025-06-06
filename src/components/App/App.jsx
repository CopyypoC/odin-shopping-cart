import { Outlet } from "react-router-dom";
import { Navbar } from "../Navbar/Navbar.jsx";
import styles from "./App.module.css";

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet className={styles.outlet} />
      </main>
    </>
  );
}

export default App;
