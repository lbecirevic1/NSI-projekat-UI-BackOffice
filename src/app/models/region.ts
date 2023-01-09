export class Region{
  constructor(
    public Id: number,
    public Name: string,
    public Code: string,
    public RegionTypeId?:number,
    public ParentRegionId?:number,
    public CreateDate?:any,
    public children?: []) {
  }

}

export class RegionAll{
  constructor(
    public Id: number,
    public Name: string,
    public Code: string,
    public RegionTypeId:number,
    public RegionType:string,
    public ParentregionId:number,
    public ParentRegion:string,
    public CreateDate:any) {
  }

}
