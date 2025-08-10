import classes from "../styles/login.module.css";
import * as React from "react";
import {useEffect, useState} from "react";
import type {User, Login} from "../interfaces/UserInterface.tsx";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import type {UserProps} from "../interfaces/AppPropsInterface.tsx";

const LoginPage: React.FC<UserProps> = ({token, setToken, setMainUserName}: UserProps) => {
    //navigate init
    const navigate = useNavigate();

    //token check
    useEffect(() => {
        if (token !== "" && token !== null) {
            navigate("/");
        }

    }, [])


    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

    //error
    const [error, setError] = useState<boolean>(false);
    const [messageText, setMessageText] = useState<string>("");

    //form data
    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const showPassword = () => {
        if (passwordVisible) {
            setPasswordVisible(false);
        } else {
            setPasswordVisible(true);
        }
    }

    const onFormSubmit = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        e.preventDefault();

        //Email Validation
        const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        const emailValidation = expression.test(String(login).toLowerCase())

        if(!emailValidation) {
            setMessageText("Email is not correct!");
            return setError(true);
        }

        //User init
        const user: User<Login> = {
            userData: {
                userEmail: login,
            },
            userPassword: password
        }

        console.log(user)


        try {
            const response = await axios.post("http://172.20.10.4:8080/login-user", user)

            console.log(response);

            if (setToken) {
                setToken(response.data.token);
            }

            if (setMainUserName) {
                setMainUserName(response.data.userName);
            }

            setMessageText(response.data.message);

            // Only redirect after successful login
            navigate("/");
        }
        catch (error: any) {
            console.error("Login failed:", error);

            setError(true);
            setMessageText(error.message);
        }

        //reset Form
        setPasswordVisible(false);
        setPassword("");
        setLogin("");
    }

    return (
        <div className={classes.mainCon}>
            <div className={classes.loginCon}>
                <h2 className={classes.loginTitle}>Login</h2>


                <form className={classes.formCon}>
                    <div className={classes.inputCon}>
                        <input required placeholder="Email" className={classes.inputs} onChange={(e) => setLogin(e.target.value)} value={login}></input>
                        <input required placeholder="Password" className={classes.inputs} type={!passwordVisible ? "password" : "text"} onChange={e => setPassword(e.target.value)} value={password}></input>
                        <label className={classes.checkBox}><input type="checkbox" onInput={() => showPassword()}/> Show password</label>
                        <p className={classes.errorMessage} style={{color: error ? "red" : "green"}}>{messageText}</p>
                    </div>

                    <div className={classes.buttonCon}>
                        <button className={classes.loginButton} type="submit" onClick={(e) => onFormSubmit(e)}>Join now</button>
                    </div>
                </form>

            </div>
        </div>

    )
}

export default LoginPage