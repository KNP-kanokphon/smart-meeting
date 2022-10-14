import { Col, Row } from 'antd';
import { observer } from 'mobx-react-lite';
import { DashboardPaymentCreditCardDebtFiltering } from '../../../components/ReportLayout/DashboardPaymentCreditCardDebtFiltering';
import { DashboardPaymentCreditCardDebtByCardTypePieChart } from './DashboardPaymentCreditCardDebtByCardTypePieChart';
import { reportStore } from '../../../stores/report-store';

const loanType = ['Credit card'];

const debtLevel = ['NPLs'];

const Comp = () => (
  <>
    <Col span={24}>
      <DashboardPaymentCreditCardDebtFiltering
        loanType={loanType}
        debtLevel={debtLevel}
      />
    </Col>

    {reportStore.data?.docs && (
      <Col span={24}>
        <Row gutter={[12, 12]}>
          {reportStore.data?.docs.map((result: any, index: number) => {
            if (index === 0) {
              return (
                <Col span={24}>
                  <DashboardPaymentCreditCardDebtByCardTypePieChart
                    title={result.title}
                    data={result.data}
                  />
                </Col>
              );
            }
            return (
              <Col xs={24} sm={24} md={24} lg={12} xl={8}>
                <DashboardPaymentCreditCardDebtByCardTypePieChart
                  title={result.title}
                  data={result.data}
                />
              </Col>
            );
          })}
        </Row>
      </Col>
    )}
  </>
);

export const DashboardPaymentCreditCardDebtByCardType = observer(Comp);
