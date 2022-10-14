import { Card, Col, Table, TablePaginationConfig } from 'antd';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { ReportFiltering } from '../../components/ReportLayout/ReportFiltering';
import { reportStore } from '../../stores/report-store';
import { dateFormat, numberFormat } from '../../utils';

const Comp: React.FC = () => {
  return (
    <>
      <Col span={24}>
        <ReportFiltering />
      </Col>
      <Col span={24}>
        <Card>
          <Table
            columns={[
              {
                title: 'เลขบัญชี',
                dataIndex: 'accountNo',
                key: 'accountNo',
                fixed: 'left',
              },
              {
                title: 'วันที่เริ่มติดตาม',
                dataIndex: 'trackingStartDate',
                key: 'trackingStartDate',
                render: dateFormat,
              },
              {
                title: 'วันที่ติดตามหนี้ครั้งที่ 1',
                dataIndex: 'firstTimeTrackingDate',
                key: 'firstTimeTrackingDate',
                render: dateFormat,
              },
              {
                title:
                  'จำนวนวันที่ติดตาม (วันที่ติดตามหนี้ครั้งที่ 1 - วันที่เริ่มติดตาม)',
                dataIndex: 'trackingTotalDate',
                key: 'trackingTotalDate',
                render: dateFormat,
              },
              {
                title: 'วันที่นัดชำระ',
                dataIndex: 'paymentDueDate',
                key: 'paymentDueDate',
                render: dateFormat,
              },
              {
                title: 'เบอร์โทรศัพท์',
                dataIndex: 'tel',
                key: 'tel',
              },
              {
                title: 'สถานะการติดตาม',
                dataIndex: 'trackingStatus',
                key: 'trackingStatus',
              },
              {
                title: 'ปิดบัญชี',
                dataIndex: 'closingDebtDate',
                key: 'closingDebtDate',
              },
              {
                title: 'ผ่อนชำระ',
                dataIndex: 'installment',
                key: 'installment',
              },
              {
                title: 'ปิดบัญชี',
                dataIndex: 'closingDebtDateMerged',
                key: 'closingDebtDateMerged',
                children: [
                  {
                    title: 'จำนวนเงินขั้นต่ำที่ต้องชำระหนี้ปิดบัญชี',
                    dataIndex: 'minimumPayment',
                    key: 'minimumPayment',
                    align: 'right',
                    render: numberFormat,
                  },
                  {
                    title: 'จำนวนเงินขั้นต่ำที่ต้องผ่อนชำระโดยประมาณ',
                    dataIndex: 'estimatedMinumumPayment',
                    key: 'estimatedMinumumPayment',
                    align: 'right',
                    render: numberFormat,
                  },
                ],
              },
              {
                title: 'ผ่อนชำระ',
                dataIndex: 'installmentMerged',
                key: 'installmentMerged',
                children: [
                  {
                    title: 'ระยะเวลาผ่อน',
                    dataIndex: 'installmentPeriod',
                    key: 'installmentPeriod',
                    align: 'right',
                    render: numberFormat,
                  },
                  {
                    title: 'จำนวนเงินที่ลูกหนี้ต้องการผ่อนต่อเดือน',
                    dataIndex: 'paymentAmountPerMonth',
                    key: 'paymentAmountPerMonth',
                    align: 'right',
                    render: numberFormat,
                  },
                ],
              },
              {
                title: 'อาชีพปัจจุบัน',
                dataIndex: 'occupation',
                key: 'occupation',
              },
              {
                title: 'รายละเอียดการติดตาม',
                dataIndex: 'trackingDetails',
                key: 'trackingDetails',
              },
              {
                title: 'กรณีลูกหนี้มีการเปลี่ยนแปลงเบอร์และที่อยู่',
                dataIndex: 'phoneNumberAndAddressDebtorChanged',
                key: 'phoneNumberAndAddressDebtorChanged',
                children: [
                  {
                    title: 'เบอร์โทร Update',
                    dataIndex: 'updatedTel',
                    key: 'updatedTel',
                  },
                  {
                    title: 'ที่อยู่/ที่ทำงาน Update',
                    dataIndex: 'updatedAddress',
                    key: 'updatedAddress',
                  },
                ],
              },
            ]}
            dataSource={reportStore.data?.docs}
            // pagination={reportStore.currentPagination}
            loading={reportStore.loading}
            scroll={{ x: 2200 }}
            onChange={(newPagination: TablePaginationConfig) => {
              reportStore.setPaginationParams(newPagination);
            }}
          />
        </Card>
      </Col>
    </>
  );
};

export const OaDebtTrackingResultsReport = observer(Comp);
