import DashboardLayout from "../../components/DashboardLayout";
import styles from './index.module.scss'

const Dashboard = () => {
  return(
      <div className={styles.dashboardContainer}>
        <DashboardLayout />
      </div>
  )
}
export default Dashboard