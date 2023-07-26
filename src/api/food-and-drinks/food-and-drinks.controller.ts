import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateFoodAndDrinkDto, CreateFoodImageDto, UpdateFoodAndDrinkDto } from './food-and-drink.dto';
import { FoodAndDrinksService } from './food-and-drinks.service';

@Controller('food-and-drinks')
export class FoodAndDrinksController {
  constructor(private readonly foodAndDrinksService: FoodAndDrinksService) { }

  @Post('create')
  create(@Body() createFoodAndDrinkDto: CreateFoodAndDrinkDto) {
    return this.foodAndDrinksService.create(createFoodAndDrinkDto);
  }

  @Post('image/create')
  createNewImage(@Body() createImageDto: CreateFoodImageDto) {
    return this.foodAndDrinksService.createNewImage(createImageDto);
  }

  @Get()
  findAll(
    @Query("type") type?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('lan') language?: string,
    @Query('search') searchQuery?: string,
  ) {
    return this.foodAndDrinksService.findAll(type, +page || 1, +limit || 6, searchQuery, language);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.foodAndDrinksService.findOne(+id);
  }

  @Put('update/:id')
  update(@Param('id') id: string, @Body() updateFoodAndDrinkDto: UpdateFoodAndDrinkDto) {
    return this.foodAndDrinksService.update(+id, updateFoodAndDrinkDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.foodAndDrinksService.remove(+id);
  }
}
