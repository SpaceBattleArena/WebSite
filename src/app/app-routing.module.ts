import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { ShopComponent } from './components/shop/shop.component';
import { SmithyComponent } from './components/smithy/smithy.component';
import { ProfilComponent } from './components/profil/profil.component';
import { AboutComponent } from './components/about/about.component';
import { NewsComponent } from './components/news/news.component';
import { AllNewsComponent } from './components/all_news/all_news.component';
import { DashboardComponent, ItemsComponent } from './components/admin/index';
import { ForumComponent } from './components/forum/forum.component';
import { DiscussionComponent } from './components/discussion/discussion.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'about',    component: AboutComponent},
  { path: 'profil', component: ProfilComponent, canActivate: [AuthGuard] },
  { path: 'shop',    component: ShopComponent, canActivate: [AuthGuard] },
  { path: 'smithy',    component: SmithyComponent, canActivate: [AuthGuard] },
  { path: 'admin/:slug',    component: ItemsComponent/*, canActivate: [AdminGuard]*/ },
  { path: 'admin',    component: DashboardComponent/*, canActivate: [AdminGuard]*/ },
  { path: 'news/:slug',    component: NewsComponent},
  { path: 'news',    component: AllNewsComponent},
  { path: 'forum/:slug',    component: DiscussionComponent},
  { path: 'forum',    component: ForumComponent},
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
