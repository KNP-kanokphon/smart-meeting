import React, { useEffect, useState } from 'react';
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
  Spin,
  Button,
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
import { DatamanagementService } from '../../stores/meeting-store';
import { useLocation } from 'react-router-dom';

export const ActivityDashboard: React.FC = (): React.ReactElement => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [getTeamName, setTeamName] = useState<any>([]);
  const { state } = useLocation() as any;
  const [loading, setLoading] = useState(true);
  const [valueActivity, setValueActivity] = useState<any>([]);
  const [dataSource, setdataSource] = useState<any>([]);
  const [dataSourceplan, setdataSourceplan] = useState<any>();
  const [participant, setParticipant] = useState<any>();
  const [countcheckinactivity, setCountcheckinactivity] = useState<any>();
  const [countnotcheckinactivity, setCountnotcheckinactivity] = useState<any>();

  const onChangeForm = (values: any, changvalue: any) => {
    setValueActivity(changvalue);
  };

  useEffect(() => {
    getactivityallplan().then((data: any) => {
      setdataSourceplan(data[0]);
      setLoading(false);
    });

    getactivityall().then((data: any) => {
      console.log(data.length);
      setdataSource(data);
      const countcheckin = data.filter(
        (detail: any) => detail.checkinstatus === true,
      );
      const countnotcheckin = data.filter(
        (detail: any) => detail.checkinstatus === false,
      );
      setCountcheckinactivity(countcheckin.length);
      setCountnotcheckinactivity(countnotcheckin.length);
      setParticipant(data.length);
    });
  }, []);
  const getactivityallplan = async () => {
    return new Promise(async (resolve, reject) => {
      resolve(await DatamanagementService().getactivityallplan());
    });
  };
  const getactivityall = async () => {
    return new Promise(async (resolve, reject) => {
      resolve(await DatamanagementService().getactivityall(state?.idactivity));
    });
  };

  const showModal = (data: any) => {
    setTeamName(data);
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
      dataIndex: 'applicationnumber',
      key: 'applicationnumber',
      width: '10%',
      fixed: 'left',
    },
    {
      title: 'รายชื่อก๊วน',
      dataIndex: 'namegang',
      key: 'namegang',
      width: '15%',
      fixed: 'left',
      render: (text: string, data: any) => {
        return (
          <>
            <Button type="link" onClick={() => showModal(data)}>
              {text}
            </Button>
          </>
        );
      },
    },
    {
      title: 'ชื่อ-นามสกุล หัวหน้าก๊วน',
      dataIndex: 'ownergang',
      key: 'ownergang',
      width: '20%',
      fixed: 'left',
    },
    {
      title: 'Link Register',
      dataIndex: 'idactivity',
      key: 'idactivity',
      width: '10%',
      render: (text: string, data: any) => {
        return (
          <>
            <Tooltip
              title={`${window.location.origin}/activity/detailactivity/${data.idactivity}/${data.applicationnumber}`}
            >
              <Button
                type="link"
                className="loga"
                onClick={() => {
                  navigator.clipboard.writeText(
                    `${window.location.origin}/activity/detailactivity/${data.idactivity}/${data.applicationnumber}`,
                  );
                }}
              >
                <FileProtectOutlined />
              </Button>
            </Tooltip>
          </>
        );
      },
    },
    {
      title: 'สถานะการลงทะเบียน',
      dataIndex: 'checkinstatus',
      key: 'checkinstatus',
      width: '10%',
      render: (text: boolean) => {
        if (text === true) {
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
      dataIndex: 'paymentstatus',
      key: 'paymentstatus',
      width: '10%',
      render: (text: boolean) => {
        if (text === true) {
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
  ];

  const test = 1;
  const testtime = '11:12:30';

  return loading ? (
    <Spin spinning={true}></Spin>
  ) : (
    <>
      <Modal
        // className="ant-modal-header"
        title={<>{getTeamName.namegang}</>}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
      >
        <Form layout="vertical">
          <Form.Item>
            <Space>
              <Typography>{`${getTeamName.schedulematch}`}</Typography>
            </Space>
          </Form.Item>
          <Form.Item label={'รายชื่อลูกทีม'}>
            <Typography
              hidden={getTeamName?.member1 ? false : true}
              className="typothree2"
            >{`${getTeamName.member1}`}</Typography>
            <Typography
              hidden={getTeamName?.member2 ? false : true}
              className="typothree2"
            >{`${getTeamName.member2}`}</Typography>
            <Typography
              hidden={getTeamName?.member3 ? false : true}
              className="typothree2"
            >{`${getTeamName.member3}`}</Typography>
            <Typography
              hidden={getTeamName?.member4 ? false : true}
              className="typothree2"
            >{`${getTeamName.member4}`}</Typography>
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
          {dataSourceplan?.activitydetails}
        </Typography>

        {/* <Tooltip title={'Test'}>
          <Space>
            <Typography>{'Test'}</Typography>
            <Button
              type="link"
              className="logaHeader"
              onClick={() => {
                navigator.clipboard.writeText('Test');
              }}
            >
              <FileProtectOutlined />
            </Button>
          </Space>
        </Tooltip> */}
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

            <Typography className="number">{participant}</Typography>
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
                <Typography className="number">
                  {countcheckinactivity}
                </Typography>
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

                <Typography className="number">
                  {countnotcheckinactivity}
                </Typography>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <Card title={'รายชื่อผู้เข้าร่วมประชุม'}>
        <Table
          columns={Columns}
          scroll={{ x: 'calc(1000px + 50%)' }}
          dataSource={dataSource}
        />
      </Card>
    </>
  );
};
