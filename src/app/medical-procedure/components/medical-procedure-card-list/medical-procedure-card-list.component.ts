import {Component, OnInit} from '@angular/core';
import {MedicalProcedureService} from '../../../core/services/medical-procedure.service';

@Component({
  selector: 'app-medical-procedure-card-list',
  templateUrl: './medical-procedure-card-list.component.html',
  styleUrls: ['./medical-procedure-card-list.component.scss']
})
export class MedicalProcedureCardListComponent implements OnInit {
  medicalProcedureList = [];

  constructor(private medicalProcedureService: MedicalProcedureService) {
  }

  ngOnInit() {
    this.getMedicalProcedureList();
  }

  getMedicalProcedureList() {
    this.medicalProcedureService.getMedicalProcedureList().subscribe(
      list => this.medicalProcedureList = list
    );
  }

}
