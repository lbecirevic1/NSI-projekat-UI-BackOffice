export class ProviderRegionData {
    id: number = 0;
    name: string = '';
    code: string = '';
    providerExists: number = 0;
    isSelected: boolean = false;
}

export class ProviderRegion{
    constructor(
        public data: ProviderRegionData = new ProviderRegionData(),
        public children?: ProviderRegion[]) {
    }
}