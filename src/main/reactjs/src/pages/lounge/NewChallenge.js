import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './NewChallenge.module.css';

const NewChallenge = () => {
  const navigate = useNavigate();

  // TODO: 로그인한 유저만 챌린지 생성 가능

  // 현재 로그인한 사람을 챌린지 작성자로
  const [challenge, setChallenge] = useState({
    leader_id: JSON.parse(localStorage.getItem("user")).id,
    age: 0,
    gender: 0,
    limit: 2
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

    const form = new FormData();
    form.append("file", image);
    form.append("data", new Blob([JSON.stringify(challenge)], {
      type: "application/json"
    }));

    // axios.post('/challenge/new', challenge)
    axios.post('/challenge/new', form, {
      headers: {'Content-Type' : 'multipart/form-data'}
    })
    .then(res => {
      // console.log("challenge id: " + res.data);
      navigate(`/lounge/${res.data}`);
    }).catch(err => console.log(err));
  }

  // 이미지 미리보기
  const [imageSrc, setImageSrc] = useState('');

  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);

    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      };
    });
  };

  // 이미지 업로드
  const [image, setImage] = useState();
  const handleImage = (e) => {
    setImage(e.target.files[0]);
  }

  return (
    <div className={styles.wrap}>
      <form onSubmit={createChallenge}>
        <div className={styles.title_box}>
          <span className={`material-icons ${styles.back_icon}`} onClick={() => navigate('/lounge')}>arrow_back_ios</span>
          <div className={styles.title}>챌린지 개설</div>
          {/* <div>완료</div> */}
          <button type="submit" className={styles.submit_btn}>완료</button>
        </div>

        <table>
          <tbody>
            <tr>
              <th>사진 업로드</th>
              <td>
                <input type='file' name='photo' required onChange={(e) => {
                  encodeFileToBase64(e.target.files[0]);
                  handleImage(e);
                }} />
                <div className={styles.preview}>
                  {imageSrc && <img src={imageSrc} alt="미리보기" />}
                </div>
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
                <textarea name='content' onChange={handleChange}></textarea>
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
                <input type='number' name="limit" defaultValue={2} min={2} required onChange={handleChange}/>명
              </td>
            </tr>
            {/* <tr>
              <td colSpan='2'>
                <button type="submit">만들기</button>
              </td>
            </tr> */}
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default NewChallenge;