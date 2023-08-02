# [react Dockerfile]

# base image 설정(as build 로 완료된 파일을 밑에서 사용할 수 있다.)
FROM node:18-alpine as build

# 컨테이너 내부 작업 디렉토리 설정
WORKDIR /app

# app dependencies
# 컨테이너 내부로 package.json 파일들을 복사
COPY package.json .


# package.json 및 package-lock.json 파일에 명시된 의존성 패키지들을 설치
RUN npm install

# 호스트 머신의 현재 디렉토리 파일들을 컨테이너 내부로 전부 복사
COPY . .

CMD ["npm","start"]