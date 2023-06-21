import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';

// Import additional Angular Material modules if needed

import { LeadsListComponent } from './leads-list/leads-list.component';
import { LeadDialogComponent } from './leads-list/lead-dialog/lead-dialog.component';
import { AppComponent } from './app.component';


const routes: Routes = [
  { path: '', component: LeadsListComponent },
  { path: 'leads', component: LeadsListComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' } // Redirect any other route to the leads list
];


@NgModule({
 
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatCheckboxModule
    // Add additional Angular Material modules if needed
  ],

  declarations: [
    AppComponent,
    LeadsListComponent,
    LeadDialogComponent,
  ],

  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class AppModule { }
