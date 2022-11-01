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
import { useNavigate } from 'react-router-dom';
// import { EditFilled, EllipsisOutlined } from '@ant-design/icons';

export const TableMemberShip: React.FC = (): React.ReactElement => {
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
      width: '50%',
      ellipsis: true,
      render: (data: string, dataAll: any) => {
        return (
          <>
            <Row>
              <b>{data}</b>
            </Row>
            <Row>
              {dataAll.date}
              {'  '}
              {dataAll.time}
            </Row>
          </>
        );
      },
    },
    {
      title: 'Room',
      dataIndex: 'room',
      key: 'room',
      width: '20%',
      ellipsis: true,
      render: (data: any) => {
        return (
          <>
            <Row>ห้องประชุม</Row>
            <Row>{data}</Row>
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
            <Row>ผู้ตกลงเข้าร่วม</Row>
            <Row>{data}</Row>
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
              <Button onClick={() => navigate('detail/view', { state: data })}>
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
            fontSize: '30px',
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
