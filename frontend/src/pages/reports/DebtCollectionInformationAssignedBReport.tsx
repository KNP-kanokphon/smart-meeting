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
import { reportStore } from '../../stores/report-store';
import { DebtCollectionAssignmentFiltering } from '../../components/ReportLayout/DebtCollectionAssignmentFiltering';
import { dateFormat, numberFormat } from '../../utils';

const { Option } = Select;

const columns = [
  {
    title: 'วันที่',
    dataIndex: 'date',
    key: 'date',
    render: dateFormat,
  },
  {
    title: 'Loan Type',
    dataIndex: 'loanType',
    key: 'loanType',
  },
  {
    title: 'Product Type',
    dataIndex: 'productType',
    key: 'productType',
  },
  {
    title: 'ชั้นหนี้',
    dataIndex: 'debtClass',
    key: 'debtClass',
  },
  {
    title: 'DPD',
    dataIndex: 'dpd',
    key: 'dpd',
  },
  {
    title: 'ยอดเงินเรียกเก็บ',
    dataIndex: 'collectionAmount',
    key: 'collectionAmount',
    render: numberFormat,
  },
  {
    title: 'จำนวนเงินต้นคงเหลือ',
    dataIndex: 'remainingPrincipalAmount',
    key: 'remainingPrincipalAmount',
    render: numberFormat,
  },
  {
    title: 'รวมดอกเบี้ยคงเหลือ',
    dataIndex: 'remainingInterest',
    key: 'remainingInterest',
    render: numberFormat,
  },
  {
    title: 'จำนวนเงินดอกเบี้ยปรับ',
    dataIndex: 'adjustedInterestAmount',
    key: 'adjustedInterestAmount',
    render: numberFormat,
  },
  {
    title: 'ค่าใช้จ่าย',
    dataIndex: 'expenses',
    key: 'expenses',
    render: numberFormat,
  },
  {
    title: 'จำนวนเงินค้างชำระ',
    dataIndex: 'outstandingDebt',
    key: 'outstandingDebt',
    render: numberFormat,
  },
];

const Comp = () => {
  const [form] = Form.useForm();

  return (
    <>
      <Col span={24}>
        <DebtCollectionAssignmentFiltering />
      </Col>
      <Col span={24}>
        <Card>
          <Row justify="space-between" style={{ paddingBottom: '20px' }}>
            <Col>
              <b>รายชื่อผู้ใช้งานของธนาคาร</b>
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
                      <Option value="loanType">Loan Type</Option>
                      <Option value="productType">Product Type</Option>
                      <Option value="debtClass">ชั้นหนี้</Option>
                      <Option value="dpd">DPD</Option>
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
          />
        </Card>
      </Col>
    </>
  );
};

export const DebtCollectionInformationAssignedBReport = observer(Comp);
