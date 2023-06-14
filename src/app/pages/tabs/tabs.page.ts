import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonTabs, Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  @ViewChild('tabs', { static: false }) tabs: IonTabs;
  selectedTab: String;
  subscription: Subscription;
  private activeTab?: HTMLElement;

  constructor(
    private platform: Platform,
    private router: Router
  ) { }

  async ionViewDidEnter() {
    this.subscription = this.platform.backButton.subscribe(() => {
      navigator['app'].exitApp();
    });
    this.propagateToActiveTab('ionViewDidEnter');
  }


  setSelectedTab() {
    this.selectedTab = this.tabs.getSelected();
    this.router.navigate([`${this.tabs.getSelected()}`], {
      replaceUrl: true,
    });
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();
    this.propagateToActiveTab('ionViewWillLeave');
  }

  tabChange(tabsRef: IonTabs) {
    this.selectedTab = this.tabs.getSelected();
    this.activeTab = tabsRef.outlet.activatedView.element;
  }

  ionViewDidLeave() {
    this.propagateToActiveTab('ionViewDidLeave');
  }

  ionViewWillEnter() {
    this.propagateToActiveTab('ionViewWillEnter');
  }

  private propagateToActiveTab(eventName: string) {
    if (this.activeTab) {
      this.activeTab.dispatchEvent(new CustomEvent(eventName));
    }
  }


}
