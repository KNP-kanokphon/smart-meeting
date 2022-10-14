import { Card, Col, Form, DatePicker, Table } from 'antd';
import { observer } from 'mobx-react-lite';
import { FilteringLayout } from '../../components/ReportLayout/FilteringLayout';
import { defaultDatePickerFormat } from '../../configs';
import { reportStore } from '../../stores/report-store';
import { numberFormat } from '../../utils';

const { RangePicker } = DatePicker;

const Comp = () => (
  <>
    <Col span={24}>
      <FilteringLayout>
        <Col>
          <Form.Item rules={[{ required: true }]} label="วันที่ :" name="dates">
            <RangePicker
              format={[defaultDatePickerFormat, defaultDatePickerFormat]}
            />
          </Form.Item>
        </Col>
      </FilteringLayout>
    </Col>
    <Col span={24}>
      <Card>
        <Table
          dataSource={reportStore.data?.docs}
          columns={[
            {
              title: 'ติดต่อได้',
              dataIndex: 'contactAble',
              key: 'contactAble',
            },
            {
              title: 'จำนวนบัญชี',
              dataIndex: 'numberOfAccounts',
              key: 'numberOfAccounts',
              render: numberFormat,
            },
            {
              title: '% (บัญชี)',
              dataIndex: 'numberOfAccountsPercent',
              key: 'numberOfAccountsPercent',
              render: numberFormat,
            },
            {
              title: 'จำนวนเงินต้น',
              dataIndex: 'principle',
              key: 'principle',
              render: numberFormat,
            },
            {
              title: '% เงินต้น',
              dataIndex: 'principlePercent',
              key: 'principlePercent',
              render: numberFormat,
            },
          ]}
          loading={reportStore.loading}
        />
      </Card>
    </Col>
  </>
);

export const OaDebtTrackingSummaryReport = observer(Comp);
