import { Card } from 'antd';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

interface Props {
  title: string;
  data: any;
}

const cardStyle = {
  display: 'flex',
  justifyContent: 'center',
  padding: '0px 8px 0 0',
};

const COLORS = [
  '#6EADF9',
  '#EC726E',
  '#68C8C9',
  '#73C87D',
  '#F5D659',
  '#8F62DE',
  '#465184',
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  value,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius - 15 + 10) * cos;
  const sy = cy + (outerRadius - 15 + 10) * sin;
  const mx = cx + (outerRadius - 15 + 30) * cos;
  const my = cy + (outerRadius - 15 + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 10;
  const ey = my;
  const percentage = percent * 100;

  if (percentage < 20) {
    return (
      <g>
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke="black"
          fill="none"
        />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 5}
          y={ey + (sin >= 0 ? 1 : -1) * 5}
          fill="black"
          fontSize={10}
        >
          {`${value} | ${percentage.toFixed(2)}%`}
        </text>
      </g>
    );
  }

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={12}
    >
      {`${value} | ${percentage.toFixed(2)}%`}
    </text>
  );
};

export const DashboardPaymentCreditCardDebtByCardTypePieChart: React.FC<
  Props
> = ({ title, data }) => {
  return (
    <Card title={title} bodyStyle={cardStyle}>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius="80%"
            fill="#8884d8"
            dataKey="value"
            style={{ padding: 0 }}
          >
            {data?.map((entry: any, index: number) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Legend
            iconType="circle"
            iconSize={10}
            align="right"
            layout="vertical"
            verticalAlign="middle"
            formatter={v => (
              <span style={{ color: 'black', fontSize: '13px' }}>{v}</span>
            )}
            wrapperStyle={{ paddingLeft: '70px' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
};
