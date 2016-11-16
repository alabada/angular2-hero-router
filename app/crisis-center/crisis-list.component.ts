import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { Crisis, CrisisService } from './crisis.service';

@Component({
  template: `
    <ul class="items">
      <li *ngFor="let crisis of crises"
        [class.selected]="isSelected(crisis)"
        (click)="onSelect(crisis)">
        <span class="badge">{{crisis.id}}</span> {{crisis.name}}
      </li>
    </ul>

    <router-outlet></router-outlet>
  `
})
export class CrisisListComponent implements OnInit {
  crises: Crisis[];
  public selectedId: number;

  constructor(
    private service: CrisisService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  isSelected(crisis: Crisis) {
    return crisis.id === this.selectedId;
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.selectedId = params['id'];
      this.service.getCrises()
        .then(crises => this.crises = crises);
    });
  }

  // 相对导航
  onSelect(crisis: Crisis) {
    this.selectedId = crisis.id;

    // 当我们访问 危机中心 时，当前路径是 /crisis-center ，所以我们只要把 危机 的 id 添加到现有路径中就可以了。
    this.router.navigate([crisis.id], { relativeTo: this.route });


    // 要使用 Router 进行相对导航，可以使用 ActivatedRoute 来告诉路由器我们正在 RouterState 中的什么地方， RouterState 是激活路由组成的树。
    // 要做到这一点，我们可以为 router.navigate 方法中 链接参数数组 后的对象型参数指定 relativeTo 属性。
    // 只要把这个 relativeTo 属性设置为我们的 ActivatedRoute ，路由器就会把我们的导航信息和当前 URL 合并在一起。
  }
}

/**
 * 让路由器使用相对导航的方式，可以让连接更富有弹性。
 * 1、不再需要到路由的完整路径
 * 2、当修改父路由路径时，在我们的特性区中导航时不需要做任何改动。
 * 3、链接参数数组只包含当前URL的相对导航信息
 *
 * 链接参数数组 通过目录式语法支持相对导航。
 * 1、./ 或“无前导斜线”时表示相当于当前级别。
 * 2、../ 表示在路由路径中往上走一级。
 * 相对导航的语法可以和 路径 组合在一起，如果我们要从一个路由路径导航到一个兄弟路由路径， 可以使用 ../path 来简便的导航到上一级然后再进入兄弟路由路径。
 */

