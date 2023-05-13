import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoiInfoboxComponent } from './poi-infobox.component';

describe('PoiInfoboxComponent', () => {
  let component: PoiInfoboxComponent;
  let fixture: ComponentFixture<PoiInfoboxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PoiInfoboxComponent]
    });
    fixture = TestBed.createComponent(PoiInfoboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
