import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.css'
})
export class EmployeeDetailsComponent implements OnInit {
  employee: any;
  errorMessage: string = '';

  constructor(private route: ActivatedRoute, private employeeService: EmployeeService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.employeeService.getEmployee(id).subscribe({
      next: (data) => {
        this.employee = data;
      },
      error: (error) => {
        this.errorMessage = 'Error fetching employee details';
        console.error('Error fetching employee details:', error);
      }
    });
  }
}
