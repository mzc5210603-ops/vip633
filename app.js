/* ═══════════ 拾句斋 · 逻辑层 ═══════════ */
"use strict";

const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const rnd = (a) => a[Math.floor(Math.random() * a.length)];

/* ═══════════ 名句典藏数据 ═══════════ */
const QUOTES = [
  { q: "路漫漫其修远兮，吾将上下而求索。", a: "屈原", e: "先秦", m: "志气" },
  { q: "士不可以不弘毅，任重而道远。", a: "曾子", e: "先秦", m: "志气" },
  { q: "知之者不如好之者，好之者不如乐之者。", a: "孔子", e: "先秦", m: "清醒" },
  { q: "知人者智，自知者明。", a: "老子", e: "先秦", m: "清醒" },
  { q: "祸兮福之所倚，福兮祸之所伏。", a: "老子", e: "先秦", m: "清醒" },
  { q: "千里之行，始于足下。", a: "老子", e: "先秦", m: "志气" },
  { q: "君子和而不同，小人同而不和。", a: "孔子", e: "先秦", m: "清醒" },
  { q: "不义而富且贵，于我如浮云。", a: "孔子", e: "先秦", m: "豁达" },
  { q: "路遥知马力，日久见人心。", a: "《增广贤文》", e: "明清", m: "清醒" },
  { q: "老骥伏枥，志在千里。", a: "曹操", e: "汉魏", m: "志气" },
  { q: "对酒当歌，人生几何。", a: "曹操", e: "汉魏", m: "豁达" },
  { q: "非淡泊无以明志，非宁静无以致远。", a: "诸葛亮", e: "汉魏", m: "清醒" },
  { q: "鞠躬尽瘁，死而后已。", a: "诸葛亮", e: "汉魏", m: "志气" },
  { q: "采菊东篱下，悠然见南山。", a: "陶渊明", e: "汉魏", m: "闲适" },
  { q: "盛年不重来，一日难再晨。", a: "陶渊明", e: "汉魏", m: "清醒" },
  { q: "海内存知己，天涯若比邻。", a: "王勃", e: "唐宋", m: "深情" },
  { q: "欲穷千里目，更上一层楼。", a: "王之涣", e: "唐宋", m: "志气" },
  { q: "天生我材必有用，千金散尽还复来。", a: "李白", e: "唐宋", m: "豁达" },
  { q: "长风破浪会有时，直挂云帆济沧海。", a: "李白", e: "唐宋", m: "志气" },
  { q: "安能摧眉折腰事权贵，使我不得开心颜。", a: "李白", e: "唐宋", m: "锋利" },
  { q: "会当凌绝顶，一览众山小。", a: "杜甫", e: "唐宋", m: "志气" },
  { q: "文章千古事，得失寸心知。", a: "杜甫", e: "唐宋", m: "清醒" },
  { q: "谁言寸草心，报得三春晖。", a: "孟郊", e: "唐宋", m: "深情" },
  { q: "野火烧不尽，春风吹又生。", a: "白居易", e: "唐宋", m: "豁达" },
  { q: "同是天涯沦落人，相逢何必曾相识。", a: "白居易", e: "唐宋", m: "深情" },
  { q: "沉舟侧畔千帆过，病树前头万木春。", a: "刘禹锡", e: "唐宋", m: "豁达" },
  { q: "莫道桑榆晚，为霞尚满天。", a: "刘禹锡", e: "唐宋", m: "豁达" },
  { q: "天若有情天亦老，人间正道是沧桑。", a: "李贺", e: "唐宋", m: "锋利" },
  { q: "春蚕到死丝方尽，蜡炬成灰泪始干。", a: "李商隐", e: "唐宋", m: "深情" },
  { q: "纸上得来终觉浅，绝知此事要躬行。", a: "陆游", e: "唐宋", m: "清醒" },
  { q: "山重水复疑无路，柳暗花明又一村。", a: "陆游", e: "唐宋", m: "豁达" },
  { q: "众里寻他千百度，蓦然回首，那人却在灯火阑珊处。", a: "辛弃疾", e: "唐宋", m: "深情" },
  { q: "醉里挑灯看剑，梦回吹角连营。", a: "辛弃疾", e: "唐宋", m: "志气" },
  { q: "人有悲欢离合，月有阴晴圆缺，此事古难全。", a: "苏轼", e: "唐宋", m: "豁达" },
  { q: "竹杖芒鞋轻胜马，谁怕？一蓑烟雨任平生。", a: "苏轼", e: "唐宋", m: "豁达" },
  { q: "腹有诗书气自华。", a: "苏轼", e: "唐宋", m: "清醒" },
  { q: "人间有味是清欢。", a: "苏轼", e: "唐宋", m: "闲适" },
  { q: "回首向来萧瑟处，归去，也无风雨也无晴。", a: "苏轼", e: "唐宋", m: "豁达" },
  { q: "问渠那得清如许，为有源头活水来。", a: "朱熹", e: "唐宋", m: "清醒" },
  { q: "粉骨碎身浑不怕，要留清白在人间。", a: "于谦", e: "明清", m: "锋利" },
  { q: "天下兴亡，匹夫有责。", a: "顾炎武", e: "明清", m: "志气" },
  { q: "风声雨声读书声，声声入耳。", a: "顾宪成", e: "明清", m: "闲适" },
  { q: "落红不是无情物，化作春泥更护花。", a: "龚自珍", e: "明清", m: "深情" },
  { q: "我劝天公重抖擞，不拘一格降人才。", a: "龚自珍", e: "明清", m: "锋利" },
  { q: "海纳百川，有容乃大；壁立千仞，无欲则刚。", a: "林则徐", e: "明清", m: "清醒" },
  { q: "苟利国家生死以，岂因祸福避趋之。", a: "林则徐", e: "明清", m: "志气" },
  { q: "横眉冷对千夫指，俯首甘为孺子牛。", a: "鲁迅", e: "近代", m: "锋利" },
  { q: "世上本没有路，走的人多了，也便成了路。", a: "鲁迅", e: "近代", m: "清醒" },
  { q: "不在沉默中爆发，就在沉默中灭亡。", a: "鲁迅", e: "近代", m: "锋利" },
  { q: "愿中国青年都摆脱冷气，只是向上走。", a: "鲁迅", e: "近代", m: "志气" },
  { q: "面朝大海，春暖花开。", a: "海子", e: "近代", m: "闲适" },
  { q: "数风流人物，还看今朝。", a: "毛泽东", e: "近代", m: "志气" },
];

/* ═══════════ 三平台模板引擎 ═══════════ */
const TPL = {
  dy: [
    "{a}这句话，让{r1}万人沉默了",
    "被{a}说穿了：{q}",
    "{r2}年后重读{a}，后背发凉",
    "把「{q2}」设成手机壁纸的第{r3}天",
    "{a}早就把答案写好了，可惜没人听",
    "这段{r4}秒的开场白，用的是{a}的原话",
    "为什么{a}能看透一切？就这一句",
    "建议全文背诵：{a}的{q2}",
  ],
  xhs: [
    "{a}的顶级{m2}｜读完不再{pain}",
    "书摘｜{a}：{q}",
    "{a}封神的{r5}个字，治好了我的{pain}",
    "今日份{m2}补给｜{a}《无题》",
    "谁懂啊！{a}这句{q2}也太会写了",
    "收藏向｜{a}笔下最{m2}的句子 TOP1",
    "{a}语录摘抄｜字字封神，建议{r6}",
    "被{a}的{m2}狠狠击中｜{q2}",
  ],
  ks: [
    "老祖宗早就说透了：{q}",
    "{a}这句话，够你受用一辈子",
    "啥叫大智慧？{a}早就说明白了",
    "记住{a}这句话，少走{r7}年弯路",
    "人才啊！{a}把话说得明明白白",
    "老铁们，{a}这句真得背下来",
    "{a}的原话，越早知道越好",
    "这才叫格局：{a}说，{q2}",
  ],
};
const PAIN = ["内耗", "焦虑", "精神内耗", "emo", "选择困难", "失眠", "摆烂"];
const M2 = { 志气: "热血", 清醒: "清醒", 深情: "深情", 豁达: "通透", 锋利: "敢说", 闲适: "松弛" };
const R46 = ["建议全文背诵", "抄进手账", "设成签名", "贴在书桌前"];
const PLAT_NAME = { dy: "抖音", xhs: "小红书", ks: "快手" };

function shortQuote(q) {
  const parts = q.replace(/[。？！，；]/g, "|").split("|").filter(Boolean);
  if (parts.length <= 1) return q.replace(/[。？！]$/, "");
  let best = parts[0];
  for (const p of parts) if (p.length <= 12 && p.length > best.length) best = p;
  return best.slice(0, 16);
}

function buildTitle(platform, Q) {
  const m2 = M2[Q.m] || "通透";
  const t = rnd(TPL[platform]);
  return t
    .replace("{a}", Q.a)
    .replace("{q}", Q.q.replace(/[。]$/, ""))
    .replace("{q2}", shortQuote(Q.q))
    .replace("{m2}", m2)
    .replace("{pain}", rnd(PAIN))
    .replace("{r1}", String(rnd([300, 800, 1200, 2000, 5000])))
    .replace("{r2}", String(rnd([500, 800, 1000, 2000])))
    .replace("{r3}", String(rnd([7, 15, 21, 30])))
    .replace("{r4}", String(rnd([10, 15, 30, 60])))
    .replace("{r5}", String(shortQuote(Q.q).length))
    .replace("{r6}", rnd(R46))
    .replace("{r7}", String(rnd([10, 20, 30])));
}

/* ═══════════ 通用：复制 & 提示 ═══════════ */
let toastT;
function toast(msg) {
  let el = $(".toast");
  if (!el) {
    el = document.createElement("div");
    el.className = "toast";
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(toastT);
  toastT = setTimeout(() => el.classList.remove("show"), 1600);
}
function copy(text) {
  const done = () => toast("已抄录到剪贴板");
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(done, () => fallbackCopy(text, done));
  } else fallbackCopy(text, done);
}
function fallbackCopy(text, done) {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.cssText = "position:fixed;opacity:0";
  document.body.appendChild(ta);
  ta.select();
  try { document.execCommand("copy"); done(); } catch { toast("复制失败，请手动选择"); }
  ta.remove();
}

/* ═══════════ 壹 · 标题生成 ═══════════ */
let curQ = null;
const LS_FAV = "quote_press_favs_v1";
let favs = [];
try { favs = JSON.parse(localStorage.getItem(LS_FAV) || "[]"); } catch { favs = []; }
if (!Array.isArray(favs)) favs = [];
const saveFavs = () => localStorage.setItem(LS_FAV, JSON.stringify(favs));

function pickQuote() {
  const era = $("#gEra").value;
  const pool = era ? QUOTES.filter((x) => x.e === era) : QUOTES;
  curQ = rnd(pool);
  $("#gQuote").innerHTML =
    "<q>" + esc(curQ.q) + "</q><em><b>" + esc(curQ.a) + "</b>" + esc(curQ.e) + " · " + esc(curQ.m) + "</em>";
}

function generate() {
  if (!curQ || $("#gEra").value !== "" && curQ.e !== $("#gEra").value) pickQuote();
  const pf = $("#gPlatform").value;
  const plats = pf === "all" ? ["dy", "xhs", "ks"] : [pf];
  const out = $("#gOut");
  out.innerHTML = "";
  plats.forEach((p) => {
    const used = new Set();
    let n = pf === "all" ? 3 : 6;
    let guard = 0;
    while (used.size < n && guard++ < 60) {
      const t = buildTitle(p, curQ);
      if (used.has(t)) continue;
      used.add(t);
      out.appendChild(titleRow(t, p));
    }
  });
}

function titleRow(text, platform, isFav) {
  const li = document.createElement("li");
  li.style.animationDelay = Math.random() * 0.15 + "s";

  const mark = document.createElement("span");
  mark.className = "t-mark " + platform;
  mark.textContent = PLAT_NAME[platform];

  const txt = document.createElement("div");
  txt.className = "t-text";
  txt.textContent = text;
  txt.appendChild(document.createElement("small")).textContent = "题眼 · " + curQ.a;

  const cp = document.createElement("button");
  cp.className = "t-copy";
  cp.textContent = "抄录";
  cp.addEventListener("click", () => copy(text));

  li.appendChild(mark);
  li.appendChild(txt);
  li.appendChild(cp);

  if (isFav) {
    const del = document.createElement("button");
    del.className = "t-fav on";
    del.textContent = "移除";
    del.addEventListener("click", () => {
      favs = favs.filter((f) => f.text !== text);
      saveFavs();
      renderFavs();
      toast("已从收藏夹移除");
    });
    li.appendChild(del);
  } else {
    const fav = document.createElement("button");
    fav.className = "t-fav" + (favs.some((f) => f.text === text) ? " on" : "");
    fav.textContent = "收藏";
    fav.addEventListener("click", () => {
      if (favs.some((f) => f.text === text)) return;
      favs.push({ text, platform, quote: curQ.q, author: curQ.a });
      saveFavs();
      fav.classList.add("on");
      renderFavs();
      toast("已入收藏夹");
    });
    li.appendChild(fav);
  }
  return li;
}

function renderFavs() {
  $("#favCnt").textContent = favs.length;
  const ul = $("#favList");
  ul.innerHTML = "";
  if (favs.length === 0) {
    ul.innerHTML = "<li><div class='t-text'><small>收藏夹还空着，点标题右侧「收藏」收入。</small></div><span></span><button class='t-copy' style='visibility:hidden'>—</button></li>";
    return;
  }
  favs.forEach((f) => {
    const li = document.createElement("li");
    const mark = document.createElement("span");
    mark.className = "t-mark " + f.platform;
    mark.textContent = PLAT_NAME[f.platform];
    const txt = document.createElement("div");
    txt.className = "t-text";
    txt.textContent = f.text;
    txt.appendChild(document.createElement("small")).textContent = "题眼 · " + f.author;
    const cp = document.createElement("button");
    cp.className = "t-copy";
    cp.textContent = "抄录";
    cp.addEventListener("click", () => copy(f.text));
    const del = document.createElement("button");
    del.className = "t-fav on";
    del.textContent = "移除";
    del.addEventListener("click", () => {
      favs = favs.filter((x) => x !== f);
      saveFavs();
      renderFavs();
    });
    li.appendChild(mark); li.appendChild(txt); li.appendChild(cp); li.appendChild(del);
    ul.appendChild(li);
  });
}

$("#gGo").addEventListener("click", () => { pickQuote(); generate(); });
$("#gReroll").addEventListener("click", () => { pickQuote(); generate(); });
$("#gEra").addEventListener("change", pickQuote);
$("#favToggle").addEventListener("click", () => {
  const ul = $("#favList");
  ul.hidden = !ul.hidden;
});

/* ═══════════ 贰 · 名句典藏 ═══════════ */
function renderLib() {
  const kw = $("#lSearch").value.trim().toLowerCase();
  const era = $("#lEra").value;
  const mood = $("#lMood").value;
  const list = QUOTES.filter((x) =>
    (!era || x.e === era) &&
    (!mood || x.m === mood) &&
    (!kw || (x.q + x.a + x.e + x.m).toLowerCase().includes(kw))
  );
  const ul = $("#libList");
  ul.innerHTML = "";
  $("#libEmpty").hidden = list.length !== 0;
  list.forEach((Q) => {
    const li = document.createElement("li");
    const bq = document.createElement("blockquote");
    bq.textContent = Q.q;
    const meta = document.createElement("div");
    meta.className = "lib-meta";
    meta.innerHTML = "<b>" + esc(Q.a) + "</b><span>" + esc(Q.e) + "</span><span>" + esc(Q.m) + "</span>";
    const ops = document.createElement("div");
    ops.className = "lib-ops";
    const mk = document.createElement("button");
    mk.className = "btn sm";
    mk.textContent = "以此为题";
    mk.addEventListener("click", () => {
      curQ = Q;
      $("#gEra").value = "";
      $("#gQuote").innerHTML = "<q>" + esc(Q.q) + "</q><em><b>" + esc(Q.a) + "</b>" + esc(Q.e) + " · " + esc(Q.m) + "</em>";
      generate();
      $$(".col").forEach((c) => c.classList.remove("active"));
      $('#menu [data-t="gen"]').classList.add("active");
      $$(".folio").forEach((f) => (f.hidden = f.id !== "gen"));
    });
    const cp = document.createElement("button");
    cp.className = "btn sm";
    cp.textContent = "抄录";
    cp.addEventListener("click", () => copy(Q.q + " —— " + Q.a));
    ops.appendChild(mk);
    ops.appendChild(cp);
    li.appendChild(bq);
    li.appendChild(meta);
    li.appendChild(ops);
    ul.appendChild(li);
  });
}
["lSearch", "lEra", "lMood"].forEach((id) =>
  $("#" + id).addEventListener("input", renderLib)
);
$("#lSearch").addEventListener("change", renderLib);

/* ═══════════ 叁 · 爆款体检 ═══════════ */
const EMO = ["内耗", "焦虑", "沉默", "后背发凉", "封神", "击中", "破防", "治好", "谁懂", "狠狠", "泪目", "上头"];
const SUS = ["为什么", "谁", "居然", "竟然", "原来", "可惜", "难怪", "建议", "记住", "才", "早就", "越早"];
const EMOJI = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u;

function checkTitle(t) {
  const reps = [];
  const len = t.length;

  if (len === 0) return null;

  const lenOk = len >= 10 && len <= 25;
  reps.push({
    cls: lenOk ? "good" : len < 10 ? "bad" : "mid",
    tag: lenOk ? "字数达标" : "字数",
    txt: "当前 " + len + " 字。" + (lenOk ? "移动端两行内完整展示。"
      : len < 10 ? "偏短，信息量不够，建议扩到 10–25 字。" : "偏长，会被截断，建议压到 25 字以内。"),
  });

  const hasNum = /\d/.test(t);
  reps.push({
    cls: hasNum ? "good" : "mid",
    tag: hasNum ? "含数字" : "无数字",
    txt: hasNum ? "数字能提升可信度与停留时长。"
      : "加上具体数字（年份、天数、人数）会更抓眼球。",
  });

  const emoHits = EMO.filter((w) => t.includes(w));
  reps.push({
    cls: emoHits.length >= 2 ? "good" : emoHits.length === 1 ? "mid" : "bad",
    tag: "情绪词",
    txt: emoHits.length ? "命中：" + emoHits.join("、") + "。" : "没有情绪词，标题偏平，难以引发共鸣。",
  });

  const susHits = SUS.filter((w) => t.includes(w));
  reps.push({
    cls: susHits.length ? "good" : "mid",
    tag: susHits.length >= 2 ? "悬念强" : "悬念",
    txt: susHits.length ? "命中：" + susHits.join("、") + "。" : "缺少疑问或反转钩子，点开率会打折。",
  });

  const hasPunc = /[！？｜｜,，:：]/.test(t);
  reps.push({
    cls: hasPunc ? "good" : "mid",
    tag: "节奏符",
    txt: hasPunc ? "有标点分段，扫读节奏好。" : "加「｜」或「！」分节，扫一眼就能抓住重点。",
  });

  const hasEmoji = EMOJI.test(t);
  reps.push({
    cls: hasEmoji ? "mid" : "good",
    tag: "表情符号",
    txt: hasEmoji ? "有 emoji：小红书友好，抖音信息流会略杂。" : "无 emoji：信息流干净；小红书可补 1 个。",
  });

  const score =
    (lenOk ? 22 : len < 10 ? 6 : 13) +
    (hasNum ? 14 : 4) +
    (emoHits.length >= 2 ? 20 : emoHits.length === 1 ? 13 : 3) +
    (susHits.length >= 2 ? 20 : susHits.length === 1 ? 14 : 5) +
    (hasPunc ? 12 : 4) +
    (hasEmoji ? 7 : 9);
  return { score: Math.min(100, score), reps };
}

$("#cGo").addEventListener("click", () => {
  const t = $("#cInput").value.trim();
  const r = checkTitle(t);
  if (!r) { toast("先贴一个标题进来"); return; }
  $("#cNeedle").style.left = "calc(" + r.score + "% - 2px)";
  $("#cScore").textContent = r.score;
  $("#cGrade").textContent = r.score >= 80 ? "上品 · 可发" : r.score >= 60 ? "中品 · 可改" : "下品 · 重写";
  const ul = $("#cReports");
  ul.innerHTML = "";
  r.reps.forEach((x, i) => {
    const li = document.createElement("li");
    li.className = x.cls;
    li.style.animationDelay = i * 0.06 + "s";
    li.innerHTML = "<i>" + esc(x.tag) + "</i><span>" + esc(x.txt) + "</span>";
    ul.appendChild(li);
  });
});

/* ═══════════ 导航 & 初始化 ═══════════ */
$("#menu").addEventListener("click", (e) => {
  const b = e.target.closest(".col");
  if (!b) return;
  $$(".col").forEach((c) => c.classList.remove("active"));
  b.classList.add("active");
  $$(".folio").forEach((f) => (f.hidden = f.id !== b.dataset.t));
});

$("#today").textContent = new Date().toLocaleDateString("zh-CN", {
  year: "numeric", month: "long", day: "numeric", weekday: "long",
});

pickQuote();
renderLib();
renderFavs();
