import {Component} from '@angular/core';

@Component({
  template:  `
    <h2>CRISIS CENTER</h2>
    <router-outlet></router-outlet>
  `
})
export class CrisisCenterComponent { }

/*
 它是 危机中心 特性区的根组件，同样， AppComponent 是整个应用的根组件。
 它是危机管理区的壳组件，同样， AppComponent 也是用来管理高层工作流的壳组件。
 与 AppComponent （以及大多数其它组件）不同的是，它 缺少一个选择器（ selector ） 。 它不需要。我们不会把该组件嵌入到父模板中，只会通过路由器从外部 导航 到它。
 */
