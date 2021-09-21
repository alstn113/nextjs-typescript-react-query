npx create-next-app 이름 --ts

      npm i react-query axios
      npm i -D @types/node @types/react-dom ts-node

\_app.tsx 설정

ts.config.json에서 내용 추가

public 빼고 다 src에 넣기
.env, .env.example, .prettierrc.json 추가

eslint & prettier 설정 참고 출처
https://velog.io/@arin00pro/Nextjs-%EC%8B%9C%EB%A6%AC%EC%A6%88-2.-eslint%EC%99%80-prettier-%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0

      npm info "eslint-config-airbnb@latest" peerDependencies로 뭐 설치 목록 확인
      npm i -D eslint prettier eslint-plugin-prettier eslint-config-prettier eslint-plugin-import
      npm i -D eslint-plugin-react eslint-plugin-react-hooks @typescript-eslint/parser @typescript-eslint/eslint-plugin

emotion 설정

      npm i @emotion/react @emotion/styled emotion-reset
      npm i -D @emotion/babel-plugin

\_app.tsx 설정
.babelrc 설정

react-hook-form 사용
typescript 에러 때문에 버전 정해서 쓰기

      npm i react-hook-form@^7.11.1 yup@^0.32.9 @hookform/resolvers@^2.6.1
