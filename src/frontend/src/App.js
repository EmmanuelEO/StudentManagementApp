import { useState, useEffect } from "react";
import { retrieveAllStudents } from "./client";
import {Empty, Spin} from 'antd';
import {BulbFilled, BulbOutlined, LoadingOutlined} from '@ant-design/icons';

import {
    Layout,
    Menu,
    Breadcrumb,
    Table
} from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';

import React from "react";

import './App.css';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
    },
];

function App() {
    const [students, setStudents] = useState([]);
    const [collapsed, setCollapsed] = useState(false);
    const [loading, setLoading] = useState(true);
    const [student, setStudent] = useState('Tom')
    const [theTheme, setTheTheme] = useState("light")

    const fetchStudents = () => retrieveAllStudents()
      .then( data => {
        console.log(data);
        setStudents(data);
        setLoading(false);
    });

    useEffect(() => {
      console.log("I'm here");
      fetchStudents();
    }, [])

    const displayStudents = () => {
        if (loading) {
            return <Spin indicator={antIcon} />
        }
        if (students.length <= 0) {
            return <Empty />;
        }
        return <Table
            style={{ border: `1px solid ${theTheme}` }}
            dataSource={students}
            columns={columns}
            bordered
            title={() => 'Header'}
            pagination={{ pageSize: 50 }}
            scroll={{ y: 240 }}
            rowKey={student => student.id}
        />
    }

    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    return <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
            <div className="logo" />
            <Menu theme={theTheme === "black" ? "dark" : "light"} defaultSelectedKeys={['1']} mode="inline">
                <Menu.Item key="1" icon={<BulbFilled />} onClick={() => setTheTheme("light")}>
                    Light Mode
                </Menu.Item>
                <Menu.Item key="2" icon={<BulbOutlined />} onClick={() => setTheTheme("black")}>
                    Dark Mode
                </Menu.Item>
                <SubMenu key="sub1" icon={<UserOutlined />} title="User" >
                    <Menu.Item key="3" onClick={() => setStudent('Tom')}>Tom</Menu.Item>
                    <Menu.Item key="4" onClick={() => setStudent('Bill')}>Bill</Menu.Item>
                    <Menu.Item key="5" onClick={() => setStudent('Alex')}>Alex</Menu.Item>
                </SubMenu>
            </Menu>
        </Sider>
        {theTheme === "light" && <Layout className="site-layout" style={{ backgroundColor: "light"}}>
            <Header className="site-layout-background" style={{ padding: 0 }} />
            <Content style={{ margin: '0 16px' }}>
                <p style={{ margin: '16px 0' }}>
                    <span className="strong-l">User: </span>
                    <span style={{ fontSize: '14px', fontWeight: 'bold'}}>{student}</span>
                </p>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                    {displayStudents()}
                    <p style={{ padding: '1rem', textAlign: 'center' }}>{students.length === 0 && "No Students were found"}</p>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>StudentManagementApp ©2022 By Emmanuel Okonkwo</Footer>
        </Layout>}
        {theTheme === "black" && <Layout className="site-layout" style={{ backgroundColor: "#36454f"}}>
            <Header className="site-layout-background" style={{ textAlign: 'center', color: "white", backgroundColor: "black", padding: 0 }} />
            <Content style={{ margin: '0 16px' }}>
                <p style={{ margin: '16px 0', color: 'white' }}>
                    <span className="strong">User: &nbsp;</span>
                    <span style={{ color: '#FAF9F6', fontSize: '15px', fontWeight: 'bold'}}>{student}</span>
                </p>
                <div id="black" className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                    {displayStudents()}
                    <p style={{ padding: '1rem', textAlign: 'center' }}>{students.length === 0 && "No Students were found"}</p>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center', color: "white", backgroundColor: "black" }}>StudentManagementApp ©2022 By Emmanuel Okonkwo</Footer>
        </Layout>}
    </Layout>
}

export default App;
