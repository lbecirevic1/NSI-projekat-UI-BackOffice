export class Street{
  constructor(
    public Id: number,
    public Name: string,
    public CreateDate:any,
    public RegionId:number,
  ) {}

}

export class StreetAll{
  constructor(
    public Id: number,
    public Name: string,
    public CreateDate:any,
    public RegionId:number,
    public Region:string
  ) {}

}

