import {TestBed} from '@angular/core/testing';

import {SgmService} from './sgm.service';

describe('SgmService', () => {
    let service: SgmService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(SgmService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
