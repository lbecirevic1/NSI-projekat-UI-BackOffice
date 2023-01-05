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
  public users: ISubscription[] = [
    {
      Id: 1,
      Name: 'Mujo',
      Email: 'mujomujic@gmail.com',
      RegionId: 1,
      StreetId: 1,
      
    },
    {
      Id: 2,
      Name: 'Suljo',
      Email: 'suljosuljic@gmail.com',
      RegionId: 2,
      StreetId: 2
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
 public Users:any[] = []
 public Regions:any[] = []
 public Streets:any[] = []
 
  ngOnInit(): void {
    this.service
    .getSubscribers()
    .subscribe(data => {

      data.forEach(item =>
        this.Users.push(
        {
          Id: item.id,
          Name: item.name,
          Email: item.email,
          RegionId: item.regionID,
          StreetId: item.streetID
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
        this.Streets = data;
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
    this.addToast("Warning", "Confirmation mail has been sent!");
    var newSubscriber = {
      name: userForm.value.Name,
      streetID: userForm.value.Street,
      regionID: userForm.value.Region,
      email: userForm.value.Email
    }
    console.log(newSubscriber, "User to be added")
    this.service
    .createSubscriber(newSubscriber)
    .subscribe(data=>{
      this.addToast("Success", "User is created");
    })
    //obrisati ovo nakon sto se napravi dodavanje

    this.users.push({Id:this.users.length+1, Name:newSubscriber.name, Email:newSubscriber.email, RegionId:newSubscriber.regionID, StreetId:newSubscriber.regionID})

  }
  submitUserForm(){
    this.onSubmitUserForm(this.userForm);
  }
  addToast(title:string, text:string) {
    let props = {
      autohide: true,
      delay: 5000,
      position: ToasterPlacement.TopEnd,
      fade: true,
      closeButton: true,
      color: "warning",
      title: title,
      text: text
    };
    console.log(this.viewChildren);
    this.viewChildren.forEach((item)=> item.addToast(AppToastComponent, props, {}));
  }

  changeRegion(event: any) {

  }

  changeStreet(event: any) {

  }
}
