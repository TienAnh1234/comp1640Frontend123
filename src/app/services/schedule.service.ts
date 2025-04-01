import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Schedule } from '../common/schedule';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private apiUrl = 'http://localhost:8080/api/schedule';

  constructor(private http: HttpClient) { }

  bookSchedule(schedule: Schedule): Observable<Schedule> {
    return this.http.post<Schedule>(`${this.apiUrl}/book_schedule`, schedule);
  }

  getScheduleList(tutorId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${tutorId}`);
  }

  updateSchedule(schedule: Schedule, scheduleId: number):Observable<any>{
    return this.http.put(`${this.apiUrl}/update/${scheduleId}`, schedule);
  }

  deleteSchedule(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

}
