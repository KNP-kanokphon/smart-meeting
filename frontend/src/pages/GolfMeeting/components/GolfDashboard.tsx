import React, { useState } from 'react';
import {
  Card,
  Col,
  Row,
  Space,
  Table,
  Typography,
  Badge,
  Tag,
  Tooltip,
  Modal,
  Form,
} from 'antd';
import {
  DashboardOutlined,
  CloseCircleFilled,
  CheckCircleFilled,
  QuestionCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  FileProtectOutlined,
} from '@ant-design/icons';
import './dashboardcss.css';
import dayjs from 'dayjs';

export interface Props {
  baseURL: string;
}

export const GolfDashboard: React.FC = ({}): React.ReactElement => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [getTeamName, setTeamName] = useState(false);

  const showModal = (e: any) => {
    setTeamName(e);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const data = [
    {
      id: '20',
      check: true,
      chec2: false,
      date: dayjs(),
    },
  ];

  const Columns: any = [
    {
      title: 'เลขใบสมัคร',
      dataIndex: 'id',
      key: 'id',
      width: '10%',
      fixed: 'left',
      render: (e: any) => {
        console.log(e.length);
        if (e.length === 1) {
          return <>{`00${e}`}</>;
        } else if (e.length === 2) {
          return <>{`0${e}`}</>;
        } else {
          return <>{`${e}`}</>;
        }
      },
    },
    {
      title: 'รายชื่อก๊วน',
      dataIndex: 'id',
      key: 'id',
      width: '15%',
      fixed: 'left',
      render: (e: any) => {
        return (
          <>
            <a className="loga" onClick={() => showModal(e)}>
              {e}
            </a>
          </>
        );
      },
    },
    {
      title: 'ชื่อ-นามสกุล หัวหน้าก๊วน',
      dataIndex: 'id',
      key: 'id',
      width: '20%',
      fixed: 'left',
    },
    {
      title: 'Link Register',
      dataIndex: 'id',
      key: 'id',
      width: '10%',
      render: (e: any) => {
        return (
          <>
            <Tooltip title={e}>
              <a
                className="loga"
                onClick={() => {
                  navigator.clipboard.writeText(e);
                }}
              >
                <FileProtectOutlined />
              </a>
            </Tooltip>
          </>
        );
      },
    },
    {
      title: 'สถานะการลงทะเบียน',
      dataIndex: 'check',
      key: 'id',
      width: '10%',
      render: (e: any) => {
        if (e === true) {
          return (
            <>
              <Badge status="success" text="เช็คอิน" />
            </>
          );
        } else {
          return (
            <>
              <Badge status="error" text="ไม่ได้เช็คอิน" />
            </>
          );
        }
      },
    },
    {
      title: 'สถานะการจ่ายเงิน',
      dataIndex: 'check2',
      key: 'id',
      width: '10%',
      render: (e: any) => {
        if (e === true) {
          return (
            <>
              <Tag color="green">
                <CheckCircleOutlined />
                {' จ่ายแล้ว'}
              </Tag>
            </>
          );
        } else {
          return (
            <Tag color="red">
              <Space>
                <CloseCircleOutlined />
                {' ยังไม่จ่าย'}
              </Space>
            </Tag>
          );
        }
      },
    },
    {
      title: 'วันที่จ่ายเงิน',
      dataIndex: 'date',
      key: 'date',
      width: '10%',
      render: (e: any) => {
        return dayjs(e).add(543, 'year').format('DD-MM-YYYY');
      },
    },
    {
      title: 'วันที่อัพเดตข้อมูล',
      dataIndex: 'date',
      key: 'date',
      width: '10%',
      render: (e: any) => {
        return dayjs(e).add(543, 'year').format('DD-MM-YYYY');
      },
    },
    {
      title: 'วันที่สร้างก๊วน',
      dataIndex: 'date',
      key: 'date',
      width: '10%',
      render: (e: any) => {
        return dayjs(e).add(543, 'year').format('DD-MM-YYYY');
      },
    },
  ];

  const test = 1;
  const testtime = '11:12:30';

  return (
    <>
      <Modal
        // className="ant-modal-header"
        title={<>{getTeamName}</>}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
      >
        <Form layout="vertical">
          <Form.Item>
            <Space>
              <Typography>{`หลุมที่: ${test}`}</Typography>
              <Typography>{`เวลา: ${testtime} น.`}</Typography>
            </Space>
          </Form.Item>
          <Form.Item label={'รายชื่อลูกทีม'}>
            {/* {data.map((e: any) => {
              return;
              <>
                <Space>
                  <Typography>{e.id}</Typography>
                  <Typography>{e.date}</Typography>
                </Space>
              </>;
            })} */}
          </Form.Item>
        </Form>
      </Modal>
      <Card>
        <Space>
          <DashboardOutlined className="header" />
          <Typography className="header">
            ตรวจสอบรายชื่อผู้เข้าร่วมกิจกรรม
          </Typography>
        </Space>
        <Typography className="headerDetail">
          ขอเชิญร่วมการแข่งขันกอล์ฟการกุศลของสมาคมแห่งพระปกเกล้า
        </Typography>

        <Tooltip title={'Test'}>
          <Space>
            <Typography>{'Test'}</Typography>
            <a
              className="logaHeader"
              onClick={() => {
                navigator.clipboard.writeText('Test');
              }}
            >
              <FileProtectOutlined />
            </a>
          </Space>
        </Tooltip>
      </Card>

      <Row className="rowdash" gutter={12}>
        <Col span={8}>
          <Card style={{ width: '100%' }}>
            <Space>
              <Typography className="headerDetail">
                ก๊วนที่เข้าร่วมกิจกรรมทั้งหมด
              </Typography>
              <QuestionCircleOutlined className="headerDetail" />
            </Space>

            <Typography className="number">20</Typography>
          </Card>
        </Col>
        <Col span={8}>
          <Card style={{ width: '100%' }}>
            <Row gutter={16}>
              <Col span={3}>
                <CheckCircleFilled className="icontrue" />
              </Col>
              <Col span={21}>
                <Space>
                  <Typography className="headerDetail">
                    จำนวนก๊วนที่เช็คอินแล้ว
                  </Typography>
                  <QuestionCircleOutlined className="headerDetail" />
                </Space>
                <Typography className="number">20</Typography>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={8}>
          <Card style={{ width: '100%' }}>
            <Row gutter={16}>
              <Col span={3}>
                <CloseCircleFilled className="iconfalse" />
              </Col>
              <Col span={21}>
                <Space>
                  <Typography className="headerDetail">
                    จำนวนก๊วนที่ยังไม่ได้เช็คอิน
                  </Typography>
                  <QuestionCircleOutlined className="headerDetail" />
                </Space>

                <Typography className="number">20</Typography>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <Card title={'รายชื่อผู้เข้าร่วมประชุม'}>
        <Table
          columns={Columns}
          scroll={{ x: 'calc(1000px + 50%)' }}
          dataSource={data}
        />
      </Card>
    </>
  );
};
