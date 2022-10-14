import { Card, Col, Table } from 'antd';
import { observer } from 'mobx-react-lite';
import { ReportFiltering } from '../../components/ReportLayout/ReportFiltering';
import { reportStore } from '../../stores/report-store';
import { numberFormat } from '../../utils';

const Comp = () => (
  <>
    <Col span={24}>
      <ReportFiltering />
    </Col>
    <Col span={24}>
      <Card>
        <Table
          rowKey="key"
          dataSource={reportStore.data?.docs}
          columns={[
            {
              title: 'OA',
              dataIndex: 'oa',
              key: 'oa',
            },
            {
              title: 'Grand Total Number of customer',
              dataIndex: 'grandTotalNumberOfCustomer',
              align: 'right',
              render: numberFormat,
            },
            {
              title: 'Grand Total Payment',
              dataIndex: 'grandTotalPayment',
              align: 'right',
              render: numberFormat,
            },
            {
              title: 'Grand Total Commission',
              dataIndex: 'grandTotalCommission',
              align: 'right',
              render: numberFormat,
            },
          ]}
          expandable={{
            expandedRowRender: x => {
              return (
                <Table
                  rowKey="key"
                  size="small"
                  columns={[
                    {
                      title: 'จำนวนบัญชีที่ส่ง',
                      dataIndex: 'numberOfAccountSent',
                      key: 'numberOfAccountSent',
                      render: numberFormat,
                    },
                    {
                      title: 'จำนวนบัญชีที่ป้องกันการไหล',
                      dataIndex: 'numberOfAccountProtect',
                      key: 'numberOfAccountProtect',
                      render: numberFormat,
                    },
                    {
                      title: '% ป้องกันการไหล',
                      dataIndex: 'percentageOfAccountProtect',
                      key: 'percentageOfAccountProtect',
                      render: numberFormat,
                    },
                    {
                      title: 'Sub Total Number of customer',
                      dataIndex: 'subTotalNumberOfCustomer',
                      align: 'right',
                      render: numberFormat,
                    },
                    {
                      title: 'Sub Total Payment',
                      dataIndex: 'subTotalPayment',
                      align: 'right',
                      render: numberFormat,
                    },
                    {
                      title: 'Sub Total Commission',
                      dataIndex: 'subTotalCommission',
                      align: 'right',
                      render: numberFormat,
                    },
                  ]}
                  expandable={{
                    expandedRowRender: x => {
                      return (
                        <Table
                          rowKey="key"
                          size="small"
                          columns={[
                            {
                              title: 'รอบการส่งงาน',
                              dataIndex: 'assignTime',
                              key: 'assignTime',
                            },
                            {
                              title: 'Account status',
                              dataIndex: 'accountStatus',
                              key: 'accountStatus',
                            },
                            {
                              title: 'Number of customer',
                              dataIndex: 'numberOfCustomer',
                              key: 'numberOfCustomer',
                              render: numberFormat,
                            },
                            {
                              title: 'Payment amount',
                              dataIndex: 'paymentAmount',
                              key: 'paymentAmount',
                              render: numberFormat,
                            },
                            {
                              title: 'มากกว่า Minimum Payment',
                              dataIndex: 'greaterThanMinimumPayment',
                              key: 'greaterThanMinimumPayment',
                            },
                            {
                              title: 'อัตราค่าบริการติดตามหนี้ (%)',
                              dataIndex: 'trackingDebtFeePercentage',
                              key: 'trackingDebtFeePercentage',
                              render: numberFormat,
                            },
                            {
                              title: 'ค่าบริการติดตามหนี้ (บาท)',
                              dataIndex: 'trackingDebtFee',
                              key: 'trackingDebtFee',
                              render: numberFormat,
                            },
                          ]}
                          dataSource={x.bucketData}
                          pagination={false}
                        />
                      );
                    },
                  }}
                  dataSource={x.oaData}
                  pagination={false}
                />
              );
            },
          }}
          loading={reportStore.loading}
        />
      </Card>
    </Col>
  </>
);

export const OaCompensationNonNplsLoanReport = observer(Comp);
