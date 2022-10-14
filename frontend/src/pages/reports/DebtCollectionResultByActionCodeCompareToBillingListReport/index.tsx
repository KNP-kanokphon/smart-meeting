import { Card, Col, Table } from 'antd';
import { observer } from 'mobx-react-lite';
import { DebtCollectionFiltering } from '../../../components/ReportLayout/DebtCollectionFiltering';
import { reportStore } from '../../../stores/report-store';
import { dateFormat, numberFormat } from '../../../utils';
import styles from './DebtCollectionResultByActionCodeCompareToBillingListReport.module.scss';

const columns = [
  {
    title: 'No.',
    dataIndex: 'no',
    key: 'no',
    render: (record: any, index: any, idx: number) => idx + 1,
  },
  {
    title: 'OA',
    dataIndex: 'oa',
    key: 'oa',
  },
  {
    title: 'Card No.',
    dataIndex: 'cardNo',
    key: 'cardNo',
    render: (record: any) => record.replace(/.{8}$/g, 'XXXXXXXX'),
  },
  {
    title: 'Account No.',
    dataIndex: 'accountNo',
    key: 'accountNo',
    render: (record: any) => record.replace(record.substring(6, 11), 'XXXXXX'),
  },
  {
    title: 'Customer No.',
    dataIndex: 'customerNo',
    key: 'customerNo',
    render: (record: any) => record.replace(/.{8}$/g, 'XXXXXXXX'),
  },
  {
    title: 'วันที่เริ่มติดตาม',
    dataIndex: 'trackingStartDate',
    key: 'trackingStartDate',
    render: dateFormat,
  },
  {
    title: 'วันที่สิ้นสุดในการติดตาม',
    dataIndex: 'trackingEndDate',
    key: 'trackingEndDate',
    render: dateFormat,
  },
  {
    title: 'Account Status',
    dataIndex: 'accountStatus',
    key: 'accountStatus',
  },
  {
    title: 'Promise To Pay Date',
    dataIndex: 'promiseToPayDate',
    key: 'promiseToPayDate',
    render: dateFormat,
  },
  {
    title: 'Current Balance',
    dataIndex: 'currentBalance',
    key: 'currentBalance',
  },
  {
    title: 'Payment Date',
    dataIndex: 'paymentDate',
    key: 'paymentDate',
  },
  {
    title: 'Payment Amount',
    dataIndex: 'paymentAmount',
    key: 'paymentAmount',
    render: numberFormat,
  },
  {
    title: 'ชำระปิดบัญชี',
    dataIndex: 'isClosedDeal',
    key: 'isClosedDeal',
  },
  {
    title: 'Payment Amount For Calculate',
    dataIndex: 'paymentAmountForCalculate',
    key: 'paymentAmountForCalculate',
    render: numberFormat,
  },
  {
    title: 'อัตราค่าบริการติดตามหนี้ (%)',
    dataIndex: 'percentDebtTrackingFee',
    key: 'percentDebtTrackingFee',
    render: numberFormat,
  },
  {
    title: 'ค่าบริการติดตามหนี้ (บาท)',
    dataIndex: 'debtTrackingFee',
    key: 'debtTrackingFee',
    render: numberFormat,
  },
];

const Comp = () => (
  <>
    <Col span={24}>
      <DebtCollectionFiltering />
    </Col>
    <Col span={24}>
      <Card>
        <Table
          dataSource={reportStore.data?.docs}
          columns={columns}
          loading={reportStore.loading}
          scroll={{ x: 2500 }}
          summary={() => (
            <Table.Summary fixed>
              <Table.Summary.Row>
                <Table.Summary.Cell index={0} colSpan={14} />
                <Table.Summary.Cell
                  index={1}
                  className={styles.tableSummaryCellHead}
                >
                  Total
                </Table.Summary.Cell>
                <Table.Summary.Cell
                  index={2}
                  className={styles.tableSummaryCellTotal}
                ></Table.Summary.Cell>
              </Table.Summary.Row>
            </Table.Summary>
          )}
        />
      </Card>
    </Col>
  </>
);

export const DebtCollectionResultByActionCodeCompareToBillingListReport =
  observer(Comp);
