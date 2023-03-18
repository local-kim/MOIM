import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ProfileEdit.module.css';
import axios from 'axios';
import { MenuTitle } from '../../components';

const hobbyList = ['러닝', '등산', '산책', '헬스', '수영', '테니스', '배드민턴', '자전거', '요가', '클라이밍', '볼링', '플로깅', '골프', '서핑', '농구', '축구', '보드', '스키'];

const ProfileEdit = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const [submit, setSubmit] = useState(false);

  const [userInfo, setUserInfo] = useState({});
  const [bio, setBio] = useState();
  const [hobbyCodes, setHobbyCodes] = useState(new Set());

  // textarea 크기 자동 조절
  const textRef = useRef();
  const handleResizeHeight = useCallback((e) => {
    // setContent(e.target.value);
    handleBio(e);

    // 최소 높이(2줄)
    textRef.current.style.height = '68px';
    textRef.current.style.height = textRef.current.scrollHeight + "px";
  }, []);

  useEffect(() => {
    axios.get(`/api/mypage/user/${user.id}`)
    .then(res => {
      // console.log(res.data);
      setUserInfo(
        {
          ...res.data,
          hobbyCodes: new Set(res.data.hobbyCodes)
        }
      );
      setBio(res.data.bio);
      setHobbyCodes(new Set(res.data.hobbyCodes));
    }).catch(err => console.log(err));
  }, []);

  useEffect(() => {
    // 가져온 bio 높이에 맞춰 textarea 초기 높이 설정
    textRef.current.style.height = textRef.current.scrollHeight + "px";
  }, [userInfo]);

  const handleBio = (e) => {
    if(e.target.value){
      setBio(e.target.value);
    }
    else{
      setBio(null);
    }
    console.log(bio);
  }

  const handleHobby = (i, selected) => {
    if(selected){
      hobbyCodes.delete(i);
      setHobbyCodes(new Set(hobbyCodes));
    }
    else{
      hobbyCodes.add(i);
      setHobbyCodes(new Set(hobbyCodes, i));
    }
    // console.log(hobbyCodes);
    // console.log(userInfo.hobbyCodes);
  }

  const insertChanges = () => {
    return new Promise((resolve, reject) => {
        const form = new FormData();

        if(image){
          form.append("file", image);
        }

        if(userInfo.bio != bio){
          form.append("bio", bio);
        }

        if(!compareSets(userInfo.hobbyCodes, hobbyCodes)){
          form.append("hobbyCodes", new Blob([JSON.stringify([...hobbyCodes])], {
            type: "application/json"
          }));
        }
        
        axios.post(`/api/mypage/update/profile/${user.id}`, form, {
          headers: {'Content-Type' : 'multipart/form-data'}
        })
        .then(res => {
          navigate("/profile");
        }).catch(err => console.log(err));
    })
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

  const compareSets = (s1, s2) => {
    if(!s1 || !s2) 
      return false; 

    if(s1.size !== s2.size)
      return false;

    for(var a of s1)
      if(!s2.has(a))
        return false;

    return true;
  }

  useEffect(() => {
    // 제출 가능 여부 확인(변경 사항이 있을 때만)
    if(imageSrc || userInfo.bio != bio || !compareSets(userInfo.hobbyCodes, hobbyCodes)){
      setSubmit(true);
    }
    else{
      setSubmit(false);
    }
  }, [hobbyCodes, bio, imageSrc]);

  return (
    <div className={styles.profile_edit_wrap}>
      <div className={styles.menu_title}>
        <span className={`material-icons ${styles.left_icon}`} onClick={() => navigate(-1)}>arrow_back_ios</span>
        <div className={styles.title}>프로필 편집</div>
        {
          submit ? <button type="button" className={styles.submit_btn} onClick={insertChanges}>완료</button> : <button type="button" className={styles.disabled_submit_btn}>완료</button>
        }
      </div>

      <div className={styles.wrap}>
        <div className={styles.photo_box}>
          <label for="upload">
            {
              !imageSrc && userInfo.photo &&
              <img src={`/resources/user_photo/${userInfo.photo}`} className={styles.photo} alt="" />
            }
            {
              !imageSrc && !userInfo.photo &&
              <div className={styles.no_photo}>
                <span className={`material-icons ${styles.photo_icon}`}>person</span>
              </div>
            }
            {
              // 이미지 업로드 후 미리보기
              imageSrc && <img src={imageSrc} className={styles.preview} alt="" />
            }
          </label>
          
          {/* 숨겨진 태그 */}
          <input type='file' name='photo' id='upload' className={styles.hidden} accept="image/*" onChange={(e) => {
            encodeFileToBase64(e.target.files[0]);
            handleImage(e);
          }}/>
        </div>

        {/* 소개 */}
        <div className={styles.bio_box}>
          <div className={styles.subtitle}>소개</div>
          <textarea defaultValue={userInfo.bio} ref={textRef} onChange={handleResizeHeight}></textarea>
        </div>

        {/* 관심사 */}
        <div className={styles.hobby_box}>
          <div className={styles.subtitle}>관심사</div>
          <div className={styles.hobby_btn_wrap}>
            {
              hobbyCodes && hobbyList.map((hobby, index) => (
                hobbyCodes.has(index + 1) ?
                <div className={`${styles.hobby_btn} ${styles.selected}`} onClick={() => handleHobby(index + 1, true)} key={index + 1}>{hobby}</div> :
                <div className={`${styles.hobby_btn}`} onClick={() => handleHobby(index + 1, false)} key={index + 1}>{hobby}</div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;