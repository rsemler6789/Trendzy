import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// import { FirebaseAuthenticationProvider } from '../provider/firebase/firebase-authentication';
import { catchError } from 'rxjs/operators';
import * as firebase from 'firebase';

@Component({
	selector: 'app-login',
	templateUrl: 'login.page.html',
	styleUrls: ['login.page.scss']
})
export class LoginPage implements OnInit {

	loginForm: FormGroup;
	loading: any;

	constructor(
		public alertController: AlertController,
		public loadingController: LoadingController,
		private router: Router,
		public formBuilder: FormBuilder
	) {
		this.loginForm = formBuilder.group({
			email: ['mom@gmail.com', Validators.compose([Validators.required, Validators.email])],
			password: ['SportS20', Validators.compose([Validators.minLength(6), Validators.required])]
		});
	}
	ngOnInit() {
	}
	loginUser(): void {
        if (!this.loginForm.valid) {
            console.log(this.loginForm.value);
        } else {
			console.log(this.loginForm.value.email)
			console.log(this.loginForm.value.password)
            firebase.auth().signInWithEmailAndPassword(this.loginForm.value.email, this.loginForm.value.password).then(authData => {
                this.loading.dismiss().then(() => {
                    this.router.navigate(['tabs']);
                });
            }, error => {
				console.log("error login");
                this.loading.dismiss().then(() => {
                	this.presentAlert();
                });
            });
            this.presentLoading();          
        }
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
	      	header: 'Login failed',
	      	message: 'email or password is wrong',
	      	buttons: ['OK']
	    });
	    await alert.present();
	}
    openSignup(): void {
    	this.router.navigate(['signup']);
    }
    openForgotPwd(): void {
    	this.router.navigate(['forgot']);
    }

}

