import { Button, Card, Col, Row, Steps, Modal, message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useEffect, useRef, useState } from 'react';
import { AgendaPage } from '../../MeetingCreate/agendaPage';
import { DetailPage } from '../../MeetingCreate/detailsPage';
import { FoodPage } from '../../MeetingCreate/foodPage';
// import './styles.css';
import { DatamanagementService } from '../../../stores/meeting-store';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

const { Step } = Steps;

export const CreateMeeting: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [dataAgenda, setDataAgenda] = useState<any>([]);
  const [dataDetail, setDataDetail] = useState<any>([]);
  const [dataFood, setDataFood] = useState<any>([]);
  const [dataBaypass, setDataBaypass] = useState<any>([]);
  const childRef = useRef<any>();

  const onChangeCurrentStep = (step: number) => {
    setCurrentStep(step);
  };
  const onChangeCurrentCheckStep = (step: number) => {
    // if (dataAgenda.title === '' || typeof dataAgenda.title === 'undefined') {
    //   message.error(`กรุณากรอกเรื่องของการประชุม`);
    //   return;
    // } else if (dataAgenda.date === '' || !dataAgenda.date) {
    //   message.error(`กรุณากรอกวันที่ของการประชุม`);
    //   return;
    // } else if (dataAgenda.timeStart === '' || !dataAgenda.timeStart) {
    //   message.error(`กรุณากรอกเวลาเริ่มของการประชุม`);
    //   return;
    // } else if (dataAgenda.timeEnd === '' || !dataAgenda.timeEnd) {
    //   message.error(`กรุณากรอกเวลาสิ้นสุดของการประชุม`);
    //   return;
    // } else {
    //   setCurrentStep(step);
    // }
    setCurrentStep(step);
  };

  const setDataAgendaField = (dataField: any) => {
    // console.log(dataField);
    // setDataDetail(dataField);
    setDataDetail((pre: any) => ({ ...pre, ...dataField }));
  };

  const setDataFoodField = (dataField: any) => {
    setDataFood((pre: any) => ({ ...pre, ...dataField }));
  };

  const setDataAgendaield = (dataField: any) => {
    setDataAgenda((pre: any) => ({ ...pre, ...dataField }));
  };

  const checkSubmitForm = () => {
    // console.log(dataAgenda, 'dataAgenda');
    // console.log(dataDetail, 'dataDetail');
    // console.log(dataFood, 'dataFood');
    // if (dataFood.length === 0) {
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
    // const newDatauserBoard: any = [];
    // const newDatauserAgenda: any = [];
    // dataAgenda.userBoard.map((e: any) => {
    //   newDatauserBoard.push({
    //     username: e.username,
    //     uuidprofile: e.uuidprofile,
    //     type_user: e.type_user,
    //     position: e.position,
    //   });
    // });
    // dataAgenda.userAttendee.map((e: any) => {
    //   newDatauserAgenda.push({
    //     username: e.username,
    //     uuidprofile: e.uuidprofile,
    //     type_user: e.type_user,
    //     position: e.position,
    //   });
    // });
    const id = uuidv4();
    Modal.confirm({
      title: 'Confirm Create this meeting',
      icon: <ExclamationCircleOutlined />,
      // content: `Link... ${window.origin}/${id}`,
      okText: 'ยืนยัน',
      cancelText: 'ยกเลิก',
      onOk: async () => {
        const newDataAgenda = {
          title: dataAgenda.title,
          room: dataAgenda.room,
          floor: dataAgenda.floor,
          building: dataAgenda.building,
          meetingPlace: dataAgenda.meetingPlace,
          date: dataAgenda.date,
          timeStart: dataAgenda.timeStart,
          timeEnd: dataAgenda.timeEnd,
          detailMeeting: dataAgenda.detailMeeting,
        };
        await DatamanagementService()
          .createmeeting(
            id,
            newDataAgenda,
            dataAgenda.userAttendee,
            dataDetail,
            dataFood,
          )
          .then(async data => {
            if (dataAgenda.fileOverview !== undefined) {
              const formData = new FormData();
              dataAgenda.fileOverview.map((e: any) => {
                formData.append('file', e);
              });
              await DatamanagementService().import(formData, id);
            }
            dataDetail['agenda'].map((x: any) => {
              if (x.file !== undefined) {
                x.file.fileList.map((e: any, i: string) => {
                  console.log(e);
                  DatamanagementService().savefileagendas(e, id, i, false);
                });
              }
            });
          });
        // const createMeetingText = await DatamanagementService().createmeeting();
        // if (dataAgenda.fileOverview !== undefined) {
        //   const formData = new FormData();
        //   dataAgenda.fileOverview.map((e: any) => {
        //     formData.append('file', e);
        //   });
        //   // save fileStep1
        //   await DatamanagementService().import(formData, id);
        // }
        // await DatamanagementService()
        //   .createmeeting(
        //     dataAgenda.detailMeeting,
        //     dataAgenda.title,
        //     dataAgenda.room,
        //     dataAgenda.floor,
        //     dataAgenda.building,
        //     dataAgenda.meetingPlace,
        //     dataAgenda.date,
        //     dataAgenda.timeStart,
        //     dataAgenda.timeEnd,
        //     id,
        //     dataFood.fooddetail,
        //     dataFood.gift,
        //   )
        //   .then(data => {});

        // await DatamanagementService()
        //   .saveusermeetingall(newDatauserBoard, newDatauserAgenda, id)
        //   .then(data => {});
        // dataDetail.map((e: any, i: string) => {
        //   DatamanagementService().saveagenda(e.values, id, i);
        // });
        // dataDetail.map((e: any, i: string) => {
        //   DatamanagementService().savefileagendas(e.files, id, i, false);
        // });
        navigate('/meeting/meeting-schedule');
      },
      onCancel: () => {},
    });
  };

  // useEffect(() => {
  //   console.log('useEffect ran. ', dataAgenda);
  // }, [dataAgenda]);

  const steps = [
    {
      title: 'AgendaPage',
      content: <AgendaPage setDataField={setDataAgendaield} />,
    },
    {
      title: 'DetailPage',
      content: <DetailPage setDataField={setDataAgendaField} />,
    },
    {
      title: 'FoodPage',
      content: <FoodPage setDataField={setDataFoodField} />,
    },
  ];
  return (
    <>
      {/* <>
        <Card title="สร้างวาระการประชุม" style={{ width: '100%' }}></Card>
      </> */}
      <br></br>
      <Card title="สร้างวาระการประชุม">
        {/* <Row>
          <Col md={24}>
            <Steps
              current={currentStep}
              items={[
                {
                  title:
                    currentStep === 0
                      ? 'In Progress'
                      : currentStep < 0
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
            >
            </Steps>
          </Col>
        </Row> */}
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
