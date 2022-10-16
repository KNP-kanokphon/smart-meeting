import axios from 'axios';
// import { makeAutoObservable } from 'mobx';
// import { getListmeeting, MeetingList } from './meeting-data.service';

// export interface IDatamanagementService {
//   getListmeeting: () => Promise<any>;
// }
export const DatamanagementService = () => ({
  getListmeeting: async () => {
    const result = await axios.get(`/meeting/`);
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
    };
    const result = await axios.post(`/meeting/`, data);
    return result.data;
  },
  saveuserattendees: async (userAll: [], idmeeting: string) => {
    const newData: any = [];
    userAll.map(
      (x: { username: string; email: string; phone: string; uuid: string }) => {
        newData.push({
          username: x.username,
          email: x.email,
          phone: x.phone,
          uuid: x.uuid,
          idmeeting: idmeeting,
          checkin: false,
        });
      },
    );
    const result = await axios.post(`/userattendees/`, newData);
    return result.data;
  },
  saveuserattendeesByuser: async (userDetail: {
    username: string;
    phone: string;
    email: string;
    model: string;
    position: string;
    uuid: string;
    idmeeting: string;
    checkin: boolean;
  }) => {
    const result = await axios.post(`/userattendees/byuser`, userDetail);
    return result.data;
  },
  getProfileByid: async (roomid: any, userid: any) => {
    const result = await axios.get(`/userattendees/${roomid}/${userid}`);
    console.log(result);

    return result.data;
  },
  getMeetingByid: async (roomid: any) => {
    const result = await axios.get(`/meeting/${roomid}`);
    console.log(result);

    return result.data;
  },
  checkin: async (roomid: any, userid: any, status: boolean) => {
    const data = {
      roomid: roomid,
      userid: userid,
      status: status,
    };
    const result = await axios.put(`/userattendees/`, data);
    console.log(result);

    return result.data;
  },
});
