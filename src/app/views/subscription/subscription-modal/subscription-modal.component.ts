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
  Topics: any = ['BHT', 'Centar', 'Novo Sarajevo', 'Neki Topic'];
  Categories: any = ['Kategorija1', 'Kategorija2', 'Kategorija3', 'Kategorija4'];

  constructor(public fb: FormBuilder) { }
  addNewSubscriptionForm = this.fb.group({
    topicControl: [''],
    categoryControl: []
  });

  changeTopic(e: any) {
    this.topicControl?.setValue(e.target.value, {
      onlySelf: true,
    });
    console.log("Topic changed", this.topicControl, e.target.value);

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
    console.log(this.editSubscriptionInfo);
    if(this.editSubscriptionInfo!=null && this.editSubscriptionInfo.UserId!=null && this.editSubscriptionInfo.Topic!=null){
      this.editMode = true;
      this.topicControl?.setValue('', {
        onlySelf: true,
      });
      this.categoryControl?.setValue(null, {
        onlySelf: true,
      });
    }
  }

  onSubmit(): void {
    console.log(this.addNewSubscriptionForm);
    this.isSubmitted = true;
    
    console.log(JSON.stringify(this.addNewSubscriptionForm.value));
  }
}
