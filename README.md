# TWT器材租借站
此專案需先註冊帳密再登入，登入後讓使用者可以選擇器材租借，租借後會留下記錄方便查詢領取器材的日子。後台可對器材資料進行CRUD和查詢使用者的租借紀錄，若有發現租借逾期還能寄送Email通知。另外本專有使用RWD設計，可以試著用手機瀏覽。

## 功能列表

#### 前台

* 使用者登入
* Google 第三方登入
* 使用者註冊
* 使用者登出
* 點擊修改使用者資料進行修改
* 點擊左上角TWT器材租借站回到首頁
* 點擊器材種類切換租借器材(如: 相機、腳架和攝影機)
* 點擊器材型號進行租借
* 點擊租借記錄進行瀏覽
* 點擊關於我們進行瀏覽

#### 後台

* 點擊器材管理瀏覽
* 器材頁的CRUD(新增、瀏覽、修改、刪除)
* 使用者的變更身分(一般使用者、管理員)
* 租借記錄的瀏覽和刪除
* 發送email給租借逾期的使用者

## 安裝
 1.打開你的 terminal，Clone 此專案至本機電腦
      
    git clone https://github.com/robert1074004/camera
 2.開啟終端機(Terminal)，進入存放此專案的資料夾
 
    cd camera
 3.安裝 nodemon
 
    npm install -g nodemon
 4.npm install所需要的套件
 
    npm install  
 5.啟動專案
 
    npm run dev
 6.複製顯示在終端機的網址，前往網頁

## 環境建置
[Node.js](https://nodejs.org/en/)
[Robo3T](https://blog.robomongo.org/studio3t-free/)

## 開發人員
Robert
