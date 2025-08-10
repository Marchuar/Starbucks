import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import type {Product} from "../../interfaces/menu/ProductInterface.tsx";
//must be drink interface
import FlatWhiteImg from "../../assets/MenuProducts/FlatWhite.webp"
import CappuccinoImg from "../../assets/MenuProducts/Cappuccino.webp"
import LatteImg from "../../assets/MenuProducts/LatteMacchiato.webp"
import classes from "../../styles/menu/drinks.module.css"



const DrinksNav = () => {
    const [drinksList, setDrinksList] = useState<Product[]>([]);

    //get drinks from db
    useEffect(() => {
        //must be Array<DrinkInterface>
        setDrinksList(getDrinksList());
    }, [])

    const getDrinksList = () => {
        return [{
            productName: "Flat White",
            productImg: FlatWhiteImg,
        }, {
            productName: "Cappuccino",
            productImg: CappuccinoImg,
        }, {
            productName: "Latte",
            productImg: LatteImg,
        }, {
            productName: "Flat White",
            productImg: FlatWhiteImg,
        }, {
            productName: "Cappuccino",
            productImg: CappuccinoImg,
        }, {
            productName: "Latte",
            productImg: LatteImg,
        }, {
            productName: "Flat White",
            productImg: FlatWhiteImg,
        }, {
            productName: "Cappuccino",
            productImg: CappuccinoImg,
        }, {
            productName: "Latte",
            productImg: LatteImg,
        }]
    }

    return (
        <>
            <h2>Drinks</h2>

            <div className={classes.allDrinksCon}>
                {drinksList.map((drink) => (
                    <Link to="/menu/drinks">
                        <div className={classes.prodCon}>
                            <img src={drink.productImg} alt="Flat White Coffee" className={classes.prodImg}></img>
                            <p className={classes.prodText}>{drink.productName}</p>
                        </div>
                    </Link>

                ))}
            </div>

        </>
    );
};

export default DrinksNav;