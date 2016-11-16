import { NgModule }       from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { CommonModule }   from '@angular/common';

import { CrisisService }        from './crisis.service';

import { CrisisCenterComponent }     from './crisis-center.component';
import { CrisisListComponent }       from './crisis-list.component';
import { CrisisCenterHomeComponent } from './crisis-center-home.component';
import { CrisisDetailComponent }     from './crisis-detail.component';

import { CrisisCenterRoutingModule } from './crisis-center-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CrisisCenterRoutingModule
  ],
  declarations: [
    CrisisCenterComponent,
    CrisisListComponent,
    CrisisCenterHomeComponent,
    CrisisDetailComponent
  ],
  providers: [
    CrisisService
  ]
})
export class CrisisCenterModule {}

/*
 我们将按照下列模式组织 危机中心 的目录结构:
  1每个特性区位于它自己的定义了模块的目录中
  2每个特性区有它自己的根组件
  3每个特性区的根组件有它自己的 <router-outlet> 及其子路由
  4特性区的路由很少交叉（如果还有的话）

 */

