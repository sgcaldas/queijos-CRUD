import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {
  transform(value: string): string {
    switch(value) {
      case 'Fresco': return 'eco';
      case 'Macio': return 'sentiment_very_satisfied';
      case 'Meia-Cura': return 'favorite';
      case 'Maturado': return 'bolt';
    }
    return 'favorite';
  }

}
