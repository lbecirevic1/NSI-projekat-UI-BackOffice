import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CardModule, GridModule, TableModule, UtilitiesModule, PaginationModule, FormModule, ButtonModule } from '@coreui/angular';
import { ChartjsModule } from '@coreui/angular-chartjs';
import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from '../../icons/icon-subset';
import { LogsComponent } from './logs.component';
import { DocsComponentsModule } from '../../../components';

describe('LogsComponent', () => {
  let component: LogsComponent;
  let fixture: ComponentFixture<LogsComponent>;
  let iconSetService: IconSetService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LogsComponent],
      imports: [
        GridModule, 
        CardModule, 
        TableModule, 
        GridModule, 
        UtilitiesModule, 
        GridModule, 
        CardModule, 
        TableModule, 
        ChartjsModule, 
        DocsComponentsModule,
        PaginationModule,
        FormModule, 
        ButtonModule
      ],
      providers: [IconSetService]
    }).compileComponents();
  }));

  beforeEach(() => {
    iconSetService = TestBed.inject(IconSetService);
    iconSetService.icons = { ...iconSubset };

    fixture = TestBed.createComponent(LogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
