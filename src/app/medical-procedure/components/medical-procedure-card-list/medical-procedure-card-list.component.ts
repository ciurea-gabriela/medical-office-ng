import {Component, OnInit} from '@angular/core';
import {MedicalProcedureService} from '../../../core/services/medical-procedure.service';

@Component({
  selector: 'app-medical-procedure-card-list',
  templateUrl: './medical-procedure-card-list.component.html',
  styleUrls: ['./medical-procedure-card-list.component.scss']
})
export class MedicalProcedureCardListComponent implements OnInit {
  public medicalProcedureList = [];

  constructor(private medicalProcedureService: MedicalProcedureService) {
  }

  ngOnInit(): void {
    this.getMedicalProcedureList();
  }

  public getMedicalProcedureList(): void {
    this.medicalProcedureService.getMedicalProcedureList().subscribe(
      list => this.medicalProcedureList = list
    );
  }

  public refreshList(event: boolean): void {
    if (event) {
      this.getMedicalProcedureList();
    }
  }

}
