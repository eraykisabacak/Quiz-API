# Quiz-API

## User Authorization

| Route           | HTTP | POST BODY | Headers |Description                                                                       |
| --------------- | --------- | ------------| ----------- |--------------------------------------------------------------------------------- |
| /api/auth/login           | `POST`     | { "email":"abc@abc.com","password":"xxxxxx" }  | Empty | User Login   |
| /api/auth/register      | `POST`     |  { "email":"abc@abc.com", "username":"abcd","password":"xxxxxx" }| Empty   | User Register |
| /api/auth/tokentest      | `GET`     |  Empty  | Authorization: Bearer: xxx  | Token Test |
| /api/auth/user      | `GET`     |  Empty  | Authorization: Bearer: xxx  | User Data |
| /api/auth/logout      | `GET`     |  Empty  | Authorization: Bearer: xxx  | User Logout |

## Quiz

| Route           | HTTP | POST BODY | Headers |Description                                                                       |
| --------------- | --------- | ------------| ----------- |--------------------------------------------------------------------------------- |
| /api/quiz          | `GET`     | Empty  | Authorization: Bearer: xxx | Get All Quiz   |
| /api/quiz/quiz_id          | `GET`     | Empty  | Authorization: Bearer: xxx | Get Single Quiz   |
| /api/quiz/quiz_id          | `DELETE`     | Empty  | Authorization: Bearer: xxx | Delete Single Quiz   |
| /api/quiz/quiz_id          | `PUT`     | {"name":"Yeni Test"}  | Authorization: Bearer: xxx | PUT Single Quiz   |
| /api/quiz          | `POST`     | {"name":"","questions":""}  | Authorization: Bearer: xxx | New Quiz   |

## Question

| Route           | HTTP | POST BODY | Headers |Description                                                                       |
| --------------- | --------- | ------------| ----------- |--------------------------------------------------------------------------------- |
| /api/question/question_id          | `GET`     | Empty  | Authorization: Bearer: xxx | Get Single Question   |
| /api/question/question_id          | `DELETE`     | Empty  | Authorization: Bearer: xxx | Delete Question   |
| /api/question/question_id          | `PUT`     | {"questionContent":"New Test Question Content Test New"}  | Authorization: Bearer: xxx | Put Question   |
| /api/question/quiz_id          | `POST`     | {"questionContent":"","correctAnswers":[{"answer":""}]}  | Authorization: Bearer: xxx | New Question   |

## Answer

| Route           | HTTP | POST BODY | Headers |Description                                                                       |
| --------------- | --------- | ------------| ----------- |--------------------------------------------------------------------------------- |
| /api/answer/question_id          | `POST`     | {"answers":[{"answer":"Answer Test","correct":1},{"answer":"Yanlıss Yanlıs","correct":0}]}  | Authorization: Bearer: xxx | New Answer   |
| /api/answer/answer_id          | `GET`     | Empty  | Authorization: Bearer: xxx | Get Single Answer   |
| /api/answer/answer_id          | `PUT`     | {"answer":" New Test New  - 2"}  | Authorization: Bearer: xxx | PUT Answer   |
| /api/answer/answer_id          | `DELETE`     | Empty  | Authorization: Bearer: xxx | DELETE Answer   |

## User Answers

| Route           | HTTP | POST BODY | Headers |Description                                                                       |
| --------------- | --------- | ------------| ----------- |--------------------------------------------------------------------------------- |
| /api/quiz/userAnswer/quiz_id          | `POST`     | {"userAnswers":[{"question_id": {"_id":"answer_id"}]}  | Authorization: Bearer: xxx | User Answer   |
| /api/quiz/userAnswer/quiz_id          | `GET`     |  Empty | Authorization: Bearer: xxx | Is Join Quiz   |
| /api/quiz/myQuiz          | `GET`     |  Empty | Authorization: Bearer: xxx | My created quiz   |
| /api/quiz/myAnsweredQuiz          | `GET`     |  Empty | Authorization: Bearer: xxx | My answered quiz   |
