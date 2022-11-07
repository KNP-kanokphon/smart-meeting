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
import { DatamanagementService } from '../../../stores/meeting-store';
// import { EditFilled, EllipsisOutlined } from '@ant-design/icons';

export const TableToday: React.FC = (): React.ReactElement => {
  const [dataIntable, setDataIntable] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getListmeeting();
  }, []);

  const getListmeeting = async () => {
    await DatamanagementService()
      .getListmeeting()
      .then(data => {
        const dataNew = data.filter((e: any) => {
          const dateParts = e.day.split('-');
          const dd = new Date(e.day);
          const dn = new Date();
          const dateCreate = [
            dd.getDate(),
            dd.getMonth() + 1,
            dd.getFullYear(),
          ];

          const dateNow = [dn.getDate(), dn.getMonth() + 1, dn.getFullYear()];
          console.log(new Date(e.day));
          if (
            `${dateCreate[0]}-${dateCreate[1]}-${dateCreate[2]}` ===
            `${dateNow[0]}-${dateNow[1]}-${dateNow[2]}`
          ) {
            return e;
          } else {
            return;
          }
        });
        setDataIntable(dataNew);
      });
  };
  const columnsToday = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      width: '60%',
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
                <Typography style={{ color: 'grey' }}>{dataAll.day}</Typography>
                <Typography style={{ color: 'grey' }}>
                  {dataAll.starttime}-{dataAll.endtime}
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
      dataIndex: 'uuid',
      key: 'uuid',
      width: '10%',
      ellipsis: true,
      render: (data: any, dataAll: any) => {
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
      dataIndex: 'uuid',
      key: 'uuid',
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
        dataSource={dataIntable}
        columns={columnsToday}
        showHeader={false}
      />
    </Card>
  );
};
