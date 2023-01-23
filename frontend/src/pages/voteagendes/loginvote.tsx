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
import Logo from '../../assets/images/KPIS Logo.png';
import { useNavigate, useParams } from 'react-router-dom';
import { DatamanagementService } from '../../stores/meeting-store';
const { Text, Link } = Typography;

interface Idetailagenda {
  uuid: string;
  agendes: string;
  detailagendes: string;
  step: string;
  partfiles: string;
  votingagree: string;
  votingdisagree?: string;
  votingabstain?: string;
  peopleall?: string;
}

export const Loginvote: React.FC<{}> = ({}): React.ReactElement => {
  const [phoneNumber, setPhonenumber] = useState<string>('');
  const [detailagenda, setDetailagenda] = useState<Idetailagenda>();
  const navigate = useNavigate();
  const getCheckPassword = useRef<any>(null);
  const { roomid } = useParams<{ roomid: string }>();
  const { step } = useParams<{ step: string }>();

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const resultDetailagenda =
      await DatamanagementService().findAagendesdetailbyid(roomid, step);
    console.log(resultDetailagenda);
    setDetailagenda(resultDetailagenda[0]);
  };

  const onFinish = async () => {
    const result = await DatamanagementService().loginbyphonenumber(
      roomid,
      phoneNumber,
    );

    if (Object.keys(result).length > 0) {
      return navigate(`/votedetail/${roomid}/${step}`, { state: result });
      //   (window.location.href = `/vote/votedetail/${roomid}/${step}`);
    } else {
      return message.warning(
        'เบอรโทรศัพท์ไม่ตรงตามระบบ ไม่มีรายชื่อในห้องประชุม โปรดแจ้งทางแอดมิน ',
      );
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
                  style={{ textAlign: 'left' }}
                >
                  <Text>{detailagenda?.agendes}</Text>
                  <Typography.Title level={5} style={{ margin: 0 }}>
                    {detailagenda?.detailagendes}
                  </Typography.Title>
                  <br></br>
                  <Form.Item
                    label="เบอรโทรศัพท์"
                    name="phonenumber"
                    rules={[
                      {
                        required: true,
                        message: 'กรุณากรอกเบอรโทรศัพท์!',
                      },
                    ]}
                  >
                    <Input
                      placeholder="0XX-XXX-XXXX"
                      style={{ width: '100%', borderRadius: '10px' }}
                      size={'middle'}
                      onChange={(event: any) =>
                        setPhonenumber(event.target.value)
                      }
                    />
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
