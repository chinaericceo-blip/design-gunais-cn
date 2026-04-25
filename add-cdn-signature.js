/**
 * GUNAIS CDN TypeA 签名生成器
 * 用途：给 img.gunais.com 的图片 URL 加上 TypeA 鉴权签名
 *
 * TypeA 签名算法：
 *   sign = MD5(密钥 + 文件URI + 时间戳)
 *   URL格式：https://img.gunais.com/URI?sign=签名&t=时间戳
 *
 * 使用方法：node add-cdn-signature.js
 */

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

// ==================== 配置 ====================
const CDN_CONFIG = {
  domain: 'img.gunais.com',
  key: 'gunai2026',          // 鉴权密钥
  timestamp: Math.floor(Date.now() / 1000),     // 当前时间戳（秒）
  paramSign: 'sign',
  paramTime: 't',
  expireSeconds: 630720000   // 有效期：20年
};

// 需要处理的 HTML 文件列表
const HTML_FILES = [
  'index.html',
  'index-cn.html',
  'portfolio.html',
  'career.html',
  'contact.html',
  'team.html',
  'events.html',
  'press.html',
  'awards.html',
  'join.html'
];

// ==================== TypeA 签名函数 ====================
function generateTypeASignature(uri, key, timestamp) {
  // URI 必须是绝对路径（以 / 开头）
  const source = key + uri + timestamp;
  return crypto.createHash('md5').update(source).digest('hex');
}

function signUrl(cdnUrl) {
  // 移除已有的 query string（如旧的 sign、t 参数）
  const cleanUrl = cdnUrl.split('?')[0];
  const urlObj = new URL(cleanUrl);

  // 获取 URI 路径（以 / 开头）
  let uri = urlObj.pathname;
  // 确保 URI 以 / 开头
  if (!uri.startsWith('/')) {
    uri = '/' + uri;
  }

  // 生成签名
  const sign = generateTypeASignature(uri, CDN_CONFIG.key, CDN_CONFIG.timestamp);

  // 构建带签名的 URL
  const signedUrl = `https://${CDN_CONFIG.domain}${uri}?${CDN_CONFIG.paramSign}=${sign}&${CDN_CONFIG.paramTime}=${CDN_CONFIG.timestamp}`;

  return signedUrl;
}

// ==================== 处理单个文件 ====================
function processFile(filePath) {
  console.log(`\n📄 处理文件: ${filePath}`);

  let content = fs.readFileSync(filePath, 'utf-8');
  let modified = false;
  let matchCount = 0;

  // 匹配所有 img.gunais.com 或 cos.ap-shanghai.myqcloud.com 的 URL
  // 处理格式：
  // src="https://img.gunais.com/gunais.com/images/xxx.webp"
  // src="img.gunais.com/gunais.com/images/xxx.webp"
  // srcset="https://img.gunais.com/..."

  // 匹配带 https:// 的 URL
  const cdnPatternHttps = /https:\/\/img\.gunais\.com(\/[^"\s>]+)/g;
  // 匹配不带协议头的 URL（img.gunais.com/xxx）
  const cdnPatternNoProtocol = /src="img\.gunais\.com(\/[^"?\s>]+)/g;

  const cosPattern = /https?:\/\/gunais-cn\d+-?\w*\.cos\.ap-shanghai\.myqcloud\.com(\/[^"\s>]+)/g;

  // 处理带 https:// 的 img.gunais.com URL
  content = content.replace(cdnPatternHttps, (match, uri) => {
    const fullUrl = 'https://img.gunais.com' + uri;
    const signedUrl = signUrl(fullUrl);
    const originalName = uri.split('/').pop().substring(0, 20);
    console.log(`  ✅ ${originalName}...`);
    matchCount++;
    modified = true;
    return signedUrl;
  });

  // 处理不带协议头的 img.gunais.com URL（添加 https://）
  content = content.replace(cdnPatternNoProtocol, (match, uri) => {
    const fullUrl = 'https://img.gunais.com' + uri;
    const signedUrl = signUrl(fullUrl);
    const originalName = uri.split('/').pop().substring(0, 20);
    console.log(`  ✅ ${originalName}...`);
    matchCount++;
    modified = true;
    return `src="${signedUrl}"`;
  });

  // 处理 COS 直接 URL（如果有的话）
  content = content.replace(cosPattern, (match, uri) => {
    const fullUrl = 'https://img.gunais.com' + uri;  // 转换为 CDN URL
    const signedUrl = signUrl(fullUrl);
    console.log(`  ✅ COS -> CDN: ${uri.substring(0, 30)}...`);
    matchCount++;
    modified = true;
    return signedUrl;
  });

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`  💾 已更新 ${matchCount} 个 URL`);
  } else {
    console.log(`  ⏭️  无需更新`);
  }

  return matchCount;
}

// ==================== 主程序 ====================
function main() {
  console.log('===========================================');
  console.log('🎯 GUNAIS CDN TypeA 签名生成器');
  console.log('===========================================');
  console.log(`⏰ 时间戳: ${CDN_CONFIG.timestamp}`);
  console.log(`🔑 密钥: ${CDN_CONFIG.key}`);
  console.log(`📅 日期: ${new Date(CDN_CONFIG.timestamp * 1000).toISOString()}`);
  console.log('');

  const baseDir = __dirname;
  let totalMatches = 0;

  for (const file of HTML_FILES) {
    const filePath = path.join(baseDir, file);
    if (fs.existsSync(filePath)) {
      totalMatches += processFile(filePath);
    } else {
      console.log(`\n⚠️  文件不存在: ${file}`);
    }
  }

  console.log('\n===========================================');
  console.log(`✅ 完成！共处理 ${totalMatches} 个 URL`);
  console.log(`⏰ 签名有效期: ${CDN_CONFIG.expireSeconds / 86400 / 365} 年（当前时间戳 + ${CDN_CONFIG.expireSeconds}秒）`);
  console.log('===========================================');
  console.log('\n💡 提示: 提交前请先在本地测试图片是否正常显示！');
}

main();
