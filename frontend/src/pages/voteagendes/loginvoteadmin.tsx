import React, { useState, useRef } from 'react';
import { Card, Row, Col, Image, Input, Button, Form, message } from 'antd';
import Logo from '../../assets/images/KPIS Logo.png';
import { useParams } from 'react-router-dom';

// export interface Props {
//   baseURL: string;
// }

export const Loginvoteadmin: React.FC<{}> = ({}): React.ReactElement => {
  const [getUsername, setUsername] = useState<string>('');
  const [getPassword, setPassword] = useState<string>('');
  const getCheckUsername = useRef<any>(null);
  const getCheckPassword = useRef<any>(null);
  const { roomid } = useParams<{ roomid: string }>();
  const { step } = useParams<{ step: string }>();

  const onFinish = () => {
    if (getUsername.length === 0) {
      getCheckUsername.current.focus();
      message.warning('กรุณากรอก username');
      return true;
    }

    if (getPassword.length === 0) {
      getCheckPassword.current.focus();
      message.warning('กรุณากรอก Password');
      return true;
    }

    if (getUsername && getPassword) {
      if (getUsername === 'admin' && getPassword === 'P@ssw0rd') {
        return (
          message.warning('login success'),
          (window.location.href = `/vote/showqrcode/${roomid}/${step}`)
        );
      } else {
        return (
          message.warning('username or password is wrong , try again'),
          console.log('username or password not true')
        );
      }
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
          backgroundColor: '#1E6541',
        }}
      >
        <Row gutter={16}>
          <Col xs={24} sm={24} md={24} lg={24}>
            <Card
              style={{
                width: 'auto',
                height: 'auto',
                borderRadius: '25px 25px 25px 25px',
                border: 'none',
                marginTop: '90px',
                boxShadow: 'rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px',
              }}
            >
              <Image
                preview={false}
                src={Logo}
                style={{ width: '35%', height: '10%', marginBottom: '20px' }}
              />
              <div style={{ paddingLeft: '20px', paddingRight: '20px' }}>
                <Form
                  name="login"
                  layout="vertical"
                  autoComplete="off"
                  onFinish={onFinish}
                >
                  <Form.Item label="Username" name="username">
                    <Input
                      placeholder="Username"
                      style={{ width: '100%', borderRadius: '10px' }}
                      size={'middle'}
                      ref={getCheckUsername}
                      onChange={(event: any) => setUsername(event.target.value)}
                    />
                  </Form.Item>
                  <Form.Item label="Password" name="password">
                    <Input
                      placeholder="Password"
                      type="password"
                      style={{ width: '100%', borderRadius: '10px' }}
                      size={'middle'}
                      ref={getCheckPassword}
                      onChange={(event: any) => setPassword(event.target.value)}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      style={{
                        background: '#1E6541',
                        border: 'none',
                        width: '100%',
                        borderRadius: '10px',
                      }}
                      size={'middle'}
                      type="primary"
                      htmlType="submit"
                    >
                      เข้าสู่ระบบ
                    </Button>
                  </Form.Item>
                </Form>
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
