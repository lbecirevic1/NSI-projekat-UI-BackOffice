import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';
interface IEditSubscription {
  UserId: number;
  Topic: string;
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
  Topics: any = ['BHT', 'Centar', 'Novo Sarajevo', 'Neki Topic'];
  Categories: any = ['Kategorija1', 'Kategorija2', 'Kategorija3', 'Kategorija4'];
  SelectedCategories: any =[]

  constructor(public fb: FormBuilder) { }
  addNewSubscriptionForm = this.fb.group({
    topicControl: [''],
    categoryControl: []
  });

  changeTopic(e: any) {
    this.topicControl?.setValue(e.target.value.split(': ')[1], {
      onlySelf: true,
    });
    console.log("Topic changed", this.topicControl, e.target.value.split(': ')[1]);
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
    console.log("modal init")
  }

  onSubmit(): void {
    console.log(this.addNewSubscriptionForm);
    this.isSubmitted = true;
    
    console.log(JSON.stringify(this.addNewSubscriptionForm.value));
  }
  ngOnChanges() {
    console.log("Changes", this.editSubscriptionInfo, this.editSubscriptionInfo == {} as IEditSubscription)
    if (this.editSubscriptionInfo && (this.editSubscriptionInfo.Topic==null || this.editSubscriptionInfo.UserId==null)) {
          this.addNewSubscriptionForm.reset();
          console.log("Reseted form")
    }else if(this.editSubscriptionInfo && this.editSubscriptionInfo.Topic!=this.topicControl?.value){
        
        this.topicControl?.setValue(this.editSubscriptionInfo.Topic, {
          onlySelf: true,
        });
    }
  }
}
