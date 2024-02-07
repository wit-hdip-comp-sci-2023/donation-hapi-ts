export type User = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  _id: string;
};

export type Candidate = {
  firstName: string;
  lastName: string;
  office: string;
  _id: string;
};

export type Donation = {
  amount: number;
  method: string;
  candidate: Candidate;
  donor: User;
  lat: number;
  lng: number;
  _id: string;
};

export type Db = {
  userStore: any;
  candidateStore: any;
  donationStore: any;
};
