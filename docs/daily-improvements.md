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
