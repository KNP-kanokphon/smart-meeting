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
            position:
              e.position === null ||
              e.position === '' ||
              e.position === undefined
                ? '-'
                : pname.nameposition,
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
    // console.log(e.username);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showModal2 = (e: any) => {
    // console.log(e);
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
      dataIndex: 'signature',
      key: 'signature',
      width: '5%',
      render: (text: any, row: any) => {
        // console.log(text);

        return text != null ? (
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
          {getNameUser.signature ? (
            <Image preview={false} width={400} src={getNameUser.signature} />
          ) : (
            <div style={{ textAlign: 'center' }}>
              <Image
                preview={false}
                width={200}
                height={200}
                src="error"
                fallback="data:image/png;base64,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"
              />
            </div>
          )}
          <Typography style={{ marginTop: '10px' }}>ลายเซ็นอนุมัติ</Typography>
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
        open={isModalOpen2}
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
          <Typography
            style={{
              fontWeight: 'bold',
              fontSize: '18px',
              marginBottom: '20px',
            }}
          >
            ลิ้งค์เซ็นลายเซ็นดิจิตอล
          </Typography>
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
