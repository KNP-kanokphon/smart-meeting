import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Radio,
  Row,
  Space,
  Spin,
  Switch,
  Table,
  Typography,
} from 'antd';
import { DatamanagementService } from '../../stores/meeting-store';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;
export const Activitylog: React.FC = (): React.ReactElement => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [dataSource, setdataSource] = useState([]);
  useEffect(() => {
    checkprofile().then((data: any) => {
      setdataSource(data);
      setLoading(false);
    });
  }, []);
  const checkprofile = async () => {
    return new Promise(async (resolve, reject) => {
      resolve(await DatamanagementService().getactivityallplan());
    });
  };

  const columns = [
    {
      title: 'หัวข้อกิจกรรม',
      dataIndex: 'activitytopic',
      key: 'activitytopic',
    },
    {
      title: 'รายละเอียดกิจกรรม',
      dataIndex: 'activitydetails',
      key: 'activitydetails',
    },
    {
      title: 'กำหนดการแข่งขัน',
      dataIndex: 'scheduleactivity',
      key: 'scheduleactivity',
    },
    {
      title: 'สถานที่',
      dataIndex: 'locationactivity',
      key: 'locationactivity',
    },
    {
      title: 'รายละเอียด',
      dataIndex: 'locationactivity',
      key: 'locationactivity',
      render: (text: string, data: any) => {
        console.log(data);
        // :${data.idactivity}
        return (
          <>
            <Button
              onClick={() =>
                navigate(`/activity/registeractivity`, { state: data })
              }
            >
              เพิ่มก๊วน
            </Button>
          </>
        );
      },
    },
  ];
  return loading ? (
    <Spin spinning={true}></Spin>
  ) : (
    <>
      <Row
        gutter={[
          { xs: 8, sm: 16 },
          { xs: 8, sm: 16 },
        ]}
      >
        <Card
          style={{ width: '100%', textAlign: 'left', marginBottom: '10px' }}
        >
          <Title
            style={{ color: 'black', fontSize: '24px', fontWeight: 'bold' }}
          >
            บันทึกกิจกรรม
          </Title>
        </Card>

        <Card style={{ width: '100%' }}>
          <Table dataSource={dataSource} columns={columns} />
        </Card>
      </Row>
    </>
  );
};
