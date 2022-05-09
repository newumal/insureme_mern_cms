import React, {useEffect, useState} from "react";
import {Layout, Button, Typography, Avatar, Image, Menu, Breadcrumb, Table, Tag, Space, Pagination, Card   } from 'antd';
import styles from './index.module.scss'
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout, reset} from "../../features/authSlice";
import {
    LoginOutlined,
    UserOutlined,
    AppstoreOutlined,
    PieChartOutlined,
    DesktopOutlined,
    ContainerOutlined,
    MailOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    FileOutlined,
    TeamOutlined,
} from '@ant-design/icons';

const { Header, Footer, Sider, Content } = Layout;
const { Title } = Typography;
const { Meta } = Card;

const headItems = [
    {
        key: 'profile',
        icon: <Avatar style={{ backgroundColor: '#3ea0f1', marginLeft:"10px" }} icon={<UserOutlined />} />,
        children: [
            {
                key: 'setting:1',
                label: 'Logout',
                icon: <LoginOutlined />,
                danger: true
            }
        ]
    }
];

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

const items = [
    getItem('Option 1', '1', <PieChartOutlined />),
    getItem('Option 2', '2', <DesktopOutlined />),
    getItem('User', 'sub1', <UserOutlined />, [
        getItem('Tom', '3'),
        getItem('Bill', '4'),
        getItem('Alex', '5'),
    ]),
    getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem('Files', '9', <FileOutlined />),
];

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <a>{text}</a>,
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        render: tags => (
            <>
                {tags.map(tag => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'loser') {
                        color = 'volcano';
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    },
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
            <Space size="middle">
                <a>Invite {record.name}</a>
                <a>Delete</a>
            </Space>
        ),
    },
];

const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
];



const DashboardLayout = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)

    const [current, setCurrent] = useState('profile');
    const [collapsed, setCollapsed] = useState(false);

    const onCollapse = (collapsed) => {
        console.log(collapsed);
        setCollapsed(collapsed);
    };

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

    const onClick = (e) => {
        console.log('click ', e.key);
        setCurrent(e.key);
        if (e.key === 'setting:1'){
            onLogout()
        }
    };

  return(
      <div className="App">
          <Layout
              style={{
              minHeight: '100vh',
          }}>
              <Header style={{ display:"flex", flexDirection:"row", alignItems: "center", justifyContent: "space-between"}}>
                  <div style={{ display:"flex", flexDirection:"row", alignItems: "center", justifyContent: "center"}}>
                      <Image style={{ borderRadius: "2px"}}
                          width={40}
                          preview={false}
                          src="https://pngimage.net/wp-content/uploads/2018/05/community-logo-png-7.png"
                      />
                      <Title level={5} style={{ color: "white", marginLeft:"20px"}}>User Management System</Title>
                  </div>
                  <div>
                      <Menu theme={"dark"} onClick={onClick} selectedKeys={[]} mode="horizontal" items={headItems} />
                  </div>
              </Header>
              <Layout>
                  <Sider collapsible collapsed={collapsed} onCollapse={onCollapse} theme="light">
                      <Menu theme="light" defaultSelectedKeys={['1']} mode="inline" items={items} />
                  </Sider>
                  <Layout>
                      <Layout>
                          <Content style={{ padding: '0 30px' }}>
                              <Breadcrumb style={{ margin: '16px 0' }}>
                                  <Breadcrumb.Item>Home</Breadcrumb.Item>
                                  <Breadcrumb.Item>List</Breadcrumb.Item>
                                  <Breadcrumb.Item>App</Breadcrumb.Item>
                              </Breadcrumb>
                              <div className={styles.site_layout_content}>
                                  <Table  columns={columns} dataSource={data} pagination={false} />
                                  <Pagination defaultCurrent={6} total={500}  style={{marginTop: "15px"}}/>
                              </div>
                          </Content>
                          <Footer style={{ textAlign: 'center' }}>UMS ©2022 Created by Newumal Weerasinghe </Footer>
                      </Layout>
                  </Layout>
              </Layout>
          </Layout>
      </div>
  )
}

export default DashboardLayout