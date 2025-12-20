module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/string_decoder [external] (string_decoder, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("string_decoder", () => require("string_decoder"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[externals]/timers [external] (timers, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("timers", () => require("timers"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[project]/src/app/api/bongdaplus/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$rss$2d$parser$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/rss-parser/index.js [app-route] (ecmascript)");
;
const RSS_FEED_URL = 'https://bongdaplus.vn/rss/news.rss'; // ✅ ĐÃ XÓA KHOẢNG TRẮNG
// Hàm làm sạch XML không hợp lệ
function sanitizeXml(xml) {
    // 1. Loại bỏ comment HTML nếu có
    xml = xml.replace(/<!--[\s\S]*?-->/g, '');
    // 2. Sửa các thuộc tính không có dấu nháy: width=100 → width="100"
    xml = xml.replace(/(\w+)=([^"'\s>]+)/g, '$1="$2"');
    // 3. Escape các ký tự đặc biệt trong CDATA (nếu cần)
    xml = xml.replace(/&(?![a-zA-Z0-9#]{1,20};)/g, '&amp;');
    // 4. Đảm bảo thẻ <description> không chứa XML không hợp lệ → bọc trong CDATA
    xml = xml.replace(/<description>([\s\S]*?)<\/description>/g, (match, content)=>{
        // Loại bỏ các thẻ XML không hợp lệ bên trong description
        const cleanContent = content.replace(/&(?![a-zA-Z0-9#]{1,20};)/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return `<description><![CDATA[${cleanContent}]]></description>`;
    });
    return xml;
}
const parser = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$rss$2d$parser$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"]({
    customFields: {
        item: [
            [
                'content:encoded',
                'content'
            ]
        ]
    }
});
const MAX_ARTICLES = 10;
async function GET() {
    try {
        const response = await fetch(RSS_FEED_URL, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; RSS Reader; +https://yourproject.com)'
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        let rawXml = await response.text();
        // 🔥 Làm sạch XML trước khi parse
        const cleanXml = sanitizeXml(rawXml);
        const feed = await parser.parseString(cleanXml);
        if (!feed.items?.length) {
            return Response.json({
                success: false,
                error: 'No items in feed'
            }, {
                status: 500
            });
        }
        const articles = feed.items.slice(0, MAX_ARTICLES).map((item)=>({
                title: item.title?.trim() || 'Untitled',
                link: item.link || '',
                pubDate: item.pubDate ? new Date(item.pubDate).toISOString() : new Date().toISOString(),
                summary: (item.contentSnippet || item.content || '').replace(/<[^>]*>/g, '').trim() || 'No summary',
                source: 'Bongdaplus'
            }));
        return Response.json({
            success: true,
            data: articles
        }, {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 's-maxage=300, stale-while-revalidate'
            }
        });
    } catch (error) {
        const msg = error instanceof Error ? error.message : 'Unknown';
        console.error('RSS Error:', msg);
        return Response.json({
            success: false,
            error: `Parse failed: ${msg}`
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__7b497190._.js.map