import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../models/Employee';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  showModal = false;
  employeeIdToDelete: number | null = null;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe(data => {
      this.employees = data;
    });
  }

  openConfirmDeleteModal(id: number): void {
    this.employeeIdToDelete = id;
    this.showModal = true;
  }

  closeConfirmDeleteModal(): void {
    this.showModal = false;
    this.employeeIdToDelete = null;
  }

  deleteEmployee(): void {
    if (this.employeeIdToDelete !== null) {
      this.employeeService.deleteEmployee(this.employeeIdToDelete).subscribe(() => {
        this.employees = this.employees.filter(emp => emp.id !== this.employeeIdToDelete);
        this.closeConfirmDeleteModal();
      });
    }
  }
}
