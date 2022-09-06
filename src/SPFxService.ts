import { ServiceKey, ServiceScope } from "@microsoft/sp-core-library";
import { PageContext } from "@microsoft/sp-page-context";

export interface ISPFxService {
    getFormDigest(): string;
}

export class SPFxService implements ISPFxService {

    public static readonly serviceKey: ServiceKey<ISPFxService> =
        ServiceKey.create<ISPFxService>('SPFx:SPFxService', SPFxService);

    private _formDigest: string;

    public constructor(serviceScope: ServiceScope) {
        serviceScope.whenFinished(() => {
            const pageContext = serviceScope.consume(PageContext.serviceKey);
            this._formDigest = pageContext.legacyPageContext.formDigestValue;
        });
    }

    public getFormDigest(): string {
        return this._formDigest;
    }
}