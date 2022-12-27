import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterComponent, ToasterPlacement } from '@coreui/angular';
import { AppToastComponent } from '../../notifications/toasters/toast-simple/toast.component';
interface ISubscription {
  Id:number;
  Email: string;
  FirstName: string;
  LastName: string;
}

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss']
})


export class SubscriptionsComponent implements OnInit {

  constructor(private router: Router) { }

  public newUserModalVisible = false;
  userForm!: FormGroup;
  positions = Object.values(ToasterPlacement);
  @ViewChildren(ToasterComponent) viewChildren!: QueryList<ToasterComponent>;
  public users: ISubscription[] = [
    {
      Id: 1,
      FirstName: 'Mujo',
      LastName: 'Mujic',
      Email: 'mujomujic@gmail.com'
    },
    {
      Id: 2,
      FirstName: 'Suljo',
      LastName: 'Suljic',
      Email: 'suljosuljic@gmail.com'
    } 
  ]

  ngOnInit(): void {
    this.userForm = new FormGroup({
      Email: new FormControl("mujomujic@gmail.com"),
      FirstName: new FormControl("Mujo"),
      LastName: new FormControl("Mujic")
    });
  }

  openPageForSubscriber(id: number){
    console.log(id)
    this.router.navigate(['subscription/subscriber/' + id])
  }

  openAddUserModal(){
    this.newUserModalVisible = false;
  }

  toggleNewUserModal() {
    this.newUserModalVisible = !this.newUserModalVisible;
  }

  handleNewUserModalChange(event: boolean) {
    this.newUserModalVisible = event;
  }
  
  onSubmitUserForm(userForm:FormGroup){
    console.log("User form submited", userForm.value);
  }
  submitUserForm(){
    this.onSubmitUserForm(this.userForm);
    this.newUserModalVisible = false;
    this.addToast("Confirmation mail has been sent");
  }
  addToast(title:string) {
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
}
}
