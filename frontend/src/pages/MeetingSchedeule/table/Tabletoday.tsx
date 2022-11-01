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
} from 'antd';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
// import { EditFilled, EllipsisOutlined } from '@ant-design/icons';

export const TableToday: React.FC = (): React.ReactElement => {
  const navigate = useNavigate();
  const dataSourceToday = [
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
      id: '13',
      title:
        'ขอเชิญประชุมวิชาการสถาบันพระปกเกล้า ครั้งที่ 23/2565 “ประชาธิปไตยในภูมิทัศน์ใหม่ ” ',
      room: 'ห้อง 5 กันยา',
      participant: '',
      date: '2022-10-11',
      time: '18:00 - 20:00 น.',
    },
  ];

  const columnsToday = [
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
      render: (data: string) => {
        return (
          <>
            <Row>
              <Button
                style={{ color: 'white', backgroundColor: '#1E6541' }}
                onClick={() => navigate('detail/view', { state: data })}
              >
                Check in Lists
              </Button>
            </Row>
          </>
        );
      },
    },
  ];

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
          Today
        </Typography>
      }
    >
      <Table
        dataSource={dataSourceToday}
        columns={columnsToday}
        showHeader={false}
      />
    </Card>
  );
};
