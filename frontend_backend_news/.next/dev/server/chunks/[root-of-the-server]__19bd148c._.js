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
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

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
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/http2 [external] (http2, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http2", () => require("http2"));

module.exports = mod;
}),
"[externals]/assert [external] (assert, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("assert", () => require("assert"));

module.exports = mod;
}),
"[externals]/tty [external] (tty, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tty", () => require("tty"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[project]/frontend_backend_news/src/app/api/lichthidau/lich-thi-dau.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fetchLeaguesMatches",
    ()=>fetchLeaguesMatches
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend_backend_news$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend_backend_news/node_modules/axios/lib/axios.js [app-route] (ecmascript)");
;
const LEAGUES = [
    {
        id: 'premier-league',
        name: 'Ngoại Hạng Anh',
        url: `https://data.bongdaplus.vn/data/bong-da-anh-matches.json?_=${Date.now()}`
    },
    {
        id: 'la-liga',
        name: 'Tây Ban Nha',
        url: `https://data.bongdaplus.vn/data/bong-da-tay-ban-nha-matches.json?_=${Date.now()}`
    },
    {
        id: 'v-league',
        name: 'V-League',
        url: `https://data.bongdaplus.vn/data/bong-da-viet-nam-matches.json?_=${Date.now()}`
    },
    {
        id: 'bundesliga',
        name: 'Đức',
        url: `https://data.bongdaplus.vn/data/bong-da-duc-matches.json?_=${Date.now()}`
    },
    {
        id: 'league-1',
        name: 'Pháp',
        url: `https://data.bongdaplus.vn/data/bong-da-phap-matches.json?_=${Date.now()}`
    },
    {
        id: 'serie-A',
        name: 'Ý',
        url: `https://data.bongdaplus.vn/data/bong-da-y-matches.json?_=${Date.now()}`
    },
    {
        id: 'champion-league',
        name: "C1",
        url: `https://data.bongdaplus.vn/data/champions-league-cup-c1-matches.json?_=${Date.now()}`
    }
];
function getDateString(timestamp) {
    try {
        return timestamp.split(' ')[0];
    } catch  {
        return "unknown";
    }
}
function groupBy(array, keyFn) {
    const result = {};
    for (const item of array){
        const key = keyFn(item);
        if (!result[key]) {
            result[key] = [];
        }
        result[key].push(item);
    }
    return result;
}
async function fetchLeaguesMatches() {
    try {
        const requests = LEAGUES.map(async (league)=>{
            try {
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$frontend_backend_news$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].get(league.url);
                const rawData = response.data;
                const matches = rawData.matches.map((item)=>({
                        round_name: item.round_name,
                        home_name: item.home_name,
                        home_logo: `https://data.bongdaplus.vn/logo/${item.home_logo}`,
                        away_name: item.away_name,
                        away_logo: `https://data.bongdaplus.vn/logo/${item.away_logo}`,
                        start_time: item.start_time,
                        goals_home: item.goals_home,
                        goals_away: item.goals_away,
                        status: item.status
                    }));
                console.log(matches);
                // --- Bắt đầu nhóm dữ liệu ---
                // 1. Nhóm theo round_name
                const roundsMap = groupBy(matches, (m)=>m.round_name);
                // 2. Với mỗi vòng, nhóm tiếp theo ngày
                const rounds = Object.entries(roundsMap).map(([roundName, roundMatches])=>{
                    const datesMap = groupBy(roundMatches, (m)=>getDateString(m.start_time));
                    const dates = Object.entries(datesMap).map(([date, matchesInDate])=>({
                            date,
                            matches: matchesInDate
                        }));
                    return {
                        round_name: roundName,
                        dates
                    };
                });
                return {
                    league_id: league.id,
                    league_name: league.name,
                    rounds
                };
            } catch (err) {
                console.warn(`Lỗi khi fetch giải: ${league.name}`, err);
                return {
                    league_id: league.id,
                    league_name: league.name,
                    rounds: []
                };
            }
        });
        const finalData = await Promise.all(requests);
        return finalData;
    } catch (error) {
        console.error("Lỗi hệ thống tổng thể:", error);
        return [];
    }
}
}),
"[project]/frontend_backend_news/src/app/api/lichthidau/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// src/app/api/bongdaplus/route.ts
__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend_backend_news$2f$src$2f$app$2f$api$2f$lichthidau$2f$lich$2d$thi$2d$dau$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend_backend_news/src/app/api/lichthidau/lich-thi-dau.ts [app-route] (ecmascript)");
;
//dinh nghia cors
const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Cache-Control': 's-maxage=600'
};
async function GET(request) {
    try {
        const res = await fetch('https://bongdaplus.vn', {
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; BongDaPlus Scraper)'
            }
        });
        if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
        const matches = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend_backend_news$2f$src$2f$app$2f$api$2f$lichthidau$2f$lich$2d$thi$2d$dau$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fetchLeaguesMatches"])();
        return Response.json({
            success: true,
            data: {
                matches
            }
        }, {
            status: 200,
            headers: corsHeaders
        });
    } catch (error) {
        console.log("lỗi header : ", error);
        return Response.json({
            success: false,
            error: error.message
        }, {
            status: 500,
            headers: corsHeaders
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__19bd148c._.js.map