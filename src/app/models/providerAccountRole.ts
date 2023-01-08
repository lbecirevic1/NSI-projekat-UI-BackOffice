export class ProviderAccountRole {
    constructor(
      public roleId: number,
      public providerId: number,
      public regionId: number,
      public providerName: string,
      public regionName: string,
      public roleName: string
    ) {}
  }
  