# 第一版实际测试报告

测试日期：2026-09-18。环境：macOS、本地 Python HTTP 服务器、Google Chrome Headless、Node.js 内置测试、Poppler、pypdf。

## 已完成并通过

- 仓库身份：远端 `9988sabrina/phoebie-wang-website` 的 `CNAME` 与本地一致；线上首页哈希与远端 `main` 一致；本地核心文件是同项目的后续改动。
- Git 安全：在 `codex/learning-lab-v1` 分支工作；原有未提交修改保留；未推送、未合并、未部署。
- 数学逻辑：48 × 25 = 1200；每次 double-and-half 前后乘积相同；200 次随机生成检查均保持整数与正确答案。
- 状态稳定：连续 Next、Previous 与 Replay 被边界限制，不会超出步骤范围。
- 浏览器交互：逐步课、先猜后揭晓、第一次错题提示、第二次错题步骤答案、正确反馈全部通过。
- 375、768、1440 像素：首页无横向溢出；移动/平板菜单可打开，ARIA 状态同步。
- 键盘：课程控件为原生按钮/链接；Tab 可获得焦点；练习输入可用 Enter；旧游戏的目标按钮可用 Enter 获胜。
- `prefers-reduced-motion: reduce`：浏览器计算到的按钮过渡时长降至近零。
- 免费 PDF：HTTP 200、MIME 为 PDF；pypdf 与 pdfinfo 均确认 2 页；两页均已渲染为 PNG 并目视检查。
- 付费草案：pypdf 与 pdfinfo 均确认 10 页；10 页全部渲染，抽查并目视复核全部页面，无裁切、重叠、黑块或空白凑页。
- 商品安全状态：没有真实链接时按钮无 `href` 且 `aria-disabled=true`，显示 Coming soon。
- 旧游戏：启动、键盘命中、得分保存通过；页面不存在自由输入表单。
- 页面链接与 404 文件：自动扫描全部本地链接，目标存在；`404.html` 可直接加载。
- 控制台：实际浏览器流程没有 JavaScript console error 或 page error。
- 第三方请求：实际浏览器运行记录为 0 个外部主机；没有外部字体、iframe、视频、分析或支付脚本。
- 付费文件隔离：自动测试确认仓库内没有匹配 `practice-pack*.pdf` 的文件。
- 预览索引：全部 HTML 页面含 `noindex`；`robots.txt` 为 `Disallow: /`。

浏览器结果原始记录写入被 `.gitignore` 排除的 `test-results/browser-results.json`。截图位于被排除的 `screenshots/`：`home-375.png`、`home-768.png`、`home-1440.png`、`lesson-375.png`。

## PDF 数学核对

- 免费样张 6 题及答案逐题复算。
- 付费草案各计算页的题目由生成脚本按 `a * b` 产生答案；应用题单位答案单独核对。
- 错误分析页故意保留学生错误示例，答案页明确标出正确/错误和修正值。

## 尚未运行或无法在本次验证

- Safari、Firefox、真实 iPhone/iPad/Android 设备测试：未运行。
- 屏幕阅读器 VoiceOver/NVDA 完整人工走查：未运行；已做语义标签和键盘基础测试。
- 实体 US Letter 与 A4 打印机试印：未运行；已按两种纸张的共同安全宽度设计并检查 PDF 边距。
- Netlify 预览/生产部署：未执行，因本次禁止创建账户与部署。
- GoDaddy DNS、正式域名迁移和 HTTP 重定向修复：未执行。
- Payhip 账户、真实商品、支付处理器、测试订单、下载邮件、退款：未执行；必须由家长配置。
- Privacy、Terms、Refund 和许可的法律有效性：尚不能验证，需家长与合格人士审核。
- 正式主机日志、数据保留、最终第三方数据流：尚不能验证，因生产主机未选择/配置。
- 搜索索引和排名：预览明确 noindex，未验证且不作承诺。
- 访客、商品查看、转化、销售额、退款和利润：尚未测量。
