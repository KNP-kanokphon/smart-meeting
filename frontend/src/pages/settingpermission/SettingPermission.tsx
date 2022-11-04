import { Card, Col, Row } from 'antd';
import { SettingPermissionCourse } from './SettingPermissionCourse';
import { SettingPermissionPosition } from './SettingPermissionPosition';
import React from 'react';

interface EditableRowProps {
  index: number;
}

export const SettingPermission: React.FC = (): React.ReactElement => {
  return (
    <>
      <div style={{ width: '100%' }}>
        <Row gutter={16}>
          <Col span={12}>
            <SettingPermissionCourse />
          </Col>
          <Col span={12}>
            <SettingPermissionPosition />
          </Col>
        </Row>
      </div>
    </>
  );
};
