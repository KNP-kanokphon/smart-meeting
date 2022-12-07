import React, { useState, useRef, useEffect } from 'react';
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
import { useParams } from 'react-router-dom';
import { DatamanagementService } from '../../stores/meeting-store';
const { confirm } = Modal;

export interface Props {
  baseURL: string;
}

export const PartyConfirm: React.FC<Props> = ({
  baseURL,
}): React.ReactElement => {
  const { userid } = useParams<{ userid: string }>();
  const [getUserid, setUserid] = useState<string>('');
  const [getDetailuser, setDetailuser] = useState<any>([]);
  const getCheckUsername = useRef<any>(null);

  useEffect(() => {
    getUserDetail();
  }, []);
  const getUserDetail = async () => {
    const result = await DatamanagementService().getUserInparty(userid);
    console.log(result[0]);

    setDetailuser(result[0]);
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
                <b style={{ color: '#445972' }}>
                  ขอขอบคุณ {getDetailuser?.name}
                </b>
                <br></br>
                <b style={{ color: '#445972' }}>สำหรับ NIGHT PARTY ครั้งนี้</b>
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
