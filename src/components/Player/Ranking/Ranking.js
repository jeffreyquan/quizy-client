import React from 'react';
import { socket } from '../../Global/Header';

function Ranking(props) {
  return (
    <div>
      <Rank rank={ props.rank } />
      <div>Score: { props.score }</div>
    </div>
  )
}

const Rank = (props) => {

  let finalRank;

  if (props.rank === 1) {
    finalRank = <div>1st place</div>
  } else if (props.rank === 2) {
    finalRank = <div>2nd place</div>
  } else if (props.rank === 3) {
    finalRank = <div>3rd place</div>
  } else {
    finalRank=<div>{`${props.rank}th place`}</div>
  }

  return (
    <div>
      { finalRank }
    </div>
  )
}

export default Ranking;
