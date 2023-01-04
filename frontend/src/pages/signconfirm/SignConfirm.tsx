import {
  Button,
  Card,
  Col,
  Image,
  Row,
  Table,
  Typography,
  Modal,
  Space,
  message,
} from 'antd';
import { EditOutlined } from '@ant-design/icons';
import React, { useState, useRef, useEffect } from 'react';
import Logo from '../../assets/images/KPIS Logo.png';
import SignaturePad from 'react-signature-pad-wrapper';
import { DatamanagementService } from '../../stores/meeting-store';
import { useLocation, useParams } from 'react-router-dom';
import SignatureCanvas from 'react-signature-canvas';

export interface Props {
  baseURL: string;
}

export const SignConfirm: React.FC<Props> = ({
  baseURL,
}): React.ReactElement => {
  const id = useParams<{ id: string; userid: string }>();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const sigCanvas = useRef<any>(null);
  const [imageURLone, setImageURlone] = useState<any>(null);
  const { state } = useLocation();
  const [dataIntable, setDataIntable] = useState<any>([]);
  const [dataUser, setDataUser] = useState<any>([]);
  const [nameUser, setNameUser] = useState<any>('');
  const [signatureValue, setSignature] = useState<string>('');
  // console.log(dataIntable);

  const [positionName, setPositionName] = useState<
    [{ id: string; uuid: string; nameposition: string; createdate: string }]
  >([{ id: '', uuid: '', nameposition: '', createdate: '' }]);

  const [userOwner, setUserOwner] = useState<String>(id.userid || '');

  useEffect(() => {
    getListmeeting();
  }, []);
  const getListmeeting = async () => {
    await DatamanagementService()
      .getMeetingByid(id.id)
      .then(data => {
        setDataIntable(data);
      });

    await DatamanagementService()
      // .getuserInroom(String(state))
      .getuserInroom(id.id)
      .then(async (data: any) => {
        const position = await DatamanagementService()
          .getPositionall()
          .then(data => {
            setPositionName(data);
            return data;
          });
        // console.log(data);

        const newData = await data.map((e: any, i: number) => {
          // console.log(e);

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
            confirm: e.confirm,
            signature: e.signature,
          };
        });
        // console.log(newData);

        setDataUser(newData);
      });
  };
  const showModal = (e: any) => {
    setNameUser(e.username);
    setSignature(e.signature);
    setOpen(true);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const onFinish = async () => {
    if (!imageURLone) {
      message.error('กรุณาเซ็นชื่อ !!');
      return;
    }
    const data = {
      data: {
        uuid: id.userid,
        signature: imageURLone,
        confirm: true,
      },
    };
    await DatamanagementService()
      .updateUserDetail(id.id, id.userid, data)
      .then(() => {
        message.success('บันทึกสำเร็จ');
        setOpen(false);
      });

    // await DatamanagementService()
    // .updateUserDetail(id.id, id.userid, data)
    // .then(() => {
    //   message.success('บันทึกสำเร็จ');
    //   setOpen(false);
    // });
  };

  const endSignager: any = {
    onEnd: () => {
      const pngUrl = sigCanvas.current
        .getTrimmedCanvas()
        .toDataURL('image/png');
      setImageURlone(pngUrl);
    },
  };

  const columns: any = [
    {
      title: 'ลำดับ',
      dataIndex: 'id',
      width: '5%',
    },
    {
      title: 'รายชื่อคณะกรรมการบริหารสมาคม',
      dataIndex: 'username',
      width: '30%',
    },
    {
      title: 'ตำแหน่ง',
      dataIndex: 'position',
      width: '20%',
    },
    {
      title: 'หลักสูตร',
      dataIndex: 'place',
      width: '20%',
    },
    {
      title: 'เบอร์โทรศัพท์',
      dataIndex: 'phone',
      width: '10%',
    },
    {
      title: 'ลงนามอนุมัติ',
      dataIndex: 'id',
      width: '10%',
      align: 'center' as const,
      fixed: 'right',
      render: (e: any, record: any) => {
        // console.log(record);

        if (record.uuidprofile === userOwner) {
          if (record.signature === '') {
            return (
              <div style={{ textAlign: 'center' }}>
                <Button
                  style={{ background: '#1E6541', color: 'white' }}
                  onClick={() => showModal(record)}
                >
                  <EditOutlined />
                </Button>
              </div>
            );
          } else {
            return (
              <div style={{ textAlign: 'center' }}>
                <Button
                  disabled
                  style={{ background: '#1E6541', color: 'white' }}
                >
                  <EditOutlined />
                </Button>
              </div>
            );
          }
        }
      },
    },
  ];
  return (
    <>
      <div
        style={{
          height: '100vh',
          padding: '3%',
          background: '#F4FAF7',
          justifyContent: 'center',
          display: 'flex',
        }}
      >
        <Card
          style={{
            position: 'relative',
            width: '100%',
            // height: '100%',
            background: '#FFFFFF',
          }}
        >
          <Row gutter={16}>
            <Col
              xs={{ span: 24 }}
              lg={{ span: 24 }}
              style={{ textAlign: 'center' }}
            >
              <Image
                src={Logo}
                width="10%"
                style={{ marginTop: '30px', marginBottom: '30px' }}
                preview={false}
              />
              <Row gutter={5}>
                <Col xs={{ span: 12 }} lg={{ span: 12 }}>
                  <Typography
                    style={{
                      textAlign: 'right',
                      fontSize: '100%',
                      fontWeight: 'bold',
                    }}
                  >
                    Welcome To
                  </Typography>
                </Col>
                <Col xs={{ span: 12 }} lg={{ span: 12 }}>
                  <Typography
                    style={{
                      textAlign: 'left',
                      fontSize: '100%',
                      color: 'red',
                      fontWeight: 'bold',
                    }}
                  >
                    KPIS Society
                  </Typography>
                </Col>
                <Col xs={{ span: 24 }} lg={{ span: 24 }}>
                  <Typography
                    style={{
                      textAlign: 'center',
                      fontSize: '100%',
                      //   fontWeight: 'bold',
                      marginTop: '10px',
                    }}
                  >
                    Please check in for Generate your ticket
                  </Typography>
                </Col>
                <Col xs={{ span: 24 }} lg={{ span: 24 }}>
                  <Typography
                    style={{
                      textAlign: 'left',
                      fontSize: '100%',
                      fontWeight: 'bold',
                      marginTop: '10px',
                    }}
                  >
                    รายชื่อคณะกรรมการบริหารสมาคมแห่งสถาบันพระปกเกล้า
                  </Typography>
                </Col>
              </Row>
              <br></br>
              <Row>
                <Col
                  xs={{ span: 24 }}
                  lg={{ span: 24 }}
                  style={{ marginBottom: '20px' }}
                >
                  <Table
                    size="small"
                    bordered
                    pagination={false}
                    columns={columns}
                    dataSource={dataUser}
                    scroll={{ x: 'calc(700px + 50%)' }}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
        <Modal
          title={
            <div>
              <Row>
                <Space>
                  <Col>
                    <EditOutlined />
                  </Col>
                  <Col>
                    <Typography>Signature</Typography>
                  </Col>
                  <Col>
                    <Typography>( {nameUser} )</Typography>
                  </Col>
                </Space>
              </Row>
            </div>
          }
          open={open}
          style={{ width: '500px', height: '500px' }}
          onOk={handleOk}
          onCancel={handleCancel}
          closable={false}
          footer={false}
        >
          <div style={{ textAlign: 'center' }}>
            <SignatureCanvas
              canvasProps={{
                width: 250,
                height: 200,
                className: 'sigCanvas',
              }}
              ref={sigCanvas}
              {...endSignager}
              backgroundColor="#EBEDF0"
            />
          </div>
          <Row gutter={14}>
            <Col
              xs={{ span: 12 }}
              lg={{ span: 12 }}
              style={{ textAlign: 'right' }}
            >
              <Button onClick={handleCancel}>Back</Button>
            </Col>
            <Col
              xs={{ span: 12 }}
              lg={{ span: 12 }}
              style={{ textAlign: 'left' }}
            >
              <Button
                style={{ background: '#1E6541', color: 'white' }}
                onClick={onFinish}
              >
                Submit
              </Button>
            </Col>
          </Row>
        </Modal>
      </div>
    </>
  );
};
