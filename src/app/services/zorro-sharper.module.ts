import { NgModule } from '@angular/core';
// import { NsAutoHeightTableDirective } from '../ns-auto-height-table.directive';
// import { NsAutoHeightCardDirective } from '../ns-auto-height-card.directive';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { CommonModule, registerLocaleData } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';

const DIRECTIVES: never[] = [
  // NsAutoHeightTableDirective,
  // NsAutoHeightCardDirective
];

import en from '@angular/common/locales/en';

import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { NZ_I18N, en_GB, NZ_DATE_LOCALE } from 'ng-zorro-antd/i18n';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { enUS } from 'date-fns/locale';

registerLocaleData(en);

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])

@NgModule({
  declarations: [...DIRECTIVES],
  imports: [CommonModule, OverlayModule,NzEmptyModule,NzIconModule],
  exports: [...DIRECTIVES],
  providers: [ {provide: NZ_DATE_LOCALE, useValue: enUS}, { provide: NZ_I18N, useValue: en_GB }, { provide: NZ_ICONS, useValue: icons } ],
  entryComponents: [],
})
export class ZorroSharperModule {}


