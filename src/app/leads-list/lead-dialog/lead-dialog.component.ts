import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Lead } from '../lead.model';

@Component({
  selector: 'app-lead-dialog',
  templateUrl: './lead-dialog.component.html',
  styleUrls: ['./lead-dialog.component.scss']
})
export class LeadDialogComponent {
  dialogForm: FormGroup;
  leads: Lead[] = [];
  selectedLeads: Lead[] = [];

  constructor(
    public dialogRef: MatDialogRef<LeadDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) {
    this.dialogForm = this.formBuilder.group({
      contactName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      bestTimeToContact: ['', Validators.required],
      reasonForCall: ['', Validators.required],
      notes: ['', Validators.required]
    });
    this.dialogForm.patchValue(this.data)
  }

  fetchLeads() {
    this.http.get<Lead[]>('http://localhost:3000/leads').subscribe(response => {
      this.leads = response;
    });
  }

  saveLead(): void {
    if (this.dialogForm.valid) {
      const lead: Lead = this.dialogForm.getRawValue();
      const leadId = this.data.id;

      if (leadId) {
        this.http.put<any>(`http://localhost:3000/leads/${leadId}`, lead).subscribe(response => {
          this.fetchLeads();
        });
      } else {
        this.http.post<any>('http://localhost:3000/leads', lead).subscribe(response => {
          this.fetchLeads();
        });
      }
      this.dialogRef.close();
    }
  }
}