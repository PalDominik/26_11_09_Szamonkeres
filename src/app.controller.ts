import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import { AppService } from './app.service.js';
import type { createMoziDto } from './createMozi.dto.js';
import fs from 'node:fs'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello() {
    return {
      title: 'My First NestJS App'
    }
  }

  @Get('Mozi')
  @Render('mozioldal')
  getMoziPage(){

  }


  //Visszaküldeni: Title, H1 cím,
  @Post('Mozi')
  @Render('mozioldal')
  getMoziForm(@Body() body: createMoziDto)
  {
    const errors: String[] = [];
    if(!body.name)
    {
      errors.push('Név megadása kötelező!')
    }

   if(!body.e_mail)
   {
    errors.push('E-mail megadása kötelező!')
   }else if(!/^[a-z A-Z 0-9]{1,}@[a-zA-Z]{1,}.[a-zA-Z]{2,}$/.test(body.e_mail)){
    errors.push('Az E-mail cím nem felel meg a követelményeknek!')
   }

   if(!body.date)
   {
    errors.push('Foglalás ídőpontja kötelező megadni!')
   }else{
    let seged_datum = new Date(body.date)
    let mostani_ido = new Date()
    if(seged_datum.getTime() <= mostani_ido.getTime())
    {
      errors.push('A foglalás nem lehet a mai dátumnál régebi!')
    }
   }

   if(!body.reservation)
   {
    errors.push('A foglalások számát meg kell adni!')
   }else if(parseInt(body.reservation) > 10 || parseInt(body.reservation) < 1)
   {
    errors.push('Nem lehet 1-nél kevesebbet vagy 10-nél többet foglalni!')
   }
    
   if(errors.length > 0)

    {
    return{
      errors: errors,
      title: 'Jegyfoglalás',
      webTitle: 'Adatok megadása',
      body:body

    }
  }else{
    fs.writeFileSync('foglalas.json',JSON.stringify(body))
    return{
      success: 'Sikeres jegyfoglalás!',
      title: 'Jegyfoglalás',
      webTitle: 'Adatok megadása'
    }
  }

  }
}
