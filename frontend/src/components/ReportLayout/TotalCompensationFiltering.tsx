import { Col, DatePicker, Form, Select } from 'antd';
import { defaultDatePickerFormat } from '../../configs';
import { FilteringLayout } from './FilteringLayout';
import { masterDataStore } from '../../stores/master-data-store';

const { Option } = Select;
const { RangePicker } = DatePicker;

type Props = {
  extra?: React.ReactNode;
};

export const TotalCompensationFiltering: React.FC<Props> = ({ extra }) => {
  return (
    <FilteringLayout>
      <Col flex={1}>
        <Form.Item
          rules={[{ required: true }]}
          label="Loan Type:"
          name="productType"
        >
          <Select
            showSearch
            style={{
              width: 400,
            }}
          >
            {masterDataStore.productTypes.map(x => (
              <Option key={x.id} value={x.productCode}>
                {x.productDesc}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
      <Col flex={1}>
        <Form.Item rules={[{ required: true }]} label="oa" name="oa">
          <Select
            showSearch
            style={{
              width: 400,
            }}
          >
            {masterDataStore.oas.map(x => (
              <Option key={x.oaId} value={x.oaCode}>
                {x.oaName}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
      <Col flex={1}>
        <Form.Item rules={[{ required: true }]} label="วันที่" name="dates">
          <RangePicker
            format={[defaultDatePickerFormat, defaultDatePickerFormat]}
          />
        </Form.Item>
      </Col>
      {extra}
    </FilteringLayout>
  );
};
