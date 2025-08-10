import classes from "../styles/register.module.css"
import {useEffect, useState} from "react";
import * as React from "react";
import type {User, Register} from "../interfaces/UserInterface";
import axios from "axios";
import type {UserProps} from "../interfaces/AppPropsInterface.tsx";
import {useNavigate} from "react-router-dom";


const RegisterPage: React.FC<UserProps> = ({token, setToken, setMainUserName}: UserProps) => {
    //navigate init
    const navigate = useNavigate();

    //token check
    useEffect(() => {
        if (token !== "" && token !== null) {
            navigate("/");
        }
    }, [])


    //error
    const [error, setError] = useState<boolean>(false);
    const [messageText, setMessageText] = useState<string>("");

    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

    //form data
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
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
        const emailValidation = expression.test(String(email).toLowerCase())

        if(!emailValidation) {
            setMessageText("Email is not correct!");
            return setError(true);
        }

        const user: User<Register> = {
            userData: {
                userName: username,
                userEmail: email,
            },
            userPassword: password,
        }

        console.log(user);


        try {
            const response = await axios.post("http://172.20.10.4:8080/add-user", user);

            console.log("Successfully registered:", response.data);

            if (setToken) {
                setToken(response.data.token);
            }

            if (setMainUserName) {
                setMainUserName(response.data.userData.userName);
            }

            setMessageText("Successfully registered!");

            // Only redirect after successful registration
            navigate("/");
        } catch (error: any) {
            console.error("Registration failed:", error);
            setError(true);
            setMessageText(error.message);
        }

        //reset Form
        setPasswordVisible(false);
        setUsername("");
        setEmail("");
        setPassword("");
    }

    return (
        <div className={classes.mainCon}>
            <div className={classes.regCon}>
                <h2 className={classes.regTitle}>Register</h2>


                <form className={classes.formCon}>
                    <div className={classes.inputCon}>
                        <input required placeholder="Username" className={classes.inputs} type="username" onChange={(e) => setUsername(e.target.value)} value={username}></input>
                        <input required placeholder="Email" className={classes.inputs} type="email" onChange={e => setEmail(e.target.value)} value={email}></input>
                        <input required placeholder="Password" className={classes.inputs} type={!passwordVisible ? "password" : "text"} onChange={e => setPassword(e.target.value)} value={password}></input>
                        <label className={classes.checkBox}><input type="checkbox" onInput={() => showPassword()}/> Show password</label>
                        <p className={classes.messageText} style={{color: error ? "red" : "green"}}>{messageText}</p>
                    </div>

                    <div className={classes.buttonCon}>
                        <button className={classes.confirmButton} type="submit" onClick={(e) => onFormSubmit(e)}>Join now</button>
                    </div>
                </form>

            </div>
        </div>

    )
}

export default RegisterPage