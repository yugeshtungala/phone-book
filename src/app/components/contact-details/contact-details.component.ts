import { identifierModuleUrl } from '@angular/compiler';
import { Text } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { from } from 'rxjs';
import { Contact } from 'src/app/model/contact';
import {PhonebookService} from 'src/app/services/phonebook.service'
import swal from 'sweetalert';
@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {
   contact:Contact = new Contact
  constructor(private PhonebookService:PhonebookService,
    private router:Router,private activcatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activcatedRoute.params.subscribe(params=>{
      this.PhonebookService.getContactDetails(params['id']).subscribe(
        data => this.contact=data)
    })
  }
  deleteContact(){
    swal({
      title:'you are about to delete this contact',
      text:'Are you sure ?',
      icon:'warning',
      buttons:[
       {
         text:'i am sure',
         visible:true,
         value:true
       },
       {
         text:'Cancel',
         visible:true,
         value:false
       }
      ]
    }).then(result =>{
      if(result === true){
        this.PhonebookService.deleteContact(this.contact.id).subscribe(()=>{
          this.router.navigate(['/contact-list'])
          })
      }
    })
  
  }

}
