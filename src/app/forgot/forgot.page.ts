import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { FirebaseAuthenticationProvider } from '../provider/firebase/firebase-authentication';

@Component({
	selector: 'app-forgot',
	templateUrl: 'forgot.page.html',
	styleUrls: ['forgot.page.scss']
})
export class ForgotPage implements OnInit {

	resetPasswordForm: FormGroup;
	loading: any;

	constructor(
		public alertController: AlertController,
		public loadingController: LoadingController,
		private router: Router,
		public formBuilder: FormBuilder,
		public FirebaseAuthenticationProvider: FirebaseAuthenticationProvider
	) {
		this.resetPasswordForm = formBuilder.group({
			email: ['', Validators.compose([Validators.required, Validators.email])]
		});
	}



	ngOnInit() {
		
	}



	resetPassword() {
        if (!this.resetPasswordForm.valid) {
            console.log(this.resetPasswordForm.value);
        } else {
            this.FirebaseAuthenticationProvider.resetPassword(this.resetPasswordForm.value.email).then((user) => {
                this.presentAlertSuccess();
            }, (error) => {
                this.presentAlertError()
            });
        }
    }


    backPage(){
       this.router.navigate(['login']);
    }


    async presentAlertError() {
	    const alert = await this.alertController.create({
	      	header: 'Request failed',
	      	message: 'Please do again',
	      	buttons: ['OK']
	    });
	    await alert.present();
	}

	async presentAlertSuccess() {
	    const alert = await this.alertController.create({
	      	header: 'Complete request',
	      	message: 'We just sent you a reset link to your email',
	      	buttons: ['OK']
	    });
	    await alert.present();
	}

}
