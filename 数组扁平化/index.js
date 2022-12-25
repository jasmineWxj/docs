let arr = [[1, 2, [3, 4], 5], [6, 7, 8], [[9, 10, [1, 2, 3, [1]]], 11]];
function list(params) {
    let lists = [];
    params.forEach(item => {
        if (Array.isArray(item)) {
            lists = lists.concat(list(item))
        } else {
            lists.push(item)
        }
    });
    return lists
}

// console.log(list(arr));

console.log(arr.flat(4));
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2,3, 1, 11]