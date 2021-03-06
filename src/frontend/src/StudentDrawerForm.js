import {Drawer, Input, Col, Select, Form, Row, Button, Spin} from 'antd';
import React, {useState} from "react";
import { addNewStudent, editStudent } from "./client";
import { successNotification, errorNotification } from "./AntdNotification";

const {Option} = Select;

const antIcon = <Spin style={{ fontSize: 24 }} />

function StudentDrawerForm({showDrawer, setShowDrawer, fetchStudents, edit, add, student, student_id}) {
    const oldStudent = student;
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");


    const onClose = () => setShowDrawer(false);
    const [loading, setLoading] = useState(false);

    const onFinish = student => {
        setLoading(true);
        {add && addNewStudent(student)
            .then(
            () => {
               onClose();
               successNotification("Success! The student has been added",
                   `${student.name} was added successfully to the system`)
               fetchStudents();
            }).catch(err => {
                console.log(err.response);
                console.log(err.response.data.message);
                errorNotification("There was an error!", `${err.response.data.message} - ${err.response.status} [${err.response.statusText}]`, "bottomLeft")
            }).finally(() => {
                setLoading(false);
            })}
        {edit && editStudent(student_id, student)
            .then(
                () => {
                    onClose();
                    successNotification("Success! The student has been successfully updated.",
                        `${student.name} was added successfully to the system`)
                    fetchStudents();
                }).catch(err => {
                console.log(err.response);
                console.log(err.response.data.message);
                errorNotification("There was an error!", `${err.response.data.message} - ${err.response.status} [${err.response.statusText}]`, "bottomLeft")
            }).finally(() => {
                setLoading(false);
            })}
    };

    const onFinishFailed = errorInfo => {
        alert(JSON.stringify(errorInfo, null, 2));
    };

    return <Drawer
        title="Create new student"
        width={720}
        onClose={onClose}
        visible={showDrawer}
        bodyStyle={{paddingBottom: 80}}
        footer={
            <div
                style={{
                    textAlign: 'right',
                }}
            >
                <Button onClick={onClose} style={{marginRight: 8}}>
                    Cancel
                </Button>
            </div>
        }
    >
        <Form layout="vertical"
              initialValues={{
                  ["name"]: oldStudent && oldStudent.name,
                  ["email"]: oldStudent && oldStudent.email
              }}
              onFinishFailed={onFinishFailed}
              onFinish={onFinish}
              hideRequiredMark>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[{required: true, message: 'Please enter student name'}]}
                    >
                        <Input placeholder="Please enter student name"/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[{required: true, message: 'Please enter student email'}]}
                    >
                        <Input placeholder="Please enter student email"/>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="gender"
                        label="gender"
                        rules={[{required: true, message: 'Please select a gender'}]}
                    >
                        <Select placeholder="Please select a gender">
                            <Option value="MALE">MALE</Option>
                            <Option value="FEMALE">FEMALE</Option>
                            <Option value="OTHER">OTHER</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Form.Item >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                {loading && antIcon}
            </Row>
        </Form>
    </Drawer>
}

export default StudentDrawerForm;