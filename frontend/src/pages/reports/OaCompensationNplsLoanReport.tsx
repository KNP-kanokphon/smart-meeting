import { Card, Col, Table } from 'antd';
import { observer } from 'mobx-react-lite';
import { ReportFiltering } from '../../components/ReportLayout/ReportFiltering';
import { numberFormat } from '../../utils';
import { reportStore } from '../../stores/report-store';

const Comp = () => (
  <>
    <Col span={24}>
      <ReportFiltering />
    </Col>
    <Col span={24}>
      <Card>
        <Table
          rowKey="oa"
          dataSource={reportStore.data?.docs}
          pagination={reportStore.currentPagination}
          columns={[
            { title: 'OA', dataIndex: 'oa', key: 'oa' },
            {
              title: 'Grand Total',
              dataIndex: 'grandTotal',
              key: 'grandTotal',
              render: numberFormat,
            },
          ]}
          expandable={{
            expandedRowRender: x => {
              return (
                <Table
                  rowKey="accountStatus"
                  size="small"
                  columns={[
                    {
                      title: 'รอบการส่งงาน',
                      dataIndex: 'assignTime',
                      key: 'assignTime',
                    },
                    {
                      title: 'Account Status',
                      dataIndex: 'accountStatus',
                      key: 'accountStatus',
                    },
                    {
                      title: `Sub Total Number Of Customer`,
                      dataIndex: 'subTotalNumberOfCustomer',
                      key: 'subTotalNumberOfCustomer',
                    },
                    {
                      title: 'Sub Total Payment',
                      dataIndex: 'subTotalPayment',
                      key: 'subTotalPayment',
                      render: numberFormat,
                    },
                    {
                      title: 'Grand Total Commission',
                      dataIndex: 'grandTotalCommission',
                      key: 'grandTotalCommission',
                      render: numberFormat,
                    },
                  ]}
                  dataSource={x.oaData}
                  pagination={false}
                  expandable={{
                    expandedRowRender: x => {
                      return (
                        <Table
                          rowKey="percentageOfAccountProtect"
                          size="small"
                          columns={[
                            {
                              title: 'จำนวนบัญชีที่ส่ง',
                              dataIndex: 'numberOfAccountSent',
                              key: 'numberOfAccountSent',
                            },
                            {
                              title: 'จำนวนบัญชีที่ป้องกันการไหล',
                              dataIndex: 'numberOfAccountProtect',
                              key: 'numberOfAccountProtect',
                            },
                            {
                              title: '% ป้องกันการไหล',
                              dataIndex: 'percentageOfAccountProtect',
                              key: 'percentageOfAccountProtect',
                            },
                            {
                              title: 'Sub Total Commission',
                              dataIndex: 'subTotalCommission',
                              key: 'subTotalCommission',
                              render: numberFormat,
                            },
                          ]}
                          dataSource={x.bucketData}
                          pagination={false}
                          expandable={{
                            expandedRowRender: x => {
                              return (
                                <Table
                                  rowKey="key"
                                  size="small"
                                  columns={[
                                    {
                                      title: 'Number of customer',
                                      dataIndex: 'numberOfCustomer',
                                      key: 'numberOfCustomer',
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
                                  dataSource={x.protectData}
                                  pagination={false}
                                />
                              );
                            },
                          }}
                        />
                      );
                    },
                  }}
                />
              );
            },
          }}
        />
      </Card>
    </Col>
  </>
);

export const OaCompensationNplsLoanReport = observer(Comp);
