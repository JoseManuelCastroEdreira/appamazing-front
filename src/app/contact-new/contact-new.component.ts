import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-contact-new',
  templateUrl: './contact-new.component.html',
  styleUrls: ['./contact-new.component.css']
})
export class ContactNewComponent implements OnInit {
  name:string;
  surname:string;
  surname2:string;
  phone:number;
  email:string;

  constructor(private router: Router, private contactsService: ContactsService) { }

  ngOnInit() {
  }
  newContact(){
    const contact = {
      name: this.name,
      surname: this.surname,
      surname2: this.surname2,
      phone: this.phone,
      email: this.email
    }
    this.contactsService.newContact(contact);
    this.navigateToHome();
  }
  cancelInsert(){
    this.navigateToHome();
  }
  navigateToHome(){
    this.router.navigate(['/contacts']);
  }
}
