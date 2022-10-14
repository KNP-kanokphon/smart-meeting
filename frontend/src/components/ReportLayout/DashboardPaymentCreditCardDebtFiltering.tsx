import { Col, Form, Select, DatePicker } from 'antd';
import { range } from 'lodash';
import { defaultDatePickerFormat } from '../../configs';
import { FilteringLayout } from './FilteringLayout';

const { Option } = Select;
const { RangePicker } = DatePicker;

const defaultLoanType = range(1, 10).map(x => ({
  label: `Product ${x}`,
  value: `product-${x}`,
}));

const defaultDebtLevel = range(1, 10).map(x => ({
  label: `Product ${x}`,
  value: `product-${x}`,
}));

type Props = {
  extra?: React.ReactNode;
  label?: string;
  loanType?: string[];
  debtLevel?: string[];
};

export const DashboardPaymentCreditCardDebtFiltering: React.FC<Props> = ({
  extra,
  label,
  loanType,
  debtLevel,
}) => {
  return (
    <FilteringLayout>
      {label === 'overall-outstanding' ? (
        <Col>
          <Form.Item rules={[{ required: true }]} label="วันที่ :" name="date">
            <RangePicker />
          </Form.Item>
        </Col>
      ) : null}
      <Col flex={1}>
        <Form.Item
          rules={[{ required: true }]}
          label="Loan Type :"
          name="productType"
        >
          <Select showSearch placeholder="Please select">
            {loanType != null
              ? loanType.map(x => (
                  <Option value={x} key={x}>
                    {x}
                  </Option>
                ))
              : defaultLoanType.map(x => (
                  <Option value={x.value} key={x.value}>
                    {x.label}
                  </Option>
                ))}
          </Select>
        </Form.Item>
      </Col>
      {label === 'overall-outstanding' ? null : (
        <>
          <Col flex={1}>
            <Form.Item
              rules={[{ required: true }]}
              label="ชั้นหนี้ :"
              name="debtLevel"
            >
              <Select showSearch placeholder="Please select">
                {debtLevel != null
                  ? debtLevel.map(x => (
                      <Option value={x} key={x}>
                        {x}
                      </Option>
                    ))
                  : defaultDebtLevel.map(x => (
                      <Option value={x.value} key={x.value}>
                        {x.label}
                      </Option>
                    ))}
              </Select>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              rules={[{ required: true }]}
              label="วันที่ :"
              name="date"
            >
              <DatePicker
                placeholder="Select Date"
                format={defaultDatePickerFormat}
              />
            </Form.Item>
          </Col>
        </>
      )}
      {extra}
    </FilteringLayout>
  );
};
