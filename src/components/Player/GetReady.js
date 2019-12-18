import React, { useState, useEffect } from 'react';
import { socket } from '../Global/Header';
import { READY } from '../Events';

export default function GetReady(props) {
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

    socket.on(READY, () => {
      console.log('Player is ready and waiting.');
      setTimeout(() => {
        props.history.push(`/playblock?nickname=${ nickname }&pin=${ pin }`);
        socket.off(READY);
      }, 5000);
    });
  });

  return (
    <div>
      <h1>Get ready</h1>
      <p>Loading...</p>
    </div>
  )
}
