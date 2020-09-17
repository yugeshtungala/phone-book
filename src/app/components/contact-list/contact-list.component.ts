import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/model/contact';
import { PhonebookService } from 'src/app/services/phonebook.service';

const $= window['jQuery']
@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contact:Contact[]
  pageNumber:number=1
  constructor(private phoneBookService:PhonebookService) { }

  ngOnInit(): void {
    this.phoneBookService.getAllContacts().subscribe(
      data => this.contact =data
    )
    $(window).scroll(()=>{
      let w = $(window);
      let d= $(document);
      if(w.height()+w.scrollTop() === d.height()){
        this.loadMore()
      }
    })
  }
  loadMore(){
   this.pageNumber++
   this.phoneBookService.getAllContacts(this.pageNumber).subscribe(
     data => this.contact =[...this.contact,...data]
   )
  }

}
