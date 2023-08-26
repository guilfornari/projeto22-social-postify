import { HttpException, HttpStatus } from "@nestjs/common";

export class NotFoundError extends HttpException {
    private _inputId: number;

    constructor(inputId: number) {
        super(`Information with id ${inputId} not found`, HttpStatus.NOT_FOUND);
        this._inputId = inputId;
    }

    get inputId() {
        return this._inputId;
    }
}