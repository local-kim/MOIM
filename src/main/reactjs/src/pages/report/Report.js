import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import styles from './Report.module.css';
import axios from 'axios';
import { format } from 'date-fns'
import ko from 'date-fns/locale/ko';
import RechartsGraph from './RechartsGraph';
import NivoGraph from './NivoGraph';
import VisGraph from './VisGraph';
import Chart from './Chart';

const Report = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [bmi, setBmi] = useState();
  const [weights, setWeights] = useState();

  const [newWeight, setNewWeight] = useState();

  const addWeight = () => {
    if(newWeight && newWeight != 0){
      setNewWeight('');

      axios.post(`/api/user/weight`, {
        weight: newWeight,
        user_id: user.id
      })
      .then(res => {
        // console.log(res.data);
        setWeights(res.data.map(d => {
          return {
            date: format(new Date(d.created_at), "MM/dd", {locale: ko}),
            weight: d.weight
          }
        }));
      }).catch(err => console.log(err));
    }
  }

  useEffect(() => {
    axios.get(`/api/user/${user.id}/weights`)
    .then(res => {
      // console.log(res.data);
      
      // 그래프용 data로 가공
      setWeights(
        res.data.map(d => {
          return {
            date: format(new Date(d.created_at), "MM/dd", {locale: ko}),
            체중: d.weight
          }
        })
      );

      // setWeights(res.data);
      setBmi((res.data[res.data.length - 1].weight / ((user.height / 100) * (user.height / 100))).toFixed(10));
    }).catch(err => console.log(err));
  }, []);

  return (
    <div>
      { !user && <Navigate to="/login" replace={true} /> }
      { user &&
        <div className={styles.wrap}>
          <div className={styles.title}>Report</div>
          
          {/* 건강 점수 */}
          <div className={styles.health_box}>
            <div className={styles.subtitle}>건강 점수</div>
            <div className={styles.chart_wrap}><Chart bmi={bmi} /></div>
            {/* <div>{user.height}cm, {weights && weights[weights.length - 1].weight}kg</div> */}
            {/* <div>BMI {bmi}</div> */}
            {
              bmi == undefined ? <div></div> : 
              bmi <= 17 ? (
                <div className={styles.comment}>근육량이 부족한 상태입니다. 운동 챌린지에 참여하여 운동량을 늘려보세요!</div>
              ) : bmi <= 18.5 ? (
                <div className={styles.comment}>이상적인 체중상태입니다. 적절한 운동으로 아름다운 몸매에 도전하세요!</div>
              ) : bmi <= 22.9 ? (
                <div className={styles.comment}>정상체중입니다. 꾸준한 챌린지 참가로 이상적인 체중상태에 도전해보세요!</div>
              ) : bmi <= 23.9 ? (
                <div className={styles.comment}>조금만 더 신경쓰면 정상체중이 될 수 있어요! 운동 챌린지에 참여하여 운동량을 늘려보세요!</div>
              ) : bmi <= 24.9 ? (
                <div className={styles.comment}>체중관리가 다소 부족한 상태입니다. 조금 더 관리하면 건강한 몸이 될수있어요.</div>
              ) : (
                <div className={styles.comment}>체중관리가 되지 않고 있어요! 철저한 식단과 운동 관리가 필요해요. 다이어트와 식단챌린지에 참여하여 건강한 생활을 해봐요!</div>
              )
            }
          </div>
            
          {/* 몸무게 변화 */}
          <div className={styles.weight_box}>
            <div className={styles.subtitle}>몸무게 변화(kg)</div>
            {/* {
              weights && weights.map((weight, index) => (
                <div key={index}>
                  <span>{weight.weight}kg</span>
                  (
                  <span>{format(new Date(weight.created_at), "MM/dd HH:mm", {locale: ko})}</span>
                  )
                </div>
              ))
            } */}
            <div className={styles.graph_wrap}><RechartsGraph data={weights}/></div>
            
            {/* <div style={{height:'300px'}}><NivoGraph data={weights} /></div> */}
            {/* <VisGraph data={weights} /> */}

            {/* <input type='number' value={newWeight} onChange={(e) => setNewWeight(e.target.value)}/>
            <button type='button' onClick={addWeight}>몸무게 추가</button> */}
          </div>
        </div>
      }
    </div>
  );
};

export default Report;