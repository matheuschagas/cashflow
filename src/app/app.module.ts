import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AddTransactionComponent } from './add-transaction/add-transaction.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { HomeComponent } from './home/home.component';
import { LogoffComponent } from './logoff/logoff.component';
import {RouterModule, Routes} from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { PaymentTypePipe } from './payment-type.pipe';
import { HttpService } from './http.service';
import {HttpModule} from '@angular/http';
import {UserService} from './user.service';
import {AuthService} from './auth.service';
import { Ng2TableModule } from 'ng2-table/ng2-table';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthService]},
  {path: 'add-transaction', component: AddTransactionComponent, canActivate: [AuthService]},
  {path: 'transaction-list', component: TransactionListComponent, canActivate: [AuthService]},
  {path: 'logoff', component: LogoffComponent, canActivate: [AuthService]}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AddTransactionComponent,
    TransactionListComponent,
    HomeComponent,
    LogoffComponent,
    HeaderComponent,
    PaymentTypePipe
  ],
  imports: [
    HttpModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    Ng2TableModule
  ],
  providers: [HttpService, UserService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
