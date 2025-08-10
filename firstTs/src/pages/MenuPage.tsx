import {Outlet} from "react-router-dom";
import classes from "../styles/menu.module.css"
import MenuBar from "../components/Menu/MenuBar.tsx";


function MenuPage() {

    return (
        <div className={classes.mainCon}>
            <h1 className={classes.mainTitle}>Our Menu</h1>

            <MenuBar></MenuBar>

            {/* ✅ This is required to show nested route content */}
            <Outlet />
        </div>
    )
}

export default MenuPage