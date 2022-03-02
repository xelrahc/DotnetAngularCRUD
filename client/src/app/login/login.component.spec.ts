import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../_modules/shared.module';
import { UserService } from '../_services/user.service';
import { LoginComponent } from "./login.component";

describe("LoginComponent", () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  // let myService: MyService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [BrowserAnimationsModule, ReactiveFormsModule, FormsModule, HttpClientModule, AppRoutingModule, SharedModule],
      providers: [UserService],
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(LoginComponent);

      component = fixture.componentInstance;
      component.ngOnInit();
    });
  });

  it('should call login method', (() => {
    //arrange
    let loginElement: DebugElement;
    let debugElement = fixture.debugElement;
    let userService = debugElement.injector.get(UserService);

    //act
    let loginSpy = spyOn(userService, 'login').and.callThrough();
    loginElement = fixture.debugElement.query(By.css('form'));
    component.f.email.setValue('totot@gmail.com');
    component.f.password.setValue('totot');
    loginElement.triggerEventHandler('ngSubmit', null);

    //assert
    expect(loginSpy).toHaveBeenCalledTimes(1);
}));

  // it('should set submitted to true', async(() => {
  //   component.onSubmit();
  //   expect(component.submitted).toBeTruthy();
  // }))

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(LoginComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();

  //   // myService = TestBed.inject(MyService);
  // });

  // describe('method1', () => {
  //   it('should ...', () => {
  //     expect(component).toBeTruthy();
  //   });

  //   it.todo('should ...');
  // });
})