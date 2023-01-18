import { Button, Card, Col, Row, Steps, Modal, message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { AgendaPage } from './agendaPage';
import { DetailPage } from './detailsPage';
import { FoodPage } from './foodPage';
import './styles.css';
import { DatamanagementService } from '../../../stores/meeting-store';
import { v4 as uuidv4 } from 'uuid';
import { useLocation, useNavigate } from 'react-router-dom';
import { IDataroom } from '../../common/type';
import moment from 'moment';

const { Step } = Steps;

export const EditMeeting: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [dataAgenda, setDataAgenda] = useState<any>([]);
  const [dataDetail, setDataDetail] = useState<any>([]);
  const [dataIntable, setDataIntable] = useState<any>([]);
  const [dataFood, setDataFood] = useState<any>([]);
  const { state } = useLocation();
  const [positionName, setPositionName] = useState<
    [{ id: string; uuid: string; nameposition: string; createdate: string }]
  >([{ id: '', uuid: '', nameposition: '', createdate: '' }]);

  const [dataUser, setDataUser] = useState<any>([]);
  const [nameFileoverview, setNameFileoverview] = useState<any>([]);
  const [nameFileagendes, setNameFileagendes] = useState<any>([]);
  const [agendaDetail, setAgendaDetail] = useState<any>();
  // const [dataMap, setDataMap] = useState<any>([]);
  const [getLastdata, setLastdata] = useState([]);
  // const [datagift, setDatagift] = useState<boolean>(false);

  useEffect(() => {
    getListmeeting();
  }, []);

  async function getListmeeting() {
    const resultDatameeting = await DatamanagementService().getMeetingByid(
      state,
    );
    setDataIntable(resultDatameeting);
    await DatamanagementService()
      .getFileoverview(state)
      .then(async data => {
        const datafile = await data.map((x: any) => {
          return {
            uid: x.idfile,
            name: x.namefile,
            status: 'done',
            response: 'Server Error 500',
            pathfile: x.pathfile,
            step: x.step,
          };
        });
        setNameFileoverview(datafile);
      });
    await DatamanagementService()
      .getuserInroom(state)
      .then(async (data: any) => {
        setDataUser(data);
        await DatamanagementService()
          .getPositionall()
          .then(data => {
            setPositionName(data);
            return data;
          });
      });
    updateDataFile();
    const resultFileagendes = await DatamanagementService().getFileagenda(
      state,
    );

    const resultAgenda = await DatamanagementService().getagendaByid(state);
    const newData: any = [];
    resultAgenda?.map((x: any) => {
      const filterfile = resultFileagendes.filter(
        (r: any) => String(r.step) === String(x.step),
      );
      newData.push({
        title: x.agendes,
        detail: x.detailagendes,
        file: filterfile,
      });
    });
    setAgendaDetail(newData);
  }

  const updateDataFile = async () => {
    const resultFileagendes = await DatamanagementService().getFileagenda(
      state,
    );
    const data = resultFileagendes.map((x: any) => {
      return {
        uid: x.idfile,
        name: x.namefile,
        status: 'done',
        response: 'Server Error 500',
        pathfile: x.pathfile,
        step: x.step,
      };
    });
    setNameFileagendes(data);
  };

  const onChangeCurrentStep = (step: number) => {
    setCurrentStep(step);
  };

  const onChangeCurrentCheckStep = (step: number) => {
    if (dataAgenda.title === '' || typeof dataAgenda.title === 'undefined') {
      message.error(`กรุณากรอกเรื่องของการประชุม`);
      return;
    } else if (dataAgenda.date === '' || !dataAgenda.date) {
      message.error(`กรุณากรอกวันที่ของการประชุม`);
      return;
    } else if (dataAgenda.timeStart === '' || !dataAgenda.timeStart) {
      message.error(`กรุณากรอกเวลาเริ่มของการประชุม`);
      return;
    } else if (dataAgenda.timeEnd === '' || !dataAgenda.timeEnd) {
      message.error(`กรุณากรอกเวลาสิ้นสุดของการประชุม`);
      return;
    } else {
      setCurrentStep(step);
    }
    setCurrentStep(step);
  };

  const setDataAgendaField = (dataField: any) => {
    setDataDetail(dataField);
  };

  const lastDataAgenda = (dataField: any) => {
    const data: any = [];
    dataField.map((x: any) => {
      data.push({
        id: 2,
        agendas: x?.children?.props.item.agendes,
        detail: x?.children?.props.item.detail,
        detailAgendes: x?.children?.props?.resultDetailagenda,
        uuid: x?.children?.props.item.uuid,
        step: x?.children?.props.item.step,
        detailAgendesNew: x?.children?.props.item?.detailAgendes,
      });
    });
    setLastdata(data);
  };
  const setDataFoodField = (dataField: any) => {
    setDataFood((pre: any) => ({ ...pre, ...dataField }));
  };

  const setDataAgendaield = (dataField: any) => {
    setDataAgenda((pre: any) => ({ ...pre, ...dataField }));
  };

  const checkSubmitForm = () => {
    // if (dataFood.length === 0) {
    //   message.error('0 length');
    //   return;
    // }

    // const check = new Promise<void>((resolve, reject) => {
    //   if (dataFood.fooddetail.length === 0) {
    //     message.error('กรุณารายการอาหารและเครื่องดื่มอย่างน้อย1รายการ');
    //     return;
    //   }
    //   dataFood.fooddetail.forEach(
    //     (element: any, index: number, array: string | any[]) => {
    //       if (!element) {
    //         message.error('กรุณากรอกข้อมูลให้ครบถ้วน');
    //         return;
    //       }
    //       if (!element.typefood) {
    //         message.error(`กรุณากรอกประเภทอาหารและเครื่องดื่ม`);
    //         return;
    //       } else if (
    //         !element.namefood ||
    //         typeof element.namefood == 'undefined'
    //       ) {
    //         message.error(`กรุณากรอกชื่อรายการอาหารและเครื่องดื่ม`);
    //         return;
    //       }
    //       if (index === array.length - 1) resolve();
    //     },
    //   );
    // });

    // check.then(() => submitForm());
    submitForm();
  };

  const submitForm = () => {
    Modal.confirm({
      title: 'Confirm Create this meeting',
      icon: <ExclamationCircleOutlined />,
      okText: 'ยืนยัน',
      cancelText: 'ยกเลิก',
      onOk: async () => {
        let newStarttime = new Date(dataAgenda.timeStart?._d);
        let newEndtime = new Date(dataAgenda.timeEnd?._d);
        const newDataAgenda = {
          title: dataAgenda.title,
          room: dataAgenda.room,
          floor: dataAgenda.floor,
          building: dataAgenda.building,
          meetingPlace: dataAgenda.meetingPlace,
          date: dataAgenda.date._i,
          timeStart: moment(newStarttime).format('HH:mm:ss'),
          timeEnd: moment(newEndtime).format('HH:mm:ss'),
          detailMeeting: dataAgenda.detail,
        };

        await DatamanagementService()
          .updatemeeting(
            state,
            newDataAgenda,
            dataAgenda.userAttendee,
            dataDetail,
            dataFood,
          )
          .then(async data => {
            const result: any = [];
            if (dataAgenda.files.fileList === undefined) {
            } else {
              if (Object.keys(dataAgenda.files.fileList).length === 0) {
                await DatamanagementService().removeFileoverviewAll(state);
                console.log('remove files!');
              } else {
                dataAgenda.files.fileList.map(async (x: any, i: number) => {
                  if (x.pathfile === undefined) {
                    const formData = new FormData();
                    if (x.originFileObj === undefined) {
                      formData.append('file', x);
                    } else {
                      formData.append('file', x.originFileObj);
                    }
                    await DatamanagementService().uploadFileoverview(
                      formData,
                      state,
                      x.name,
                      i,
                    );
                  } else {
                    result.push({
                      idfile: x.uid,
                      idroom: state,
                      type: 'oldfile',
                    });
                  }
                });
                await DatamanagementService().updateoldFileoverview(result);
              }
            }
            if (dataDetail['agenda'].length !== 0) {
              dataDetail['agenda'].map(async (x: any, number: number) => {
                if (x.file.fileList !== undefined) {
                  if (Object.keys(x.file.fileList).length === 0) {
                    await DatamanagementService().removeFileagendesAll(
                      state,
                      number,
                    );
                    console.log('remove files!');
                  } else {
                    const result: any = [];
                    x.file.fileList.map(async (e: any, i: number) => {
                      if (e.pathfile === undefined) {
                        const formData = new FormData();
                        formData.append('file', e.originFileObj);
                        await DatamanagementService().uploadFileagendas(
                          formData,
                          state,
                          e.name,
                          i,
                          number,
                        );
                      } else {
                        result.push({
                          idfile: e.uid,
                          idroom: state,
                          step: e.step,
                          type: 'oldfile',
                        });
                      }
                    });
                    await DatamanagementService().updateoldFileagenda(result);
                  }
                } else {
                  console.log('not update ');
                }
              });
            }
          });
        navigate('/meeting-schedule');
      },
      onCancel: () => {},
    });
  };

  const steps = [
    {
      title: 'AgendaPage',
      content: (
        <AgendaPage
          setDataField={setDataAgendaield}
          data={dataIntable}
          user={dataUser}
          nameFileoverview={nameFileoverview}
        />
      ),
    },
    {
      title: 'DetailPage',
      content: (
        <DetailPage
          setDataField={setDataAgendaField}
          data={dataIntable}
          agenda={agendaDetail}
          nameFileagendes={nameFileagendes}
          id={state}
        />
      ),
    },
    {
      title: 'FoodPage',
      content: <FoodPage setDataField={setDataFoodField} />,
    },
  ];

  return (
    <>
      <>
        <Card title="Create Meeting" style={{ width: '100%' }}></Card>
      </>
      <Card>
        <Row>
          <Col md={24}>
            <Steps
              current={currentStep}
              items={[
                {
                  title:
                    currentStep === 1
                      ? 'In Progress'
                      : currentStep < 1
                      ? 'Waiting'
                      : 'Finish',
                },
                {
                  title:
                    currentStep === 1
                      ? 'In Progress'
                      : currentStep < 1
                      ? 'Waiting'
                      : 'Finish',
                },
                {
                  title:
                    currentStep === 2
                      ? 'In Progress'
                      : currentStep < 2
                      ? 'Waiting'
                      : 'Finish',
                },
              ]}
            ></Steps>
          </Col>
        </Row>
        <Row>
          {steps.map(({ title, content }, i) => (
            <Col
              md={24}
              key={title}
              className={i === currentStep ? 'block' : 'none'}
            >
              {content}
            </Col>
          ))}
        </Row>
        <br></br>
        <Row justify="center" gutter={16}>
          <Col>
            {currentStep > 0 && (
              <Button
                style={{ marginLeft: 8 }}
                onClick={() => onChangeCurrentStep(currentStep - 1)}
              >
                Back
              </Button>
            )}
          </Col>
          <Col>
            {currentStep < steps.length - 1 && currentStep !== 0 && (
              <Button
                style={{ color: 'white', background: '#1E6541' }}
                onClick={() => onChangeCurrentStep(currentStep + 1)}
              >
                Next
              </Button>
            )}
          </Col>
          <Col>
            {currentStep < steps.length - 1 && currentStep === 0 && (
              <Button
                style={{ color: 'white', background: '#1E6541' }}
                onClick={() => onChangeCurrentCheckStep(currentStep + 1)}
              >
                Next
              </Button>
            )}
          </Col>
          <Col>
            {' '}
            {currentStep === steps.length - 1 && (
              <Button
                style={{ color: 'white', background: '#1E6541' }}
                htmlType="submit"
                onClick={checkSubmitForm}
              >
                Submit
              </Button>
            )}
          </Col>
        </Row>
      </Card>
    </>
  );
};
