import React, { useState, useEffect } from 'react';
import {
  Card,
  Row,
  Typography,
  // List,
  // Skeleton,
  Button,
  // Avatar,
  // Input,
  Col,
  Popover,
  // DatePicker,
  Space,
  // Select,
  Table,
  Tag,
  Badge,
  // Divider,
} from 'antd';
import { Icon } from '@iconify/react';
import { useLocation } from 'react-router-dom';
// import { EditFilled, EllipsisOutlined } from '@ant-design/icons';

export const CheckList: React.FC = (): React.ReactElement => {
  const { Title } = Typography;
  const { state } = useLocation();
  console.log(state);

  const [datasource, setDatasource] = useState<any>([]);

  const contentAction = (
    <>
      <Row style={{ width: 'auto', textAlign: 'left' }}>
        <Col span={24} style={{ marginBottom: '10px' }}>
          <Button style={{ border: 'none', width: '100%', textAlign: 'left' }}>
            Edit
          </Button>
        </Col>

        <Col span={24}>
          <Button
            style={{
              border: 'none',
              color: 'red',
              width: '100%',
              textAlign: 'left',
            }}
          >
            Delete
          </Button>
        </Col>
      </Row>
    </>
  );

  const data: any = [
    {
      key: 1,
      title: 'นาย',
      name: 'ทวี',
      lastname: 'สอดส่อง',
      position: 'นายกสมาคม',
      course: 'ปปร.17,ปศส.10',
      phoneNumber: '081-831-2876',
      email: '',
      food: 1,
      register: 1,
      meet: 2,
    },
    {
      key: 2,
      title: 'นาย',
      name: 'ทวี',
      lastname: 'สอดส่อง',
      position: 'นายกสมาคม',
      course: 'ปปร.17,ปศส.10',
      phoneNumber: '081-831-2876',
      email: '',
      food: 1,
      register: 1,
      meet: 1,
    },
    {
      key: 3,
      title: 'นาย',
      name: 'ทวี',
      lastname: 'สอดส่อง',
      position: 'นายกสมาคม',
      course: 'ปปร.17,ปศส.10',
      phoneNumber: '081-831-2876',
      email: '',
      food: 2,
      register: 2,
      meet: 2,
    },
  ];

  const columns: any = [
    {
      title: 'ลำดับ',
      dataIndex: 'key',
      key: 'key',
      width: '5%',
      fixed: 'left',
    },
    {
      title: 'คำนำหน้า',
      dataIndex: 'title',
      key: 'title',
      width: '10%',
    },
    {
      title: 'ชื่อ',
      dataIndex: 'name',
      key: 'name',
      width: '20%',
    },
    {
      title: 'นามสกุล',
      dataIndex: 'lastname',
      key: 'lastname',
      width: '20%',
    },
    {
      title: 'ตำแหน่ง',
      dataIndex: 'position',
      key: 'position',
      width: '10%',
    },
    {
      title: 'หลักสูตร',
      dataIndex: 'course',
      key: 'course',
      width: '10%',
    },
    {
      title: 'เบอร์โทรศัพท์',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      width: '10%',
    },
    {
      title: 'อีเมล',
      dataIndex: 'email',
      key: 'email',
      width: '15%',

      render: (text: any) => {
        return text ? text : '-';
      },
    },
    {
      title: 'สถานะอาหารว่าง',
      dataIndex: 'food',
      key: 'food',
      width: '10%',

      render: (text: any) => {
        if (text) {
          return text === 1 ? (
            <Tag color="lime">
              <Space>
                <Icon icon="emojione:white-heavy-check-mark" />
                {'รับ'}
              </Space>
            </Tag>
          ) : (
            <Tag color="orange">
              <Space>
                <Icon icon="emojione-v1:cross-mark" />
                {'ไม่รับ'}
              </Space>
            </Tag>
          );
        }
      },
    },
    {
      title: 'สถานะการลงทะเบียน',
      dataIndex: 'register',
      key: 'register',
      width: '10%',

      render: (text: any) => {
        if (text) {
          return text === 1 ? (
            <Space>
              <Badge color={'green'} text={'เข้าร่วม'} />
            </Space>
          ) : (
            <Space>
              <Badge color={'orange'} text={'ไม่เข้าร่วม'} />
            </Space>
          );
        }
      },
    },
    {
      title: 'สถานะเข้าร่วมประชุม',
      dataIndex: 'meet',
      key: 'meet',
      width: '10%',

      render: (text: any) => {
        if (text) {
          return text === 1 ? (
            <Tag color="lime">
              <Space>
                {/* <Icon icon="emojione:white-heavy-check-mark" /> */}
                {'เช็คอิน'}
              </Space>
            </Tag>
          ) : (
            <Tag>
              <Space>
                {/* <Icon icon="emojione-v1:cross-mark" /> */}
                {'ไม่ได้เช็คอิน'}
              </Space>
            </Tag>
          );
        }
      },
    },
    {
      title: '',
      dataIndex: 'key',
      key: 'key',
      fixed: 'right',
      width: '5%',
      align: 'center',
      render: (text: any) => {
        return (
          <>
            <Popover content={contentAction} trigger="click">
              <Button
                // style={{ border: 'none' }}
                icon={<Icon icon="cil:hamburger-menu" />}
              />
            </Popover>
          </>
        );
      },
    },
  ];
  return (
    <Row
      gutter={[
        { xs: 8, sm: 16 },
        { xs: 8, sm: 16 },
      ]}
    >
      <Card style={{ width: '100%', textAlign: 'left', marginBottom: '30px' }}>
        <Title style={{ color: 'black', fontSize: '24px', fontWeight: 'bold' }}>
          CHECK IN LISTS
        </Title>
        <Typography>
          ขอเชิญประชุมคณะกรรมการบริหารสมาคมแห่งสถาบันพระปกเกล้า ครั้งที่ 5/2565
        </Typography>
      </Card>
      <div style={{ width: '100%', marginLeft: '40px', marginRight: '40px' }}>
        <Card
          style={{ width: '100%', textAlign: 'left', marginBottom: '30px' }}
          title={
            <Typography
              style={{
                textAlign: 'left',
                fontSize: '30px',
                fontWeight: 'bold',
                color: 'grey',
              }}
            >
              Check-in Lists
            </Typography>
          }
          // extra={}
        >
          <Table
            columns={columns}
            dataSource={data}
            scroll={{ x: 'calc(1000px + 50%)' }}
          />
        </Card>
      </div>
    </Row>
  );
};
