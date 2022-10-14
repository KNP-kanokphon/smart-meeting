import { Col, Form, DatePicker, Select } from 'antd';
import { observer } from 'mobx-react-lite';
import { range } from 'lodash';
// import { masterDataStore } from '../../stores/master-data-store';
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

export const Comp: React.FC<Props> = ({ extra, label, productTypes }) => {
  return (
    <FilteringLayout>
      <>
        <Col flex={1}>
          <Form.Item label="Assignment :" name="assignment">
            <Select showSearch placeholder="Please select"></Select>
          </Form.Item>
        </Col>
        <Col flex={1}>
          <Form.Item label="วันที่เริ่มแจกงาน :" name="startDate">
            <DatePicker style={{ width: '-webkit-fill-available' }} />
          </Form.Item>
        </Col>
        <Col flex={1}>
          <Form.Item label="วันที่สิ้นสุดแจกงาน :" name="endDate">
            <DatePicker style={{ width: '-webkit-fill-available' }} />
          </Form.Item>
        </Col>
        <Col flex={1}>
          <Form.Item label="Team :" name="team">
            <Select showSearch placeholder="Please select"></Select>
          </Form.Item>
        </Col>
        <Col flex={1}>
          <Form.Item label="Collector :" name="collector">
            <Select showSearch placeholder="Please select"></Select>
          </Form.Item>
        </Col>
        <Col flex={1}>
          <Form.Item
            //   rules={[{ required: true }]}
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
        <Col flex={1}>
          <Form.Item label="ประเภทการติดตาม :" name="trackingType">
            <Select showSearch placeholder="Please select"></Select>
          </Form.Item>
        </Col>
      </>
    </FilteringLayout>
  );
};

export const DebtCollectionAssignmentFiltering = observer(Comp);
