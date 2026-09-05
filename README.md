# 潮汐训练 · Tidal Fitness

轻量健身动作库 APP（可交互单页 + PWA），基于 [@bryllim/workout-guide](https://www.npmjs.com/package/@bryllim/workout-guide) 的 302 个动作 / 906 张姿态帧。

> 动作帧图 © Bryl Lim（基于 Everkinetic 素材）· CC BY-SA 4.0 · 代码 MIT

## 功能

- **首页**：问候 / 部位分类 / 今日推荐训练组合 / 热门动作 / 为你推荐
- **动作库**：302 个动作 · 搜索 + 部位/器械/类型 三维筛选（19 类器械全量）
- **动作详情**：三帧动作演示动画 / 目标肌肉 / 步骤 / 训练提示 / 收藏
- **自定义训练**：选动作 → 设组数次数与休息 → 保存组合 → 直接开始
- **训练播放器**：实时倒计时圆环 / 组间休息 / 动作切换 / 完成统计
- **训练记录**：本月时长 / 千卡 / 连续打卡 / 周柱状图 / 历史
- **训练日程**：月历 + 月份选择器 + 安排已保存组合 + 已选日动作清单
- **我的**：等级 / 8 枚成就徽章 / 收藏夹 / 训练组合 / 设置

## 运行

```bash
node server.js
# 打开 http://127.0.0.1:8765
```

或用任意静态服务器打开 `index.html`（`assets/manifest.json`、`assets/zh-names.json`、`icons/`、`manifest.json`、`sw.js` 同目录；动作帧图从 jsDelivr CDN 拉取，需联网）。

## 部署

- **线上版**：https://kissy-goat.staticdomains.app/（Static.app，已部署含 PWA manifest 与 Service Worker，可"添加到主屏幕"安装）
- **本地浏览器直接打开**：file:// 协议下 fetch `./assets/...` 会失败，建议用 server.js 或任意 HTTP 服务器

## 📱 PWA（已集成）

包含：
- `manifest.json`（含启动图标 192/512 + maskable + 搜索/训练快捷方式）
- `sw.js`（cache-first 离线缓存首页/数据/CDN 帧图）
- `<meta name="theme-color">`、`apple-mobile-web-app-*`

**手机添加方式**：安卓 Chrome / 鸿蒙浏览器打开网址 → 菜单「添加到主屏幕 / 安装应用」→ 桌面出现「潮汐训练」独立图标，全屏运行。

## 📦 打包成 Android APK（本机操作）

> 当前沙箱环境无 Java/Android SDK，PWABuilder 云构建 API 也已于 2025-10 停服。已部署的 PWA 即"零安装包"方案；若需要真 `.apk` 文件分发，在**你本机**执行以下 10 分钟流程。

### 方案一：使用 Android Studio + Capacitor（推荐，可上架）

```bash
# 1) 安装 Node.js 18+（已有）
# 2) 安装 Android Studio（首次约 5GB，SDK 已包含）
#    https://developer.android.com/studio

# 3) 在 fitness-app-v1 目录
npm init -y
npm install --save @capacitor/core @capacitor/android @capacitor/cli

# 4) 初始化 Capacitor
npx cap init "潮汐训练" com.tidal.fitness --web-dir=.
# 注：--web-dir=. 表示当前目录所有静态文件作为 Web 资源

# 5) 添加 Android 平台
npx cap add android

# 6) 同步（每次 web 端更新后）
npx cap sync android

# 7) 用 Android Studio 打开 android/ 目录
npx cap open android
# 或直接: open -a "Android Studio" android/

# 8) Android Studio 中:
#    Build → Generate Signed Bundle / APK
#    选 APK → 创建 keystore（第一次需要）→ release → 完成
#    APK 输出在 android/app/release/app-release.apk
```

### 方案二：在线打包服务（无需本地环境）

打开浏览器访问：

- **WebIntoApp** (https://webintoapp.com/upload) — 上传 URL 或 zip，选 WebView 模式，几分钟生成 APK 下载链接
- **Median.co** (https://median.co) — 注册账号，创建新应用，粘贴 PWA URL，自动打包
- **AppMaker.me** (https://www.appmaker.me/pwa-to-apk) — 简单上传生成

## 🔧 数据来源

- `@bryllim/workout-guide@1.0.0` manifest：302 动作元数据（slugs 本地副本 `assets/manifest.json`）
- 中文动作名映射：`assets/zh-names.json`
- 图片 CDN：`https://cdn.jsdelivr.net/npm/@bryllim/workout-guide@1.0.0/assets/<slug>/frame-{1,2,3}.png`
- 字体：Manrope (拉丁) + 系统 PingFang SC/Microsoft YaHei (中文)

## 版本记录

- **v1.0.0** — 初版：6 屏 + 播放器 + localStorage + 8 成就
- **v2.0.0** — 中文版：302 动作全中文化、图片深色画布、全量器械筛选、修复列表/详情返回
- **v2.1** — 日历修复（grid 列撑大）+ 月份选择器弹窗 + "已安排 N 项"逻辑修复
- **v2.2** — UI 修复（搜索框比例 / 成就 grid 自适应列 / 详情 hero 居中 / 快捷入口紧凑 / chips 边缘羽化）+ 字体升级（Manrope + 系统中文）+ 微动效（屏幕切换弹性 / 列表入场错峰 / 按键反馈）