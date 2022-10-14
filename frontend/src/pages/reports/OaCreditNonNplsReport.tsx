import { Card, Col, Table, TablePaginationConfig } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { observer } from 'mobx-react-lite';
import { ReportFiltering } from '../../components/ReportLayout/ReportFiltering';
import { reportStore } from '../../stores/report-store';
import { numberFormat } from '../../utils';

const columns: ColumnsType<any> = [
  {
    title: 'OA',
    dataIndex: 'oa_type',
    key: 'oa_type',
    onCell: (value: any) => ({ rowSpan: value.oaRowSpan }),
  },
  {
    title: 'Billing',
    dataIndex: 'billing',
    key: 'billing',
    onCell: (value: any) => ({ rowSpan: value.billingRowSpan }),
  },
  {
    title: 'Bucket',
    dataIndex: 'bucket',
    key: 'bucket',
  },
  {
    title: 'จำนวนบัญชีที่สั่ง',
    dataIndex: 'numberOfAccountSent',
    key: 'numberOfAccountSent',
    onCell: (value: any) => ({ rowSpan: value.numberOfAccountSentRowSpan }),
    align: 'right',
    render: numberFormat,
  },
  {
    title: 'จำนวนบัญชีที่ป้องกันการไหล',
    dataIndex: 'numberOfAccountProtect',
    key: 'numberOfAccountProtect',
    onCell: (value: any) => ({ rowSpan: value.numberOfAccountProtectRowSpan }),
    align: 'right',
    render: numberFormat,
  },
  {
    title: '% ป้องกันการไหล',
    dataIndex: 'percentageOfAccountProtect',
    key: 'percentageOfAccountProtect',
    onCell: (value: any) => ({
      rowSpan: value.percentageOfAccountProtectRowSpan,
    }),
    align: 'right',
    render: numberFormat,
  },
  {
    title: 'Number of customer',
    dataIndex: 'numberOfCustomer',
    key: 'numberOfCustomer',
    align: 'right',
    render: numberFormat,
  },
  {
    title: 'Payment amount',
    dataIndex: 'paymentAmount',
    key: 'paymentAmount',
    align: 'right',
    render: numberFormat,
  },
  {
    title: 'มากกว่า Minimum Payment',
    dataIndex: 'greaterThanMinimumPayment',
    key: 'greaterThanMinimumPayment',
    render: (text: boolean) => (text ? 'Yes' : 'No'),
  },
  {
    title: 'อัตราค่าบริการติดตามหนี้ (%)',
    dataIndex: 'trackingDebtFeePercentage',
    key: 'trackingDebtFeePercentage',
    align: 'right',
    render: numberFormat,
  },
  {
    title: 'ค่าบริการติดตามหนี้ (บาท)',
    dataIndex: 'trackingDebtFee',
    key: 'trackingDebtFee',
    align: 'right',
    render: numberFormat,
  },
];
const Comp = () => (
  <>
    <Col span={24}>
      <Card>
        <ReportFiltering />
      </Card>
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
export const OaCreditNonNplsReport = observer(Comp);
