import React, { useState, useEffect } from 'react';
import {
  Card,
  Row,
  Typography,
  List,
  Skeleton,
  Button,
  // Avatar,
  Input,
  Col,
  Popover,
  DatePicker,
  Space,
  Select,
  Table,
} from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import { TableLast } from './table/Tablelast';
import { TableToday } from './table/Tabletoday';

export const MeetingScheduleRoute: React.FC = (): React.ReactElement => {
  const { Title } = Typography;
  const contentToday = (
    <>
      <Row gutter={16}>
        <Col span={24}>
          <Button style={{ border: 'none', width: '100%', textAlign: 'left' }}>
            Edit
          </Button>
        </Col>
        <Col span={24}>
          <Button
            style={{
              border: 'none',
              color: 'red',
              width: '100%',
              textAlign: 'left',
            }}
          >
            Delete
          </Button>
        </Col>
      </Row>
    </>
  );

  return (
    <Row
      gutter={[
        { xs: 8, sm: 16 },
        { xs: 8, sm: 16 },
      ]}
    >
      <Card style={{ width: '100%', textAlign: 'left', marginBottom: '10px' }}>
        <Title style={{ color: 'black', fontSize: '24px', fontWeight: 'bold' }}>
          MEETING SCHEDULE
        </Title>
      </Card>
      <TableToday />
      <TableLast />
    </Row>
  );
};
