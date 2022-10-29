import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ProfileEdit.module.css';
import axios from 'axios';
import { MenuTitle } from '../../components';

const ProfileEdit = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const [bio, setBio] = useState();

  const handleBio = (e) => {
    setBio(e.target.value);
    // console.log(bio);
  }

  const insertChanges = () => {
    // 이미지가 변경되었으면
    if(imageSrc){
      // console.log("update image");

      const form = new FormData();
      form.append("file", image);

      axios.post(`/mypage/update/photo/${user.id}`, form, {
        headers: {'Content-Type' : 'multipart/form-data'}
      })
      .then(res => {
        
      }).catch(err => console.log(err));
    }

    // 소개가 변경되었으면
    if(bio){
      // console.log("update bio");

      axios.post(`/mypage/update/bio/${user.id}`, {
        bio: bio
      })
      .then(res => {

      }).catch(err => console.log(err));
    }

    // 바뀐 유저 정보를 다시 받아와 localStorage에 저장
    axios.get(`/user/reload/${user.id}`)
    .then(res => {
      localStorage.removeItem("user");
      localStorage.setItem("user", JSON.stringify(res.data));
    }).catch(err => console.log(err));

    navigate("/profile");
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
    <div className={styles.profile_edit_wrap}>
      <MenuTitle title={"프로필 편집"} leftIcon={"arrow_back_ios"} rightButton={"완료"} visible={true} history={"profile"} handleSubmit={insertChanges}/>

      <div className={styles.wrap}>
        <div className={styles.photo_box}>
          <label for="upload">
            {
              !imageSrc && user.photo &&
              <img src={`/resources/user_photo/${user.photo}`} className={styles.photo} alt="" />
            }
            {
              !imageSrc && !user.photo &&
              <div className={styles.photo}>
                <span className={`material-icons ${styles.photo_icon}`}>person</span>
              </div>
            }
            {
              // 이미지 업로드 후 미리보기
              imageSrc && <img src={imageSrc} className={styles.preview} alt="" />
            }
          </label>
          
          {/* 숨겨진 태그 */}
          <input type='file' name='photo' id='upload' className={styles.hidden} onChange={(e) => {
            encodeFileToBase64(e.target.files[0]);
            handleImage(e);
          }}/>
        </div>

        <div className={styles.bio_box}>
          <div className={styles.subtitle}>소개</div>
          <textarea defaultValue={user.bio} onChange={(e) => handleBio(e)}></textarea>
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;