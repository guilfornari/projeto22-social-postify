import { HttpException, HttpStatus } from "@nestjs/common";

export class ForbiddenError extends HttpException {
    private _inputId: number;

    constructor(inputId: number) {
        super(`Inputed id ${inputId} refers to information in use`, HttpStatus.FORBIDDEN);
        this._inputId = inputId;
    }

    get inputId() {
        return this._inputId;
    }
}