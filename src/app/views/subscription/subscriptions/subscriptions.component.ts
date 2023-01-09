import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterComponent, ToasterPlacement } from '@coreui/angular';
import { UtilioService } from 'src/app/service/utilio.service';
import { AppToastComponent } from '../../notifications/toasters/toast-simple/toast.component';
interface ISubscription {
  Id:number;
  Email: string;
  Name: string;
  RegionId: number;
  StreetId: number;
}

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss']
})


export class SubscriptionsComponent implements OnInit {

  constructor(private router: Router, private service: UtilioService ) { }

  public newUserModalVisible = false;
  userForm!: FormGroup;
  positions = Object.values(ToasterPlacement);
  @ViewChildren(ToasterComponent) viewChildren!: QueryList<ToasterComponent>;
  public users: ISubscription[] = []
 public Users:any[] = []
 public Regions:any[] = []
 public AllStreets:any[] = []
 public Streets:any[] = []
 
  ngOnInit(): void {
    this.service
    .getSubscribers()
    .subscribe(data => {
      console.log("Data from get subscribers",data)
      data.forEach(item =>
        this.Users.push(
        {
          Id: item.id,
          Name: item.firstName,
          Email: item.email,
          RegionId: item.regionID,
          StreetId: item.streetID,
          DateModified: item.dateModified
        }
      ));

    });
    this.userForm = new FormGroup({
      Email: new FormControl(""),
      Name: new FormControl(""),
      Region: new FormControl(""),
      Street: new FormControl("")
    });

    this.service
      .getRegions()
      .subscribe(data => {
        this.Regions = data;
      });

    this.service
      .getStreets()
      .subscribe(data => {
        this.AllStreets = data;
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
    this.newUserModalVisible = false;
    var newSubscriber = {
      firstName: userForm.value.Name,
      streetID: userForm.value.Street,
      regionID: userForm.value.Region,
      email: userForm.value.Email,
      mobilePhone: "",
      lastName: ""
    }
    console.log(newSubscriber, "User to be added")
    this.service
    .createSubscriber(newSubscriber)
    .subscribe(data=>{
      this.addToast("info", "Confirmation mail has been sent!");
    })

  }
  submitUserForm(){
    this.onSubmitUserForm(this.userForm);
  }
  addToast(type:string, text:string) {
    let props = {
      autohide: true,
      delay: 5000,
      position: ToasterPlacement.TopEnd,
      fade: true,
      closeButton: true,
      color: type,
      title: text,
      text: ''
    };
    console.log(this.viewChildren);
    this.viewChildren.forEach((item)=> item.addToast(AppToastComponent, props, {}));
  }

  changeRegion(event: any) {
    this.Streets = this.AllStreets.filter(x => x.regionId == this.userForm.value.Region);
  }

  changeStreet(event: any) {

  }
}
