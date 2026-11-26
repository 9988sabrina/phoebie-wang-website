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

## 2026-11-13
- 改了什么（修一个坏的地方）：首页主推的 Parking Jam 页里，教程气泡的「Skip tutorial / 跳过教程」按钮只有 22px 高，「Progress code / Level map」折叠标题 36px、进度码输入框和「Restore」按钮 42px，都低于 44px 点击区标准，小朋友在手机上容易点不中。parking-jam.css 把这四处提到 ≥44px（版本 v=4 → v=5）。375px 复查无横向溢出、教程气泡布局正常，44 个测试全过。PR 号见 claude/daily-2026-11-13 合并记录。
- 没做的候选：
  1. 全站页头的品牌链接（logo + 站名）只有 39px 高，略低于 44px；在 styles.css 改一行即可，但影响所有页面，留到下一天单独做。
  2. vet-game.html 的语言切换（中文/EN/ES）和「选择病例」按钮只有 28–31px 高；该页最近由另一条线持续改版（Wild Case Files v0.3–v0.9），为避免冲突暂不动。

## 2026-11-14
- 改了什么（修一个坏的地方）：手机上页头的品牌链接（logo + 站名）在 About、课程页、Parking Jam 等所有非首页页面只有 39px 高，低于 44px 点击区标准（首页和 projects 页因 home.css 专用规则已是 44px）。把 `.brand{min-height:44px}` 从 home.css 提到 styles.css 全站生效，home.css 删除重复规则；styles.css、home.css 均 `?v=20261114a`。375px 复查 6 个代表页品牌链接均为 44px，44 个测试全过。PR #62 已合并。
- 没做的候选：
  1. reviews/descript-review.html 和 reviews/best-ai-video-tools-for-creators.html 在 375px 有横向溢出（504px / 456px）；这两页已 noindex 下线，暂不修，若老板决定彻底移除可一起处理。
  2. vet-game.html 的语言切换和「选择病例」按钮只有 28–31px 高；该页另一条线仍在改版，暂不动。

## 2026-11-15
- 改了什么（修一个坏的地方）：Daily Practice 页（/practice/）顶部的 9 个标签按钮只有 40px 高、所有「🔊 听一听 / Listen」朗读按钮只有 36px 高，低于 44px 点击区标准，是 11-06 留下的候选。该页样式写在页面内，把 `nav.tabs button` 和 `.icon-btn` 的 min-height 提到 44px（无需改 `?v=`）。375px 下 Today / 中文 / 题库 三个标签页复查无横向溢出、标签栏和卡片布局正常，44 个测试全过。PR 号见 claude/daily-2026-11-15 合并记录。
- 没做的候选：
  1. chinese/ 页的 1–6 数字按钮和「显示答案 / 保存」按钮 41px、「去写字」链接式按钮 19px，略低于 44px；该页也是页内样式，留到下一天单独修。
  2. reviews/ 下两篇已下线（noindex）的测评页在 375px 有横向溢出，暂不修。

## 2026-11-16
- 改了什么（修一个坏的地方）：每日中文页（/chinese/）在手机上的点击区偏小——所有 `.btn` 按钮（1–6 数字、显示答案、保存、Start、Listen 等）41px，闪卡角落的朗读小圆钮 34px，「认读/书写」切换 34px，语音下拉 32px，补做提示链接 38px，顶部返回首页链接 20px，均低于 44px 标准（11-15 留下的候选）。该页样式写在页面内，把这几处的 min-height / 尺寸提到 44px（无需改 `?v=`）。375px 下 学/练/写/复习/打印 五个标签页复查无横向溢出、布局与改前一致，45 个测试全过。PR 号见 claude/daily-2026-11-16 合并记录。
- 没做的候选：
  1. reviews/ 下两篇已下线（noindex）的测评页在 375px 有横向溢出，暂不修。
  2. vet-game.html 的语言切换和「选择病例」按钮 28–31px；该页另一条线仍在改版，暂不动。

## 2026-11-17
- 改了什么（修一个坏的地方）：Daily Practice 页（/practice/）11-15 做的 44px 点击区修复（PR #63）被 11-16 的「Tutor: clearer line-plot leaf problem wording」提交（1bb2096，从旧副本推上来）意外回退，标签按钮又变回 40px、「🔊 听一听 / Listen」又变回 36px。重新把 `nav.tabs button` 和 `.icon-btn` 的 min-height 提到 44px（页内样式，无需改 `?v=`）。375px 下 9 个标签页逐个点开复查，布局与改前一致，45 个测试全过。PR 号见 claude/daily-2026-11-17 合并记录。
- 没做的候选：
  1. /practice/ 的「Choir + STEM」标签页在 375px 有横向溢出（401px），改前就存在，与本次无关；留到下一天单独查。
  2. Tutor 线的本地副本似乎落后于 main（这次回退了 #63，也把 `<meta name="robots" content="index, follow">` 去掉了，影响不大）；建议下次推 Tutor 前先 `git pull`，否则每日修复会被反复覆盖。

## 2026-11-18
- 改了什么（修一个坏的地方）：Daily Practice 页（/practice/）「Choir + STEM」标签页在 375px 手机上横向溢出到 401px（11-17 留下的候选），原因是 STEM 实验的「Data table」（Mark 1–4 + Average，每格输入框 ≥44px）比卡片宽。给表格套一层 `.stemwrap{overflow-x:auto}` 滚动容器，表格在卡片内左右滑、整页不再溢出（页内样式，无需改 `?v=`）。375px 下 10 个标签页逐个复查均为 375px 无溢出，45 个测试全过。PR 号见 claude/daily-2026-11-18 合并记录。
- 没做的候选：
  1. reviews/ 下两篇已下线（noindex）的测评页在 375px 有横向溢出，暂不修。
  2. vet-game.html 的语言切换和「选择病例」按钮 28–31px；该页另一条线仍在改版，暂不动。

## 2026-11-19
- 改了什么（修一个坏的地方）：Daily Practice 页（/practice/）的 44px 点击区修复第三次被 Tutor 线覆盖——11-17 刚在 #69 恢复，当晚的「Tutor: Tuesday rest day on」提交（b1ce4fe）又把标签按钮改回 40px、「🔊 听一听 / Listen」改回 36px。再次恢复到 44px（页内样式，无需改 `?v=`），并在 tests/quality.test.js 加一条回归测试：practice/index.html 里 `nav.tabs button` 和 `.icon-btn` 的 min-height 必须 ≥44px，以后 Tutor 线本地跑 `node --test` 就会直接报错，不会再默默回退。375px 下 10 个标签页逐个点开均为 375px 无溢出，10 个按钮全部 44px，46 个测试全过。PR 号见 claude/daily-2026-11-19 合并记录。
- 没做的候选：
  1. Tutor 线推送前仍需 `git pull`（已核对：#70 的 `.stemwrap` 修复未受 b1ce4fe 影响）；建议老板提醒 Tutor 线每次先同步 main，否则每日修复会被反复覆盖。
  2. vet-game.html 的语言切换和「选择病例」按钮 28–31px；该页另一条线仍在改版，暂不动。

## 2026-11-20
- 改了什么（修一个坏的地方）：Daily Practice 页（/practice/）又被 Tutor 线覆盖了——11-19 的「Tutor: 11/19 math」提交（eccc95b）同时回退了 #70 的 STEM「Data table」滚动容器（`.stemwrap`，375px 又横向溢出到 401px）和 #71 的 44px 点击区（标签按钮 40px、「🔊 听一听 / Listen」36px），main 上 #71 加的回归测试因此是红的。保留 Tutor 的内容改动，只把这两处修复重新放回去（页内样式，无需改 `?v=`），并把回归测试扩到 `.stemwrap`，以后任一处被覆盖 `node --test` 都会报错。375px 下 10 个标签页逐个点开均为 375px 无溢出、标签 44px、朗读按钮 44px，46 个测试全过。PR 号见 claude/daily-2026-11-20 合并记录。
- 没做的候选：
  1. Tutor 线已连续四天从旧副本推送（每次都覆盖当天修复）；建议老板让 Tutor 线每次推送前先 `git pull` 并本地跑 `node --test tests/*.test.js`，否则这条回归测试会一直红。
  2. vet-game.html 的语言切换和「选择病例」按钮 28–31px；该页另一条线仍在改版，暂不动。

## 2026-11-21
- 改了什么（修一个坏的地方）：课程页、商品页、Times Table、5/9 速算、鸡兔同笼、感恩节、Parking Jam、找笑脸、Vet Game、隐私/条款/退款等 13 个页面顶部的面包屑链接（「Home / Printables」）只有 16px 高，低于 44px 点击区标准，手机上很难点中返回首页。在 styles.css 给 `.crumb a` 加上下 14px 的内边距并用负外边距抵消，点击区变为 47×50px，页面布局和视觉完全不变；20 个页面的 styles.css 升到 `?v=20261121a`。375px 下 13 个页面复查均无横向溢出，46 个测试全过。PR 号见 claude/daily-2026-11-21 合并记录。另：Tutor 线这次推送前已同步 main，/practice/ 的 44px 与 `.stemwrap` 修复均在，回归测试绿。
- 没做的候选：
  1. 全站页脚「Message us through our Etsy shop」等正文内链接只有 15–20px 高，属于段落内文字链接，按惯例不强求 44px，暂不动。
  2. vet-game.html 的语言切换和「选择病例」按钮 28–31px；该页另一条线仍在改版，暂不动。

## 2026-11-22
- 改了什么（修一个坏的地方）：Bird Pal 鸟语页（/birdpal/，首页和 Books & Songs 页都有「Open it full screen」入口）右上角的 EN / 中文 / ES 语言切换按钮只有 34px 高，低于 44px 点击区标准，小朋友在手机上容易点不中。该页样式写在页面内，把 `.langbtn` 的 min-height 提到 44px、左右内边距微调到 14px（无需改 `?v=`）。375px 下复查三个按钮为 51×44 / 60×44 / 50×44，页面无横向溢出、布局与改前一致，46 个测试全过。全站 23 个可索引页面扫描：无死链、无横向溢出（vetgame/ 除外，见下）。PR 号见 claude/daily-2026-11-22 合并记录。
- 没做的候选：
  1. apps/birdpal-ios/BirdPal/index.html 是 iOS 壳子里的同一页副本，语言按钮同样 34px；属于 App 发布线的文件，留给 Bird Pal 线下次发版时一起改。
  2. vetgame/index.html 在 375px 横向溢出到 378px，且语言切换 / 「选择病例」按钮只有 26–31px；该页另一条线仍在改版，暂不动。

## 2026-11-23
- 改了什么（修一个坏的地方）：Wild Case Files 兽医游戏（/vet-game.html 和 PWA 版 /vetgame/，两页共用 vet-game.css）的 中文 / EN / ES 语言切换、🔊 声音按钮只有 28px 高，「选择病例」按钮 31px，都低于 44px 点击区标准，是 11-13 起连续挂了十天的候选；该线自 11-15 起无新提交，现在修不会冲突。vet-game.css 把 `.lang-btn` 提到 min-height/min-width 44px、`.case-num` 提到 min-height 44px（版本 v=11 → v=12，两个页面同步更新）。375px 复查：五个按钮分别为 76×44 / 48×44 / 44×44 / 44×44 / 44×44，头部布局与改前一致，vet-game.html 无横向溢出，46 个测试全过。PR 号见 claude/daily-2026-11-23 合并记录。
- 没做的候选：
  1. vetgame/index.html 在 375px 横向溢出到 378px（改前已存在，与本次无关），另有「知道了 · OK」安装提示按钮 37px；留到下一天单独查。
  2. apps/birdpal-ios/BirdPal/index.html（iOS 壳子副本）的语言按钮仍是 34px，留给 Bird Pal 线发版时一起改。

## 2026-11-24
- 改了什么（修一个坏的地方）：Wild Case Files 的 PWA 版（/vetgame/）在 375px 手机上横向溢出到 378px（11-13 起挂着的候选），原因是 vetgame/app.css 给 `#vetapp` 设了左右 3px 边框但没设 `box-sizing:border-box`，`width:100%` 加边框就超出屏幕；同页「📱 装到手机主屏幕」安装提示的「知道了 · OK」按钮只有 37px 高。app.css 给 `#vetapp` 加 `box-sizing:border-box`，`.install-tip button` 提到 min-height 44px（v=1 → v=2）。顺手修正 vetgame/sw.js 的离线缓存清单：仍指向 `app.css?v=1` 和 `vet-game.css?v=11`（11-23 升到 v=12 时漏了），已更新到 v=2 / v=12 并把缓存名升到 vetgame-v6，否则已安装到主屏幕的用户拿不到新样式。375px 复查：页面 375px 无溢出，OK 按钮 106×44，头部与病例列表布局与改前一致，46 个测试全过。PR 号见 claude/daily-2026-11-24 合并记录。
- 没做的候选：
  1. apps/birdpal-ios/BirdPal/index.html（iOS 壳子副本）的语言按钮仍是 34px，留给 Bird Pal 线发版时一起改。
  2. 首页新加的 Etsy / Amazon 链接（#76）在 375px 显示正常，暂无需改；下次可核对 Books & Songs 页的亚马逊链接是否与首页一致。

## 2026-11-25
- 改了什么（提升转化：亚马逊书籍链接的清晰度）：导航里的「Books & Songs」页（projects.html）书籍区只列了 Sabrina 的两本小说，Phoebie 的漫画书《My Super Dad》——首页唯一有直达购买按钮（ASIN B0HPM4S3K6，#76 加的）的书——在这页反而找不到，从导航进来找书的人会漏掉它。把它作为第一张卡片加进同一个 `.work-row`（标题、价格 $14.99、链接全部照搬首页，不新增任何信息），小标题改为「Books on Amazon.」并说明是一本漫画加两本小说。纯 HTML 改动，无需改 `?v=`。375px 复查：页面 375px 无溢出，三张卡片各 351×172–193px，46 个测试全过。PR 号见 claude/daily-2026-11-25 合并记录。
- 没做的候选：
  1. apps/birdpal-ios/BirdPal/index.html（iOS 壳子副本）的语言按钮仍是 34px，留给 Bird Pal 线发版时一起改。
  2. 两本小说的亚马逊链接仍是搜索页（`/s?k=…`）而非商品页；没有核实过的 ASIN，不编造，等老板给链接再换。

## 2026-11-26
- 改了什么（修一个坏的地方）：Parking Jam 停车游戏页（/parking-jam.html）在手机宽度（≤520px）下，parking-jam.css 的媒体查询把 Undo / Hint / Restart / Today's Jam 四个操作按钮的 min-height 从 44px 改回了 42px，实际只有 43.5px 高，低于 44px 点击区标准，是全站 18 个可索引页面扫描里唯一不达标的地方。把该媒体查询里的 min-height 改为 44px（桌面规则本来就是 44px，等于统一），parking-jam.css 版本 v=5 → v=6（只有这一页引用）。375px 复查：四个按钮为 69×44 / 60×44 / 83×44 / 123×44，页面无横向溢出，布局与改前一致，46 个测试全过。全站扫描：18 个可索引页面无死链、无横向溢出。PR 号见 claude/daily-2026-11-26 合并记录。
- 没做的候选：
  1. 首页邮件订阅区（#signup）仍是 hidden，未接后端，按「不收集数据」的铁律保持不动。
  2. apps/birdpal-ios/BirdPal/index.html（iOS 壳子副本）的语言按钮仍是 34px，留给 Bird Pal 线发版时一起改。

## 2026-11-11（PR #49，11-18 在最新 main 上重做）
- 改了什么（删掉一个多余的东西）：product.html 是一个没有任何页面链到的孤儿页，内容还是旧方案（「Coming soon · 需家长审核」「USD 4.99 测试价」「Payhip 交付」「[parent-managed email required]」），和现在「Etsy $1.99 即时下载」的真实卖法矛盾，却仍在 sitemap 里、允许被 Google 索引。改为 noindex 并移出 sitemap，文件保留；tests/site.test.js 的索引/noindex 清单同步更新。无 CSS/JS 改动，不需要动 ?v=。45 个测试全过。PR #49。
- 说明：#49 原本捆了当时未合并的 #47、#48；一周后 main 已通过其他 PR 落地了面包屑 44px 修复，首页也已改版（#66），#47/#48 已过时，可直接关闭。#49 改为只含 product.html 这一件事。
- 没做的候选：
  1. 页脚「Affiliate Disclosure」链接和 disclosure.html：联盟页已全部下线，首页 Amazon 链接不带联盟标签，这个声明页可能已多余（涉及法律声明，需老板点头再删）。
