import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from '../../_animations/route-animations';
import { ngIfAnimation } from '../../_animations/ngIfAnimations';
import {
  ActivatedRoute
} from '@angular/router';
import Swal from 'sweetalert2';
import { HttpService } from '../../_services/http.service'
import {
  AuthService
} from '../../_auth/auth0.service';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  animations: [ fadeInAnimation, ngIfAnimation ],
  host: { '[@fadeInAnimation]': '' }
})
export class HomePageComponent implements OnInit {
  error:any = null;
token:any;
  constructor(
    private route: ActivatedRoute,
    private http: HttpService,
    public authService: AuthService,


    ) {

    //  const userToken =  this.authService.auth0Client$.subscribe(user => {
    //     console.log(user.options.client_id)

    //   })

      this.route.queryParams.subscribe(params => {
        // console.log(params)
        this.error = params['error_description']
         console.log(this.error)
        if(this.error!= null && this.error.length > 1){
          Swal.fire({
            icon: 'error',
            title: `Error`,
            showCancelButton: true,
            confirmButtonColor: '#28a745',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Retry',
            cancelButtonText: 'Log Out',
            html: `${this.error} Click here to Re-Send Email`,
          }).then((result) => {
            if (!result.value) {
              console.log('loggin out')
              this.authService.logout()
            }else{
              this.authService.login()
            }
          })
        }
      });
    }



  ngOnInit(): void {
  }

}
