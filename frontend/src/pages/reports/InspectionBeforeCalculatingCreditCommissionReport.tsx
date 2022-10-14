import { Card, Col, Table } from 'antd';
import { observer } from 'mobx-react-lite';
import { ReportFiltering } from '../../components/ReportLayout/ReportFiltering';
import { reportStore } from '../../stores/report-store';
import { dateFormat, numberFormat } from '../../utils';

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
            columns={[
              {
                title: 'ลำดับ',
                dataIndex: 'no',
                key: 'no',
                render: (_v, _r, i) => reportStore.getRunningNumber(i),
              },
              {
                title: 'ชื่อภาค',
                dataIndex: 'sectorName',
                key: 'sectorName',
              },
              {
                title: 'ศูนย์ควบคุม(81)',
                dataIndex: 'controlCenter',
                key: 'controlCenter',
              },
              {
                title: 'สาขาเจ้าของบัญชี',
                key: 'accountHolderBranch',
                dataIndex: 'accountHolderBranch',
              },
              {
                title: 'ชื่อประเภทสินเชื่อย่อย',
                key: 'loanCategoryName',
                dataIndex: 'loanCategoryName',
              },
              {
                title: 'เลขที่บัญชี',
                key: 'accountNo',
                dataIndex: 'accountNo',
              },
              {
                title: 'REPAY_METH_NAME',
                key: 'repayMethName',
                dataIndex: 'repayMethName',
              },
              {
                title: 'TRAN_NAME',
                key: 'tranName',
                dataIndex: 'tranName',
              },
              {
                title: 'ชื่อ-สกุล',
                key: 'name',
                dataIndex: 'name',
              },
              {
                title: 'วันที่เริ่มติดตาม',
                key: 'trackingStartDate',
                dataIndex: 'trackingStartDate',
                render: dateFormat,
              },
              {
                title: 'วันที่สิ้นสุดในการติดตาม',
                key: 'trackingEndDate',
                dataIndex: 'trackingEndDate',
                render: dateFormat,
              },
              {
                title: 'TRAN_DTNT (วันที่รับชำระ)',
                key: 'paymentDate',
                dataIndex: 'paymentDate',
                render: dateFormat,
              },
              {
                title: 'จำนวนเงินที่รับชำระ',
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
                title: 'Approve Status',
                key: 'approveStatus',
                dataIndex: 'approveStatus',
              },
              {
                title: 'ผู้อนุมัติ',
                key: 'approver',
                dataIndex: 'approver',
              },
            ]}
            dataSource={reportStore.data?.docs}
            loading={reportStore.loading}
            scroll={{ x: 2400 }}
            size="small"
          ></Table>
        </Card>
      </Col>
    </>
  );
};
export const InspectionBeforeCalculatingCreditCommissionReport = observer(Comp);
