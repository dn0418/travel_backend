import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateTourDto {
  @IsOptional()
  @IsBoolean()
  isRu: boolean;

  @IsOptional()
  @IsBoolean()
  isHy: boolean;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  title_ru: string;

  @IsOptional()
  @IsString()
  title_hy: string;

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
  bestTime_ru: string;

  @IsOptional()
  @IsString()
  bestTime_hy: string;

  @IsOptional()
  @IsBoolean()
  isFixedDate: boolean;

  @IsOptional()
  @IsString()
  startDate: string;

  @IsOptional()
  @IsString()
  endDate: string;

  @IsNotEmpty()
  @IsString()
  mainList: string;

  @IsNotEmpty()
  @IsString()
  childList: string;

  @IsNotEmpty()
  @IsString()
  shortDescription: string;

  @IsOptional()
  @IsString()
  shortDescription_ru: string;

  @IsOptional()
  @IsString()
  shortDescription_hy: string;

  @IsNotEmpty()
  @IsString()
  longDescription: string;

  @IsOptional()
  @IsString()
  longDescription_ru: string;

  @IsOptional()
  @IsString()
  longDescription_hy: string;

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
  includesServices: {
    en: string;
    ru: string;
    hy: string;
  }[];

  @IsOptional()
  @IsArray()
  excludeServices: {
    en: string;
    ru: string;
    hy: string;
  }[];

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
  @IsBoolean()
  isRu: boolean;

  @IsOptional()
  @IsBoolean()
  isHy: boolean;

  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  title_ru: string;

  @IsOptional()
  @IsString()
  title_hy: string;

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
  bestTime_ru: string;

  @IsOptional()
  @IsString()
  bestTime_hy: string;

  @IsOptional()
  @IsBoolean()
  isFixedDate: boolean;

  @IsOptional()
  @IsString()
  startDate: string;

  @IsOptional()
  @IsString()
  endDate: string;

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
  shortDescription_ru: string;

  @IsOptional()
  @IsString()
  shortDescription_hy: string;

  @IsOptional()
  @IsString()
  longDescription: string;

  @IsOptional()
  @IsString()
  longDescription_ru: string;

  @IsOptional()
  @IsString()
  longDescription_hy: string;

  @IsOptional()
  @IsBoolean()
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

  @IsNotEmpty()
  @IsNumber()
  destinationId: number;
}


class RouteDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  title_ru: string;

  @IsOptional()
  @IsString()
  title_hy: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  description_ru: string;

  @IsOptional()
  @IsString()
  description_hy: string;

  @IsNotEmpty()
  @IsString()
  time: string;

  @IsOptional()
  @IsString()
  time_ru: string;

  @IsOptional()
  @IsString()
  time_hy: string;

  @IsNotEmpty()
  @IsString()
  distance: string;

  @IsOptional()
  @IsString()
  distance_ru: string;

  @IsOptional()
  @IsString()
  distance_hy: string;

  @IsNotEmpty()
  @IsString()
  meals: string;

  @IsOptional()
  @IsString()
  meals_ru: string;

  @IsOptional()
  @IsString()
  meals_hy: string;

  @IsNotEmpty()
  @IsString()
  hotel: string;

  @IsOptional()
  @IsString()
  hotel_ru: string;

  @IsOptional()
  @IsString()
  hotel_hy: string;
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

export class CreateImageDto {
  @IsNumber()
  @IsNotEmpty()
  tourId: number;

  @IsString()
  @IsNotEmpty()
  url: string;
}