import { User } from './user';

export class Request {
  id: number;
  user: {
    firstName: string;
    id: number;
    lastName: string;
  };

  requestNumber: string;
  description: string;
  justification: string;
  dateNeeded: Date;
  deliveryMode: string;
  status: string;
  total: number;
  submittedDate: Date;
  reasonForRejection: string;

  constructor(
    id: number = 0,
    user: { firstName: string; id: number; lastName: string } = {
      firstName: '',
      id: 0,
      lastName: '',
    },
    requestNumber: string = '',
    description: string = '',
    justification: string = '',
    dateNeeded: Date = new Date(),
    deliveryMode: string = '',
    status: string = '',
    total: number = 0,
    submittedDate: Date = new Date(),
    reasonForRejection: string = ''
  ) {
    this.id = id;
    this.user = user;
    this.requestNumber = requestNumber;
    this.description = description;
    this.justification = justification;
    this.dateNeeded = dateNeeded;
    this.deliveryMode = deliveryMode;
    this.status = status;
    this.total = total;
    this.submittedDate = submittedDate;
    this.reasonForRejection = reasonForRejection;
  }
}
