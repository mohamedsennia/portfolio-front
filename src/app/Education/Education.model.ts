export class Education{
    constructor(private education_id: number,private degree: string,private school: string,private startDate: Date,private endDate: Date,private description: string){}

    public get _description(): string {
        return this.description;
    }
    public set _description(value: string) {
        this.description = value;
    }
    public get _endDate(): Date {
        return this.endDate;
    }
    public set _endDate(value: Date) {
        this.endDate = value;
    }
    public get _startDate(): Date {
        return this.startDate;
    }
    public set _startDate(value: Date) {
        this.startDate = value;
    }
    public get _school(): string {
        return this.school;
    }
    public set _school(value: string) {
        this.school = value;
    }
    public get _degree(): string {
        return this.degree;
    }
    public set _degree(value: string) {
        this.degree = value;
    }
    public get id(): number {
        return this.education_id;
    }
    public set id(value: number) {
        this.education_id = value;
    }
}