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
  const [dataUser2, setDataUser2] = useState<any>([]);
  const [getPositionName, setPositionName] = useState<any>([]);
  const [getNameUser, setnameUser] = useState<any>('');
  const [getNameUser2, setnameUser2] = useState<any>('');
  const [getNameuuid, setnameuuid] = useState<any>('');

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
    await DatamanagementService()
      .getuserInroom(String(state))
      .then(async (data: any) => {
        const position = await DatamanagementService()
          .getPositionall()
          .then(data => {
            setPositionName(data);
            return data;
          });
        const newData = await data.map((e: any, i: number) => {
          const pname = position.find(
            (name: {
              id: string;
              uuid: string;
              nameposition: string;
              createdate: string;
            }) => name.uuid === e.position,
          );
          return {
            id: i + 1,
            uuidprofile: e.uuidprofile,
            uuidroom: e.uuid,
            username: e.username,
            statuscheckin: e.checkin,
            position: pname.nameposition,
            statusconfirm: e.confirm,
            signature: e.signature,
          };
        });
        setDataUser2(newData);
      });
  };
  const [datasource, setDatasource] = useState<any>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isModalOpen2, setIsModalOpen2] = useState<boolean>(false);

  const showModal = (e: any) => {
    setnameUser(e);
    console.log(e.username);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showModal2 = (e: any) => {
    console.log(e);
    setnameUser2(e.username);
    setnameuuid(e.uuidprofile);
    setIsModalOpen2(true);
  };

  const handleOk2 = () => {
    setIsModalOpen2(false);
  };

  const handleCancel2 = () => {
    setIsModalOpen2(false);
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
      width: '20%',
    },
    {
      title: 'สถานะ',
      dataIndex: 'statuscheckin',
      key: 'statuscheckin',
      width: '5%',
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
      title: 'Link',
      dataIndex: 'uuidprofile',
      key: 'uuidprofile',
      fixed: 'right',
      width: '5%',
      render: (text: any, row: any) => {
        return (
          <>
            <div style={{ textAlign: 'center' }}>
              <Button
                onClick={() => showModal2(row)}
                style={{
                  border: 'none',
                  textAlign: 'center',
                  background: 'none',
                }}
              >
                Link
              </Button>
            </div>
          </>
        );
      },
    },
    {
      title: '',
      dataIndex: 'uuidprofile',
      key: 'uuidprofile',
      fixed: 'right',
      width: '5%',
      render: (text: any, row: any) => {
        return (
          <>
            <div style={{ textAlign: 'center' }}>
              <Button
                onClick={() => showModal(row)}
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

  // const close = () => {
  //   console.log(
  //     'Notification was closed. Either the close button was clicked or duration time elapsed.',
  //   );
  // };

  // const openNotification = (e: any) => {
  //   console.log(e);

  //   confirm({
  //     title: 'ลิ้งค์การประชุม',
  //     icon: <ExclamationCircleOutlined />,
  //     okText: 'ปิด',
  //     content: (
  //       <>
  //         <Typography style={{ marginBottom: '20px' }}>
  //           คัดลอกลิ้งค์การประชุมข้างล่าง
  //         </Typography>
  //         <Typography style={{ marginBottom: '20px' }}>
  //           <a
  //           // onClick={e => {
  //           //   `${window.location.host}/profileDetail/`;
  //           // }}
  //           >
  //             ลิ้งค์เซ็นลายเซ็นดิจิตอล
  //           </a>
  //         </Typography>
  //       </>
  //     ),
  //     onOk() {
  //       console.log('OK');
  //     },
  //   });
  // };

  return (
    <Row
      gutter={[
        { xs: 8, sm: 16 },
        { xs: 8, sm: 16 },
      ]}
    >
      {/* 1 */}
      <Modal
        title={
          <>
            <Row>
              <Space>
                <Col>
                  <Typography>View</Typography>
                </Col>

                <Col style={{ color: 'grey', fontSize: '14px' }}>
                  <Typography> ({getNameUser?.username})</Typography>
                </Col>
              </Space>
            </Row>
          </>
        }
        visible={isModalOpen}
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
            src={getNameUser.signature}
          />
          <Divider />
          <Typography>ลายเซ็นอนุมัติ</Typography>
        </div>
      </Modal>
      {/* 2 */}
      <Modal
        title={
          <>
            <Row>
              <Space>
                <Col>
                  <Typography>View</Typography>
                </Col>

                <Col style={{ color: 'grey', fontSize: '14px' }}>
                  <Typography> ({getNameUser2})</Typography>
                </Col>
              </Space>
            </Row>
          </>
        }
        visible={isModalOpen2}
        onOk={handleOk2}
        onCancel={handleCancel2}
        footer={[
          <Button
            onClick={handleOk2}
            style={{ color: 'white', background: '#1E6541' }}
          >
            OK
          </Button>,
        ]}
      >
        <Typography style={{ marginBottom: '20px' }}>
          <Typography>ลิ้งค์เซ็นลายเซ็นดิจิตอล</Typography>
          <Typography>{`${window.location.host}/signconfirm/${state}/${getNameuuid}`}</Typography>
        </Typography>
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
            dataSource={dataUser2}
            scroll={{ x: 'calc(500px + 50%)' }}
          />
          {/* <div style={{ textAlign: 'center' }}>
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
          </div> */}
        </Card>
      </div>
    </Row>
  );
};
