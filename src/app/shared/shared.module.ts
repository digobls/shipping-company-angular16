import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DefaultSimpleTableComponent } from './components/default-simple-table/default-simple-table.component';
import { DocumentMaskPipe } from './components/default-simple-table/pipes/document-mask.pipe';
import { PhoneMaskPipe } from './components/default-simple-table/pipes/phone-mask.pipe';
import { ReadJsonPipe } from './components/default-simple-table/pipes/read-json.pipe';
import { NgxMaskDirective } from 'ngx-mask';
import { NgxPaginationModule } from 'ngx-pagination';
import { DefaultNavbarComponent } from './components/default-navbar/default-navbar.component';
import { InputTypeComponent } from './components/input-type/input-type.component';
import { SearchDropDownPipe } from './components/input-type/pipes/search-drop-down.pipe';
import { SkeletonLoadingComponent } from './components/skeleton-loading/skeleton-loading.component';
import { DefaultSidebarComponent} from './components/default-sidebar/default-sidebar.component';

@NgModule({
  declarations: [
    DocumentMaskPipe,
    PhoneMaskPipe,
    ReadJsonPipe,
    DefaultSimpleTableComponent,
    DefaultNavbarComponent,
    InputTypeComponent,
    SearchDropDownPipe,
    SkeletonLoadingComponent,
    DefaultSidebarComponent
  ],
  exports: [
    DocumentMaskPipe,
    PhoneMaskPipe,
    ReadJsonPipe,
    DefaultSimpleTableComponent,
    DefaultNavbarComponent,
    InputTypeComponent,
    SearchDropDownPipe,
    SkeletonLoadingComponent,
    DefaultSidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgxMaskDirective,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  providers: []
})

export class SharedModule {

}
