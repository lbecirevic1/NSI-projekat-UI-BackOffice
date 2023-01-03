export class Log {
  constructor(
    public id: number,
    public requestStartTime: Date,
    public requestEndTime: Date,
    public success: boolean,
    public providerName: string,
    public providerId: number
  ) {}
}

export class Paging {
  constructor(
    public page?: number,
    public totalRecords?: number,
    public recordsPerPage?: number,
    public pages?: number,
  ) {}
}

export class LogsResponse {
  constructor(
    public paging: Paging,
    public data: Log[],
    public error: any,
    public success: boolean,
  ) {}
}

export class LogWithTime {
  constructor(
    public id: number,
    public requestStartDate: string,
    public requestStartTime: string,
    public requestEndDate: string,
    public requestEndTime: string,
    public status: string,
    public providerName: string,
    public providerId: number,
  ) {}
}