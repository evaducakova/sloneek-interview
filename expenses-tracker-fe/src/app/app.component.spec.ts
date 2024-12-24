import {TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {provideMockStore} from '@ngrx/store/testing';
import {ActivatedRoute} from '@angular/router';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideMockStore({initialState: {}}),
        {provide: ActivatedRoute, useValue: {}}
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
