import { IsBoolean, IsDateString, IsInt, IsOptional } from "class-validator";

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