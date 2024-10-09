import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector, EmbeddedViewRef } from '@angular/core';
import { PopupComponent } from '../../components/popup/popup.component';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private popupComponentRef: any;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) { }

  show(options: { title: string, description: string }) {
    const componentRef = this.componentFactoryResolver
      .resolveComponentFactory(PopupComponent)
      .create(this.injector);

    componentRef.instance.title = options.title;
    componentRef.instance.description = options.description;

    this.appRef.attachView(componentRef.hostView);

    const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    document.body.appendChild(domElem);

    this.popupComponentRef = componentRef;
  }

  removePopup() {
    this.appRef.detachView(this.popupComponentRef.hostView);
    this.popupComponentRef.destroy();
  }
}
