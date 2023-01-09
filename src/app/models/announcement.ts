export class Announcement{
constructor(
            public Id:number,
            public ProviderId: number,
            public Title: string,
            public SourceUrl: string,
            public Description:string,
            public Content:string,
            public RawLog:string,
            public UniqueIdentifier:string,
            public AdditionalInformation:string,
            public PublishDate: any,
            public ReferenceStartDate: any,
            public ReferenceEndDate: any,
            public streets:any=[],
            public regions:any=[]) {
}

}

export class Paging {
  constructor(
    public page?: number,
    public totalRecords?: number,
    public recordsPerPage?: number,
    public pages?: number,
  ) {}
}


