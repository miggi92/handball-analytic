import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppUpdateService } from './app-update.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private pwaUpdate: AppUpdateService,
    translate: TranslateService
  ) {
    // Register translation languages
    translate.addLangs(['en', 'de']);
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('en');
  }
}
