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
export const GolfForm: React.FC<Props> = ({ baseURL }): React.ReactElement => {
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
                <Typography className="typotwo">กรอกรายละเอียดก๊วน</Typography>
              </Col>
              <Col span={24}>
                <Typography className="typothree">
                  ท่านสามารถมีลูกก๊วนได้ 4 คน เท่านั้น
                </Typography>
              </Col>
            </Row>
            <Card className="cardinRow">
              <Form layout="vertical">
                <Form.Item label={'ชื่อหัวหน้าก๊วน'} required>
                  <Input placeholder="Text"></Input>
                </Form.Item>
                <Form.Item label={'ชื่อก๊วนของท่าน'} required>
                  <Input placeholder="Text"></Input>
                </Form.Item>
                <Form.Item label={'ชื่อลูกก๊วนคนที่ 1'} required>
                  <Input placeholder="Text"></Input>
                </Form.Item>
                <Form.Item label={'ชื่อลูกก๊วนคนที่ 2'} required>
                  <Input placeholder="Text"></Input>
                </Form.Item>
                <Form.Item label={'ชื่อลูกก๊วนคนที่ 3'} required>
                  <Input placeholder="Text"></Input>
                </Form.Item>
              </Form>
            </Card>
            <Button type="primary" className="buttonnext">
              ถัดไป <ArrowRightOutlined />
            </Button>
          </Card>
          <Typography className="typofooter">
            ©2022 O S D Company Limited
          </Typography>
        </Col>
      </Row>
    </>
  );
};
