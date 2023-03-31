# MOIM
<br>

> 챌린지를 같이 할 사람을 모으고, 챌린지에 참여하는 건강관리 모바일 웹 서비스

<br>

### Website
http://54.180.90.103:8080/
 (모바일에 최적화 되어있습니다!)

### Features
* 챌린지를 만들어 함께할 사람 모으기
* 내가 관심 있는 챌린지를 검색하고, 저장하고, 참여하기
* 사진, 태그와 함께 피드를 작성해 일상 공유하기
* 달라진 내 몸무게를 기록하여 그래프로 한 눈에 확인하기
* 내 건강 관리에 도움을 주는 건강 점수와 코멘트

### Database
<p align="center"><img width="100%" alt="" src="https://user-images.githubusercontent.com/63040140/229143677-d6c7290c-8205-4374-8955-36096cf7b842.png"></p>

### Tools
* Server<br>
<a href="" target="_blank"><img src="https://img.shields.io/badge/Spring Boot-6DB33F?style=for-the-badge&logo=Spring Boot&logoColor=white"/></a>
<a href="" target="_blank"><img src="https://img.shields.io/badge/SPRING DATA JPA-BFAF7E?style=for-the-badge&logo=Hibernate&logoColor=white"/></a>
<a href="" target="_blank"><img src="https://img.shields.io/badge/Gradle-02303A?style=for-the-badge&logo=Gradle&logoColor=white"/></a>
<a href="" target="_blank"><img src="https://img.shields.io/badge/JAVA-007396?style=for-the-badge&logo=JAVA&logoColor=white"/></a>

* Client<br>
<a href="" target="_blank"><img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white"/></a>
<a href="" target="_blank"><img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white"/></a>
<a href="" target="_blank"><img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white"/></a>

* Deployment<br>
<a href="" target="_blank"><img src="https://img.shields.io/badge/Amazon EC2-FF9900?style=for-the-badge&logo=Amazon EC2&logoColor=white"/></a>
<a href="" target="_blank"><img src="https://img.shields.io/badge/Amazon RDS-527FFF?style=for-the-badge&logo=Amazon RDS&logoColor=white"/></a>
<a href="" target="_blank"><img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=MySQL&logoColor=white"/></a>
<br>

## DEMO
![1](https://user-images.githubusercontent.com/63040140/227863060-b5d74ecb-5f01-442d-b935-2f4ee05418ee.png)
* 챌린지 목록
* 운동 카테고리별 필터링
* 저장한 챌린지 목록
<br>

![2](https://user-images.githubusercontent.com/63040140/227863078-f67298fe-b143-4316-85d2-94ed184abd33.png)
* 키워드로 챌린지 검색
* 챌린지 개설하기
<br>

![3 (1)](https://user-images.githubusercontent.com/63040140/227862922-b4bf3258-2a38-46e4-b51c-6b63aaae1536.png)
* 챌린지 상세보기 : 저장하기, 참여한 유저, 댓글
* 개설자 : 모집 중, 모집 완료, 종료 → 3가지 상태
* 참여자 : 참여하기(선착순), 참여 신청(승인제), 승인 대기, 참여 중(참여 취소), 모집 완료, 종료 → 6가지 상태
<br>

![4](https://user-images.githubusercontent.com/63040140/227863106-d5017a30-9e4f-461b-ba33-33db254164be.png)
* 프로필: 프로필 사진, 닉네임, 소개, 관심사
* 피드 목록
* 개설한 챌린지 : 모집 중, 모집 완료, 종료 → 3가지 상태
* 참여한 챌린지 : 성공, 예정 → 2가지 상태
<br>

![5 (1)](https://user-images.githubusercontent.com/63040140/227862932-9e40863f-ac9d-45d0-887e-a4b30609dc65.png)
* 피드 상세보기 : 좋아요, 댓글, 링크 공유
* 피드 작성하기 : 사진, 태그, 몸무게 추가
<br>

![6 (1)](https://user-images.githubusercontent.com/63040140/227872275-8239b499-e729-4782-8d04-f1274d0001ba.png)
* 프로필 편집
* 알림 : 챌린지 관련 알림, 승인제 챌린지의 참여신청 수락/거절, 피드 관련 알림
* 리포트 : 건강점수, 코멘트, 몸무게 변화 그래프
<br>

![7 (1)](https://user-images.githubusercontent.com/63040140/227872341-80bd84cd-5410-41db-9c3f-5a72290b20e9.png)
* 메인화면 : 로그인 상태 → 챌린지 목록 페이지로 이동, 로그아웃 상태 → 로그인 페이지로 이동
* 로그인
* 회원가입
<br>

![8 (1)](https://user-images.githubusercontent.com/63040140/227872388-fb2c9260-138c-415d-9f69-91b2012f8eef.png)
* 이메일 중복 체크
