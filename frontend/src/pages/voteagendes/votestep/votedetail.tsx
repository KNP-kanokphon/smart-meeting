import React, { useState, useRef, useEffect } from 'react';
import {
  Card,
  Row,
  Col,
  Image,
  Input,
  Button,
  Form,
  message,
  Typography,
} from 'antd';
import Logo from '../../../assets/images/KPIS Logo.png';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { DatamanagementService } from '../../../stores/meeting-store';
const { Text, Link } = Typography;

export const Votedetail: React.FC<{}> = ({}): React.ReactElement => {
  const [phoneNumber, setPhonenumber] = useState<string>('');
  const getCheckUsername = useRef<any>(null);
  const getCheckPassword = useRef<any>(null);
  const [positionall, setPositionall] = useState([]);
  const { roomid } = useParams<{ roomid: string }>();
  const { step } = useParams<{ step: string }>();
  const { state } = useLocation() as any;
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const result = await DatamanagementService().getPositionall();
    setPositionall(result);
  };

  const onFinish = () => {
    return navigate(`/voteresolution/${roomid}/${step}`, { state: state });
    // window.location.href = `/vote/voteresolution/${roomid}/${step}`;
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
                  //   layout="vertical"
                  autoComplete="off"
                  onFinish={onFinish}
                  style={{ textAlign: 'left' }}
                >
                  <Text>ระเบียบวาระที่ 1</Text>
                  <Typography.Title level={5} style={{ margin: 0 }}>
                    ระเบียบวาระที่ 1 ประชุมมติการจัดตั้งคณะกรรมการ สมาคม
                  </Typography.Title>
                  <br></br>
                  <Form.Item label="เบอรโทรศัพท์" name="phonenumber">
                    <Text>{state[0].phonenumber}</Text>
                  </Form.Item>
                  <Form.Item label="ชื่อ" name="name">
                    <Text>{state[0].username}</Text>
                  </Form.Item>
                  <Form.Item label="หลักสูตร" name="course">
                    <Text>{state[0].course}</Text>
                  </Form.Item>
                  <Form.Item label="ตำแหน่ง" name="position">
                    <Text>
                      {positionall.map((e: any) => {
                        return state[0].uuidposition?.map((x: any) => {
                          return x === e.uuid ? e.nameposition + '   ' : '';
                        });
                      })}
                    </Text>
                  </Form.Item>
                  <Form.Item>
                    <Button
                      style={{
                        background: '#1E6541',
                        border: 'none',
                        width: '100%',
                        // borderRadius: '10px',
                      }}
                      size={'middle'}
                      type="primary"
                      htmlType="submit"
                    >
                      ถัดไป
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
