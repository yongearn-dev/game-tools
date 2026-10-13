
import { useState, useEffect, useRef, useCallback } from "react";

// ─── i18n ────────────────────────────────────────────────────────────────────
const T = {
  en: {
    appTitle: "Party Toolkit",
    appSubtitle: "The ultimate group activity companion",
    tools: ["Group Splitter", "Spin Wheel", "Lucky Draw", "Scoreboard", "Random Order", "Dice Roll"],
    toolIcons: ["👥", "🎡", "🎴", "🏆", "🔀", "🎲"],

    // Group Splitter
    groupSplitter: "Group Splitter",
    addNames: "Add Names",
    namePlaceholder: "Enter name and press Enter",
    importFile: "Import File (.txt/.csv)",
    savedGroups: "Saved Groups",
    saveGroup: "Save Current List",
    saveGroupName: "Group name...",
    numGroups: "Number of Groups",
    split: "Split!",
    result: "Result",
    reshuffle: "Reshuffle",
    noNames: "Please add at least 2 names",

    // Wheel
    spinWheel: "Spin Wheel",
    addItem: "Add Item",
    itemPlaceholder: "Item name...",
    spin: "SPIN",
    winner: "Winner!",

    // Lucky Draw
    luckyDraw: "Lucky Draw",
    numCards: "Number of Cards",
    theme: "Theme",
    themeReward: "Reward",
    themeForced: "Punishment",
    themeOther: "Custom",
    customItems: "Custom items (one per line)",
    rounds: "Rounds",
    draw: "Draw Card",
    nextRound: "Next Round",
    roundOf: "Round",
    cardLeft: "cards left",
    shuffle: "Shuffle",
    rewards: "+3 pts", // placeholder

    // Scoreboard
    scoreboard: "Scoreboard",
    addTeam: "Add Team",
    teamName: "Team name...",
    gameName: "Game / Round name",
    addGame: "Add Game",
    total: "Total",
    bonus: "Bonus Applied",
    resetScores: "Reset All",

    // Random Order
    randomOrder: "Random Order",
    addOrderName: "Add name",
    randomize: "Randomize!",
    orderResult: "Order Result",

    // Dice
    diceRoll: "Dice Roll",
    numDice: "Number of Dice",
    roll: "Roll!",
    total2: "Total",
  },
  zh: {
    appTitle: "活動小工具",
    appSubtitle: "團體活動全能助手",
    tools: ["隨機分組", "隨機轉盤", "隨機抽籤", "計分板", "隨機排序", "擲骰仔"],
    toolIcons: ["👥", "🎡", "🎴", "🏆", "🔀", "🎲"],

    groupSplitter: "隨機分組",
    addNames: "新增名字",
    namePlaceholder: "輸入名字，按 Enter 確認",
    importFile: "匯入檔案 (.txt/.csv)",
    savedGroups: "已儲存名單",
    saveGroup: "儲存目前名單",
    saveGroupName: "名單名稱...",
    numGroups: "分組數量",
    split: "開始分組！",
    result: "分組結果",
    reshuffle: "重新分組",
    noNames: "請至少輸入 2 個名字",

    spinWheel: "隨機轉盤",
    addItem: "新增選項",
    itemPlaceholder: "選項名稱...",
    spin: "轉！",
    winner: "中獎！",

    luckyDraw: "隨機抽籤",
    numCards: "卡片數量",
    theme: "抽籤主題",
    themeReward: "獎勵",
    themeForced: "懲罰",
    themeOther: "自訂",
    customItems: "自訂內容（每行一項）",
    rounds: "輪數",
    draw: "抽卡",
    nextRound: "下一輪",
    roundOf: "第",
    cardLeft: "張卡剩餘",
    shuffle: "洗牌",

    scoreboard: "計分板",
    addTeam: "新增隊伍",
    teamName: "隊伍名稱...",
    gameName: "遊戲／比賽名稱",
    addGame: "新增遊戲",
    total: "總分",
    bonus: "已加入獎勵加成",
    resetScores: "重置所有分數",

    randomOrder: "隨機排序",
    addOrderName: "新增名字",
    randomize: "隨機排列！",
    orderResult: "排序結果",

    diceRoll: "擲骰仔",
    numDice: "骰仔數量",
    roll: "擲！",
    total2: "總點數",
  },
  th: {
    appTitle: "เครื่องมือกิจกรรม",
    appSubtitle: "ผู้ช่วยกิจกรรมกลุ่มสุดครบ",
    tools: ["แบ่งกลุ่ม", "วงล้อสุ่ม", "จับสลาก", "กระดานคะแนน", "เรียงสุ่ม", "ทอดลูกเต๋า"],
    toolIcons: ["👥", "🎡", "🎴", "🏆", "🔀", "🎲"],

    groupSplitter: "แบ่งกลุ่มแบบสุ่ม",
    addNames: "เพิ่มชื่อ",
    namePlaceholder: "พิมพ์ชื่อแล้วกด Enter",
    importFile: "นำเข้าไฟล์ (.txt/.csv)",
    savedGroups: "รายการที่บันทึก",
    saveGroup: "บันทึกรายการปัจจุบัน",
    saveGroupName: "ชื่อรายการ...",
    numGroups: "จำนวนกลุ่ม",
    split: "แบ่งกลุ่ม!",
    result: "ผลลัพธ์",
    reshuffle: "สุ่มใหม่",
    noNames: "กรุณาเพิ่มชื่ออย่างน้อย 2 ชื่อ",

    spinWheel: "วงล้อสุ่ม",
    addItem: "เพิ่มตัวเลือก",
    itemPlaceholder: "ชื่อตัวเลือก...",
    spin: "หมุน!",
    winner: "ผู้ชนะ!",

    luckyDraw: "จับสลาก",
    numCards: "จำนวนไพ่",
    theme: "ธีม",
    themeReward: "รางวัล",
    themeForced: "โทษ",
    themeOther: "กำหนดเอง",
    customItems: "กำหนดเอง (บรรทัดละหนึ่งรายการ)",
    rounds: "จำนวนรอบ",
    draw: "จั่วไพ่",
    nextRound: "รอบถัดไป",
    roundOf: "รอบที่",
    cardLeft: "ไพ่เหลือ",
    shuffle: "สับไพ่",

    scoreboard: "กระดานคะแนน",
    addTeam: "เพิ่มทีม",
    teamName: "ชื่อทีม...",
    gameName: "ชื่อเกม/การแข่งขัน",
    addGame: "เพิ่มเกม",
    total: "รวม",
    bonus: "ใช้โบนัสแล้ว",
    resetScores: "รีเซ็ตทั้งหมด",

    randomOrder: "เรียงลำดับแบบสุ่ม",
    addOrderName: "เพิ่มชื่อ",
    randomize: "สุ่มเรียงลำดับ!",
    orderResult: "ผลการเรียง",

    diceRoll: "ทอดลูกเต๋า",
    numDice: "จำนวนลูกเต๋า",
    roll: "ทอด!",
    total2: "รวม",
  },
};

// ─── Constants ────────────────────────────────────────────────────────────────
const TEAM_COLORS = ["#FF6B6B","#4ECDC4","#FFD93D","#6BCB77","#A78BFA","#F97316"];
const WHEEL_COLORS = ["#FF6B6B","#4ECDC4","#FFD93D","#6BCB77","#A78BFA","#F97316","#FB7185","#34D399","#60A5FA","#FBBF24","#E879F9","#2DD4BF"];

const DEFAULT_REWARDS = [
  { label: "+3 pts", value: 3, type: "flat" },
  { label: "+5 pts", value: 5, type: "flat" },
  { label: "+10 pts", value: 10, type: "flat" },
  { label: "×1.1 total", value: 1.1, type: "multi" },
  { label: "×1.2 total", value: 1.2, type: "multi" },
];

const DEFAULT_PUNISHMENTS = [
  "🎤 Sing a song",
  "💃 Dance for 30 seconds",
  "🐸 Act like an animal (others guess)",
  "🕵️ Act as a person (others guess)",
  "👅 Tongue twister challenge",
  "🧊 Freeze challenge (hold pose 30s)",
  "🤐 Silent mode (can't speak for 1 min)",
  "🐔 Do 10 chicken wings",
  "📢 Shout your team's cheer",
  "🤸 Do 5 jumping jacks",
  "😂 Make everyone laugh (30 sec)",
  "🎭 Dramatic reading of any text",
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);
const uid = () => Math.random().toString(36).slice(2);

// ─── Components ──────────────────────────────────────────────────────────────

function Tag({ children, color, onRemove }) {
  return (
    <span style={{
      display:"inline-flex", alignItems:"center", gap:4,
      background: color || "rgba(255,255,255,0.15)",
      border: "1px solid rgba(255,255,255,0.25)",
      borderRadius: 999, padding:"3px 10px",
      fontSize:13, color:"#fff", backdropFilter:"blur(4px)",
      margin:"2px"
    }}>
      {children}
      {onRemove && <button onClick={onRemove} style={{background:"none",border:"none",color:"rgba(255,255,255,0.7)",cursor:"pointer",padding:0,fontSize:14,lineHeight:1}}>×</button>}
    </span>
  );
}

function GlassCard({ children, style }) {
  return (
    <div style={{
      background:"rgba(255,255,255,0.08)",
      border:"1px solid rgba(255,255,255,0.18)",
      borderRadius:20, padding:20, backdropFilter:"blur(12px)",
      boxShadow:"0 8px 32px rgba(0,0,0,0.2)",
      ...style
    }}>
      {children}
    </div>
  );
}

function Btn({ children, onClick, color, small, disabled, style }) {
  const bg = color || "linear-gradient(135deg,#FF6B6B,#FF8E53)";
  return (
    <button onClick={onClick} disabled={disabled} style={{
      background: disabled ? "rgba(255,255,255,0.1)" : bg,
      border:"none", borderRadius: small ? 10 : 14,
      padding: small ? "6px 14px" : "11px 22px",
      color: disabled ? "rgba(255,255,255,0.4)" : "#fff",
      fontWeight:700, fontSize: small ? 13 : 15,
      cursor: disabled ? "not-allowed" : "pointer",
      transition:"all .2s", boxShadow: disabled ? "none" : "0 4px 15px rgba(0,0,0,0.25)",
      letterSpacing:"0.3px",
      ...style
    }}
    onMouseEnter={e=>{ if(!disabled) e.currentTarget.style.transform="translateY(-1px)"; }}
    onMouseLeave={e=>{ e.currentTarget.style.transform="translateY(0)"; }}
    >
      {children}
    </button>
  );
}

function Input({ value, onChange, onKeyDown, placeholder, style }) {
  return (
    <input
      value={value} onChange={e=>onChange(e.target.value)}
      onKeyDown={onKeyDown} placeholder={placeholder}
      style={{
        background:"rgba(255,255,255,0.1)",
        border:"1px solid rgba(255,255,255,0.2)",
        borderRadius:10, padding:"9px 14px", color:"#fff",
        fontSize:14, outline:"none", width:"100%",
        boxSizing:"border-box",
        ...style
      }}
    />
  );
}

// ─── 1. Group Splitter ────────────────────────────────────────────────────────
function GroupSplitter({ t }) {
  const [names, setNames] = useState([]);
  const [input, setInput] = useState("");
  const [numGroups, setNumGroups] = useState(2);
  const [result, setResult] = useState(null);
  const [savedGroups, setSavedGroups] = useState(() => {
    try { return JSON.parse(localStorage.getItem("savedGroups") || "[]"); } catch { return []; }
  });
  const [saveName, setSaveName] = useState("");
  const fileRef = useRef();

  const addName = () => {
    const trimmed = input.trim();
    if (trimmed && !names.includes(trimmed)) {
      setNames(p => [...p, trimmed]);
      setInput("");
    }
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const lines = ev.target.result.split(/[\n,;]+/).map(s => s.trim()).filter(Boolean);
      setNames(prev => [...new Set([...prev, ...lines])]);
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const doSplit = () => {
    if (names.length < 2) return;
    const s = shuffle(names);
    const groups = Array.from({length: numGroups}, () => []);
    s.forEach((n, i) => groups[i % numGroups].push(n));
    setResult(groups);
  };

  const saveCurrentGroup = () => {
    if (!saveName.trim() || names.length === 0) return;
    const group = { id: uid(), name: saveName.trim(), names: [...names] };
    const updated = [...savedGroups, group];
    setSavedGroups(updated);
    localStorage.setItem("savedGroups", JSON.stringify(updated));
    setSaveName("");
  };

  const loadGroup = (g) => setNames(g.names);
  const deleteGroup = (id) => {
    const updated = savedGroups.filter(g => g.id !== id);
    setSavedGroups(updated);
    localStorage.setItem("savedGroups", JSON.stringify(updated));
  };

  return (
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      {/* Input area */}
      <GlassCard>
        <div style={{display:"flex",gap:8,marginBottom:10}}>
          <Input value={input} onChange={setInput} placeholder={t.namePlaceholder}
            onKeyDown={e=>{ if(e.key==="Enter") addName(); }} style={{flex:1}} />
          <Btn onClick={addName} small color="linear-gradient(135deg,#4ECDC4,#2DD4BF)">{t.addNames}</Btn>
        </div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:8}}>
          {names.map(n => (
            <Tag key={n} onRemove={()=>setNames(p=>p.filter(x=>x!==n))}>{n}</Tag>
          ))}
        </div>
        <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
          <Btn onClick={()=>fileRef.current.click()} small color="linear-gradient(135deg,#A78BFA,#8B5CF6)">
            📁 {t.importFile}
          </Btn>
          <input ref={fileRef} type="file" accept=".txt,.csv" style={{display:"none"}} onChange={handleFile}/>
          <span style={{color:"rgba(255,255,255,0.5)",fontSize:13}}>{names.length} {t.zh ? "人" : "names"}</span>
          {names.length > 0 && <Btn onClick={()=>setNames([])} small color="rgba(255,80,80,0.4)">✕ Clear</Btn>}
        </div>
      </GlassCard>

      {/* Save/load */}
      <GlassCard>
        <div style={{fontWeight:700,marginBottom:8,color:"#FFD93D"}}>💾 {t.savedGroups}</div>
        <div style={{display:"flex",gap:8,marginBottom:10}}>
          <Input value={saveName} onChange={setSaveName} placeholder={t.saveGroupName} style={{flex:1}}/>
          <Btn onClick={saveCurrentGroup} small color="linear-gradient(135deg,#FFD93D,#F97316)">Save</Btn>
        </div>
        <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
          {savedGroups.map(g => (
            <div key={g.id} style={{display:"flex",alignItems:"center",gap:4,background:"rgba(255,255,255,0.1)",borderRadius:10,padding:"4px 10px"}}>
              <button onClick={()=>loadGroup(g)} style={{background:"none",border:"none",color:"#fff",cursor:"pointer",fontWeight:600,fontSize:13}}>
                📋 {g.name} ({g.names.length})
              </button>
              <button onClick={()=>deleteGroup(g.id)} style={{background:"none",border:"none",color:"rgba(255,100,100,0.8)",cursor:"pointer",fontSize:14}}>×</button>
            </div>
          ))}
          {savedGroups.length === 0 && <span style={{color:"rgba(255,255,255,0.3)",fontSize:13}}>No saved groups yet</span>}
        </div>
      </GlassCard>

      {/* Split control */}
      <GlassCard>
        <div style={{display:"flex",alignItems:"center",gap:16,flexWrap:"wrap"}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <span style={{color:"rgba(255,255,255,0.7)",fontSize:14}}>{t.numGroups}:</span>
            {[2,3,4,5,6].map(n => (
              <button key={n} onClick={()=>setNumGroups(n)} style={{
                width:36,height:36,borderRadius:10,border:"2px solid",
                borderColor: numGroups===n ? "#FF6B6B" : "rgba(255,255,255,0.2)",
                background: numGroups===n ? "#FF6B6B" : "rgba(255,255,255,0.05)",
                color:"#fff",fontWeight:700,cursor:"pointer",fontSize:15
              }}>{n}</button>
            ))}
          </div>
          <Btn onClick={doSplit} color="linear-gradient(135deg,#FF6B6B,#FF8E53)"
            disabled={names.length < 2}>{t.split}</Btn>
          {result && <Btn onClick={doSplit} small color="rgba(255,255,255,0.15)">🔀 {t.reshuffle}</Btn>}
        </div>
      </GlassCard>

      {/* Result */}
      {result && (
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:12}}>
          {result.map((group, i) => (
            <GlassCard key={i} style={{borderTop:`3px solid ${TEAM_COLORS[i]}`,padding:14}}>
              <div style={{fontWeight:800,fontSize:15,color:TEAM_COLORS[i],marginBottom:8}}>
                Group {i+1}
              </div>
              {group.map(n => (
                <div key={n} style={{padding:"4px 0",borderBottom:"1px solid rgba(255,255,255,0.08)",fontSize:14,color:"rgba(255,255,255,0.9)"}}>
                  {n}
                </div>
              ))}
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── 2. Spin Wheel ────────────────────────────────────────────────────────────
// Pointer is fixed at the RIGHT (angle 0 = 3 o'clock).
// Winner = whichever segment is under angle=0 after the wheel stops.
function SpinWheel({ t }) {
  const canvasRef = useRef();
  const [items, setItems] = useState(["Alice","Bob","Carol","David","Eve","Frank"]);
  const [input, setInput] = useState("");
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState(null);
  const angleRef = useRef(0); // current rotation of the WHEEL (added to each segment start)
  const rafRef = useRef();

  const drawWheel = useCallback((angle) => {
    const canvas = canvasRef.current;
    if (!canvas || items.length === 0) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width, cx = W/2, cy = W/2, r = W/2 - 18;
    ctx.clearRect(0,0,W,W);

    // Outer ring
    ctx.beginPath();
    ctx.arc(cx, cy, r + 12, 0, 2*Math.PI);
    ctx.fillStyle = "rgba(255,255,255,0.06)";
    ctx.fill();

    const n = items.length;
    const slice = (2 * Math.PI) / n;

    // ── Helper: wrap text to fit within maxWidth, returns array of lines ──
    const wrapText = (label, maxW, fSize) => {
      ctx.font = `bold ${fSize}px 'Segoe UI',sans-serif`;
      const words = label.split(/\s+/);
      const lines = [];
      let cur = "";
      for (const w of words) {
        const test = cur ? cur + " " + w : w;
        if (ctx.measureText(test).width <= maxW) {
          cur = test;
        } else {
          if (cur) lines.push(cur);
          // If single word too wide, break it by characters
          if (ctx.measureText(w).width > maxW) {
            let chunk = "";
            for (const ch of w) {
              if (ctx.measureText(chunk + ch).width <= maxW) {
                chunk += ch;
              } else {
                if (chunk) lines.push(chunk);
                chunk = ch;
              }
            }
            if (chunk) cur = chunk;
            else cur = "";
          } else {
            cur = w;
          }
        }
      }
      if (cur) lines.push(cur);
      return lines;
    };

    items.forEach((item, i) => {
      const start = angle + i * slice;
      const end = start + slice;

      // Segment
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, start, end);
      ctx.closePath();
      ctx.fillStyle = WHEEL_COLORS[i % WHEEL_COLORS.length];
      ctx.fill();
      ctx.strokeStyle = "rgba(0,0,0,0.22)";
      ctx.lineWidth = 2;
      ctx.stroke();

      // ── Smart text layout ──
      const mid = start + slice / 2;

      // Available space along the arc (chord at textR) and radially
      const textR = r * 0.60;           // where text centre sits along radius
      const arcWidth = 2 * textR * Math.sin(slice / 2) * 0.88; // chord width budget
      const radialDepth = r * 0.52;     // radial depth budget (from ~0.35r to ~0.87r)

      // Try radial orientation first (text along radius, rotated 90°)
      //   — available width = arcWidth, available height = radialDepth
      // Try tangential orientation (text horizontal / along arc)
      //   — available width = radialDepth, available height = arcWidth

      // Pick font size that fits in either orientation
      // We'll pick the orientation that gives more readable result
      const baseFontSize = Math.max(9, Math.min(14, r / 10 + 2));
      let fontSize = baseFontSize;

      // Decide orientation:
      // Radial is better for narrow slices (many items), tangential for wide ones
      // Threshold: if arcWidth > radialDepth, tangential wins
      const useRadial = arcWidth <= radialDepth * 1.1 || n > 8;

      const maxW = useRadial ? arcWidth : radialDepth;
      const maxH = useRadial ? radialDepth : arcWidth;

      // Find largest font where wrapped lines fit vertically
      let lines = [];
      for (let fs = fontSize; fs >= 7; fs--) {
        const ls = fs * 1.25; // line spacing
        const wrapped = wrapText(item, maxW, fs);
        if (wrapped.length * ls <= maxH + ls * 0.5) {
          lines = wrapped;
          fontSize = fs;
          break;
        }
        // Try with one less line slot
      }
      if (!lines.length) {
        // Fallback: truncate to fit 1 line
        lines = [item];
        fontSize = 8;
      }

      const lineHeight = fontSize * 1.28;
      const totalTextH = lines.length * lineHeight;
      const tx = cx + Math.cos(mid) * textR;
      const ty = cy + Math.sin(mid) * textR;

      ctx.save();
      ctx.translate(tx, ty);

      if (useRadial) {
        // Rotate so text reads along the radius (from centre outward)
        ctx.rotate(mid + Math.PI / 2);
      } else {
        // Tangential: keep text "upright" relative to the segment midpoint
        // Rotate so text runs along the arc direction
        let tangle = mid;
        // Flip if bottom half so text doesn't read upside-down
        if (mid > Math.PI / 2 && mid < 3 * Math.PI / 2) tangle += Math.PI;
        ctx.rotate(tangle);
      }

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = `bold ${fontSize}px 'Segoe UI',sans-serif`;
      ctx.shadowColor = "rgba(0,0,0,0.9)";
      ctx.shadowBlur = 5;
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 1;
      ctx.fillStyle = "#fff";

      lines.forEach((line, li) => {
        const yOff = (li - (lines.length - 1) / 2) * lineHeight;
        ctx.fillText(line, 0, yOff);
      });

      ctx.shadowBlur = 0;
      ctx.restore();
    });

    // ── Map-pin at the CENTRE: round head sits at (cx,cy), needle points right to rim ──
    const pinHeadR = 13;
    const needleTipX = cx + r + 2; // needle tip just at the rim
    const needleTipY = cy;

    // Needle (thin line from head centre to rim)
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(needleTipX, needleTipY);
    ctx.strokeStyle = "#CC0000";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.shadowColor = "rgba(180,0,0,0.45)";
    ctx.shadowBlur = 5;
    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.lineCap = "butt";

    // Pin head at centre — map-pin style with radial gradient + shine
    const pinGrad = ctx.createRadialGradient(cx - 4, cy - 4, 1, cx, cy, pinHeadR);
    pinGrad.addColorStop(0, "#FF7777");
    pinGrad.addColorStop(0.4, "#EE1111");
    pinGrad.addColorStop(1, "#880000");
    ctx.beginPath();
    ctx.arc(cx, cy, pinHeadR, 0, 2*Math.PI);
    ctx.fillStyle = pinGrad;
    ctx.shadowColor = "rgba(200,0,0,0.6)";
    ctx.shadowBlur = 12;
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.strokeStyle = "rgba(255,255,255,0.5)";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Shine highlight on pin head
    ctx.beginPath();
    ctx.arc(cx - 4, cy - 4, 4, 0, 2*Math.PI);
    ctx.fillStyle = "rgba(255,255,255,0.4)";
    ctx.fill();
  }, [items]);

  useEffect(() => { drawWheel(angleRef.current); }, [drawWheel]);

  const doSpin = () => {
    if (spinning || items.length < 2) return;
    setSpinning(true);
    setWinner(null);
    const extraSpins = Math.floor(Math.random() * 5) + 6; // 6-10 full rotations
    const totalRot = extraSpins * 2 * Math.PI + Math.random() * 2 * Math.PI;
    const duration = 4000 + Math.random() * 1200;
    const startTime = performance.now();
    const startAngle = angleRef.current;

    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out quart
      const ease = 1 - Math.pow(1 - progress, 4);
      const current = startAngle + totalRot * ease;
      angleRef.current = current;
      drawWheel(current);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setSpinning(false);
        // Pointer is at angle 0 (rightmost point).
        // Segment i spans [angle + i*slice, angle + (i+1)*slice].
        // We need the segment that contains angle = 0 (mod 2π).
        const slice = (2 * Math.PI) / items.length;
        // Normalise wheel rotation so we can find which segment is at 0
        const normalised = ((current % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
        // The segment whose start ≤ (2π - normalised) < end
        const pointerAngle = (2 * Math.PI - normalised + 2 * Math.PI) % (2 * Math.PI);
        const idx = Math.floor(pointerAngle / slice) % items.length;
        setWinner(items[idx]);
      }
    };
    rafRef.current = requestAnimationFrame(animate);
  };

  const addItem = () => {
    if (input.trim() && !items.includes(input.trim())) {
      setItems(p => [...p, input.trim()]);
      setInput("");
    }
  };

  return (
    <div style={{display:"flex",flexDirection:"column",gap:16,alignItems:"center"}}>
      <div style={{display:"flex",gap:8,width:"100%"}}>
        <Input value={input} onChange={setInput} placeholder={t.itemPlaceholder}
          onKeyDown={e=>{ if(e.key==="Enter") addItem(); }} style={{flex:1}} />
        <Btn onClick={addItem} small color="linear-gradient(135deg,#4ECDC4,#2DD4BF)">{t.addItem}</Btn>
      </div>
      <div style={{display:"flex",flexWrap:"wrap",gap:4,width:"100%"}}>
        {items.map((item,i) => (
          <Tag key={item} color={WHEEL_COLORS[i%WHEEL_COLORS.length]+"88"}
            onRemove={()=>setItems(p=>p.filter(x=>x!==item))}>{item}</Tag>
        ))}
      </div>
      <div style={{position:"relative",width:320,height:320}}>
        <canvas ref={canvasRef} width={320} height={320}
          style={{display:"block",filter:"drop-shadow(0 0 20px rgba(255,50,50,0.3))"}} />
      </div>
      <Btn onClick={doSpin} disabled={spinning || items.length<2}
        style={{fontSize:20,padding:"14px 48px",letterSpacing:2,
          boxShadow:"0 0 30px rgba(255,107,107,0.5)"}}>
        {spinning ? "⏳" : t.spin}
      </Btn>
      {winner && (
        <div style={{textAlign:"center",animation:"pop .4s ease"}}>
          <div style={{fontSize:13,color:"rgba(255,255,255,0.6)",marginBottom:4}}>{t.winner}</div>
          <div style={{fontSize:28,fontWeight:900,color:"#FFD93D",textShadow:"0 0 20px #FFD93D"}}>🎉 {winner} 🎉</div>
        </div>
      )}
    </div>
  );
}

// ─── 3. Lucky Draw ────────────────────────────────────────────────────────────
function buildDeck(theme, numCards, customText) {
  if (theme === "reward") {
    const pool = [];
    const weights = [8, 6, 3, 2, 1];
    const labels = ["+3 pts","+5 pts","+10 pts","×1.1 Total","×1.2 Total"];
    const scaled = weights.map(w => Math.max(1, Math.round(w * numCards / 20)));
    labels.forEach((label, i) => {
      for (let j = 0; j < scaled[i]; j++) pool.push({ label, emoji:"⭐", type:"reward" });
    });
    return shuffle(pool).slice(0, numCards);
  }
  if (theme === "punishment") {
    const pool = shuffle([...DEFAULT_PUNISHMENTS]);
    const deck = [];
    for (let i = 0; i < numCards; i++) deck.push({ label: pool[i % pool.length], emoji:"💀", type:"punishment" });
    return shuffle(deck);
  }
  // custom
  const lines = customText.split("\n").map(s=>s.trim()).filter(Boolean);
  if (lines.length === 0) return [];
  const deck = [];
  for (let i = 0; i < numCards; i++) deck.push({ label: lines[i % lines.length], emoji:"🎴", type:"custom" });
  return shuffle(deck);
}

function LuckyDraw({ t }) {
  const [numCards, setNumCards] = useState(9);
  const [theme, setTheme] = useState("reward");
  const [customText, setCustomText] = useState("");
  const [rounds, setRounds] = useState(1);
  const [deck, setDeck] = useState([]);
  const [currentRound, setCurrentRound] = useState(1);
  const [drawn, setDrawn] = useState([]); // array of indices that have been drawn
  const [lastDrawn, setLastDrawn] = useState(null); // the card object just drawn
  const [started, setStarted] = useState(false);

  const startGame = () => {
    const d = buildDeck(theme, numCards, customText);
    setDeck(d);
    setDrawn([]);
    setCurrentRound(1);
    setLastDrawn(null);
    setStarted(true);
  };

  // Draw the next un-drawn card (in order, deck is already shuffled)
  const drawCard = (idx) => {
    if (drawn.includes(idx)) return; // already drawn
    setLastDrawn(deck[idx]);
    setDrawn(p => [...p, idx]);
  };

  const nextRound = () => {
    if (currentRound >= rounds) return;
    const d = buildDeck(theme, numCards, customText);
    setDeck(d);
    setDrawn([]);
    setLastDrawn(null);
    setCurrentRound(p => p+1);
  };

  const remaining = deck.length - drawn.length;

  // Card slot component
  const CardSlot = ({ index }) => {
    const isDrawn = drawn.includes(index);
    const card = deck[index];
    const isLast = lastDrawn && isDrawn && drawn[drawn.length-1] === index;

    if (isDrawn && card) {
      // Revealed card
      const bg = card.type==="reward"
        ? "linear-gradient(135deg,#FFD93D,#F97316)"
        : card.type==="punishment"
        ? "linear-gradient(135deg,#FF6B6B,#B91C1C)"
        : "linear-gradient(135deg,#4ECDC4,#2DD4BF)";
      return (
        <div style={{
          width:"100%", aspectRatio:"2/3", borderRadius:12,
          background: bg,
          display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
          padding:"8px 4px", textAlign:"center",
          boxShadow: isLast ? `0 0 20px ${card.type==="reward"?"rgba(255,217,61,0.7)":card.type==="punishment"?"rgba(255,107,107,0.7)":"rgba(78,205,196,0.7)"}` : "0 2px 8px rgba(0,0,0,0.3)",
          animation: isLast ? "pop .35s ease" : "none",
          border: isLast ? "2px solid rgba(255,255,255,0.6)" : "2px solid transparent",
          transition:"all .3s",
          position:"relative"
        }}>
          <div style={{fontSize:18}}>{card.emoji}</div>
          <div style={{fontSize:11,fontWeight:700,color:"#fff",marginTop:4,lineHeight:1.2,
            textShadow:"0 1px 3px rgba(0,0,0,0.4)"}}>{card.label}</div>
        </div>
      );
    }

    // Face-down card (clickable)
    return (
      <div onClick={()=>drawCard(index)} style={{
        width:"100%", aspectRatio:"2/3", borderRadius:12, cursor:"pointer",
        background:"linear-gradient(135deg,#6d28d9,#4c1d95)",
        display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
        boxShadow:"0 4px 12px rgba(0,0,0,0.4)",
        border:"2px solid rgba(167,139,250,0.35)",
        transition:"transform .15s, box-shadow .15s",
        userSelect:"none"
      }}
      onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px) scale(1.04)";e.currentTarget.style.boxShadow="0 8px 20px rgba(167,139,250,0.5)";}}
      onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="0 4px 12px rgba(0,0,0,0.4)";}}
      >
        {/* Card back pattern */}
        <div style={{fontSize:22,opacity:0.6}}>🂠</div>
        <div style={{fontSize:9,color:"rgba(255,255,255,0.4)",marginTop:3}}>{index+1}</div>
      </div>
    );
  };

  return (
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <GlassCard>
        {/* Card count — horizontal row */}
        <div style={{marginBottom:14}}>
          <div style={{fontSize:12,color:"rgba(255,255,255,0.5)",fontWeight:600,letterSpacing:"0.5px",textTransform:"uppercase",marginBottom:6}}>{t.numCards}</div>
          <div style={{display:"flex",gap:6}}>
            {[3,6,9,12].map(n=>(
              <button key={n} onClick={()=>setNumCards(n)} style={{
                flex:1,height:38,borderRadius:8,border:"2px solid",
                borderColor:numCards===n?"#FFD93D":"rgba(255,255,255,0.15)",
                background:numCards===n?"rgba(255,217,61,0.18)":"transparent",
                color:numCards===n?"#FFD93D":"rgba(255,255,255,0.55)",
                fontWeight:700,cursor:"pointer",fontSize:15,
                transition:"all .15s"
              }}>{n}</button>
            ))}
          </div>
        </div>

        {/* Rounds — horizontal row */}
        <div style={{marginBottom:14}}>
          <div style={{fontSize:12,color:"rgba(255,255,255,0.5)",fontWeight:600,letterSpacing:"0.5px",textTransform:"uppercase",marginBottom:6}}>{t.rounds}</div>
          <div style={{display:"flex",gap:6}}>
            {[1,2,3,4,5].map(n=>(
              <button key={n} onClick={()=>setRounds(n)} style={{
                width:42,height:38,borderRadius:10,border:"2px solid",
                borderColor:rounds===n?"#4ECDC4":"rgba(255,255,255,0.15)",
                background:rounds===n?"rgba(78,205,196,0.2)":"transparent",
                color:rounds===n?"#4ECDC4":"rgba(255,255,255,0.55)",
                fontWeight:700,cursor:"pointer",fontSize:16,
                transition:"all .15s"
              }}>{n}</button>
            ))}
          </div>
        </div>

        {/* Theme */}
        <div style={{marginBottom:14}}>
          <div style={{fontSize:12,color:"rgba(255,255,255,0.5)",fontWeight:600,letterSpacing:"0.5px",textTransform:"uppercase",marginBottom:6}}>{t.theme}</div>
          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
            {[["reward",t.themeReward,"⭐"],["punishment",t.themeForced,"💀"],["other",t.themeOther,"🎴"]].map(([v,label,icon])=>(
              <button key={v} onClick={()=>setTheme(v)} style={{
                padding:"7px 14px",borderRadius:10,border:"2px solid",
                borderColor:theme===v?"#FF6B6B":"rgba(255,255,255,0.15)",
                background:theme===v?"rgba(255,107,107,0.2)":"transparent",
                color:"#fff",cursor:"pointer",fontWeight:600,fontSize:13,
                transition:"all .15s"
              }}>{icon} {label}</button>
            ))}
          </div>
        </div>

        {theme==="other" && (
          <div style={{marginBottom:14}}>
            <div style={{fontSize:12,color:"rgba(255,255,255,0.5)",marginBottom:4}}>{t.customItems}</div>
            <textarea value={customText} onChange={e=>setCustomText(e.target.value)}
              style={{width:"100%",minHeight:70,background:"rgba(255,255,255,0.08)",
                border:"1px solid rgba(255,255,255,0.2)",borderRadius:10,padding:10,
                color:"#fff",fontSize:13,resize:"vertical",boxSizing:"border-box"}} />
          </div>
        )}

        <div style={{display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"}}>
          <Btn onClick={startGame} color="linear-gradient(135deg,#A78BFA,#8B5CF6)">
            🃏 {started ? `🔀 ${t.shuffle}` : `Start`}
          </Btn>
          {started && (
            <span style={{fontSize:13,color:"rgba(255,255,255,0.4)"}}>
              {t.roundOf} {currentRound}/{rounds} · {remaining} {t.cardLeft}
            </span>
          )}
          {started && currentRound < rounds && remaining === 0 && (
            <Btn onClick={nextRound} small color="linear-gradient(135deg,#4ECDC4,#2DD4BF)">{t.nextRound}</Btn>
          )}
        </div>
      </GlassCard>

      {/* Card Grid — 3 per row, result banner BELOW */}
      {started && deck.length > 0 && (
        <div>
          <div style={{
            display:"grid",
            gridTemplateColumns:"repeat(3,1fr)",
            gap:10
          }}>
            {deck.map((_,i) => <CardSlot key={i} index={i}/>)}
          </div>

          {/* Result banner below all cards */}
          {lastDrawn && (
            <div style={{
              marginTop:16,
              background: lastDrawn.type==="reward"
                ? "linear-gradient(135deg,#FFD93D,#F97316)"
                : lastDrawn.type==="punishment"
                ? "linear-gradient(135deg,#FF6B6B,#B91C1C)"
                : "linear-gradient(135deg,#4ECDC4,#2DD4BF)",
              borderRadius:16,padding:"16px 24px",textAlign:"center",
              boxShadow:`0 6px 30px ${lastDrawn.type==="reward"?"rgba(255,217,61,0.5)":lastDrawn.type==="punishment"?"rgba(255,107,107,0.5)":"rgba(78,205,196,0.5)"}`,
              animation:"pop .35s ease",
              display:"flex",alignItems:"center",justifyContent:"center",gap:14
            }}>
              <span style={{fontSize:32}}>{lastDrawn.emoji}</span>
              <span style={{fontSize:20,fontWeight:800,color:"#fff"}}>{lastDrawn.label}</span>
            </div>
          )}

          {remaining === 0 && (
            <div style={{textAlign:"center",marginTop:10,color:"rgba(255,255,255,0.5)",fontSize:13}}>
              ✅ All cards drawn!
            </div>
          )}
        </div>
      )}

    </div>
  );
}

// ─── 4. Scoreboard ────────────────────────────────────────────────────────────
function Scoreboard({ t }) {
  const [teams, setTeams] = useState([
    { id:uid(), name:"Team A", color:TEAM_COLORS[0], scores:{} },
    { id:uid(), name:"Team B", color:TEAM_COLORS[1], scores:{} },
  ]);
  const [games, setGames] = useState(["Game 1"]);
  const [teamInput, setTeamInput] = useState("");
  const [gameInput, setGameInput] = useState("");
  const [bonuses, setBonuses] = useState({}); // teamId -> bonus multiplier

  const addTeam = () => {
    if (!teamInput.trim() || teams.length >= 6) return;
    setTeams(p => [...p, { id:uid(), name:teamInput.trim(), color:TEAM_COLORS[p.length], scores:{} }]);
    setTeamInput("");
  };

  const addGame = () => {
    if (!gameInput.trim()) return;
    setGames(p => [...p, gameInput.trim()]);
    setGameInput("");
  };

  const adjustScore = (teamId, game, delta) => {
    setTeams(p => p.map(t => t.id===teamId
      ? { ...t, scores: { ...t.scores, [game]: (t.scores[game]||0) + delta } }
      : t
    ));
  };

  const getTotal = (team) => {
    const raw = Object.values(team.scores).reduce((a,b)=>a+b,0);
    const bonus = bonuses[team.id] || 1;
    return Math.round(raw * bonus);
  };

  const applyBonus = (teamId, mult) => {
    setBonuses(p => ({ ...p, [teamId]: mult }));
  };

  const reset = () => {
    setTeams(p => p.map(t => ({ ...t, scores:{} })));
    setBonuses({});
  };

  const sorted = [...teams].sort((a,b) => getTotal(b) - getTotal(a));
  const maxTotal = Math.max(...teams.map(getTotal), 1);

  return (
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      {/* Controls */}
      <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
        <div style={{display:"flex",gap:6,flex:1,minWidth:200}}>
          <Input value={teamInput} onChange={setTeamInput} placeholder={t.teamName}
            onKeyDown={e=>{ if(e.key==="Enter") addTeam(); }} style={{flex:1}} />
          <Btn onClick={addTeam} small disabled={teams.length>=6}
            color="linear-gradient(135deg,#6BCB77,#22c55e)">{t.addTeam}</Btn>
        </div>
        <div style={{display:"flex",gap:6,flex:1,minWidth:200}}>
          <Input value={gameInput} onChange={setGameInput} placeholder={t.gameName}
            onKeyDown={e=>{ if(e.key==="Enter") addGame(); }} style={{flex:1}} />
          <Btn onClick={addGame} small color="linear-gradient(135deg,#4ECDC4,#2DD4BF)">{t.addGame}</Btn>
        </div>
        <Btn onClick={reset} small color="rgba(255,80,80,0.35)">🗑 {t.resetScores}</Btn>
      </div>

      {/* Score table */}
      <div style={{overflowX:"auto"}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
          <thead>
            <tr>
              <th style={{padding:"8px 12px",textAlign:"left",color:"rgba(255,255,255,0.5)",fontWeight:600}}>Team</th>
              {games.map(g=>(
                <th key={g} style={{padding:"8px 10px",textAlign:"center",color:"rgba(255,255,255,0.5)",fontWeight:600,whiteSpace:"nowrap"}}>{g}</th>
              ))}
              <th style={{padding:"8px 12px",textAlign:"center",color:"#FFD93D",fontWeight:700}}>{t.total}</th>
              <th style={{padding:"8px 12px",textAlign:"center",color:"rgba(255,255,255,0.5)",fontWeight:600}}>Bonus</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team,ri) => (
              <tr key={team.id} style={{background: ri%2===0?"rgba(255,255,255,0.04)":"transparent"}}>
                <td style={{padding:"8px 12px"}}>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <div style={{width:10,height:10,borderRadius:"50%",background:team.color}}/>
                    <span style={{fontWeight:700,color:"#fff"}}>{team.name}</span>
                    <button onClick={()=>setTeams(p=>p.filter(t=>t.id!==team.id))}
                      style={{background:"none",border:"none",color:"rgba(255,100,100,0.5)",cursor:"pointer",fontSize:12,padding:0}}>×</button>
                  </div>
                </td>
                {games.map(g=>(
                  <td key={g} style={{textAlign:"center",padding:"4px 8px"}}>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:4}}>
                      <button onClick={()=>adjustScore(team.id,g,-1)} style={{
                        width:22,height:22,borderRadius:6,border:"none",
                        background:"rgba(255,107,107,0.3)",color:"#fff",cursor:"pointer",fontWeight:700,fontSize:14
                      }}>-</button>
                      <span style={{minWidth:28,textAlign:"center",fontWeight:700,color:team.color}}>
                        {team.scores[g]||0}
                      </span>
                      <button onClick={()=>adjustScore(team.id,g,1)} style={{
                        width:22,height:22,borderRadius:6,border:"none",
                        background:"rgba(107,203,119,0.3)",color:"#fff",cursor:"pointer",fontWeight:700,fontSize:14
                      }}>+</button>
                    </div>
                  </td>
                ))}
                <td style={{textAlign:"center",padding:"8px 12px"}}>
                  <span style={{fontWeight:900,fontSize:18,color:"#FFD93D"}}>{getTotal(team)}</span>
                </td>
                <td style={{textAlign:"center",padding:"8px 8px"}}>
                  <select onChange={e=>applyBonus(team.id,parseFloat(e.target.value))}
                    value={bonuses[team.id]||1}
                    style={{background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.2)",
                      color:"#fff",borderRadius:8,padding:"4px 6px",fontSize:12,cursor:"pointer"}}>
                    <option value={1}>—</option>
                    <option value={1.1}>×1.1</option>
                    <option value={1.2}>×1.2</option>
                    <option value={1.5}>×1.5</option>
                    <option value={2}>×2</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bar chart */}
      <GlassCard>
        <div style={{fontWeight:700,marginBottom:10,color:"rgba(255,255,255,0.7)"}}>🏆 Rankings</div>
        {sorted.map((team,i) => (
          <div key={team.id} style={{marginBottom:8}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:3,fontSize:13}}>
              <span style={{color:team.color,fontWeight:700}}>{i===0?"🥇":i===1?"🥈":i===2?"🥉":"  "} {team.name}</span>
              <span style={{color:"#FFD93D",fontWeight:800}}>{getTotal(team)}</span>
            </div>
            <div style={{height:8,borderRadius:99,background:"rgba(255,255,255,0.1)"}}>
              <div style={{height:"100%",borderRadius:99,background:team.color,
                width:`${(getTotal(team)/maxTotal)*100}%`,transition:"width .5s ease"}}/>
            </div>
          </div>
        ))}
      </GlassCard>
    </div>
  );
}

// ─── 5. Random Order ──────────────────────────────────────────────────────────
function RandomOrder({ t }) {
  const [names, setNames] = useState([]);
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [animating, setAnimating] = useState(false);

  const addName = () => {
    if (input.trim() && !names.includes(input.trim())) {
      setNames(p=>[...p,input.trim()]);
      setInput("");
    }
  };

  const doRandomize = () => {
    if (names.length < 2) return;
    setAnimating(true);
    setResult(null);
    let count = 0;
    const interval = setInterval(() => {
      setResult(shuffle(names));
      count++;
      if (count > 12) {
        clearInterval(interval);
        setResult(shuffle(names));
        setAnimating(false);
      }
    }, 100);
  };

  return (
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <div style={{display:"flex",gap:8}}>
        <Input value={input} onChange={setInput} placeholder={t.addOrderName}
          onKeyDown={e=>{ if(e.key==="Enter") addName(); }} style={{flex:1}}/>
        <Btn onClick={addName} small color="linear-gradient(135deg,#4ECDC4,#2DD4BF)">+</Btn>
      </div>
      <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
        {names.map(n=>(
          <Tag key={n} onRemove={()=>setNames(p=>p.filter(x=>x!==n))}>{n}</Tag>
        ))}
      </div>
      <Btn onClick={doRandomize} disabled={names.length<2}
        color="linear-gradient(135deg,#FF6B6B,#FF8E53)">{t.randomize}</Btn>

      {result && (
        <GlassCard>
          <div style={{fontWeight:700,marginBottom:12,color:"rgba(255,255,255,0.6)"}}>{t.orderResult}</div>
          {result.map((name,i)=>(
            <div key={i} style={{
              display:"flex",alignItems:"center",gap:12,
              padding:"10px 0",borderBottom:"1px solid rgba(255,255,255,0.07)",
              animation:`slideIn .3s ease ${i*0.05}s both`
            }}>
              <div style={{
                width:32,height:32,borderRadius:10,
                background:`linear-gradient(135deg,${TEAM_COLORS[i%TEAM_COLORS.length]},${TEAM_COLORS[(i+1)%TEAM_COLORS.length]})`,
                display:"flex",alignItems:"center",justifyContent:"center",
                fontWeight:900,fontSize:14,flexShrink:0
              }}>{i+1}</div>
              <span style={{fontWeight:600,fontSize:16,color:animating?"rgba(255,255,255,0.3)":"#fff",
                transition:"color .2s"}}>{name}</span>
            </div>
          ))}
        </GlassCard>
      )}
    </div>
  );
}

// ─── 6. Dice Roll ────────────────────────────────────────────────────────────
function DiceFace({ value, rolling }) {
  const dots = {
    1:[[50,50]],
    2:[[25,25],[75,75]],
    3:[[25,25],[50,50],[75,75]],
    4:[[25,25],[75,25],[25,75],[75,75]],
    5:[[25,25],[75,25],[50,50],[25,75],[75,75]],
    6:[[25,20],[75,20],[25,50],[75,50],[25,80],[75,80]],
  };
  const positions = dots[value] || dots[1];
  return (
    <div style={{
      width:72,height:72,background:"linear-gradient(145deg,#fff,#e8e8e8)",
      borderRadius:14,position:"relative",
      boxShadow: rolling
        ? "0 0 20px rgba(255,217,61,0.8), 0 4px 16px rgba(0,0,0,0.4)"
        : "0 4px 16px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.8)",
      transition:"box-shadow .3s"
    }}>
      {positions.map(([x,y],i)=>(
        <div key={i} style={{
          position:"absolute",
          left:`${x}%`, top:`${y}%`,
          transform:"translate(-50%,-50%)",
          width:10,height:10,borderRadius:"50%",
          background:"#1a1a2e",
          boxShadow:"inset 0 1px 2px rgba(255,255,255,0.2)"
        }}/>
      ))}
    </div>
  );
}

function DiceRoll({ t }) {
  const [numDice, setNumDice] = useState(2);
  const [values, setValues] = useState([1,1]);
  const [rolling, setRolling] = useState(false);

  const doRoll = () => {
    setRolling(true);
    let count = 0;
    const interval = setInterval(()=>{
      setValues(Array.from({length:numDice},()=>Math.ceil(Math.random()*6)));
      count++;
      if(count>15){
        clearInterval(interval);
        setValues(Array.from({length:numDice},()=>Math.ceil(Math.random()*6)));
        setRolling(false);
      }
    },80);
  };

  useEffect(()=>{
    setValues(Array.from({length:numDice},()=>Math.ceil(Math.random()*6)));
  },[numDice]);

  const total = values.reduce((a,b)=>a+b,0);

  return (
    <div style={{display:"flex",flexDirection:"column",gap:20,alignItems:"center"}}>
      <div style={{display:"flex",alignItems:"center",gap:12}}>
        <span style={{color:"rgba(255,255,255,0.6)",fontSize:14}}>{t.numDice}:</span>
        {[1,2,3,4,5,6].map(n=>(
          <button key={n} onClick={()=>setNumDice(n)} style={{
            width:36,height:36,borderRadius:10,border:"2px solid",
            borderColor:numDice===n?"#FFD93D":"rgba(255,255,255,0.2)",
            background:numDice===n?"rgba(255,217,61,0.2)":"rgba(255,255,255,0.05)",
            color:numDice===n?"#FFD93D":"rgba(255,255,255,0.6)",
            fontWeight:700,cursor:"pointer",fontSize:15
          }}>{n}</button>
        ))}
      </div>

      <div style={{display:"flex",gap:14,flexWrap:"wrap",justifyContent:"center",
        animation: rolling ? "shake .08s infinite" : "none"}}>
        {values.map((v,i)=>(
          <DiceFace key={i} value={v} rolling={rolling}/>
        ))}
      </div>

      <div style={{textAlign:"center"}}>
        <div style={{fontSize:13,color:"rgba(255,255,255,0.5)"}}>{t.total2}</div>
        <div style={{fontSize:52,fontWeight:900,color:"#FFD93D",
          textShadow:"0 0 30px rgba(255,217,61,0.6)",lineHeight:1}}>{total}</div>
      </div>

      <Btn onClick={doRoll} disabled={rolling}
        color="linear-gradient(135deg,#FFD93D,#F97316)"
        style={{fontSize:20,padding:"14px 48px",letterSpacing:2,
          boxShadow:"0 0 30px rgba(255,217,61,0.4)"}}>
        {rolling ? "..." : t.roll}
      </Btn>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [lang, setLang] = useState("zh");
  const [activeTab, setActiveTab] = useState(0);
  const t = T[lang];

  const TOOLS = [
    <GroupSplitter key="gs" t={t}/>,
    <SpinWheel key="sw" t={t}/>,
    <LuckyDraw key="ld" t={t}/>,
    <Scoreboard key="sb" t={t}/>,
    <RandomOrder key="ro" t={t}/>,
    <DiceRoll key="dr" t={t}/>,
  ];

  return (
    <div style={{
      minHeight:"100vh",
      background:"linear-gradient(135deg,#0f0c29,#302b63,#24243e)",
      fontFamily:"'Segoe UI','Noto Sans TC','Noto Sans Thai',system-ui,sans-serif",
      color:"#fff",
    }}>
      <style>{`
        @keyframes pop { from{transform:scale(0.7);opacity:0} to{transform:scale(1);opacity:1} }
        @keyframes slideIn { from{transform:translateX(-20px);opacity:0} to{transform:translateX(0);opacity:1} }
        @keyframes shake { 0%,100%{transform:rotate(-3deg)} 50%{transform:rotate(3deg)} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        input::placeholder { color:rgba(255,255,255,0.3); }
        textarea { font-family:inherit; }
        ::-webkit-scrollbar { width:6px; height:6px; }
        ::-webkit-scrollbar-track { background:rgba(255,255,255,0.05); }
        ::-webkit-scrollbar-thumb { background:rgba(255,255,255,0.2);border-radius:3px; }
        select option { background:#302b63; color:#fff; }
      `}</style>

      {/* Header */}
      <div style={{
        background:"rgba(255,255,255,0.05)",
        backdropFilter:"blur(20px)",
        borderBottom:"1px solid rgba(255,255,255,0.1)",
        padding:"16px 20px",
        position:"sticky",top:0,zIndex:100
      }}>
        <div style={{maxWidth:900,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
          <div>
            <div style={{fontWeight:900,fontSize:20,letterSpacing:"-0.5px"}}>
              <span style={{background:"linear-gradient(90deg,#FF6B6B,#FFD93D,#4ECDC4)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>
                ✦ {t.appTitle}
              </span>
            </div>
            <div style={{fontSize:11,color:"rgba(255,255,255,0.4)",marginTop:1}}>{t.appSubtitle}</div>
          </div>

          {/* Lang switcher */}
          <div style={{display:"flex",gap:6}}>
            {[["en","EN"],["zh","繁中"],["th","ไทย"]].map(([code,label])=>(
              <button key={code} onClick={()=>setLang(code)} style={{
                padding:"6px 14px",borderRadius:20,border:"2px solid",
                borderColor:lang===code?"#FFD93D":"rgba(255,255,255,0.2)",
                background:lang===code?"rgba(255,217,61,0.15)":"transparent",
                color:lang===code?"#FFD93D":"rgba(255,255,255,0.5)",
                fontWeight:700,cursor:"pointer",fontSize:13,
                transition:"all .2s"
              }}>{label}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab nav */}
      <div style={{background:"rgba(0,0,0,0.2)",borderBottom:"1px solid rgba(255,255,255,0.07)",overflowX:"auto"}}>
        <div style={{maxWidth:900,margin:"0 auto",display:"flex",padding:"0 12px",minWidth:"max-content"}}>
          {t.tools.map((name,i)=>(
            <button key={i} onClick={()=>setActiveTab(i)} style={{
              padding:"14px 18px",border:"none",background:"none",
              color: activeTab===i ? "#fff" : "rgba(255,255,255,0.4)",
              fontWeight: activeTab===i ? 700 : 500,
              cursor:"pointer",fontSize:13,whiteSpace:"nowrap",
              borderBottom:`3px solid ${activeTab===i ? "#FF6B6B" : "transparent"}`,
              transition:"all .2s",display:"flex",alignItems:"center",gap:6
            }}>
              <span>{t.toolIcons[i]}</span> {name}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{maxWidth:900,margin:"0 auto",padding:"24px 16px 60px"}}>
        <div style={{
          background:"rgba(255,255,255,0.04)",
          border:"1px solid rgba(255,255,255,0.08)",
          borderRadius:24,padding:24,
          boxShadow:"0 20px 60px rgba(0,0,0,0.3)"
        }}>
          <div style={{fontSize:24,fontWeight:900,marginBottom:20,display:"flex",alignItems:"center",gap:10}}>
            <span style={{animation:"float 3s ease infinite"}}>{t.toolIcons[activeTab]}</span>
            {t.tools[activeTab]}
          </div>
          {TOOLS[activeTab]}
        </div>
      </div>
    </div>
  );
}
