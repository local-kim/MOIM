import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './NewChallenge.module.css';
import { MenuTitle } from '../../components';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
// import TextField from '@mui/material/TextField';

const NewChallenge = () => {
  const navigate = useNavigate();

  // TODO: 로그인한 유저만 챌린지 생성 가능

  // const [isOnline, setIsOnline] = useState(1);

  // 현재 로그인한 사람을 챌린지 작성자로
  const [challenge, setChallenge] = useState({
    leader_id: JSON.parse(localStorage.getItem("user")).id,
    age: 0,
    // gender: 0,
    limit: 2
  });

  const handleChange = (e) => {
    const {name, value} = e.target;

    setChallenge({
      ...challenge,
      [name]: value
    });

    // console.log(challenge);

    // 제출 가능 여부 확인
    if(image && challenge.title && challenge.content && challenge.type && challenge.planned_at && challenge.gender && (challenge.online == 1 || (challenge.online == 0 && challenge.area))){
      setSubmit(true);
    }
    else{
      setSubmit(false);
    }
  }

  // const handleGenderChange = (e) => {
  //   // setValue(event.target.value);
  //   setChallenge({
  //     ...challenge,
  //     gender: e.target.value
  //   });
  // };

  const [submit, setSubmit] = useState(false);

  const createChallenge = () => {
    const form = new FormData();
    form.append("file", image);
    form.append("data", new Blob([JSON.stringify(challenge)], {
      type: "application/json"
    }));

    // axios.post('/api/challenge/new', challenge)
    axios.post('/api/challenge/new', form, {
      headers: {'Content-Type' : 'multipart/form-data'}
    })
    .then(res => {
      // console.log("challenge id: " + res.data);
      navigate(`/lounge/${res.data}`, {replace: true});
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

    // 제출 가능 여부 확인
    if(challenge.title && challenge.content && challenge.type && challenge.planned_at && challenge.gender && (challenge.online == 1 || (challenge.online == 0 && challenge.area))){
      setSubmit(true);
    }
    else{
      setSubmit(false);
    }
  }

  return (
    <div className={styles.wrap}>
      {/* <form onSubmit={createChallenge}> */}
        {/* <div className={styles.title_box}>
          <span className={`material-icons ${styles.back_icon}`} onClick={() => navigate('/lounge')}>arrow_back_ios</span>
          <div className={styles.title}>챌린지 개설</div>
          <button type="submit" className={styles.submit_btn}>완료</button>
        </div> */}

        {/* <MenuTitle title={"챌린지 개설"} leftIcon={"arrow_back_ios"} rightButton={"완료"} visible={true} history={"lounge"}/> */}

        <div className={styles.menu_title}>
          <span className={`material-icons ${styles.left_icon}`} onClick={() => navigate(-1)}>close</span>
          <div className={styles.title}>챌린지 개설</div>
          {
            submit ? <button type="button" className={styles.submit_btn} onClick={createChallenge}>완료</button> : <button type="button" className={styles.disabled_submit_btn}>완료</button>
          }
          
        </div>

        {/* 사진 */}
        <div>
          <label for="upload">
            {
              !imageSrc &&
              <div className={styles.no_image}>
                <span className={`material-icons-outlined ${styles.add_icon}`}>add_photo_alternate</span>
              </div>
            }
            {
              // 이미지 업로드 후 미리보기
              imageSrc && <img src={imageSrc} className={styles.preview} alt="" />
            }
          </label>
          <input type='file' name='photo' id='upload' className={styles.hidden} required onChange={(e) => {
            encodeFileToBase64(e.target.files[0]);
            handleImage(e);
          }} />
        </div>

        <div className={styles.main}>
          {/* 제목 */}
          <div className={styles.title_wrap}>
            <div className={styles.subtitle}>제목</div>
            <input type='text' name="title" required onChange={handleChange}/>
          </div>

          {/* 내용 */}
          <div className={styles.content_wrap}>
            <div className={styles.subtitle}>내용</div>
            <textarea name='content' onChange={handleChange}></textarea>
          </div>

          {/* 유형(선착순, 승인제) */}
          <div className={styles.area_wrap}>
            <span className={styles.subtitle}>유형</span>

            <div>
              <div className={styles.btn_wrap}>
                <label className={`form-check-label`}>
                  <input className={`form-check-input`} type='radio' name="type" value='0' required onChange={handleChange}/>
                  <span>선착순</span>
                </label>
                <label className={`form-check-label`} style={{marginLeft:'26px'}}>
                  <input className={`form-check-input`} type='radio' name="type" value='1' required onChange={handleChange}/>
                  <span>승인제</span>
                </label>
              </div>
            </div>
          </div>

          {/* 인원 */}
          <div className={styles.limit_wrap}>
            <span className={styles.subtitle}>인원</span>
            <div className={styles.btn_wrap}>
              {
                challenge.limit <= 2 ? 
                <span className={`material-icons ${styles.limit_btn_disable}`}>remove_circle_outline</span> : 
                <span className={`material-icons ${styles.limit_btn}`} onClick={() => {
                  if(challenge.limit > 2){
                    setChallenge({
                      ...challenge,
                      limit: challenge.limit - 1
                    });
                  }
                }}>remove_circle_outline</span>
              }
              <span className={styles.count}>{challenge.limit}명</span>
              {
                challenge.limit >= 99 ? 
                <span className={`material-icons ${styles.limit_btn_disable}`}>add_circle_outline</span> : 
                <span className={`material-icons ${styles.limit_btn}`} onClick={() => {
                  if(challenge.limit < 99){
                    setChallenge({
                      ...challenge,
                      limit: challenge.limit + 1
                    });
                  }
                }}>add_circle_outline</span>}
            </div>
          </div>

          {/* 날짜 */}
          <div className={styles.date_wrap}>
            <span className={styles.subtitle}>날짜</span>
            <input className={styles.date_picker} style={{width:'220px'}} type='datetime-local' name="planned_at" required onChange={handleChange}/>
            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileDateTimePicker
                label="For mobile"
                value={challenge.planned_at}
                onChange={(newValue) => {
                  // setValue(newValue);
                  setChallenge({
                    ...challenge,
                    planned_at: newValue
                  });
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider> */}
          </div>

          {/* 장소 */}
          <div className={styles.area_wrap}>
            <span className={styles.subtitle}>장소</span>

            <div>
              <div className={styles.btn_wrap}>
                <label className={`form-check-label`}>
                  <input className={`form-check-input`} type='radio' name="online" value='0' required onChange={handleChange}/>
                  <span>오프라인</span>
                </label>
                <label className={`form-check-label`} style={{marginLeft:'26px'}}>
                  <input className={`form-check-input`} type='radio' name="online" value='1' required onChange={handleChange}/>
                  <span>온라인</span>
                </label>
              </div>
            </div>
          </div>

          {/* 지역 */}
          {
            !challenge.online || challenge.online == '1' ? "" : 
              <div>
                <span className={styles.subtitle}>지역</span>
                <input className={styles.area_input} type='text' name="area" required onChange={handleChange}/>
              </div>
          }

          {/* 성별 */}
          <div className={styles.gender_wrap}>
            <span className={styles.subtitle}>성별</span>

            <div className={styles.btn_wrap}>
              <label className={`form-check-label`}>
                <input className={`form-check-input`} type='radio' name="gender" value='0' required onChange={handleChange}/>
                <span>혼성</span>
              </label>
              <label className={`form-check-label`}>
                <input className={`form-check-input`} type='radio' name="gender" value='1' required onChange={handleChange}/>
                <span>남성</span>
              </label>
              <label className={`form-check-label`}>
                <input className={`form-check-input`} type='radio' name="gender" value='2' required onChange={handleChange}/>
                <span>여성</span>
              </label>
            </div>
          </div>

          {/* 나이 */}
          <div className={styles.age_wrap}>
            <span className={styles.subtitle}>나이</span>

            <select className={`form-select form-select-sm`} style={{width:'90px'}} name='age' onChange={handleChange}>
              <option value={'0'} defaultValue>무관</option>
              <option value={'10'}>10대</option>
              <option value={'20'}>20대</option>
              <option value={'30'}>30대</option>
              <option value={'40'}>40대</option>
              <option value={'50'}>50대</option>
              <option value={'60'}>60대</option>
              <option value={'70'}>70대</option>
              <option value={'80'}>80대</option>
            </select>
          </div>
        </div>
      {/* </form> */}
    </div>
  );
};

export default NewChallenge;