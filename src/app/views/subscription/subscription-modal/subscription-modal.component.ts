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
  @Input() user!:any;
  isSubmitted = false;
  editMode = false;
  //Get from backend
  Topics: any = [];
  Categories: any = [];
  SelectedCategories: any =[]

  constructor(public fb: FormBuilder, private service: UtilioService ) { }
  addNewSubscriptionForm = this.fb.group({
    topicControl: [''],
    // categoryControl: []
  });

  changeTopic(e: any) {
    
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
    console.log("SDPOAKOISAFAOISFAOIFKAsoFOIA")
    console.log(this.addNewSubscriptionForm);
    this.isSubmitted = true;
    
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
        // console.log("setted value", this.topicControl, this.editSubscriptionInfo.TopicId, this.topics[0].Id==this.editSubscriptionInfo.TopicId)
    }
  }
}
