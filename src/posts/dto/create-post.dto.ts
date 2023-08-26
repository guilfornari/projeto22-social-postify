import { IsOptional, IsString, IsUrl } from "class-validator";

export class CreatePostDto {
    @IsString()
    title: string;

    @IsString()
    text: string;

    @IsOptional() @IsUrl()
    image: string;
}
