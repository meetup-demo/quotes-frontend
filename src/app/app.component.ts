import {Component} from '@angular/core';
import {QuotesService} from './quotes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'My Quotes App - v2!';
  version = '2.0.0';
  quote = 'This is a simple text. Click the button to get a quote';
  quoteSource = '';

  constructor(private quotesService: QuotesService) {
  }

  getQuote() {
    this.quotesService.getQuote().subscribe(data => {
      this.quote = data.body;
      this.quoteSource = data.source;
    });
  }
}
