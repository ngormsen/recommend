import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Angular components
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatSidenavModule } from '@angular/material/sidenav'; 
import { MatTabsModule } from '@angular/material/tabs'; 
import { MatDialogModule } from '@angular/material/dialog'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select'; 
import { MatRadioModule } from '@angular/material/radio'; 
import { HttpClientModule } from '@angular/common/http';
import { MatAutocompleteModule } from '@angular/material';

// firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';

// Third party components
import { QuillModule } from 'ngx-quill';

// Local components
import { AppComponent } from './app.component';
import { GroupListComponent } from './group-list/group-list.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ItemComponent } from './item/item.component';
import { ItemListComponent } from './item-list/item-list.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainPanelComponent } from './main-panel/main-panel.component';
import { CreateItemDialogComponent } from './create-item-dialog/create-item-dialog.component';
import { NavCategoryComponent } from './nav-category/nav-category.component';
import { SidebarActionsComponent } from './sidebar-actions/sidebar-actions.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { LoginViewComponent } from './login-view/login-view.component';
import { MainViewComponent } from './main-view/main-view.component';
import { RegisterViewComponent } from './register-view/register-view.component';
import { RegisterFormComponent } from './register-form/register-form.component';

const routes: Routes = [
  {path: '', component: LoginViewComponent},
  {path: 'register', component: RegisterViewComponent},
  {path: 'main', component: MainViewComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    GroupListComponent,
    ItemComponent,
    ItemListComponent,
    SidebarComponent,
    MainPanelComponent,
    CreateItemDialogComponent,
    NavCategoryComponent,
    SidebarActionsComponent,
    LoginFormComponent,
    LoginViewComponent,
    MainViewComponent,
    RegisterViewComponent,
    RegisterFormComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatTabsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatRadioModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase, 'recommendation-app'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    RouterModule.forRoot(routes),
    QuillModule.forRoot({
      modules: {
        syntax: false,
        toolbar: [
          ['bold', 'italic', 'underline'],
          [{ 'list': 'bullet'}]
        ]
      }
    })
  ],
  entryComponents: [CreateItemDialogComponent],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
