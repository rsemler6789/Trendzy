import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { FirebaseAuthenticationProvider } from '../provider/firebase/firebase-authentication';

@Component({
	selector: 'app-signup',
	templateUrl: 'signup.page.html',
	styleUrls: ['signup.page.scss']
})
export class SignupPage implements OnInit {

	signupForm: FormGroup;
	loading: any;

	constructor(
		public alertController: AlertController,
		public loadingController: LoadingController,
		private router: Router,
		public formBuilder: FormBuilder,
		public FirebaseAuthenticationProvider: FirebaseAuthenticationProvider
	) {
		this.signupForm = formBuilder.group({
			email: ['', Validators.compose([Validators.required, Validators.email])],
			password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
		});
	}
	ngOnInit() {	
	}
	signupUser() {
        if (!this.signupForm.valid) {
            console.log(this.signupForm.value);
        } else {

        	
            this.FirebaseAuthenticationProvider.signupUser(this.signupForm.value.email, this.signupForm.value.password)
                .then(() => {
                    // this.loading.dismiss().then(() => {
                    // 	this.presentAlertConfirm();
					// });
					this.router.navigate(['tabs']);
                }, (error) => {
                    this.loading.dismiss().then(() => {
                        this.presentAlert();
                    });
                });
            this.presentLoading();
        }
    }

    backPage(){
    	this.router.navigate(['login']);
    }

    async presentAlertConfirm() {
	    const alert = await this.alertController.create({
	      message: 'Confirm! <strong>Successfully registered, start logging in now.</strong>!!!',
	      buttons: [
	        {
	          text: 'Cancel',
	          role: 'cancel',
	          cssClass: 'secondary',
	          handler: (blah) => {
	            console.log('Confirm Cancel: blah');
	          }
	        }, {
	          text: 'Join Now',
	          handler: () => {
	      		this.router.navigate(['tabs']);
	            console.log('Confirm Okay');
	          }
	        }
	      ]
	    });

	    await alert.present();
	}

    async presentLoading() {
	    this.loading = await this.loadingController.create({
	    	message: 'waiting',
	      	duration: 2000
	    });
	    return await this.loading.present();
	}
	async presentAlert() {
	    const alert = await this.alertController.create({
	      	header: 'Signup failed',
	      	message: 'Not registered successfully',
            buttons: [
                {
                    text: "Ok",
                    role: 'cancel'
                }
            ]
	    });
	    await alert.present();
	}

}
