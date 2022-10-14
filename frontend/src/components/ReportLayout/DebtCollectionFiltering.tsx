import { Col, Form, DatePicker, Select } from 'antd';
import { observer } from 'mobx-react-lite';
import { FilteringLayout } from './FilteringLayout';
import { masterDataStore } from '../../stores/master-data-store';

const { RangePicker } = DatePicker;
const { Option } = Select;

type Props = {
  extra?: React.ReactNode;
};

export const Comp: React.FC<Props> = ({ extra }) => {
  return (
    <FilteringLayout extra={extra}>
      <>
        <Col flex={1}>
          <Form.Item
            rules={[{ required: true }]}
            label="วันที่ส่งงาน :"
            name="dates"
          >
            <RangePicker style={{ width: '-webkit-fill-available' }} />
          </Form.Item>
        </Col>
        <Col flex={1}>
          <Form.Item
            rules={[{ required: true }]}
            label="Account Status :"
            name="accountStatus"
          >
            <Select showSearch allowClear placeholder="Please select">
              {masterDataStore.accountStatuses.map(x => (
                <Option key={x.id} value={x.name}>
                  {x.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
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
      </>
    </FilteringLayout>
  );
};

export const DebtCollectionFiltering = observer(Comp);
