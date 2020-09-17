import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from 'src/app/model/contact';
import { PhonebookService } from 'src/app/services/phonebook.service';

@Component({
  selector: 'app-update-contact',
  templateUrl: './update-contact.component.html',
  styleUrls: ['./update-contact.component.css']
})
export class UpdateContactComponent implements OnInit {
  contactForm:FormGroup;
  constructor(private activatedRoute:ActivatedRoute,
    private formBuilder:FormBuilder,private phoneBookService:PhonebookService,private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
       this.phoneBookService.getContactDetails(params['id']).subscribe(data=>
        {this.contactForm.setValue({...data})})
    })

    this.contactForm = this.formBuilder.group({
      id:[],
      firstname:['',[Validators.required, Validators.minLength(3)]],
      lastname:[],
      gender:[],
      email:['',[Validators.email, Validators.required]], 
      phone:['', [Validators.required, Validators.pattern(/\d{10,12}/)]],
      dob:[],
      city:[],
      state:[],
      country:[],
      picture:[]
    })
  }
  saveChanges(){
    this.phoneBookService.updateContact(this.contactForm.value).subscribe(
      contact => this.router.navigate(['contact-details',contact.id])
    )
  }
}
