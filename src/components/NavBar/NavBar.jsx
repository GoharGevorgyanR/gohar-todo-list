
import { memo } from "react";
import { NavLink } from "react-router-dom";
import styles from './navBar.module.css';
// import {useSelector} from 'react-redux';



const activeLinkClassName = ({ isActive }) => {
  const classes = ['nav-link'];
  if (isActive) {
    classes.push(styles.active);
  }
  return classes.join(' ');
};

function NavBar() {
  // const count  = useSelector((store)=>store.counter.value);
  return (

    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <NavLink to="/" className={activeLinkClassName}>Todo</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to="/about" className={activeLinkClassName}>About</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/contact" className={activeLinkClassName}>Contact us</NavLink>
              {/* <h3> Counte: {count}</h3> */}
            </li>

          </ul>
        </div>
      </div>
    </nav>

  );
}
export default memo(NavBar);