import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
interface ISubscription {
  Id:number;
  Email: string;
  FirstName: string;
  LastName: string;
}

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss']
})


export class SubscriptionsComponent implements OnInit {

  constructor(private router: Router) { }

  public users: ISubscription[] = [
    {
      Id: 1,
      FirstName: 'Mujo',
      LastName: 'Mujic',
      Email: 'mujomujic@gmail.com'
    },
    {
      Id: 2,
      FirstName: 'Suljo',
      LastName: 'Suljic',
      Email: 'suljosuljic@gmail.com'
    } 
  ]

  ngOnInit(): void {
    
  }

  openPageForSubscriber(id: number){
    console.log(id)
    this.router.navigate(['subscription/subscriber/' + id])
  }
}
