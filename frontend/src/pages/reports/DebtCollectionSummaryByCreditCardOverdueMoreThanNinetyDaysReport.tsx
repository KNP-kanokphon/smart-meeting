import { Card, Col, Form, Input, Table } from 'antd';
import { observer } from 'mobx-react-lite';
import { ReportFiltering } from '../../components/ReportLayout/ReportFiltering';
import { reportStore } from '../../stores/report-store';

const columns = [
  {
    title: 'S.No',
    dataIndex: 'sno',
    key: 'sno',
    onCell: (value: any) => ({ rowSpan: value.snoRowSpan }),
  },
  {
    title: 'OA',
    dataIndex: 'oa',
    key: 'oa',
  },
  {
    title: 'Paid Amount',
    dataIndex: 'paidAmt',
    key: 'paidAmt',
    children: [
      {
        title: 'number1',
        dataIndex: 'number1',
        key: 'number1',
      },
      {
        title: 'number2',
        dataIndex: 'number2',
        key: 'number2',
      },
      {
        title: 'number3',
        dataIndex: 'number3',
        key: 'number3',
      },
      {
        title: 'number4',
        dataIndex: 'number4',
        key: 'number4',
      },
    ],
  },
  {
    title: 'text',
    dataIndex: 'text',
    key: 'text',
    children: [
      {
        title: 'STM',
        dataIndex: 'stm',
        key: 'stm',
      },
      {
        title: 'percent',
        dataIndex: 'percent',
        key: 'percent',
      },
    ],
  },
  {
    title: 'Rank',
    dataIndex: 'rank',
    key: 'rank',
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

export const DebtCollectionSummaryByCreditCardOverdueMoreThanNinetyDaysReport =
  observer(Comp);
