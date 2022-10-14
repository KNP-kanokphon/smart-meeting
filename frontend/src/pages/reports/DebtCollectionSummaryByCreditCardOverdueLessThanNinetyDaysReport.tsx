import { Card, Col, Table } from 'antd';
import React from 'react';
import { ReportFiltering } from '../../components/ReportLayout/ReportFiltering';
import { numberFormat } from '../../utils';
import styles from '../reports/DashboardOverallOutstandingDebtCreditCardWriteOff/DashboardOverallOutstandingDebtCreditCardWriteOff.module.scss';
import { reportStore } from '../../stores/report-store';
import { observer } from 'mobx-react-lite';

const columns = [
  {
    title: 'Billing Cycle',
    // rowSpan: 3,
    dataIndex: 'cycle',
    key: 'cycle',
    // onCell: (index: any) => {
    //   if (index.key === '1' || index.key === '4' || index.key === '7') {
    //     return { rowSpan: 3 };
    //   } else {
    //     return { rowSpan: 0 };
    //   }
    // },
  },
  {
    title: 'Debt level',
    dataIndex: 'debt',
    key: 'debt',
  },
  {
    title: 'Data',
    children: [
      {
        title: 'Account',
        dataIndex: 'acc',
        key: 'acc',
        align: 'right',
        render: numberFormat,
      },
      {
        title: 'Money',
        dataIndex: 'money',
        key: 'money',
        align: 'right',
        render: numberFormat,
      },
    ],
  },
  {
    title: 'Payment info',
    children: [
      {
        title: 'Account',
        dataIndex: 'acc1',
        key: 'acc1',
        align: 'right',
        render: numberFormat,
      },
      {
        title: '%',
        dataIndex: 'percent',
        key: 'percent',
        align: 'right',
        render: numberFormat,
      },
      {
        title: 'Payment',
        dataIndex: 'pay',
        key: 'pay',
        align: 'right',
        render: numberFormat,
      },
      {
        title: '%',
        dataIndex: 'percent1',
        key: 'percent1',
        align: 'right',
        render: numberFormat,
      },
    ],
  },
  {
    title: 'Flow protection info',
    children: [
      {
        title: 'Account',
        dataIndex: 'acc2',
        key: 'acc2',
        align: 'right',
        render: numberFormat,
      },
      {
        title: '%',
        dataIndex: 'percent2',
        key: 'percent2',
        align: 'right',
        render: numberFormat,
      },
      {
        title: 'Payment',
        dataIndex: 'pay1',
        key: 'pay1',
        align: 'right',
        render: numberFormat,
      },
      {
        title: 'STM Prevent flow',
        dataIndex: 'stm',
        key: 'stm',
        align: 'right',
        render: numberFormat,
      },
      {
        title: 'Prevent for %',
        dataIndex: 'prevent',
        key: 'prevent',
        align: 'right',
        render: numberFormat,
      },
    ],
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
          <Table
            rowClassName={(record: any) =>
              record.title === 'Column-11+12' ? styles.highlightColumn : ''
            }
            columns={columns}
            dataSource={reportStore.data?.docs}
          />
        </Card>
      </Col>
    </>
  );
};
export const DebtCollectionSummaryByCreditCardOverdueLessThanNinetyDaysReport =
  observer(Comp);
