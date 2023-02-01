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
} from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import Logo from '../../assets/images/KPIS Logo.png';
import './GolfRoute.css';

export interface Props {
  baseURL: string;
}

export const GolfRoute: React.FC<Props> = ({ baseURL }): React.ReactElement => {
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
                <Space>
                  <Typography className="typotwo">Welcome to</Typography>
                  <Typography className="typofirst">KPIS Society</Typography>
                </Space>
              </Col>
              <Col span={24}>
                <Typography className="typothree">
                  Please check in for Generate your ticket
                </Typography>
              </Col>
            </Row>
            <Card className="cardinRow">
              <Form layout="vertical">
                <Form.Item
                  label={
                    <div className="labelform">
                      <Typography>หัวข้อการประชุม :</Typography>
                    </div>
                  }
                >
                  <Typography>Test</Typography>
                  <Space>
                    <Typography className="atypo">published at :</Typography>
                    <a href="https://www.kpi.ac.th/" className="alink">
                      www.kpi.ac.th
                    </a>
                  </Space>
                </Form.Item>

                <Form.Item
                  label={
                    <div className="labelform">
                      <Typography>ระเบียบวาระการประชุม :</Typography>
                    </div>
                  }
                >
                  <Typography>Test</Typography>
                </Form.Item>
              </Form>
            </Card>
            <Button type="primary" className="buttonnext">
              ต่อไป <ArrowRightOutlined />
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
