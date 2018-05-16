import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LectureAllComponent } from './lecture-all.component';

describe('LectureAllComponent', () => {
  let component: LectureAllComponent;
  let fixture: ComponentFixture<LectureAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LectureAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LectureAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
