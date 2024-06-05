import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule,NgxPaginationModule,RouterLink],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit {
  employees: any[] = [];
  currentPage = 1;
  itemsPerPage = 10;

  constructor(private employeeService: EmployeeService, private router: Router) { }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getEmployees().subscribe(data => {
      this.employees = data;
    });
  }

  deleteEmployee(id: number) {
    if (confirm('Are you sure to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe(() => {
        this.loadEmployees();
        alert('Employee deleted successfully!');
      });
    }
  }

  editEmployee(id: number) {
    this.router.navigate([`/employee/edit/${id}`]);
  }

  viewEmployee(id: number) {
    this.router.navigate([`/employee/${id}`]);
  }

  paginate(event: any) {
    this.currentPage = event.page;
  }
}
