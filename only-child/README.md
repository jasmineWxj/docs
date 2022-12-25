# only-child

> :only-child 匹配没有任何兄弟元素的元素

```html
    <style>
        /*  匹配 .cc 下只有一个元素 的样式 */
        main .cc :only-child {
            color: red;
        }
    </style>
    <main>
        <div class="cc">
            <i>I am a lonely only child.</i><i>I am a lonely only child.</i>
        </div>
        <div class="cc">
            <div>
                <span>11</span><span>11</span>
            </div>
        </div>
    </main>
```

[![xz1bbF.md.png](https://s1.ax1x.com/2022/11/08/xz1bbF.md.png)](https://imgse.com/i/xz1bbF)