import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotesComponent } from './pages/notes/notes.component';
import { MainComponent } from './pages/main/main.component';


const routes: Routes = [
  {path:'',component:MainComponent,children:[
    {path:'',component:NotesComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
}) 
export class AppRoutingModule { }
