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
    // getListUser();
  }, []);

  const getListmeeting = async () => {
    await DatamanagementService()
      .getListmeeting()
      .then(data => {
        const dataNew = data.filter((e: any) => {
          const dd = new Date(e.day);
          const dn = new Date();
          console.log(dd.getDate() === dn.getDate());

          if (dd.getDate() === dn.getDate()) {
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
          วันนี้
        </Typography>
      }
    >
      <Table
        dataSource={dataIntable}
        columns={columnsToday}
        showHeader={false}
        rowKey={'uuid'}
      />
    </Card>
  );
};
