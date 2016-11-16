///<reference path="crisis-center.component.ts"/>
import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

import {CrisisCenterComponent} from "./crisis-center.component";
import {CrisisListComponent} from "./crisis-list.component";
import {CrisisCenterHomeComponent} from "./crisis-center-home.component";
import {CrisisDetailComponent} from "./crisis-detail.component";

import { CanDeactivateGuard }    from '../can-deactivate-guard.service';
import { CrisisDetailResolve }   from './crisis-detail-resolve.service';

@NgModule({
  imports: [
    RouterModule.forChild([
      // { // 添加一个 redirect 路由，它会把初始的相对 URL （ '' ）悄悄翻译成默认路径 (/crisis-center)
      //   path: '',
      //   redirectTo: '/crisis-center',
      //   pathMatch: 'full' // 告诉路由器如何把 URL 和路由中的路径进行匹配
      // },
      {
        // path: 'crisis-center',
        path: '', // 要惰性加载，改成空路径 父路由 带有children属性
        component: CrisisCenterComponent, // 路由器会把这些路由对应的组件放在 CrisisCenterComponent 的 RouterOutlet 中，而不是 AppComponent 壳组件中的。
        children: [
          {
            path: '',
            component: CrisisListComponent, // CrisisListComponent 包含危机列表和一个 RouterOutlet ，用以显示 Crisis Center Home 和 Crisis Detail 这两个路由组件。
            children: [
              {
                path: ':id',
                component: CrisisDetailComponent, // Crisis Detail 路由是 Crisis List 的子路由, 由于路由器默认会 复用组件 ，因此当我们选择了另一个危机时， CrisisDetailComponent 会被复用。
                canDeactivate: [CanDeactivateGuard], // 添加守卫
                resolve: { // 设置resolve对象
                  crisis: CrisisDetailResolve
                }
              },
              {
                path: '',
                component: CrisisCenterHomeComponent
              }
            ]
          }
        ]
      }
    ])
  ],
  exports: [
    RouterModule
  ],
  providers: [
    CrisisDetailResolve
  ]
})
export class CrisisCenterRoutingModule { }

/*

 路由器会把这些路由对应的组件放在 CrisisCenterComponent 的 RouterOutlet 中，而不是 AppComponent 壳组件中的。
 这里是子路由。 它们是在父路由路径的基础上做出的扩展。 在路由树中每深入一步，我们就会在该路由的路径上添加一个斜线 / （除非该路由的路径是 空的 ）。

 */
