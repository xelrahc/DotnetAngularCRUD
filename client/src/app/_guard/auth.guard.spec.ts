import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let router = {
      navigate: jasmine.createSpy('navigate')
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ToastrModule.forRoot()],
      providers: [AuthGuard, {provide: Router, useValue: router}]
    }). compileComponents();

    guard = TestBed.inject(AuthGuard);
  });

  beforeEach(() => {
    guard = TestBed.get(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('be able to hit route when user is logged in', () => {
    if (localStorage.getItem('user')) expect(guard.canActivate()).toBe(true);
  });

  it('not be able to hit route when user is not logged in', () => {
      if (!localStorage.getItem('user')) expect(guard.canActivate()).toBe(false);
  });
});
