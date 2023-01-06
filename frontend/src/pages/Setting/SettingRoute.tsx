import { Card, Col, Row, Typography } from 'antd';
import {
  LineChartOutlined,
  DiffOutlined,
  CalendarOutlined,
  TeamOutlined,
  SettingOutlined,
  CaretRightOutlined,
  TableOutlined,
} from '@ant-design/icons';
import React from 'react';

export const SettingRoute: React.FC = (): React.ReactElement => {
  return (
    <>
      <Card>
        <Row gutter={16} justify={'start'}>
          <Col>
            <SettingOutlined style={{ fontSize: '24px' }} />
          </Col>
          <Col>
            <Typography style={{ fontWeight: 'bold', fontSize: '24px' }}>
              SETTING
            </Typography>
          </Col>
        </Row>
      </Card>
    </>
  );
};
