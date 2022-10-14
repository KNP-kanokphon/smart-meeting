import React from 'react';
import { Col, Card, Button, Table, Space, TablePaginationConfig } from 'antd';
import { reportStore } from '../../stores/report-store';
import { TotalCompensationFiltering } from '../../components/ReportLayout/TotalCompensationFiltering';
import { dateFormat, numberFormat } from '../../utils';
import { observer } from 'mobx-react-lite';

const Comp = () => {
  return (
    <>
      <Col span={24}>
        <TotalCompensationFiltering />
      </Col>
      <Col span={24}>
        <Card style={{ marginTop: '20px' }}>
          <Table
            dataSource={reportStore.data?.docs}
            pagination={reportStore.currentPagination}
            columns={[
              {
                title: 'OA',
                dataIndex: 'oa',
                key: 'oa',
              },
              {
                title: 'เลขที่สัญญา',
                dataIndex: 'contractNumber',
                key: 'contractNumber',
                align: 'center',
              },
              {
                title: 'วันที่',
                key: 'date',
                dataIndex: 'date',
                align: 'center',
                render: dateFormat,
              },
              {
                title: 'ประเภทสินเชื่อ',
                key: 'loanType',
                dataIndex: 'loanType',
              },
              {
                title: 'วงเงินค่าตอบแทน',
                key: 'compensationLimit',
                dataIndex: 'compensationLimit',
                align: 'right',
                render: numberFormat,
              },
              {
                title: 'ค่าตอบแทนรอบปัจจุบันรออนุมัติ',
                key: 'waitForApprovalCurrentCompensationPeriod',
                dataIndex: 'waitForApprovalCurrentCompensationPeriod',
                align: 'right',
                render: numberFormat,
              },
              {
                title: 'ค่าตอบแทนรอบปัจจุบันที่อนุมัติ',
                key: 'approvedCurrentCompensationPeriod',
                dataIndex: 'approvedCurrentCompensationPeriod',
                align: 'right',
                render: numberFormat,
              },
              {
                title: 'ผู้อนุมัติ',
                key: 'approver',
                dataIndex: 'approver',
              },
              {
                title: 'วันที่อนุมัติ',
                key: 'approvalDate',
                dataIndex: 'approvalDate',
                render: dateFormat,
              },
              {
                title: 'ค่าตอบแทนสะสม YTD',
                key: 'totalCompensationYearToDate',
                dataIndex: 'totalCompensationYearToDate',
                align: 'right',
                render: numberFormat,
              },
              {
                title: 'ค่าตอบแทนสะสมตลอดอายุสัญญา',
                key: 'totalCompensationOfContract',
                dataIndex: 'totalCompensationOfContract',
                align: 'right',
                render: numberFormat,
              },
              {
                title: 'วงเงินค่าตอบแทนคงเหลือ',
                key: 'remainingCompensationLimit',
                dataIndex: 'remainingCompensationLimit',
                align: 'right',
                render: numberFormat,
              },
              {
                title: 'ค่าตอบแทนเฉลี่ย/เดือน',
                key: 'avgCompensationPerMonth',
                dataIndex: 'avgCompensationPerMonth',
                align: 'right',
                render: numberFormat,
              },
              {
                title: 'Action',
                dataIndex: 'action',
                key: 'action',
                align: 'center',
                render: () => (
                  <Space size="middle">
                    <Button type="link">Button 1</Button>
                    <Button type="link">Button 2</Button>
                  </Space>
                ),
              },
            ]}
            loading={reportStore.loading}
            onChange={(newPagination: TablePaginationConfig) => {
              reportStore.setPaginationParams(newPagination);
            }}
            scroll={{ x: 1800 }}
            size="small"
          />
        </Card>
      </Col>
    </>
  );
};
export const TotalCompensationReport = observer(Comp);
