import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, map } from "rxjs";
import { User } from "./User/User.model";
import { Injectable } from "@angular/core";
import { Field } from "./Field/Field.model";
import { Technologie } from "./Technologie/Technologie.model";
import { Education } from "./Education/Education.model";
import { Experience } from "./Experience/Experience.model";
import { Project } from "./Project/Project.model";
@Injectable({providedIn:"root"})
export class ConnectionService{

    static link="https://protfolio-backend-production.up.railway.app/";
    private apiLink=ConnectionService.link+"/api";
    private user:User;
    private logedIn:boolean;
constructor(private httpClient:HttpClient) {this.logedIn=false; this.user=new User("","")
}
logIn(userEmail:string,password:string) :Observable<boolean>{
    return this.httpClient.post<User>(this.apiLink+"/auth/logIn",{
        "userEmail":userEmail,
        "password":password
    },{headers:{}}).pipe(map(
        (response)=>{
            this.user=new User(response.token,response.role)
            this.logedIn=true;
        return true}
    ))
}
isLoged(){
    return this.logedIn
}
isAdmin(){
    if(this.user.role=="Admin"){return true}
    return false;
}
getFields() {
    var headers_object = new HttpHeaders().set('Content-Type', 'application/json')

    return this.httpClient.get<any[]>(this.apiLink+"/Field/getFields",{headers:headers_object}).pipe(map(param=>{
        let fields=[]
        for( let field of param){
            
           fields.push(new Field(field.field_id,field.fieldName))
        }
        console.log(fields)
        return fields
    }))
}
addField(field: Field) {
    
    var headers_object = new HttpHeaders().set('Content-Type', 'application/json')
    .set('Authorization', `Bearer `+this.user.token);
  //  
    

   return this.httpClient.post(this.apiLink+"/Field/addField",field,{headers:headers_object})
}
getFieldById(id: number) {
    var headers_object = new HttpHeaders().set('Content-Type', 'application/json')

    return this.httpClient.get<any>(this.apiLink+"/Field/getField/"+id, {headers:headers_object}).pipe(map(param=>{ return new Field(param.field_id,param.fieldName)}))
}
deleteField(field:Field){
    var headers_object = new HttpHeaders().set('Content-Type', 'application/json')
    .set('Authorization', `Bearer `+this.user.token)
    return this.httpClient.delete(this.apiLink+"/Field/deleteField",{headers:headers_object,body:field})
}
getTechnologies(){
    var headers_object = new HttpHeaders().set('Content-Type', 'application/json')

    return this.httpClient.get<any[]>(this.apiLink+"/Technologies/getTechnologies",{headers:headers_object}).pipe(map(param=>{
        let Techs=[]
        for(let tech of param){
            Techs.push(new Technologie(tech.id_technologie,tech.name,tech.icon))
        }return Techs
    }))
}
addTechnologie(technologie:Technologie){
    var headers_object = new HttpHeaders().set('Content-Type', 'application/json')
    .set('Authorization', `Bearer `+this.user.token);
    return this.httpClient.post<number>(this.apiLink+"/Technologies/addTechnologie",technologie,{headers:headers_object})
}
getTechnologieById(id: number) {
    var headers_object = new HttpHeaders().set('Content-Type', 'application/json')

    return this.httpClient.get<any>(this.apiLink+"/Technologies/getTechnologie/"+id, {headers:headers_object}).pipe(map(param=>{ 
        return new Technologie(param.id_technologie,param.name,param.icon)}))
}
deleteTechnologie(technologie:Technologie){
    var headers_object = new HttpHeaders().set('Content-Type', 'application/json')
    .set('Authorization', `Bearer `+this.user.token)
    return this.httpClient.delete<Technologie[]>(this.apiLink+"/Technologies/deleteTechnologie",{headers:headers_object,body:technologie})
}
getEducations():Observable<Education[]>{
    var headers_object = new HttpHeaders().set('Content-Type', 'application/json')
   
    return this.httpClient.get<any[]>(this.apiLink+"/Education/getEducations",{headers:headers_object}).pipe(map(param=>{
        let educations:Education[]=[];
        for(let E of param){
            educations.push(new Education(E.education_id,E.degree,E.school,new Date(E.startDate),new Date(E.endDate),E.description));
        }
    return educations;
    }))
}
addEducation(education:Education){
    var headers_object = new HttpHeaders().set('Content-Type', 'application/json')
    .set('Authorization', `Bearer `+this.user.token);
    return this.httpClient.post<number>(this.apiLink+"/Education/addEducation",education,{headers:headers_object})    
}
getEducationById(id:number){
    var headers_object = new HttpHeaders().set('Content-Type', 'application/json')

    return this.httpClient.get<any>(this.apiLink+"/Education/getEducation/"+id,{headers:headers_object}).pipe(map(param=>{
        
        return   new Education(param.education_id,param.degree,param.school,param.startDate,param.endDate,param.description)
        
    }))
}
deleteEducation(education:Education){
    var headers_object = new HttpHeaders().set('Content-Type', 'application/json')
    .set('Authorization', `Bearer `+this.user.token);
    console.log(education)
    return this.httpClient.delete<Education[]>(this.apiLink+"/Education/deleteEducation",{headers:headers_object,body:education})
}
getExperiences():Observable<Experience[]>{
    var headers_object = new HttpHeaders().set('Content-Type', 'application/json')

    return this.httpClient.get<any[]>(this.apiLink+"/Experience/getExperiences",{headers:headers_object}).pipe(map(param=>{
        let experiences:Experience[]=[];
        for (let E of param){
           let projects:Project[]=[]
            for(let p of E.projects){

                let technologies:Technologie[]=[]
                for(let t of p.technologies){
                    technologies.push(new Technologie(t.id_technologie,t.name,t.icon))
                }
                projects.push(new Project(p.id_project,p.name,p.description,p.images,p.codeURL,p.demoURL,p.type,p.fields,technologies,p.ideExperience))
               
            }
            experiences.push(new Experience(E.experience_id,E.role,E.company,E.startDate,E.endDate,E.description,projects))
        }
        return experiences
    }))
}
addExperience(experience:Experience){
    var headers_object = new HttpHeaders().set('Content-Type', 'application/json')
    .set('Authorization', `Bearer `+this.user.token);
    return this.httpClient.post<number>(this.apiLink+"/Experience/addExperience",experience,{headers:headers_object})
}
getExperienceById(id:number){
    var headers_object = new HttpHeaders().set('Content-Type', 'application/json')

    return this.httpClient.get<any>(this.apiLink+"/Experience/getExperience/"+id,{headers:headers_object}).pipe(map(param=>{
        let projects:Project[]=[]
        for(let p of param.projects){
            let technologies:Technologie[]=[]
            for(let t of p.technologies){
                technologies.push(new Technologie(t.id_technologie,t.name,t.icon))
            }
            projects.push(new Project(p.id_project,p.name,p.description,p.images,p.codeURL,p.demoURL,p.type,p.fields,technologies,p.ideExperience))
        }
        return new Experience(param.experience_id,param.role,param.company,param.startDate,param.endDate,param.description,projects)
    }))
}
deleteExperience(experience:Experience){
    var headers_object = new HttpHeaders().set('Content-Type', 'application/json')
    .set('Authorization', `Bearer `+this.user.token);
 
  return  this.httpClient.delete(this.apiLink+"/Experience/deleteExperience",{headers:headers_object,body:experience})
}
getProjects():Observable<Project[]>{
    
    var headers_object = new HttpHeaders().set('Content-Type', 'application/json')

    return this.httpClient.get<any[]>(this.apiLink+"/projects/getProjects",{headers:headers_object}).pipe(map(param=>{
        let projects:Project[]=[];
        
        for(let P of param){
            let techs:Technologie[]=[]
            for(let tech of P.technologies){
                
                techs.push(new Technologie(tech.id_technologie,tech.name,tech.icon))
                
            }
            P.technologies=techs
           
            projects.push(new Project(P.id_project,P.name,P.description,P.images,P.codeURL,P.demoURL,P.type,P.fields,P.technologies,P.ideExperience))
        }
        return projects
    }))
}
getPersonalProjects():Observable<Project[]>{
    
    var headers_object = new HttpHeaders().set('Content-Type', 'application/json')
  
    return this.httpClient.get<any[]>(this.apiLink+"/projects/getProjectsByType/personal",{headers:headers_object}).pipe(map(param=>{
        let projects:Project[]=[];
        
        for(let P of param){
            let techs:Technologie[]=[]
            for(let tech of P.technologies){
                
                techs.push(new Technologie(tech.id_technologie,tech.name,tech.icon))
                
            }
            P.technologies=techs
           
            projects.push(new Project(P.id_project,P.name,P.description,P.images,P.codeURL,P.demoURL,P.type,P.fields,P.technologies,P.ideExperience))
        }
        return projects
    }))
}
addProject(project:Project){
    var headers_object = new HttpHeaders().set('Content-Type', 'application/json')
    .set('Authorization', `Bearer `+this.user.token);
    return this.httpClient.post<number>(this.apiLink+"/projects/addProject",project,{headers:headers_object})
}
getProjectById(id:number){
    var headers_object = new HttpHeaders().set('Content-Type', 'application/json')

    return this.httpClient.get<any>(this.apiLink+"/projects/getProject/"+id,{headers:headers_object}).pipe(map(param=>{
        return  new Project(param.id_project,param.name,param.description,param.images,param.codeURL,param.demoURL,param.type,param.fields,param.technologies,param.idExperience)
    }))
}
filterProjects(filters){
    var headers_object = new HttpHeaders().set('Content-Type', 'application/json')
  console
    return this.httpClient.get<any[]>(this.apiLink+"/projects/filterProjects",{headers:headers_object,params:filters }  ).pipe(map(param=>{
        let projects:Project[]=[]
        
        for(let P of param){
            let techs:Technologie[]=[]
            for(let tech of P.technologies){
                
                techs.push(new Technologie(tech.id_technologie,tech.name,tech.icon))
                
            }
            P.technologies=techs
           
            projects.push(new Project(P.id_project,P.name,P.description,P.images,P.codeURL,P.demoURL,P.type,P.fields,P.technologies,P.ideExperience))
        }
        return projects
    }))
}
deleteProject(project:Project){
    console.log(project)
    var headers_object = new HttpHeaders().set('Content-Type', 'application/json')
    .set('Authorization', `Bearer `+this.user.token);
    return this.httpClient.delete(this.apiLink+"/projects/deleteProject",{headers:headers_object,body:project})
}
uploadFile(formData:FormData): Observable<any> {
    var headers_object = new HttpHeaders().set('Accept', 'application/json')
    .set('Authorization', `Bearer `+this.user.token);
    return this.httpClient.post<any>(this.apiLink+"/upload",formData,{headers:headers_object})
}
}