import React from 'react';
import { ChallengeItem } from '../../components';
import ProfileChallengeItem from '../../components/ProfileChallengeItem';
import styles from './Profile.module.css';

const JoinedChallenge = ({joined}) => {
  return (
    <div>
      {/* 내가 참여한 챌린지(진행중+완료) */}
      {
        joined && joined.map((challenge, index) => (
          <ProfileChallengeItem key={index} challenge={challenge}/>
        ))
      }
    </div>
  );
};

export default JoinedChallenge;