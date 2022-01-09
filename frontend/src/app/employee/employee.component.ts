import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../appModels/employee.model';
import { EmployeeService } from '../appServices/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})



export class EmployeeComponent implements OnInit {
  empForm: FormGroup;
  editMode:boolean;
  showModel:boolean;
  employees:Employee[];
  constructor(private fb:FormBuilder,
    private empService:EmployeeService) { }

  ngOnInit(): void {
    this.getEmployees();

    this.empForm  = this.fb.group({
      _id:[''],
      name:['Ex. sid',Validators.required],
      position:['Ex. Engg',Validators.required],
      dept:['Dev',Validators.required],
    })
  }


  getEmployees(){
    this.empService.getEmployeeList().subscribe(
      (res) => {
        console.log(res);
        this.employees = res as Employee[];
      },
      (err) => {
        console.log(err);
      }
    )
  }


  onEmpSubmit(){
    if(this.empForm.valid)
    {
      if(this.editMode)
      {
          this.empService.updateEmployee(this.empForm.value).subscribe(
            (res)=>{
              console.log(res);
              this.getEmployees();
            },
            (err)=>{
                console.log(err);
            }
          );
      }
      else{
        console.log(this.empForm.value);
        this.empService.addEmployee(this.empForm.value).subscribe(
        (res)=>{
          console.log(res);
          this.getEmployees();
        },
        (err)=>{
            console.log(err);
        }
      );
      this.editMode = false;
      }
      this.empForm.reset();
    }

  }

  onDeleteEmployee(id:any)
  {
    if(confirm('Do you want to delete'))
    {
      this.empService.deleteEmployee(id).subscribe(
        (res)=>{
          console.log(res);
          this.getEmployees();
        },
        (err)=>{
            console.log(err);
        }
      )
    }
  }

  onEditEmployee(emp:Employee)
  {
    this.editMode = true;
    this.empForm.patchValue(emp);

  }

  onCloseModal(){
    this.editMode = false;
  }

}
