// TODO SOMEDAY: Feature Componetized like CrisisCenter
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {Hero, HeroService}  from './hero.service';

@Component({
  template: `
    <h2>HEROES</h2>
    <ul class="items">
      <li *ngFor="let hero of heroes"
        [class.selected]="isSelected(hero)"
        <!-- 事件绑定一个方法 -->
        (click)="onSelect(hero)">
        <span class="badge">{{hero.id}}</span> {{hero.name}}
      </li>
    </ul>
  `
})
export class HeroListComponent implements OnInit {
  heroes: Hero[];

  private selectedId: number;

  // 依赖注入 路由服务和其他服务
  constructor(private service: HeroService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => { // 使用 ActivatedRoute 来访问 params 这个 Observable ，以便我们订阅它，并把其中的 id 参数提取到 selectedId 中
      this.selectedId = +params['id']; // 所有的路由参数或查询参数都是字符串。
      this.service.getHeroes()
        .then(heroes => this.heroes = heroes);
    });
  }

  isSelected(hero: Hero) {
    return hero.id === this.selectedId;
  }

  // 命令式的导航到详情组件
  onSelect(hero: Hero) {
    // 用一个 链接参数数组 调用路由器的 navigate 方法。 如果我们想把它用在 HTML 中，那么也可以把相同的语法用在 RouterLink 中。
    this.router.navigate(['/hero', hero.id]); // 命令式地导航到英雄详情
  }

}
/*

 localhost:3000/heroes;id=15;foo=foo
 id 的值像这样出现在 URL 中（ ;id=15;foo=foo ），但不在 URL 的路径部分。 “ Heroes ”路由的路径部分并没有定义 :id 。
 可选的路由参数没有使用“？”和“ & ”符号分隔，因为它们将用在 URL 查询字符串中。 它们是 用“ ; ”分隔的 。 这是 矩阵 URL 标记法——我们以前可能从未见过。

 */



