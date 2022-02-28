import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../_modules/shared.module';
import { LoginComponent } from "./login.component";

describe("LoginComponent", () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  // let myService: MyService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [BrowserAnimationsModule, ReactiveFormsModule, FormsModule, HttpClientModule, AppRoutingModule, SharedModule]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(LoginComponent);

      component = fixture.componentInstance;
      component.submitted = false;
      console.log(component);
    });
  });

  it('should set submitted to true', async(() => {
    component.onSubmit();
    expect(component.submitted).toBeTruthy();
  }))

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