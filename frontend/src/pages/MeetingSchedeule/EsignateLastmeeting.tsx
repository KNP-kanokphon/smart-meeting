import React, { useState, useEffect } from 'react';
import {
  Card,
  Row,
  Typography,
  Button,
  Col,
  Space,
  Table,
  Tag,
  Modal,
  Image,
  Divider,
} from 'antd';
import { Icon } from '@iconify/react';
import {
  ExclamationCircleOutlined,
  LeftCircleOutlined,
} from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { DatamanagementService } from '../../stores/meeting-store';

export const EsignateLastmeeting: React.FC = (): React.ReactElement => {
  const { Title } = Typography;
  const { confirm } = Modal;
  const navigate = useNavigate();
  const { state } = useLocation();
  const [dataIntable, setDataIntable] = useState<any>([]);
  const [dataUser, setDataUser] = useState<any>([]);

  useEffect(() => {
    getListmeeting();
  }, []);
  const getListmeeting = async () => {
    await DatamanagementService()
      .getMeetingByid(state)
      .then(data => {
        setDataIntable(data);
      });
    await DatamanagementService()
      .getuserInroom(String(state))
      .then(async data => {
        const newData = await data.map((e: any, i: number) => {
          return {
            id: i + 1,
            uuidprofile: e.uuidprofile,
            uuidroom: e.uuid,
            username: e.username,
            statuscheckin: e.checkin,
          };
        });
        setDataUser(newData);
      });
  };
  const [datasource, setDatasource] = useState<any>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const contentAction = (
    <>
      <Row style={{ width: 'auto', textAlign: 'left' }}>
        <Col span={24} style={{ marginBottom: '10px' }}>
          <a style={{ border: 'none', width: 'auto' }}>Edit</a>
        </Col>

        <Col span={24}>
          <a style={{ border: 'none', color: 'red', width: 'auto' }}>Delete</a>
        </Col>
      </Row>
    </>
  );

  const columns: any = [
    {
      title: 'ลำดับ',
      dataIndex: 'id',
      key: 'id',
      width: '5%',
      fixed: 'left',
    },
    {
      title: 'ชื่อ-นามสกุล',
      dataIndex: 'username',
      key: 'username',
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
      dataIndex: 'phone',
      key: 'phone',
      width: '10%',
    },

    {
      title: 'สถานะ',
      dataIndex: 'statuscheckin',
      key: 'statuscheckin',
      width: '10%',
      render: (text: any) => {
        return text === true ? (
          <Tag color="lime">
            <Space>
              <Icon icon="emojione:white-heavy-check-mark" />
              {'อนุมัติแล้ว'}
            </Space>
          </Tag>
        ) : (
          <Tag>
            <Space>
              <Icon icon="carbon:time" />
              {'รอการอนุมัติ'}
            </Space>
          </Tag>
        );
      },
    },
    {
      title: '',
      dataIndex: 'uuidprofile',
      key: 'uuidprofile',
      fixed: 'right',
      width: '5%',
      render: (text: any) => {
        return (
          <>
            <div style={{ textAlign: 'center' }}>
              <Button
                onClick={showModal}
                style={{
                  border: 'none',
                  textAlign: 'center',
                  background: 'none',
                }}
              >
                {/* <Icon icon="akar-icons:eye" width={'20px'} /> */}
                <Icon icon="clarity:eye-show-line" width={'20px'} />
              </Button>
            </div>
          </>
        );
      },
    },
  ];

  const close = () => {
    console.log(
      'Notification was closed. Either the close button was clicked or duration time elapsed.',
    );
  };
  const wasmee = () => {
    <a>asdasd</a>;
  };

  const openNotification = () => {
    confirm({
      title: 'Do you Want to delete these items?',
      icon: <ExclamationCircleOutlined />,
      content: `Link : ${wasmee}`,
      onOk() {
        console.log('OK');
      },
    });
  };
  return (
    <Row
      gutter={[
        { xs: 8, sm: 16 },
        { xs: 8, sm: 16 },
      ]}
    >
      <Modal
        title={
          <>
            <Row>
              <Space>
                <Col>
                  <Icon icon="akar-icons:eye" />
                </Col>
                <Col>
                  <Typography>View</Typography>
                </Col>
                <Col style={{ color: 'grey', fontSize: '14px' }}>
                  {'(วัสมี จาหลง)'}
                </Col>
              </Space>
            </Row>
          </>
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button
            onClick={handleOk}
            style={{ color: 'white', background: '#1E6541' }}
          >
            OK
          </Button>,
        ]}
      >
        <div style={{ marginLeft: '40px', marginRight: '40px' }}>
          <Image
            preview={false}
            width={400}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
          <Divider />
          <Typography>ลายเซ็นอนุมัติ</Typography>
        </div>
      </Modal>
      <Card style={{ width: '100%', textAlign: 'left', marginBottom: '30px' }}>
        <Row>
          <Col>
            <Button
              style={{
                border: 'none',
                width: 'auto',
              }}
              onClick={() => navigate(-1)}
            >
              <LeftCircleOutlined
                style={{
                  color: '#1E6541',
                  fontSize: '24px',
                  fontWeight: 'bold',
                }}
              />
            </Button>
          </Col>
          <Col>
            {' '}
            <Title
              style={{ color: 'black', fontSize: '24px', fontWeight: 'bold' }}
            >
              CHECK IN LISTS
            </Title>
          </Col>
        </Row>

        <Typography>
          ขอเชิญประชุมคณะกรรมการบริหารสมาคมแห่งสถาบันพระปกเกล้า ครั้งที่ 5/2565
        </Typography>
      </Card>
      <div style={{ width: '100%', marginLeft: '10px', marginRight: '10px' }}>
        <Card
          style={{ width: '100%', textAlign: 'left', marginBottom: '30px' }}
          title={
            <Typography
              style={{
                textAlign: 'left',
                // fontSize: '30px',
                // fontWeight: 'bold',
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
            dataSource={dataUser}
            scroll={{ x: 'calc(1000px + 50%)' }}
          />
          <div style={{ textAlign: 'center' }}>
            <Space>
              <Button onClick={() => navigate(-1)}>{'Back'}</Button>
              <Button style={{ color: 'white', background: '#1E6541' }}>
                {'Save'}
              </Button>
              <Button
                onClick={openNotification}
                type="dashed"
                style={{ color: '#1E6541', borderColor: '#1E6541' }}
              >
                {'Link for Approval E-Signature'}
              </Button>
            </Space>
          </div>
        </Card>
      </div>
    </Row>
  );
};
