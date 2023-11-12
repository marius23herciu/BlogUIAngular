import { Sub } from './../models/sub';

import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SubscribersService } from '../services/subscribers.service';

@Component({
  selector: 'app-subscription-form',
  templateUrl: './subscription-form.component.html',
  styleUrls: ['./subscription-form.component.css']
})
export class SubscriptionFormComponent {

  isEmailAlreadyUsed = false
  isSubscribed = false
  sub: Sub ={
    name: '',
    email: ''
  }

  constructor(private subscribersService: SubscribersService){}

  onSubmit(subscriber: Sub){
    console.log(subscriber.name)
    console.log(subscriber.email)
   
    this.subscribersService.addSubscribers(subscriber).subscribe({
      next: (response) => {
        console.log(response)
        if(response){
          this.isEmailAlreadyUsed = false
          this.isSubscribed = true
        }
        else{
          this.isEmailAlreadyUsed = true
          this.isSubscribed = false
        }
     }})
    
 }

}
