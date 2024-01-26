import { IsNotEmpty, IsNumber, IsOptional, IsString, Max } from 'class-validator'

export class GetPaginationDto {
	@IsNotEmpty()
	@IsNumber()
	@Max(100)
	limit: number

	@IsString()
	@IsOptional()
	afterCursor?: string

	@IsString()
	@IsOptional()
	beforeCursor?: string
}
