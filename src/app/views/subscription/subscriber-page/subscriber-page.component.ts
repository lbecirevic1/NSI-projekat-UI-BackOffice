import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { ToasterComponent, ToasterPlacement } from '@coreui/angular';
import { AppToastComponent } from '../../notifications/toasters/toast-simple/toast.component';

interface ISubscriber {
  Topic: string;
  CategoryNumber: number;
  LastModified: Date;
}

interface IEditSubscription {
  UserId: number;
  Topic: string;
}

@Component({
  selector: 'app-subscriber-page',
  templateUrl: './subscriber-page.component.html',
  styleUrls: ['./subscriber-page.component.scss']
})

export class SubscriberPageComponent implements OnInit {
  id!: number;
  userForm!: FormGroup;

  topic!: string;
  categories!:[];
  informationForEditingSubscription!: IEditSubscription;

  public modalUserFormVisible = false;
  public modalAddNewSubscriptionVisible = false
  constructor(private activatedRoute: ActivatedRoute) { }

  positions = Object.values(ToasterPlacement);
  @ViewChildren(ToasterComponent) viewChildren!: QueryList<ToasterComponent>;
  public subscriptions: ISubscriber[] = [
    {
      Topic: 'Bh Telecom',
      CategoryNumber: 3,
      LastModified: new Date(2022, 12, 1)
    },
    {
      Topic: 'Opcina Centar',
      CategoryNumber: 4,
      LastModified: new Date(2022, 11, 12)
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
  editSubscription( topic: any){
    this.informationForEditingSubscription = ({UserId:this.id, Topic:topic});
    this.toggleModalAddNewSubscription()
    
    console.log( topic, "Edit")
  }
  deleteSubscription( topic: any){
    console.log( topic,  "Delete")
    this.subscriptions = this.subscriptions.filter(item=>item.Topic!=topic);
  }
  addNewSubscription(){
    console.log("Add new component"); 
    this.modalAddNewSubscriptionVisible = true;
  }
  onSubmitUserForm(userForm:FormGroup){
    console.log("User form submited", userForm.value);
  }
  submitUserForm(){
    this.onSubmitUserForm(this.userForm);
    this.modalUserFormVisible = false;
    this.addToast("User form submitted");
  }

  togglemodalUserForm() {
    this.modalUserFormVisible = !this.modalUserFormVisible;
  }

  handlemodalUserFormChange(event: boolean) {
    this.modalUserFormVisible = event;
  }
  toggleModalAddNewSubscription() {
    this.modalAddNewSubscriptionVisible = !this.modalAddNewSubscriptionVisible;
  }

  handleModalAddNewSubscriptionChange(event: boolean) {
    this.modalAddNewSubscriptionVisible = event;
  }
  addToast(title: string) {
      let props = {
        autohide: true,
        delay: 5000,
        position: ToasterPlacement.TopEnd,
        fade: true,
        closeButton: true,
        color: "success",
        title: title
      };
      console.log(this.viewChildren);
      this.viewChildren.forEach((item)=> item.addToast(AppToastComponent, props, {}));
      console.log("sadsa")
  }
  onSubmitAddNewSubscriptionForm(addNewSubscriptionForm:FormGroup){
    console.log("User form submited", addNewSubscriptionForm.value);
    this.addToast("Add new Subscription submitted");
  }
  submitAddNewSubscriptionForm(){
    this.addToast("Add new Subscription submitted");
    this.subscriptions.push({Topic:this.topic, CategoryNumber:this.categories.length, LastModified:new Date()})
    this.modalAddNewSubscriptionVisible = false;
  }
  addItem(event: any) {
    console.log("event output", event)
    this.topic = event.value.topicControl
    this.categories = event.value.categoryControl;
    console.log("rezultati", this.topic, this.categories);
  }
}
