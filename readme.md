# web-ext-template
浏览器插件模板

## 功能
- React + typescript
- prod环境split common chunk代码，使插件更小
- less + tailwindcss
- 以tsup为底，rebuild非常快
- 支持svgr载入svg

## 如何开始

### 文件结构
```
src
├─background
│      index.ts
│
└─content-scripts
       all-frames.ts        运行在当前页面和所有iframe的脚本
       main.ts              运行在当前页面的脚本
       world.ts             运行在top window的脚本，可以劫持注入原网站的js数据
```

### 环境
- pnpm >=9.0.0
- node >=18.20.0

### 开发
```sh
pnpm run dev
```

会在根目录里生成`dist`文件夹，把这个加载对应的浏览器中，支持chrome + edge

> [!NOTE]
> `content-scripts`的变动需要主动刷新网页
>
> `background`的变动需要插件页点击刷新插件

### 打包
```sh
# prod模式打包
pnpm run build
# 压缩文件夹
pnpm run archive
```

将会在`/build`文件夹里生成zip文件，如果是准备升级版本发布，推荐使用`pnpm run release`，里面带有**输入版本，增加tag + push**功能
