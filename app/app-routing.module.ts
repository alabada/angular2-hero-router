import { NgModule }     from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';
import {CanDeactivateGuard} from "./can-deactivate-guard.service";

import { AuthGuard }          from './auth-guard.service';
import {PreloadSelectedModules} from "./selective-preload-strategy";

// import { CrisisListComponent }  from './crisis-list.component';

@NgModule({
  imports: [
    RouterModule.forRoot([ // 使用了静态的 forRoot 方法来注册我们的路由和全应用级服务提供商
      // { path: 'crisis-center', component: CrisisListComponent },
      {
        path: 'admin',
        // 我们想要异步加载 Admin 模块， 就得在路由配置中使用 loadChildren 属性
        loadChildren: 'app/admin/admin.module#AdminModule', // 路由器用 loadChildren 属性来映射我们希望惰性加载的捆文件，这里是 AdminModule 。
        // 我们使用 # 来标记出文件路径的末尾，并告诉路由器 AdminModule 的名字。打开 admin.module.ts 文件，我们就会看到它正是我们所导出的模块类的名字。
        // 路由器用 loadChildren 属性来映射我们希望惰性加载的捆文件，这里是 AdminModule 。
        // 路由器将接收我们的 loadChildren 字符串，并把它动态加载进 AdminModule ，它的路由被 动态 合并到我们的配置中，然后加载所请求的路由。
        // 但只有在首次加载该路由时才会这样做，后续的请求都会立即完成。,
        canLoad: [AuthGuard] // 把 AuthGuard 导入到 app.routing.ts 中，并把 AuthGuard 添加到 admin 路由的 canLoad 数组中
      },
      {
        path: '',
        redirectTo: '/heroes',
        pathMatch: 'full'
      },
      {
        path: 'crisis-center',
        loadChildren: 'app/crisis-center/crisis-center.module#CrisisCenterModule', // 惰性加载危机中心特性区
        data: {
          preload: true // 自定义策略将使用它
        }
      },
    ],
      { preloadingStrategy: PreloadAllModules } // 默认惰性加载并使用 PreloadAllModules 策略来尽快加载 所有 惰性加载模块。
      // 这样，内置的 路由器 立刻预加载 所有 使用 loadChildren 的 未受保护 的特征区域

      // RouterModule.forRoot 方法的第二个参数接受一个附加配置选项对象。 我们从路由器包导入 PreloadAllModules 令牌，并将这个配置选项的 preloadingStrategy 属性设置为 PreloadAllModules 令牌。 这样，内置的 路由器 立刻预加载 所有 使用 loadChildren 的 未受保护 的特征区域。
      )
  ],
  exports: [ // 重新导出 RouterModule ，这样，特征模块在使用 路由模块 时，将获得 路由指令 。
    RouterModule
  ],
  providers: [
    CanDeactivateGuard, // 把这个 Guard 添加到 appRoutingModule 的 providers 中去，以便 Router 可以在导航过程中注入它。
    PreloadSelectedModules
  ]
})
export class AppRoutingModule {}

// 要使用我们的自定义预加载策略，将它导入到 app-routing.module.ts 并替换 PreloadAllModules 策略。
// 我们还将 PreloadSelectedModules 策略添加到 AppRoutingModule 的 providers 数组中。这样， 路由器 的预加载器可以注入我们的自定义策略。
