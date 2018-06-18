import { async, TestBed } from '@angular/core/testing';
import { NamespaceModule } from './namespace.module';

describe('NamespaceModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NamespaceModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(NamespaceModule).toBeDefined();
  });
});
