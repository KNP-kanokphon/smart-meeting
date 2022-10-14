import { Card, Col } from 'antd';
import { DashboardWorkTypeFiltering } from '../../components/ReportLayout/DashboardWorkTypeFiltering';
import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
  Legend,
  Line,
  LabelList,
} from 'recharts';
import { observer } from 'mobx-react-lite';
import { reportStore } from '../../stores/report-store';

const ticksGrid = [
  0, 80, 100, 200, 400, 600, 800, 1000, 1200, 1400, 1600, 1800,
];

const productTypes = ['Non NPLs'];

const Comp = () => (
  <>
    <Col span={24}>
      <DashboardWorkTypeFiltering productTypes={productTypes} />
    </Col>
    {reportStore.data?.docs ? (
      <Col span={24}>
        <Card>
          <div style={{ padding: '0 20px' }}>
            <p style={{ fontWeight: 800 }}>
              ข้อมูลแนวโน้มการรับชำระ (Non NPLs)
            </p>
          </div>
          <ResponsiveContainer width="100%" height={500}>
            <ComposedChart
              width={500}
              height={400}
              data={reportStore.data?.docs}
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
              }}
              stackOffset="sign"
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis axisLine={false} tickLine={false} ticks={ticksGrid} />
              <Tooltip />
              <Legend
                formatter={(props: any) => (
                  <span style={{ color: '#444444' }}>{props}</span>
                )}
                payload={[
                  {
                    id: 'debtBalance',
                    value: 'ยอดหนี้ที่ส่งให้ติดตาม',
                    type: 'square',
                    color: '#979797',
                  },
                  {
                    id: 'unPaid',
                    value: 'ยังไม่ได้ชำระ',
                    type: 'square',
                    color: '#FA9C38',
                  },
                  {
                    id: 'paid',
                    value: 'ชำระแล้ว',
                    type: 'square',
                    color: '#39A0FF',
                  },
                  {
                    id: 'percentUnPaid',
                    value: '% ที่ยังไม่ได้รับชำระ',
                    type: 'circle',
                    color: '#EA5D61',
                  },
                  {
                    id: 'percentPaid',
                    value: '% ที่ได้รับชำระ',
                    type: 'circle',
                    color: '#2FC15A',
                  },
                ]}
              />
              <Bar
                dataKey="unPaid"
                barSize={20}
                fill="#FA9C38"
                stackId="stack"
                name="ยังไม่ได้ชำระ"
              />
              <Bar
                dataKey="paid"
                barSize={20}
                fill="#39A0FF"
                stackId="stack"
                name="ชำระแล้ว"
              >
                <LabelList
                  dataKey="debtBalance"
                  position="top"
                  fill="#444444"
                />
              </Bar>
              <Line
                type="vertical"
                dataKey="percentUnPaid"
                fill="#EA5D61"
                stroke="#EA5D61"
                strokeWidth={2}
                activeDot={{ strokeWidth: 2, r: 5 }}
                name="% ที่ยังไม่ได้รับชำระ"
              />
              <Line
                type="vertical"
                dataKey="percentPaid"
                fill="#2FC15A"
                stroke="#2FC15A"
                strokeWidth={2}
                activeDot={{ strokeWidth: 2, r: 5 }}
                name="% ที่ได้รับชำระ"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </Card>
      </Col>
    ) : null}
  </>
);

export const DashboardPaymentTrendInformation = observer(Comp);
