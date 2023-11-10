import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotesComponent } from './pages/notes/notes.component';
import { MainComponent } from './pages/main/main.component';
import { NoteCardComponent } from './comp/note-card/note-card.component';
import { LoginComponent } from './pages/login/login.component';
import { AddNotesComponent } from './pages/add-notes/add-notes.component';
import { RegisterComponent } from './pages/register/register.component';
import { HttpClientModule} from '@angular/common/http';
import { NoteDetailsComponent } from './pages/note-details/note-details.component';
import { ShareNoteComponent } from './comp/share-note/share-note.component'

@NgModule({
  declarations: [
    AppComponent,
    NotesComponent,
    MainComponent,
    NoteCardComponent,
    LoginComponent,
    AddNotesComponent,
    RegisterComponent,
    NoteDetailsComponent,
    ShareNoteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
