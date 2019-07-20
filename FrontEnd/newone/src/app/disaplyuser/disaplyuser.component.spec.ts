import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisaplyuserComponent } from './disaplyuser.component';

describe('DisaplyuserComponent', () => {
  let component: DisaplyuserComponent;
  let fixture: ComponentFixture<DisaplyuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisaplyuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisaplyuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
