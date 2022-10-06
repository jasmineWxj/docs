# mac 安装 oh-my-zsh
## 1.安装
### 终端安装
````ssh
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
````

!> 执行过程中遇到 443 问题
!> 原因是使用了外国的资源
!> 改成国内的资源

````ssh
sh -c "$(curl -fsSL https://gitee.com/shmhlsy/oh-my-zsh-install.sh/raw/master/install.sh)"
````

## 配置
### 主题配置
#### oh-my-zsh 相关配置 `~/.zshrc`
````ssh
vim ~/.zshrc
````
编辑  `~/.zshrc` 中的 `ZSH_THEME`="xxx" 即可。默认    ZSH_THEME="robbyrussell"

更多默认主题 https://github.com/ohmyzsh/ohmyzsh/wiki/Themes
修改完成后 执行配置文件即可生效
````ssh
source ~/.zshrc
````

## 自动补齐
### 下载插件到 oh-my-zsh 插件目录
````ssh
git clone git://github.com/zsh-users/zsh-autosuggestions $ZSH_CUSTOM/plugins/zsh-autosuggestions
````

### 编辑 .zshrc 文件
````ssh
vim ~/.zshrc
````

### 找到 plugins=(git) 这一行，如果没有添加。更改为如下
````ssh
plugins=(git zsh-autosuggestions)
````

### 重启 zsh 
````ssh
source ~/.zshrc
````

