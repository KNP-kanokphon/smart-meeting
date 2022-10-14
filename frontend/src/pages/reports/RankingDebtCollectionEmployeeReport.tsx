import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  Table,
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import styles from './DashboardOverallOutstandingDebtCreditCardWriteOff/DashboardOverallOutstandingDebtCreditCardWriteOff.module.scss';
import { DebtCollectionFiltering } from '../../components/ReportLayout/DebtCollectionFiltering';
import { reportStore } from '../../stores/report-store';
import { numberFormat } from '../../utils';

const { Option } = Select;

const columns = [
  {
    title: 'No.',
    dataIndex: 'no',
    key: 'no',
    render: (record: any, index: any, idx: number) => idx + 1,
  },
  {
    title: 'รหัสพนักงาน',
    dataIndex: 'employeeId',
    key: 'employeeId',
  },
  {
    title: 'ชื่อพนักงาน',
    dataIndex: 'employeeName',
    key: 'employeeName',
  },
  {
    title: 'ประเภทงาน',
    dataIndex: 'loanType',
    key: 'loanType',
  },
  {
    title: 'ประเภทการติดตาม',
    dataIndex: 'accountStatus',
    key: 'accountStatus',
  },
  {
    title: 'Assignment',
    className: styles.highlightColumn,
    children: [
      {
        title: 'A/C',
        dataIndex: 'assignmentAc',
        key: 'assignmentAc',
      },
      {
        title: 'OS BAL',
        dataIndex: 'assignmentOsBal',
        key: 'assignmentOsBal',
        render: numberFormat,
      },
    ],
  },
  {
    title: 'Target Office',
    dataIndex: 'targetOffice',
    key: 'targetOffice',
  },
  {
    title: 'Total Collected',
    className: styles.highlightColumn,
    children: [
      {
        title: 'A/C',
        dataIndex: 'totalCollectedAc',
        key: 'totalCollectedAc',
      },
      {
        title: 'OS BAL',
        dataIndex: 'totalCollectedOsBal',
        key: 'totalCollectedOsBal',
        render: numberFormat,
      },
    ],
  },
  {
    title: '%To Target',
    dataIndex: 'percentToTarget',
    key: 'percentToTarget',
    render: numberFormat,
  },
  {
    title: 'Rank',
    dataIndex: 'rank',
    key: 'rank',
  },
  {
    title: '02/2022',
    className: styles.highlightColumn,
    children: [
      {
        title: 'A/C',
        dataIndex: 'firstMonthAc',
        key: 'firstMonthAc',
      },
      {
        title: 'Collect Amt',
        dataIndex: 'firstMonthAmt',
        key: 'firstMonthAmt',
        render: numberFormat,
      },
    ],
  },
  {
    title: '01/2022',
    className: styles.highlightColumn,
    children: [
      {
        title: 'A/C',
        dataIndex: 'secondMonthAc',
        key: 'secondMonthAc',
      },
      {
        title: 'Collect Amt',
        dataIndex: 'secondMonthAmt',
        key: 'secondMonthAmt',
        render: numberFormat,
      },
    ],
  },
  {
    title: '12/2021',
    className: styles.highlightColumn,
    children: [
      {
        title: 'A/C',
        dataIndex: 'thirdMonthAc',
        key: 'thirdMonthAc',
      },
      {
        title: 'Collect Amt',
        dataIndex: 'thirdMonthAmt',
        key: 'thirdMonthAmt',
        render: numberFormat,
      },
    ],
  },
];

const Comp = () => {
  const [form] = Form.useForm();

  return (
    <>
      <Col span={24}>
        <DebtCollectionFiltering />
      </Col>
      <Col span={24}>
        <Card>
          <Row justify="space-between" style={{ paddingBottom: '20px' }}>
            <Col>
              <b>รายงานการจัดอันดับการติดตามงานของ Collector ณ เดือน 03/2022</b>
            </Col>
            <Col>
              <Space>
                <Form form={form} layout="inline">
                  <Form.Item name="filterType">
                    <Select
                      placeholder="Filter"
                      bordered={false}
                      style={{ width: 120 }}
                    >
                      <Option value="employeeId">รหัสพนักงาน</Option>
                      <Option value="employeeName">ชื่อพนักงาน</Option>
                      <Option value="workType">ประเภทงาน</Option>
                      <Option value="trackingType">ประเภทการติดตาม</Option>
                      <Option value="targetOffice">Target Office</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item name="searchText" style={{ marginRight: 0 }}>
                    <Input placeholder="Input search text" />
                  </Form.Item>

                  <Form.Item>
                    <Button icon={<SearchOutlined />} />
                  </Form.Item>
                </Form>
              </Space>
            </Col>
          </Row>
          <Table
            dataSource={reportStore.data?.docs}
            columns={columns}
            loading={reportStore.loading}
            scroll={{ x: 2000 }}
          />
        </Card>
      </Col>
    </>
  );
};

export const RankingDebtCollectionEmployeeReport = observer(Comp);
