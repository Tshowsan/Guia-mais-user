import { Pipe, PipeTransform } from '@angular/core';
import { Guia } from '../interfaces/guia';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform( guias: Guia[], texto: string ): Guia[] {

    if ( texto.length === 0 ) { return guias; }

    texto = texto.toLocaleLowerCase();

    return guias.filter( guia => {
      return guia.nome.toLocaleLowerCase().includes(texto)
             || guia.email.toLocaleLowerCase().includes(texto)
                || guia.linguas.toLocaleLowerCase().includes(texto);
    });

  }

}