# 기술스택

* Node.js
* Express
* Typescript

# 개발 환경 설정

## 1. [Express 애플리케이션 생성기](https://expressjs.com/ko/starter/generator.html)

Express 애플리케이션 생성기로 애플리케이션의 골격을 만들었다.

```bash
$ npm install express-generator -g
```

`back`이라는 어플리케이션을 만들기 위해 프로젝트 폴더에서 다음과 같이 작성한다.

```bash
multicampus@DESKTOP-KVCQHCD MINGW64 ~/Desktop/perfume (hj)
$ express --view=pug back
```

이후 `back` 폴더에서 종속 항목을 설치한다.

```bash
$ cd back
$ npm i
```

## 2. 개발 언어 Typescript로 설정하기

> Do it! 타입스크립트 프로그래밍 참조

타입스크립트 프로젝트는 보통 typescript와 ts-node 패키지를 설치한다. 

* tsc : 타입스크립트 컴파일러. 타입스크립트 코드를 ES5 형식의 자바스크립트 코드로 변환만 해줌
* ts-node : 타입스크립트 코드를 ES5로 변환하고 실행까지 동시에 해줌

`npm i`로 패키지를 설치할 때 다음과 같은 두 가지 옵션을 줄 수 있다.

| `npm i` 옵션 | 의미                                                         | 단축 명령 |
| ------------ | ------------------------------------------------------------ | --------- |
| `--save`     | 프로젝트를 실행할 때 필요한 패키지로 설치한다. 패키지 정보가 `package.json` 파일의 `dependencies` 항목에 등록된다. | `-S`      |
| `--save-D`   | 프로젝트를 개발할 때만 필요한 패키지로 설치한다. 패키지 정보가 `package.json` 파일의 `devDependencies` 항목에 등록된다. | `-D`      |

Typescript와 ts-node는 프로젝트를 개발할 때만 필요하므로 다음과 같이 설치한다. *띄어쓰기로 구분하여 두 개 이상의 패키지를 설치할 수 있다.*

```bash
$ npm i -D typescript ts-node
```

> 타입스크립트는 ESNext 자바스크립트 문법을 포함하고 있지만, 자바스크립트와는 완전히 다른 언어이다. 때문에 자바스크립트로 개발된 chance, ramda와 같은 라이브러리들은 추가로 @types/chance, @types/ramda와 같은 타입 라이브러리들을 제공해야 한다. @types/가 앞에 붙는 타입 라이브러리들은 항상 `index.d.ts`라는 이름을 파일을 가지고 있는데, 타입스크립트 컴파일러는 이 파일의 내용을 바탕으로 chance, ramda와 같은 라이브러리가 제공하는 함수들을 올바르게 사용했는지 검증한다.

웹 브라우저나 노드제이에스가 기본으로 제공하는 타입들의 존재도 그냥은 알지 못하기 때문에, Promise와 같은 타입을 사용하려면 @types/node라는 패키지를 설치해야 한다.

```bash
$ npm i -D @types/node
```

타입스크립트 프로젝트는 타입스크립트 컴파일러의 설정 파일인 `tsconfig.json` 파일이 있어야 한다.

```bash
$ tsc --init
message TS6071: Successfully created a tsconfig.json file.
```

이렇게 만들어진 기본 tsconfig.json 파일은 실제 개발을 진행하는 데 필요한 옵션들이 많이 비활성화되어 있다. 따라서 보통은 프로젝트에 필요한 옵션만 설정해서 간략하게 한다. `tsconfig.json` 파일을 열고 내용을 다음처럼 수정한다.

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "sourceMap": true,
    "outDir": "dist",
    "downlevelIteration": true,
    "noImplicitAny": false,
    "moduleResolution": "node",
    "baseUrl": ".",
    "paths": { "*": ["node_modules/*"] },
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"]
}
```

