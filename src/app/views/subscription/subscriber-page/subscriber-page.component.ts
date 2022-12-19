import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

interface ISubscriber {
  Topic: string;
  Category: string;
  Frequency: string;
}

@Component({
  selector: 'app-subscriber-page',
  templateUrl: './subscriber-page.component.html',
  styleUrls: ['./subscriber-page.component.scss']
})

export class SubscriberPageComponent implements OnInit {
  id: Params | undefined;
  constructor(private activatedRoute: ActivatedRoute) { }

  public subscriptions: ISubscriber[] = [
    {
      Topic: 'New',
      Category: 'Jan 1, 2021',
      Frequency: 'Yiorgos Avraamu'
    },
    {
      Topic: 'aaaaaaaa',
      Category: 'ssssssss',
      Frequency: 'aaaaa Avraamu'
    } 
  ]
  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    console.log(this.id)
  }
  editSubscription( topic: any, category: any){
      console.log( topic, category, "Edit")
  }
  deleteSubscription( topic: any, category: any){
    console.log( topic, category, "Delete")
  }
  addNewSubscription(){
    console.log("Add new component");
  }
}
