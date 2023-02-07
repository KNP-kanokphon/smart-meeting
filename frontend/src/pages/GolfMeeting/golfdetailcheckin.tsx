import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Row,
  Typography,
  Image,
  Form,
  Space,
  Divider,
  Input,
  Spin,
} from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import Logo from '../../assets/images/KPIS Logo.png';
import './GolfRoute.css';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { DatamanagementService } from '../../stores/meeting-store';
export interface Props {
  baseURL: string;
}
interface Idetail {
  id?: number;
  idactivity: string;
  applicationnumber: string;
  phonenumberownergang: string;
  namegang: string;
  schedulematch: string;
  paymentstatus: boolean;
  ownergang: string;
  member1: string;
  phonenumbermember1: string;
  member2: string;
  phonenumbermember2: string;
  member3: string;
  phonenumbermember3: string;
  member4: string;
  phonenumbermember4: string;
  checkinstatus: boolean;
  sendsmsstatus: boolean;
}

export const Golfdetailcheckin: React.FC<Props> = ({
  baseURL,
}): React.ReactElement => {
  const navigate = useNavigate();
  const { state } = useLocation() as any;
  const { idactivity } = useParams<{ idactivity: string }>();
  const { applicationnumber } = useParams<{ applicationnumber: string }>();

  const [loading, setLoading] = useState(true);
  const [dataSource, setdataSource] = useState<Idetail>();
  const [valueActivity, setValueActivity] = useState<any>([]);
  useEffect(() => {
    checkprofile().then(async (data: any) => {
      const datateam = await DatamanagementService().getactivitybyphone(
        data[0].phonenumberownergang,
      );
      setValueActivity(datateam);
      setLoading(false);
    });
  }, []);

  const checkprofile = async () => {
    return new Promise(async (resolve, reject) => {
      resolve(
        await DatamanagementService().getactivitybyid(
          idactivity,
          applicationnumber,
        ),
      );
    });
  };

  return loading && valueActivity ? (
    <Spin spinning={true}></Spin>
  ) : (
    <>
      <Row className="row">
        <Col xs={24} md={12} lg={12}>
          <Card className="cardinRowCheckin">
            <Row>
              <Col span={24}>
                <CheckCircleFilled
                  style={{
                    color: '#1E6541',
                    fontSize: '100px',
                  }}
                  size={50}
                />
              </Col>
              <Col span={24}>
                <Typography className="typothreetypopo">
                  {`เช็คอินเรียบร้อย`}
                </Typography>
              </Col>
              {valueActivity.map((data: any) => {
                return (
                  <>
                    <Card className="card">
                      <Col span={24}>
                        <Typography className="typotwotypo">
                          รายละเอียดก๊วน
                        </Typography>
                      </Col>
                      <Col span={24}>
                        <Typography className="typothreetypo">
                          {`เลขใบสมัคร : ${data?.applicationnumber}`}
                        </Typography>
                      </Col>
                      <Col span={24}>
                        <Typography className="typothreetypo">
                          {`ชื่อก๊วน : ${data?.namegang}`}
                        </Typography>
                      </Col>
                      <Col span={24}>
                        <Typography className="typothreetypo">
                          {`ชื่อหัวหน้า : ${data?.ownergang}`}
                        </Typography>
                      </Col>

                      <Col span={24}>
                        <Typography
                          className="typothree2"
                          hidden={data?.member1 ? false : true}
                        >{`${data?.member1}`}</Typography>
                      </Col>
                      <Col span={24}>
                        <Typography
                          className="typothree2"
                          hidden={data?.member2 ? false : true}
                        >{`${data?.member2}`}</Typography>
                      </Col>
                      <Col span={24}>
                        <Typography
                          className="typothree2"
                          hidden={data?.member3 ? false : true}
                        >{`${data?.member3}`}</Typography>
                      </Col>
                      <Col span={24}>
                        <Typography
                          className="typothree2"
                          hidden={data?.member4 ? false : true}
                        >{`${data?.member4}`}</Typography>
                      </Col>

                      <Col span={24}>
                        <Typography className="typotwotypo">
                          ตารางการแข่งขัน
                        </Typography>
                      </Col>
                      <Col>
                        <Typography className="typothree2">{`${data?.schedulematch}`}</Typography>
                      </Col>
                    </Card>
                  </>
                );
              })}
            </Row>
            {/* <Row>
              <Col span={24}>
                <CheckCircleFilled
                  style={{
                    color: '#1E6541',
                    fontSize: '100px',
                  }}
                  size={50}
                />
              </Col>
              <Col span={24}>
                <Typography className="typothreetypopo">
                  {`เช็คอินเรียบร้อย`}
                </Typography>
              </Col>
              <Col span={24}>
                <Typography className="typotwotypo">รายละเอียดก๊วน</Typography>
              </Col>
              <Col span={24}>
                <Typography className="typothreetypo">
                  {`เลขใบสมัคร : ${dataSource?.applicationnumber}`}
                </Typography>
              </Col>
              <Col span={24}>
                <Typography className="typothreetypo">
                  {`ชื่อก๊วน : ${dataSource?.namegang}`}
                </Typography>
              </Col>
              <Col span={24}>
                <Typography className="typothreetypo">
                  {`ชื่อหัวหน้า : ${dataSource?.ownergang}`}
                </Typography>
              </Col>
            </Row> */}

            {/* <Divider></Divider> */}
            {/* <Form layout="vertical">
              <Form.Item
                label={<div className="typotwotypo2">{`รายชื่อลูกก๊วน`}</div>}
              >
                <Typography
                  className="typothree2"
                  hidden={dataSource?.member1 ? false : true}
                >{`${dataSource?.member1}`}</Typography>
                <Typography
                  className="typothree2"
                  hidden={dataSource?.member2 ? false : true}
                >{`${dataSource?.member2}`}</Typography>
                <Typography
                  className="typothree2"
                  hidden={dataSource?.member3 ? false : true}
                >{`${dataSource?.member3}`}</Typography>
                <Typography
                  className="typothree2"
                  hidden={dataSource?.member4 ? false : true}
                >{`${dataSource?.member4}`}</Typography>
              </Form.Item>
              <Divider></Divider>
              <Form.Item
                label={<div className="typotwotypo2">{`ตารางการแข่งขัน`}</div>}
              >
                <Typography className="typothree2">{`${dataSource?.schedulematch}`}</Typography>
              </Form.Item>
            </Form> */}

            {/* <Divider></Divider> */}
            {/* <Button type="primary" className="buttonnext">
              <ArrowRightOutlined rotate={180} /> ย้อนกลับ
            </Button> */}
          </Card>
          <Typography className="typofooter">
            ©2022 O S D Company Limited
          </Typography>
        </Col>
      </Row>
    </>
  );
};
