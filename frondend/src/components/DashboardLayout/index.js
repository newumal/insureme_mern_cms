import React, {useEffect} from "react";
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import styles from './index.module.scss'
import {Link, useNavigate} from "react-router-dom";
import {FaSignInAlt, FaSignOutAlt} from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
import {logout, reset} from "../../features/authSlice";

const { Header, Content, Sider } = Layout;
const items1 = ['1', '2', '3'].map((key) => ({
    key,
    label: `nav ${key}`,
}));
const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
    const key = String(index + 1);
    return {
        key: `sub${key}`,
        icon: React.createElement(icon),
        label: `subnav ${key}`,
        children: new Array(4).fill(null).map((_, j) => {
            const subKey = index * 4 + j + 1;
            return {
                key: subKey,
                label: `option${subKey}`,
            };
        }),
    };
});


const DashboardLayout = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)


    useEffect(() => {
        if (!user){
            navigate('/login')
        }
    }, [user])

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/login')
    }
  return(
      <div className={styles.dashboardLayout}>
          <Layout>
                  <header className={styles.dashboardHeader}>
                      <div className='logo'>
                          <Link to='/'>DashBoard</Link>
                      </div>
                      <div>
                          <ul>
                              <li>
                                  <button className='button' onClick={onLogout}>
                                      <FaSignOutAlt /> Logout
                                  </button>
                              </li>
                          </ul>
                      </div>
                  </header>
              <Layout>
                  <Sider width={200} className="site-layout-background">
                      <Menu
                          mode="inline"
                          defaultSelectedKeys={['1']}
                          defaultOpenKeys={['sub1']}
                          style={{
                              height: '100%',
                              borderRight: 0,
                          }}
                          items={items2}
                      />
                  </Sider>
                  <Layout
                      style={{
                          padding: '0 24px 24px',
                      }}
                  >
                      <Breadcrumb
                          style={{
                              margin: '16px 0',
                          }}
                      >
                          <Breadcrumb.Item>Home</Breadcrumb.Item>
                          <Breadcrumb.Item>List</Breadcrumb.Item>
                          <Breadcrumb.Item>App</Breadcrumb.Item>
                      </Breadcrumb>
                      <Content
                          className="site-layout-background"
                          style={{
                              padding: 24,
                              margin: 0,
                              minHeight: 280,
                          }}
                      >
                          Content
                      </Content>
                  </Layout>
              </Layout>
          </Layout>
      </div>
  )
}

export default DashboardLayout