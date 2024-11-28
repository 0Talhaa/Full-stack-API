import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-delete-event',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './delete-event.component.html',
  styleUrl: './delete-event.component.css'
})
export class DeleteEventComponent {
  eventTypes: any[] = [];
  event = {
    id: 0,
    customerName: "",
    noOfGuests: 0,
    eventTypeId: 0,
    date: new Date(), // Ensure date format is compatible with your backend
  }

  eventId:any = 0;


  constructor(private http: HttpClient, private route:ActivatedRoute) {
    this.getEventTypes();
    this.getEventDetails();
  }
  getEventDetails() {
    this.eventId = this.route.snapshot.paramMap.get("id");
    console.log(this.eventId);
    this.http.get("https://localhost:7065/api/EventOrganizer/" + this.eventId).subscribe((res: any) => {
      this.event = res;
      console.log(res);

    })
  }

  getEventTypes() {
    this.http.get("https://localhost:7065/api/EventOrganizer/EventTypes").subscribe(
      (res: any) => {
        this.eventTypes = res;
        console.log(res);
      }
    );
  }



  
  deleteEvent() {
    this.http.delete("https://localhost:7065/api/EventOrganizer/", {body: this.event}).subscribe(
      (res: any) => {
    if (res != null){
      alert("Event Delete successfully")
      location.href = "/";
    }else{
      alert("Failed to Delete event");
    }
      }
    );
  }
}
