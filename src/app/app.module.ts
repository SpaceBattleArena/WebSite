import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { HttpModule } from "@angular/http";

import { EditorModule } from '@tinymce/tinymce-angular';

import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';

import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

import { UserService } from './services/user.service';
import { ArticleService } from './services/news.service';

import { AppComponent }  from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { RegisterComponent } from './components/register/register.component';
import { AboutComponent } from './components/about/about.component';
import { ShopComponent } from './components/shop/shop.component';
import { SmithyComponent } from './components/smithy/smithy.component';
import { ProfilComponent } from './components/profil/profil.component';
import { NewsComponent } from './components/news/news.component';
import { AllNewsComponent } from './components/all_news/all_news.component';
import { ForumComponent } from './components/forum/forum.component';
import { DiscussionComponent } from './components/discussion/discussion.component';
import {
  AdminComponent,
  DashboardComponent,
  ItemsComponent
} from './components/admin/index';
import {CardService} from './services/card.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    AboutComponent,
    ShopComponent,
    SmithyComponent,
    ProfilComponent,
    NewsComponent,
    AllNewsComponent,
    ForumComponent,
    DiscussionComponent,
    AdminComponent,
    DashboardComponent,
    ItemsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ChartsModule,
    AppRoutingModule,
    EditorModule
  ],
  providers: [
    AuthGuard,
    AdminGuard,
      CardService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
