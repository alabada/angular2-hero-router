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
        canActivate: [AuthGuard], // 我们的管理特性区现在受此守卫保护了 只要导航到该特性区，就会执行该守卫
        children: [
          {
            path: '', // 没有使用component，这里使用的是 无组件 路由。
            canActivateChild: [AuthGuard], // 往“无组件”的管理路由中添加同一个 AuthGuard 以同时保护所有子路由，而不是挨个添加它们。
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
