import React, { useState, useRef } from 'react';
import {
  AntDesignOutlined,
  UserOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import {
  Layout,
  Button,
  Result,
  Form,
  Input,
  Checkbox,
  Card,
  Row,
  Col,
  Avatar,
  Typography,
  Modal,
} from 'antd';
import { DatamanagementService } from '../../stores/meeting-store';
import { useId24 } from '../../drivers/id24/Id24Provider';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;
const { confirm } = Modal;
interface Prop {
  dataprofile: any;
}

export const SettingProfile: React.FC<Prop> = ({
  dataprofile,
}): React.ReactElement => {
  const { authenticated, login, logout, id24Axios } = useId24();
  const navigate = useNavigate();
  const apiBaseUrl = id24Axios(window.location.origin);

  const onSubmit = (values: any) => {
    confirm({
      icon: <ExclamationCircleOutlined />,
      content: 'ยืนยีนสรุปรางานการประชุม',
      onOk: async () => {
        await DatamanagementService(apiBaseUrl).updateprofile(
          values.username,
          values.email,
        );
        window.location.href = `${window.location.origin}/admin`;
        // navigate('/admin');
      },
      onCancel() {
        Modal.destroyAll();
      },
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Card>
        <Row>
          <Col span={24} style={{ textAlign: 'center' }}>
            <Form
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 16 }}
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onSubmit}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                initialValue={dataprofile.fullname}
                label="ชื่อผู้เข้าใช้งานระบบ"
                name="username"
                rules={[{ required: true, message: 'โปรดกรอกชื่อโปรไฟล์!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                initialValue={dataprofile.email}
                label="อีเมลผู้เข้าใช้งานระบบ"
                name="email"
                rules={[{ required: true, message: 'โปรดกรอกอีเมล!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ backgroundColor: '#1E6541', border: 'none' }}
                >
                  ยืนยัน
                </Button>
              </Form.Item>
            </Form>
          </Col>
          {/* <Col span={12} style={{ textAlign: 'center' }}>
            <Avatar
              style={{ backgroundColor: '#f56a00' }}
              icon={<UserOutlined />}
              size={100}
            />
          </Col> */}
        </Row>
      </Card>
    </>
  );
};
