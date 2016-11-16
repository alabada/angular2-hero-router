import { Component, OnInit, HostBinding,
  trigger, transition, animate,
  style, state } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Hero, HeroService }  from './hero.service';

@Component({
  template: `
  <h2>HEROES</h2>
  <div *ngIf="hero">
    <h3>"{{hero.name}}"</h3>
    <div>
      <label>Id: </label>{{hero.id}}</div>
    <div>
      <label>Name: </label>
      <input [(ngModel)]="hero.name" placeholder="name"/>
    </div>
    <p>
      <button (click)="gotoHeroes()">Back</button>
    </p>
  </div>
  `,
  animations: [
    trigger('routeAnimation', [
      state('*',
        style({
          opacity: 1,
          transform: 'translateX(0)'
        })
      ),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100%)'
        }),
        animate('0.2s ease-in')
      ]),
      transition('* => void', [
        animate('0.5s ease-out', style({
          opacity: 0,
          transform: 'translateY(100%)'
        }))
      ])
    ])
  ]
})
export class HeroDetailComponent implements OnInit {

  // 宿主绑定（ HostBinding ） HostBinding 装饰器绑定到路由组件。
  @HostBinding('@routeAnimation') get routeAnimation() {
    return true;
  }

  @HostBinding('style.display') get display() {
    return 'block';
  }

  @HostBinding('style.position') get position() {
    return 'absolute';
  }

  hero: Hero;

  constructor(
    private route: ActivatedRoute, // ActivatedRoute ：一站式获得路由信息
    private router: Router,
    private service: HeroService) {}

    // 我们要把数据访问逻辑放进 ngOnInit 方法中而不是构造函数中，以提高该组件的可测试性。
  ngOnInit() {
    //  由于这些参数是作为 Observable （可观察对象）提供的，所以我们 订阅（ subscribe ） 它们，通过名字引用 id 参数，并告诉 HeroService 获取指定 id 的英雄。 我们还要保存这个 Subscription （订阅的返回值）的引用，供后面做清理工作。
    // 假如我们很确定 HeroDetailComponent 组件 永远、永远 不会被复用，每次导航到英雄详情时都会重新创建该组件。路由器提供了一个备选方案： 快照（ snapshot ） ，它会给我们路由参数的初始值:let id = +this.route.snapshot.params['id'];
    this.route.params.forEach((params: Params) => { // 用 ActivatedRoute 服务来接收本路由的参数。使用到了params可观察对象
      let id = +params['id']; // (+) converts string 'id' to a number
      this.service.getHero(id).then(hero => this.hero = hero);
    });
  }

  gotoHeroes() {
    let heroId = this.hero ? this.hero.id : null;
    // Pass along the hero id if available
    // so that the HeroList component can select that hero.
    this.router.navigate(['/heroes', { id: heroId, foo: 'foo' }]);
    // 可选参数是在导航期间传送任意复杂信息的理想载体。 可选参数不涉及到模式匹配并在表达上提供了巨大的灵活性。
  }
}

// 每个路由都包含路径、数据参数、 URL 片段等很多信息。 所有这些信息都可以通过有路由器提供的一个叫 ActivatedRoute 的服务提供商来获取。

// ActivatedRoute 包含你需要从当前路由组件中获得的全部信息，正如你可以从 RouterState 中获得关于其它激活路由的信息。
/*
 url: 该路由路径的 Observable 对象。它的值是一个由路径中各个部件组成的字符串数组。
 data: 该路由提供的 data 对象的一个 Observable 对象。还包含从 resolve 守卫 中解析出来的值。
 params: 包含该路由的必选参数和 可选参数 的 Observable 对象。
 queryParams: 一个包含对所有路由都有效的 查询参数 的 Observable 对象。
 fragment: 一个包含对所有路由都有效的 片段 值的 Observable 对象。
 outlet: RouterOutlet 的名字，用于指示渲染该路由的位置。对于未命名的 RouterOutlet ，这个名字是 primary 。
 routeConfig: 与该路由的原始路径对应的配置信息。
 parent: 当使用 子路由 时，它是一个包含父路由信息的 ActivatedRoute 对象。
 firstChild: 包含子路由列表中的第一个 ActivatedRoute 对象。
 children: 包含当前路由下激活的全部 子路由 。
 */
