import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { HeroListComponent }    from './hero-list.component';
import { HeroDetailComponent }  from './hero-detail.component';
import { HeroRoutingModule } from './heroes-routing.module';

import { HeroService } from './hero.service';

@NgModule({
  imports: [ // 导入第三方模块
    CommonModule,
    FormsModule,
    HeroRoutingModule // 导入特性路由
  ],
  declarations: [ // 声明本模块所有的视图类
    HeroListComponent,
    HeroDetailComponent
  ],
  providers: [ // 服务的创建者
    HeroService
  ]
})
export class HeroesModule {}
