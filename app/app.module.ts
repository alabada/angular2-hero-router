import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
// import {RouterModule}   from '@angular/router';
import {FormsModule}    from '@angular/forms';

import {AppComponent}  from './app.component';
import {AppRoutingModule} from './app-routing.module';
// import {CrisisListComponent}  from './crisis-list.component';
import {HeroesModule} from "./heroes/heroes.module";
// import {CrisisCenterModule} from "./crisis-center/crisis-center.module";
// import { AdminModule }            from './admin/admin.module';
import {LoginRoutingModule} from "./login-routing.module";
import {LoginComponent} from "./login.component";
import {DialogService} from "./dialog.service";
// import {HeroListComponent}    from './hero-list.component';

@NgModule({
  imports: [ // 本 模块组件模板中需要由其它模块导出的类。
    BrowserModule,
    FormsModule,
    HeroesModule,
    // CrisisCenterModule, // 将危机中心模块导入 惰性加载了，在此移除
    // AdminModule, // 我们使用惰性加载该模块，需要将该模块分离到一个彻底独立的模块。这里将其移除
    LoginRoutingModule,
    AppRoutingModule
    // RouterModule.forRoot([ // 在APPModule中提供RouterModule，让该路由器在应用的任何地方都能被使用。
    //   { path: 'crisis-center', component: CrisisListComponent },
    //   { path: 'heroes', component: HeroListComponent }
    //   // path中不能用斜线开头
    //   // {path: 'hero/:id', component: HeroDetailComponent},
    //   // {path: 'crisis-center', component: CrisisListComponent},
    //   // {
    //   //   path: 'heroes',
    //   //   component: HeroListComponent,
    //   //   data: { // data属性用来存放于每个具体路由有关的任意信息。该数据可以被任何一个激活路由访问
    //   //     title: 'Heroes List'
    //   //   }
    //   // },
    //   // {path: '', component: HomeComponent}, // empty path 匹配各级路由的默认路径。(当没有具体路由的时候，默认跳转到这个界面)
    //   // {path: '**', component: PageNotFoundComponent} // **代表路由是一个通配符路径。如果当前URL无法匹配上我们配置过的任何一个路由中的路径，路由器就会匹配上这一个。当需要显示404页面或者重定向到其它路径时，该特性非常有用。
    //   //  路由器使用先匹配者优先的策略来匹配路由，所以具体路由应该放在通用路由的前面。
    // ])
  ],
  declarations: [ // 本模块中拥有的视图类。 Angular 有三种视图类： 组件 、 指令 和 管道 。
    AppComponent,
    LoginComponent
    // HeroListComponent,
    // CrisisListComponent
  ],
  providers: [ //  服务 的创建者
    DialogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

// 路由模块是设计选择，它的价值在配置很复杂，并包含专门守卫和解析器服务时尤其明显。 在配置很简单时，它可能看起来很多余。
