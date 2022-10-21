import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NewChallenge = () => {
  const navigate = useNavigate();

  // TODO: 로그인한 유저만 챌린지 생성 가능

  // 현재 로그인한 사람을 챌린지 작성자로
  const [challenge, setChallenge] = useState({
    leader_id: JSON.parse(localStorage.getItem("user")).id,
    age: 0,
    gender: 0,
    limit: 1
  });

  const handleChange = (e) => {
    const {name, value} = e.target;

    setChallenge({
      ...challenge,
      [name]: value
    });

    // console.log(challenge);
  }

  const createChallenge = (e) => {
    e.preventDefault();

    axios.post('/challenge/new', challenge)
    .then(res => {
      // console.log("challenge id: " + res.data);
      navigate(`/lounge/${res.data}`);
    }).catch(err => console.log(err));
  }

  return (
    <div>
      <h1>챌린지 만들기</h1>

      <form onSubmit={createChallenge}>
        <table>
          <tbody>
            <tr>
              <th>사진 업로드</th>
              <td>
                <input type='file' name='photo' onChange={handleChange} />
              </td>
            </tr>
            <tr>
              <th>제목</th>
              <td>
                <input type='text' name="title" required onChange={handleChange}/>
              </td>
            </tr>
            <tr>
              <th>내용</th>
              <td>
                <input type='text' name="content" required onChange={handleChange}/>
              </td>
            </tr>
            <tr>
              <th>날짜</th>
              <td>
                <input type='datetime-local' name="planned_at" required onChange={handleChange}/>
              </td>
            </tr>
            <tr>
              <th>장소</th>
              <td>
                <label>
                  <input type='radio' name="online" value='0' required onChange={handleChange}/>오프라인
                </label>
                <label>
                  <input type='radio' name="online" value='1' required onChange={handleChange}/>온라인
                </label>
              </td>
            </tr>
            <tr>
              <th>지역</th>
              <td>
                <input type='text' name="area" required onChange={handleChange}/>
              </td>
            </tr>
            <tr>
              <th>연령대</th>
              <td>
                <select name='age' onChange={handleChange}>
                  <option value={'0'} defaultValue>무관</option>
                  <option value={'20'}>20대</option>
                  <option value={'30'}>30대</option>
                  <option value={'40'}>40대</option>
                </select>
              </td>
            </tr>
            <tr>
              <th>성별</th>
              <td>
                <label>
                  <input type='radio' name="gender" value='0' defaultChecked required onChange={handleChange}/>혼성
                </label>
                <label>
                  <input type='radio' name="gender" value='1' required onChange={handleChange}/>남성
                </label>
                <label>
                  <input type='radio' name="gender" value='2' required onChange={handleChange}/>여성
                </label>
              </td>
            </tr>
            <tr>
              <th>최대 인원</th>
              <td>
                <input type='number' name="limit" defaultValue={'1'} required onChange={handleChange}/>명
              </td>
            </tr>
            <tr>
              <td colSpan='2'>
                <button type="submit">만들기</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default NewChallenge;