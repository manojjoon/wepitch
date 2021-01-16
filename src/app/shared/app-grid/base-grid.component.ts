import { ActivatedRoute } from '@angular/router';
import { PaggerModel } from './pager-model';
import { BaseGridRequest } from './base-grid-request.model';

export abstract class BaseGridComponent {
    public columnDefs = [];
    public rowData = [];
    totalItems = 0;
    totalCategory=0;
    totalBrand=0;
    totalProduct=0;
    totalStore=0;
    totalCoupan=0;
    totalBanner=0;
    totalDeals=0;

    SearchString = '';
    public paggerModel: PaggerModel = new PaggerModel();

    constructor(public route: ActivatedRoute) {
    }

    OnInit() {
        this.route.data.subscribe(res => {
            this.columnDefs = res.column;
        });
        this.getData();
    }
    handlePagingChanges(pagingValue: PaggerModel) {
        this.paggerModel = pagingValue;
        this.getData();
    }

    public gridQueryParams(): BaseGridRequest {
        return {
            PageNumber: this.paggerModel.PageNumber || 1,
            PageSize: this.paggerModel.PageSize || 10,
            SortColumn: '',
            SortDirection: '',
            SearchString: this.SearchString,
        };
    }

    onSearch(value: string) {
        this.SearchString = value;
        this.getData();
    }
    public abstract getData();
}
