import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

export function Navbar() {
  return (
    <nav className={styles.navBar} data-testid="Navbar">
      <ul className={styles.navContainer}>
        <div className={styles.navLeft}>
          <li>
            <Link to="/" className={styles.link}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/shop" className={styles.link}>
              Shop
            </Link>
          </li>
        </div>
        <li className={styles.cart}>
          <Link to="/cart" className={styles.link}>
            Cart
          </Link>
        </li>
      </ul>
    </nav>
  );
}
