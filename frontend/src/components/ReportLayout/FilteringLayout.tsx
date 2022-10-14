import { Button, Col, Collapse, Form, Row, Space, Typography } from 'antd';
import { ExportOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';
import { MinusSquareOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { reportStore } from '../../stores/report-store';
import { MenuItem, menuItems } from '../../configs/menus';

const { Panel } = Collapse;
const { Title } = Typography;

type Props = {
  children?: React.ReactNode;
  extra?: React.ReactNode;
};

export const FilteringLayout: React.FC<Props> = ({ children, extra }) => {
  const [form] = Form.useForm();
  const { pathname } = useLocation();
  const paths = pathname.slice(1).split('/');

  const title: string = paths.reduce(
    (p: MenuItem[] | string | undefined, c: string) => {
      if (!Array.isArray(p)) {
        return p;
      }
      const menu = p.find(m => m.path === c);
      return menu?.children || menu?.label;
    },
    menuItems,
  ) as string;

  return (
    <Collapse
      expandIconPosition="end"
      defaultActiveKey={1}
      expandIcon={({ isActive }) =>
        isActive ? <MinusSquareOutlined /> : <PlusSquareOutlined />
      }
    >
      <Panel
        key={1}
        header={
          <Title style={{ margin: 0 }} level={4}>
            {title}
          </Title>
        }
      >
        <Form form={form} layout="vertical">
          <Row gutter={8} justify="space-around" align="bottom">
            {children}
            <Col>
              <Space>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="button"
                    onClick={async () => {
                      const v = await form.validateFields();
                      reportStore.setParams({ ...v, isExport: false });
                    }}
                  >
                    Search
                  </Button>
                </Form.Item>
                <Form.Item>
                  <Button
                    icon={<ExportOutlined />}
                    htmlType="button"
                    onClick={async () => {
                      const v = await form.validateFields();
                      reportStore.setParams({ ...v, isExport: true });
                    }}
                  >
                    Export CSV
                  </Button>
                </Form.Item>
              </Space>
            </Col>
            {extra}
          </Row>
        </Form>
      </Panel>
    </Collapse>
  );
};
