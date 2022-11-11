import { Layout, Button, Menu, Row, Col, Card, Checkbox } from 'antd';
import React, { useEffect, useState } from 'react';
import { Outlet, useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/auth';
import { useId24 } from '../../drivers/id24/Id24Provider';
import styles from './MainLayout.module.scss';
import { Logo } from './Logo';
import { DatamanagementService } from '../../stores/meeting-store';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

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
  const onChange = async () => {
    let statusFood = false;
    detailFoodUpdate.map((e: any) => {
      if (e.status === true) {
        statusFood = true;
      }
    });
    // const resultUpdate = await DatamanagementService().updateStatusFood(
    //   roomid,
    //   userid,
    //   statusFood,
    // );
    navigate(`/detailalready/${roomid}/${userid}`);
  };
  const receiveOrderfood = async (e: string, x: CheckboxChangeEvent) => {
    setDetailFoodUpdate([
      ...detailFoodUpdate,
      { name: e, status: x.target.checked },
    ]);
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
          padding: '0 50px',
          backgroundColor: '#F4FAF7',
          paddingTop: '30px',
          paddingBottom: '30px',
          height: '85vh',
        }}
      >
        <div className="site-card-wrapper">
          <Row gutter={16}>
            <Col span={7}></Col>
            <Col xs={24} sm={24} md={10} lg={10}>
              <Card style={{ textAlign: 'center' }}>
                <Row>
                  {/* <Col span={8}></Col> */}
                  <Col xs={24} sm={24} md={24} lg={24}>
                    <Logo />
                  </Col>
                  {/* <Col span={8}></Col> */}
                </Row>
                <br></br>
                <Row>
                  {/* <Col span={2}></Col> */}
                  <Col xs={24} sm={24} md={24} lg={24}>
                    <b style={{ fontSize: '100%' }}>Welcome to </b>
                    <b style={{ fontSize: '100%', color: 'red' }}>
                      KPIS Society
                    </b>
                  </Col>
                  {/* <Col span={2}></Col> */}
                </Row>
                <Row>
                  {/* <Col span={2}></Col> */}
                  <Col
                    xs={24}
                    sm={24}
                    md={24}
                    lg={24}
                    style={{ fontSize: '100%' }}
                  >
                    Please check in for Generate your ticket
                  </Col>
                  {/* <Col span={2}></Col> */}
                </Row>
                <br></br>
                <Row>
                  <Col span={7}></Col>
                  <Col
                    xs={24}
                    sm={24}
                    md={8}
                    lg={8}
                    style={{
                      textAlign: 'left',
                      fontSize: '100%',
                      paddingLeft: '20px',
                      paddingRight: '20px',
                    }}
                  >
                    <b>{'อาหารและเครื่องดื่ม'}</b>
                    <br></br>
                    {food?.map((e: any, i: number) => {
                      return (
                        <Row>
                          <Col span={12}>{e.namefood}</Col>
                          <Col span={12}>
                            <Checkbox
                              onChange={x => receiveOrderfood(e.namefood, x)}
                            >
                              รับ
                            </Checkbox>
                          </Col>
                        </Row>
                      );
                    })}
                  </Col>
                  <Col span={8}></Col>
                </Row>

                <br></br>
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
                      Submit
                    </Button>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col span={8}></Col>
          </Row>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center', backgroundColor: '#F4FAF7' }}>
        ©2022 O S D Company Limited
      </Footer>
    </Layout>
  );
};
