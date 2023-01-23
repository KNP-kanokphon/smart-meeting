import {
  Layout,
  Button,
  Menu,
  Row,
  Col,
  Card,
  Checkbox,
  Form,
  Switch,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { Outlet, useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/auth';
import { useId24 } from '../../drivers/id24/Id24Provider';
import styles from './MainLayout.module.scss';
import { Logo } from './Logo';
import { DatamanagementService } from '../../stores/meeting-store';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { ArrowRightOutlined } from '@ant-design/icons';

const { Content, Sider, Header, Footer } = Layout;
export interface Props {
  baseURL: string;
}
interface MeetingInterface {
  id: number;
  title: string;
  room: string;
  floor: string;
  building: string;
  meetingplace: string;
  day: string;
  starttime: string;
  endtime: string;
  uuid: string;
  detail: string;
}
interface IProfile {
  id: number;
  username: string;
  uuidprofile: string;
  idmeeting: string;
  type: string;
  type_user: string;
  position: string[];
  phone?: string;
  email?: string;
  model?: string;
  confirm: boolean;
  checkin: boolean;
  foodstatus: boolean;
  signature?: string;
  username_eng?: string;
  line?: string;
  uuidposition: string[];
  gifstatus?: boolean;
}

export const DetailFood: React.FC<Props> = ({ baseURL }) => {
  const { roomid } = useParams<{ roomid: string }>();
  const { userid } = useParams<{ userid: string }>();
  const [form] = Form.useForm();
  const [meetingData, setMeetingData] = useState<MeetingInterface>();
  const [detailFoodUpdate, setDetailFoodUpdate] = useState<any>([]);
  const [food, setFood] = useState<any>();
  const [profileuser, setProfileuser] = useState<IProfile>();
  const [reciveFood, setRecivefood] = useState<boolean>(false);
  const [recivegift, setRecivegift] = useState<boolean>(false);

  useEffect(() => {
    getDataProfile();
  }, []);

  const getDataProfile = async () => {
    const result = await DatamanagementService().getDetailfood(roomid);
    const resultStatusprofile = await DatamanagementService().getStatusProfile(
      roomid,
      userid,
    );
    setRecivefood(resultStatusprofile[0].foodstatus);
    setProfileuser(resultStatusprofile[0]);
    setFood(result);
  };

  const navigate = useNavigate();

  const onChange = async (values: any) => {
    await DatamanagementService().updateStatusFood(
      roomid,
      userid,
      reciveFood,
      recivegift,
    );
    navigate(`/stepthree/${roomid}/${userid}`);
  };
  const onChangeFood = (checked: boolean) => {
    setRecivefood(checked);
  };
  const onChangeGift = (checked: boolean) => {
    setRecivegift(checked);
  };

  const receiveOrderfood = async (
    e: string,
    x: CheckboxChangeEvent,
    i: number,
  ) => {
    setDetailFoodUpdate([
      {
        id: i,
        name: e,
        status: x.target.checked,
      },
    ]);
  };
  const onFinish = (values: any) => {
    // console.log('Received values of form: ', values);
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
      {profileuser && (
        <Content
          style={{
            padding: '30px 30px',
            backgroundColor: '#F4FAF7',
            paddingTop: '20px',
            // paddingBottom: '30px',
            height: '85vh',
            overflowY: 'scroll',
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
                  <Row style={{ marginBottom: '10px' }}>
                    <Col xs={24} sm={24} md={24} lg={24}>
                      <Logo />
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col xs={24} sm={24} md={24} lg={24}>
                      <b style={{ fontSize: '18px' }}>Welcome to </b>
                      <b style={{ fontSize: '18px', color: 'red' }}>
                        KPIS Society
                      </b>
                    </Col>
                  </Row>
                  <Row gutter={16} style={{ marginBottom: '10px' }}>
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
                  <Form
                    name="validate_other"
                    onFinish={onFinish}
                    form={form}
                    layout="vertical"
                  >
                    <Row>
                      <Col
                        xs={24}
                        sm={24}
                        md={8}
                        lg={8}
                        style={{
                          textAlign: 'left',
                          fontSize: '100%',
                          paddingLeft: '10px',
                          paddingRight: '10px',
                        }}
                      >
                        <Form.Item
                          name="food-detail"
                          label={<b>อาหารและเครื่องดื่ม</b>}
                        >
                          {food?.map((e: any, i: number) => {
                            return (
                              <Row key={i} gutter={16}>
                                <Col span={20}>{e.namefood}</Col>
                                <Col span={4}></Col>
                              </Row>
                            );
                          })}

                          <Switch
                            onChange={onChangeFood}
                            checkedChildren="รับ"
                            unCheckedChildren="ไม่รับ"
                            defaultChecked={profileuser?.foodstatus}
                          />
                        </Form.Item>
                        <Form.Item name="gift" label={<b>ของชำร่วย</b>}>
                          <Switch
                            onChange={onChangeGift}
                            checkedChildren="รับ"
                            unCheckedChildren="ไม่รับ"
                            defaultChecked={
                              profileuser?.gifstatus === null
                                ? false
                                : profileuser?.gifstatus
                            }
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form>
                  {/* <br></br> */}
                  <Row>
                    <Col span={24}>
                      <Button
                        style={{
                          textAlign: 'center',
                          width: 'auto',
                          backgroundColor: '#1E6541',
                          color: '#ffffff',
                        }}
                        onClick={onChange}
                      >
                        <ArrowRightOutlined /> ต่อไป
                      </Button>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </div>
        </Content>
      )}

      <Footer style={{ textAlign: 'center', backgroundColor: '#F4FAF7' }}>
        ©2022 O S D Company Limited
      </Footer>
    </Layout>
  );
};
