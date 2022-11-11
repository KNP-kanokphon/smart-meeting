import {
  Layout,
  Button,
  Menu,
  Row,
  Col,
  Card,
  Input,
  Select,
  message,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../utils/auth';
import { useId24 } from '../../drivers/id24/Id24Provider';
import styles from './MainLayout.module.scss';
import { Logo } from './Logo';
import { DatamanagementService } from '../../stores/meeting-store';
import { v4 as uuidv4 } from 'uuid';
import { ArrowRightOutlined } from '@ant-design/icons';

const { Content, Sider, Header, Footer } = Layout;
const { Option } = Select;

export interface Props {
  baseURL: string;
}

export const DetailStepTwo: React.FC<Props> = ({ baseURL }) => {
  const { id } = useParams<{ id: string }>();
  const [username, setUsername] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [model, setModel] = useState<string>('');
  const [position, setPosition] = useState<string>('');
  console.log(id);

  const navigate = useNavigate();
  const onSave = async () => {
    if (!username) {
      message.error('โปรดกรอก ขื่อ- นามสกุล');
      return;
    } else if (!phone) {
      message.error('โปรดกรอก เบอรโทรศัพท์');
      return;
    } else if (!email) {
      message.error('โปรดกรอก อีเมล');
      return;
    } else if (!model) {
      message.error('โปรดเลือก รุ่น');
      return;
    } else if (!position) {
      message.error('โปรดกรอก ตำแหน่งสมาคม');
      return;
    }

    const data: {
      username: string;
      phone: string;
      email: string;
      model: string;
      position: string;
      uuidprofile: string;
      idmeeting: any;
      confirm: boolean;
      checkin: boolean;
      type_user: string;
    } = {
      username: username,
      phone: phone,
      email: email,
      model: model,
      position: position,
      uuidprofile: uuidv4(),
      idmeeting: id,
      confirm: true,
      checkin: false,
      type_user: 'after',
    };
    console.log(data);

    const save = await DatamanagementService().saveuserattendeesByuser(data);
    if (save) {
      navigate(`/stepthree/${id}/${data.uuidprofile}`);
    }
  };
  useEffect(() => {
    getListPosition();
    getListCourse();
  }, []);
  const selectModel = (e: any) => {
    setModel(e);
  };
  const selectPosition = (e: any) => {
    setPosition(e);
  };
  const [dataCourse, setDataCourse] = useState<any>([]);
  const [dataPosition, setDataPosition] = useState<any>([]);
  const getListPosition = async () => {
    const result = await DatamanagementService()
      .getPositionall()
      .then(async data => {
        const newData = await data.map((e: any, i: number) => {
          return {
            key: i + 1,
            uuid: e.uuid,
            nameposition: e.nameposition,
          };
        });
        setDataPosition(newData);
      });
  };
  const getListCourse = async () => {
    const result = await DatamanagementService()
      .getCourseall()
      .then(async data => {
        console.log(data);

        const newData = await data.map((e: any, i: number) => {
          return {
            key: i + 1,
            uuid: e.uuid,
            namecourse: e.namecourse,
          };
        });
        setDataCourse(newData);
      });
  };

  return (
    <Layout className="layout">
      <Header
        className={styles.siteLayoutBackground}
        style={{
          padding: 0,
          borderBottom: '1px solid #F0F0F0',
        }}
      >
        {/* <div className="logo" /> */}
      </Header>

      <Content
        style={{
          padding: '30px 30px',
          backgroundColor: '#F4FAF7',
          paddingTop: '20px',
          // paddingBottom: '10px',
          height: '80vh',
          overflow: 'scroll',
        }}
      >
        <div className="site-card-wrapper">
          <Row
            gutter={16}
            style={{
              justifyContent: 'center',
              display: 'flex',
              textAlign: 'center',
            }}
          >
            <Col xs={24} sm={24} md={18} lg={20}>
              <Card style={{ textAlign: 'center' }}>
                <Row>
                  <Col xs={24} sm={24} md={24} lg={24}>
                    <Logo />
                  </Col>
                </Row>
                <br></br>
                <Row>
                  <Col span={24}>
                    <b style={{ fontSize: '18px' }}>Welcome to </b>
                    <b style={{ fontSize: '18px', color: 'red' }}>
                      KPIS Society
                    </b>
                  </Col>
                </Row>
                <Row>
                  <Col
                    xs={24}
                    sm={24}
                    md={24}
                    lg={24}
                    style={{ fontSize: '14px' }}
                  >
                    Please check in for Generate your ticket
                  </Col>
                </Row>
                <br></br>

                <Row gutter={16} style={{ textAlign: 'left' }}>
                  <Col span={24}>
                    ขื่อ- นามสกุล *
                    <Input onChange={e => setUsername(e.target.value)} />
                  </Col>
                </Row>

                <Row gutter={16} style={{ textAlign: 'left' }}>
                  <Col span={24}>
                    เบอรโทรศัพท์ *
                    <Input onChange={e => setPhone(e.target.value)} />
                  </Col>
                </Row>
                <Row gutter={16} style={{ textAlign: 'left' }}>
                  <Col span={24}>
                    อีเมล *
                    <Input onChange={e => setEmail(e.target.value)} />
                  </Col>
                </Row>
                <Row gutter={16} style={{ textAlign: 'left' }}>
                  <Col span={12}>
                    รุ่น *
                    <Select
                      style={{ width: '100%' }}
                      onChange={e => selectModel(e)}
                    >
                      <Option value="1">1</Option>
                      <Option value="2">2</Option>
                      <Option value="3">3</Option>
                      <Option value="4">4</Option>
                      <Option value="5">5</Option>
                    </Select>
                  </Col>
                  <Col span={12}>
                    ตำแหน่งสมาคม*
                    <Select
                      style={{ width: '100%' }}
                      onChange={e => selectPosition(e)}
                    >
                      {dataPosition?.map((e: any, i: number) => {
                        return (
                          <Option key={i} value={e.uuid}>
                            {e.nameposition}
                          </Option>
                        );
                      })}
                    </Select>
                  </Col>
                </Row>
                <br></br>
                <Row>
                  <Col span={24}>
                    <Button
                      style={{
                        width: 'auto',
                        backgroundColor: '#1E6541',
                        color: '#ffffff',
                      }}
                      onClick={onSave}
                    >
                      Submit
                    </Button>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center', backgroundColor: '#F4FAF7' }}>
        ©2022 O S D Company Limited
      </Footer>
    </Layout>
  );
};
