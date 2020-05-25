import React from 'react';
import { useMachine } from '@xstate/react';
import { Machine } from 'xstate';

const lightbulbMachine = Machine(
  {
    id: 'lightbulb',
    initial: 'unlit',
    states: {
      // State of "unlit"
      unlit: {
        on: {
          // When we toggle this, it turns the lightbulb to "lit"
          TOGGLE: 'lit',
          // When we turn it on, it turns the lightbulb to "lit"
          TURN_LIT: 'lit',
          // When we break it, it turns the lightbulb to "broken"
          BREAK: {
            // BREAK: 'broken' is a shorthand for BREAK: { target: 'broken' }
            target: 'broken',
            actions: ['informUserOfBrokeLightBulb'],
          },
        },
      },
      lit: {
        on: {
          TOGGLE: 'unlit',
          TURN_UNLIT: 'unlit',
          BREAK: {
            // BREAK: 'broken' is a shorthand for BREAK: { target: 'broken' }
            target: 'broken',
            actions: ['alertBroken'],
          },
        },
      },
      // State of "broken"
      broken: {
        type: 'final',
      },
    },
  },
  {
    actions: {
      alertBroken: (_, event) => {
        // we can put more information on an event object, such as
        // { type: 'BREAK', bulbId: 'someUUIDOrSomething' }
        alert("it's broken!");
      },
    },
  },
);

export default function Lightbulb() {
  const [state, send] = useMachine(lightbulbMachine);
  return (
    <div style={{ padding: '10em' }}>
      Lightbulb is: {state.value}
      <br />
      <button onClick={() => send('TOGGLE')}>Toggle</button>{' '}
      <button onClick={() => send('TURN_LIT')}>Turn On</button>{' '}
      <button onClick={() => send('TURN_UNLIT')}>Turn unlit</button>
      <br />
      <button onClick={() => send('BREAK')}>Break</button>
    </div>
  );
}
