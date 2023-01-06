import { Layout, Button, Menu, Row, Col, Card, Checkbox, Form } from 'antd';
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

export const DetailFood: React.FC<Props> = ({ baseURL }) => {
  const { roomid } = useParams<{ roomid: string }>();
  const { userid } = useParams<{ userid: string }>();
  const [form] = Form.useForm();
  const [meetingData, setMeetingData] = useState<MeetingInterface>();
  const [detailFoodUpdate, setDetailFoodUpdate] = useState<any>([]);
  const [food, setFood] = useState<any>();
  useEffect(() => {
    getDataProfile();
  }, []);
  const getDataProfile = async () => {
    const result = await DatamanagementService().getDetailfood(roomid);
    setFood(result);
  };

  const navigate = useNavigate();
  const onChange = async (values: any) => {
    form.validateFields().then(async values => {
      const status: boolean = values['food-detail'].length > 0 ? true : false;
      await DatamanagementService().updateStatusFood(roomid, userid, status);
    });

    // const resultUpdate = await DatamanagementService().updateStatusFood(
    //   roomid,
    //   userid,
    //   statusFood,
    // );
    navigate(`/stepthree/${roomid}/${userid}`);
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

      <Content
        style={{
          padding: '30px 30px',
          backgroundColor: '#F4FAF7',
          paddingTop: '20px',
          // paddingBottom: '30px',
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
                <Form name="validate_other" onFinish={onFinish} form={form}>
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
                      <b>{'อาหารและเครื่องดื่ม'}</b>

                      <Form.Item name="food-detail">
                        <Checkbox.Group>
                          {food?.map((e: any, i: number) => {
                            return (
                              <Row gutter={16}>
                                <Col span={20}>{e.namefood}</Col>
                                <Col span={4}>
                                  <Checkbox
                                    value={e.namefood}
                                    // onChange={x =>
                                    //   receiveOrderfood(e.namefood, x, i)
                                    // }
                                  >
                                    รับ
                                  </Checkbox>
                                </Col>
                              </Row>
                            );
                          })}
                        </Checkbox.Group>
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
      <Footer style={{ textAlign: 'center', backgroundColor: '#F4FAF7' }}>
        ©2022 O S D Company Limited
      </Footer>
    </Layout>
  );
};
