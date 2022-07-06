# 將多層array資料轉為lua可使用且已經排序好的table
1. 使用node js 版本:v14.18.3
2. 第一次使用請先npm i
3. 輸入資料請命名為data.txt, 見範例與格式
4. 輸入資料放好後, 請開啟command line, cd到本資料夾, 執行node trans.js
5. 產出結果為lua已排序完成的table

# 使用
1. 使用lua 版本:5.1.5
2. 在trans.js產出的out.txt中,複製內容
3. 貼上覆蓋到myLua.lua的local data =之後
4. command line執行lua myLua.lua即可印出在lua中要使用的key與value