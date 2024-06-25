import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../models/Employee';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent {
  employee: Employee = new Employee();
  message: string = '';

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.employeeService.addEmployee(this.employee).subscribe(
      () => {
        this.router.navigate(['/employees']);
        console.log("Employee ID:", this.employee.id);
        this.message = 'Employee added successfully.';

      },
      (error) => {
        console.error('Error:', error);
        console.log("Employee ID:", this.employee.id);
        if (error.status === 400) {
          console.error('Validation errors:', error.error.errors);
        }
      }
    );
  }
}
