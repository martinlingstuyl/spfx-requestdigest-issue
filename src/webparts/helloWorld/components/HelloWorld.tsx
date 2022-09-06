import * as React from 'react';
import { ISPFxService, SPFxService } from '../../../SPFxService';
import { IHelloWorldProps } from './IHelloWorldProps';


export default class HelloWorld extends React.Component<IHelloWorldProps, { formDigestValue?: string}> {
  private _SPFxService: ISPFxService;

  
  public constructor(props: IHelloWorldProps) {
    super(props);

    this._SPFxService = props.serviceScope.consume(SPFxService.serviceKey);

    this.state = {
    }
  }

  public render(): React.ReactElement<IHelloWorldProps> {   
    const digest = this._SPFxService.getFormDigest();
    return (
      <section>        
        <div>
          <p>Current time: {(new Date()).toISOString()}</p>
          <p>Current Digest: {digest.split(',')[1]}</p>
        </div>
      </section>
    );    
  }
}
