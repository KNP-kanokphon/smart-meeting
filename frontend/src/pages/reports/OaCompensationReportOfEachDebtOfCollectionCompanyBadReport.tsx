import {
  Card,
  Col,
  Form,
  Table,
  TablePaginationConfig,
  DatePicker,
} from 'antd';
import { observer } from 'mobx-react-lite';
import { ReportFilteringV2 } from '../../components/ReportLayout/ReportFilteringV2';
import { defaultDatePickerFormat } from '../../configs';
import { reportStore } from '../../stores/report-store';
import { dateFormat, numberFormat } from '../../utils';

const { RangePicker } = DatePicker;

const Comp = () => {
  return (
    <>
      <Col span={24}>
        <ReportFilteringV2
          extra={
            <Col>
              <Form.Item
                rules={[{ required: true }]}
                label="วันที่ส่งงาน :"
                name="dates"
              >
                <RangePicker
                  format={[defaultDatePickerFormat, defaultDatePickerFormat]}
                />
              </Form.Item>
            </Col>
          }
        />
      </Col>
      <Col span={24}>
        <Card style={{ marginTop: '20px' }}>
          <Table
            dataSource={reportStore.data?.docs}
            pagination={reportStore.currentPagination}
            columns={[
              {
                title: 'No',
                dataIndex: 'no',
                key: 'no',
                render: (_v, _r, i) => reportStore.getRunningNumber(i),
              },
              {
                title: 'OA',
                dataIndex: 'oaCode',
                key: 'oaCode',
              },
              {
                title: 'เลขที่บัตรประชาชน',
                dataIndex: 'custIdCard',
                key: 'custIdCard',
              },
              {
                title: 'Account No',
                key: 'accountNo',
                dataIndex: 'accountNo',
              },
              {
                title: 'Customer No',
                key: 'customerNo',
                dataIndex: 'customerNo',
              },
              {
                title: 'ชื่อ - สกุล',
                key: 'custName',
                dataIndex: 'custName',
              },
              {
                title: 'วันที่เริ่มติดตาม',
                key: 'assigntime',
                dataIndex: 'assigntime',
                render: dateFormat,
              },
              {
                title: 'วันที่สิ้นสุดในการติดตาม',
                key: 'expiredtime',
                dataIndex: 'expiredtime',
                render: dateFormat,
              },
              {
                title: 'Account status',
                key: 'accountStatus',
                dataIndex: 'accountStatus',
              },
              {
                title: 'วันที่นัดชำระ',
                key: 'appointmentDate',
                dataIndex: 'appointmentDate',
                render: dateFormat,
              },
              {
                title: 'จำนวนเงินที่นัดชำระ',
                key: 'appointmentAmt',
                dataIndex: 'appointmentAmt',
                render: numberFormat,
              },
              {
                title: 'วันที่ชำระหนี้',
                key: 'paymentTrnDate',
                dataIndex: 'paymentTrnDate',
                render: dateFormat,
              },
              {
                title: 'จำนวนเงินที่ชำระหนี้',
                key: 'paymentTrnAmt',
                dataIndex: 'paymentTrnAmt',
                render: numberFormat,
              },
              {
                title: 'ชำระปิดบัญชี',
                key: 'accountClosed',
                dataIndex: 'accountClosed',
                render: v => (v ? 'Y' : 'N'),
              },
              {
                title: 'Payment Amount for Calculate',
                key: 'paymentApprovedAmt',
                dataIndex: 'paymentApprovedAmt',
                render: numberFormat,
              },
              {
                title: 'อัตราส่วนการติดตามหนี้(%)',
                key: 'commissionFactor',
                dataIndex: 'commissionFactor',
              },
              {
                title: 'ค่าบริการติดตามหนี้',
                key: 'commissionAmt',
                dataIndex: 'commissionAmt',
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
export const OaCompensationReportOfEachDebtOfCollectionCompanyBadReport =
  observer(Comp);
