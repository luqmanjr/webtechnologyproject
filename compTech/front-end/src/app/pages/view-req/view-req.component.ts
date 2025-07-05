import { OnInit, Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ViewReqService } from 'src/app/services/view-req.service';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-view-req',
  templateUrl: './view-req.component.html',
  styleUrls: ['./view-req.component.scss']
})
export class ViewReqComponent implements OnInit,AfterViewInit {

  constructor(private viewReqService: ViewReqService){}

  displayedColumns: string[] = ['userId', 'problem_name', 'problem_description', 'computer_model', 'problem_date', 'status', 'tech_comment'];
  // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  // dataSource = new MatTableDataSource<PeriodicElement>([]);
  // dataSource: any[] = [];
  dataSource = new MatTableDataSource<PeriodicElement>([]);

  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



  ngOnInit(): void {


    this.viewReqService.getCustomerProblems().subscribe(
      (data: PeriodicElement[]) => {
        this.dataSource.data = data; // Set data to dataSource
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
  }

  ngAfterViewInit(): void {
    // Assign the paginator to the data source after the view is initialized
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}

export interface PeriodicElement {
  userId: number;
  problem_name: string;
  problem_description: string;
  computer_model: string;
  problem_date: string;
  status: string;
  tech_comment: string;
}

// const ELEMENT_DATA: PeriodicElement[] = [
//   { position: 1, problem_name: 'Hydrogen', problem_description: 'bv', computer_model: 'H', problem_date: '12739', status: 'req', tech_comment: 'haya' },
//   // Add more elements as needed
// ];
