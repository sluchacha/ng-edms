import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {
  faStar as fasStar,
  faStarHalfAlt as fasStarHalfAlt,
} from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss'],
})
export class StarRatingComponent implements OnChanges {
  @Input('rating') rating: number = 0.1;
  starList: number[] = [0, 0, 0, 0, 0];

  iconsMap: any = {
    0: farStar,
    0.5: fasStarHalfAlt,
    1: fasStar,
  };

  ngOnChanges(changes: SimpleChanges): void {
    this.calculateAndFillStars();
  }

  calculateAndFillStars() {
    //round to nearest 0.5
    let starsToFill: number = Math.round(this.rating * 2) / 2;

    for (let i = 1; i <= 5; i++) {
      if (i <= starsToFill) this.starList[i - 1] = 1;
      else if (i <= starsToFill + 0.5) this.starList[i - 1] = 0.5;
      else this.starList[i - 1] = 0;
    }
  }
}
