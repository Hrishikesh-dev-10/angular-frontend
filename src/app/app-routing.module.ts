import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotesComponent } from './pages/notes/notes.component';
import { MainComponent } from './pages/main/main.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AddNotesComponent } from './pages/add-notes/add-notes.component';


const routes: Routes = [
  {path:'',component:MainComponent,children:[
    {path:'notes',component:NotesComponent},
    {path:'',component:LoginComponent},
    {path:'register',component:RegisterComponent},
    {path:'add-notes',component:AddNotesComponent},

  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
}) 
export class AppRoutingModule { }
