import DashboardLayout from "../../components/DashboardLayout";
import styles from './index.module.scss'
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {useEffect} from "react";

const Dashboard = () => {
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.auth)

    useEffect(() => {
        if (!user){
            navigate('/login')
        }
    }, [user])
  return(
      <>
          <DashboardLayout />
      </>
  )
}
export default Dashboard