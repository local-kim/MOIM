import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './feed.module.css';
import Hashtags from './Hashtags';
import axios from 'axios';

const NewFeed = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [submit, setSubmit] = useState(false);

  const [content, setContent] = useState();
  const [tags, setTags] = useState([]);
  const [weight, setWeight] = useState();

  // const addHashtag = (e) => {
  //   if(e.target.value && e.target.value != ''){
  //     if(e.key === 'Enter'){
  //       setHashtags([
  //         ...hashtags,
  //         e.target.value
  //       ]);

  //       e.target.value = '';
  //     }
  //   }
  // }

  const createFeed = () => {
    // console.log(images);
    // console.log(content);
    // console.log(tags.map((tag, idx) => tag.value));
    // console.log(weight);

    const form = new FormData();

    for(let i = 0; i < images.length; i++){
      form.append("files", images[i]);
    }
    
    form.append("data", new Blob([JSON.stringify({
      user_id: user.id,
      content: content,
      tags: tags.map(tag => tag.value),
      weight: weight
    })], {
      type: "application/json"
    }));

    axios.post('/api/feed', form, {
      headers: {'Content-Type' : 'multipart/form-data'}
    })
    .then(res => {
      // console.log("feed id: " + res.data);
      navigate(`/feed/${res.data}`, {replace: true});
    }).catch(err => console.log(err));
  }

  // 이미지 업로드
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);

  const handleImageUpload = (e) => {
    if(images.length + e.target.files.length > 10){
      alert("사진은 최대 10장까지 첨부 가능합니다.");
    }

    setImages([...images, ...e.target.files].slice(0, 10));

    let fileURLs = [];

    for (let i = 0; i < e.target.files.length; i++){
      let reader = new FileReader();
      reader.onload = () => {
        // console.log(reader.result);
        fileURLs[i] = reader.result;
        setPreviews([...previews, ...fileURLs].slice(0, 10));
      };
      reader.readAsDataURL(e.target.files[i]);
    }
  };

  // 사진 삭제
  const removeImage = (idx) => {
    // console.log(idx);
    // 미리보기와 업로드 파일에서 모두 제거
    setPreviews(previews.filter((_, i) => i != idx));
    setImages([...images].filter((_, i) => i != idx));
  }

  // textarea 크기 자동 조절
  const textRef = useRef();
  const handleResizeHeight = useCallback((e) => {
    setContent(e.target.value);
    textRef.current.style.height = '44px';
    textRef.current.style.height = textRef.current.scrollHeight + "px";
  }, []);

  useEffect(() => {
    // 제출 가능 여부 확인
    if(images && images.length > 0 && content){
      setSubmit(true);
    }
    else{
      setSubmit(false);
    }
  }, [content, images]);

  return (
    <div className={styles.new_feed}>
      <div className={styles.menu_title}>
        <span className={`material-icons ${styles.left_icon}`} onClick={() => navigate(-1)}>close</span>
        <div className={styles.title}>피드 작성하기</div>
        {
          submit ? <button type="button" className={styles.submit_btn} onClick={createFeed}>완료</button> : <button type="button" className={styles.disabled_submit_btn}>완료</button>
        }
      </div>

      <div className={styles.wrap}>

        {/* 사진 추가 칸 */}
        <div className={styles.photo_wrap}>
          <label for="upload">
            <div className={styles.add_photo_box}>
              <span className={`material-icons-outlined ${styles.photo_btn}`}>add_photo_alternate</span>
            </div>
          </label>

          <input type='file' name='photo' id='upload' className={styles.hidden} accept="image/*" multiple required onChange={handleImageUpload} />

          {
            // 이미지 업로드 후 미리보기
            previews && previews.map((img, idx) => 
              <div className={styles.preview} style={{backgroundImage: `url(${img})`}} key={idx}>
                {/* <img src={img} alt="" /> */}
                <span className={`material-icons ${styles.delete_btn}`} onClick={() => removeImage(idx)}>cancel</span>
              </div>
            )
          }
        </div>

        <textarea placeholder='오늘은 무엇을 하셨나요?' className={styles.content} ref={textRef} onChange={handleResizeHeight} rows='1'></textarea>

        <div className={styles.tag_box}>
          <div className={styles.subtitle}>#태그</div>

          <Hashtags setTags={setTags}/>

          {/* <div className={styles.tag_wrap}>
            {
              hashtags && hashtags.map((tag, idx) => (
                <div className={styles.tag}>{tag}</div>
              ))
            }

            <div className={styles.tag_input_wrap}>
              <span>#</span>
              <input type='text' onKeyUp={addHashtag} className={styles.tag_input} />
            </div>
          </div> */}
        </div>

        {/* <div>
          <div className={styles.subtitle}>@사람</div>
        </div> */}

        <div className={styles.weight_wrap}>
          {/* <div className={styles.subtitle}>추가 기능</div> */}
          <div className={styles.subtitle}>몸무게</div>
          <div className={styles.input_wrap}>
            <input className={styles.narrow_input} type='number' name="weight" onChange={(e) => setWeight(e.target.value)}/>
            <span>kg</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewFeed;