import { BrowserModule } from '@angular/platform-browser';
import { AdminModule } from './admin/admin.module';
import { SharedModule } from './shared/shared.module';
import { ShoppingModule } from 'app/shopping/shopping.module';
import { CoreModule } from 'app/core/core.module';

import { environment } from './../environments/environment';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from 'angularfire2';

import { AppComponent } from './app.component';
import { HomeComponent } from './core/home/home.component';
import { ProductsComponent } from './shopping/components/products/products.component';
import { LoginComponent } from './core/login/login.component';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AdminModule,
    ShoppingModule,
    CoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot([
      {path: '', component: ProductsComponent},
      {path: 'login', component: LoginComponent},      
    ])
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
