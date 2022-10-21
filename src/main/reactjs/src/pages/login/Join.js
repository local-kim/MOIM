import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

const Join = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: '',
    password: '',
    nickname: '',
    gender: '',
    age: '',
    goal: '',
    height: '',
    weight: '',
    title: '',
    content: ''
  })

  const handleChange = (e) => {
    const {name, value} = e.target;

    // 이벤트 발생한 name이 pass일 경우 무조건 passOk는 false
    // if(name === 'pass')
    //   setPassOk(false);

    setUser({
      ...user,
      [name]: value
    });

    // console.log(user);
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

      <form onSubmit={joinUser}>
        <table>
          <tbody>
            <tr>
              <th>E-mail</th>
              <td>
                <input type='email' name='email' required onChange={handleChange}/>
              </td>
            </tr>
            <tr>
              <th>Password</th>
              <td>
                <input type='password' name="password" required onChange={handleChange}/>
                {/* <span style={{width:'2%',display:'inline-block'}}></span>
                <input type='password' required placeholder="Check password" onChange={onPassChange}/>
                <b style={{marginLeft:'15px',color:'red'}}>{passOk ? 'OK' : ''}</b> */}
              </td>
            </tr>
            <tr>
              <th>Nickname</th>
              <td>
                <input type='text' name="nickname" required onChange={handleChange}/>
              </td>
            </tr>
            <tr>
              <th>성별</th>
              <td>
                <label>
                  <input type='radio' name="gender" value='0' required onChange={handleChange}/>남성
                </label>
                <label>
                  <input type='radio' name="gender" value='1' required onChange={handleChange}/>여성
                </label>
              </td>
            </tr>
            <tr>
              <th>나이</th>
              <td>
                <input type='number' name="age" required onChange={handleChange}/>세
              </td>
            </tr>
            <tr>
              <th>목표</th>
              <td>
                <label>
                  <input type='radio' name="goal" value='0' required onChange={handleChange}/>다이어트
                </label>
                <label>
                  <input type='radio' name="goal" value='1' required onChange={handleChange}/>근력증가
                </label>
                <label>
                  <input type='radio' name="goal" value='2' required onChange={handleChange}/>기타
                </label>
              </td>
            </tr>
            <tr>
              <th>키</th>
              <td>
                <input type='number' name="height" required onChange={handleChange}/>cm
              </td>
            </tr>
            <tr>
              <th>몸무게</th>
              <td>
                <input type='number' name="weight" required onChange={handleChange}/>kg
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