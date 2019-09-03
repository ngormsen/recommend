import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Angular Material components
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatSidenavModule } from '@angular/material/sidenav'; 
import { MatTabsModule } from '@angular/material/tabs'; 
import { MatDialogModule } from '@angular/material/dialog'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select'; 
import {MatRadioModule} from '@angular/material/radio'; 



// Third party components
import { NgxFloatButtonModule } from 'ngx-float-button'; // source: https://github.com/GustavoCostaW/ngc-float-button

// Local components
import { AppComponent } from './app.component';
import { GroupComponent } from './group/group.component';
import { GroupListComponent } from './group-list/group-list.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ItemComponent } from './item/item.component';
import { ItemListComponent } from './item-list/item-list.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainPanelComponent } from './main-panel/main-panel.component';
import { FloatingButtonComponent } from './floating-button/floating-button.component';
import { CreateItemDialogComponent } from './create-item-dialog/create-item-dialog.component';
import { NavCategoryComponent } from './nav-category/nav-category.component';
import { SidebarActionsComponent } from './sidebar-actions/sidebar-actions.component';



@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    GroupComponent,
    GroupListComponent,
    ItemComponent,
    ItemListComponent,
    SidebarComponent,
    MainPanelComponent,
    FloatingButtonComponent,
    CreateItemDialogComponent,
    NavCategoryComponent,
    SidebarActionsComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    NgxFloatButtonModule,
    MatTabsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatRadioModule
  ],
  entryComponents: [CreateItemDialogComponent],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
