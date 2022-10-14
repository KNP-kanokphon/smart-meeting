import { Card, Col, Form, Input, Table } from 'antd';
import { observer } from 'mobx-react-lite';
import { ReportFiltering } from '../../components/ReportLayout/ReportFiltering';
import { reportStore } from '../../stores/report-store';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'mock',
    dataIndex: 'mock',
    key: 'Mock',
  },
];

const Comp = () => (
  <>
    <Col span={24}>
      <ReportFiltering
        extra={
          <Col>
            <Form.Item rules={[{ required: true }]} label="flag" name="flagll">
              <Input />
            </Form.Item>
          </Col>
        }
      />
    </Col>
    <Col span={24}>
      <Card>
        <Table
          dataSource={reportStore.data?.docs}
          columns={columns}
          loading={reportStore.loading}
        />
      </Card>
    </Col>
  </>
);

export const OaCompensationWithContractedDebtorReport = observer(Comp);
