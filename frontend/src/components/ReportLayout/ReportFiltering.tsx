import { Col, Form, DatePicker, Select } from 'antd';
import { observer } from 'mobx-react-lite';
import { defaultDatePickerFormat } from '../../configs';
import { masterDataStore } from '../../stores/master-data-store';
import { FilteringLayout } from './FilteringLayout';

const { RangePicker } = DatePicker;
const { Option } = Select;

type Props = {
  extra?: React.ReactNode;
};

export const Comp: React.FC<Props> = ({ extra }) => {
  return (
    <FilteringLayout>
      <Col flex={1}>
        <Form.Item label="ประเภทผลิตภัณฑ์ :" name="productType">
          <Select showSearch allowClear placeholder="Please select">
            {masterDataStore.productTypes.map(x => (
              <Option key={x.id} value={x.productCode}>
                {x.productDesc}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
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
      {extra}
    </FilteringLayout>
  );
};

export const ReportFiltering = observer(Comp);
