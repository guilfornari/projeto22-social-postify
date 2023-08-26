import { IsBoolean, IsDate, IsInt, IsOptional } from "class-validator";

export class CreatePublicationDto {
    @IsInt()
    mediaId: number;

    @IsInt()
    postId: number;

    @IsDate()
    date: Date;

    @IsBoolean() @IsOptional()
    published: boolean;
}