import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent implements OnInit {
  employeeForm: FormGroup;
  isEditMode = false;
  employeeId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      salary: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      age: ['', [Validators.required, Validators.pattern('^[0-9]*$')]]
    });
  }

  ngOnInit(): void {
    this.employeeId = this.route.snapshot.params['id'];
    if (this.employeeId) {
      this.isEditMode = true;
      this.employeeService.getEmployee(this.employeeId).subscribe(data => {
        this.employeeForm.patchValue(data);
      });
    }
  }

  onSubmit() {
    if (this.employeeForm.invalid) {
      return;
    }

    if (this.isEditMode) {
      this.employeeService.updateEmployee(this.employeeId!, this.employeeForm.value).subscribe(() => {
        alert('Employee updated successfully!');
        this.router.navigate(['/employees']);
      });
    } else {
      this.employeeService.createEmployee(this.employeeForm.value).subscribe(() => {
        alert('Employee created successfully!');
        this.router.navigate(['/employees']);
      });
    }
  }
}
