import {
  Card,
  Col,
  Form,
  Input,
  Table,
  Select,
  Button,
  Space,
  Row,
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import { DebtCollectionFiltering } from '../../components/ReportLayout/DebtCollectionFiltering';
import { reportStore } from '../../stores/report-store';
import { numberFormat } from '../../utils';

const { Option } = Select;

const columns = [
  {
    title: 'ลำดับ',
    dataIndex: 'no',
    key: 'no',
    render: (record: any, index: any, idx: number) => idx + 1,
  },
  {
    title: 'ชื่อพนักงาน',
    dataIndex: 'agentName',
    key: 'agentName',
  },
  {
    title: 'Loan Type',
    dataIndex: 'loanType',
    key: 'loanType',
  },
  {
    title: 'Account Status',
    dataIndex: 'accountStatus',
    key: 'accountStatus',
  },
  {
    title: 'ประเภทผลิตภัณฑ์',
    dataIndex: 'productType',
    key: 'productType',
  },
  {
    title: 'Assignment',
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
          <Row justify="end" style={{ paddingBottom: '20px' }}>
            <Col>
              <Space>
                <Form form={form} layout="inline">
                  <Form.Item name="filterType">
                    <Select
                      placeholder="Filter"
                      bordered={false}
                      style={{ width: 120 }}
                    >
                      <Option value="agentName">Agent Name</Option>
                      <Option value="loanType">Loan Type</Option>
                      <Option value="debtClass">ชั้นหนี้</Option>
                      <Option value="productType">Product Type</Option>
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

export const UntrackedDebtReport = observer(Comp);
