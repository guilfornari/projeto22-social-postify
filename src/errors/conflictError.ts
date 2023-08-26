import { HttpException, HttpStatus } from "@nestjs/common";

export class ConflictError extends HttpException {
    constructor() {
        super(`Your data is causing conflict`, HttpStatus.CONFLICT);

    }
}