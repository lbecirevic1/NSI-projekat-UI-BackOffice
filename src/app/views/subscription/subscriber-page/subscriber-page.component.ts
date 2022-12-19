import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { ToasterComponent, ToasterPlacement } from '@coreui/angular';
import { AppToastComponent } from '../../notifications/toasters/toast-simple/toast.component';

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
  userForm!: FormGroup;

  public liveDemoVisible = false;
  constructor(private activatedRoute: ActivatedRoute) { }

  positions = Object.values(ToasterPlacement);
  @ViewChildren(ToasterComponent) viewChildren!: QueryList<ToasterComponent>;
  public subscriptions: ISubscriber[] = [
    {
      Topic: 'Bh Telecom',
      Category: 'Javne nabavke',
      Frequency: '1 dnevno'
    },
    {
      Topic: 'Opcina Centar',
      Category: 'Tenderi',
      Frequency: '2 dnevno'
    } 
  ]
  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.userForm = new FormGroup({
      Email: new FormControl("mujomujic@gmail.com"),
      FirstName: new FormControl("Mujo"),
      LastName: new FormControl("Mujic")
    });
    console.log(this.id);
    console.log(this.positions)
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
  onSubmitUserForm(userForm:FormGroup){
    console.log("User form submited", userForm.value);
  }
  submitUserForm(){
    this.onSubmitUserForm(this.userForm);
    this.liveDemoVisible = false;
    this.addToast();
  }

  toggleLiveDemo() {
    this.liveDemoVisible = !this.liveDemoVisible;
  }

  handleLiveDemoChange(event: boolean) {
    this.liveDemoVisible = event;
  }
  
  addToast() {
      let props = {
        autohide: true,
        delay: 5000,
        position: ToasterPlacement.TopEnd,
        fade: true,
        closeButton: true,
        color: "success",
        title: "asdadasdsa"
      };
      console.log(this.viewChildren);
      this.viewChildren.forEach((item)=> item.addToast(AppToastComponent, props, {}));
      console.log("sadsa")
  }
}
