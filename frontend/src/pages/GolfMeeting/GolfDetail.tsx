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
export interface Props {
  baseURL: string;
}

const data = [
  {
    id: 1,
    name: 'คุณจิระศักดิ์ สุวรรณเศรษฐ์',
  },
  {
    id: 2,
    name: 'คุณจักรกฤษณ์ สุวรรณเศรษฐ์',
  },
  {
    id: 3,
    name: 'คุณนิวัฒน์ หัตถเกรียงไกร',
  },
  {
    id: 4,
    name: 'คุณณรงค์ชัย จีระธวัชชัย',
  },
];
export const GolfDetail: React.FC<Props> = ({
  baseURL,
}): React.ReactElement => {
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
                  {`เลขใบสมัคร : ${`001`}`}
                </Typography>
              </Col>
              <Col span={24}>
                <Typography className="typothreetypo">
                  {`ชื่อก๊วน : ${`มาราธอน`}`}
                </Typography>
              </Col>
              <Col span={24}>
                <Typography className="typothreetypo">
                  {`ชื่อหัวหน้า : ${`ดร.ธิติมา หล่อพิพัฒน์`}`}
                </Typography>
              </Col>
            </Row>
            {/* <Card className="cardinRow"> */}
            <Divider></Divider>
            <Form layout="vertical">
              <Form.Item
                label={<div className="typotwotypo2">{`รายชื่อลูกก๊วน`}</div>}
              >
                {data.map((e: any) => {
                  console.log(e);

                  return (
                    <>
                      <Typography className="typothree2">{`${e.id}.  ${e.name}`}</Typography>
                    </>
                  );
                })}
              </Form.Item>
            </Form>
            {/* </Card> */}
            <Divider></Divider>
            <Row gutter={6}>
              <Col span={12}>
                <Button type="primary" className="buttonnext">
                  <ArrowRightOutlined rotate={180} /> ย้อนกลับ
                </Button>
              </Col>
              <Col span={12}>
                <Button type="primary" className="buttonnext">
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
