# Phoebie's Learning Lab 上线、收款与文件交付验收清单

更新日期：2026-09-18。本文是实施清单，不是法律、税务或财务意见。

## 一、当前核实结果

- 当前线上 `https://www.phoebiewang.com/` 响应头为 `server: GitHub.com`，线上首页与远端 `main` 的 `index.html` 哈希一致，因此真实托管为 GitHub Pages。
- `https://phoebiewang.com/` 会 301 到 `https://www.phoebiewang.com/`，证书可用。
- 当次测试中，`http://phoebiewang.com/` 先 301 到 `http://www.phoebiewang.com/`，随后得到 HTTP 200，没有自动升级为 HTTPS。旧 README 中“等待证书”的说法已过时；证书现在存在，但 HTTP 裸域名链路仍需上线时复测。
- GitHub Pages 官方限制页当前说明：它不应或不允许作为免费托管服务来运行主要用于促进商业交易的在线业务/电商网站。参考：<https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits>

## 二、推荐托管边界

推荐方案：**GitHub 保存代码 + Netlify 托管生产静态站 + Payhip 托管结账和数字文件交付**。

选择原因：当前项目是无构建依赖的静态文件；Netlify 当前允许在 Free 计划测试商业项目，并提供私有起步、Deploy Preview、自定义域名和 SSL。2026 年的新账号为积分制：Free 为每月 300 credits、硬上限且不会超额扣费；生产部署、流量和请求会消耗积分。流量上升后可评估 Personal（当前标价 USD 9/月、1,000 credits）或其他固定成本方案。价格与条款会变化，开户当天必须再核实。

官方资料：

- Netlify 定价：<https://www.netlify.com/pricing/>
- Netlify credit 规则：<https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/how-credits-work/>
- Netlify 自定义域名说明：<https://docs.netlify.com/manage/domains/domains-fundamentals/understand-domains/>

本次没有创建 Netlify 账户、没有部署、没有更改 DNS。

## 三、预览环境

- [ ] 由家长创建托管账户并启用多因素认证。
- [ ] 连接 GitHub 仓库，但先使用独立预览分支或 Deploy Preview。
- [ ] 预览地址保留 `noindex, nofollow`，`robots.txt` 保持 `Disallow: /`。
- [ ] 预览不绑定正式域名，不加载分析、广告、邮件订阅或支付嵌入脚本。
- [ ] 家长在手机、平板、电脑上完成内容、隐私、数学和下载审核。
- [ ] 检查托管服务的访问日志、保留期、数据处理条款和儿童相关风险。

## 四、Payhip 账户与商品验收

2026-09-18 核实到的当前信息：

- Free Forever 当前为 USD 0/月 + 5% Payhip 交易费；Stripe/PayPal 等支付处理费另计：<https://payhip.com/pricing>
- 卖家必须连接一个支持的支付处理器才能收款：<https://help.payhip.com/article/173-how-do-i-get-paid>
- 数字商品完成付款后，Payhip提供下载页，并通过收据邮件发送再次访问下载页的链接：<https://help.payhip.com/article/132-how-payhip-works>
- 数字文件单个可到 5GB；可设 Visible、Invisible 或 Unlisted：<https://help.payhip.com/article/59-adding-a-digital-product>
- 退款由卖家政策决定并通过连接的支付处理器执行：<https://help.payhip.com/article/281-refund-request>
- 邮件同意设置默认会因地区不同而不同；应主动选择“所有地区都先征求同意”，本项目第一阶段则不要连接营销名单：<https://help.payhip.com/article/217-email-consent-for-customers>

家长操作：

- [ ] 用成年人/合法运营主体资料创建账户并完成平台要求的身份、税务、银行及支付处理器验证。
- [ ] 创建 Digital Product，先设为 **Invisible**。
- [ ] 上传工作区之外的 10 页 PDF；不要上传占位文件并提前收费。
- [ ] 商品名、页数、价格、学习阶段、技能、打印方式与网站一致。
- [ ] 把最终许可同时写入 PDF、网站、Payhip 商品页和结账确认；逐字核对。
- [ ] 建立真实的 Terms 与 Refund 自定义页面，并让成年人在结账前确认。
- [ ] 不连接邮件营销名单；若未来需要，先做数据流与同意审核。
- [ ] 明确下载次数限制。若考虑 PDF 邮箱盖章，先评估为此处理买家邮箱是否必要、是否已在隐私说明披露。
- [ ] 使用 Payhip 官方建议的 100% 优惠券完成一次成年人测试订单。注意官方说明测试订单会保留在 Customers 列表且不能删除。
- [ ] 验证：结账成功后出现下载页；收据邮件可达；链接能重新下载；错误邮箱、重复付款、退款与文件更新流程可处理。
- [ ] 只有以上全部完成，才把商品从 Invisible 改成 Unlisted/Visible，并将真实 HTTPS 链接写入 `content-config.js`。
- [ ] 将 `product.status` 改为 `available`，重新运行全部测试；确认按钮离站提示和成人购买语言清楚。

## 五、法律、隐私与儿童安全审核

- [ ] 填写运营主体法定名称、所在地、有效日期和家长管理的公开联系邮箱。
- [ ] 由合格人士审核 Privacy、Terms、数字产品许可与 Refund 文本；不要声称已经完全符合 COPPA。
- [ ] 检查最终主机、Payhip 和支付处理器的数据字段、用途、保留、删除、跨境与分包商信息。
- [ ] 不启用儿童账户、评论、聊天、照片/录音上传、排行榜、邮箱收集、广告追踪或再营销。
- [ ] 不公开学校、地址、生日、实时位置、日程或私人联系方式。
- [ ] 所有 Phoebie 的照片、声音、视频、署名与作品都取得家长明确批准并记录版本。

## 六、域名、HTTPS 与旧路径

- [ ] 先在新主机拿到默认预览域名并完整验收。
- [ ] 记录当前 GoDaddy DNS 的 A、AAAA、CNAME、MX、TXT；本次迁移只改网页所需记录，绝不顺手改邮箱 MX/TXT。
- [ ] 在新主机验证 `www.phoebiewang.com`；再按主机要求配置裸域名。
- [ ] 选择一个主域名（建议 `www`），让 HTTP、HTTPS、裸域名和 www 最终都 301 到同一个 HTTPS canonical。
- [ ] 检查证书颁发和自动续期。
- [ ] 保留 `/surprise.html`，新增 `/play.html`；确认旧首页链接不会形成死链。
- [ ] 验证自定义 `404.html` 返回并展示正确。

## 七、SEO 发布切换

- [ ] 仅在正式域名验收完成后，把页面 `noindex, nofollow` 改为合适的正式指令。
- [ ] 把 `robots.txt` 改为允许抓取，并恢复正式 sitemap 地址。
- [ ] 核对 canonical、标题、描述、H1、Open Graph 与结构化数据的真实状态。
- [ ] 商品仍是 Coming soon 时，不添加 Product/Offer 可购买结构化数据。
- [ ] 不添加虚假评论、销量、教师认证、视频或学习效果标记。

## 八、付费文件不公开检查

- [ ] `git ls-files | grep -i practice-pack` 无付费 PDF 或专有源内容。
- [ ] 搜索 `public`、`assets`、构建产物和 sitemap，确认没有付费文件路径。
- [ ] 在部署预览中尝试常见文件名，确认 404。
- [ ] 下载正式部署产物清单，再次确认只包含免费样张。
- [ ] 保留一份离线备份和版本号；Payhip 上传文件与审核通过的本地哈希一致。

## 九、发布与回滚

- [ ] 发布前记录最后一个正常线上版本和 DNS TTL。
- [ ] 新主机第一次生产发布后，测试首页、课程、PDF、商品外链、Play、说明页与 404。
- [ ] 先验证再切 DNS；在 TTL 窗口同时检查新旧来源。
- [ ] Netlify 保留已验证的上一个 deploy；出现严重问题时锁定/恢复上一 deploy。
- [ ] 若 DNS 切换失败，只回滚网页相关记录，不动 MX/TXT。
- [ ] 发布后 24-48 小时复查 HTTPS、www/裸域名、404、控制台和外部请求。

## 十、财务记录口径

不要把销售额当利润。每月分别记录：订单销售额、折扣、退款、Payhip 平台费、支付处理费、税费、托管费、设计/工具成本与净额。当前访客、转化率、订单、退款和收入均为 **尚未测量**。
