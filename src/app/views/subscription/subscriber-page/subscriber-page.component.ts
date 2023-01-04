import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { ToasterComponent, ToasterPlacement } from '@coreui/angular';
import { isWhileStatement } from 'typescript/lib/tsserverlibrary';
import { AppToastComponent } from '../../notifications/toasters/toast-simple/toast.component';

interface ISubscriber {
  Topic: string;
  CategoryNumber: number;
  LastModified: string;
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
  editMode!:boolean;
  public modalUserFormVisible = false;
  public modalAddNewSubscriptionVisible = false
  constructor(private activatedRoute: ActivatedRoute) { }

  positions = Object.values(ToasterPlacement);
  @ViewChildren(ToasterComponent) viewChildren!: QueryList<ToasterComponent>;
  public subscriptions: ISubscriber[] = [
    {
      Topic: 'BHT',
      CategoryNumber: 3,
      LastModified: new Date(2022, 12, 1).toLocaleDateString()
    },
    {
      Topic: 'Centar',
      CategoryNumber: 4,
      LastModified: new Date(2022, 11, 12).toLocaleDateString()
    } 
  ]

  regions = [
    {
      Id: 1,
      Name: "Bjelave"
    },
    {
      Id: 2,
      Name: "Otoka"
    },
    {
      Id: 3,
      Name: "Grbavica"
    }
  ]

  streets = [
    {
      Id: 1,
      Name: "Dr. Fetaha Becirbegovica"
    },
    {
      Id: 2,
      Name: "Travnicka"
    }
  ]

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.userForm = new FormGroup({
      Email: new FormControl("mujomujic@gmail.com"),
      Name: new FormControl("Mujo"),
      Region: new FormControl(1),
      Street: new FormControl(1)
    });
    console.log(this.id);
    console.log(this.positions)
  }
  editSubscription( topic: any){
    this.editMode = true;
    this.informationForEditingSubscription = ({UserId:this.id, Topic:topic});
    this.toggleModalAddNewSubscription()
    
    console.log( this.informationForEditingSubscription, "Edit")
    // this.informationForEditingSubscription  = {} as IEditSubscription;
  }
  deleteSubscription( topic: any){
    console.log( topic,  "Delete")
    this.subscriptions = this.subscriptions.filter(item=>item.Topic!=topic);
  }
  addNewSubscription(){
    console.log("Add new component", this.informationForEditingSubscription ); 
    
    this.informationForEditingSubscription = {} as IEditSubscription;
    this.modalAddNewSubscriptionVisible = true;
    console.log(this.informationForEditingSubscription , "After")
    this.editMode = false;
  }
  onSubmitUserForm(userForm:FormGroup){
    console.log("User form submited", userForm.value);
  }
  submitUserForm(){
    this.onSubmitUserForm(this.userForm);
    this.modalUserFormVisible = false;
    this.addToast("User form submitted", "success");
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
  addToast(title: string, color:string) {
      let props = {
        autohide: true,
        delay: 5000,
        position: ToasterPlacement.TopEnd,
        fade: true,
        closeButton: true,
        color: color,
        title: title
      };
      console.log(this.viewChildren);
      this.viewChildren.forEach((item)=> item.addToast(AppToastComponent, props, {}));
  }
  onSubmitAddNewSubscriptionForm(addNewSubscriptionForm:FormGroup){
    console.log("User form submited", addNewSubscriptionForm.value);
    this.addToast("Add new Subscription submitted", "success");
  }
  submitAddNewSubscriptionForm(){
    if(this.topic == null || this.topic == ""){
      this.addToast("Please select Topic", "danger");
    }
    else if(this.categories == null || this.categories.length == 0){
      this.addToast("Please select category", "danger");
    }else if(this.subscriptions.find(x => x.Topic == this.topic) != null){
      this.addToast("Subscription for this Topic already exists", "danger");
    }else{
      this.subscriptions.push({Topic:this.topic, CategoryNumber:this.categories.length, LastModified:new Date().toLocaleDateString()})
      this.modalAddNewSubscriptionVisible = false;
      this.addToast("New subscription added", "success");
    }
  }
  editSubscriptionForm(){
    if(this.topic == null || this.topic == ""){
      this.addToast("Please select Topic", "danger");
    }
    else if(this.categories == null || this.categories.length == 0){
      this.addToast("Please select category", "danger");
    }else {
      console.log(this.topic, this.categories, "Unutar edita")
      var subscription = this.subscriptions.find(x => x.Topic == this.topic);
      if(subscription != null){
        subscription.CategoryNumber = this.categories.length;
        subscription.LastModified = new Date().toLocaleDateString();
        this.toggleModalAddNewSubscription();
      }

    }
  }
  addItem(event: any) {
    console.log("event output", event)
    this.topic = event.value.topicControl
    this.categories = event.value.categoryControl;
    console.log("rezultati", this.topic, this.categories);
  }
  changeRegion(event: any) {

  }
  changeStreet(event: any) {

  }
}
