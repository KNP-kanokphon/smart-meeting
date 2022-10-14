import { Card, Col, Table, TablePaginationConfig } from 'antd';
import { observer } from 'mobx-react-lite';
import { ColumnsType } from 'antd/es/table';
import { ReportFiltering } from '../../components/ReportLayout/ReportFiltering';
import { reportStore } from '../../stores/report-store';
import { dateFormat, numberFormat } from '../../utils';

const columns: ColumnsType<any> = [
  {
    title: 'วันที่',
    dataIndex: 'date',
    key: 'date',
    render: dateFormat,
  },
  {
    title: 'เลขบัญชี',
    dataIndex: 'accountNumber',
    key: 'accountNumber',
  },
  {
    title: 'ประเภทสินเชื่อ',
    dataIndex: 'loanType',
    key: 'loanType',
  },
  {
    title: 'สถานะชั้นหนี้/สถานะติดหนี้สูญ',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: 'Billing',
    dataIndex: 'billing',
    key: 'billing',
  },
  {
    title: 'DPD',
    dataIndex: 'daysPastDue',
    key: 'daysPastDue',
  },
  {
    title: 'รวมดอกเบี้ยคงเหลือ',
    dataIndex: 'remainingInterest',
    key: 'remainingInterest',
    align: 'right',
    render: numberFormat,
  },
  {
    title: 'จำนวนเงินค้างชำระ Statement (Non)/current(NPLs)',
    dataIndex: 'remainingAmount',
    key: 'remainingAmount',
    align: 'right',
    render: numberFormat,
  },
  {
    title: 'จำนวนเงินขั้นต่ำ',
    dataIndex: 'minimumAmount',
    key: 'minimumAmount',
    align: 'right',
    render: numberFormat,
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
          pagination={reportStore.currentPagination}
          columns={columns}
          loading={reportStore.loading}
          onChange={(newPagination: TablePaginationConfig) => {
            reportStore.setPaginationParams(newPagination);
          }}
        />
      </Card>
    </Col>
  </>
);

export const OaUnlistedOutstandingDebtAccountReport = observer(Comp);
