export class Technologie{
    constructor(private id_technologie: number,private name: string,private icon: string){}

    public get _icon(): string {
        return this.icon;
    }
    public set _icon(value: string) {
        this.icon = value;
    }
    public get _name(): string {
        return this.name;
    }
    public set _name(value: string) {
        this.name = value;
    }
    public get id(): number {
        return this.id_technologie;
    }
    public set id(value: number) {
        this.id_technologie = value;
    }
    equals(technologie:Technologie){
        return this.id_technologie==technologie.id_technologie;
    }
}