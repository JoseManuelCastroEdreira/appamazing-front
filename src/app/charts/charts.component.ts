import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  initialLetter = [];

  constructor(private contactsService: ContactsService) { }

  ngOnInit() {
    this.contactsService.getContacts().subscribe(data =>{
      this.initialLetter = this.calculateInitialLettersData(data)
    })
  }

  calculateInitialLettersData(contacts: any[]): any{
    return contacts.reduce((result, contact)=>{
      const initial = contact.surname.charAt(0).toUpperCase()
      if(result.find(item => item.name === initial)){
      result.find(item => item.name === initial).value++
    }else{
      result.push({name: initial, value:1})
    }
    return result;
  }, [])
  }
}

