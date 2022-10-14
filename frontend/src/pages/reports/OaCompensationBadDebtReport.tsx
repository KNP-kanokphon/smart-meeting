import {
  Col,
  Card,
  Table,
  TablePaginationConfig,
  DatePicker,
  Form,
} from 'antd';
import { reportStore } from '../../stores/report-store';
import { dateFormat, numberFormat } from '../../utils';
import { observer } from 'mobx-react-lite';
import { ReportFilteringV2 } from '../../components/ReportLayout/ReportFilteringV2';

const Comp = () => (
  <>
    <Col span={24}>
      <ReportFilteringV2
        extra={
          <Col>
            <Form.Item
              rules={[{ required: true }]}
              label="เดือนที่ส่งงาน :"
              name="month"
            >
              <DatePicker picker="month" />
            </Form.Item>
          </Col>
        }
      />
    </Col>
    <Col span={24}>
      <Card>
        <Table
          rowKey="oa"
          dataSource={reportStore.data?.docs}
          pagination={reportStore.currentPagination}
          columns={[
            {
              title: 'OA',
              dataIndex: 'oa',
              key: 'oa',
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
                  size="small"
                  columns={[
                    {
                      title: 'ระยะเวลาที่จำหน่ายหนี้สูญ (ปี)',
                      dataIndex: 'period',
                      align: 'center',
                    },
                    {
                      title: 'รอบการส่งงาน',
                      dataIndex: 'assignTime',
                      render: dateFormat,
                    },
                    {
                      title: 'จำนวนเงินทั้งหมด (ปิดบัญชี)',
                      dataIndex: 'accountClosedPaymentAmount',
                      align: 'right',
                      render: numberFormat,
                    },
                    {
                      title: 'อัตราค่าบริการติดตามหนี้ (%) (ปิดบัญชี)',
                      dataIndex: 'accountClosedCommissionPercent',
                      align: 'right',
                      render: numberFormat,
                    },
                    {
                      title: 'ค่าบริการติดตามหนี้ (บาท) (ปิดบัญชี)',
                      dataIndex: 'accountClosedCommission',
                      align: 'right',
                      render: numberFormat,
                    },
                    {
                      title: 'จำนวนเงินทั้งหมด',
                      dataIndex: 'paymentAmount',
                      align: 'right',
                      render: numberFormat,
                    },
                    {
                      title: 'อัตราค่าบริการติดตามหนี้ (%)',
                      dataIndex: 'commissionPercent',
                      align: 'right',
                      render: numberFormat,
                    },
                    {
                      title: 'ค่าบริการติดตามหนี้ (บาท)',
                      dataIndex: 'commission',
                      align: 'right',
                      render: numberFormat,
                    },
                  ]}
                  dataSource={x.periods}
                  pagination={false}
                />
              );
            },
          }}
          loading={reportStore.loading}
          onChange={(newPagination: TablePaginationConfig) => {
            reportStore.setPaginationParams(newPagination);
          }}
        />
      </Card>
    </Col>
  </>
);

export const OaCompensationBadDebtReport = observer(Comp);
