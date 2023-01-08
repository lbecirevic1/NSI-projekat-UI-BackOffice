import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';
import { Console } from 'console';
import { UtilioService } from 'src/app/service/utilio.service';
interface IEditSubscription {
  UserId: number;
  TopicId: number;
}
interface ITopic{
  Id: number;
  Name:string;
}
interface ICategory{
  Id: number;
  Name:string;
}
@Component({
  selector: 'app-subscription-modal',
  templateUrl: './subscription-modal.component.html',
  styleUrls: ['./subscription-modal.component.scss']
})

export class SubscriptionModalComponent implements OnInit {

  // addNewSubscriptionForm!:FormGroup;
  @Output() newItemEvent = new EventEmitter<FormGroup>();
  @Input() editSubscriptionInfo!:IEditSubscription;
  isSubmitted = false;
  editMode = false;
  //Get from backend
  Topics: any = [];
  Categories: any = [];

  
  topics  = [
    {
      Id: 1,
      Name: "TopicNeki"
    },
    {
      Id: 2,
      Name: "Centar"
    },
    {
      Id: 3,
      Name: "BHT"
    }
  ]
  categories: ICategory[] = [
    {
      Id:1,
      Name:"Kategorija1"
    },
    {
      Id:2,
      Name:"Kategorija2"
    }
  ]
  SelectedCategories: any =[]

  constructor(public fb: FormBuilder, private service: UtilioService ) { }
  addNewSubscriptionForm = this.fb.group({
    topicControl: [''],
    categoryControl: []
  });

  changeTopic(e: any) {
    console.log(e.target.value)
    // this.topicControl?.setValue(e.target.value.split(': ')[1], {
    //   onlySelf: true,
    // });
    console.log("Topic changed", this.topicControl, e.target.value);
    console.log(this.editSubscriptionInfo, "Edit info")
    //Get from backend categories that are selected
    //this.SelectedCategories = 
    //Get from backend categories that are not selected
    //this.Categories
    
    this.newItemEvent.emit(this.addNewSubscriptionForm);
  }
  changeCategory(e: any) {
    console.log("Categoris changed", this.categoryControl);
    this.newItemEvent.emit(this.addNewSubscriptionForm);
  }
  get topicControl() {
    return this.addNewSubscriptionForm.get('topicControl');
  }
  get categoryControl() {
    return this.addNewSubscriptionForm.get('categoryControl');
  }
  ngOnInit(): void {
    
    this.service.getProviders()
    .subscribe(data => {
      console.log(data)
      //TODO ovako treba biti
      this.Topics = data;
    });
    console.log("modal init")
  }

  onSubmit(): void {
    console.log(this.addNewSubscriptionForm);
    this.isSubmitted = true;
    
    console.log(JSON.stringify(this.addNewSubscriptionForm.value));
    //Dodati subscription is addNewSubscriptionForm
    // var addSubscription = {
    //   // {
    //   //   "id": 0,
    //   //   "name": "string",
    //   //   "identifier": "string",
    //   //   "notificationInterval": 0,
    //   //   "subscriptionEntryID": 0,
    //   //   "subscriberID": 0,
    //   //   "subscriptionEntry": {
    //   //     "id": 0,
    //   //     "identifier": "string",
    //   //     "isHighPriority": true,
    //   //     "deliveryType": "string",
    //   //     "providerID": 0,
    //   //     "regionID": 0,
    //   //     "streetID": 0
    //   //   }
    //   // }
    // }
    // this.service.addSubscriptionForUser(addSubscription)
    // .subscribe(data => {
    //   console.log(data)
    // });
  }
  ngOnChanges() {
    console.log(this.topicControl, "Topic control")
    console.log("Changes", this.editSubscriptionInfo, this.editSubscriptionInfo == {} as IEditSubscription)
    
    if (this.editSubscriptionInfo && (this.editSubscriptionInfo.TopicId==null || this.editSubscriptionInfo.UserId==null)) {
          this.addNewSubscriptionForm.reset();
          console.log("Reseted form")
    }else if(this.editSubscriptionInfo && this.editSubscriptionInfo.TopicId.toString()!=this.topicControl?.value ){
        
        this.topicControl?.setValue(this.editSubscriptionInfo.TopicId.toString(), {
          onlySelf: true,
        });
        console.log("setted value", this.topicControl, this.editSubscriptionInfo.TopicId, this.topics[0].Id==this.editSubscriptionInfo.TopicId)
    }
  }
}
