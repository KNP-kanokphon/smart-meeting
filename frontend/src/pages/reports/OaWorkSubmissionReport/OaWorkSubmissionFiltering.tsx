import { Col, Form, Select } from 'antd';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { masterDataStore } from '../../../stores/master-data-store';
import { ReportFiltering } from '../../../components/ReportLayout/ReportFiltering';

const { Option } = Select;

const Comp: React.FC = () => (
  <ReportFiltering
    extra={
      <>
        <Col flex={1}>
          <Form.Item label="Supervisor" name="supervisorId">
            <Select showSearch allowClear>
              {masterDataStore.supervisors.map(x => (
                <Option key={x.userId} value={x.userId}>
                  {x.userName}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col flex={1}>
          <Form.Item label="Bank User" name="bankUserId">
            <Select showSearch allowClear>
              {masterDataStore.userBanks.map(x => (
                <Option key={x.userId} value={x.userId}>
                  {x.userName}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col flex={1}>
          <Form.Item label="บริษัทติดตามหนี้" name="companyId">
            <Select showSearch allowClear>
              {masterDataStore.oas.map(x => (
                <Option key={x.oaId} value={x.oaCode}>
                  {x.oaName}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </>
    }
  />
);

export const WorkSubmissionFiltering = observer(Comp);
