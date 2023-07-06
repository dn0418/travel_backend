import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateFoodAndDrinkDto, UpdateFoodAndDrinkDto } from './food-and-drink.dto';
import { FoodAndDrinksService } from './food-and-drinks.service';

@Controller('food-and-drinks')
export class FoodAndDrinksController {
  constructor(private readonly foodAndDrinksService: FoodAndDrinksService) { }

  @Post('create')
  create(@Body() createFoodAndDrinkDto: CreateFoodAndDrinkDto) {
    return this.foodAndDrinksService.create(createFoodAndDrinkDto);
  }

  @Get()
  findAll() {
    return this.foodAndDrinksService.findAll();
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
