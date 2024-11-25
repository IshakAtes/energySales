export class formModel {
    name: string;
    lastName: string;
    phoneNumber: number;
    power: string | undefined | null;
    email: string;
    consume: string;
    feedback: string;


    constructor(obj?: any){
        this.name = obj ? obj.name : '';
        this.lastName = obj ? obj.lastName : '';
        this.phoneNumber = obj ? obj.phoneNumber : '';
        this.power = obj ? obj.power : '';
        this.email = obj ? obj.email : '';
        this.consume = obj ? obj.consume : '';
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
            feedback: this.feedback
        }
    }
}
