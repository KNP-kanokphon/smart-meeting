import React, { useState, useRef } from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {
  Card,
  Row,
  Col,
  Image,
  Input,
  Button,
  Form,
  message,
  Modal,
} from 'antd';
import Logo from '../../assets/images/agenda.jpg';
import background from '../../assets/images/BG-Jeen.jpeg';
import backgroundin from '../../assets/images/BG-IN.jpg';
import { useNavigate } from 'react-router-dom';
import { DatamanagementService } from '../../stores/meeting-store';
const { confirm } = Modal;

export interface Props {
  baseURL: string;
}

export const PartyQRcodeCheckin: React.FC<Props> = ({
  baseURL,
}): React.ReactElement => {
  const [getUserid, setUserid] = useState<string>('');
  const getCheckUsername = useRef<any>(null);
  const navigate = useNavigate();

  const onFinish = async () => {
    if (getUserid === '') {
      getCheckUsername.current.focus();
      message.warning('กรุณากรอก รหัสสมาชิค');
      return true;
    } else {
      Modal.success({
        title: 'ยืนยันการเข้าร่วม',
        icon: <ExclamationCircleOutlined />,
        async onOk() {
          await DatamanagementService()
            .updatecheckinparty(getUserid)
            .then((e: any) => {
              if (e === 0) {
                message.error('ไม่พบรหัสผู้ใช้งานนี้');
              } else {
                navigate(`/partyConfirm/${getUserid}`);
              }
            });
          // console.log('OK');
        },
        onCancel() {
          // console.log('Cancel');
        },
      });
    }
  };
  return (
    <>
      <div
        style={{
          height: '100vh',
          padding: '40px',
          textAlign: 'center',
          justifyContent: 'center',
          display: 'flex',
          // backgroundColor: '#1E6541',
          backgroundImage: `url(${background})`,
        }}
      >
        <Row gutter={16}>
          <Col xs={24} sm={24} md={24} lg={24}>
            <Card
              style={{
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                width: 'auto',
                height: 'auto',
                borderRadius: '25px 25px 25px 25px',
                border: 'none',
                // marginTop: '90px',
                // backgroundColor: '#CFA153',
                boxShadow: 'rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px',
                backgroundImage: `url(${backgroundin})`,
              }}
            >
              <Image
                preview={false}
                src={Logo}
                style={{
                  width: '80%',
                  height: '10%',
                  marginBottom: '20px',
                  borderRadius: '25px 25px 25px 25px',
                  boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                }}
              />
              <div style={{ paddingLeft: '20px', paddingRight: '20px' }}>
                <Form name="login" layout="vertical" autoComplete="off">
                  <Form.Item
                    label={<b style={{ color: '#445972' }}>รหัสสมาชิค</b>}
                    name="username"
                  >
                    <Input
                      placeholder="631103XXX"
                      style={{ width: '100%', borderRadius: '10px' }}
                      size={'middle'}
                      ref={getCheckUsername}
                      onChange={(event: any) => setUserid(event.target.value)}
                    />
                  </Form.Item>
                </Form>

                <Button
                  style={{
                    background: '#445972',
                    border: 'none',
                    width: '100%',
                    borderRadius: '10px',
                  }}
                  size={'middle'}
                  type="primary"
                  onClick={onFinish}
                >
                  ยืนยัน
                </Button>
              </div>
            </Card>
            <div>
              <div
                style={{
                  marginTop: '80px',
                  textAlign: 'center',
                  color: 'white',
                }}
              >
                ©2022 O S D Company Limited
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};
