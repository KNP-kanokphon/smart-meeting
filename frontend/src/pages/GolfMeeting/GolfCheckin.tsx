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
  Modal,
} from 'antd';
import { ArrowRightOutlined, CheckCircleFilled } from '@ant-design/icons';
import Logo from '../../assets/images/KPIS Logo.png';
import './GolfRoute.css';
import { DatamanagementService } from '../../stores/meeting-store';
import { useParams } from 'react-router-dom';
import { now } from 'lodash';
import moment from 'moment';
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

interface Idetailplance {
  id: number;
  idactivity: string;
  activitytopic: string;
  activitydetails: string;
  scheduleactivity: string;
  locationactivity: string;
  typeactivity: string;
  dateacivity: string;
  createdAt: Date;
  updatedAt: Date;
}

export const GolfCheckin: React.FC<Props> = ({
  baseURL,
}): React.ReactElement => {
  const { idactivity } = useParams<{ idactivity: string }>();
  const { applicationnumber } = useParams<{ applicationnumber: string }>();
  const [loading, setLoading] = useState(true);
  const [dataSource, setdataSource] = useState<Idetail>();
  const [dataDetail, setDataDetail] = useState<Idetailplance>();
  const [valueActivity, setValueActivity] = useState<any>();
  useEffect(() => {
    checkdatetimeactivity().then((data: any) => {
      setDataDetail(data[0]);
      countDown(data[0]);
    });

    checkprofile().then(async (data: any) => {
      const datateam = await DatamanagementService().getactivitybyphone(
        data[0].phonenumberownergang,
      );
      setValueActivity(datateam);
      setLoading(false);
    });
  }, []);

  const checkdatetimeactivity = async () => {
    return new Promise(async (resolve, reject) => {
      resolve(await DatamanagementService().getcheckinmeactivity(idactivity));
    });
  };

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

  const countDown = async (data: any) => {
    console.log('success');
    console.log(moment(new Date()).format('YYYY-MM-DD') === data?.dateacivity);

    await DatamanagementService().activitycheckin(
      idactivity,
      applicationnumber,
    );
    let secondsToGo = 5;
    if (moment(new Date()).format('YYYY-MM-DD') === data?.dateacivity) {
      const modal = Modal.success({
        title: 'เช็คอิน',
        content: `จะปิดการแสดงผลภายในเวลา ${secondsToGo} วินาที.`,
      });

      const timer = setInterval(() => {
        secondsToGo -= 1;
        modal.update({
          content: `จะปิดการแสดงผลภายในเวลา ${secondsToGo} วินาที.`,
        });
      }, 1000);

      setTimeout(() => {
        clearInterval(timer);
        modal.destroy();
      }, secondsToGo * 1000);
    }
  };
  return loading && dataDetail ? (
    <Spin spinning={true}></Spin>
  ) : moment(new Date()).format('YYYY-MM-DD') === dataDetail?.dateacivity ? (
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
          </Card>
        </Col>
      </Row>
    </>
  ) : (
    <>
      <Row className="row">
        <Col>
          <Card className="cardinRowCheckin">
            <Row>
              <Col span={24}>
                <Image src={Logo} width={100} preview={false} />
              </Col>
              <br></br>
              <Col span={24}>
                <Typography className="typotwooooo">
                  กิจกรรม {dataDetail?.activitytopic}
                </Typography>{' '}
              </Col>
              <Col span={24}>
                <Typography className="typothree">
                  จะเริ่มในวันที่ {dataDetail?.dateacivity}
                </Typography>{' '}
              </Col>
              <Col span={24}>
                <Typography className="typothree">
                  ขออภัยในความไม่สะดวก
                </Typography>{' '}
              </Col>
            </Row>
          </Card>
          <Typography className="typofooter">
            ©2022 O S D Company Limited
          </Typography>
        </Col>
      </Row>
    </>
  );
};
