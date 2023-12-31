import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Lead } from './lead.model';
import { LeadDialogComponent } from './lead-dialog/lead-dialog.component';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-leads-list',
  templateUrl: './leads-list.component.html',
  styleUrls: ['./leads-list.component.scss']
})
export class LeadsListComponent implements OnInit {
  leads$: Observable<Lead[]> = of([]);
  filteredLeads$: Observable<Lead[]> = of([]);
  selectedLeads: Lead[] = [];

  constructor(private dialog: MatDialog, private http: HttpClient) { }

  ngOnInit() {
    this.fetchLeads();
  }

  fetchLeads() {
    this.leads$ = this.http.get<Lead[]>('http://localhost:3000/leads');
    this.filteredLeads$ = this.leads$; 
  }

  openAddLeadDialog() {
    const dialogRef = this.dialog.open(LeadDialogComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.http.post<any>('http://localhost:3000/leads', result).subscribe(response => {
          this.fetchLeads(); 
        });
      }
    });
  }

  openEditLeadDialog(lead: Lead) {
    const dialogRef = this.dialog.open(LeadDialogComponent, {
      width: '400px',
      data: { ...lead }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.http.put<any>(`http://localhost:3000/leads/${lead.id}`, result).subscribe(response => {
          this.fetchLeads(); 
        });
      }
    });
  }

  isSelected(lead: Lead) {
    return this.selectedLeads.indexOf(lead) !== -1;
  }

  toggleSelection(event: any, lead: Lead) {
    if (event.checked) {
      this.selectedLeads.push(lead);
    } else {
      const index = this.selectedLeads.indexOf(lead);
      if (index !== -1) {
        this.selectedLeads.splice(index, 1);
      }
    }
  }

  deleteLead(lead: Lead) {
    this.http.delete<any>(`http://localhost:3000/leads/${lead.id}`).subscribe(response => {
      this.fetchLeads(); 
    });
  }


searchLeads(event: any) {
  const name = event.target.value.toLowerCase();
  this.filteredLeads$ = this.leads$.pipe(
    map(leads => leads.filter(lead => lead.contactName.toLowerCase().includes(name))),
    startWith([]) 
  );
}

}
