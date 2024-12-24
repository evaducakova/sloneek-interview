import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataVisualizationDashboardComponent } from './data-visualization-dashboard.component';

describe('DataVisualizationDashboardComponent', () => {
  let component: DataVisualizationDashboardComponent;
  let fixture: ComponentFixture<DataVisualizationDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataVisualizationDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataVisualizationDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
