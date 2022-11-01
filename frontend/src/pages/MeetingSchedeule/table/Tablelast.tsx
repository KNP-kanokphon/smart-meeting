import React, { useState, useEffect } from 'react';
import {
  Card,
  Row,
  Typography,
  Button,
  Col,
  Popover,
  Space,
  Table,
  Tag,
  Badge,
  Select,
  Input,
  DatePicker,
  Dropdown,
  Menu,
} from 'antd';
import { Icon } from '@iconify/react';
import { EllipsisOutlined, DownOutlined } from '@ant-design/icons';
import { idText } from 'typescript';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;
const { Search } = Input;
const { RangePicker } = DatePicker;

export const TableLast: React.FC = (): React.ReactElement => {
  const navigate = useNavigate();
  const [openToday, setOpenToday] = useState(false);
  const [openLastmeet, setOpenLastmeet] = useState(false);

  const handleOpenChangeToday = (newOpen: boolean) => {
    setOpenToday(newOpen);
  };
  const handleOpenChangeLastmeet = (newOpen: boolean) => {
    setOpenLastmeet(newOpen);
  };

  const onclickViwe = (e: any) => {
    if (e.key === 'view') {
      navigate(`detail/view`);
    } else if (e.key === 'signate') {
      navigate(`detail/signate`);
    } else if (e.key === 'minutes') {
      navigate(`detail/minutes`);
    }
  };

  const columnsLast = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      width: '70%',
      ellipsis: true,
      render: (data: string, dataAll: any) => {
        return (
          <>
            <Row>
              <Typography style={{ fontWeight: 'bold', fontSize: '16px' }}>
                {data}
              </Typography>
            </Row>
            <Row>
              <Space>
                <Typography style={{ color: 'grey' }}>
                  {dataAll.date}
                </Typography>
                <Typography style={{ color: 'grey' }}>
                  {dataAll.time}
                </Typography>
              </Space>
            </Row>
          </>
        );
      },
    },
    {
      title: 'Room',
      dataIndex: 'room',
      key: 'room',
      width: '10%',
      ellipsis: true,
      render: (data: any) => {
        return (
          <>
            <Row>
              <Typography style={{ fontWeight: 'bold', fontSize: '16px' }}>
                ห้องประชุม
              </Typography>
            </Row>
            <Row>
              <Typography style={{ color: 'grey' }}>{data}</Typography>
            </Row>
          </>
        );
      },
    },
    {
      title: 'Participant',
      dataIndex: 'participant',
      key: 'participant',
      width: '10%',
      ellipsis: true,
      render: (data: any) => {
        return (
          <>
            <Row>
              <Typography style={{ fontWeight: 'bold', fontSize: '16px' }}>
                ผู้ตกลงเข้าร่วม
              </Typography>
            </Row>
            <Row>
              <Typography style={{ color: 'grey' }}>{data}</Typography>
            </Row>
          </>
        );
      },
    },
    {
      title: 'Checklist',
      dataIndex: 'id',
      key: 'id',
      width: '10%',
      align: 'right',
      render: (data: string, dataAll: any) => {
        return (
          <>
            <Dropdown
              overlay={
                <Menu
                  onClick={onclickViwe}
                  items={[
                    { key: 'view', label: 'View' },
                    { key: 'signate', label: 'E-Signate' },
                    { key: 'minutes', label: 'Minutes' },
                  ]}
                />
              }
            >
              <a style={{ color: '#1E6541' }}>
                More <DownOutlined />
              </a>
            </Dropdown>
          </>
        );
      },
    },
  ];
  const dataSourceLast = [
    {
      key: '1',
      id: '12',
      title:
        'ขอเชิญประชุมคณะกรรมการบริหารสมาคมแห่งสถาบันพระปกเกล้า ครั้งที่ 5/2565',
      room: 'ห้อง 5 กันยา',
      participant: '26',
      date: '2022-10-11',
      time: '18:00 - 20:00 น.',
    },
    {
      key: '2',
      id: '12',
      title:
        'ขอเชิญประชุมวิชาการสถาบันพระปกเกล้า ครั้งที่ 23/2565 “ประชาธิปไตยในภูมิทัศน์ใหม่ ” ',
      room: 'ห้อง 5 กันยา',
      participant: '',
      date: '2022-10-11',
      time: '18:00 - 20:00 น.',
    },
  ];

  // const contentLastMeet = (
  //   <>
  //     <Row>
  //       <Col span={24}>
  //         <Button style={{ border: 'none', width: '100%', textAlign: 'left' }}>
  //           View
  //         </Button>
  //       </Col>
  //       <Col span={24}>
  //         <Button style={{ border: 'none', width: '100%', textAlign: 'left' }}>
  //           E-Signature
  //         </Button>
  //       </Col>
  //       <Col span={24}>
  //         <Button style={{ border: 'none', width: '100%', textAlign: 'left' }}>
  //           Minutes
  //         </Button>
  //       </Col>
  //       <Col span={24}>
  //         <Button
  //           style={{
  //             border: 'none',
  //             color: 'red',
  //             width: '100%',
  //             textAlign: 'left',
  //           }}
  //         >
  //           Delete
  //         </Button>
  //       </Col>
  //     </Row>
  //   </>
  // );

  const onSearch = (value: string) => console.log(value);
  const filterSearch = (
    <>
      <Space>
        <Select
          placeholder="Meeting Name"
          style={{ border: 'none' }}
          allowClear
        >
          <Option>name 1</Option>
          <Option>name 2</Option>
        </Select>
        <Search
          placeholder="input search text"
          allowClear
          onSearch={onSearch}
          style={{ width: 200 }}
        />
        <RangePicker />
      </Space>
    </>
  );

  return (
    <Card
      style={{ width: '100%', textAlign: 'left', marginBottom: '30px' }}
      title={
        <Typography
          style={{
            textAlign: 'left',
            fontSize: '18px',
            fontWeight: 'bold',
            color: 'grey',
          }}
        >
          Last Meeting
        </Typography>
      }
      extra={filterSearch}
    >
      <Table
        dataSource={dataSourceLast}
        columns={columnsLast as any}
        showHeader={false}
      />
    </Card>
  );
};
