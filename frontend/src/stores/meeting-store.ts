import axios from 'axios';
import { httpClient } from '../utils/http-client';

// import { makeAutoObservable } from 'mobx';
// import { getListmeeting, MeetingList } from './meeting-data.service';

// export interface IDatamanagementService {
//   getListmeeting: () => Promise<any>;
// }
export const DatamanagementService = () => ({
  getListmeeting: async () => {
    const result = await httpClient.get(`/meeting/`);
    return result.data;
  },
  createmeeting: async (
    detail: string,
    title: string,
    room: string,
    floor: string,
    building: string,
    meetingplace: string,
    day: string,
    starttime: string,
    endtime: string,
    uuid: string,
    dataFood: any,
  ) => {
    const data = {
      detail: detail,
      title: title,
      room: room,
      floor: floor,
      building: building,
      meetingplace: meetingplace,
      day: day,
      starttime: starttime,
      endtime: endtime,
      uuid: uuid,
      dataFood: dataFood,
    };
    const result = await httpClient.post(`/meeting/`, data);
    return result.data;
  },
  saveusermeetingall: async (
    userBoard: [],
    userAttendee: [],
    idmeeting: string,
  ) => {
    const newData = {
      userBoard: userBoard,
      userAttendee: userAttendee,
      idmeeting: idmeeting,
    };
    // const newData: any = [];
    // userAll.map(
    //   (x: {
    //     username: string;
    //     phone: string;
    //     email: string;
    //     model: string;
    //     position: string;
    //     uuid: string;
    //     idmeeting: string;
    //     checkin: boolean;
    //   }) => {
    //     newData.push({
    //       username: x.username,
    //       email: x.email,
    //       phone: x.phone,
    //       model: x.model,
    //       position: x.position,
    //       uuid: x.uuid,
    //       idmeeting: idmeeting,
    //       checkin: false,
    //     });
    //   },
    // );

    const result = await httpClient.post(`/userattendees/`, newData);
    return result.data;
  },
  saveuserattendeesByuser: async (userDetail: {
    username: string;
    phone: string;
    email: string;
    model: string;
    position: string;
    uuidprofile: string;
    idmeeting: string;
    checkin: boolean;
  }) => {
    const result = await httpClient.post(`/userattendees/byuser`, userDetail);
    return result.data;
  },
  getProfileByid: async (roomid: any, userid: any) => {
    const result = await httpClient.get(`/userattendees/${roomid}/${userid}`);
    return result.data;
  },
  getMeetingByid: async (roomid: any) => {
    const result = await httpClient.get(`/meeting/${roomid}`);

    return result.data;
  },
  checkin: async (roomid: any, userid: any, status: boolean) => {
    const data = {
      roomid: roomid,
      userid: userid,
      status: status,
    };
    const result = await httpClient.put(`/userattendees/`, data);

    return result.data;
  },
  import: async (file: any, id: string) => {
    const result = await httpClient.post(`/meeting/import/${id}`, file, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return result.data;
  },
  getuserInroom: async (roomid: any) => {
    const result = await httpClient.get(`/userattendees/${roomid}`);
    return result.data;
  },
  getuserInroomAll: async () => {
    const result = await httpClient.get(`/userattendees/userinroomall`);
    // console.log(result);
    return result.data;
  },
  getFiles: async (roomid: any) => {
    const result = await httpClient.get(`/meeting/filepdf/${roomid}`, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      responseType: 'arraybuffer',
    });
    return result.data;
  },
  upLoadfilecsv: async (data: any) => {
    const result = await httpClient.post(`/userattendees/uploaduser`, {
      data: data,
    });
    return result.data;
  },
  getUser: async () => {
    const result = await httpClient.post(`/userattendees/userAll`);
    return result.data;
  },
  saveagenda: async (data: any, id: string, step: string) => {
    const newData = {
      agendas: data,
      id: id,
      step: step,
    };
    const result = await httpClient.post(`/meeting/agenda`, newData);
    return result.data;
  },
  savefileagendas: async (file: any, id: string, step: string) => {
    const result = await httpClient.post(
      `/meeting/agendafile/${id}/${step}`,
      file,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return result.data;
  },
  getagendaByid: async (idroom: any) => {
    const result = await httpClient.get(`meeting/agenda/${idroom}`);
    return result.data;
  },
  updateStatusUser: async (idroom: any, userId: any) => {
    const result = await httpClient.put(
      `userattendees/updatestatususer/${idroom}/${userId}`,
    );
    return result.data;
  },
  updateByid: async (uuid: any, data: any) => {
    const result = await httpClient.put(
      `userattendees/updateUserbyid/${uuid}`,
      data,
    );
    return result.data;
  },
  // getUserByid: async (userid: any) => {
  //   const result = await httpClient.get(
  //     `user/getuserbyid/${userid}`,
  //   );
  //   return result.data;
  // },
  importPosition: async (data: any, type: any) => {
    const newData = {
      data: data,
    };
    const result = await httpClient.post(
      `userattendees/import/position/${type}`,
      newData,
    );
    return result.data;
  },
  getPositionall: async () => {
    const result = await httpClient.get(`userattendees/positionall`);
    return result.data;
  },
  getCourseall: async () => {
    const result = await httpClient.get(`userattendees/courseall`);
    return result.data;
  },
  deletePosition: async (data: any) => {
    console.log(data.uuid);
    const newData = {
      data: data,
    };
    console.log(newData);
    const result = await httpClient.delete(
      `userattendees/delete/position/${data.uuid}`,
      newData,
    );
    return result?.data;
  },
});
