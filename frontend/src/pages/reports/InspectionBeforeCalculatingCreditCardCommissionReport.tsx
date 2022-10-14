import { Card, Col, Table, TablePaginationConfig } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { observer } from 'mobx-react-lite';
import { ReportFiltering } from '../../components/ReportLayout/ReportFiltering';
import { reportStore } from '../../stores/report-store';
import { dateFormat, numberFormat } from '../../utils';

const columns: ColumnsType<any> = [
  {
    title: 'No.',
    dataIndex: 'no',
    key: 'no',
    render: (record: any, index: any, idx: number) => idx + 1,
  },
  {
    title: 'เลขที่บัตรประชาชน',
    dataIndex: 'identificationNumber',
    key: 'identificationNumber',
  },
  {
    title: 'คำนำหน้า',
    dataIndex: 'prefix',
    key: 'prefix',
  },
  {
    title: 'ชื่อ',
    key: 'firstName',
    dataIndex: 'firstName',
  },
  {
    title: 'นามสกุล',
    key: 'lastName',
    dataIndex: 'lastName',
  },
  {
    title: 'Customer NO',
    key: 'customerNo',
    dataIndex: 'customerNo',
  },
  {
    title: 'Account No',
    key: 'accountNo',
    dataIndex: 'accountNo',
  },
  {
    title: 'Card No',
    key: 'cardNo',
    dataIndex: 'cardNo',
  },
  {
    title: 'Billing Cycle',
    key: 'billingCycle',
    dataIndex: 'billingCycle',
    align: 'right',
    render: numberFormat,
  },
  {
    title: 'จำนวนวันค้าง (Provision Flag Cur)',
    key: 'overdueDays',
    dataIndex: 'overdueDays',
  },
  {
    title: 'วันที่เริ่มติดตาม',
    key: 'trackingStartDate',
    dataIndex: 'trackingStartDate',
    render: dateFormat,
  },
  {
    title: 'วันที่เริ่มติดตาม',
    key: 'trackingEndDate',
    dataIndex: 'trackingEndDate',
    render: dateFormat,
  },
  {
    title: 'วันที่ชำระหนี้',
    key: 'paymentDate',
    dataIndex: 'paymentDate',
    render: dateFormat,
  },
  {
    title: 'จำนวนเงินที่ชำระ)',
    key: 'paymentAmount',
    dataIndex: 'paymentAmount',
    align: 'right',
    render: numberFormat,
  },
  {
    title: 'จำนวนเงินที่แก้ไข',
    key: 'revisedAmount',
    dataIndex: 'revisedAmount',
    align: 'right',
    render: numberFormat,
  },
  {
    title: 'Transaction Code',
    key: 'transactionCode',
    dataIndex: 'transactionCode',
  },
  {
    title: 'Description',
    key: 'description',
    dataIndex: 'description',
  },
  {
    title: 'Approve Status',
    key: 'approveStatus',
    dataIndex: 'approveStatus',
  },
  {
    title: 'ผู้อนุมัติ',
    key: 'approver',
    dataIndex: 'approver',
  },
];

const Comp = () => {
  return (
    <>
      <Col span={24}>
        <ReportFiltering />
      </Col>
      <Col span={24}>
        <Card>
          <div style={{ padding: '0 20px' }}></div>
          <Table
            columns={columns}
            dataSource={reportStore.data?.docs}
            // pagination={reportStore.currentPagination}
            loading={reportStore.loading}
            onChange={(newPagination: TablePaginationConfig) => {
              reportStore.setPaginationParams(newPagination);
            }}
            scroll={{ x: 1800 }}
            size="small"
          ></Table>
        </Card>
      </Col>
    </>
  );
};

export const InspectionBeforeCalculatingCreditCardCommissionReport =
  observer(Comp);
