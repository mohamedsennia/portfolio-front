import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { AdminPanelComponent } from "./admin-panel/admin-panel.component";
import { ShowProjectsComponent } from "./admin-panel/Projects/show-projects/show-projects.component";
import { AddProjectComponent } from "./admin-panel/Projects/add-project/add-project.component";
import { EditProjectComponent } from "./admin-panel/Projects/edit-project/edit-project.component";
import { AddEducationComponent } from "./admin-panel/Education/add-education/add-education.component";
import { ShowEducationsComponent } from "./admin-panel/Education/show-educations/show-educations.component";
import { EditEducationComponent } from "./admin-panel/Education/edit-education/edit-education.component";
import { AddExperienceComponent } from "./admin-panel/Experience/add-experience/add-experience.component";
import { ShowExperiencesComponent } from "./admin-panel/Experience/show-experiences/show-experiences.component";
import { EditExperienceComponent } from "./admin-panel/Experience/edit-experience/edit-experience.component";
import { AddFieldComponent } from "./admin-panel/Field/add-field/add-field.component";
import { ShowFieldsComponent } from "./admin-panel/Field/show-fields/show-fields.component";
import { EditFieldComponent } from "./admin-panel/Field/edit-field/edit-field.component";
import { AddTechnologieComponent } from "./admin-panel/Technologie/add-technologie/add-technologie.component";
import { ShowTechnologiesComponent } from "./admin-panel/Technologie/show-technologies/show-technologies.component";
import { EditTechnologieComponent } from "./admin-panel/Technologie/edit-technologie/edit-technologie.component";
import { authGuard } from "./auth-guard.service";
import { ClientSideComponent } from "./client-side/client-side.component";
import { IntroductionComponent } from "./client-side/introduction/introduction.component";
import { AboutMeComponent } from "./client-side/about-me/about-me.component";
import { ProjectsListComponent } from "./client-side/Project/projects-list/projects-list.component";
import { ExperiencesListComponent } from "./client-side/Experience/experiences-list/experiences-list.component";
import { SingleProjectComponent } from "./client-side/Project/single-project/single-project.component";
import { EducationsListComponent } from "./client-side/Education/educations-list/educations-list.component";
const projectRoutes:Route[]=[
    {path:"projects/addProject",component:AddProjectComponent},
    {path:"projects/:page",component:ShowProjectsComponent},
    {path:"projects/editProject/:id",component:EditProjectComponent}
    ]
const educationtRoutes:Route[]=[
    {path:"educations/addEducation",component:AddEducationComponent},
    {path:"educations/:page",component:ShowEducationsComponent},
    {path:"educations/editEducation/:id",component:EditEducationComponent}
    ]
const experienceRoutes:Route[]=[
    {path:"experiences/addExperience",component:AddExperienceComponent},
    {path:"experiences/:page",component:ShowExperiencesComponent},
    {path:"experiences/editExperience/:id",component:EditExperienceComponent}
    ]
const fieldtRoutes:Route[]=[
    {path:"fields/addField",component:AddFieldComponent},
    {path:"fields/:page",component:ShowFieldsComponent},
    {path:"fields/editField/:id",component:EditFieldComponent}
    ]
const technologieRoutes:Route[]=[
    {path:"technologies/addTechnologie",component:AddTechnologieComponent},
    {path:"technologies/:page",component:ShowTechnologiesComponent},
    {path:"technologies/editTechnologie/:id",component:EditTechnologieComponent}
    ]
const appRoutes:Route[]=[{path :"", pathMatch:"full", redirectTo:"home"},
{path:"login", component:LoginComponent},
{path:"admin-panel",component:AdminPanelComponent,children:[
    ...projectRoutes,
    ...educationtRoutes,
    ...experienceRoutes,
    ...fieldtRoutes,
    ...technologieRoutes
],canActivate:[authGuard]},
{path:"",component:ClientSideComponent,children:[
    {path:"home",component:IntroductionComponent},
    {path:"about",component:AboutMeComponent},
    {path:"projects",component:ProjectsListComponent},
    {path:"experiences",component:ExperiencesListComponent},
    {path:"project/:id",component:SingleProjectComponent},
    {path:"education",component:EducationsListComponent}


]},
]
@NgModule({
    imports:[RouterModule.forRoot(appRoutes,{scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    scrollOffset: [0, 64]})],
    exports:[RouterModule]
})
export class AppRoutingModule{} 