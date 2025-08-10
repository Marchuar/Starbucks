import {Link, useLocation} from "react-router-dom";
import classes from "../../styles/menu/menuBar.module.css"

const MenuBar = () => {
    const location = useLocation()

    return (
        <div className={classes.mainCon}>
            <nav className={classes.navCon}>
                <Link to="drinks" className={location.pathname === "/menu/drinks" ? classes.navTextActive : classes.navText}>Drinks</Link> | <Link to="food" className={location.pathname === "/menu/food" ? classes.navTextActive : classes.navText}>Food</Link> | <Link to="to-go" className={location.pathname === "/menu/to-go" ? classes.navTextActive : classes.navText}>To Go</Link>
            </nav>
        </div>
    );
};

export default MenuBar;