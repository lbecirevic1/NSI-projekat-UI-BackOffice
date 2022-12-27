import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-subscription-modal',
  templateUrl: './subscription-modal.component.html',
  styleUrls: ['./subscription-modal.component.scss']
})
export class SubscriptionModalComponent implements OnInit {

  // addNewSubscriptionForm!:FormGroup;
  @Output() newItemEvent = new EventEmitter<FormGroup>();
  isSubmitted = false;
  Topics: any = ['BHT', 'Centar', 'Tennessee', 'Michigan'];
  Categories: any = ['prva', 'Druga', 'Treca', 'Cetvrta'];
  selectedCategories: any[] = [] ;
  constructor(public fb: FormBuilder) { }
  categoriesSelected = []
  addNewSubscriptionForm = this.fb.group({
    topicControl: [''],
    categoryControl: []
  });

  changeTopic(e: any) {
    this.topicControl?.setValue(e.target.value, {
      onlySelf: true,
    });
    console.log("Topic changed", this.topicControl);

    this.newItemEvent.emit(this.addNewSubscriptionForm);
  }
  changeCategory(e: any) {
    this.categoryControl?.setValue(e.target.value, {
      onlySelf: true,
    });
    console.log("Category changed", this.categoryControl);
  }
  get topicControl() {
    return this.addNewSubscriptionForm.get('topicControl');
  }
  get categoryControl() {
    return this.addNewSubscriptionForm.get('categoryControl');
  }

  ngOnInit(): void {

    
    // this.addNewSubscriptionForm = new FormGroup({
    //   Category: new FormControl("Kategorija"),
    //   Topic: new FormControl("Topic neki")
    // });
  }
  // onSubmitAddNewSubscriptionForm(addNewSubscriptionForm:FormGroup){
  //   console.log("User form submited", addNewSubscriptionForm.value);
  // }
  onSubmit(): void {
    console.log(this.addNewSubscriptionForm);
    this.isSubmitted = true;
    
      console.log(JSON.stringify(this.addNewSubscriptionForm.value));
  }
}
