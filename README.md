# Phoebie's Learning Lab（第一版预览）

这是 `9988sabrina/phoebie-wang-website` 的静态网站改版工作区。品牌方向为 **Learn it. Try it. Explain it.**，第一阶段只聚焦一节有完整学习价值的数学课与配套练习材料。

> 当前状态：已准备部署正式站点，但未启用收款。主要内容页允许索引；商品仍为 Preview/Coming soon。不要把正式网站上线理解成已经可以销售。

## 仓库与分支

- 预期远端：`https://github.com/9988sabrina/phoebie-wang-website.git`
- 当前开发分支：`codex/learning-lab-v1`
- 原工作目录缺少 `.git`，已从预期远端恢复元数据；恢复前存在的本地文件修改全部保留，没有覆盖。
- 没有合并 `main`、没有推送远端、没有触发生产部署，也没有修改 DNS。

## 已实现内容

- `index.html`：新的学习型首页。
- `lesson.html`：Double and Half Multiplication 互动课；含逐步演示、先猜后揭晓、3 道固定练习和 1 道安全随机题。
- `math-core.js`：可独立测试的数学逻辑与课程状态机。
- `product.html`：10 页练习包的真实商品信息预览；未配置托管链接时不能结账。
- `play.html` / `app.js`：保留原找表情游戏；移除 Add Joke 自由输入，只使用预置笑话。
- `privacy.html`、`terms.html`、`refunds.html`：与当前功能一致的英文草案，明确标注需家长和法律审核。
- `404.html`、`surprise.html`：404 与旧路径兼容。
- `assets/downloads/double-half-try-it-sheet.pdf`：真实 2 页免费样张。
- `content-config.js`：商品、媒体与运营联系方式的集中配置。

## 本地预览

在项目根目录执行：

```bash
python3 -m http.server 4173
```

浏览器打开：`http://127.0.0.1:4173/`

不要直接双击 HTML 作为最终验收方式；本地 HTTP 预览更接近真实部署，也能正确测试 PDF、404 与页面跳转。

## 运行测试

需要 Node.js 18 或更高版本：

```bash
npm test
```

本环境没有全局 `node`，因此本次实际使用 Codex 附带的 Node：

```bash
/Users/bennywangtang/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --test tests/*.test.js
```

自动测试覆盖：数学等值变换、例题答案、随机题整数约束、连续点击/返回/重播状态、站内链接、noindex、无第三方运行时请求、商品安全状态，以及付费原件不在仓库内。

## 内容更新教程

### 更新价格、商品状态和链接

只编辑 `content-config.js`：

- `product.price`：展示价格，例如 `USD 4.99`。
- `product.status`：审核期保持 `preview`；真实商品上传并完整测试后才改为 `available`。
- `product.hostedProductUrl`：只填真实 Payhip 商品 HTTPS 地址，绝不填写假链接。
- `product.previewPath`：公开样张路径。
- `product.license`：必须与网页、PDF 和 Payhip 结账条款逐字一致。
- `contact.publicEmail`：使用家长管理的公开支持邮箱；不要使用孩子邮箱。

只有 `status === "available"` 且 `hostedProductUrl` 是 HTTPS 时，购买按钮才会变为可用。

### 增加一节互动课

1. 复制 `lesson.html` 和 `lesson.js`，使用清楚的英文文件名。
2. 把可计算逻辑放进独立 JS 模块，不要把答案只写在 DOM 文本里。
3. 为新数学规则增加 `tests/` 单元测试：例题、边界、随机题约束和状态变化。
4. 完成真实内容、移动端和键盘测试后，才把新课加入主导航或首页。
5. 更新 `sitemap.xml`；正式发布前再去掉该页的 `noindex`。

### 替换视频或配音

`content-config.js` 已预留 `lessonVideoUrl` 与 `phoebieNarrationUrl`。只有在素材真实、经过家长审核、隐私与第三方数据流检查完成后才配置。当前互动课是完整体验，不依赖视频或音频，也不会自动播放。

### 更新免费材料

免费 PDF 源文件为 `scripts/generate_free_printable.py`。运行：

```bash
python3 scripts/generate_free_printable.py
```

生成后必须检查页数、打印边距、答案和网站下载链接。公开材料只能放进 `assets/downloads/`；付费原件不得放入这里。

### 更新样式

所有页面样式集中在 `styles.css`。保留键盘焦点、375/768/1440 响应式断点，以及 `prefers-reduced-motion` 规则。

## 本地存储与隐私

- 游戏只保存分数、最佳时间和等级，键名为 `phoebieplays-state-v2`。
- 互动练习答案不上传，也不持久保存。
- 页脚的 “Clear local progress” 会清除本站两个预留的本地存储键。
- 没有 Google Fonts、分析脚本、广告像素、支付嵌入、视频 iframe、邮件表单或自由输入内容。
- 主机仍可能产生 IP、浏览器、URL 与访问时间等技术日志；不能宣称“完全不收集任何数据”或“已经完全符合 COPPA”。

## 付费文件隔离

10 页草案位于工作区之外：

`/Users/bennywangtang/Documents/Phoebie Learning Lab Private Delivery/Double-and-Half-Multiplication-Practice-Pack-DRAFT.pdf`

生成源在被 `.gitignore` 排除的 `tmp/` 下。`.gitignore` 同时阻止匹配 `*practice-pack*.pdf` 的文件进入仓库。上线前仍需人工运行 `git ls-files` 和最终构建清单检查。

## 上线前必读

- [上线、收款与交付验收清单](docs/LAUNCH-CHECKLIST.zh-CN.md)
- [30 天内容与商业验证计划](docs/30-DAY-PLAN.zh-CN.md)
- [实际测试报告](docs/TEST-REPORT.zh-CN.md)

当前线上 `www.phoebiewang.com` 已确认由 GitHub Pages 提供，HTTPS 的 `www` 与裸域名跳转正常；但 `http://phoebiewang.com` 当次核验会跳到 `http://www.phoebiewang.com` 后停留在 HTTP。更重要的是，GitHub Pages 官方当前明确表示不应作为主要面向商业交易的网站托管。本项目建议代码继续保存在 GitHub，生产网站迁移到允许商业项目的静态托管平台；本次没有执行迁移或 DNS 修改。
