import axios from 'axios';
import { IDataroom, IUsers } from '../pages/common/type';
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
    id: string,
    newDataAgenda: any,
    newDataUser: any,
    dataDetail: any,
    dataFood: any,
  ) => {
    const data = {
      id,
      newDataAgenda,
      newDataUser,
      dataDetail,
      dataFood,
    };
    const result = await httpClient.post(`/meeting/`, data);
    return result.data;
  },
  createuser: async (data: any) => {
    // console.log(data);
    const result = await httpClient.post(`/userattendees/createuser`, data);
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
    foodstatus: boolean;
    type_user: string;
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
  import: async (file: any, id: string, namefile: string, idfile: number) => {
    const result = await httpClient.post(
      `/meeting/import/${id}/${namefile}/${idfile}`,
      file,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return result.data;
  },
  getuserInroom: async (roomid: any) => {
    const result = await httpClient.get(`/userattendees/${roomid}`);
    return result.data;
  },
  getFilesoverview: async (roomid: any, namefile: string) => {
    const data = {
      roomid: roomid,
      namefile: namefile,
    };
    const result = await httpClient.post(`/meeting/getfileoverview`, data);
    console.log(result);

    return result.data;
  },

  getuserInroomAll: async () => {
    const result = await httpClient.get(`/userattendees/userinroomall`);
    // console.log(result);
    return result.data;
  },
  getFiles: async (roomid: any) => {
    const result = await httpClient.get(`/meeting/filepdf/${roomid}`);
    return result.data;
  },
  upLoadfilecsv: async (data: any) => {
    const result = await httpClient.post(`/userattendees/uploaduser`, {
      data: data,
    });
    return result.data;
  },
  upLoadfilecsvparty: async (data: any) => {
    const result = await httpClient.post(`/userparty`, {
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
  savefileagendas: async (
    file: any,
    id: string,
    step: string,
    update: boolean,
  ) => {
    const formData = new FormData();
    formData.append('file', file);
    const result = await httpClient.post(
      `/meeting/agendafile/${id}/${step}`,
      update === true ? formData : file,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return result;
  },
  deletefileagendas: async (
    idmeeting: string,
    step: string,
    namefile: string,
  ) => {
    const result = await httpClient.delete(
      `/meeting/agendafile/${idmeeting}/${step}/${namefile}`,
    );
    return result;
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
    const newData = {
      data: data,
    };
    const result = await httpClient.delete(
      `userattendees/delete/position/${data.uuid}`,
      newData,
    );
    return result?.data;
  },

  deleteUser: async (data: any) => {
    const newData = {
      data: data,
    };
    const result = await httpClient.delete(
      `user/delete/user/${data.uuid}`,
      newData,
    );
    return result?.data;
  },
  updateUser: async (uuid: any, data: any) => {
    // console.log(uuid);
    const newData = {
      data: data,
    };

    const result = await httpClient.put(`user/updateuser/${uuid}`, newData);
    return result?.data;
  },
  getPathFilePdf: async (roomid: any) => {
    const result = await httpClient.get(`/meeting/getPathFilePdf/${roomid}`);
    return result.data;
  },

  findUser: async (userid: any) => {
    const result = await httpClient.get(`findbyid/:userid${userid}`);
    return result.data;
  },
  findAll: async () => {
    const result = await httpClient.get(`userattendees`);
    return result.data;
  },

  // findbyidcontract: async (userid: any) => {
  //   const result = await httpClient.get(`/user/findbyids/${userid}`);
  //   console.log(result);

  //   return result.data;
  // },

  getPathFileStep: async (roomid: any, step: any, namefile: string) => {
    const result = await httpClient.get(
      `/meeting/getfilestep/${roomid}/${step}/${namefile}`,
    );
    return result.data;
  },
  getDetailfood: async (roomid: any) => {
    const result = await httpClient.get(`/meeting/detailfood/${roomid}`);
    return result.data;
  },
  updateStatusFood: async (roomid: any, userid: any, status: boolean) => {
    const result = await httpClient.put(
      `/userattendees/foodupdate/${roomid}/${userid}/${status}`,
    );
    return result.data;
  },
  updateUserDetail: async (roomid: any, userid: any, data: any) => {
    const result = await httpClient.put(
      `/userattendees/updateUserDetail/${roomid}/${userid}/`,
      data,
    );
    return result.data;
  },
  getDetailagenda: async (roomid: string, step: string) => {
    const result = await httpClient.get(
      `/meeting/getDetailagendes/${roomid}/${step}`,
    );
    return result.data;
  },
  saveSummaryMeetingFile: async (roomid: any, files: any) => {
    const result = await httpClient.post(
      `/meeting/savesummarymeetingFile/${roomid}`,
      files,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'arraybuffer',
      },
    );
    return result.data;
  },
  saveSummaryMeeting: async (roomid: any, detail: string) => {
    const newData = {
      data: detail,
    };

    const result = await httpClient.post(
      `/meeting/savesummarymeeting/${roomid}`,
      newData,
    );
    return result.data;
  },
  getPathFileSummary: async (roomid: any, namefile: string) => {
    const result = await httpClient.get(
      `/meeting/getfilesummary/${roomid}/${namefile}`,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'arraybuffer',
      },
    );
    return result.data;
  },
  getnamefileSummary: async (roomid: any) => {
    const result = await httpClient.get(
      `/meeting/getfilenamesummary/${roomid}/`,
    );
    return result.data;
  },

  updatecheckinparty: async (userid: string) => {
    const result = await httpClient.put(`/userparty/userin/${userid}`);
    return result.data;
  },
  getUserInparty: async (userid: any) => {
    const result = await httpClient.get(`/userparty/${userid}`);
    return result.data;
  },
  updaterecivegift: async (userid: string) => {
    const result = await httpClient.put(`/userparty/recivegif/${userid}`);
    return result.data;
  },
  importuser: async (data: string[]) => {
    const result = await httpClient.post(`/user/importuser`, data);
    return result.data;
  },
  updateroom: async (
    data: IDataroom,
    userAttendee: IUsers,
    userBoard: IUsers,
  ) => {
    const result = await httpClient.put(`/meeting`, {
      data: data,
      usersatd: userAttendee,
      userboard: userBoard,
    });
    return result.data;
  },
  updatemeeting: async (
    id: any,
    dataAgenda: any,
    getLastdata: any,
    dataFood: any,
    oldFileupdate: any,
  ) => {
    const result = await httpClient.post(`/meeting/updatemeeting`, {
      id: id,
      dataAgenda: dataAgenda,
      getLastdata: getLastdata,
      dataFood: dataFood,
      oldFileupdate: oldFileupdate,
    });
    return result.data;
  },
  updatefileOverviwe: async (roomid: any, files: any) => {
    const result = await httpClient.post(
      `/meeting/updatefileoverviwe/${roomid}`,
      files,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'arraybuffer',
      },
    );
    return result.data;
  },
  getGroup: async () => {
    const result = await httpClient.get(`user/groupall`);
    return result.data;
  },
  GroupAlls: async () => {
    const result = await httpClient.get(`userattendees/groupalls`);
    return result?.data;
  },

  // finduserbyid/:userid
  FindUserByID: async (userid: any) => {
    const result = await httpClient.get(`user/finduserbyid/${userid}`);
    return result?.data;
  },

  CreateGroup: async (data: any) => {
    const result = await httpClient.post(`userattendees/create/group`, data);
    return result?.data;
  },
  // delete/group/:uuid
  DeleteGroup: async (data: any) => {
    const newData = {
      data: data,
    };

    const result = await httpClient.delete(
      `userattendees/delete/group/${data.uuidgroup}`,
      newData,
    );
    return result?.data;
  },

  updateGroup: async (uuid: any, data: any) => {
    const newData = {
      data: data,
    };
    const result = await httpClient.put(
      `/userattendees/updateGroup/${uuid}`,
      newData,
    );
    return result?.data;
  },
});
