import React from 'react';
import { ChallengeItem, JoinedChallengeItem } from '../../components';
import styles from './Profile.module.css';

const JoinedChallenge = ({joined}) => {
  return (
    <div>
      {/* 내가 참여한 챌린지(진행중+완료) */}
      {
        joined && joined.map((challenge, index) => (
          <JoinedChallengeItem key={index} challenge={challenge}/>
        ))
      }
      {
        joined.length == 0 &&
        <div className={styles.no_content}>참여한 챌린지가 없습니다.</div>
      }
    </div>
  );
};

export default JoinedChallenge;