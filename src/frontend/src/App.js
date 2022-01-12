import { useState, useEffect } from "react";
import { retrieveAllStudents, deleteStudent } from "./client";
import {Avatar, Badge, Button, Empty, Popconfirm, Spin, Tag, Radio} from 'antd';
import {BulbFilled, BulbOutlined, DownloadOutlined, LoadingOutlined, PlusOutlined} from '@ant-design/icons';
import studentDrawerForm from "./StudentDrawerForm";

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
import StudentDrawerForm from "./StudentDrawerForm";
import {errorNotification, successNotification} from "./AntdNotification";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const AnAvatar = ({ name }) => {
    // This means that the name is empty, and we return the empty Avatar
    let trimmed_name = name.trim();
    if (trimmed_name.length === 0) {
        return <Avatar icon={<UserOutlined />} />
    } else {
        const split = trimmed_name.split(' ')
        if (split.length === 1) {
            return <Avatar>{name.charAt(0)}</Avatar>
        } else {
            return <Avatar>{`${split[0].charAt(0)}${split[1].charAt(0)}`}</Avatar>
        }
    }
}

const removeStudent = (studentID, functionCallback) => {
    deleteStudent(studentID).then(() => {
        successNotification("Success! The student has been deleted", `Student with ID: ${studentID} has been removed.`);
        functionCallback();
    }).catch(err => {
        console.log(err.response);
        console.log(err.response.data.message);
        errorNotification("There was an error!", `${err.response.data.message} - ${err.response.status} [${err.response.statusText}]`)
    });
}

const columns = fetchStudents => [
    {
        title: 'Initials',
        dataIndex: 'avatar',
        key: 'avatar',
        render: (text, student) => <AnAvatar name={student.name}/>
    },
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
    {
        title: 'Actions',
        key: 'actions',
        render: (text, student) =>
            <Radio.Group>
                <Popconfirm
                    title={`Are you sure you want to remove ${student.name} from the student table?`}
                    placement='topRight'
                    onConfirm={() => removeStudent(student.id, fetchStudents)}
                    okText='Yes'
                    cancelText='No'
                >
                    <Radio.Button value="small">Delete</Radio.Button>
                </Popconfirm>
                <Radio.Button value="small">Edit</Radio.Button>
            </Radio.Group>
    }
];

function App() {
    const [students, setStudents] = useState([]);
    const [collapsed, setCollapsed] = useState(false);
    const [loading, setLoading] = useState(true);
    const [student, setStudent] = useState('Tom')
    const [theTheme, setTheTheme] = useState("light")
    const [showDrawer, setShowDrawer] = useState(false);

    const fetchStudents = () => retrieveAllStudents()
      .then( data => {
        console.log(data);
        setStudents(data);
        setLoading(false);
      }).catch(err => {
          console.log(err.response);
          console.log(err.response.data.message);
          errorNotification("There was an error!", `${err.response.data.message} - ${err.response.status} [${err.response.statusText}]`)
      }).finally(() => setLoading(false));

    useEffect(() => {
      console.log("I'm here");
      fetchStudents().then(r => {});
    }, [])

    // function to display students
    const displayStudents = () => {
        if (loading) {
            return <Spin indicator={antIcon} />
        }
        // For the case where there are no students in the database
        if (students.length <= 0) {
            return <>
                <Button
                    style={{ backgroundColor: 'dodgerblue' }}
                    onClick={() => setShowDrawer(!showDrawer)}
                    type="secondary" shape="round" icon={<PlusOutlined/>} size="large">
                    Add New Student
                </Button>
                <StudentDrawerForm
                    showDrawer={showDrawer}
                    setShowDrawer={setShowDrawer}
                    fetchStudents={fetchStudents}
                />
                <Empty/>
            </>
        }
        return <>
            <StudentDrawerForm
                showDrawer={showDrawer}
                setShowDrawer={setShowDrawer}
                fetchStudents={fetchStudents}
            />
            <Table
            style={{ border: `1px solid ${theTheme}` }}
            dataSource={students}
            columns={columns(fetchStudents)}
            bordered
            title={() => <>
                <Button
                    onClick = {() => setShowDrawer(!showDrawer)}
                    type="primary" shape="round" icon={<PlusOutlined />} size='large'>
                Add New Student
            </Button>
                <br /><br />
                <Tag id="tag-1">Number of students: </Tag>
                <Badge count={students.length} className="site-badge-count-4"/>
                </>}
            pagination={{ pageSize: 50 }}
            scroll={{ y: 240 }}
            rowKey={student => student.id}
        />
        </>
    }

    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    return <Layout style={{ minHeight: '100vh' }}>
        <Sider theme={theTheme === "black" ? "dark" : "light"} collapsible collapsed={collapsed} onCollapse={setCollapsed}>
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
            <Footer style={{ textAlign: 'center', fontStyle: 'bold' }}>StudentManagementApp ©2022 By Emmanuel Okonkwo</Footer>
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
            <Footer style={{ textAlign: 'center', color: "white", backgroundColor: "black" }}>About: StudentManagementApp ©2022 By Emmanuel Okonkwo</Footer>
        </Layout>}
    </Layout>
}

export default App;
