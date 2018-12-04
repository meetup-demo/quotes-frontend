import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuotesService {
  private quotesUrl = '/quote';  // URL to web api

  constructor(private http: HttpClient) {
  }

  getQuote(): Observable<any> {
    return this.http.get<any>(this.quotesUrl)
      .pipe(
        catchError(() => of({body: 'Could not get item from server'}))
      );
  }
}
