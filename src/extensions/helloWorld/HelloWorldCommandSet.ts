import { Log } from '@microsoft/sp-core-library';
import {
  BaseListViewCommandSet,
  IListViewCommandSetExecuteEventParameters
} from '@microsoft/sp-listview-extensibility';
import { Dialog } from '@microsoft/sp-dialog';
import { ISPFxService, SPFxService } from '../../SPFxService';

export interface IHelloWorldCommandSetProperties {
}

const LOG_SOURCE: string = 'HelloWorldCommandSet';

export default class HelloWorldCommandSet extends BaseListViewCommandSet<IHelloWorldCommandSetProperties> {
  private _SPFxService: ISPFxService;

  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, 'Initialized HelloWorldCommandSet');
    this._SPFxService = this.context.serviceScope.consume(SPFxService.serviceKey);

    return Promise.resolve();
  }

  public onExecute(event: IListViewCommandSetExecuteEventParameters): void {
    
    const digest = this._SPFxService.getFormDigest();
    const message = `Current time: ${(new Date()).toISOString()} / Current digest ${digest.split(',')[1]}`;
    
    Dialog.alert(message).then(() => {
      //do nothing
    }, (error: Error) => {
          if (console && console.error && error) {
            console.error(error);
          }
    });    
  }
}
