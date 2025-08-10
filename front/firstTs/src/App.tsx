import classes from "./App.module.css"
import HomePage from "./pages/HomePage.tsx";
import MenuPage from "./pages/MenuPage.tsx";
import RewardsPage from "./pages/RewardsPage.tsx";
import GiftCardsPage from "./pages/GiftCardsPage.tsx";
import StoreLocationPage from "./pages/StoreLocationPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import Header from "./components/Header.tsx";
import { Routes, Route } from "react-router-dom";
import {useEffect, useState} from "react";
import DrinksNav from "./pages/MenuNav/DrinksNav.tsx";
import FoodNav from "./pages/MenuNav/FoodNav.tsx";
import ToGoNav from "./pages/MenuNav/ToGoNav.tsx";

function App() {
    //admin mode
    let mode: string = "default";

    const [token, setToken] = useState<string>("");
    const [mainUserName, setMainUserName] = useState<string>("");

    useEffect(() => {
        if(mode === "admin") {
            console.log("Hello Admin!");
            setToken("admin");
        }
    }, [])


    return (
      <div className={classes.mainAppCon}>
          <Header token={token} mainUserName={mainUserName} mode={mode} />
          <Routes>
              <Route path="/" element={<HomePage/>}></Route>

              <Route path="/menu" element={<MenuPage/>}>
                  <Route path="drinks" element={<DrinksNav/>}></Route>
                  <Route path="food" element={<FoodNav/>}></Route>
                  <Route path="to-go" element={<ToGoNav/>}></Route>
              </Route>

              <Route path="/rewards" element={<RewardsPage/>}></Route>
              <Route path="/gift-cards" element={<GiftCardsPage/>}></Route>
              <Route path="/store-location" element={<StoreLocationPage/>}></Route>
              <Route path="/login" element={<LoginPage token={token} setToken={setToken} setMainUserName={setMainUserName}/>}></Route>
              <Route path="/register" element={<RegisterPage token={token} setToken={setToken} setMainUserName={setMainUserName}/>}></Route>
          </Routes>
      </div>
    )
}

export default App
