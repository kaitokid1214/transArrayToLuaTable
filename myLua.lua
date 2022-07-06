local data = {[1]='{None:0}',[2]='{1.5RTP:1}',[3]='{2.0RTP:2}',[4]='{2.5RTP:3}',[5]='{3.0RTP:4}',[6]='{NearMiss:9}',[7]='{0.5RTP:10}',[8]='{0.75RTP:11}',[9]='{FreeGame:100}',[10]='{Major:101}',[11]='{Minor:102}',[12]='{Mini:103}',[13]='{Elephant:200}',[14]='{1+ELe:201}',[15]='{1+EleinFG:202}',[16]='{BigWin:300}',[17]='{HugeWin:301}',[18]='{smallWin:302}'}

local function findDataKeyValue(input)
    for i = 1, #input, 1 do
        print('----------------------------------------')
        local keyValueString = input[i]
        keyValueString = keyValueString:gsub("%p+", {['{']='',['}']=''})
        local colonIndex = string.find(keyValueString,':')
        local targetKey = string.sub(keyValueString,1,colonIndex-1)
        print('targetKey = '..targetKey)
        local targetValue = string.sub(keyValueString, colonIndex + 1)
        print('targetValue = '..targetValue)
    end
end

findDataKeyValue(data)