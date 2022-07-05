const fs = require('fs');
const lodash = require('lodash');
fs.readFile('./data.txt', 'utf8', (err, data) => {
    if (err) {
        console.log("error! ", err);
    } else {
        /**data trans to original array*/
        data = data.replace(/[\s]|\\r\\n/g, "") //remove "space" and "\r" "\n"
        data = data.replace(/'/g, '"') //change ' to ", then can JSON.parse()
        data = JSON.parse(data);
        // console.log(data);

        /**check how dimension in original array*/
        let findIndex = 0;
        const checkStackArray = (inputArray) => {
            if (Array.isArray(inputArray)) {
                if (inputArray[0] !== null && inputArray[0] !== undefined) {
                    findIndex++;
                    checkStackArray(inputArray[0])
                }
            } else {
                makeFile();
            }
        }

        /**trans original array to 2-dimension array*/
        let tempArray = [];
        const makeFile = () => {
            for (let i = 0; i <= findIndex; i++) {
                let targetArr = data[i];
                for (let j = 0; j < targetArr.length; j++) {
                    tempArray.push(targetArr[j]);
                }
            }
            // console.log(tempArray);
        }

        /**trans 2-dimension array to */
        let result = [{
            None: 0
        }];
        const setResult = () => {
            for (let i = 0; i < tempArray.length; i++) {
                let targetItem = tempArray[i];
                let obj = {};
                obj[targetItem[1]] = targetItem[0];
                result.push(obj);
            }
            // console.log(result);
        }

        let luaAcceptTable = {};
        const transToLuaTable = () => {
            for (let i = 0; i < result.length; i++) {
                let _key = `[${i+1}]=`;
                let _value = result[i];
                luaAcceptTable[_key] = _value;
            }
            // console.log(luaAcceptTable);
        }

        checkStackArray(data);

        tempArray = lodash.orderBy(tempArray, [0]); //use lodash sort 2-dimension array

        setResult();

        transToLuaTable();

        luaAcceptTable = JSON.stringify(luaAcceptTable);//trans result to json

        luaAcceptTable = luaAcceptTable.replace(/\\/g, "");//remove \ in json
        luaAcceptTable = luaAcceptTable.replace(/"/g, "");//remove " in json
        luaAcceptTable = luaAcceptTable.replace(/:(?={)/g, "'");//replace after ':' is not equal to '{' become '
        luaAcceptTable = luaAcceptTable.replace(/}/g, "}'");//replace } become }'
        luaAcceptTable = luaAcceptTable.replace(/'$/g, "");//remove last string '
        // console.log(luaAcceptTable);

        /**out put file */
        fs.writeFile('out.txt', luaAcceptTable, err => {
            if (err) {
                console.error(err);
            }
            // file written successfully
        });
    }
})