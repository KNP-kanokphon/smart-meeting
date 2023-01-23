import React, { useState, useRef } from 'react';
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
  Modal,
} from 'antd';
import Logo from '../../../assets/images/KPIS Logo.png';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import { useLocation, useParams } from 'react-router-dom';
import { DatamanagementService } from '../../../stores/meeting-store';
const { Text, Link } = Typography;

export const Voteresolution: React.FC<{}> = ({}): React.ReactElement => {
  const [phoneNumber, setPhonenumber] = useState<string>('');
  const getCheckUsername = useRef<any>(null);
  const getCheckPassword = useRef<any>(null);
  const { roomid } = useParams<{ roomid: string }>();
  const { step } = useParams<{ step: string }>();
  const { state } = useLocation() as any;
  const vote = async (text: string) => {
    Modal.confirm({
      title: 'Confirm',
      icon: <ExclamationCircleOutlined />,
      content: 'ท่านยืนยันการลงมตินี้หรือไม่ ?',
      onOk: async () => {
        await DatamanagementService().vote(roomid, text, state[0].uuid, step);
        message.success('ลงมติเรียบร้อย');
      },
      onCancel() {},
      okText: 'ยืนยัน',
      cancelText: 'ย้อนกลับ',
    });
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
              <Row>ระเบียบวาระที่ 1</Row>
              <Row>ประชุมมติการจัดตั้งคณะกรรมการสมาคม</Row>
              <br></br>
              <Card
                style={{
                  borderRadius: '25px 25px 25px 25px',
                }}
              >
                <Row
                  style={{
                    textAlign: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Button
                    type="primary"
                    // shape="circle"
                    style={{
                      fontSize: '100%',
                      border: '2px none',
                      borderRadius: '100px',
                      backgroundColor: '#32B768',
                    }}
                    onClick={() => vote('agree')}
                  >
                    เห็นชอบ
                  </Button>
                </Row>
                <br></br>
                <Row
                  style={{
                    textAlign: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Button
                    type="primary"
                    // shape="circle"
                    style={{
                      fontSize: '100%',
                      border: '2px none',
                      borderRadius: '100px',
                      backgroundColor: '#FF2626',
                    }}
                    onClick={() => vote('disagree')}
                  >
                    ไม่เห็นชอบ
                  </Button>
                </Row>
                <br></br>
                <Row
                  style={{
                    textAlign: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Button
                    type="primary"
                    style={{
                      fontSize: '100%',
                      border: '2px none',
                      borderRadius: '100px',
                      backgroundColor: '#F1EFEF',
                      color: '#00000073',
                    }}
                    onClick={() => vote('abstain')}
                  >
                    งดออกเสียง
                  </Button>
                </Row>
              </Card>
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
