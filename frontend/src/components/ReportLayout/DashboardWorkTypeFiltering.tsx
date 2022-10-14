import { Col, DatePicker, Form, Select } from 'antd';
import { range } from 'lodash';
import { FilteringLayout } from './FilteringLayout';

const { Option } = Select;

const defaultProductTypes = range(1, 10).map(x => ({
  label: `Product ${x}`,
  value: `product-${x}`,
}));

type Props = {
  extra?: React.ReactNode;
  label?: string;
  productTypes?: string[];
};

export const DashboardWorkTypeFiltering: React.FC<Props> = ({
  extra,
  label,
  productTypes,
}) => {
  return (
    <FilteringLayout>
      <Col flex={1}>
        <Form.Item
          rules={[{ required: true }]}
          label="ประเภทงาน :"
          name="productType"
        >
          <Select showSearch placeholder="Please select">
            {productTypes != null
              ? productTypes.map(x => (
                  <Option value={x} key={x}>
                    {x}
                  </Option>
                ))
              : defaultProductTypes.map(x => (
                  <Option value={x.value} key={x.value}>
                    {x.label}
                  </Option>
                ))}
          </Select>
        </Form.Item>
      </Col>
      {label === 'payment-trends' ? null : (
        <Col flex={1}>
          <Form.Item
            rules={[{ required: true }]}
            label="เลือกเดือน :"
            name="monthType"
          >
            <DatePicker
              placeholder="Select month"
              style={{ width: '-webkit-fill-available' }}
              picker="month"
            />
          </Form.Item>
        </Col>
      )}
      {extra}
    </FilteringLayout>
  );
};
