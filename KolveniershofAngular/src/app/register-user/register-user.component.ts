import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../interfaces/user.interface';
import { finalize } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {
  public userFormGroup: FormGroup;
  public loader = false;
  private currentUser: User;
  public _userTypes: string[];
  public readonly defaultTypeChecked = 2;
  constructor(private userService: UserService, private route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit() {
    this.userService.getUserTypes().subscribe(
      types => this._userTypes = types,
      err => {
        alert('Er was een error bij het ophalen van de gebruiker soorten.');
        console.log(err);
      },
      () => {
        this.initializeFormGroup();
      });
    this.route.params.subscribe(params => {
      if (params.id) {
        this.userService.getUser(+params.id)
        .pipe(
          finalize(() => {
            this.loader = true;
          })
        )
        .subscribe(user => {
          console.log(user);
          this.currentUser = user;
        },
          err => {
            alert('Er was een error bij het ophalen van de gebruiker.');
            console.log(err);
          },
          () => {
            this.initializeFormGroup();
          });
        console.log(`Found the user (id: ${params.id}):`);
        console.log(this.currentUser);
      } else {
        this.currentUser = null;
      }
    },
    err => {
      alert('Er was een error bij laden van de pagina.');
      console.log(err);
    });
    this.initializeFormGroup();
  }

  private initializeFormGroup(){
    console.log("formgroup")
    this.userFormGroup = this.fb.group({
      name: [this.currentUser ? this.currentUser.name : '']
    });
  }

}
