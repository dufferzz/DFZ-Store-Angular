import {
  transition,
  trigger,
  query,
  style,
  animate,
  group,
  animateChild
} from '@angular/animations';
export const ngIfAnimation =
    // trigger name for attaching this animation to an element using the [@triggerName] syntax
    trigger(
      'ngIfAnimation',
      [
        transition(
          ':enter',
          [

          // css styles at start of transition
          style({ opacity: 0 }),

          // animation and styles at end of transition
          animate('.7s', style({ opacity: 1 }))
          ]
        ),
        transition(
          ':leave',
          [

          // css styles at start of transition
          style({ opacity: 1 }),

          // animation and styles at end of transition
          animate('.2s', style({ opacity: 0 }))
          ]
        )
      ]
    )
