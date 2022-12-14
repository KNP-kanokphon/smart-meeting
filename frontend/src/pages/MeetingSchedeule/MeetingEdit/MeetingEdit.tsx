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
  const [nameFilesummary, setNamefilesummary] = useState<any>([]);
  const [agenda, setAgenda] = useState<any>();
  const [dataMap, setDataMap] = useState<any>([]);
  const [food, setFood] = useState<any>([]);
  const [getLastdata, setLastdata] = useState([]);

  useEffect(() => {
    const getListmeeting = async () => {
      await DatamanagementService()
        .getMeetingByid(state)
        .then(data => {
          setDataIntable(data);
        });

      await DatamanagementService()
        .getuserInroom(state)
        .then(async (data: any) => {
          setDataUser(data);
          const position = await DatamanagementService()
            .getPositionall()
            .then(data => {
              setPositionName(data);
              return data;
            });
        });
      updateDataFile();
      const resultAgenda = await DatamanagementService().getagendaByid(state);
      const newData: any = [];
      resultAgenda?.map((x: any) => {
        newData.push({
          uuid: x.uuid,
          agendes: x.agendes,
          detail: x.detailagendes,
          step: x.detailagendes,
        });
      });

      setAgenda(newData);
      setDataMap(newData);
      const food = await DatamanagementService().getDetailfood(state);

      const fooddetail: any[] = [];
      food?.map((x: any, y: number) => {
        if (x.typefood === 'food') {
          fooddetail.push({ typefood: 'food', namefood: `${x.namefood}` });
        } else if (x.typefood === 'snack') {
          fooddetail.push({ typefood: 'snack', namefood: `${x.namefood}` });
        } else if (x.typefood === 'drink') {
          fooddetail.push({ typefood: 'drink', namefood: `${x.namefood}` });
        }
      });
      setFood(fooddetail);
    };

    getListmeeting().catch(console.error);
  }, []);

  const updateDataFile = async () => {
    const resultnamefilesummary =
      await DatamanagementService().getnamefileSummary(state);
    setNamefilesummary(resultnamefilesummary);
  };

  const onChangeCurrentStep = (step: number) => {
    setCurrentStep(step);
  };

  const onChangeCurrentCheckStep = (step: number) => {
    if (dataAgenda.title === '' || typeof dataAgenda.title === 'undefined') {
      message.error(`?????????????????????????????????????????????????????????????????????????????????`);
      return;
    } else if (dataAgenda.date === '' || !dataAgenda.date) {
      message.error(`?????????????????????????????????????????????????????????????????????????????????`);
      return;
    } else if (dataAgenda.timeStart === '' || !dataAgenda.timeStart) {
      message.error(`??????????????????????????????????????????????????????????????????????????????????????????`);
      return;
    } else if (dataAgenda.timeEnd === '' || !dataAgenda.timeEnd) {
      message.error(`????????????????????????????????????????????????????????????????????????????????????????????????`);
      return;
    } else {
      setCurrentStep(step);
    }
  };
  const setDataFieldNew = (dataField: any) => {
    const newState = {
      id: 2,
      ...dataField.values,
      uuid: dataField.id,
      step: dataField.step,
    };
    let resultData = [];
    const oldData = agenda.filter(
      (z: any) => String(z.step) !== String(dataField.step),
    );
    resultData = oldData;
    resultData.push(newState);
    setAgenda(resultData);
  };

  const setDataAgendaField = (dataField: any) => {
    setDataDetail(dataField);
    let resultData = [];
    const newState = {
      id: 2,
      ...dataField.values,
      uuid: dataField.id,
      step: dataField.step,
    };
    const oldData = agenda.filter(
      (z: any) => String(z.step) !== String(dataField.step),
    );
    resultData = oldData;
    resultData.push(newState);
    setAgenda(resultData);
  };
  const updateFile = async (data: any) => {
    if (data) {
      await updateDataFile();
    }
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
    if (dataFood.length === 0) {
      message.error('0 length');
      return;
    }

    const check = new Promise<void>((resolve, reject) => {
      if (dataFood.fooddetail.length === 0) {
        message.error('?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????1??????????????????');
        return;
      }
      dataFood.fooddetail.forEach(
        (element: any, index: number, array: string | any[]) => {
          if (!element) {
            message.error('???????????????????????????????????????????????????????????????????????????');
            return;
          }
          if (!element.typefood) {
            message.error(`??????????????????????????????????????????????????????????????????????????????????????????????????????`);
            return;
          } else if (
            !element.namefood ||
            typeof element.namefood == 'undefined'
          ) {
            message.error(`??????????????????????????????????????????????????????????????????????????????????????????????????????????????????`);
            return;
          }
          if (index === array.length - 1) resolve();
        },
      );
    });

    check.then(() => submitForm());
  };

  const submitForm = () => {
    const newDatauserBoard: any = [];
    const newDatauserAgenda: any = [];
    dataAgenda.userBoard.map((e: any) => {
      newDatauserBoard.push({
        username: e.username,
        uuidprofile: e.uuidprofile,
        type_user: e.type_user,
        position: e.position,
      });
    });
    dataAgenda.userAttendee.map((e: any) => {
      newDatauserAgenda.push({
        username: e.username,
        uuidprofile: e.uuidprofile,
        type_user: e.type_user,
        position: e.position,
      });
    });
    Modal.confirm({
      title: 'Confirm Create this meeting',
      icon: <ExclamationCircleOutlined />,
      // content: `Link... ${window.origin}/${id}`,
      okText: '??????????????????',
      cancelText: '??????????????????',
      onOk: async () => {
        const newFile = dataAgenda?.fileOverview.filter(
          (x: any) => x?.pathfile === undefined || x?.idmeeting === undefined,
        );
        const oldFileupdate = dataAgenda?.fileOverview.filter(
          (x: any) => x?.pathfile !== undefined || x?.idmeeting !== undefined,
        );
        const result = await DatamanagementService()
          .updatemeeting(
            state,
            dataAgenda,
            getLastdata,
            dataFood,
            oldFileupdate,
          )
          .then(async (data: any) => {});
        const formData = new FormData();
        newFile.map((e: any) => {
          formData.append('file', e);
        });
        await DatamanagementService()
          .updatefileOverviwe(state, formData)
          .then((data: any) => {});
        navigate('/meeting/meeting-schedule');
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
          nameFilesummary={nameFilesummary}
        />
      ),
    },
    {
      title: 'DetailPage',
      content: (
        <DetailPage
          setDataField={setDataAgendaField}
          lastDataAgenda={lastDataAgenda}
          data={dataIntable}
          agenda={agenda}
          nameFilesummary={nameFilesummary}
          id={state}
          setDataFieldNew={setDataFieldNew}
          updateFile={updateFile}
        />
      ),
    },
    {
      title: 'FoodPage',
      content: (
        <FoodPage
          setDataField={setDataFoodField}
          data={dataIntable}
          food={food}
        />
      ),
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
            >
              {/* <Step
                title={
                  currentStep === 0
                    ? 'In Progress'
                    : currentStep < 0
                    ? 'Waiting'
                    : 'Finish'
                }
              />
              <Step
                title={
                  currentStep === 1
                    ? 'In Progress'
                    : currentStep < 1
                    ? 'Waiting'
                    : 'Finish'
                }
              />
              <Step
                title={
                  currentStep === 2
                    ? 'In Progress'
                    : currentStep < 2
                    ? 'Waiting'
                    : 'Finish'
                }
              /> */}
            </Steps>
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
