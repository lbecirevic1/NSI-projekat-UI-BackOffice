import {
  Component,
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

  topic!: ITopic;
  categories!: [];
  informationForEditingSubscription!: IEditSubscription;
  editMode!: boolean;
  public modalUserFormVisible = false;
  public modalAddNewSubscriptionVisible = false
  constructor(private activatedRoute: ActivatedRoute, private service: UtilioService) {}

  positions = Object.values(ToasterPlacement);
  @ViewChildren(ToasterComponent) viewChildren!: QueryList < ToasterComponent > ;
  public subscriptions: ISubscriber[] = [{
      Topic: {
        Id: 1,
        Name: "TopicNeki"
      },
      CategoryNumber: 3,
      LastModified: new Date(2022, 12, 1).toLocaleDateString()
    },
    {
      Topic: {
        Id: 2,
        Name: "Centar"
      },
      CategoryNumber: 4,
      LastModified: new Date(2022, 11, 12).toLocaleDateString()
    }
  ]

  // regions = [{
  //     Id: 1,
  //     Name: "Bjelave"
  //   },
  //   {
  //     Id: 2,
  //     Name: "Otoka"
  //   },
  //   {
  //     Id: 3,
  //     Name: "Grbavica"
  //   }
  // ]

  // streets = [{
  //     Id: 1,
  //     Name: "Dr. Fetaha Becirbegovica"
  //   },
  //   {
  //     Id: 2,
  //     Name: "Travnicka"
  //   }
  // ]
  public Topics:any[] = [];
  //Prave vrijednosti 
  public Regions:any[] = [];
  public Streets:any[] = [];
  //CHANGE promijeniti u subscriptions
  public SubscriptionsForUser: any[] = [];
  ngOnInit(): void {
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
        this.Streets = dataStreet;
        this.service.getSubscriberById(this.id)
        .subscribe(data => {
          console.log(data, dataStreet, dataRegion)
          //TODO ovako treba biti
          // var regionName = "";
          // var streetName = "";
          // this.service.getRegionById(data.regionId).subscribe(dataRegion =>{
          //   regionName = dataRegion.name;
          //   this.service.getStreetById(data.streetId).subscribe(dataStreet =>{
          //     streetName = dataStreet.name;
          //     this.userForm = new FormGroup({
          //       Email: new FormControl(data.email),
          //       Name: new FormControl(data.firstName),
          //       Region: new FormControl(regionName),
          //       Street: new FormControl(streetName)
          //     });
          //   });
          // });
          
          this.userForm = new FormGroup({
            Email: new FormControl(data.email),
            Name: new FormControl(data.firstName),
            Region: new FormControl(data.regionId),
            Street: new FormControl(data.streetId)
          });
        });

      });
    });

  
   

    this.service.getSubscribtionsBySubscriberId(this.id)
    .subscribe(dataSubscriber=>{
      this.SubscriptionsForUser = dataSubscriber.subscriptionEntry;
      this.service.getProviders()
      .subscribe(data=>{
        this.Topics = data;
      });
    });
   
    
    console.log(this.id);
  }
  editSubscription(topicId: any) {
    this.editMode = true;
    this.informationForEditingSubscription = ({
      UserId: this.id,
      TopicId: topicId
    });
    this.toggleModalAddNewSubscription()

    console.log(this.informationForEditingSubscription, "Edit")
    // this.informationForEditingSubscription  = {} as IEditSubscription;
  }
  deleteSubscription(topic: any) {
    console.log(topic, "Delete")
    this.subscriptions = this.subscriptions.filter(item => item.Topic != topic);
  }
  addNewSubscription() {
    console.log("Add new component", this.informationForEditingSubscription);

    this.informationForEditingSubscription = {} as IEditSubscription;
    this.modalAddNewSubscriptionVisible = true;
    console.log(this.informationForEditingSubscription, "After")
    this.editMode = false;
  }
  onSubmitUserForm(userForm: FormGroup) {
    console.log("User form submited", userForm.value);
    //TODO Update info for user with Id 
  }
  submitUserForm() {
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

  onSubmitAddNewSubscriptionForm(addNewSubscriptionForm: FormGroup) {
    console.log("User form submited", addNewSubscriptionForm.value);
    this.addToast("Add new Subscription submitted", "success");
  }

  submitAddNewSubscriptionForm() {

    if (this.topic == null || this.topic.Name == "") {
      this.addToast("Please select Topic", "danger");
    } else if (this.categories == null || this.categories.length == 0) {
      this.addToast("Please select category", "danger");
    } else if (this.subscriptions.find(x => x.Topic.Id == this.topic.Id) != null) {
      this.addToast("Subscription for this Topic already exists", "danger");
    } else {
      var newSubscription = {
        Topic: {
          Id: this.topic.Id,
          Name: this.topic.Name
        },
        CategoryNumber: this.categories.length,
        LastModified: new Date().toLocaleDateString()
      }
      console.log("Subscription to be added", newSubscription)
      this.subscriptions.push(newSubscription)
      this.modalAddNewSubscriptionVisible = false;
      this.addToast("New subscription added", "success");
    }
  }
  editSubscriptionForm() {
    if (this.topic == null || this.topic.Name == "") {
      this.addToast("Please select Topic", "danger");
    } else if (this.categories == null || this.categories.length == 0) {
      this.addToast("Please select category", "danger");
    } else {
      console.log(this.topic, this.categories, "Unutar edita")
      var subscription = this.subscriptions.find(x => x.Topic.Id == this.topic.Id);
      //Ovdje imamo topic i kategorije, i treba spasiti ovo u bazi za subscriberA
      if (subscription != null) {
        subscription.CategoryNumber = this.categories.length;
        subscription.LastModified = new Date().toLocaleDateString();
        this.toggleModalAddNewSubscription();
      }

    }
  }
  addItem(event: any) {
    console.log(this.topic, "topic prije")
    console.log("event output", event, event.value.topicControl, this.Topics)
    if(event.value.topicControl && event.value.topicControl!=null && event.value.topicControl!=''){
      console.log('event.value.topicControl u ifu', event.value.topicControl)
      this.topic = this.Topics.find(item => item.Id.toString() == event.value.topicControl);
    }
    // this.topicId = event.value.topicControl;
    // // this.topicName = this.Topics.find(item => item.Id == event.value.topicControl).Name;
    // this.topic = this.Topics.find(item => item.Id == this.topicId);
    if(event.value.categoryControl){
      this.categories = event.value.categoryControl;
    }
    
    console.log("rezultati", this.topic, this.categories);
  }
  changeRegion(event: any) {

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
