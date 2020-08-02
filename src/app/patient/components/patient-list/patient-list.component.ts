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
  public displayedColumns: string[] =
    ['no', 'firstName', 'lastName', 'birthDate', 'cnp', 'sex', 'city', 'phoneNumber', 'edit', 'delete', 'appointment'];
  public dataSource: MatTableDataSource<Patient>;
  public selectedPatientId: number;

  @ViewChild(MatPaginator, {static: true}) public paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) private sort: MatSort;

  constructor(
    private patientService: PatientService,
    public snackBar: SnackBarUtil,
    private dialog: MatDialog,
    private router: Router) {
  }

  ngOnInit(): void {
    this.getPatientList();
  }

  public getPatientList(): void {
    this.patientService.getPatientList().subscribe(patients => {
      this.dataSource = new MatTableDataSource<Patient>(patients);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  public openEditDialog(patient: Patient): void {
    const dialogRef = this.dialog.open(CreateEditPatientDialogComponent, {
      width: '250px',
      data: {title: 'Edit', type: DialogEvent.EDIT, patient}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result?.event === DialogEvent.EDIT) {
        this.snackBar.openSnackBar('Patient updated successfully!', 'close');
        this.getPatientList();
      }
    });
  }

  public openDeleteDialog(patient: Patient): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: {title: 'Patient', name: patient.firstName}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.patientService.deletePatient(patient.id.toString()).subscribe(
          () => this.snackBar.openSnackBar('Patient deleted successfully!', 'close'));
        this.getPatientList();
      }
    });
  }

  public goToAppointments(id: Patient): void {
    this.router.navigate([`patients/${id}/appointments`]);
  }

  public applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public selectRow(patient: Patient): void {
    if (patient.id === this.selectedPatientId) {
      this.selectedPatientId = -1;
    } else {
      this.selectedPatientId = patient.id;
    }
  }
}
