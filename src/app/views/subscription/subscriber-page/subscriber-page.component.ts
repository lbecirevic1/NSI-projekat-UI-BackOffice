import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren
} from '@angular/core';
import {
  FormControl,
  FormGroup
} from '@angular/forms';
import {
  ActivatedRoute,
  Params
} from '@angular/router';
import {
  ToasterComponent,
  ToasterPlacement
} from '@coreui/angular';
import {
  isWhileStatement
} from 'typescript/lib/tsserverlibrary';
import {
  AppToastComponent
} from '../../notifications/toasters/toast-simple/toast.component';
import {
  UtilioService
} from "../../../service/utilio.service";
interface ITopic {
  Id: number;
  Name: string;
}
interface ISubscriber {
  Topic: ITopic;
  CategoryNumber: number;
  LastModified: string;
}

interface IEditSubscription {
  UserId: number;
  TopicId: number;
}

@Component({
  selector: 'app-subscriber-page',
  templateUrl: './subscriber-page.component.html',
  styleUrls: ['./subscriber-page.component.scss']
})

export class SubscriberPageComponent implements OnInit {
  id!: number;
  userForm!: FormGroup;
  user: any;
  topic!: ITopic;
  categories!: [];
  informationForEditingSubscription!: IEditSubscription;
  editMode!: boolean;
  public modalUserFormVisible = false;
  public modalAddNewSubscriptionVisible = false
  constructor(private activatedRoute: ActivatedRoute, private service: UtilioService) {}

  positions = Object.values(ToasterPlacement);
  @ViewChildren(ToasterComponent) viewChildren!: QueryList < ToasterComponent > ;
  @ViewChildren("input") inputs!: QueryList<ElementRef>;
  public regionId:number = 0;
  public streetId:number = 0;
  public Topics:any[] = [];
  //Prave vrijednosti 
  public Regions:any[] = [];
  public AllStreets:any[] = [];
  public Streets:any[] = [];
  public Subscriptions:any[] = [];
  ngOnInit(): void {
    this.setUserForm({
            Email: '',
            Name: '',
            Region: null,
            Street: null
          })
    this.id = this.activatedRoute.snapshot.params['id'];
    //ODKOMENTARISATI--------------------------------------------------
    this.service
    .getRegions()
    .subscribe(dataRegion => {
      this.Regions = dataRegion;
      console.log(dataRegion, "data region")
      this.service
      .getStreets()
      .subscribe(dataStreet => {
        this.AllStreets = dataStreet;
        this.Streets = this.AllStreets;
        this.service.getSubscriberById(this.id)
        .subscribe(data => {   
          console.log(data);
          this.user = data;       
          this.Streets = this.AllStreets.filter(x => x.regionId == data.regionID);
          this.regionId = data.regionID;
          this.streetId = data.streetID;
          this.setUserForm({
            Email: data.email,
            Name: data.firstName,
            Region: data.regionId,
            Street: data.streetId
          });
          // this.inputs.forEach(x => {
          //   (x as HTMLInputElement).dispatchEvent(
          //     new Event("change")
          //   )
          // });
        });

      });
    });

  
   this.getSubscriptions();  
   
    
    console.log(this.id);
  }

  getSubscriptions(){
    this.service.getSubscribtionsBySubscriberId(this.id)
    .subscribe(dataSubscriber=>{
      console.log(dataSubscriber);
      this.Subscriptions = dataSubscriber;
      this.service.getProviders()
      .subscribe(data=>{
        this.Topics = data;
      });
    });
  }

  setUserForm(user:any){
    this.userForm = new FormGroup({
      Email: new FormControl(user.Email),
      Name: new FormControl(user.Name),
      Region: new FormControl(user.Region),
      Street: new FormControl(user.Street)
    });
  }

  editSubscription(topicId: any) {
    this.editMode = true;
    this.informationForEditingSubscription = ({
      UserId: this.id,
      TopicId: topicId
    });
    this.toggleModalAddNewSubscription()
  }
  deleteSubscription(topic: any) {
    console.log(topic, "Delete")
    this.service.deleteSubscription(topic).subscribe(data => {
      this.addToast("Subscription deleted", "danger")
      this.getSubscriptions()
    });
  }
  addNewSubscription() {
    console.log("Add new component", this.informationForEditingSubscription);

    this.informationForEditingSubscription = {} as IEditSubscription;
    this.modalAddNewSubscriptionVisible = true;
    console.log(this.informationForEditingSubscription, "After")
    this.editMode = false;
  }
  onSubmitUserForm(userForm: FormGroup) {
    let val = {
      email: this.userForm.value.Email,
      firstName: this.userForm.value.Name,
      regionID: userForm.value.Region == null ? this.user.regionID : userForm.value.Region,
      streetID: userForm.value.Street == null ? this.user.streetID : userForm.value.Street,
      id: this.user.id,
      lastName: "",
      mobilePhone: ""
    };
    console.log("User form submited", val);
    this.service.updateSubscriber(val).subscribe(x => {
      this.addToast("User updated", "success");
    })
    //TODO Update info for user with Id 
  }
  submitUserForm() {
    this.onSubmitUserForm(this.userForm);
    this.modalUserFormVisible = false;
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

  onSubmitAddNewSubscriptionForm(addNewSubscriptionForm: FormGroup) {
    console.log("User form submited", addNewSubscriptionForm.value);
    this.addToast("Add new Subscription submitted", "success");
  }

  submitAddNewSubscriptionForm() {

    if (this.topic == null || this.topic.Name == "") {
      this.addToast("Please select Topic", "danger");
    } 
    else {
      this.addToast("New subscription added", "success");

      var entrySubscription = {
        providerID: this.topic,
        regionID: this.user.regionID,
        streetID: this.user.streetID,
        isHighPriority: true,
        deliveryType: 'Email'
      }
      console.log(entrySubscription);
      this.modalAddNewSubscriptionVisible = false;
      this.service.addSubscriptionEntry(entrySubscription)
      .subscribe(data => {
        console.log(data);
        this.service.addSubscriptionForUser({
          name: this.Topics.find(x => x.id == this.topic).name,
          subscriberID: this.user.id,
          subscriptionEntryID: data,
          notificationInterval: 0
        })
        .subscribe(data => {
          console.log(data)
          this.getSubscriptions();
        });
      })
    }
  }
  editSubscriptionForm() {
    if (this.topic == null || this.topic.Name == "") {
      this.addToast("Please select Topic", "danger");
    } else if (this.categories == null || this.categories.length == 0) {
      this.addToast("Please select category", "danger");
    } else {
      console.log(this.topic, this.categories, "Unutar edita")
      // var subscription = this.subscriptions.find(x => x.Topic.Id == this.topic.Id);
      // //Ovdje imamo topic i kategorije, i treba spasiti ovo u bazi za subscriberA
      // if (subscription != null) {
      //   subscription.CategoryNumber = this.categories.length;
      //   subscription.LastModified = new Date().toLocaleDateString();
      //   this.toggleModalAddNewSubscription();
      // }

    }
  }
  addItem(event: any) {
    console.log(this.topic, "topic prije")
    console.log("event output", event, event.value.topicControl, this.Topics)
    if(event.value.topicControl && event.value.topicControl!=null && event.value.topicControl!=''){
      console.log('event.value.topicControl u ifu', event.value.topicControl)
      // this.topic = this.Topics.find(item => item.Id.toString() == event.value.topicControl);
    }
    // this.topicId = event.value.topicControl;
    // // this.topicName = this.Topics.find(item => item.Id == event.value.topicControl).Name;
    // this.topic = this.Topics.find(item => item.Id == this.topicId);
    if(event.value.categoryControl){
      // this.categories = event.value.categoryControl;
    }
    this.topic = event.value.topicControl
    
    console.log("rezultati", this.topic, this.categories);
  }
  changeRegion(event: any) {
    this.Streets = this.AllStreets.filter(x => x.regionId == this.userForm.value.Region);
  }
  changeStreet(event: any) {

  }
  addToast(title: string, color: string) {
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
    this.viewChildren.forEach((item) => item.addToast(AppToastComponent, props, {}));
  }
}
