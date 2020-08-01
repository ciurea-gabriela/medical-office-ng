import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {SnackBarUtil} from '../../../util/SnackBarUtil';
import {MatDialog} from '@angular/material/dialog';
import {DoctorService} from '../../../core/services/doctor.service';
import {Doctor} from '../../../model/doctor.interface';
import {DialogEvent} from '../../../model/enums/dialog-event.enum';
import {DeleteDialogComponent} from '../../../shared/components/delete-dialog/delete-dialog.component';
import {CreateEditDoctorDialogComponent} from '../create-edit-doctor-dialog/create-edit-doctor-dialog.component';
import {NewMpDialogComponent} from '../new-mp-dialog/new-mp-dialog.component';
import {UpdateOperation} from '../../../model/enums/update-operation.enum';

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.scss']
})
export class DoctorListComponent implements OnInit {
  public displayedColumns: string[] =
    ['no', 'name', 'cnp', 'sex', 'specialization', 'phoneNumber', 'add', 'edit', 'delete'];
  public dataSource: MatTableDataSource<Doctor>;
  public selectedDoctorId: number;

  @ViewChild(MatPaginator, {static: true}) public paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) private sort: MatSort;

  constructor(private doctorService: DoctorService,
              public snackBar: SnackBarUtil,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getDoctorList();
  }

  public getDoctorList(): void {
    this.doctorService.getDoctorList().subscribe(doctors => {
      this.dataSource = new MatTableDataSource<Doctor>(doctors);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  public openEditDialog(doctor: Doctor): void {
    const dialogRef = this.dialog.open(CreateEditDoctorDialogComponent, {
      width: '250px',
      data: {title: 'Edit', type: DialogEvent.EDIT, doctor}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.event === DialogEvent.EDIT) {
        this.snackBar.openSnackBar('Doctor updated successfully!', 'close');
        this.getDoctorList();
      }
    });
  }

  public openDeleteDialog(doctor: Doctor): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: {title: 'Doctor', name: doctor.name}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.doctorService.deleteDoctor(doctor.id.toString()).subscribe(
          () => {
            this.snackBar.openSnackBar('Doctor deleted successfully!', 'close');
            this.getDoctorList();
          });
      }
    });
  }

  public openAddMpDialog(doctor: Doctor): void {
    const dialogRef = this.dialog.open(NewMpDialogComponent, {
      width: '400px',
      data: {title: 'Add', doctor, updateOperationType: UpdateOperation.ADD}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.event === DialogEvent.ADD_MEDICAL_PROCEDURE) {
        this.snackBar.openSnackBar('Medical Procedure added successfully!', 'close');
        this.getDoctorList();
      }
    });
  }

  public openDeleteMpDialog(doctor: Doctor): void {
    const dialogRef = this.dialog.open(NewMpDialogComponent, {
      width: '400px',
      data: {title: 'Remove', doctor, updateOperationType: UpdateOperation.DELETE}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.event === DialogEvent.DELETE_MEDICAL_PROCEDURE) {
        this.snackBar.openSnackBar('Medical Procedure removed successfully!', 'close');
        this.getDoctorList();
      }
    });
  }

  public applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  selectRow(doctor: Doctor) {
    if (doctor.id === this.selectedDoctorId) {
      this.selectedDoctorId = -1;
    } else {
      this.selectedDoctorId = doctor.id;
    }
  }

}
