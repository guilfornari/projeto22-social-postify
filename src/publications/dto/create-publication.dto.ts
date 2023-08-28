import { IsBoolean, IsDateString, IsInt } from "class-validator";

export class CreatePublicationDto {
    @IsInt()
    mediaId: number;

    @IsInt()
    postId: number;

    @IsDateString()
    date: string;

    @IsBoolean()
    published: boolean;
}