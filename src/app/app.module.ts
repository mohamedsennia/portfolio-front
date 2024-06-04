import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule} from "@angular/common/http"
import { ReactiveFormsModule } from '@angular/forms';
import { ConnectionService } from './Connection.service';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { SideBarComponent } from './admin-panel/side-bar/side-bar.component';
import { ShowProjectsComponent } from './admin-panel/Projects/show-projects/show-projects.component';
import { AddProjectComponent } from './admin-panel/Projects/add-project/add-project.component';
import { EditProjectComponent } from './admin-panel/Projects/edit-project/edit-project.component';
import { AppRoutingModule } from './app-routing.model';
import { EditEducationComponent } from './admin-panel/Education/edit-education/edit-education.component';
import { AddEducationComponent } from './admin-panel/Education/add-education/add-education.component';
import { ShowEducationsComponent } from './admin-panel/Education/show-educations/show-educations.component';
import { AddExperienceComponent } from './admin-panel/Experience/add-experience/add-experience.component';
import { ShowExperiencesComponent } from './admin-panel/Experience/show-experiences/show-experiences.component';
import { EditExperienceComponent } from './admin-panel/Experience/edit-experience/edit-experience.component';
import { EditFieldComponent } from './admin-panel/Field/edit-field/edit-field.component';
import { AddFieldComponent } from './admin-panel/Field/add-field/add-field.component';
import { ShowFieldsComponent } from './admin-panel/Field/show-fields/show-fields.component';
import { ShowTechnologiesComponent } from './admin-panel/Technologie/show-technologies/show-technologies.component';
import { EditTechnologieComponent } from './admin-panel/Technologie/edit-technologie/edit-technologie.component';
import { AddTechnologieComponent } from './admin-panel/Technologie/add-technologie/add-technologie.component';
import { IntroductionComponent } from './client-side/introduction/introduction.component';
import { NavbarComponent } from './client-side/navbar/navbar.component';
import { AboutMeComponent } from './client-side/about-me/about-me.component';

import { ProjectsListComponent } from './client-side/Project/projects-list/projects-list.component';
import { SingleProjectComponent } from './client-side/Project/single-project/single-project.component';
import { SingleExperienceComponent } from './client-side/Experience/single-experience/single-experience.component';
import { ExperiencesListComponent } from './client-side/Experience/experiences-list/experiences-list.component';
import { ClientSideComponent } from './client-side/client-side.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EducationsListComponent } from './client-side/Education/educations-list/educations-list.component';
import { SingleEducationComponent } from './client-side/Education/single-education/single-education.component';
import { ClinetSideBarComponent } from './client-side/clinet-side-bar/clinet-side-bar.component';
import { applicationService } from './app.service';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminPanelComponent,
    SideBarComponent,
    ShowProjectsComponent,
    AddProjectComponent,
    EditProjectComponent,
    EditEducationComponent,
    AddEducationComponent,
    ShowEducationsComponent,
   
    ShowExperiencesComponent,
        AddExperienceComponent,
        EditExperienceComponent,
        EditFieldComponent,
        AddFieldComponent,
        ShowFieldsComponent,
        ShowTechnologiesComponent,
        EditTechnologieComponent,
        AddTechnologieComponent,
        IntroductionComponent,
        NavbarComponent,
        AboutMeComponent,

        ProjectsListComponent,
        SingleProjectComponent,
        SingleExperienceComponent,
        ExperiencesListComponent,
        ClientSideComponent,
        EducationsListComponent,
        SingleEducationComponent,
        ClinetSideBarComponent,
        
      
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule
  ],
  providers: [ConnectionService,applicationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
