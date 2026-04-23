# GUNAIS Design Website — 资源替换指南

## 📁 目录结构

```
GUNAIS-CEO/
├── index.html              ← 主页文件（完整复刻CCD网站框架）
├── images/                 ← 所有图片素材（共29张，与原始对应）
│   ├── SOtK5dKuEQZsL.webp  ← Section1 大图（OUR STORY主图）
│   ├── KeIIwBeQ6VOR0.webp  ← Section3 右侧大图
│   ├── qbEmQPSlVM3l3.webp  ← Section4 全宽大图
│   ├── 6887127547350.webp  ← Section5 左侧背景图
│   ├── 6887127937687.webp  ← Section5 右侧图
│   ├── ZVztlA7rQETnE.webp  ← Section6 左侧小图
│   ├── t0JmtmoDtOEtK.webp  ← Section6 右侧小图
│   ├── 689adb6ebae49.webp  ← Section7 左侧背景图
│   ├── 689adb78ec26a.webp  ← Section7 前景小图
│   ├── 68835eeeecffe.webp  ← Section7 右侧大图
│   ├── KyJKTpx1oDBSV.webp  ← Services Slider 图1（商业空间设计）
│   ├── q3dFuMW4jHisn.webp  ← Services Slider 图2（室内设计）
│   ├── 0twy9EaFSlBEo.webp  ← Services Slider 图3（施工图深化）
│   ├── Q7R0RGJjgMA4s.webp  ← Services Slider 图4（EPC管理）
│   ├── YKv3HYEpwvFQi.webp  ← Services Slider 图5（酒店设计）
│   ├── kCMB4oremjUAM.webp  ← Services Slider 图6（展览设计）
│   ├── Ypch8ZKLhRd25.webp  ← Services Slider 图7（古建修缮）
│   ├── ZijFkjcEcZFQ7.webp  ← Services Slider 图8（现场技术）
│   └── ...（其余为品牌/合作方LOGO图）
│
├── videos/                 ← 视频文件（需手动添加）
│   ├── hero-video.mp4      ← ⚠️ 首页Banner主视频（需替换）
│   └── lifestyle-video.mp4 ← ⚠️ Section6 生活美学视频（需替换）
│
└── assets/
    ├── css/                ← 样式文件
    │   ├── common.css      ← 全局基础样式
    │   ├── header.css      ← 导航/页脚样式
    │   ├── index.css       ← 主页区块样式
    │   ├── animate.min.css ← 动画库（原版）
    │   ├── aos.css         ← AOS滚动动画库
    │   └── swiper.css      ← Swiper轮播样式
    ├── js/
    │   └── main.js         ← 主逻辑（导航/滚动/轮播/视差）
    └── icons/              ← SVG图标
        ├── gunais-logo.svg ← GUNAIS白色LOGO（可替换为品牌字体版）
        ├── arrow.svg       ← 箭头图标
        └── ...（社交媒体图标）
```

---

## 🔄 图片替换步骤

1. 准备好你的项目图片（建议 `.webp` 或 `.jpg` 格式，图片比例参考原图）
2. 将图片放入 `images/` 文件夹
3. 在 `index.html` 中找到对应的 `<img src="images/..." alt="...">` 标签
4. 将 `src` 路径替换为你的图片文件名

**示例：**
```html
<!-- 替换前 -->
<img src="images/SOtK5dKuEQZsL.webp" alt="GUNAIS Design Story">

<!-- 替换后 -->
<img src="images/gunais-story-hero.jpg" alt="谷奈斯品牌故事">
```

---

## 🎬 视频替换步骤

1. 将你的视频文件（推荐 `.mp4` H.264格式）放入 `videos/` 文件夹
2. **Banner主视频**：替换 `<video id="video" src="videos/hero-video.mp4">`
3. **生活美学视频**：替换 `<video id="video2" src="videos/lifestyle-video.mp4">`

**视频规格建议：**
- Banner视频：1920×1080 或更高，时长 10~30秒，循环播放
- 生活美学视频：1080×1350 或 9:16，时长 10~20秒

---

## 📝 文字内容替换

在 `index.html` 中找到相关文字内容直接编辑：
- **公司简介**（Section 1 `.flex1 .p2`）
- **服务描述**（Section 2 `.cut_list .p2`）
- **品牌标语**（Section 2 `.content2`、Section 3 `.t1`）
- **新闻标语**（Section 7 `.l .p1`）
- **版权信息**（`.foot .copyright`）

---

## ⚙️ 品牌信息快速替换

搜索 `index.html` 中的以下占位内容并替换：

| 占位文字 | 替换为 |
|---------|--------|
| `沪ICP备XXXXXXXX号` | 实际备案号 |
| `https://www.instagram.com` | 谷奈斯Instagram |
| `https://www.linkedin.com` | 谷奈斯LinkedIn |
| `https://weibo.com` | 谷奈斯微博 |
| `eric@gunais.com` | 联系邮箱 |

---

**制作：GUNAIS Design | 谷奈斯空间设计有限公司**  
*技术支持：WorkBuddy AI — 2026.04.20*
