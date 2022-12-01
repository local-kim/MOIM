import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ProfileEdit.module.css';
import axios from 'axios';
import { MenuTitle } from '../../components';

const ProfileEdit = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const [submit, setSubmit] = useState(false);

  const [userInfo, setUserInfo] = useState({});
  const [bio, setBio] = useState();

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
      setUserInfo(res.data);
    }).catch(err => console.log(err));
  }, []);

  useEffect(() => {
    // 가져온 bio 높이에 맞춰 textarea 초기 높이 설정
    textRef.current.style.height = textRef.current.scrollHeight + "px";
  }, [userInfo]);

  const handleBio = (e) => {
    setBio(e.target.value);
    // console.log(bio);
  }

  const insertChanges = () => {
    return new Promise((resolve, reject) => {
      if(imageSrc && userInfo.bio != bio){
        const form = new FormData();
        form.append("file", image);

        axios.post(`/api/mypage/update/photo/${user.id}`, form, {
          headers: {'Content-Type' : 'multipart/form-data'}
        })
        .then(res => {
          axios.post(`/api/mypage/update/bio/${user.id}`, {
            bio: bio
          })
          .then(res => {
            navigate("/profile");
          }).catch(err => console.log(err));
        }).catch(err => console.log(err));
      }

      // 이미지가 변경되었으면
      else if(imageSrc){
        const form = new FormData();
        form.append("file", image);

        axios.post(`/api/mypage/update/photo/${user.id}`, form, {
          headers: {'Content-Type' : 'multipart/form-data'}
        })
        .then(res => {
          navigate("/profile");
        }).catch(err => console.log(err));
      }

      // 소개가 변경되었으면
      else if(userInfo.bio != bio){
        axios.post(`/api/mypage/update/bio/${user.id}`, {
          bio: bio
        })
        .then(res => {
          navigate("/profile");
        }).catch(err => console.log(err));
      }

      else{
        navigate("/profile");
      }
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

  useEffect(() => {
    // 제출 가능 여부 확인(변경 사항이 있을 때만)
    if(imageSrc || userInfo.bio != bio){
      setSubmit(true);
    }
    else{
      setSubmit(false);
    }
  }, [bio, imageSrc]);

  return (
    <div className={styles.profile_edit_wrap}>
      {/* <MenuTitle title={"프로필 편집"} leftIcon={"arrow_back_ios"} rightButton={"완료"} visible={true} history={"profile"} handleSubmit={insertChanges}/> */}

      <div className={styles.menu_title}>
        <span className={`material-icons ${styles.left_icon}`} onClick={() => navigate(-1)}>arrow_back_ios</span>
        <div className={styles.title}>프로필 편집</div>
        {/* <button type="button" className={styles.submit_btn} onClick={insertChanges}>완료</button> */}
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

        <div className={styles.bio_box}>
          <div className={styles.subtitle}>소개</div>
          <textarea defaultValue={userInfo.bio} ref={textRef} onChange={handleResizeHeight}></textarea>
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;