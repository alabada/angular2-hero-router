import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

import {AdminComponent} from "./admin.component";
import {ManageCrisesComponent} from "./manage-crises.component";
import {ManageHeroesComponent} from "./manage-heroes.component";
import {AdminDashboardComponent} from "./admin-dashboard.component";

import { AuthGuard }                from '../auth-guard.service';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        // path: 'admin',
        path: '', // 路由器支持 空路径 路由，它可以在不必把别的路径添加到 URL 中的情况下，将多个路由组合到一起。
        component: AdminComponent,
        canActivate: [AuthGuard], // 我们的管理特性区现在受此守卫保护了
        children: [
          {
            path: '',
            canActivateChild: [AuthGuard],
            children: [
              { path: 'crises', component: ManageCrisesComponent },
              { path: 'heroes', component: ManageHeroesComponent },
              { path: '', component: AdminDashboardComponent }
            ]
          }
        ]
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule {}
