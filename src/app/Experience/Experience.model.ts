import { Project } from "../Project/Project.model";

export class Experience{

    constructor(private experience_id: number,private role: string,private company: string,private startDate: Date,private endDate: Date,private description: string,private projects: Project[]){}
    public get _experience_id(): number {
        return this.experience_id;
    }
    public set _experience_id(value: number) {
        this.experience_id = value;
    }
    public get _role(): string {
        return this.role;
    }
    public set _role(value: string) {
        this.role = value;
    }
    public get _company(): string {
        return this.company;
    }
    public set _company(value: string) {
        this.company = value;
    }
    public get _startDate(): Date {
        return this.startDate;
    }
    public set _startDate(value: Date) {
        this.startDate = value;
    }
    public get _endDate(): Date {
        return this.endDate;
    }
    public set _endDate(value: Date) {
        this.endDate = value;
    }
    public get _description(): string {
        return this.description;
    }
    public set _description(value: string) {
        this.description = value;
    }
    public get _projects(): Project[] {
        return this.projects;
    }
    public set _projects(value: Project[]) {
        this.projects = value;
    }
}