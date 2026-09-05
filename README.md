# 潮汐训练 · Tidal Fitness

轻量健身动作库 APP（可交互单页原型 + 完整训练流程），基于 [@bryllim/workout-guide](https://www.npmjs.com/package/@bryllim/workout-guide) 的 302 个动作 / 906 张姿态帧。

> 动作帧图 © Bryl Lim（基于 Everkinetic 素材）· CC BY-SA 4.0
> 代码 MIT

## 功能

- **首页**：问候 / 部位分类 / 今日推荐训练组合 / 热门动作
- **动作库**：302 个动作 · 搜索 + 部位/器械/类型 三维筛选（19 类器械全量）
- **动作详情**：三帧动作演示动画 / 目标肌肉 / 步骤 / 训练提示 / 收藏
- **自定义训练**：选动作 → 设组数次数与休息 → 保存组合
- **训练播放器**：倒计时圆环 / 组间休息 / 动作切换 / 完成统计
- **训练记录**：本月时长 / 千卡 / 连续打卡 / 周柱状图 / 历史
- **训练日程**：月历 + 安排已保存组合
- **我的**：等级 / 8 枚成就徽章 / 收藏夹 / 数据管理

## 运行

```bash
node server.js
# 打开 http://127.0.0.1:8765
```

或用任意静态服务器打开 `index.html`（依赖 `assets/manifest.json` 与 `assets/zh-names.json` 同目录；动作帧图从 jsDelivr CDN 拉取，需联网）。

## 版本记录

- **v1.0.0** — 初版：6 屏 + 播放器 + localStorage + 8 成就
- **v2.0.0** — 中文版：302 动作全中文化、图片深色画布（修复白色素材不可见）、全量器械筛选面板、修复列表点击跳转与详情返回、按部位联动搜索

## 数据来源

- `@bryllim/workout-guide@1.0.0` manifest：302 动作元数据（slugs 本地副本 `assets/manifest.json`）
- 图片 CDN：`https://cdn.jsdelivr.net/npm/@bryllim/workout-guide@1.0.0/assets/<slug>/frame-{1,2,3}.png`
