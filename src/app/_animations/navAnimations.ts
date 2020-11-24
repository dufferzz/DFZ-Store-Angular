import {
  transition,
  trigger,
  query,
  state,
  style,
  animate,
  group,
  animateChild
} from '@angular/animations';

export const smoothHeight = trigger('navAnimation', [
  transition('void => *', []),
  transition('* => *', [style({ height: '{{startHeight}}px', opacity: 1 }), animate('0.5s ease')], {
    params: { startHeight: 0 }
  })
]);
