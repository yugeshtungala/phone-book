import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from '../model/contact';

@Pipe({
  name: 'fullname'
})
export class FullnamePipe implements PipeTransform {

  transform(contact:Contact): string {
    if(!contact){
      return ''
    }
    let name=contact.gender==='Male' ? ' Mr ':' Ms '
    return name + ' '+ contact.firstname + ' ' + contact.lastname}

}
