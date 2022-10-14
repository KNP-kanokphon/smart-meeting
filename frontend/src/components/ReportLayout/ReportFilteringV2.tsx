import { Col, Form, Select } from 'antd';
import { observer } from 'mobx-react-lite';
import { masterDataStore } from '../../stores/master-data-store';
import { FilteringLayout } from './FilteringLayout';

const { Option } = Select;

type Props = {
  extra?: React.ReactNode;
};

export const Comp: React.FC<Props> = ({ extra }) => {
  return (
    <FilteringLayout>
      <Col flex={1}>
        <Form.Item label="ประเภทผลิตภัณฑ์ :" name="loanType">
          <Select showSearch allowClear placeholder="Please select">
            {masterDataStore.loanTypes.map(x => (
              <Option key={x.id} value={x.id}>
                {x.name === 'CREDIT' ? 'Card Link' : 'Loan'}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
      <Col flex={1}>
        <Form.Item label="Account status:" name="accountStatus">
          <Select showSearch allowClear placeholder="Please select">
            {masterDataStore.accountStatuses.map(x => (
              <Option key={x.id} value={x.id}>
                {x.name === 'NPLS'
                  ? 'Npls'
                  : x.name === 'NON_NPLS'
                  ? 'Non-Npls'
                  : 'W/O'}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
      {extra}
    </FilteringLayout>
  );
};

export const ReportFilteringV2 = observer(Comp);
