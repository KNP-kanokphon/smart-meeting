import { useState } from 'react';
import { Card, Col, Table, TablePaginationConfig } from 'antd';
import { observer } from 'mobx-react-lite';
import { ReportFiltering } from '../../components/ReportLayout/ReportFiltering';
import { reportStore } from '../../stores/report-store';
import { Modal } from 'antd';
import { dateFormat, numberFormat } from '../../utils';
import { ColumnsType } from 'antd/es/table';

export type ModalDataDto = {
  numberIndex: string;
  oa: string;
  citizenId: string;
  cardNumber: string;
  accountNumber: string;
  customerNumber: string;
  contactDate: string;
  contactEndDate: string;
  bucket: string;
  percentPaymentAmount: string;
  promiseToPayAmount: string;
  currentBalance: string;
  paymentDate: string;
  paymentAmount: string;
  isClosedDeal: string;
  paymentAmountCalculate: string;
  percentDebtTrackingFee: string;
  debtTrackingFee: string;
};

function MainComponent() {
  const columns: ColumnsType<any> = [
    {
      title: 'OA',
      dataIndex: 'oa',
      key: 'oa',
      render: (index: any, { oa }: any) => (
        <td onClick={() => showModal(oa)}> {oa} </td>
      ),
    },
  ];

  const modalcolumns = [
    {
      title: 'No',
      dataIndex: 'numberIndex',
      key: 'numberIndex',
    },
    {
      title: 'OA',
      dataIndex: 'oa',
      key: 'oa',
    },
    {
      title: 'เลขบัตรประชาชน',
      dataIndex: 'citizenId',
      key: 'citizenId',
    },
    {
      title: 'Card No',
      dataIndex: 'cardNumber',
      key: 'cardNumber',
    },
    {
      title: 'Account No',
      dataIndex: 'accountNumber',
      key: 'accountNumber',
    },
    {
      title: 'Customer No',
      dataIndex: 'customerNumber',
      key: 'customerNumber',
    },
    {
      title: 'วันที่เริ่มติดตาม',
      dataIndex: 'contactDate',
      key: 'contactDate',
    },
    {
      title: 'วันที่สุดการติดตาม',
      dataIndex: 'contactEndDate',
      key: 'contactEndDate',
    },
    {
      title: 'Bucket',
      dataIndex: 'bucket',
      key: 'bucket',
    },
    {
      title: 'Promise to Pay Amount',
      dataIndex: 'promiseToPayAmount',
      key: 'promiseToPayAmount',
    },
    {
      title: 'Current Balance',
      dataIndex: 'currentBalance',
      key: 'currentBalance',
    },
    {
      title: 'Payment Date',
      dataIndex: 'paymentDate',
      key: 'paymentDate',
    },
    {
      title: 'Payment Amount',
      dataIndex: 'paymentAmount',
      key: 'paymentAmount',
    },
    {
      title: 'ชำระปิดบัญชี',
      dataIndex: 'isClosedDeal',
      key: 'isClosedDeal',
    },
    {
      title: 'promiseToPayAmount',
      dataIndex: 'paymentAmountCalculate',
      key: 'paymentAmountCalculate',
    },
    {
      title: 'อัตราค่าบริการติดตามหนี้ (%)',
      dataIndex: 'percentDebtTrackingFee',
      key: 'percentDebtTrackingFee',
    },
    {
      title: 'ค่าบริการติดตามหนี้ (บาท)',
      dataIndex: 'debtTrackingFee',
      key: 'debtTrackingFee',
    },
  ];

  const getTransformedModalData = (docs: any[], oa: string): ModalDataDto[] => {
    const oaFiltered = docs?.filter(obj => {
      return obj.oa === oa;
    });
    let transformedOaList: ModalDataDto[] = [];
    let totalDebtTrackingFee: number = 0;
    let numberIndex: number = 1;
    oaFiltered?.forEach((oaValue: any, oaIndex: any) => {
      oaValue.contacts.forEach((contactValue: any, contactIndex: any) => {
        contactValue.buckets.forEach((bucketValue: any, bucketIndex: any) => {
          bucketValue.paymentAmounts.forEach(
            (paymentValue: any, paymentDetail: any) => {
              let oaDto: ModalDataDto = {
                numberIndex: numberIndex + '',
                oa: oaValue.oa,
                citizenId: paymentValue.citizenId,
                cardNumber: paymentValue.cardNumber,
                accountNumber: paymentValue.accountNumber,
                customerNumber: paymentValue.customerNumber,
                contactDate: contactValue.contactDate,
                contactEndDate: paymentValue.contactEndDate,
                bucket: contactValue.bucketName,
                percentPaymentAmount: bucketValue.percentPaymentAmount,
                promiseToPayAmount: paymentValue.promiseToPayAmount,
                currentBalance: paymentValue.currentBalance,
                paymentDate: paymentValue.paymentDate,
                isClosedDeal: paymentValue.isClosedDeal,
                percentDebtTrackingFee: paymentValue.percentDebtTrackingFee,
                paymentAmount: paymentValue.paymentAmount,
                paymentAmountCalculate: paymentValue.paymentAmountCalculate,
                debtTrackingFee: paymentValue.debtTrackingFee,
              };
              transformedOaList.push(oaDto);
              numberIndex += 1;
              totalDebtTrackingFee += parseFloat(oaDto.debtTrackingFee);
            },
          );
        });
      });
      let grandTotal: ModalDataDto = {
        numberIndex: '',
        oa: '',
        citizenId: '',
        cardNumber: '',
        accountNumber: '',
        customerNumber: '',
        contactDate: '',
        contactEndDate: '',
        bucket: '',
        percentPaymentAmount: '',
        promiseToPayAmount: '',
        currentBalance: '',
        paymentDate: '',
        isClosedDeal: '',
        percentDebtTrackingFee: '',
        paymentAmount: '',
        paymentAmountCalculate: 'Total',
        debtTrackingFee: totalDebtTrackingFee + '',
      };
      transformedOaList.push(grandTotal);
    });
    return transformedOaList;
  };

  let modelData: ModalDataDto[] = [];
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modaldata, setmodaldata] = useState(modelData);

  const showModal = (oa: string) => {
    setIsModalVisible(true);
    setmodaldata(getTransformedModalData(reportStore.data?.docs, oa));
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const Comp = () => (
    <>
      <Col span={24}>
        <ReportFiltering />
      </Col>
      <Col span={24}>
        <Card>
          <Table
            rowKey="oa"
            dataSource={reportStore.data?.docs}
            pagination={reportStore.currentPagination}
            columns={[
              {
                title: 'OA',
                dataIndex: 'oa',
                key: 'oa',
                render: (index: any, { oa }: any) => (
                  <td onClick={() => showModal(oa)}> {oa} </td>
                ),
              },
              {
                title: 'Grand Total Payment',
                dataIndex: 'grandTotalPayment',
                align: 'right',
                render: numberFormat,
              },
            ]}
            expandable={{
              expandedRowRender: x => {
                return (
                  <Table
                    rowKey="contact"
                    size="small"
                    columns={[
                      {
                        title: 'วันที่เริ่มติดตาม',
                        dataIndex: 'contactDate',
                        key: 'contactDate',
                      },
                      {
                        title: 'Bucket',
                        dataIndex: 'bucketName',
                        key: 'bucketName',
                      },
                    ]}
                    dataSource={x.contacts}
                    pagination={false}
                    expandable={{
                      expandedRowRender: x => {
                        return (
                          <Table
                            size="small"
                            columns={[
                              {
                                title: '% ยอดจัดเก็บ',
                                dataIndex: 'percentPaymentAmount',
                                key: 'percentPaymentAmount',
                              },
                            ]}
                            dataSource={x.buckets}
                            pagination={false}
                            expandable={{
                              expandedRowRender: x => {
                                return (
                                  <Table
                                    size="small"
                                    columns={[
                                      {
                                        title: '% ยอดจัดเก็บ',
                                        dataIndex: 'percentPaymentAmount',
                                        key: 'percentPaymentAmount',
                                      },
                                      {
                                        title: 'Payment Amount',
                                        dataIndex: 'paymentAmount',
                                        key: 'paymentAmount',
                                        align: 'right',
                                      },
                                      {
                                        title: 'ชำระปิดบัญชี',
                                        dataIndex: 'isClosedDeal',
                                        key: 'isClosedDeal',
                                        align: 'right',
                                      },
                                      {
                                        title: 'อัตราบริการติดตามหนี้ (%)',
                                        dataIndex: 'percentDebtTrackingFee',
                                        key: 'percentDebtTrackingFee',
                                        align: 'right',
                                      },
                                      {
                                        title: 'ค่าบริการติดตามหนี้ (บาท)',
                                        dataIndex: 'debtTrackingFee',
                                        key: 'debtTrackingFee',
                                        align: 'right',
                                      },
                                    ]}
                                    dataSource={x.paymentAmounts}
                                    pagination={false}
                                  />
                                );
                              },
                            }}
                          />
                        );
                      },
                    }}
                  />
                );
              },
            }}
            loading={reportStore.loading}
            onChange={(newPagination: TablePaginationConfig) => {
              reportStore.setPaginationParams(newPagination);
            }}
          />
        </Card>
      </Col>
    </>
  );
  return (
    <div style={{ width: '100%' }}>
      <div style={{ width: '100%' }}>{Comp()}</div>
      <Modal
        width="100%"
        title="4.1 รายงานลายละเอียดค่าตอบแทนของแต่ละบริษัทติดตามหนี้สินเชื่อบัตร Credit NPLs"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Col span={24}>
          <Card>
            <Table
              size="small"
              dataSource={modaldata}
              pagination={false}
              columns={modalcolumns}
              loading={reportStore.loading}
              onChange={(newPagination: TablePaginationConfig) => {
                reportStore.setPaginationParams(newPagination);
              }}
            />
          </Card>
        </Col>
      </Modal>
    </div>
  );
}

export const OaCompensationNplsCreditCardReport = observer(MainComponent);
