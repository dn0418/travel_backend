import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateTourDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  dayLength: number;

  @IsNotEmpty()
  @IsNumber()
  nightLength: number;

  @IsNotEmpty()
  @IsString()
  bestTime: string;

  @IsOptional()
  @IsString()
  date: string;

  @IsNotEmpty()
  @IsString()
  mainList: string;

  @IsNotEmpty()
  @IsString()
  childList: string;

  @IsNotEmpty()
  @IsString()
  shortDescription: string;

  @IsNotEmpty()
  @IsString()
  longDescription: string;

  @IsOptional()
  @IsBoolean()
  freeCancelation: boolean;

  @IsNotEmpty()
  @IsNumber()
  activities: number;

  @IsNotEmpty()
  @IsString()
  locationImg: string;

  @IsNotEmpty()
  @IsString()
  thumbnail: string;

  @IsNotEmpty()
  @IsNumber()
  destinationId: number;

  @IsOptional()
  @IsArray()
  includesServices: Array<string>;

  @IsOptional()
  @IsArray()
  excludeServices: Array<string>;

  @IsOptional()
  @IsArray()
  images: Array<string>;

  @IsOptional()
  @IsArray()
  routes: Array<RouteDto>;

  @IsOptional()
  @IsArray()
  individualPricing: Array<IndividualPricingDto>;

  @IsOptional()
  @IsArray()
  departuresPricing: Array<DeparturesPricingDto>;
}


export class UpdateTourDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsNumber()
  dayLength: number;

  @IsOptional()
  @IsNumber()
  nightLength: number;

  @IsOptional()
  @IsString()
  bestTime: string;

  @IsOptional()
  @IsString()
  date: string;

  @IsOptional()
  @IsString()
  mainList: string;

  @IsOptional()
  @IsString()
  childList: string;

  @IsOptional()
  @IsString()
  shortDescription: string;

  @IsOptional()
  @IsString()
  longDescription: string;

  @IsOptional()
  @IsString()
  freeCancelation: boolean;

  @IsOptional()
  @IsNumber()
  activities: number;

  @IsOptional()
  @IsString()
  locationImg: string;

  @IsOptional()
  @IsString()
  thumbnail: string;
}


class RouteDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  time: string;

  @IsString()
  @IsNotEmpty()
  distance: string;

  @IsString()
  @IsNotEmpty()
  meals: string;

  @IsString()
  @IsNotEmpty()
  hotel: string;
}

class IndividualPricingDto {
  @IsNumber()
  @IsNotEmpty()
  pax2_3: number;

  @IsNotEmpty()
  @IsNumber()
  pax4_6: number;

  @IsNotEmpty()
  @IsNumber()
  pax7_18: number;

  @IsNotEmpty()
  @IsNumber()
  pax20_more: number;
}

class DeparturesPricingDto {
  @IsString()
  @IsNotEmpty()
  startDate: string;

  @IsOptional()
  @IsString()
  endDate: string;

  @IsNumber()
  @IsNotEmpty()
  maxPerson: number;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}