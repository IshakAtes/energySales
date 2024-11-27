export class formModel {
    name: string;
    lastName: string;
    phoneNumber: number;
    power: string | undefined | null;
    email: string;
    consume: string;
    file: File | null;
    feedback: string = '';


    constructor(obj?: any){
        this.name = obj ? obj.name : '';
        this.lastName = obj ? obj.lastName : '';
        this.phoneNumber = obj ? obj.phoneNumber : 0;
        this.power = obj ? obj.power : '';
        this.email = obj ? obj.email : '';
        this.consume = obj ? obj.consume : '';
        this.file = obj ? obj.file : null;
        this.feedback = obj ? obj.feedback : '';
    }

    public toJSON(){
        return {
            name: this.name,
            lastName: this.lastName,
            phoneNumber: this.phoneNumber,
            power: this.power,
            email: this.email,
            consume: this.consume,
            file: this.file ? this.file.name : null,
            feedback: this.feedback
        }
    }
}
