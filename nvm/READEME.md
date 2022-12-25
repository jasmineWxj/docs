# node 版本控制

* 下载

>  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

* 下载时可能会报错
* > Failed to connect to raw.githubusercontent.com port 443 after 75007 ms: Operation timed out

此时我们可以增加一个 host 配置

> sudo vim /etc/hosts

> 185.199.110.133 raw.githubusercontent.com

然后下载就没问题啦

* 安装完成之后 ，关闭终端，然后重新打开 验证 nvm 是否安装成功

> https://www.jianshu.com/p/622ad36ee020