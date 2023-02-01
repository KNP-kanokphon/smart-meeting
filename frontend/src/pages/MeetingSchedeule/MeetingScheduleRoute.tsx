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
import { TableUpcomingmeeting } from './table/TableUpcoming';

const { Title } = Typography;
export const MeetingScheduleRoute: React.FC = (): React.ReactElement => {
  return (
    <Row
      gutter={[
        { xs: 8, sm: 16 },
        { xs: 8, sm: 16 },
      ]}
    >
      <Card style={{ width: '100%', textAlign: 'left', marginBottom: '10px' }}>
        <Title style={{ color: 'black', fontSize: '24px', fontWeight: 'bold' }}>
          แผนการประชุม
        </Title>
      </Card>
      <TableToday />
      <TableUpcomingmeeting />
      <TableLast />
    </Row>
  );
};
