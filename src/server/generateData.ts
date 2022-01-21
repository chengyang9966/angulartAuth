import { HttpResponse, HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FakebackendModule, Route } from 'fakebackend';
import { of } from 'rxjs';

let routes: Route[] = [];

routes.push({
  method: 'get',
  path: '/fake',
  intercept: (request) => {
    return of(
      new HttpResponse({
        status: 200,
        body: 'Fake it till you make it',
      })
    );
  },
});

@NgModule({
  imports: [FakebackendModule.forRoutes(routes)],
  exports: [FakebackendModule],
})
export class AppFakebackendModule {}
