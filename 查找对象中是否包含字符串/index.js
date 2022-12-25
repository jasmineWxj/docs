// let obj = {
//     age: 30,
//     name: '彭',
//     hobby: ['运动', '唱歌', '游泳', {
//         bane: '122e',
//         nasd: {
//             asdn: {
//                 adsa: {
//                     size: 12
//                 }
//             }
//         }
//     }],
//     app: {
//         names: 'wangxiaoj'
//     }
// }
var obj = 11
function objDeep(params = {},number) {
    if (typeof params !== 'object' || typeof params === null) {
        return
    }

    for (let i in params) {
        if (params[i] === number) {
            console.log('成功', params);
        } else if (params[i] instanceof Array || params[i] instanceof Object) {
            objDeep(params[i],number)
        }
    }

}


objDeep(obj,12)