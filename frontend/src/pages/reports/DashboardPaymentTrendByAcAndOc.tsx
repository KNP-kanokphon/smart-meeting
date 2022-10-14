import { Card, Col } from 'antd';
import { DashboardWorkTypeFiltering } from '../../components/ReportLayout/DashboardWorkTypeFiltering';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from 'recharts';
import { reportStore } from '../../stores/report-store';
import { observer } from 'mobx-react-lite';

const productTypes = ['NPLs'];

const renderBar = (entry: any, defaultColor: string) => {
  const alertColor = 'red';
  if (entry.value >= 50) {
    return alertColor;
  } else {
    return defaultColor;
  }
};

const tickFormatter = (value: string, index: number) => {
  const limit = 20; // put your maximum character
  if (value.length < limit) return value;
  return `${value.substring(0, limit)}\n${value.substring(limit)}`;
};

const renderLabel = (props: any) => {
  return `${props}%`;
};

const Comp = () => (
  <>
    <Col span={24}>
      <DashboardWorkTypeFiltering
        label="payment-trends"
        productTypes={productTypes}
      />
    </Col>
    {reportStore.data?.docs[0] ? (
      <>
        <Col span={12}>
          <Card>
            <div style={{ padding: '0 20px' }}>
              <p style={{ fontWeight: 800 }}>
                กลุ่มที่ได้รับชำระ (วงเงินที่ค้างชำระ)
              </p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                layout="vertical"
                width={500}
                height={300}
                data={reportStore.data?.docs[0].accruedAmountPaidGroup}
                margin={{
                  top: 5,
                  right: 30,
                  left: 10,
                  bottom: 5,
                }}
                style={{ fontSize: 12 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis
                  type="number"
                  axisLine={false}
                  tickLine={false}
                  domain={[0, 100]}
                  ticks={[0, 20, 40, 60, 80, 100]}
                  tickFormatter={(props: any) => props + '%'}
                />
                <YAxis dataKey="name" type="category" />
                <Tooltip
                  cursor={{ fill: 'transparent' }}
                  formatter={(props: any) => props + '%'}
                />
                <Bar dataKey="value" fill="#39A0FF">
                  {reportStore.data?.docs[0].accruedAmountPaidGroup &&
                    reportStore.data?.docs[0].accruedAmountPaidGroup.map(
                      (entry: any, index: any) => (
                        <Cell
                          cursor="pointer"
                          fill={renderBar(entry, '#39A0FF')}
                          key={`cell-${index}`}
                        />
                      ),
                    )}
                  <LabelList
                    dataKey="value"
                    position="right"
                    fill="#444444"
                    formatter={renderLabel}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <div style={{ padding: '0 20px' }}>
              <p style={{ fontWeight: 800 }}>กลุ่มที่ได้รับชำระ (กลุ่มอาชีพ)</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                layout="vertical"
                width={500}
                height={300}
                data={reportStore.data?.docs[0].occupationPaidGroup}
                margin={{
                  top: 5,
                  right: 30,
                  left: 45,
                  bottom: 5,
                }}
                style={{ fontSize: 12 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis
                  type="number"
                  axisLine={false}
                  tickLine={false}
                  domain={[0, 100]}
                  ticks={[0, 20, 40, 60, 80, 100]}
                  tickFormatter={(props: any) => props + '%'}
                />
                <YAxis
                  dataKey="name"
                  type="category"
                  tickFormatter={tickFormatter}
                />
                <Tooltip
                  cursor={{ fill: 'transparent' }}
                  formatter={(props: any) => props + '%'}
                />
                <Bar dataKey="value" fill="#39A0FF">
                  {reportStore.data?.docs[0].occupationPaidGroup &&
                    reportStore.data?.docs[0].occupationPaidGroup.map(
                      (entry: any, index: any) => (
                        <Cell
                          cursor="pointer"
                          fill={renderBar(entry, '#39A0FF')}
                          key={`cell-${index}`}
                        />
                      ),
                    )}
                  <LabelList
                    dataKey="value"
                    position="right"
                    fill="#444444"
                    formatter={renderLabel}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <div style={{ padding: '0 20px' }}>
              <p style={{ fontWeight: 800 }}>
                กลุ่มที่ยังไม่ได้รับชำระ (วงเงินที่ค้างชำระ)
              </p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                layout="vertical"
                width={500}
                height={300}
                data={reportStore.data?.docs[0].accruedAmountUnPaidGroup}
                margin={{
                  top: 5,
                  right: 30,
                  left: 10,
                  bottom: 5,
                }}
                style={{ fontSize: 12 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis
                  type="number"
                  axisLine={false}
                  tickLine={false}
                  domain={[0, 100]}
                  ticks={[0, 20, 40, 60, 80, 100]}
                  tickFormatter={(props: any) => props + '%'}
                />
                <YAxis dataKey="name" type="category" />
                <Tooltip
                  cursor={{ fill: 'transparent' }}
                  formatter={(props: any) => props + '%'}
                />
                <Bar dataKey="value" fill="#FAB770">
                  {reportStore.data?.docs[0].accruedAmountUnPaidGroup &&
                    reportStore.data?.docs[0].accruedAmountUnPaidGroup.map(
                      (entry: any, index: any) => (
                        <Cell
                          cursor="pointer"
                          fill={renderBar(entry, '#FAB770')}
                          key={`cell-${index}`}
                        />
                      ),
                    )}
                  <LabelList
                    dataKey="value"
                    position="right"
                    fill="#444444"
                    formatter={renderLabel}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <div style={{ padding: '0 20px' }}>
              <p style={{ fontWeight: 800 }}>
                กลุ่มที่ยังไม่ได้รับชำระ (กลุ่มอาชีพ)
              </p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                layout="vertical"
                width={500}
                height={300}
                data={reportStore.data?.docs[0].occupationUnPaidGroup}
                margin={{
                  top: 5,
                  right: 30,
                  left: 45,
                  bottom: 5,
                }}
                style={{ fontSize: 12 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis
                  type="number"
                  axisLine={false}
                  tickLine={false}
                  domain={[0, 100]}
                  ticks={[0, 20, 40, 60, 80, 100]}
                  tickFormatter={(props: any) => props + '%'}
                />
                <YAxis
                  dataKey="name"
                  type="category"
                  tickFormatter={tickFormatter}
                />
                <Tooltip
                  cursor={{ fill: 'transparent' }}
                  formatter={(props: any) => props + '%'}
                />
                <Bar dataKey="value" fill="#FAB770">
                  {reportStore.data?.docs[0].occupationUnPaidGroup &&
                    reportStore.data?.docs[0].occupationUnPaidGroup.map(
                      (entry: any, index: any) => (
                        <Cell
                          cursor="pointer"
                          fill={renderBar(entry, '#FAB770')}
                          key={`cell-${index}`}
                        />
                      ),
                    )}
                  <LabelList
                    dataKey="value"
                    position="right"
                    fill="#444444"
                    formatter={renderLabel}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </>
    ) : null}
  </>
);
export const DashboardPaymentTrendByAcAndOc = observer(Comp);
