import {
  Component,
  OnInit, HostListener
} from '@angular/core';
import {
  Title
} from '@angular/platform-browser'
import {
  Router,
  ActivatedRoute,
  NavigationEnd
} from '@angular/router';
import {
  fadeInAnimation
} from './_animations/route-animations';
import {SwPush, SwUpdate} from '@angular/service-worker'
import { ToastrService, ActiveToast } from 'ngx-toastr';
import Swal from 'sweetalert2';
// import {SocketService} from 'src/app/_services/socket.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeInAnimation],
  host: {
    '[@fadeInAnimation]': ''
  }
})
export class AppComponent {
  error:any;
  isShow: boolean;
  topPosToStartShowing = 100;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private titleService: Title,
    private swUpdate: SwUpdate,
    private toastr: ToastrService,
    // private Socket: SocketService
  ) {
    this.titleService.setTitle('DFZ Service and Repair');
    this.route.queryParams.subscribe(params => {
      // console.log(params)
      this.error = params['error']
    });

    // websockets offline, keep moving server platforms and not doing nginx config yet
    // this.Socket.connect('wss://api.dufferz.net/socket')
    // Socket.sendMessage('f')
  }
  title = 'DFZStoreee';
  @HostListener('window:scroll')

  checkScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (scrollPosition >= this.topPosToStartShowing) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }
  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  // This whole Serviceworker caching stuff.... i am getting annoyed
  // Trusting users to update = bad
  // Popups = bad
  // Not running latest version = bad
  // ?????? Just nginx cache statics??

  showSuccessPopup() {
    Swal.fire({
      title: 'DFZ Update!',
      icon: 'info',
      text: 'Application Update available!'
    }).then((result)=>{
        window.location.reload()
    })
    // const toast = this.toastr.success('Application Updated!', 'Click here to upgrade now!')
    // toast.onTap.subscribe(() => window.location.reload);
}

  ngOnInit(): void {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        this.showSuccessPopup();
      });
  }

      this.router.events.subscribe((evt) => {
        if (!(evt instanceof NavigationEnd)) {
          return;
        }
        // This isn't the most elegant..
        this.gotoTop()
      });
}
}
