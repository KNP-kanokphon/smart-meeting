import { Card, Col, Table } from 'antd';
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
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
];

const Comp = () => (
  <>
    <Col span={24}>
      <ReportFiltering />
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

export const OaCompensationNonNplsReport = observer(Comp);
