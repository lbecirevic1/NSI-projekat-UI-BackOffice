import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Role } from './role.enum';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss'],
})
export class UserSettingsComponent implements OnInit, OnDestroy {
  private sub: any;
  user: any;

  updatedSettings = [
    {
      provider: 'BHTelecom',
      regions: [
        {
          regionName: 'Sarajevo',
          role: Role.Admin,
        },
        {
          regionName: 'Tuzla',
          role: Role.None,
        },
      ],
    },
    {
      provider: 'EPBIH',
      regions: [
        {
          regionName: 'Sarajevo',
          role: Role.Editor,
        },
        {
          regionName: 'Ilidza',
          role: Role.None,
        },
        {
          regionName: 'Vogosca',
          role: Role.Admin,
        },
        {
          regionName: 'Novi Grad',
          role: Role.Reader,
        },
      ],
    },
    {
      provider: 'Toplane',
      regions: [
        {
          regionName: 'Dolac Malta',
          role: Role.None,
        },
        {
          regionName: 'Dobrinja',
          role: Role.None,
        },
        {
          regionName: 'Cengic Vila',
          role: Role.Reader,
        },
      ],
    },
  ];

  updatedSettingsForm: any;
  roles = Object.values(Role);

  constructor(private route: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.sub = this.route.params.subscribe((params) => {
      const id = +params['id'];

      this.setUser(id);
    });

    this.updatedSettingsForm = this.fb.group({
      settings: this.fb.array([]),
    });

    this.buildForm();
  }

  setUser(id: number): void {
    this.user = {
      id,
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@email.com',
    };
  }

  buildForm() {
    this.updatedSettings.map((setting) => {
      const regionsArray: FormArray = this.fb.array([]);

      setting.regions?.map((region) => {
        regionsArray.push(this.fb.group(region));
      });

      const regionGroup: FormGroup = this.fb.group({
        ...setting,
        regions: regionsArray,
      });

      this.settingsArray().push(regionGroup);
    });
  }

  settingsArray(): FormArray {
    return this.updatedSettingsForm.get('settings') as FormArray;
  }

  regionArray(settingIndex: number): FormArray {
    return this.settingsArray().at(settingIndex).get('regions') as FormArray;
  }

  saveSettings(): void {
    console.log(this.updatedSettingsForm.value);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
