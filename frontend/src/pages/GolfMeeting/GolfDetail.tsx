import React from 'react';
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
} from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import Logo from '../../assets/images/KPIS Logo.png';
import './GolfRoute.css';
import { useLocation, useNavigate } from 'react-router-dom';
export interface Props {
  baseURL: string;
}

export const GolfDetail: React.FC<Props> = ({
  baseURL,
}): React.ReactElement => {
  const navigate = useNavigate();
  const { state } = useLocation() as any;
  const nextstep = async () => {
    navigate(`/golfqrcode/${state.idactivity}/${state.applicationnumber}`, {
      state: state,
    });
  };

  return (
    <>
      <Row className="row">
        <Col xs={24} md={12} lg={12}>
          <Card className="card">
            <Row>
              <Col span={24}>
                <Image src={Logo} width={100} preview={false} />
              </Col>
              <Col span={24}>
                <Typography className="typotwotypo">รายละเอียดก๊วน</Typography>
              </Col>
              <Col span={24}>
                <Typography className="typothreetypo">
                  {`เลขใบสมัคร : ${state?.applicationnumber}`}
                </Typography>
              </Col>
              <Col span={24}>
                <Typography className="typothreetypo">
                  {`ชื่อก๊วน : ${state?.namegang}`}
                </Typography>
              </Col>
              <Col span={24}>
                <Typography className="typothreetypo">
                  {`ชื่อหัวหน้า : ${state?.ownergang}`}
                </Typography>
              </Col>
            </Row>
            <Divider></Divider>
            <Form layout="vertical">
              <Form.Item
                label={<div className="typotwotypo2">{`รายชื่อลูกก๊วน`}</div>}
              >
                <Typography
                  className="typothree2"
                  hidden={state?.member1 ? false : true}
                >{`${state?.member1}`}</Typography>
                <Typography
                  className="typothree2"
                  hidden={state?.member2 ? false : true}
                >{`${state?.member2}`}</Typography>
                <Typography
                  className="typothree2"
                  hidden={state?.member3 ? false : true}
                >{`${state?.member3}`}</Typography>
                <Typography
                  className="typothree2"
                  hidden={state?.member4 ? false : true}
                >{`${state?.member4}`}</Typography>
              </Form.Item>
            </Form>
            <Divider></Divider>
            <Row gutter={6}>
              <Col span={12}>
                <Button
                  type="primary"
                  className="buttonnext"
                  onClick={() => navigate(-1)}
                >
                  <ArrowRightOutlined rotate={180} /> ย้อนกลับ
                </Button>
              </Col>
              <Col span={12}>
                <Button
                  type="primary"
                  className="buttonnext"
                  onClick={nextstep}
                >
                  ถัดไป <ArrowRightOutlined />
                </Button>
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
