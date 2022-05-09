import React, {useEffect, useState} from "react";
import styles from './index.module.scss'
import {FaSignInAlt} from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { login, reset} from "../../features/authSlice";
import Spinner from "../../components/Spinner";
import {Card} from "antd";
import LoginForm from "../../components/LoginForm";

const Login = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

    useEffect(() => {
        if (isError){
            toast.error(message)
        }
        if (isSuccess || user){
            navigate('/')
        }
        dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch])

    const onHandleFormSubmit = (e) => {
        e.preventDefault()
        const userData = {
            email,
            password
        }

        dispatch(login(userData))

    }
    if (isLoading){
        return <Spinner />
    }
    
    const onClickRegister = () => {
        navigate('/register')
    }

    return(
        <LoginForm />


        // <div className={styles.login_container}>
        //     <Card
        //         hoverable
        //     >
        //         <form
        //             className={styles.login_form}
        //             onSubmit={(e) => onHandleFormSubmit(e)}
        //         >
        //             <h1>
        //                 <FaSignInAlt/> LoginForm Here
        //             </h1>
        //             <input
        //                 type="email"
        //                 placeholder="Email"
        //                 value={email}
        //                 onChange={(e)=> setEmail(e.target.value)}
        //             />
        //             <input
        //                 type="password"
        //                 placeholder="Password"
        //                 value={password}
        //                 onChange={(e) => setPassword(e.target.value)}
        //             />
        //             <button
        //                 className={styles.login_button}
        //                 type="submit"
        //                 name="'LOGIN"
        //             >LoginForm</button>
        //             <div className={styles.register_button}>
        //                 <h3>Need an account ?<span><a onClick={onClickRegister} className={{}}>Register</a></span></h3>
        //             </div>
        //
        //         </form>
        //     </Card>
        // </div>
    )
}
export default Login