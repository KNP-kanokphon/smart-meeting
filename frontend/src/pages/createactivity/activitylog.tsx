import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Dropdown,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Space,
  Spin,
  Switch,
  Table,
  Typography,
} from 'antd';
import { DatamanagementService } from '../../stores/meeting-store';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;
const { Option } = Select;
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
      width: '20%',
    },
    {
      title: 'รายละเอียดกิจกรรม',
      dataIndex: 'activitydetails',
      key: 'activitydetails',
      width: '20%',
    },
    {
      title: 'กำหนดการแข่งขัน',
      dataIndex: 'scheduleactivity',
      key: 'scheduleactivity',
      width: '20%',
    },
    {
      title: 'สถานที่',
      dataIndex: 'locationactivity',
      key: 'locationactivity',
      width: '20%',
    },
    {
      title: 'รายละเอียด',
      dataIndex: 'locationactivity',
      key: 'locationactivity',
      width: '20%',
      render: (text: string, data: any) => {
        return (
          <>
            <Button
              type="link"
              onClick={() =>
                navigate(`/activity/registeractivity`, { state: data })
              }
            >
              เพิ่มก๊วน
            </Button>
            {'     '}
            <Button
              type="link"
              onClick={() =>
                navigate(`/activity/activitydashboard`, { state: data })
              }
            >
              รายงานกิจกรรม
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
