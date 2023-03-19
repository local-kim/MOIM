import React, { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './NewChallenge.module.css';
import { MenuTitle } from '../../components';
import { format } from 'date-fns';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
// import TextField from '@mui/material/TextField';

const categoryList = ['러닝', '등산', '산책', '헬스', '수영', '테니스', '배드민턴', '자전거', '요가', '클라이밍', '볼링', '플로깅', '골프', '서핑', '농구', '축구', '보드'];

const NewChallenge = () => {
  const navigate = useNavigate();

  // 현재 로그인한 사람을 챌린지 작성자로
  const [challenge, setChallenge] = useState({
    leader_id: JSON.parse(localStorage.getItem("user")).id,
    category: 0,
    type: 0,
    age: 0,
    limit: 2
  });

  const handleChange = (e) => {
    const {name, value} = e.target;

    if(name == 'type' && challenge.type == 1){
      setChallenge({
        ...challenge,
        type: 0
      });
    }
    else{
      setChallenge({
        ...challenge,
        [name]: value
      });
    }
    
    // console.log(challenge);
  }

  const [submit, setSubmit] = useState(false);

  const createChallenge = () => {
    const form = new FormData();
    form.append("file", image);
    form.append("data", new Blob([JSON.stringify(challenge)], {
      type: "application/json"
    }));

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
  }

  // textarea 크기 자동 조절
  const textRef = useRef();
  const handleResizeHeight = useCallback((e) => {
    // setContent(e.target.value);
    // handleChange(e);
    textRef.current.style.height = '92px';
    textRef.current.style.height = textRef.current.scrollHeight + "px";
  }, []);
      
  useEffect(() => {
    // console.log(challenge);
    // console.log(image);
    // 제출 가능 여부 확인
    if(image && challenge.category != 0 && challenge.title && challenge.content && challenge.planned_at && challenge.gender && (challenge.online == 1 || (challenge.online == 0 && challenge.area))){
      setSubmit(true);
    }
    else{
      setSubmit(false);
    }
  }, [challenge, image]);
      
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
          <div className={styles.title}>챌린지 만들기</div>
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
          <input type='file' name='photo' id='upload' className={styles.hidden} required accept="image/*" onChange={(e) => {
            encodeFileToBase64(e.target.files[0]);
            handleImage(e);
          }} />
        </div>

        

        <div className={styles.main}>
          {/* 카테고리 */}
          <div className={`${styles.flex_box} ${styles.age_wrap}`}>
            <span className={styles.subtitle}>카테고리</span>

            <select className={`form-select ${styles.age_select}`} name='category' onChange={handleChange}>
              <option value={0} defaultChecked>선택</option>
              {
                categoryList.map((category, index) => (
                  <option value={index + 1}>{category}</option>
                ))
              }
            </select>
          </div>

          {/* 제목 */}
          <div className={styles.title_wrap}>
            <div className={styles.subtitle} style={{marginBottom: '5px'}}>제목</div>
            <input type='text' name="title" required onChange={handleChange}/>
          </div>

          {/* 내용 */}
          <div className={styles.content_wrap}>
            <div className={styles.subtitle} style={{marginBottom: '5px'}}>내용</div>
            <textarea name='content' onChange={(e) => {
              handleChange(e);
              handleResizeHeight(e);
            }} ref={textRef} rows={3}></textarea>
          </div>

          {/* 날짜 */}
          <div className={styles.flex_box}>
            <span className={styles.subtitle}>날짜</span>
            <input className={styles.date_picker} style={{width:'220px'}} type='datetime-local' name="planned_at" required onChange={handleChange} step='300' min={format(new Date(), "yyyy-MM-dd") + "T" + format(new Date(), "HH:mm")}/>
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
          <div className={styles.flex_box}>
            <span className={styles.subtitle}>장소</span>

            {/* <div> */}
              <div className={styles.btn_wrap}>
                <label className={`form-check-label`}>
                  <input className={`form-check-input`} type='radio' name="online" value='0' required onChange={handleChange}/>
                  <span>오프라인</span>
                </label>
                <label className={`form-check-label`} style={{marginLeft:'25px'}}>
                  <input className={`form-check-input`} type='radio' name="online" value='1' required onChange={handleChange}/>
                  <span>온라인</span>
                </label>
              </div>
            {/* </div> */}
          </div>

          {/* 지역 */}
          {
            !challenge.online || challenge.online == '1' ? "" : 
              <div className={styles.flex_box} style={{marginTop: '10px'}}>
                <span className={styles.subtitle}></span>
                <input className={styles.area_input} type='text' name="area" required onChange={handleChange}/>
              </div>
          }

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

          {/* 성별 */}
          <div className={styles.flex_box}>
            <span className={styles.subtitle}>성별</span>

            <div className={styles.btn_wrap}>
              <label className={`form-check-label`}>
                <input className={`form-check-input`} type='radio' name="gender" value='0' required onChange={handleChange}/>
                <span>누구나</span>
              </label>
              <label className={`form-check-label`}>
                <input className={`form-check-input`} type='radio' name="gender" value='1' required onChange={handleChange}/>
                <span>남자만</span>
              </label>
              <label className={`form-check-label`}>
                <input className={`form-check-input`} type='radio' name="gender" value='2' required onChange={handleChange}/>
                <span>여자만</span>
              </label>
            </div>
          </div>

          {/* 나이 */}
          <div className={`${styles.flex_box} ${styles.age_wrap}`}>
            <span className={styles.subtitle}>나이</span>

            <select className={`form-select ${styles.age_select}`} name='age' onChange={handleChange}>
            {/* <select name='age' onChange={handleChange}> */}
              <option value={'0'} defaultValue>누구나</option>
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

          {/* 유형(선착순, 승인제) */}
          <div className={styles.flex_box}>
            <span className={styles.subtitle}>승인 후 참여</span>

            <div>
              <div className={styles.btn_wrap}>
                <label className={`form-check-label`}>
                  <input className={`form-check-input`} type='checkbox' name="type" value='1' required onChange={handleChange}/>
                  {/* <span>선착순</span> */}
                </label>
                {/* <label className={`form-check-label`} style={{marginLeft:'26px'}}>
                  <input className={`form-check-input`} type='radio' name="type" value='1' required onChange={handleChange}/>
                  <span>승인제</span>
                </label> */}
              </div>
            </div>
          </div>

        </div>
      {/* </form> */}
    </div>
  );
};

export default NewChallenge;