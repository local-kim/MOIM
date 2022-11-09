import React, { useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './feed.module.css';
import Hashtags from './Hashtags';
import axios from 'axios';

const NewFeed = () => {
  const navigate = useNavigate();

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
    console.log(images);
    console.log(content);
    console.log(tags.map((tag, idx) => tag.value));
    console.log(weight);

    const form = new FormData();
    form.append("file", images);
    // form.append("data", new Blob([JSON.stringify({
    //   content: content,
    //   tags: tags.map((tag, idx) => tag.value),
    //   weight: weight
    // })], {
    //   type: "application/json"
    // }));

    axios.post('/feed/new', form, {
      headers: {'Content-Type' : 'multipart/form-data'}
    })
    .then(res => {
      // console.log("challenge id: " + res.data);
      // navigate(`/lounge/${res.data}`, {replace: true});
    }).catch(err => console.log(err));
  }

  // 이미지 미리보기
  // const [imageSrc, setImageSrc] = useState('');

  // const encodeFileToBase64 = (fileBlob) => {
  //   const reader = new FileReader();
  //   reader.readAsDataURL(fileBlob);

  //   return new Promise((resolve) => {
  //     reader.onload = () => {
  //       setImageSrc(reader.result);
  //       resolve();
  //     };
  //   });
  // };

  // 이미지 업로드
  const [images, setImages] = useState();
  // const handleImage = (e) => {
  //   setImages(e.target.files[0]);
  // }

  const [previewImgs, setPreviewImgs] = useState();

  const handleImageUpload = (e) => {
    setImages(e.target.files);

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
        setPreviewImgs([...fileURLs]);
      };
      reader.readAsDataURL(file);
    }
  };

  // textarea 크기 자동 조절
  const textRef = useRef();
  const handleResizeHeight = useCallback((e) => {
    setContent(e.target.value);
    textRef.current.style.height = '44px';
    textRef.current.style.height = textRef.current.scrollHeight + "px";
  }, []);

  const handleContent = (e) => {
  }

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
            previewImgs && previewImgs.map((img, idx) => 
              <div className={styles.preview} style={{backgroundImage: `url(${img})`}}>
                {/* <img src={img} alt="" /> */}
                <span className={`material-icons ${styles.delete_btn}`}>cancel</span>
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