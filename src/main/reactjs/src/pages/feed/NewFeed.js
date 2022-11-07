import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './feed.module.css';

const NewFeed = () => {
  const navigate = useNavigate();

  const [hashtags, setHashtags] = useState([]);

  const addHashtag = (e) => {
    if(e.key === 'Enter'){
      setHashtags([
        ...hashtags,
        e.target.value
      ]);

      e.target.value = '';
    }
  }

  const createFeed = () => {

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

  const [detailImgs, setDetailImgs] = useState();

  const handleImageUpload = (e) => {
    const fileArr = e.target.files;

    let fileURLs = [];
   
    let file;
    let filesLength = fileArr.length > 10 ? 10 : fileArr.length;

    for (let i = 0; i < filesLength; i++) {
      file = fileArr[i];
    
      let reader = new FileReader();
      reader.onload = () => {
        console.log(reader.result);
        fileURLs[i] = reader.result;
        setDetailImgs([...fileURLs]);
      };
      reader.readAsDataURL(file);
    }

  };

  return (
    <div className={styles.new_feed}>
      <div className={styles.menu_title}>
        <span className={`material-icons ${styles.left_icon}`} onClick={() => navigate(-1)}>close</span>
        <div className={styles.title}>새 피드 작성</div>
        <button type="button" className={styles.submit_btn} onClick={createFeed}>완료</button>
      </div>

      <div className={styles.wrap}>

        {/* 사진 추가 칸 */}
        <div className={styles.photo_wrap}>
          <label for="upload">
            <div className={styles.add_photo_box}>
              <span className={`material-icons-outlined ${styles.photo_btn}`}>add_photo_alternate</span>
            </div>
          </label>

          <input type='file' name='photo' id='upload' className={styles.hidden} multiple required onChange={handleImageUpload} />

          {
            // 이미지 업로드 후 미리보기
            detailImgs && detailImgs.map((img, idx) => 
              <div className={styles.preview} style={{backgroundImage: `url(${img})`}}>
                {/* <img src={img} alt="" /> */}
                <span className={`material-icons ${styles.delete_btn}`}>cancel</span>
              </div>
            )
          }
        </div>

        <textarea placeholder='오늘은 무엇을 하셨나요?' className={styles.content}></textarea>

        <div>
          <div className={styles.subtitle}>#태그</div>

          <input type='text' onKeyUp={addHashtag}/>

          {
            hashtags && hashtags.map((tag, idx) => (
              <div className={styles.tag}>{tag}</div>
            ))
          }
        </div>

        {/* <div>
          <div className={styles.subtitle}>@사람</div>
        </div> */}

        <div>
          {/* <div className={styles.subtitle}>추가 기능</div> */}
          <div className={styles.subtitle}>몸무게</div>
            <div className={styles.input_wrap}>
              <input className={styles.narrow_input} type='number' name="weight" />
              <span>kg</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default NewFeed;