import React from 'react';
import { ChallengeItem, MyChallengeItem } from '../../components';

const CreatedChallenge = ({created}) => {
  return (
    <div>
      {/* 내가 만든 챌린지 */}
      {
        created && created.map((challenge, index) => (
          <MyChallengeItem key={index} challenge={challenge}/>
        ))
      }
    </div>
  );
};

export default CreatedChallenge;