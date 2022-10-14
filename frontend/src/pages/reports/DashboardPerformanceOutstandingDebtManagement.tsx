import { Card, Col } from 'antd';
import { observer } from 'mobx-react-lite';
import {
  CartesianGrid,
  LabelList,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from 'recharts';
import { DashboardWorkTypeFiltering } from '../../components/ReportLayout/DashboardWorkTypeFiltering';
import { reportStore } from '../../stores/report-store';

const productTypes = ['Non NPLs'];

const Comp = () => (
  <>
    <Col span={24}>
      <DashboardWorkTypeFiltering productTypes={productTypes} />
    </Col>
    {reportStore.data?.docs[0] ? (
      <>
        <Col span={12}>
          <Card>
            <div style={{ padding: '0 20px' }}>
              <p style={{ fontWeight: 800 }}>อัตราการไหลตก</p>
            </div>
            <ResponsiveContainer width="100%" height={500}>
              <LineChart
                width={500}
                height={300}
                data={reportStore.data?.docs[0].flowRate}
                margin={{
                  top: 5,
                  right: 30,
                  left: 30,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" interval={0} />
                <Tooltip formatter={(props: any) => props + '%'} />
                <Legend iconType="circle" />
                <Line
                  type="vertical"
                  dataKey="p1"
                  stroke="#428DF7"
                  fill="#428DF7"
                  name="P1"
                  strokeWidth={2}
                  activeDot={{ strokeWidth: 2, r: 5 }}
                >
                  <LabelList
                    dataKey="p1"
                    position="top"
                    fill="#444444"
                    fontSize={12}
                    formatter={(props: any) => props + '%'}
                  />
                </Line>
                <Line
                  type="vertical"
                  dataKey="sm2"
                  stroke="#EC923B"
                  fill="#EC923B"
                  name="SM2"
                  strokeWidth={2}
                  activeDot={{ strokeWidth: 2, r: 5 }}
                >
                  <LabelList
                    dataKey="sm2"
                    position="top"
                    fill="#444444"
                    fontSize={12}
                    formatter={(props: any) => props + '%'}
                  />
                </Line>
                <Line
                  type="vertical"
                  dataKey="sm3"
                  stroke="#EB5B56"
                  fill="#EB5B56"
                  name="SM3"
                  strokeWidth={2}
                  activeDot={{ strokeWidth: 2, r: 5 }}
                >
                  <LabelList
                    dataKey="sm3"
                    position="top"
                    fill="#444444"
                    fontSize={12}
                    formatter={(props: any) => props + '%'}
                  />
                </Line>
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <div style={{ padding: '0 20px' }}>
              <p style={{ fontWeight: 800 }}>ล้านบาทหรือ Account</p>
            </div>
            <ResponsiveContainer width="100%" height={500}>
              <LineChart
                width={500}
                height={300}
                data={reportStore.data?.docs[0].millionBahtOrAccount}
                margin={{
                  top: 5,
                  right: 30,
                  left: 30,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" interval={0} />
                <Tooltip />
                <Legend iconType="circle" />
                <Line
                  type="vertical"
                  dataKey="sentOa"
                  stroke="#979797"
                  fill="#979797"
                  name="ส่งให้ OA ติดตามหนี้"
                  strokeWidth={2}
                  activeDot={{ strokeWidth: 2, r: 5 }}
                >
                  <LabelList
                    dataKey="sentOa"
                    position="top"
                    fill="#444444"
                    fontSize={12}
                  />
                </Line>
                <Line
                  type="vertical"
                  dataKey="p1"
                  stroke="#60BF66"
                  fill="#60BF66"
                  name="P1 (1-30 DPD)"
                  strokeWidth={2}
                  activeDot={{ strokeWidth: 2, r: 5 }}
                >
                  <LabelList
                    dataKey="p1"
                    position="top"
                    fill="#444444"
                    fontSize={12}
                  />
                </Line>
                <Line
                  type="vertical"
                  dataKey="sm2"
                  stroke="#428DF7"
                  fill="#428DF7"
                  name="SM2 (31-60 DPD)"
                  strokeWidth={2}
                  activeDot={{ strokeWidth: 2, r: 5 }}
                >
                  <LabelList
                    dataKey="sm2"
                    position="top"
                    fill="#444444"
                    fontSize={12}
                  />
                </Line>
                <Line
                  type="vertical"
                  dataKey="sm3"
                  stroke="#EC923B"
                  fill="#EC923B"
                  name="SM3 (61-90 DPD)"
                  strokeWidth={2}
                  activeDot={{ strokeWidth: 2, r: 5 }}
                >
                  <LabelList
                    dataKey="sm3"
                    position="top"
                    fill="#444444"
                    fontSize={12}
                  />
                </Line>
                <Line
                  type="vertical"
                  dataKey="npls"
                  stroke="#EB5B56"
                  fill="#EB5B56"
                  name="New NPLs"
                  strokeWidth={2}
                  activeDot={{ strokeWidth: 2, r: 5 }}
                >
                  <LabelList
                    dataKey="npls"
                    position="top"
                    fill="#444444"
                    fontSize={12}
                  />
                </Line>
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </>
    ) : null}
  </>
);
export const DashboardPerformanceOutstandingDebtManagement = observer(Comp);
