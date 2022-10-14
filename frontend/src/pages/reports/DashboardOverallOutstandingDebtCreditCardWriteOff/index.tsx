import { Card, Col, Table, TablePaginationConfig } from 'antd';
import { observer } from 'mobx-react-lite';
import { DashboardPaymentCreditCardDebtFiltering } from '../../../components/ReportLayout/DashboardPaymentCreditCardDebtFiltering';
import styles from './DashboardOverallOutstandingDebtCreditCardWriteOff.module.scss';
import { reportStore } from '../../../stores/report-store';

const columns = [
  {
    title: 'ประเภทบัตร',
    dataIndex: 'cardType',
    key: 'cardType',
  },
  {
    title: 'Total: 1 DPD -Write Off',
    className: styles.highlightColumn,
    children: [
      {
        title: 'Account',
        dataIndex: 'accountTotal',
        key: 'accountTotal',
      },
      {
        title: '% Account',
        dataIndex: 'percentAccountTotal',
        key: 'percentAccountTotal',
      },
      {
        title: 'Outstanding',
        dataIndex: 'outstandingTotal',
        key: 'outstandingTotal',
      },
      {
        title: '% Outstanding',
        dataIndex: 'percentOutstandingTotal',
        key: 'percentOutstandingTotal',
      },
    ],
  },
  {
    title: 'P1: 1-30 DPD',
    className: styles.highlightColumn,
    children: [
      {
        title: 'Account',
        dataIndex: 'accountP1',
        key: 'accountP1',
      },
      {
        title: '% Account',
        dataIndex: 'percentAccountP1',
        key: 'percentAccountP1',
      },
      {
        title: 'Outstanding',
        dataIndex: 'outstandingP1',
        key: 'outstandingP1',
      },
      {
        title: '% Outstanding',
        dataIndex: 'percentOutstandingP1',
        key: 'percentOutstandingP1',
      },
    ],
  },
  {
    title: 'SM2: 31-60 DPD',
    className: styles.highlightColumn,
    children: [
      {
        title: 'Account',
        dataIndex: 'accountSm2',
        key: 'accountSm2',
      },
      {
        title: '% Account',
        dataIndex: 'percentAccountSm2',
        key: 'percentAccountSm2',
      },
      {
        title: 'Outstanding',
        dataIndex: 'outstandingSm2',
        key: 'outstandingSm2',
      },
      {
        title: '% Outstanding',
        dataIndex: 'percentOutstandingSm2',
        key: 'percentOutstandingSm2',
      },
    ],
  },
  {
    title: 'SM3: 61-90 DPD',
    className: styles.highlightColumn,
    children: [
      {
        title: 'Account',
        dataIndex: 'accountSm3',
        key: 'accountSm3',
      },
      {
        title: '% Account',
        dataIndex: 'percentAccountSm3',
        key: 'percentAccountSm3',
      },
      {
        title: 'Outstanding',
        dataIndex: 'outstandingSm3',
        key: 'outstandingSm3',
      },
      {
        title: '% Outstanding',
        dataIndex: 'percentOutstandingSm3',
        key: 'percentOutstandingSm3',
      },
    ],
  },
  {
    title: 'NPLs',
    className: styles.highlightColumn,
    children: [
      {
        title: 'Account',
        dataIndex: 'accountNpls',
        key: 'accountNpls',
      },
      {
        title: '% Account',
        dataIndex: 'percentAccountNpls',
        key: 'percentAccountNpls',
      },
      {
        title: 'Outstanding',
        dataIndex: 'outstandingNpls',
        key: 'outstandingNpls',
      },
      {
        title: '% Outstanding',
        dataIndex: 'percentOutstandingNpls',
        key: 'percentOutstandingNpls',
      },
    ],
  },
  {
    title: 'Write Off',
    className: styles.highlightColumn,
    children: [
      {
        title: 'Account',
        dataIndex: 'accountWriteOff',
        key: 'accountWriteOff',
      },
      {
        title: '% Account',
        dataIndex: 'percentAccountWriteOff',
        key: 'percentAccountWriteOff',
      },
      {
        title: 'Outstanding',
        dataIndex: 'outstandingWriteOff',
        key: 'outstandingWriteOff',
      },
      {
        title: '% Outstanding',
        dataIndex: 'percentOutstandingWriteOff',
        key: 'percentOutstandingWriteOff',
      },
    ],
  },
];

const loanType = ['Credit card'];

const Comp = () => (
  <>
    <Col span={24}>
      <DashboardPaymentCreditCardDebtFiltering
        label="overall-outstanding"
        loanType={loanType}
      />
    </Col>
    <Col span={24}>
      <Card>
        <div style={{ padding: '0 20px' }}>
          <p style={{ fontWeight: 800 }}>ข้อมูลที่จัดส่งให้ OA ติดตามหนี้</p>
        </div>
        <Table
          dataSource={reportStore.data?.docs}
          columns={columns}
          scroll={{ x: 3000 }}
          size="small"
          pagination={reportStore.currentPagination}
          rowClassName={(record, index) =>
            record.cardType === 'รวมบัตรเครดิต' ||
            record.cardType === 'รวมบัตรเงินสด' ||
            record.cardType === 'Grand Total'
              ? styles.highlightCell
              : ''
          }
          loading={reportStore.loading}
          onChange={(newPagination: TablePaginationConfig) => {
            reportStore.setPaginationParams(newPagination);
          }}
        />
      </Card>
    </Col>
    <Col span={24}>
      <Card>
        <div style={{ padding: '0 20px' }}>
          <p style={{ fontWeight: 800 }}>ผลการจัดเก็บหนี้</p>
        </div>
        <Table
          dataSource={reportStore.data?.docs}
          columns={columns}
          scroll={{ x: 3000 }}
          size="small"
          pagination={reportStore.currentPagination}
          rowClassName={(record, index) =>
            record.cardType === 'รวมบัตรเครดิต' ||
            record.cardType === 'รวมบัตรเงินสด' ||
            record.cardType === 'Grand Total'
              ? styles.highlightCell
              : ''
          }
          loading={reportStore.loading}
          onChange={(newPagination: TablePaginationConfig) => {
            reportStore.setPaginationParams(newPagination);
          }}
        />
      </Card>
    </Col>
  </>
);

export const DashboardOverallOutstandingDebtCreditCardWriteOff = observer(Comp);
