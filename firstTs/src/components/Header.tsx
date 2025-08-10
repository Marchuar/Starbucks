import {Link} from "react-router-dom";
import StarbucksLogo from "../assets/StarbucksLogo.png"
import locationLogo from "../assets/locationLogo.png"
import classes from "../styles/header.module.css"
import {useLocation} from "react-router-dom";
import * as React from "react";
import type {UserProps} from "../interfaces/AppPropsInterface.tsx";

const Header: React.FC<UserProps> = ({token, mainUserName, mode}) => {
    const location = useLocation()

    return (
        <div className={classes.mainCon}>
            <div className={classes.navCon}>
                <Link to="/" className={classes.logoLink}>
                    <img src={StarbucksLogo} alt={"starbucks logo"} width={"50px"}></img>
                </Link>

                <div className={location.pathname.startsWith("/menu") ? classes.navItemUnderline : classes.navItemBox}>
                    <Link to="/menu" className={classes.link}>
                        <p>Menu</p>
                    </Link>
                </div>

                <div className={location.pathname === "/rewards" ? classes.navItemUnderline : classes.navItemBox}>
                    <Link to="/rewards" className={classes.link}>
                        <p>Rewards</p>
                    </Link>
                </div>

                <div className={location.pathname === "/gift-cards" ? classes.navItemUnderline : classes.navItemBox}>
                    <Link to="/gift-cards" className={classes.link}>
                        <p>Gift Cards</p>
                    </Link>
                </div>
            </div>

            <div className={classes.secondNavCon}>
                <div className={location.pathname === "/store-location" ? classes.navItemUnderline : classes.navItemBox}>
                    <img src={locationLogo} alt="location logo" className={classes.locationLogo}></img>
                    <Link to="/store-location" className={classes.link}>
                        <p className={classes.findStoreText}>Find a store</p>
                    </Link>
                </div>
                {mode === "admin" ? <p className={classes.userName}>Hello Admin!</p> : token === "" ?
                    <>
                        <Link to="/login" className={classes.linkButton}>
                            <button className={classes.loginButton}>Sign in</button>
                        </Link>

                        <Link to="/register" className={classes.linkButton}>
                            <button className={classes.registerButton}>Join now</button>
                        </Link>
                    </>

                : <p className={classes.userName}>{mainUserName !== "" && mainUserName !== null && mainUserName !== undefined ? "Hello " + mainUserName + "!" : "Unknown Person (Error)"}</p>}
            </div>
        </div>
    )
}

export default Header