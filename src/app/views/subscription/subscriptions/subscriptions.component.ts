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
      FirstName: 'New',
      LastName: 'Jan 1, 2021',
      Email: 'Yiorgos Avraamu'
    },
    {
      Id: 2,
      FirstName: 'aaaaaaaa',
      LastName: 'ssssssss',
      Email: 'aaaaa Avraamu'
    } 
  ]

  ngOnInit(): void {
    
  }

  openPageForSubscriber(id: number){
    console.log(id)
    this.router.navigate(['subscription/subscriber/' + id])
  }
}
