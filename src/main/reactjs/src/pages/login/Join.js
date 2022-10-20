import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

const Join = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    id: '',
    password: '',
    nickname: '',
    email: '',
    gender: '',
    age: '',
    goal: '',
    height: '',
    weight: '',
    title: '',
    content: ''
  })

  const onDataChange = (e) => {
    const {name, value} = e.target;

    // 이벤트 발생한 name이 pass일 경우 무조건 passOk는 false
    // if(name === 'pass')
    //   setPassOk(false);

    setUser({
      ...user,
      [name]: value
    });

    console.log(user);
  }

  const joinUser = (e) => {
    e.preventDefault();
    
    axios.post('/user/join', user)
    .then(res => {
      console.log('회원가입 성공');
      navigate("/login");
    }).catch(err => console.log(err));
  }

  return (
    <div>
      <h1>회원가입</h1>

      <form className="form-inline" onSubmit={joinUser}>
        <table>
          <tbody>
            <tr>
              <th>아이디</th>
              <td>
                <input type='text' name='id' onChange={onDataChange} required />
              </td>
            </tr>
            <tr>
              <th>Password</th>
              <td>
                <input type='password' name="password" required onChange={onDataChange}/>
                {/* <span style={{width:'2%',display:'inline-block'}}></span>
                <input type='password' required placeholder="Check password" onChange={onPassChange}/>
                <b style={{marginLeft:'15px',color:'red'}}>{passOk ? 'OK' : ''}</b> */}
              </td>
            </tr>
            <tr>
              <th>Nickname</th>
              <td>
                <input type='text' name="nickname" required onChange={onDataChange}/>
              </td>
            </tr>
            <tr>
              <th>E-mail</th>
              <td>
                <input type='email' name='email' required onChange={onDataChange}/>
              </td>
            </tr>
            <tr>
              <th>성별</th>
              <td>
                <label>
                  <input type='radio' name="gender" value='0' required onChange={onDataChange}/>남성
                </label>
                <label>
                  <input type='radio' name="gender" value='1' required onChange={onDataChange}/>여성
                </label>
              </td>
            </tr>
            <tr>
              <th>나이</th>
              <td>
                <input type='number' name="age" required onChange={onDataChange}/>세
              </td>
            </tr>
            <tr>
              <th>목표</th>
              <td>
                <label>
                  <input type='radio' name="goal" value='0' required onChange={onDataChange}/>다이어트
                </label>
                <label>
                  <input type='radio' name="goal" value='1' required onChange={onDataChange}/>근력증가
                </label>
                <label>
                  <input type='radio' name="goal" value='2' required onChange={onDataChange}/>기타
                </label>
              </td>
            </tr>
            <tr>
              <th>키</th>
              <td>
                <input type='number' name="height" required onChange={onDataChange}/>cm
              </td>
            </tr>
            <tr>
              <th>몸무게</th>
              <td>
                <input type='number' name="weight" required onChange={onDataChange}/>kg
              </td>
            </tr>
            <tr>
              <td colSpan='2'>
                <button type="submit">가입하기</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default Join;