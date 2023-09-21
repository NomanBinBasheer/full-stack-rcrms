export interface Request {
  correctedData: string;
  createdAt: string;
  currentData: string;
  documents: [];
  fromUser: {
    _id: string,
    name: string,
    fatherName: string,
    isAdmin: boolean,
    dateOfBirth: string
  };
  remarks: string;
  requestType: string;
  _id: string;
}
