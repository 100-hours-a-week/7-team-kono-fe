<a href="https://playcono.com/" target="_blank">
<img src="https://github.com/100-hours-a-week/7-team-kono-fe/blob/develop/assets/1.png" alt="KONO 배너" width="100%"/>
</a>

<br/>
<br/>

# 1. Project Overview (프로젝트 개요)

> 코노(KONO)는 ‘코인 노리터’의 줄임말로, 가상의 자산으로 실시간 암호화폐 거래를 체험할 수 있는 코인 모의투자 서비스입니다.  
> 사용자는 실제 자금을 투입하지 않고도 다양한 코인을 사고팔며 투자 감각을 키울 수 있으며,  
> 이를 통해 **무지성 투자, 높은 진입 장벽, 실거래 위험성** 등 기존 암호화폐 시장의 문제를 안전하게 학습 환경에서 극복할 수 있습니다.

## 서비스 핵심 기능

- **코인 탐색**: 163개 코인의 실시간 시세 제공 및 정렬
- **유저 포트폴리오**: 수익률 시각화 및 보유 코인 리스트 제공
  <img src="https://github.com/100-hours-a-week/7-team-kono-fe/blob/develop/assets/2.png" width="100%"/>
- **코인 상세**: 시세, 차트, 시가·고가·저가 등 정보 제공
- **코인 매매**: 가입 시 가상 자산 1000만원 지급, 실시간 시세 기반 거래
- **관심 종목**: 빠른 접근 및 실시간 시세 확인
  <img src="https://github.com/100-hours-a-week/7-team-kono-fe/blob/develop/assets/3.png" width="100%"/>
- **전체/일간 랭킹**: 투자 성과를 기준으로 순위화
  <img src="https://github.com/100-hours-a-week/7-team-kono-fe/blob/develop/assets/4.png" width="100%"/>

<br/>
<br/>

# 2. Team Members (팀원 및 팀 소개)

<div align="center">
<table>
  <tr>
    <td align="center">
      <img src="https://github.com/hyogshin.png" width="100" style="aspect-ratio: 1 / 1; object-fit: cover; border-radius: 50%;"/><br/>
      <b><a href="https://github.com/hyogshin">Hayden</a></b>
    </td>
    <td align="center">
      <img src="https://github.com/from-minju.png" width="100" style="aspect-ratio: 1 / 1; object-fit: cover; border-radius: 50%;"/><br/>
      <b><a href="https://github.com/from-minju">Jenny</a></b>
    </td>
    <td align="center">
      <img src="https://github.com/keen1014.png" width="100" style="aspect-ratio: 1 / 1; object-fit: cover; border-radius: 50%;"/><br/>
      <b><a href="https://github.com/keen1014">Keen</a></b>
    </td>
    <td align="center">
      <img src="https://github.com/yosep98.png" width="100" style="aspect-ratio: 1 / 1; object-fit: cover; border-radius: 50%;"/><br/>
      <b><a href="https://github.com/yosep98">Sep</a></b>
    </td>
    <td align="center">
      <img src="https://github.com/availrum.png" width="100" style="aspect-ratio: 1 / 1; object-fit: cover; border-radius: 50%;"/><br/>
      <b><a href="https://github.com/availrum">June</a></b>
    </td>
  </tr>
  <tr>
    <td align="center">FE | DevOps | PM</td>
    <td align="center">BE</td>
    <td align="center">Fullstack</td>
    <td align="center">BE</td>
    <td align="center">DevOps</td>
  </tr>
  <tr>
    <td align="center">WebSocket 기반 시세 수집,<br/>프론트 구현</td>
    <td align="center">랭킹 API,<br/>Redis 캐싱</td>
    <td align="center">매수/매도 로직,<br/>API 연동</td>
    <td align="center">OAuth2,<br/>Presigned URL,<br/>RateLimit</td>
    <td align="center">CI/CD,<br/>Docker,<br/>Grafana</td>
  </tr>
</table>
</div>

<br/>
<br/>

# 3. Development Workflow

- 1차 스프린트: 기획, 설계 (화면/ERD/API 명세)
- 2차 스프린트: MVP 개발, 환경 세팅
- 3차 스프린트: 출시, 성능 개선
- 4차 스프린트: 모의 투자 대회 이벤트 운영, 사용자 피드백 반영

<br/>

# 4. Stacks

<div align=center> 
  <img src="https://img.shields.io/badge/java-007396?style=for-the-badge&logo=java&logoColor=white"> 
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> 
  <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
  <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> 
  <img src="https://img.shields.io/badge/spring boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white"> 
  <img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white"> 
  <img src="https://img.shields.io/badge/redis-DC382D?style=for-the-badge&logo=redis&logoColor=white">
  <img src="https://img.shields.io/badge/amazon aws-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white">
  <img src="https://img.shields.io/badge/github actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white">
  <img src="https://img.shields.io/badge/prometheus-E6522C?style=for-the-badge&logo=prometheus&logoColor=white">
  <img src="https://img.shields.io/badge/grafana-F46800?style=for-the-badge&logo=grafana&logoColor=white">
</div>

<br/>

# 5. Commit Convention

| 타입     | 설명                                             |
| -------- | ------------------------------------------------ |
| feat     | 기능 추가                                        |
| fix      | 버그 수정                                        |
| docs     | 문서                                             |
| style    | 스타일 변경                                      |
| refactor | 기능변화가 아닌 코드 리팩토링 ex. 변수 이름 변경 |
| chore    | 설정, 배포                                       |
| build    | 빌드 관련 수정                                   |
| test     | 테스트 코드 추가/수정                            |
