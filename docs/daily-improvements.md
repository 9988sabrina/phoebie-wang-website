# Claude 每日自动改进日志

每天 4:21（太平洋时间）由定时任务「网站每日进步」运行：先做市场需求调研，再做一项改进并上线。只追加，不删旧段。

## 2026-11-01（起始，手动建档）
- 需求发现：11 月家长和老师大量搜「free printable Thanksgiving math worksheets」（Education.com 该主题就有 51 份资源，K–3 年级为主：20 以内加法、跳数、按数涂色）；1–2 月则转向 Chinese New Year 主题练习纸（生肖、数到 12、描字）。来源：https://www.education.com/worksheets/math/thanksgiving/ 、https://www.tes.com/teaching-resource/chinese-new-year-2024-worksheets-activities-lunar-new-year-the-year-of-dragon-12974174
- 改了什么：建立本日志；定时任务上线。本周已完成：Parking Jam 游戏（教程、撤销、音效、每日一题、关卡地图、×11 和一半加倍加分题）、漫画 1–3 手绘版、首页入口。
- 候选（留给以后，按优先级）：
  1. 感恩节主题免费练习页（×11 / 一半加倍 / 汉字「谢」描红各一页，PDF + 网页预览），首页节日横幅，11 月 26 日前上线
  2. 漫画 4–6 换手绘版（披萨吵架、一半加倍、好在一起），流程同前三条：ChatGPT 出无字分格，Claude 加字
  3. Parking Jam 社交分享图（canvas 生成「Level X · 3 星」卡片）与 OG 图
  4. 春节主题（生肖、数到 12、描字）练习页，1 月中旬前
  5. Bird Pal 页面的 Google Fonts 换系统字体（需老板点头）

## 2026-11-02
- 需求发现：11 月家长/老师在找「免费可打印的感恩节数学」——主流是 1–3 年级的加减、数数、按数涂色，一天一页用到感恩节前（Little Bins for Little Hands 的 7 页包）；华人家庭圈（Chalk Academy）的感恩节中文活动集中在 谢谢/感恩/感恩节快乐 这几个词的涂色和感恩树。Etsy 侧：2026 年儿童练习纸仍是热门类目，50 页以上的合集比单页卖得好，标题要写买家会搜的原话，节日品要提前 6–8 周上架。来源：https://littlebinsforlittlehands.com/thanksgiving-daily-math-worksheets/ 、https://chalkacademy.com/chinese-thanksgiving-activities-crafts/ 、https://www.insightagent.app/guides/popular-printables-on-etsy
- 改了什么：新增免费感恩节页 /thanksgiving.html（火鸡 ×11、南瓜派一半加倍各 6 题在线自测 + 换一组新题，谢/感/恩 描红格，"I am thankful for" 书写行）和 3 页 PDF downloads/Phoebie-Thanksgiving-Mini-Pack.pdf（含答案）；首页和 Printables 页各加一个「New for November」入口；sitemap 和质量测试已覆盖新页。PR #31。
- 候选（留给以后）：
  1. Etsy 上架一份「Thanksgiving Math & Chinese 10-page pack」$1.99，标题按买家搜索词写（需老板确认上架）；网页上的免费 3 页作为引流样张
  2. 感恩节页做一张专属 OG 分享图（现在复用 og-home.jpg）+ Parking Jam 分享卡片
  3. 漫画 4–6 换手绘版

## 2026-11-03
- 需求发现：家长搜「mental math tricks for kids」时，×5、×9、×11、×25 四个口诀最常被一起列出（Mathnasium 文章），而本站此前只有 ×11 和一半加倍；Etsy 上「math worksheets」月搜约 7.4 万次、中位价 $3.15，热销标题堆叠「年级 + 主题 + Printable/Instant download + 页数」，与本站 $1.99 定价和「free sample → Etsy」路径吻合。来源：https://www.mathnasium.com/math-centers/tuskawilla/news/mental-multiplication-shortcuts 、https://www.rankhero.com/keywords/math-worksheets 、https://helpingwithmath.com/multiplying-by-11/
- 改了什么：新增免费页 /nine-trick.html「Multiply by 9 with your fingers」——点 1–10 任一数字，SVG 双手自动弯下对应手指并标出十位/个位（支持 reduced-motion），下方 6 道两位数 ×9「乘 10 再减一次」自测题带提示和换题；首页新增 ×9 入口卡（home.css v20261103a）、Printables 页内链、sitemap 和质量测试覆盖。PR #32。
- 候选（留给以后）：
  1. ×9 页配一张可打印 PDF（手指图 + 12 题 + 答案），并和 ×11、一半加倍合成「Mental Math Tricks 3-page sampler」做 Etsy 引流样张
  2. 感恩节页与 ×9 页各做一张专属 OG 分享图（现在复用 og-home.jpg）
  3. 漫画 4–6 换手绘版（需 ChatGPT 出图，老板在 Chrome 里配合）

## 2026-11-04
- 需求发现：Etsy 上「multiplication chart」月搜约 55 万次（9 月反弹到 82 万，开学季+期中复习），「multiplication」约 45 万次、中位价 $3.75，热销标题模式是「Printable Multiplication Chart 1-12 + Instant Download/PDF + Homeschool/Classroom」；家长向文章建议口诀按「×2/×5/×10 → 翻倍类 → ×9 → 7×8 等难点」的顺序学，并配合混合练习；同类互动乘法表（Toy Theater、Memozor）只高亮行列，没有口诀提示和藏答案玩法。来源：https://www.rankhero.com/keywords/multiplication-chart 、https://www.rankhero.com/keywords/multiplication 、https://logicspark.pages.dev/blog/multiplication-tricks-struggling-kids/ 、https://toytheater.com/multiplication-chart/
- 改了什么：新增免费页 /times-table.html「Times Table Explorer」——12×12 可点乘法表：点格子高亮行列和「孪生」交换律格、显示该口诀的心算小窍门（×9/×11/翻倍各带内链到现有技巧页）、「Hide 12 squares」藏答案自测、方向键导航、一键打印成干净的一页表；首页新增入口卡（home.css v20261104a）、Printables 页内链、sitemap 和质量测试覆盖。PR #33。
- 候选（留给以后）：
  1. 乘法表页加一张可下载 PDF（彩色 + 空白填写版各一页），并在 Etsy 上架「Multiplication Chart 1-12 + Practice Pack」$1.99（上架需老板确认）
  2. 感恩节页、×9 页、乘法表页各做一张专属 OG 分享图（现在都复用 og-home.jpg）
  3. 漫画 4–6 换手绘版（需 ChatGPT 出图，老板在 Chrome 里配合）

## 2026-11-05
- 需求发现：家长搜「mental math tricks for kids」的头部文章（Mathnasium）把 ×5、×9、×11、×25 四个口诀并列讲，本站已有 ×9、×11，缺 ×5/×25；英国 Oak National Academy 的 KS1 课程和 TES 上的 5 倍表资源都用「5 倍表和 10 倍表的一半/翻倍关系」来教 ×5，说明这是课堂主流讲法；Etsy 侧「kids worksheets / math worksheets」仍是常青词，标题继续堆「年级 + 主题 + Printable」。（本轮搜索没找到同类网站近期新功能的可靠来源，未采用。）来源：https://www.mathnasium.com/math-centers/tuskawilla/news/mental-multiplication-shortcuts 、https://www.thenational.academy/teachers/programmes/maths-primary-ks1/units/doubling-halving-quotative-and-partitive-division/lessons/explain-patterns-and-relationships-between-the-5-and-10-times-tables 、https://www.tes.com/teaching-resource/five-times-tables-groups-arrays-wheels-tricks-and-tips-11635899 、https://www.rankhero.com/keywords/kids-worksheets
- 改了什么：新增免费页 /five-trick.html「Multiply by 5 in a flash」——点 1–12 任一数字，看「两个 5 拼成一个 10」的点阵条（奇数会剩一个 5，支持 reduced-motion），偶数/奇数两条规则卡，下方 6 道自测题（4 道两位数 ×5 + 2 道 ×25「取四分之一加两个 0」）带提示和换题；首页新增 ×5 入口卡（home.css v20261105a，乘法表卡与 ×5 卡并排）、乘法表页 ×5 提示加内链（times-table.js v20261105a）、Printables 页内链、sitemap 和质量测试覆盖。PR #34。
- 候选（留给以后）：
  1. 把 ×5、×9、×11、一半加倍四个口诀做成一个「Mental Math Tricks」合集入口页（首页一个大卡代替四个小卡），并配 4 页可打印 PDF 做 Etsy 引流样张
  2. 圣诞/寒假主题免费练习页（12 月初上线；Etsy 节日品需提前上架，上架要老板确认）
  3. 各技巧页专属 OG 分享图（现在都复用 og-home.jpg）

## 2026-11-05（加班，老板要求「现在立马」）
- 起因：老板问为什么没有一鸣惊人的感觉。自查结论：首页第一屏是鸟应用和泡泡，游戏和漫画埋在三屏以下；四个口诀各占一张卡，没有主角；没有任何可发 Pinterest 的竖图。
- 改了什么：首页重排——标题下面第一屏就是 Parking Jam 大卡（真实关卡截图 assets/jam-board.jpg + 「Play now」），紧接着漫画区，然后才是鸟应用/泡泡/冷笑话；下方卡片区去掉重复的 Parking Jam 卡，四个口诀页 + 乘法表合并成一张「Mental math tricks」卡（五个入口按钮）；home.css v20261105b。新增 5 张 1000×1500 原创 Pinterest 竖图（assets/pins/）和发布清单 docs/pinterest-pins.md（标题、描述、目标链接都写好）。
- 没做成：「不追踪也能知道哪页有人看」——网站端做不了；免费且不往网站加脚本的办法是 Google Search Console（需要老板用自己的 Google 账号验证域名，Claude 不能代开账号）。
- 候选：1. 老板开通 Search Console 后，Claude 加验证文件并每周看一次搜索词；2. 漫画 4–6 换手绘版；3. Parking Jam 通关分享卡片。

## 2026-11-05（大改版：砍）
- 起因：老板问为什么网站没有一鸣惊人的感觉、也不赚钱。结论：首页杂货铺、导航一半是联盟/AI 工具、没有邮箱入口、没有链到 Etsy/KDP/YouTube、页脚写着「法律信息待审核」。
- 改了什么：导航砍到 4 项（Practice / Printables / Books & Songs / About）；首页 H1 改为「Free math practice for kids」，加邮箱订阅区（未接服务商前按钮禁用，接法见 content-config.js 的 emailFormAction）和「All our work」入口行（Etsy、两本 KDP 小说、YouTube、Books & Songs）；新页 projects.html（Bird Pal、书、歌、游戏：Parking Jam / 找笑脸 / 泡泡 / 冷笑话）；工具、测评、优惠券、go/、newsletter 页下线（noindex + 移出 sitemap，文件保留）；logo「PPhoebie's」改成「学」；About/Privacy/Terms/Refunds 改为定稿文字，页脚改为联系 Etsy 店铺；所有页补齐 title / description / OG / canonical。
- 规则（给每日任务）：每天只做一件事——删掉没用的东西、修一个坏的地方、或提升首页转化（邮箱订阅、Etsy/KDP 入口）。不加新功能、不加新页面。
- 待老板接线：邮箱服务商（填 emailFormAction 并把其域名加入 index.html CSP 的 form-action）；KDP 两本书的直达链接（现为 Amazon 搜索链接）；抖音、Pinterest、晚风音乐 YouTube 频道的链接（未确认，暂未上线）。

## 2026-11-06
- 改了什么（修一个坏的地方）：手机上除首页和 Books & Songs 页以外的所有页面，右上角「Menu」按钮只有 38px 高、页脚链接只有 21px 高，低于 44px 的点击区标准，小手指容易点不中。把 44px 的规则从 home.css 的首页专用提到 styles.css 全站生效；所有页面的 styles.css 加 `?v=20261106a`。375px 下 20 个页面复查无横向溢出，44 个测试全过。PR 号见当天合并记录（claude/daily-2026-11-06）。
- 没做的候选：
  1. 页脚「Affiliate Disclosure」链接：联盟/工具页已下线，这个链接和 sitemap 里的 disclosure.html 可能已多余（涉及法律声明，需老板点头再删）。
  2. practice/ 页的标签按钮 40px、「听一听」36px，chinese/ 页的按钮 41px，也略低于 44px（这两页用自己的样式表，留给以后单独修）。

## 2026-11-09
- 改了什么（修一个坏的地方）：首页「每日中文」入口卡的文案还是旧版「A 30-day course … 8 printable pages」，而 chinese/ 页面本身（11-07、11-08 老板改版后）已是「1000 characters in 90 days、每天 10 页」，首页说的和点进去看到的对不上。只改这一句文案，与 chinese/ 页 H1 和内置 TOTAL=90 一致。无 CSS/JS 改动。PR 号见当天合并记录（claude/daily-2026-11-09）。
- 顺手核查：45 个页面站内链接无死链（go/ 和 reviews/_TEMPLATE 的占位链接属于已下线页，未动）；21 个页面 375px 无横向溢出；44 个测试全过。
- 没做的候选：
  1. chinese/ 页自己的 meta description 仍写「30-day course、300 characters」，和页内「90 days、1000 characters」矛盾——这页由老板的同步脚本维护，建议老板在源头改。
  2. 首页 Bird Pal 段的「try it on the phone to the left」在手机上手机图其实在上方；且「Open it full screen」出现两次（文字链 + 按钮），可去掉一个。

## 2026-11-10
- 改了什么（修一个坏的地方）：11-08 的面包屑修复（PR #41）因为 11-08 晚上的动漫皮肤改版产生冲突，无法合并，今天在最新 main 上重做：12 个内页顶部「Home / Printables」链接手机上只有 16px 高，styles.css 加一条 `.crumb a` 规则（内边距 + 负外边距）把点击区撑到 44px，文字坐标前后逐页比对完全不变；全站 styles.css 版本号升到 `?v=20261110a`。375px 下 26 页无横向溢出、无死链，44 个测试全过。分支 claude/daily-2026-11-10；PR #41 作废。
- 没做的候选：
  1. 首页 Bird Pal 段落写着「try it on the phone to the left」，手机上手机样机其实在上方，改成「above」更准（一行文案，下次顺手改）。
  2. #40（practice 页按钮 44px）、#47（每日中文卡片文案更新）两个 PR 仍待老板批准合并。

## 2026-11-11
- 改了什么（删掉一个多余的东西）：product.html 是一个没有任何页面链到的孤儿页，内容还是旧方案（「Coming soon · 需家长审核」「USD 4.99 测试价」「Payhip 交付」「[parent-managed email required]」），和现在「Etsy $1.99 即时下载」的真实卖法矛盾，却仍在 sitemap 里、允许被 Google 索引。改为 noindex 并移出 sitemap，文件保留；tests/site.test.js 的索引/noindex 清单同步更新。无 CSS/JS 改动，不需要动 ?v=。`node --test tests/*.test.js` 44/44 通过。PR #49。
- 说明：#47、#48 三天没合并，彼此在本日志末尾冲突。今天的分支先把这两个分支合进来（已解决日志冲突），所以合并 #49 一个就等于三天的改动都上线；先单独合 #47/#48 再合 #49 也可以，不会冲突。
- 没做的候选：
  1. 页脚「Questions or a broken page? Message us through our Etsy shop」这条全站唯一的联系链接只有 15px 高，需要改 styles.css + 全站 ?v=，等 #48 合并后再做。
  2. 页脚「Affiliate Disclosure」链接和 disclosure.html：联盟页已全部下线，首页的 Amazon 链接也不带联盟标签，这个声明页可能已多余（涉及法律声明，需老板点头再删）。
