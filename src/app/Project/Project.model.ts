import { Field } from "../Field/Field.model";
import { Technologie } from "../Technologie/Technologie.model";
import { ProjectType } from "./ProjectType";

export class Project{

constructor(private id_project: number,private name: string ,private description: string,private images: string[],private codeURL: string,private demoURL: string,private type: ProjectType,private fields: Field[],private technologies: Technologie[],private idExperience: number){

}
public get _id(): number {
    return this.id_project;
}
public set _id(value: number) {
    this.id_project = value;
}
public get _name(): string {
    return this.name;
}
public set _name(value: string) {
    this.name = value;
}
public get _description(): string {
    return this.description;
}
public set _description(value: string) {
    this.description = value;
}
public get _images(): string[] {
    return this.images;
}
public set _images(value: string[]) {
    this.images = value;
}
public get _codeURL(): string {
    return this.codeURL;
}
public set _codeURL(value: string) {
    this.codeURL = value;
}
public get _demoURL(): string {
    return this.demoURL;
}
public set _demoURL(value: string) {
    this.demoURL = value;
}
public get _type(): ProjectType {
    return this.type;
}
public set _type(value: ProjectType) {
    this.type = value;
}
public get _fields(): Field[] {
    return this.fields;
}
public set _fields(value: Field[]) {
    this.fields = value;
}
public get _technologies(): Technologie[] {
    return this.technologies;
}
public set _technologies(value: Technologie[]) {
    this.technologies = value;
}
public get _idExperience(): number {
    return this.idExperience;
}
public set _idExperience(value: number) {
    this.idExperience = value;
}

    
}