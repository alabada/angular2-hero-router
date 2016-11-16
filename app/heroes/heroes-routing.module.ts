import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

import { HeroListComponent }    from './hero-list.component';
import { HeroDetailComponent }  from './hero-detail.component';

// 推荐的方式是为每个特性区创建它自己的路由配置文件。
@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'heroes',  component: HeroListComponent },
      { path: 'hero/:id', component: HeroDetailComponent } // 路径中的 :id 令牌。它为 路由参数 在路径中创建一个“空位”。
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class HeroRoutingModule { }

// 设置 app.routing.ts 时，我们使用了静态的 forRoot 方法来注册我们的路由和全应用级服务提供商。 在特性模块中，我们要改用 Router.forChild 静态方法。
// RouterModule.forRoot 只能由 AppModule 提供。但我们位于特性模块中，所以使用 RouterModule.forChild 来单独注册更多路由。
