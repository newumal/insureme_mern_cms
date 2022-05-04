import React, {useEffect, useState} from "react";
import styles from './index.module.scss'
import {FaUser} from 'react-icons/fa'
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { register, reset} from "../../features/authSlice";
import Spinner from "../../components/Spinner";

const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)


    useEffect(() => {
        if (isError){
            toast.error(message)
        }
        if (isSuccess || user){
            navigate('/login')
        }
        dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch])

    if (isLoading){
        return <Spinner />
    }

    const onHandleFormSubmit = (e) => {
        e.preventDefault()

        if (password !== confirmPassword){
            toast.error('Password do not match')
        }else {
            const userData = {
                name,
                email,
                password
            }
            dispatch(register(userData))
        }

    }
    const onClickLogin = () => {
        navigate('/login')
    }

    return(
        <div className={styles.login_container}>
            <form
                className={styles.login_form}
                onSubmit={(e) => onHandleFormSubmit(e)}
            >
                <h1>
                   <FaUser/> Register Here
                </h1>
                <input
                    type="name"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                    className={styles.login_button}
                    type="submit"
                    name="'LOGIN"
                >Register</button>
                <div className={styles.register_button}>
                    <h3>Already a user ?<span><a onClick={onClickLogin} className={{}}>Login</a></span></h3>
                </div>
            </form>
        </div>
    )
}
export default Register