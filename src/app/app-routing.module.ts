import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { AdminGuard } from './services/admin.guard';
import { UserGuard } from './services/user.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { ViewCategoriesComponent } from './pages/admin/categories/view-categories/view-categories.component';
import { AddCategoryComponent } from './pages/admin/categories/add-category/add-category.component';
import { ViewUsersComponent } from './pages/admin/users/view-users/view-users.component';
import { AddUsersComponent } from './pages/admin/users/add-users/add-users.component';
import { ViewExamsComponent } from './pages/admin/exams/view-exams/view-exams.component';
import { AddExamsComponent } from './pages/admin/exams/add-exams/add-exams.component';
import { UpdateExamComponent } from './pages/admin/exams/update-exam/update-exam.component';
import { ViewQuestionsComponent } from './pages/admin/exams/view-questions/view-questions.component';
import { AddQuestionComponent } from './pages/admin/exams/add-question/add-question.component';
import { UpdateQuestionComponent } from './pages/admin/exams/update-question/update-question.component';
import { LoadExamComponent } from './pages/user/load-exam/load-exam.component';
import { InstructionsComponent } from './pages/user/instructions/instructions.component';
import { StartExamComponent } from './pages/user/start-exam/start-exam.component';
import { UpdateUsersComponent } from './pages/admin/users/update-users/update-users.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'signup',
    component: SignupComponent,
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'admin',
    component: DashboardComponent,
    canActivate: [AdminGuard],
    children:[
      {
        path: '',
        component: WelcomeComponent
      },
      {
        path:'categories',
        component: ViewCategoriesComponent
      },
      {
        path: 'add-category',
        component: AddCategoryComponent
      },
      {
        path: 'view-users',
        component: ViewUsersComponent
      },
      {
        path: 'user/:userId',
        component: UpdateUsersComponent
      },
      {
        path: 'add-users',
        component: AddUsersComponent
      },
      {
        path: 'view-exams',
        component: ViewExamsComponent
      },
      {
        path: 'add-exams',
        component: AddExamsComponent
      },
      {
        path: 'exam/:examId',
        component:UpdateExamComponent
      },
      {
        path: 'view-questions/:examId/:title',
        component: ViewQuestionsComponent
      },
      {
        path: 'add-question/:examId/:title',
        component: AddQuestionComponent
      },
      {
        path:'question/:questionId',
        component:UpdateQuestionComponent
      }
    ]
  },
  {
    path: 'user-dashboard',
    component: UserDashboardComponent,
    canActivate: [UserGuard],
    children : [
      {
        path: ':catId',
        component:LoadExamComponent
      },
      {
        path:'instructions/:examId',
        component:InstructionsComponent
      },
    ]
  },
  {
    path: "start/:examId",
    component: StartExamComponent,
    canActivate:[UserGuard]
  },
  {
    path: "profile",
    component: ProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


