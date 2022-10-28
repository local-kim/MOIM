import React from 'react';
import { ChallengeItem } from '../../components';
import ProfileChallengeItem from '../../components/ProfileChallengeItem';
import styles from './Profile.module.css';

const CreatedChallenge = ({created}) => {
  return (
    <div>
      {/* 내가 만든 챌린지 */}
      {
        created && created.map((challenge, index) => (
          <ProfileChallengeItem key={index} challenge={challenge}/>
        ))
      }
    </div>
  );
};

export default CreatedChallenge;