import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from '../model/contact';

const baseUrl='http://localhost:3000/contacts/';
@Injectable({
  providedIn: 'root'
})
export class PhonebookService {

  constructor(private httpClient:HttpClient) { }
  
  getContactDetails(id:number):Observable<Contact>{
     return this.httpClient.get<Contact>(baseUrl + id)
  }
  addNewContact(contact:Contact):Observable<Contact>{
    return this.httpClient.post<Contact>(baseUrl,contact)
  }
  updateContact(contact:Contact):Observable<Contact>{
    return this.httpClient.put<Contact>(baseUrl + contact.id,contact)
  }
  deleteContact(id:number):Observable<any>{
     return this.httpClient.delete(baseUrl+id)
  }
  getAllContacts(pageNumber:number=1):Observable<Contact[]>{
    let params={
      '_page':''+pageNumber
    }
    return this.httpClient.get<Contact[]>(baseUrl,{params})
  }
}
