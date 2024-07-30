import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {
  transform(value: string): string {
    switch(value) {
      case 'Azul': return 'favorite';
      case 'Fresco': return 'eco';
      case 'Macio': return 'sentiment_very_satisfied';
      case 'Meia-Cura': return 'star';
      case 'Maturado': return 'bolt';
    }
    return 'favorite';
  }

}
