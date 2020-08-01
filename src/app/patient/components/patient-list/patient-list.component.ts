import {Component, OnInit, ViewChild} from '@angular/core';
import {Patient} from 'src/app/model/patient.interface';
import {PatientService} from 'src/app/core/services/patient.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {DialogEvent} from 'src/app/model/enums/dialog-event.enum';
import {Router} from '@angular/router';
import {DeleteDialogComponent} from '../../../shared/components/delete-dialog/delete-dialog.component';
import {CreateEditPatientDialogComponent} from '../create-edit-patient-dialog/create-edit-patient-dialog.component';
import {SnackBarUtil} from '../../../util/SnackBarUtil';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit {
  displayedColumns: string[] =
    ['no', 'firstName', 'lastName', 'birthDate', 'cnp', 'sex', 'city', 'phoneNumber', 'edit', 'delete', 'appointment'];
  dataSource: MatTableDataSource<Patient>;
  selectedPatientId: number;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private patientService: PatientService,
    public snackBar: SnackBarUtil,
    private dialog: MatDialog,
    private router: Router) {
  }

  ngOnInit() {
    this.getPatientList();
  }

  getPatientList(): void {
    this.patientService.getPatientList().subscribe(patients => {
      this.dataSource = new MatTableDataSource<Patient>(patients);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  openEditDialog(patient: Patient): void {
    const dialogRef = this.dialog.open(CreateEditPatientDialogComponent, {
      width: '250px',
      data: {title: 'Edit', type: DialogEvent.EDIT, patient}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.event === DialogEvent.EDIT) {
        this.snackBar.openSnackBar('Patient updated successfully!', 'close');
        this.getPatientList();
      }
    });
  }

  openDeleteDialog(patient: Patient): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: {title: 'Patient', name: patient.firstName}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.patientService.deletePatient(patient.id.toString()).subscribe(
          success => this.snackBar.openSnackBar('Patient deleted successfully!', 'close'));
        this.getPatientList();
      }
    });
  }

  goToAppointments(id: Patient) {
    this.router.navigate([`patients/${id}/appointments`]);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  selectRow(patient: Patient) {
    if (patient.id === this.selectedPatientId) {
      this.selectedPatientId = -1;
    } else {
      this.selectedPatientId = patient.id;
    }
  }
}
