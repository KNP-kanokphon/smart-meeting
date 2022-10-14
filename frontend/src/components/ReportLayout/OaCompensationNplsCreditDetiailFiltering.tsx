import { Col, Form, DatePicker, Select } from 'antd';
import { observer } from 'mobx-react-lite';
import moment from 'moment';
import { useSearchParams } from 'react-router-dom';
import { defaultDatePickerFormat } from '../../configs';
import { masterDataStore } from '../../stores/master-data-store';
import { Params, reportStore } from '../../stores/report-store';
import { FilteringLayout } from './FilteringLayout';

const { RangePicker } = DatePicker;
const { Option } = Select;

type Props = {
  extra?: React.ReactNode;
};

const IsPathParamOa = () => {
  const [searchParams] = useSearchParams();
  let startDate = searchParams.get('startDate');
  let endDate = searchParams.get('endDate');
  let oa = searchParams.get('oa');
  let productType = searchParams.get('productType');

  if (oa && productType && startDate && endDate) {
    let params: Params = {
      productType: productType,
      dates: [new Date(startDate), new Date(endDate)],
      isExport: false,
      loanType: '',
    };
    reportStore.setParams(params);
  }
  if (oa) {
    return oa;
  }
  return 'Please select';
};

const IsPathParamProductType = () => {
  const [searchParams] = useSearchParams();
  return searchParams.get('productType');
};

const IsPathParamDate = (key: string) => {
  const [searchParams] = useSearchParams();
  let dateString = searchParams.get(key);
  if (dateString) {
    return searchParams.get(key);
  }
  return undefined;
};

const SetUp = () => {
  let pp: Params = {
    productType: 'NPLs',
    dates: [new Date(), new Date()],
    isExport: false,
    loanType: 'Nothing',
  };
  reportStore.setParams(pp);
};
export const Comp: React.FC<Props> = ({ extra }) => {
  return (
    <FilteringLayout>
      <Col flex={1}>
        <Form.Item
          rules={[{ required: true }]}
          label="ประเภทผลิตภัณฑ์ :"
          name="productType"
        >
          <Select
            showSearch
            placeholder="Please select"
            defaultValue={IsPathParamProductType()}
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
        <Form.Item
          rules={[{ required: false }]}
          label="บริษัทติดตามหนี้ :"
          name="oa"
        >
          <Select
            showSearch
            placeholder="Please select"
            defaultValue={IsPathParamOa()}
          >
            {masterDataStore.oas.map(x => (
              <Option key={x.oaId} value={x.oaCode}>
                {x.oaName}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
      <Col>
        <Form.Item rules={[{ required: true }]} label="วันที่ :" name="dates">
          <RangePicker
            format={[defaultDatePickerFormat, defaultDatePickerFormat]}
            defaultValue={[
              moment(IsPathParamDate('startDate')),
              moment(IsPathParamDate('endDate')),
            ]}
          />
        </Form.Item>
      </Col>
      {extra}
    </FilteringLayout>
  );
};

export const OaCompensationNplsCreditDetialFiltering = observer(Comp);
