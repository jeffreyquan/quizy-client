import React, { useState, useEffect } from 'react';
import { socket } from '../Global/Header';
import Pin from '../Global/Pin';
import { GAME_HAS_STARTED } from '../Events';

export default function Instructions(props) {
  const [nickname, setNickname] = useState(null);
  const [pin, setPin] = useState(null);

  useEffect(() => {
    const queryString = require('query-string');
    const parsed = queryString.parse(props.location.search);
    const nickname = parsed.nickname;
    const pin = parsed.pin;
    console.log('Player joined room with pin:', pin);
      setNickname(nickname);
      setPin(pin);


    socket.on(GAME_HAS_STARTED, () => {
      props.history.push(`/getready?nickname=${ nickname }&pin=${ pin }`);
      socket.off(GAME_HAS_STARTED);
    });
  });

  if (pin === null) {
    return 'Loading...';
  }

  return (
    <div>
      <Pin pin={ pin }/>
      <p>You're in</p>
      <p>See your nickname on screen?</p>
    </div>
  )
}
