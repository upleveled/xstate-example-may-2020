import React from 'react';
import { useMachine } from '@xstate/react';
import { Machine } from 'xstate';

const toggleMachine = Machine({
  id: 'toggle',
  initial: 'blue',
  states: {
    blue: { on: { TOGGLE: 'red' } },
    red: { on: { TOGGLE: 'blue' } },
  },
});

export default function Toggle() {
  const [state, send] = useMachine(toggleMachine);
  return (
    <div style={{ padding: '10em', backgroundColor: state.value }}>
      <button onClick={() => send('TOGGLE')}>Change the color</button>
    </div>
  );
}
