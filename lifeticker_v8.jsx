import { useState } from "react";

// ─── I18N ────────────────────────────────────────────────────────────────────
const LANG = {
  de: {
    flag:"🇩🇪", label:"Deutsch", instruction:"Schreibe den Text auf Deutsch. Keine Übersetzung nötig.",
    ui:{
      tagline:"DEIN LEBEN — LITERARISCH VEREDELT",
      tabStyles:"✍️ Stile", tabEmotions:"🎭 Gefühle", tabKeywords:"🔑 Keywords", tabArchive:"📚 Archiv",
      bulletsLabel:"Stichpunkte", bulletsPlaceholder:"— Aufgewacht, Kaffee kalt\n— Zug verpasst\n— Chef schaut komisch",
      formatLabel:"Format", prose:"📄 Fließtext", poem:"🎭 Gedicht",
      wordsLabel:"Wörter", resetAll:"↺ Zurücksetzen",
      generateBtn:"✦ Text generieren ✦", generatingBtn:"✦ Wird geschrieben…",
      needStyle:"↑ Mindestens einen Stil aktivieren",
      outputLabel:"Deine Geschichte", copy:"📋 Kopieren", copied:"✓ Kopiert",
      placeholder:"Regler einstellen und Generieren klicken", loading:"Die Muse arbeitet…",
      saveBtn:"💾 Ins Archiv", saveTitle:"Titel eingeben…", archiveEmpty:"Noch keine Geschichten gespeichert.",
      archiveLabel:"Gespeicherte Geschichten", deleteBtn:"🗑", noTranslation:"",
      kwLabel:"Schlüsselwörter", kwPlaceholder:"Wort eingeben…", kwAdd:"＋", kwCount:"×",
      kwHint:"Wörter die im Text vorkommen sollen (mit Häufigkeit)",
    },
    styles:{
      thrill:   {label:"Mitreißend Spannend",    sub:"Stieg Larsson · Thriller",   emoji:"🔴"},
      epic:     {label:"Dramatisch Episch",       sub:"Homer · Tolkien · Götter",   emoji:"🔵"},
      pratch:   {label:"Katastrophen-Szenario",   sub:"Terry Pratchett · Absurd",   emoji:"🟢"},
      hemingway:{label:"Ernest Hemingway",        sub:"Eisberg-Stil · Karg",        emoji:"🟤"},
      blaubaer: {label:"Walter Moers",            sub:"Verschachtelt · Skurril",    emoji:"🟣"},
      science:  {label:"Wissenschaftlich",        sub:"Sachlich · Präzise",         emoji:"🔬"},
      dada:     {label:"Dadaistisch Absurd",      sub:"Dada · Sinnlos · Kaputt",    emoji:"🌀"},
      hesse:    {label:"Hermann Hesse",             sub:"Lyrisch · Philosophisch",     emoji:"🌿"},
      ringelnatz:{label:"Joachim Ringelnatz",        sub:"Verspielt · Absurd · Zärtlich",emoji:"⚓"},
    },
    emotions:{
      joy:       {label:"Freude",       emoji:"☀️"},
      melancholy:{label:"Melancholie",  emoji:"🌧️"},
      fear:      {label:"Angst",        emoji:"😰"},
      rage:      {label:"Wut",          emoji:"🔥"},
      love:      {label:"Liebe",        emoji:"❤️"},
      hope:      {label:"Hoffnung",     emoji:"🌱"},
      despair:   {label:"Verzweiflung", emoji:"🕳️"},
      wonder:    {label:"Staunen",      emoji:"✨"},
    },
  },
  en: {
    flag:"🇬🇧", label:"English", instruction:"Write the text in English. After each paragraph, add a German translation in italics on the next line, preceded by '〔DE〕'.",
    ui:{
      tagline:"YOUR LIFE — LITERARILY REFINED",
      tabStyles:"✍️ Styles", tabEmotions:"🎭 Emotions", tabKeywords:"🔑 Keywords", tabArchive:"📚 Archive",
      bulletsLabel:"Bullet Points", bulletsPlaceholder:"— Woke up, coffee cold\n— Missed the train\n— Boss giving weird looks",
      formatLabel:"Format", prose:"📄 Prose", poem:"🎭 Poem",
      wordsLabel:"Words", resetAll:"↺ Reset",
      generateBtn:"✦ Generate Text ✦", generatingBtn:"✦ Writing…",
      needStyle:"↑ Activate at least one style",
      outputLabel:"Your Story", copy:"📋 Copy", copied:"✓ Copied",
      placeholder:"Set sliders and click Generate", loading:"The muse is working…",
      saveBtn:"💾 Save to Archive", saveTitle:"Enter a title…", archiveEmpty:"No stories saved yet.",
      archiveLabel:"Saved Stories", deleteBtn:"🗑", noTranslation:"",
      kwLabel:"Keywords", kwPlaceholder:"Enter word…", kwAdd:"＋", kwCount:"×",
      kwHint:"Words that should appear in the text (with frequency)",
    },
    styles:{
      thrill:   {label:"Thrillingly Suspenseful", sub:"Stieg Larsson · Thriller",     emoji:"🔴"},
      epic:     {label:"Dramatically Epic",        sub:"Homer · Tolkien · Gods",       emoji:"🔵"},
      pratch:   {label:"Catastrophe Scenario",     sub:"Terry Pratchett · Absurd",     emoji:"🟢"},
      hemingway:{label:"Ernest Hemingway",         sub:"Iceberg Style · Sparse",       emoji:"🟤"},
      blaubaer: {label:"Walter Moers",             sub:"Nested · Whimsical",           emoji:"🟣"},
      science:  {label:"Scientifically Neutral",   sub:"Factual · Precise",            emoji:"🔬"},
      dada:     {label:"Dadaistically Absurd",     sub:"Dada · Nonsense · Fragmented", emoji:"🌀"},
      hesse:    {label:"Hermann Hesse",              sub:"Lyrical · Philosophical",       emoji:"🌿"},
      ringelnatz:{label:"Joachim Ringelnatz",         sub:"Playful · Absurd · Tender",     emoji:"⚓"},
    },
    emotions:{
      joy:       {label:"Joy",        emoji:"☀️"},
      melancholy:{label:"Melancholy", emoji:"🌧️"},
      fear:      {label:"Fear",       emoji:"😰"},
      rage:      {label:"Rage",       emoji:"🔥"},
      love:      {label:"Love",       emoji:"❤️"},
      hope:      {label:"Hope",       emoji:"🌱"},
      despair:   {label:"Despair",    emoji:"🕳️"},
      wonder:    {label:"Wonder",     emoji:"✨"},
    },
  },
  es: {
    flag:"🇪🇸", label:"Español", instruction:"Escribe el texto en español. Después de cada párrafo, añade una traducción al alemán en cursiva en la siguiente línea, precedida de '〔DE〕'.",
    ui:{
      tagline:"TU VIDA — LITERARIAMENTE REFINADA",
      tabStyles:"✍️ Estilos", tabEmotions:"🎭 Emociones", tabKeywords:"🔑 Palabras clave", tabArchive:"📚 Archivo",
      bulletsLabel:"Puntos clave", bulletsPlaceholder:"— Me desperté, café frío\n— Perdí el tren",
      formatLabel:"Formato", prose:"📄 Prosa", poem:"🎭 Poema",
      wordsLabel:"Palabras", resetAll:"↺ Reiniciar",
      generateBtn:"✦ Generar Texto ✦", generatingBtn:"✦ Escribiendo…",
      needStyle:"↑ Activa al menos un estilo",
      outputLabel:"Tu Historia", copy:"📋 Copiar", copied:"✓ Copiado",
      placeholder:"Ajusta los controles y haz clic en Generar", loading:"La musa está trabajando…",
      saveBtn:"💾 Guardar", saveTitle:"Introducir título…", archiveEmpty:"Aún no hay historias guardadas.",
      archiveLabel:"Historias guardadas", deleteBtn:"🗑", noTranslation:"",
      kwLabel:"Palabras clave", kwPlaceholder:"Introducir palabra…", kwAdd:"＋", kwCount:"×",
      kwHint:"Palabras que deben aparecer en el texto (con frecuencia)",
    },
    styles:{
      thrill:   {label:"Apasionantemente Tenso",  sub:"Stieg Larsson · Thriller",    emoji:"🔴"},
      epic:     {label:"Dramáticamente Épico",     sub:"Homero · Tolkien · Dioses",   emoji:"🔵"},
      pratch:   {label:"Escenario Catastrófico",   sub:"Terry Pratchett · Absurdo",   emoji:"🟢"},
      hemingway:{label:"Ernest Hemingway",         sub:"Estilo Iceberg · Austero",    emoji:"🟤"},
      blaubaer: {label:"Walter Moers",             sub:"Anidado · Caprichoso",        emoji:"🟣"},
      science:  {label:"Científicamente Neutral",  sub:"Objetivo · Preciso",          emoji:"🔬"},
      dada:     {label:"Dadaísticamente Absurdo",  sub:"Dadá · Sin sentido · Roto",   emoji:"🌀"},
      hesse:    {label:"Hermann Hesse",              sub:"Lírico · Filosófico",           emoji:"🌿"},
      ringelnatz:{label:"Joachim Ringelnatz",         sub:"Juguetón · Absurdo · Tierno",   emoji:"⚓"},
    },
    emotions:{
      joy:       {label:"Alegría",       emoji:"☀️"},
      melancholy:{label:"Melancolía",    emoji:"🌧️"},
      fear:      {label:"Miedo",         emoji:"😰"},
      rage:      {label:"Ira",           emoji:"🔥"},
      love:      {label:"Amor",          emoji:"❤️"},
      hope:      {label:"Esperanza",     emoji:"🌱"},
      despair:   {label:"Desesperación", emoji:"🕳️"},
      wonder:    {label:"Asombro",       emoji:"✨"},
    },
  },
};

const STYLE_PROMPTS = {
  thrill:   "Write like Stieg Larsson: gripping high-tension thriller. Short punchy sentences. Building dread. Inner monologue. The mundane becomes sinister.",
  epic:     "Write like Homer and Tolkien: cosmic grandeur, archaic language, epithets, divine metaphors, heroic cadence. Every moment carries the weight of fate.",
  pratch:   "Write like Terry Pratchett: absurdist, satirical, the universe conspires against the protagonist with bored indifference. Philosophical digressions and parenthetical wit.",
  hemingway:"Write like Hemingway: spare, direct, no wasted adjectives. Iceberg theory — the unsaid carries more weight. Laconic yet devastating.",
  blaubaer: "Write in the style of Walter Moers: adopt his distinctive narrative voice — whimsical, self-aware, with nested digressions, mock-scholarly asides, deadpan absurdism, and a warm ironic distance from the protagonist's suffering. Do NOT reference Zamonia or any Moers characters. Apply the style to the given real-world events.",
  science:  "Write in a strictly scientific, neutral register: precise terminology, passive constructions, objective observations, no emotional language, hypothesis-driven structure. Events are phenomena to be documented.",
  dada:     "Write in full Dadaist style: grammar collapses. Logic is optional. Words collide. Sentences begin and forget themselves. Punctuation goes on holiday. Meaning is a bourgeois construct. Hugo Ball would approve.",
  hesse:     "Write in the style of Hermann Hesse: lyrical, introspective, deeply philosophical. The protagonist searches for meaning and self-knowledge. Nature and the inner world mirror each other. Sentences flow like a river — gentle but with deep currents. Themes of duality, awakening, and the tension between spirit and matter surface naturally. The tone is warm, melancholic, and quietly luminous.",
  ringelnatz:"Write in the style of Joachim Ringelnatz: gently absurd, tender, and playful. Short witty verses or whimsical prose that seems frivolous on the surface but carries a melancholic undercurrent. Wordplay, unexpected rhymes, the perspective of a loveable outsider who finds the world both ridiculous and precious. Tone: warm chaos, a sailor's philosophy, a wink and a sigh.",
};

const EMOTION_PROMPTS = {
  joy:       "pervading joy and lightness",
  melancholy:"deep melancholy and longing",
  fear:      "creeping fear and unease",
  rage:      "barely contained rage",
  love:      "tender love and warmth",
  hope:      "fragile but persistent hope",
  despair:   "hollow despair",
  wonder:    "wide-eyed wonder at the absurd beauty of existence",
};

const STYLE_COLOR = {thrill:"#c0392b",epic:"#1a3a8a",pratch:"#166534",hemingway:"#7c4a03",blaubaer:"#6b21a8",science:"#0e7490",dada:"#9d174d",hesse:"#5c7a4a",ringelnatz:"#b45309"};
const STYLE_BG    = {thrill:"#fff5f5",epic:"#f0f4ff",pratch:"#f0fdf4",hemingway:"#fdf6ee",blaubaer:"#faf5ff",science:"#ecfeff",dada:"#fdf2f8",hesse:"#f0f7ee",ringelnatz:"#fefce8"};
const EMOTION_COLOR = {joy:"#d97706",melancholy:"#3b82f6",fear:"#7c3aed",rage:"#dc2626",love:"#db2777",hope:"#059669",despair:"#374151",wonder:"#2563eb"};

const STYLE_KEYS   = Object.keys(STYLE_PROMPTS);
const EMOTION_KEYS = Object.keys(EMOTION_PROMPTS);
const zero = ks => Object.fromEntries(ks.map(k=>[k,0]));

// ─── SMALL COMPONENTS ────────────────────────────────────────────────────────
const LBL = {fontFamily:"monospace",fontSize:"0.56rem",letterSpacing:"0.22em",textTransform:"uppercase",opacity:0.4,fontWeight:600};

function SliderCard({label, sub, val, active, pct, color, bg, onChange}) {
  return (
    <div style={{padding:"0.5rem 0.7rem",border:`2px solid ${active?color:"#e5e5e5"}`,borderRadius:"4px",background:bg,transition:"all 0.2s"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"0.25rem"}}>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontWeight:700,fontSize:"0.76rem",color:active?color:"#aaa",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{label}</div>
          {sub&&<div style={{fontFamily:"monospace",fontSize:"0.48rem",opacity:0.45,marginTop:"0.05rem",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{sub}</div>}
        </div>
        <span style={{fontFamily:"monospace",fontSize:"0.65rem",fontWeight:700,color:active?color:"#ccc",marginLeft:"0.4rem",flexShrink:0}}>{active?`${pct}%`:"—"}</span>
      </div>
      <input type="range" min="0" max="100" step="5" value={val}
        onChange={e=>onChange(Number(e.target.value))}
        style={{width:"100%",height:"4px",accentColor:color,cursor:"pointer",outline:"none"}}/>
    </div>
  );
}

function Spinner() {
  return (<>
    <style>{`@keyframes _spin{to{transform:rotate(360deg)}}`}</style>
    <div style={{width:24,height:24,border:"3px solid rgba(0,0,0,0.1)",borderTopColor:"#111",borderRadius:"50%",animation:"_spin 0.8s linear infinite"}}/>
  </>);
}

// ─── MAIN ────────────────────────────────────────────────────────────────────
export default function LifeTicker() {
  const [lang, setLang]       = useState("de");
  const [bullets, setBullets] = useState("");
  const [format, setFormat]   = useState("prose");
  const [wordCount, setWordCount] = useState(300);
  const [wordInput, setWordInput] = useState("300");
  const [styleS, setStyleS]   = useState(zero(STYLE_KEYS));
  const [emotionS, setEmotionS] = useState(zero(EMOTION_KEYS));
  const [tab, setTab]         = useState("styles");
  // keywords: [{word, count}]
  const [keywords, setKeywords] = useState([]);
  const [kwInput, setKwInput]   = useState("");
  const [kwCount, setKwCount]   = useState(3);
  // archive: [{id, title, text, lang, date}]
  const [archive, setArchive]   = useState([]);
  const [archiveTopic, setArchiveTopic] = useState("Meine Geschichten");
  const [saveTitle, setSaveTitle] = useState("");
  const [viewStory, setViewStory] = useState(null);
  const [output, setOutput]   = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [copied, setCopied]   = useState(false);
  const [saving, setSaving]   = useState(false);

  const L  = LANG[lang];
  const ui = L.ui;

  const styleTotal   = STYLE_KEYS.reduce((s,k)=>s+styleS[k],0);
  const emotionTotal = EMOTION_KEYS.reduce((s,k)=>s+emotionS[k],0);
  const totalAll     = styleTotal + emotionTotal;
  const canGenerate  = bullets.trim().length>0 && styleTotal>0 && !loading;

  function setW(v){ setWordCount(Number(v)); setWordInput(String(v)); }
  function handleWInput(v){ setWordInput(v); const n=parseInt(v,10); if(!isNaN(n)&&n>=10&&n<=5000) setWordCount(n); }

  function addKeyword() {
    const w = kwInput.trim();
    if(!w) return;
    if(keywords.find(k=>k.word.toLowerCase()===w.toLowerCase())) { setKwInput(""); return; }
    setKeywords(prev=>[...prev,{word:w, count:kwCount}]);
    setKwInput("");
  }
  function removeKeyword(idx){ setKeywords(prev=>prev.filter((_,i)=>i!==idx)); }
  function updateKwCount(idx,v){ setKeywords(prev=>prev.map((k,i)=>i===idx?{...k,count:Number(v)}:k)); }

  function buildPrompt() {
    const activeStyles = STYLE_KEYS.filter(k=>styleS[k]>0).sort((a,b)=>styleS[b]-styleS[a]);
    let stylePart = activeStyles.length===1
      ? STYLE_PROMPTS[activeStyles[0]]
      : "You are a master author. Blend these narrative styles in exactly these proportions — perceptible in every sentence:\n"
        + activeStyles.map(k=>`  - ${Math.round((styleS[k]/styleTotal)*100)}% ${L.styles[k].label}: ${STYLE_PROMPTS[k]}`).join("\n");

    const activeEmotions = EMOTION_KEYS.filter(k=>emotionS[k]>0).sort((a,b)=>emotionS[b]-emotionS[a]);
    const emotionPart = activeEmotions.length>0
      ? "\n\nEMOTIONAL REGISTER (woven into the style, never stated explicitly): "
        + activeEmotions.map(k=>`${Math.round((emotionS[k]/emotionTotal)*100)}% ${EMOTION_PROMPTS[k]}`).join(", ")
        + ". The emotion and style are inseparable."
      : "";

    const kwPart = keywords.length>0
      ? "\n\nKEYWORDS: The following words MUST appear in the text with approximately the given frequency:\n"
        + keywords.map(k=>`  - "${k.word}": appear ~${k.count} time${k.count!==1?"s":""}`).join("\n")
      : "";

    const formatPart = format==="poem"
      ? "\n\nWrite this as a POEM with stanzas, verses and rhythm."
      : "\n\nWrite flowing PROSE. No verses.";

    return stylePart + emotionPart + kwPart + formatPart
      + `\n\nWrite approximately ${wordCount} words.\n\n${L.instruction}`;
  }

  async function generate() {
    if(!canGenerate) return;
    setLoading(true); setOutput(""); setError(""); setViewStory(null);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          model:"claude-sonnet-4-20250514",
          max_tokens:Math.min(Math.ceil(wordCount*2)+500,16000),
          system:buildPrompt(),
          messages:[{role:"user",content:bullets}],
        }),
      });
      const data = await res.json();
      if(!res.ok) throw new Error(data.error?.message||"Error "+res.status);
      const text=(data.content||[]).map(b=>b.text||"").join("");
      if(!text) throw new Error("Keine Antwort.");
      setOutput(text);
    } catch(e){ setError(e.message); }
    finally{ setLoading(false); }
  }

  function copy(text) {
    const t = text||output;
    const fb=()=>{ const el=document.createElement("textarea"); el.value=t; el.style.cssText="position:fixed;opacity:0"; document.body.appendChild(el); el.focus(); el.select(); try{document.execCommand("copy");setCopied(true);setTimeout(()=>setCopied(false),2000);}catch{} document.body.removeChild(el); };
    navigator.clipboard?.writeText(t).then(()=>{setCopied(true);setTimeout(()=>setCopied(false),2000);}).catch(fb)??fb();
  }

  function saveToArchive() {
    if(!output||!saveTitle.trim()) return;
    if(archive.length>=16){ setError("Archiv voll (max. 16 Geschichten)"); return; }
    const entry = {id:Date.now(), title:saveTitle.trim(), text:output, lang, date:new Date().toLocaleDateString()};
    setArchive(prev=>[entry,...prev]);
    setSaveTitle(""); setSaving(false);
    setTab("archive");
  }

  function deleteStory(id){ setArchive(prev=>prev.filter(s=>s.id!==id)); if(viewStory?.id===id) setViewStory(null); }

  // render output with DE translation lines styled
  function renderOutput(text) {
    if(!text) return null;
    return text.split("\n").map((line,i)=>{
      const isDE = line.startsWith("〔DE〕");
      return (
        <div key={i} style={{
          fontStyle: isDE||format==="poem" ? "italic" : "normal",
          color: isDE ? "#555" : "#111",
          fontSize: isDE ? "0.82rem" : "0.95rem",
          marginBottom: isDE ? "0.8rem" : 0,
          lineHeight: format==="poem" ? 2.1 : 1.85,
          paddingLeft: isDE ? "0.5rem" : 0,
          borderLeft: isDE ? "2px solid #ccc" : "none",
        }}>{line}</div>
      );
    });
  }

  const domStyle = STYLE_KEYS.reduce((b,k)=>styleS[k]>(styleS[b]||0)?k:b, STYLE_KEYS[0]);
  const outBg    = styleTotal>0 ? STYLE_BG[domStyle] : "#fff";
  const outWc    = output ? output.trim().split(/\s+/).filter(Boolean).length : 0;

  const barEntries=[
    ...STYLE_KEYS.filter(k=>styleS[k]>0).map(k=>({key:k,val:styleS[k],color:STYLE_COLOR[k]})),
    ...EMOTION_KEYS.filter(k=>emotionS[k]>0).map(k=>({key:"e"+k,val:emotionS[k],color:EMOTION_COLOR[k]})),
  ];

  const TABS = [
    {id:"styles",   label:ui.tabStyles},
    {id:"emotions", label:ui.tabEmotions},
    {id:"keywords", label:ui.tabKeywords},
    {id:"archive",  label:ui.tabArchive + (archive.length>0?` (${archive.length})`:"")},
  ];

  return (
    <div style={{minHeight:"100vh",background:"#f4efe4",fontFamily:"Georgia,'Times New Roman',serif",display:"flex",flexDirection:"column"}}>

      {/* HEADER */}
      <div style={{background:"#111",color:"#f4efe4",padding:"0.7rem 1.2rem",borderBottom:"3px solid #c0392b",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"0.5rem",flexShrink:0}}>
        <div>
          <div style={{fontSize:"1.4rem",fontWeight:900,letterSpacing:"0.1em",lineHeight:1}}>LIFE <span style={{color:"#c0392b"}}>✦</span> TICKER</div>
          <div style={{fontSize:"0.5rem",letterSpacing:"0.28em",opacity:0.4,marginTop:"0.12rem",fontFamily:"monospace"}}>{ui.tagline}</div>
        </div>
        <div style={{display:"flex",gap:"0.3rem",flexWrap:"wrap"}}>
          {Object.entries(LANG).map(([k,l])=>(
            <button key={k} onClick={()=>setLang(k)} style={{padding:"0.28rem 0.6rem",cursor:"pointer",border:`2px solid ${lang===k?"#f4efe4":"rgba(255,255,255,0.2)"}`,background:lang===k?"#f4efe4":"transparent",color:lang===k?"#111":"#f4efe4",borderRadius:"3px",fontFamily:"monospace",fontSize:"0.62rem",fontWeight:lang===k?700:400,transition:"all 0.15s"}}>
              {l.flag} {l.label}
            </button>
          ))}
        </div>
      </div>

      {/* INPUT BAR */}
      <div style={{background:"rgba(255,255,255,0.4)",borderBottom:"1px solid #ddd",padding:"0.75rem 1.2rem",display:"flex",gap:"0.8rem",alignItems:"flex-start",flexWrap:"wrap"}}>
        <div style={{flex:"2",minWidth:"180px"}}>
          <div style={LBL}>{ui.bulletsLabel}</div>
          <textarea value={bullets} onChange={e=>setBullets(e.target.value)} placeholder={ui.bulletsPlaceholder}
            style={{width:"100%",minHeight:"75px",marginTop:"0.3rem",padding:"0.55rem 0.7rem",fontFamily:"monospace",fontSize:"0.78rem",lineHeight:1.7,background:"#fff",border:"1px solid #ccc",borderRadius:"3px",resize:"vertical",outline:"none",color:"#111",boxSizing:"border-box"}}/>
        </div>
        <div style={{minWidth:"130px"}}>
          <div style={LBL}>{ui.formatLabel}</div>
          <div style={{display:"flex",marginTop:"0.3rem",border:"2px solid #111",borderRadius:"3px",overflow:"hidden"}}>
            {["prose","poem"].map(f=>(
              <button key={f} onClick={()=>setFormat(f)} style={{flex:1,padding:"0.45rem 0.2rem",border:"none",background:format===f?"#111":"transparent",color:format===f?"#f4efe4":"#111",cursor:"pointer",fontFamily:"Georgia,serif",fontSize:"0.72rem",fontWeight:700,transition:"all 0.15s"}}>
                {f==="prose"?ui.prose:ui.poem}
              </button>
            ))}
          </div>
        </div>
        <div style={{minWidth:"150px"}}>
          <div style={LBL}>{ui.wordsLabel}</div>
          <div style={{background:"#fff",border:"2px solid #111",borderRadius:"3px",padding:"0.4rem 0.6rem",marginTop:"0.3rem"}}>
            <div style={{display:"flex",alignItems:"center",gap:"0.3rem",marginBottom:"0.25rem"}}>
              <input type="number" min="10" max="5000" value={wordInput} onChange={e=>handleWInput(e.target.value)}
                style={{width:"65px",padding:"0.2rem 0.3rem",fontFamily:"monospace",fontSize:"0.95rem",fontWeight:900,border:"2px solid #111",borderRadius:"3px",outline:"none",textAlign:"center",color:"#111"}}/>
              <span style={{fontFamily:"monospace",fontSize:"0.55rem",opacity:0.4}}>{ui.wordsLabel}</span>
            </div>
            <input type="range" min="10" max="5000" step="10" value={wordCount} onChange={e=>setW(e.target.value)}
              style={{width:"100%",accentColor:"#111",cursor:"pointer",height:"4px"}}/>
            <div style={{display:"flex",justifyContent:"space-between",fontFamily:"monospace",fontSize:"0.46rem",opacity:0.3,marginTop:"0.15rem"}}>
              <span>10</span><span style={{opacity:1,fontWeight:700,fontSize:"0.56rem",color:"#111"}}>{wordCount.toLocaleString()}</span><span>5k</span>
            </div>
          </div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:"0.3rem",justifyContent:"flex-end"}}>
          <button onClick={generate} disabled={!canGenerate} style={{padding:"0.7rem 1rem",background:canGenerate?"#111":"#999",color:"#f4efe4",border:"none",borderRadius:"3px",cursor:canGenerate?"pointer":"not-allowed",fontFamily:"Georgia,serif",fontSize:"0.78rem",letterSpacing:"0.1em",fontWeight:700,transition:"background 0.2s",whiteSpace:"nowrap"}}>
            {loading?ui.generatingBtn:ui.generateBtn}
          </button>
          {!canGenerate&&styleTotal===0&&bullets.trim().length>0&&<div style={{fontFamily:"monospace",fontSize:"0.52rem",opacity:0.45,textAlign:"center"}}>{ui.needStyle}</div>}
        </div>
      </div>

      {/* COLOUR BAR */}
      {totalAll>0&&(
        <div style={{height:"5px",display:"flex",flexShrink:0}}>
          {barEntries.map(e=><div key={e.key} style={{width:`${(e.val/totalAll)*100}%`,background:e.color,transition:"width 0.3s"}}/>)}
        </div>
      )}

      {/* TABS */}
      <div style={{background:"rgba(255,255,255,0.25)",borderBottom:"2px solid #111",flexShrink:0}}>
        <div style={{display:"flex",overflowX:"auto"}}>
          {TABS.map(t=>{
            const badge = t.id==="styles"  ? STYLE_KEYS.filter(k=>styleS[k]>0).length
                        : t.id==="emotions"? EMOTION_KEYS.filter(k=>emotionS[k]>0).length
                        : t.id==="keywords"? keywords.length : 0;
            return (
              <button key={t.id} onClick={()=>setTab(t.id)} style={{padding:"0.5rem 1rem",border:"none",cursor:"pointer",background:tab===t.id?"#fff":"transparent",color:tab===t.id?"#111":"#666",fontFamily:"monospace",fontSize:"0.6rem",letterSpacing:"0.1em",fontWeight:tab===t.id?700:400,borderBottom:tab===t.id?"2px solid #111":"2px solid transparent",whiteSpace:"nowrap",transition:"all 0.15s",flexShrink:0}}>
                {t.label}
                {badge>0&&<span style={{marginLeft:"0.35rem",background:t.id==="styles"?"#c0392b":t.id==="emotions"?"#d97706":"#6b21a8",color:"#fff",borderRadius:"3px",padding:"0 3px",fontSize:"0.5rem"}}>{badge}</span>}
              </button>
            );
          })}
          {(styleTotal>0||emotionTotal>0)&&(
            <button onClick={()=>{setStyleS(zero(STYLE_KEYS));setEmotionS(zero(EMOTION_KEYS));}} style={{marginLeft:"auto",padding:"0.5rem 0.8rem",border:"none",cursor:"pointer",background:"transparent",color:"#999",fontFamily:"monospace",fontSize:"0.68rem",flexShrink:0}}>
              {ui.resetAll}
            </button>
          )}
        </div>

        {/* TAB CONTENT — scrollable, fixed height so sliders don't scroll the page */}
        <div style={{padding:"0.65rem 1.2rem",maxHeight:"230px",overflowY:"auto",overflowX:"hidden",scrollbarWidth:"thin",scrollbarColor:"#bbb transparent"}}>

          {/* STYLES */}
          {tab==="styles"&&(
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(190px,1fr))",gap:"0.45rem"}}>
              {STYLE_KEYS.map(k=>{
                const val=styleS[k],active=val>0,pct=styleTotal>0?Math.round((val/styleTotal)*100):0,lbl2=L.styles[k];
                return <SliderCard key={k} label={`${lbl2.emoji} ${lbl2.label}`} sub={lbl2.sub} val={val} active={active} pct={pct} color={STYLE_COLOR[k]} bg={active?STYLE_BG[k]:"transparent"} onChange={v=>setStyleS(p=>({...p,[k]:v}))}/>;
              })}
            </div>
          )}

          {/* EMOTIONS */}
          {tab==="emotions"&&(
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(170px,1fr))",gap:"0.45rem"}}>
              {EMOTION_KEYS.map(k=>{
                const val=emotionS[k],active=val>0,pct=emotionTotal>0?Math.round((val/emotionTotal)*100):0,lbl2=L.emotions[k];
                return <SliderCard key={k} label={`${lbl2.emoji} ${lbl2.label}`} sub={null} val={val} active={active} pct={pct} color={EMOTION_COLOR[k]} bg={active?EMOTION_COLOR[k]+"18":"transparent"} onChange={v=>setEmotionS(p=>({...p,[k]:v}))}/>;
              })}
            </div>
          )}

          {/* KEYWORDS */}
          {tab==="keywords"&&(
            <div style={{display:"flex",flexDirection:"column",gap:"0.6rem"}}>
              <div style={{...LBL,marginBottom:"0.1rem"}}>{ui.kwHint}</div>
              <div style={{display:"flex",gap:"0.5rem",flexWrap:"wrap",alignItems:"center"}}>
                <input value={kwInput} onChange={e=>setKwInput(e.target.value)}
                  onKeyDown={e=>{if(e.key==="Enter"){e.preventDefault();addKeyword();}}}
                  placeholder={ui.kwPlaceholder}
                  style={{padding:"0.4rem 0.6rem",fontFamily:"monospace",fontSize:"0.8rem",border:"2px solid #111",borderRadius:"3px",outline:"none",minWidth:"140px"}}/>
                <div style={{display:"flex",alignItems:"center",gap:"0.3rem"}}>
                  <span style={{fontFamily:"monospace",fontSize:"0.65rem",opacity:0.5}}>{ui.kwCount}</span>
                  <input type="number" min="1" max="50" value={kwCount} onChange={e=>setKwCount(Number(e.target.value))}
                    style={{width:"50px",padding:"0.4rem",fontFamily:"monospace",fontSize:"0.85rem",fontWeight:700,border:"2px solid #111",borderRadius:"3px",outline:"none",textAlign:"center"}}/>
                </div>
                <button onClick={addKeyword} style={{padding:"0.4rem 0.8rem",background:"#111",color:"#f4efe4",border:"none",borderRadius:"3px",cursor:"pointer",fontFamily:"monospace",fontSize:"0.85rem",fontWeight:700}}>
                  {ui.kwAdd}
                </button>
              </div>
              {keywords.length>0&&(
                <div style={{display:"flex",flexWrap:"wrap",gap:"0.4rem",marginTop:"0.2rem"}}>
                  {keywords.map((kw,i)=>(
                    <div key={i} style={{display:"flex",alignItems:"center",gap:"0.3rem",background:"#6b21a8",color:"#fff",borderRadius:"4px",padding:"0.25rem 0.5rem 0.25rem 0.7rem",fontFamily:"monospace",fontSize:"0.72rem"}}>
                      <span style={{fontWeight:700}}>{kw.word}</span>
                      <span style={{opacity:0.7}}>×</span>
                      <input type="number" min="1" max="50" value={kw.count} onChange={e=>updateKwCount(i,e.target.value)}
                        style={{width:"36px",background:"rgba(255,255,255,0.2)",border:"1px solid rgba(255,255,255,0.4)",borderRadius:"3px",color:"#fff",fontFamily:"monospace",fontSize:"0.72rem",fontWeight:700,textAlign:"center",outline:"none",padding:"0.1rem"}}/>
                      <button onClick={()=>removeKeyword(i)} style={{background:"none",border:"none",color:"rgba(255,255,255,0.7)",cursor:"pointer",fontSize:"0.75rem",padding:"0 0.1rem",lineHeight:1}}>✕</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ARCHIVE */}
          {tab==="archive"&&(
            <div style={{display:"flex",flexDirection:"column",gap:"0.6rem"}}>
              <div style={{display:"flex",alignItems:"center",gap:"0.6rem",flexWrap:"wrap"}}>
                <div style={LBL}>{ui.archiveLabel}</div>
                <input value={archiveTopic} onChange={e=>setArchiveTopic(e.target.value)}
                  style={{flex:1,minWidth:"150px",padding:"0.3rem 0.6rem",fontFamily:"Georgia,serif",fontSize:"0.85rem",fontWeight:700,border:"2px solid #111",borderRadius:"3px",outline:"none",background:"transparent"}}/>
                <span style={{fontFamily:"monospace",fontSize:"0.55rem",opacity:0.4}}>{archive.length}/16</span>
              </div>
              {archive.length===0
                ? <div style={{fontFamily:"monospace",fontSize:"0.7rem",opacity:0.35,padding:"0.5rem 0"}}>{ui.archiveEmpty}</div>
                : <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:"0.4rem"}}>
                    {archive.map(s=>(
                      <div key={s.id} onClick={()=>setViewStory(viewStory?.id===s.id?null:s)}
                        style={{padding:"0.5rem 0.7rem",border:`2px solid ${viewStory?.id===s.id?"#111":"#ddd"}`,borderRadius:"4px",cursor:"pointer",background:viewStory?.id===s.id?"#111":"#fff",color:viewStory?.id===s.id?"#f4efe4":"#111",transition:"all 0.15s"}}>
                        <div style={{fontWeight:700,fontSize:"0.8rem",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{s.title}</div>
                        <div style={{fontFamily:"monospace",fontSize:"0.52rem",opacity:0.5,marginTop:"0.15rem"}}>{s.date} · {LANG[s.lang]?.flag}</div>
                        <button onClick={e=>{e.stopPropagation();deleteStory(s.id);}} style={{background:"none",border:"none",cursor:"pointer",fontSize:"0.7rem",opacity:0.4,marginTop:"0.2rem",padding:0}}>{ui.deleteBtn}</button>
                      </div>
                    ))}
                  </div>
              }
            </div>
          )}
        </div>
      </div>

      {/* ERROR */}
      {error&&<div style={{margin:"0.6rem 1.2rem",padding:"0.6rem",background:"#fff0f0",border:"1px solid #c0392b",borderRadius:"3px",fontFamily:"monospace",fontSize:"0.68rem",color:"#c0392b",lineHeight:1.6}}>⚠ {error}</div>}

      {/* ARCHIVE STORY VIEW */}
      {viewStory&&(
        <div style={{margin:"0.8rem 1.2rem",border:"2px solid #111",borderRadius:"4px",padding:"1.2rem",background:"#fff"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"0.8rem"}}>
            <div style={{fontWeight:700,fontSize:"1rem"}}>{viewStory.title}</div>
            <div style={{display:"flex",gap:"0.4rem"}}>
              <button onClick={()=>copy(viewStory.text)} style={{padding:"0.3rem 0.7rem",background:"#111",border:"none",borderRadius:"3px",cursor:"pointer",fontFamily:"monospace",fontSize:"0.6rem",color:"#f4efe4",fontWeight:700}}>{copied?ui.copied:ui.copy}</button>
              <button onClick={()=>setViewStory(null)} style={{padding:"0.3rem 0.6rem",background:"transparent",border:"1px solid #ccc",borderRadius:"3px",cursor:"pointer",fontFamily:"monospace",fontSize:"0.6rem",color:"#111"}}>✕</button>
            </div>
          </div>
          <div style={{fontFamily:"Georgia,serif",fontSize:"0.9rem",lineHeight:1.85}}>{renderOutput(viewStory.text)}</div>
        </div>
      )}

      {/* OUTPUT */}
      <div style={{padding:"0.8rem 1.2rem",flex:1}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"0.5rem",flexWrap:"wrap",gap:"0.4rem"}}>
          <div style={{...LBL,display:"flex",alignItems:"center",gap:"0.5rem"}}>
            {ui.outputLabel}
            {outWc>0&&<span style={{opacity:0.5}}>{outWc.toLocaleString()} {ui.wordsLabel.toLowerCase()}</span>}
          </div>
          {output&&(
            <div style={{display:"flex",gap:"0.4rem",flexWrap:"wrap"}}>
              <button onClick={()=>copy()} style={{padding:"0.35rem 0.8rem",background:copied?"#166534":"#111",border:"none",borderRadius:"3px",cursor:"pointer",fontFamily:"monospace",fontSize:"0.62rem",letterSpacing:"0.1em",color:"#f4efe4",fontWeight:700,transition:"background 0.2s"}}>
                {copied?ui.copied:ui.copy}
              </button>
              {!saving
                ? <button onClick={()=>setSaving(true)} style={{padding:"0.35rem 0.8rem",background:"#1a3a8a",border:"none",borderRadius:"3px",cursor:"pointer",fontFamily:"monospace",fontSize:"0.62rem",color:"#f4efe4",fontWeight:700}}>
                    {ui.saveBtn}
                  </button>
                : <div style={{display:"flex",gap:"0.3rem"}}>
                    <input value={saveTitle} onChange={e=>setSaveTitle(e.target.value)} placeholder={ui.saveTitle}
                      onKeyDown={e=>{if(e.key==="Enter") saveToArchive();}}
                      style={{padding:"0.3rem 0.6rem",fontFamily:"Georgia,serif",fontSize:"0.8rem",border:"2px solid #1a3a8a",borderRadius:"3px",outline:"none",minWidth:"140px"}}/>
                    <button onClick={saveToArchive} disabled={!saveTitle.trim()} style={{padding:"0.3rem 0.7rem",background:saveTitle.trim()?"#1a3a8a":"#aaa",border:"none",borderRadius:"3px",cursor:saveTitle.trim()?"pointer":"not-allowed",fontFamily:"monospace",fontSize:"0.62rem",color:"#fff",fontWeight:700}}>✓</button>
                    <button onClick={()=>setSaving(false)} style={{padding:"0.3rem 0.6rem",background:"transparent",border:"1px solid #ccc",borderRadius:"3px",cursor:"pointer",fontFamily:"monospace",fontSize:"0.62rem",color:"#666"}}>✕</button>
                  </div>
              }
            </div>
          )}
        </div>

        <div style={{border:"1px solid #ccc",borderRadius:"4px",padding:"1.4rem",minHeight:"180px",position:"relative",background:output?outBg:"#fff",transition:"background 0.4s"}}>
          {!output&&!loading&&(
            <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",opacity:0.15,gap:"0.4rem",pointerEvents:"none"}}>
              <div style={{fontSize:"2.2rem"}}>✦</div>
              <div style={{fontFamily:"monospace",fontSize:"0.58rem",letterSpacing:"0.2em",textTransform:"uppercase",textAlign:"center"}}>{ui.placeholder}</div>
            </div>
          )}
          {loading&&(
            <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"0.7rem",background:"rgba(244,239,228,0.92)"}}>
              <Spinner/>
              <div style={{fontFamily:"monospace",fontSize:"0.6rem",letterSpacing:"0.2em",opacity:0.5}}>{ui.loading}</div>
            </div>
          )}
          {output&&!loading&&<div style={{fontFamily:"Georgia,serif"}}>{renderOutput(output)}</div>}
        </div>
      </div>
    </div>
  );
}
