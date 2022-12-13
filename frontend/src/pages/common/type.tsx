export interface IDataroom {
  roomid: string | any;
  title: string;
  room: string;
  floor: string;
  building: string;
  meetingPlace: string;
  date: Date;
  timeStart: string;
  timeEnd: string;
  detailMeeting: string;
}
export interface IUsers {
  id: number;
  username: string;
  uuidprofile: string;
  idmeeting: string;
  type: string;
  type_user: string;
  position: string;
  phone: string | null;
  email: string | null;
  model: string | null;
  confirm: boolean;
  checkin: boolean;
  foodstatus: boolean;
  signature: string | null;
}
