# 前端加密JS库—CryptoJS
[😈npm链接](https://www.npmjs.com/package/crypto-js)
## 简介
> Crypto-js(GitHub)是谷歌开发的一个纯JavaScript的加密算法类库，可以非常方便的在前端进行其所支持的加解密操作

> 有时候项目涉及到的敏感数据比较多，为了信息安全，我们常常需要对一些数据进行接口加密处理，如编码、将明文转化为暗文、加密比对、AES + BASE64 算法加密等。对接口通过加签名的方式，前后端通过统一的签名规则，进一步提升了接口调用的安全性。

## 安装 
> npm install crypto-js 

## 项目中引入
### 加密
```javascript
import { enc, mode, AES, pad } from 'crypto-js';
/**
 * ASE加密
 * @description 使用加密秘钥，对 需要加密的参数 进行加密
 * @param {string} word - 需要加密的参数
 */
const secretKey = enc.Utf8.parse("1234123412ABCDEF");  //十六位十六进制数作为密钥
const iv = enc.Utf8.parse('ABCDEF1234123412');  //十六位十六进制数作为密钥偏移量

export function aseEncryptParams(word) {
    // 未加密的参数 - 从 UTF-8编码 解析出原始字符串
    const wordUTF8 = enc.Utf8.parse(word);
    // 密钥 - 从 UTF-8编码 解析出原始字符串
    const keyUTF8 = enc.Utf8.parse(secretKey);
    // 偏移量（在此公司内是固定的） - 从 UTF-8编码 解析出原始字符串
    const offsetUTF8 = enc.Utf8.parse(iv);

    // 补充
    // 把字符串转成 UTF-8编码 —— enc.Utf8.stringify(word);

    const encrypted = AES.encrypt(wordUTF8, keyUTF8, {
        iv: offsetUTF8,
        mode: mode.CBC,
        padding: pad.Pkcs7,
    });

    return encrypted.toString();
}
```

### 解密
```javascript
import { enc, mode, AES, pad} from 'crypto-js';
/**
 * ASE解密
 * @description 使用加密秘钥，对 需要解密的参数 进行解密
 * @param {string} encryptedWord - 需要解密的参数
 */
const secretKey = enc.Utf8.parse("1234123412ABCDEF");  //十六位十六进制数作为密钥
const iv = enc.Utf8.parse('ABCDEF1234123412');  //十六位十六进制数作为密钥偏移量
export function aesDecryptParams(encryptedWord) {
    // 密钥 - 从 UTF-8编码 解析出原始字符串
    const keyUTF8 = enc.Utf8.parse(secretKey);
    // 偏移量（在此公司内是固定的） - 从 UTF-8编码 解析出原始字符串
    const offsetUTF8 = enc.Utf8.parse(iv);

    const bytes = AES.decrypt(encryptedWord, keyUTF8, {
        iv: offsetUTF8,
        mode: mode.CBC,
        padding: pad.Pkcs7,
    });

    return bytes.toString(enc.Utf8);
}

```

## 使用

```javascript
    // 需要加密的字符串
    const obj = 'saidhsnjsjicjsskcj132342r'
    // 加密
    var jiami = aseEncryptParams(obj)
    console.log(jiami); // H+nsAehpuuetLyi2C5yhwO9CgRzI27J3/iwe1/m0H5g=
    // 解密
    console.log(aesDecryptParams(jiami)); // saidhsnjsjicjsskcj132342r
```
加密的结果是
> H+nsAehpuuetLyi2C5yhwO9CgRzI27J3/iwe1/m0H5g=

> 加密后的字符串里面是包含了+号，发送的话，在进行地址解析时，会把 + 号转换为 空格， 直接导致参数不能正确传输，所以我们用到了 JS 的 encodeURIComponent()，将所有的 + 号 手动转换为 %2B 即可正常传输。