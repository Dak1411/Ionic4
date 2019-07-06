import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardPageModule' },
  { path: 'edit-profile', loadChildren: './edit-profile/edit-profile.module#EditProfilePageModule' },
  { path: 'edit-post', loadChildren: './edit-post/edit-post.module#EditPostPageModule' },
  { path: 'add-post', loadChildren: './add-post/add-post.module#AddPostPageModule' },
  { path: 'view-posts', loadChildren: './view-posts/view-posts.module#ViewPostsPageModule' },
  { path: 'all-users', loadChildren: './all-users/all-users.module#AllUsersPageModule' },
  { path: 'view-image', loadChildren: './view-image/view-image.module#ViewImagePageModule' },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class HomeRoutingModule { }
