export class Error {
    type: string;
    message: string;
    time: number;
    is_error: boolean;

    constructor(type: string, message: string, time: number, is_error: boolean) {
        this.type = type;
        this.message = message;
        this.time = time;
        this.is_error = is_error;
    }
}