// 赋值

// let person = { name: '彭于晏' }

// let person1 = person
// person1.name = '胡歌'
// console.log(person1); // { name: '胡歌' }
// console.log(person); // { name: '胡歌' }

// 浅拷贝
// let person = { name: '彭于晏' }
// function shallowCopy(source) {
//     let newObj = {}
//     for (var i in source) {
//         if (source.hasOwnProperty(i)) {
//             newObj[i] = source[i]
//         }
//     }
//     return newObj
// }

// var person1 = shallowCopy(person)
// person1.name = '胡歌'

// console.log("person", person);
// console.log("person1", person1);

// let person = { name: '彭于晏', hobby: ['运动', '唱歌', '游泳'] }
// function shallowCopy(source) {
//     let newObj = {}
//     for (var i in source) {
//         if (source.hasOwnProperty(i)) {
//             newObj[i] = source[i]
//         }
//     }
//     return newObj
// }
// var person1 = shallowCopy(person)
// person1.name = '胡歌'
// person1.hobby[1] = '吃饭'
// console.log("person", person.hobby);
// console.log("person1", person1.hobby);

// 深拷贝
// function deepClone(obj1 = {}) {
//     //判断判断是否是空值和 不是object 对象，否则，会 return obj1
//     if (typeof obj1 == null || typeof obj1 !== 'object') {
//         return obj1
//     }
//     let newObj;
//     if (obj1 instanceof Array) {
//         newObj = []
//     } else {
//         newObj = {}
//     }
//     for (let i in obj1) {
//         if (obj1.hasOwnProperty(i)) {
//             newObj[i] = deepClone(obj1[i]) //这里调用递归函数，在上面会进行判断，和退出递归
//         }
//     }
//     return newObj

// }

// let obj = {
//     age: 30,
//     name: '彭于晏',
//     hobby: ['运动', '唱歌', '游泳']
// }
// let obj2 = deepClone(obj)
// obj2.name = '胡歌'
// obj2.hobby[1] = '吃饭'
// console.log(obj2);
// console.log(obj);


// let a = [1, 2, 3];
// a.join = a.shift;
// console.log(a.shift);
// console.log(a == 1 && a == 2 && a == 3) 

let a = new Proxy({},{
    i:1,
    get:function(){
        console.log(this);
        return ()=> this.i ++
    }
})
console.log(a == 1 && a == 2 && a == 3);
