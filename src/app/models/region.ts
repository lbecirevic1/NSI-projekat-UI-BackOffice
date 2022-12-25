export class Region{
  constructor(
    public Id: number,
    public Name: string,
    public Code: string,
    public RegionTypeId:number,
    public ParentregionId:number,
    public CreateDate:any) {
  }

}
