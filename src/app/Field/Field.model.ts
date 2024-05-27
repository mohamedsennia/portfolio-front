export class Field {
    constructor(private field_id: number, private fieldName: string) {}
  
    get _field_id(): number {
      return this.field_id;
    }
  
    set _field_id(value: number) {
      this.field_id = value;
    }
  
    get _fieldName(): string {
      return this.fieldName;
    }
  
    set _fieldName(value: string) {
      this.fieldName = value;
    }
  
    equals(field: Field) {
      return this.field_id === field.field_id;
    }
  }