import { Col, Card, Table } from 'antd';
import { reportStore } from '../../../stores/report-store';
import { observer } from 'mobx-react-lite';
import { WorkSubmissionFiltering } from './OaWorkSubmissionFiltering';
import { TablePaginationConfig } from 'antd/es/table';
import { dateFormat, numberFormat } from '../../../utils';

const Comp = () => {
  return (
    <>
      <Col span={24}>
        <WorkSubmissionFiltering />
      </Col>
      <Col span={24}>
        <Card>
          <Table
            dataSource={reportStore.data?.docs}
            pagination={reportStore.currentPagination}
            columns={[
              {
                title: 'No.',
                dataIndex: 'no',
                key: 'no',
                render: (_v, _r, i) => reportStore.getRunningNumber(i),
              },
              {
                title: 'Supervisor',
                dataIndex: 'supervisor',
                key: 'supervisor',
              },
              {
                title: 'User Bank',
                dataIndex: 'bankUser',
                key: 'bankUser',
              },
              {
                title: 'ชื่อบริษัท',
                key: 'companyName',
                dataIndex: 'companyName',
              },
              {
                title: 'วันที่ส่งงาน',
                key: 'deliveryDate',
                dataIndex: 'deliveryDate',
                render: dateFormat,
              },
              {
                title: 'วันที่ครบกำหนด',
                key: 'dueDate',
                dataIndex: 'dueDate',
                render: dateFormat,
              },
              {
                title: 'ประเภทสินเชื่อ',
                key: 'productType',
                dataIndex: 'productType',
              },
              {
                title: 'สถานะชั้นหนี้/สถานะตัดหนี้สูญ',
                key: 'debtStatus',
                dataIndex: 'debtStatus',
              },
              {
                title: 'จำนวนเงินต้น',
                align: 'right',
                key: 'principle',
                dataIndex: 'principle',
                render: numberFormat,
              },
              {
                title: 'ดอกเบี้ยค้างรับ+ดอกเบี้ยปรับ',
                align: 'right',
                key: 'accruedInterest',
                dataIndex: 'accruedInterest',
                render: numberFormat,
              },
              {
                title: 'ภาระหนี้',
                align: 'right',
                key: 'debt',
                dataIndex: 'debt',
                render: numberFormat,
              },
              {
                title: 'จำนวนเงินค้างชำระ',
                align: 'right',
                key: 'outstandingDebt',
                dataIndex: 'outstandingDebt',
                render: numberFormat,
              },
            ]}
            loading={reportStore.loading}
            onChange={(newPagination: TablePaginationConfig) => {
              reportStore.setPaginationParams(newPagination);
            }}
          />
        </Card>
      </Col>
    </>
  );
};

export const OaWorkSubmissionReport = observer(Comp);
