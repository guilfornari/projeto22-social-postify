import { HttpException, HttpStatus } from "@nestjs/common";

export class MediaConflict extends HttpException {
    private _title: string;
    private _username: string;

    constructor(title: string, username: string) {
        super(`Media with title ${title} and username ${username} already exists`, HttpStatus.CONFLICT);
        this._title = title;
        this._username = username;
    }

    get title() {
        return this._title;
    }
    get username() {
        return this._username;
    }
}