import React, { useState } from 'react';
import styles from './ProfileEdit.module.css';

const ProfileEdit = () => {
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
      <div className={styles.title_box}>
        <div><span className={`material-icons ${styles.back_icon}`}>arrow_back_ios</span></div>
        <div className={styles.title}>프로필 편집</div>
        <div>완료</div>
      </div>

      <div className={styles.photo_box}>
        <label for="upload">
          {
            !imageSrc && 
            <div className={styles.photo}>
              <span className={`material-icons ${styles.photo_icon}`}>person</span>
            </div>
          }
          {
            // 이미지 업로드 후 미리보기
            imageSrc && <img src={imageSrc} className={styles.preview} alt="미리보기" />
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
        <textarea></textarea>
      </div>
    </div>
  );
};

export default ProfileEdit;