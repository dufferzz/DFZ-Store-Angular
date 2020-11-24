import {Injectable} from "@angular/core";
import {HttpService} from "./http.service";



@Injectable()
export class NotificationService {

    constructor(private http: HttpService) {

    }

    addPushSubscriber(sub:any) {
      //console.log(sub)
        return this.http.post('https://api.dufferz.net/reg', sub);
    }

    send() {
        return this.http.post('https://api.dufferz.net/send', null);
    }

}
