// eslint-disable-next-line
import React from 'react'
declare module 'react' {
  // make use of higher order type inference (TS 3.4+);
  // declare type parameters annotated in the function signature (free parameters) instead
  // of at the head of a function type (bound/static parameters)
  function memo<A, B>(
    Component: (props: A) => B
  ): (props: A) => ReactElement | null
}
