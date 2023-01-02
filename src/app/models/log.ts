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
