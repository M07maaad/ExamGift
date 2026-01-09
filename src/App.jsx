import React, { useState, useEffect, useRef } from 'react';
import { Lock, Unlock, Music, Star, Pause, CheckCircle, Plus, Trash2, CheckSquare, Square, AlertTriangle, Heart, Gamepad2, Moon, X, Trophy, Palette, Flame, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

// ------------------------------------------------------------------
// 📸 إعدادات الصور
const CUSTOM_CHOCOLATE_IMAGE = 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=800&q=80';
const DOCTOR_AVATAR = 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiJg9BTsMS0PNY0M3Zh3dy61p4qxUDvGQ2jpbBgFA53-Enw6QMqEZU19deLixbr3_TyLx4pOhnu6rHvrWLz22OlMXH7NWb7Xm4CKQ9igtKWDL0pyJikpSDo2-UudeAtslpqD6RJRO9Z8a2kPbNjuKPuJYvDnL6pxbeqAgewTeiyhDXhlJ2vb1_w38TtY3Lx/s1600/1fa56531-a5cd-4c8b-8c3d-bdda090d363b.png'; 
// ------------------------------------------------------------------

const GIFT_IMAGES = {
  chocolate: 'https://i.guim.co.uk/img/media/9cedccdb2d03523be71cff52cbcfe356122d44be/0_202_6048_3629/master/6048.jpg?width=1200&quality=85&auto=format&fit=max&s=177e7c6ccabb6191e6b200d83079c2db',
  redbull: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgcCvWqokhquvDKGuR3A-0DNdRkWW4Tui0Q_DKi7buqDI6udP9OOtpO55lKOtjJBdMdr6KuDw0e42f4xkNjtH6D-VLe5BX92Q2HgLaz4V2T2EkWVyJQOaOLMhZEyWE8GpFRA80WOpZpHas3LvAj0NdUWB9Ld8hE0Au09Wtt4QUfIyj_ANRKBP33e4NhnYOC/s1600/Gemini%20Generated%20Image%20%2820%29.png',
  candle: 'https://eg.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/03/890535/5.jpg?9878',
  nailcare: 'https://grandbazaregypt.biz/wp-content/uploads/2025/04/shaan-nail-01.jpg', // Nail Care / Polish
  anghami: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj1boICNLiPwwGFDxpfEROjQwVkCGzp1lgpJZo_ePHoWfI-Px4Zum6abr_h_tAJhYgXOHJ-OF-J6JOUlDWOymnxXVgCJQes7FUU6AisHm9vh6X9KzLncpoRwqMNozwYLGmlqx2d86X_IEwSVpDgaWUq4StYaxyv8CB9hpGAHeyKh7AMm1EHc8vMcfgtCfiq/s1600/anghami%20plus.png',
  sadaka: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh-T0LADPP4rW60qwVfZt87fcXjjuKezlq1iuLii3DmBrKe0hPIGly_S6c9EgXtjH6Y6A9kTzoGwmtcDiAGzvvY_dBjW5ACJ8d_olMOz0Z0AdfMfCsFj3zrtICwqWHRX9mV1GVXw8hh-T9K6faFC0juw-HIf3-GD9OgcTWtIq9zTe4_DTIYXgIdKCxp95gZ/s1600/Google%20Gemini%20Image%20%283%29.png', 
  diamond: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg5Kl59pa_viQrnuxZiIB1Wh70RaGmMIlw9ZzENr_4Aa5oOXmeZcimAniCieYf10-GHzPhmPJ3lobrLQIkhQcEk-asjPdSMNGCKtBXKV_RHjUNfRdXakQWFtHIrjabBKHkCML9vfCQ_CTtTRfdM-Zhi6wMe5yf039pxTqOaQtJNwaCZonK4gZqusrza75IF/s1600/Gemini%20Generated%20Image%20%2821%29.png', 
  iceshape: 'https://m.media-amazon.com/images/I/71vScIpAGRL.jpg',
};

// 🎵 قائمة الأغاني (Playlist)
const MUSIC_PLAYLIST = [
  "https://serv100.albumaty.com/2024/Albumaty.Com_angham_khlyk_maaha.mp3",
  "https://serv100.albumaty.com/dl/alf/angham/albums/7ala-khasa-gedan/02._Yaretak_Fahemni.mp3",
  "https://serv100.albumaty.com/songs_2020/Albumaty.Com_angham_wnfdl_nrks.mp3",
  "https://serv100.albumaty.com/songs_2020/Albumaty.Com_angham_lwht_bahtt.mp3"
];

const DUA_LIST = [
  "رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي",
  "اللهم لا سهل إلا ما جعلته سهلاً، وأنت تجعل الحزن إذا شئت سهلاً",
  "يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ",
  "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا * إِنَّ مَعَ الْعُسْرِ يُسْرًا",
  "اللهم إني أستودعك ما قرأت وما حفظت وما تعلمت، فرده عند حاجتي إليه",
  "وَقُل رَّبِّ زِدْنِي عِلْمًا",
  "حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ",
  "لا تخافي ولا تحزني.. (تفاءلي بالخير)"
];

const EXAMS_DATA = [
  {
    id: 1,
    date: '2025-12-29',
    displayDate: '29 ديسمبر',
    subject: 'Medicinal ',
    giftName: 'Scented Candle 🪔',
    totalPieces: 3,
    codes: ['start', 'light', 'relax'],
    imageUrl: GIFT_IMAGES.candle,
    description: 'بداية قوية بس عايزين نهدي التوتر شوية 🪔',
    gameType: 'shooter'
  },
  {
    id: 2,
    date: '2026-01-01',
    displayDate: '1 يناير',
    subject: 'Drug Design ',
    giftName: 'Chocolate 🍫',
    totalPieces: 2,
    codes: ['power', 'dark'],
    imageUrl: GIFT_IMAGES.chocolate,
    description: 'الA+ في جيبك كدة كدة يعني  😌',
    gameType: 'diamond'
  },
  {
    id: 3,
    date: '2026-01-04',
    displayDate: '4 يناير',
    subject: 'Drug Info ',
    giftName: 'Anghami Plus 🎧',
    totalPieces: 2,
    codes: ['music', 'angham'],
    imageUrl: GIFT_IMAGES.anghami,
    description: 'عشان تسمعي البلاي ليست بتاعتك براحتك 🎧',
    gameType: 'memory'
  },
  {
    id: 4,
    date: '2026-01-08',
    displayDate: '8 يناير',
    subject: 'Hospital ',
    giftName: 'Red Bull Cover📱',
    totalPieces: 3,
    codes: ['wings', 'energy', 'fly'],
    imageUrl: GIFT_IMAGES.redbull,
    description: ' رجعنا للتقيل عايزين نفوق 🔥',
    gameType: 'catcher'
  },
  {
    id: 5,
    date: '2026-01-11',
    displayDate: '11 يناير',
    subject: 'Clinical Research ',
    giftName: 'Sadaka',
    totalPieces: 2,
    codes: ['good', 'forever'],
    imageUrl: GIFT_IMAGES.sadaka,
    description: 'لازم شوية ثواب بردو علشان نعدي صافي 😂 ',
    gameType: 'memory'
  },
  {
    id: 6,
    date: '2026-01-15',
    displayDate: '15 يناير',
    subject: 'Quality Control',
    giftName: 'Diamond Painting',
    totalPieces: 3,
    codes: ['notes', 'vanilla', 'libre'],
    imageUrl: GIFT_IMAGES.diamond,
    description: 'لازم ندلع القمر مينفعش يخاف من مادة زي دي 😌',
    gameType: 'diamond'
  },
  {
    id: 7,
    date: '2026-01-20',
    displayDate: '20 يناير',
    subject: 'Medical Micro ',
    giftName: 'Nail Care Kit',
    totalPieces: 4, // المادة الوحش
    codes: ['hero', 'polish', 'care', 'shine'],
    imageUrl: GIFT_IMAGES.nailcare,
    description: 'عشان تدلعي نفسك بعد التعب ده 💅',
    gameType: 'shooter' // لسة محتاجة تطلع غلها
  },
  {
    id: 8,
    date: '2026-01-22',
    displayDate: '22 يناير',
    subject: 'Drug Marketing ',
    giftName: 'Ice Shapes',
    totalPieces: 2,
    codes: ['freedom', 'coffe'],
    imageUrl: GIFT_IMAGES.iceshape,
    isBigGift: true,
    description: 'مبروك التخرج من الترم!, لازم تحتفلي ب ايس كوفي بقي 🎉',
    gameType: 'catcher'
  }
];

const PANIC_MESSAGES = [
  "اطمني .. إنتي عملتي اللي عليكي وزيادة ❤️",
  "أنا واثق فيكي، و الله انتي قد ده كله و اكتر 🌟",
  "أي حاجة هتحصل أنا فخور بيكي..  💪",
  " خلاص بقي قولتلك مش مهم الدرجات تبقي حلوة كفاية انتي حلوة 🫣 ",
  " مش مهم التقدير كفاية انا مقدرك 😂 ",
  " اوعي تعيطي الكلية كلها متستاهلش دمعة منك و الله 🙄 ",
  "اهدي نفسيتك و راحة بالك اهم من كل ده ❤️",
  "هانت خلاص.. دي مجرد فترة وهتعدي على خير ✨",
  "إنتي مجتهدة و شاطوووورة اوي و الله ، والامتحانات دي ولا حاجة جنبك 😌"
];

const getTimeRemaining = (endtime) => {
  const total = Date.parse(endtime) - Date.parse(new Date());
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  return { total, days, hours, minutes, seconds };
};

// --- COMPONENTS ---

const MusicPlayer = () => {
  const [playing, setPlaying] = useState(false);
  const [audio] = useState(new Audio());

  const toggleMusic = () => {
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      const randomSong = MUSIC_PLAYLIST[Math.floor(Math.random() * MUSIC_PLAYLIST.length)];
      audio.src = randomSong;
      audio.load();
      audio.play().catch(e => console.log("Audio play failed", e));
      setPlaying(true);
    }
  };

  useEffect(() => {
    audio.loop = true;
    return () => {
      audio.pause();
    };
  }, [audio]);

  return (
    <button 
      onClick={toggleMusic}
      className={`fixed top-4 left-4 z-50 p-2 md:p-3 rounded-full shadow-lg transition-all duration-300 flex items-center gap-2 
      ${playing ? 'bg-pink-500 text-white w-auto pr-3 md:pr-4' : 'bg-white/80 text-pink-500 w-10 h-10 md:w-12 md:h-12 justify-center group overflow-hidden'}`}
    >
      {playing ? <Pause size={18} /> : <Music size={20} />}
      <span className={`whitespace-nowrap overflow-hidden transition-all duration-300 text-xs md:text-sm font-bold ${playing ? 'opacity-100 max-w-[100px]' : 'opacity-0 max-w-0 group-hover:max-w-[150px] group-hover:opacity-100'}`}>
        {playing ? "Pause" : "Play Music"}
      </span>
    </button>
  );
};

const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining(targetDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex gap-2 justify-center text-white mt-4 flex-wrap">
      {Object.entries(timeLeft).map(([unit, value]) => {
        if (unit === 'total') return null;
        return (
          <div key={unit} className="flex flex-col items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-1.5 md:p-2 min-w-[50px] md:min-w-[60px]">
            <span className="text-lg md:text-xl font-bold font-mono">{value < 0 ? 0 : value}</span>
            <span className="text-[9px] md:text-[10px] uppercase opacity-80">
              {unit === 'days' ? 'يوم' : unit === 'hours' ? 'ساعة' : unit === 'minutes' ? 'دقيقة' : 'ثانية'}
            </span>
          </div>
        );
      })}
    </div>
  );
};

// --- MODALS ---

const DuaModal = ({ onClose }) => {
  const [dua, setDua] = useState('');
  useEffect(() => {
    setDua(DUA_LIST[Math.floor(Math.random() * DUA_LIST.length)]);
  }, []);

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 backdrop-blur-md animate-fadeIn p-4">
      <div className="bg-gradient-to-b from-indigo-900 to-purple-900 rounded-3xl p-6 md:p-8 max-w-sm w-full text-center shadow-2xl border border-yellow-500/30 relative overflow-hidden">
        <button onClick={onClose} className="absolute top-4 right-4 text-white/50 hover:text-white"><X size={24} /></button>
        <div className="w-16 h-16 md:w-20 md:h-20 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(234,179,8,0.3)]"><Moon className="text-yellow-400 w-8 h-8 md:w-10 md:h-10 fill-current" /></div>
        <h2 className="text-xl md:text-2xl font-bold text-yellow-100 mb-4 md:mb-6 font-serif">رسالة طمأنينة</h2>
        <p className="text-white mb-6 md:mb-8 leading-loose text-lg md:text-xl font-medium font-serif border-r-4 border-yellow-500 pr-4 bg-white/5 p-4 rounded-l-lg">"{dua}"</p>
        <button onClick={onClose} className="w-full bg-white/10 hover:bg-white/20 text-yellow-200 font-bold py-3 rounded-xl transition-all border border-yellow-500/30">يا رب ❤️</button>
      </div>
    </div>
  );
};

const PanicModal = ({ onClose }) => {
  const [msg, setMsg] = useState('');
  useEffect(() => {
    setMsg(PANIC_MESSAGES[Math.floor(Math.random() * PANIC_MESSAGES.length)]);
  }, []);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-md animate-fadeIn p-4">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-6 md:p-8 max-w-sm w-full text-center shadow-2xl border border-white/10 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-white/50 hover:text-white">✕</button>
        <div className="w-16 h-16 md:w-20 md:h-20 bg-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce shadow-[0_0_30px_rgba(236,72,153,0.3)]"><Heart className="text-pink-500 w-8 h-8 md:w-10 md:h-10 fill-current" /></div>
        <h2 className="text-xl md:text-2xl font-bold text-white mb-4">متخافيش كله هيعدي ❤️</h2>
        <p className="text-gray-300 mb-6 md:mb-8 leading-relaxed text-base md:text-lg border-l-4 border-pink-500 pl-4 bg-white/5 p-4 rounded-r-lg">"{msg}"</p>
        <button onClick={onClose} className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-pink-500/25 transition-all transform hover:-translate-y-1"> ❤️ </button>
      </div>
    </div>
  );
};

// --- GAMES ---

// 💎 Diamond Painting Game
const DiamondPaintingGame = () => {
  // 11x11 Simple Flower
  const PIXEL_MAP = [
    ['D','D','A','A','D','D','D','A','A','D','D'],
    ['D','A','B','B','A','D','A','B','B','A','D'],
    ['A','B','B','B','B','A','B','B','B','B','A'],
    ['A','B','B','B','B','B','B','B','B','B','A'],
    ['D','A','B','B','C','C','C','B','B','A','D'],
    ['D','D','A','B','C','C','C','B','A','D','D'],
    ['D','A','B','B','C','C','C','B','B','A','D'],
    ['A','B','B','B','B','B','B','B','B','B','A'],
    ['A','B','B','B','B','A','B','B','B','B','A'],
    ['D','A','B','B','A','D','A','B','B','A','D'],
    ['D','D','A','A','D','D','D','A','A','D','D'],
  ];

  const PALETTE = {
    'A': { color: '#ec4899', label: 'A' }, // Hot Pink (Outline)
    'B': { color: '#fbcfe8', label: 'B' }, // Light Pink (Petals)
    'C': { color: '#fbbf24', label: 'C' }, // Yellow (Center)
    'D': { color: '#f1f5f9', label: 'D' }, // Background
  };

  const [grid, setGrid] = useState(PIXEL_MAP.map(row => row.map(code => ({ code, filled: false }))));
  const [selectedGem, setSelectedGem] = useState('B');
  const [completed, setCompleted] = useState(false);

  const handleCellClick = (r, c) => {
    const cell = grid[r][c];
    if (cell.filled) return;

    if (cell.code === selectedGem) {
      const newGrid = [...grid];
      newGrid[r][c].filled = true;
      setGrid(newGrid);
      if (window.navigator.vibrate) window.navigator.vibrate(20);

      const reallyAllFilled = newGrid.flat().every(cell => cell.filled);
      if (reallyAllFilled) {
        setCompleted(true);
        confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 } });
      }
    } else {
      if (window.navigator.vibrate) window.navigator.vibrate([50, 50, 50]);
    }
  };

  return (
    <div className="flex-1 bg-slate-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <h3 className="text-white mb-4 font-bold flex items-center gap-2 text-lg">
        <span className="text-2xl">💎</span> Diamond Art
      </h3>
      
      {completed && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/80 animate-fadeIn flex-col">
          <h2 className="text-4xl font-bold text-pink-400 animate-bounce mb-2">فنانة! 😍</h2>
          <p className="text-white text-sm">🌸</p>
        </div>
      )}

      <div className="grid gap-[2px] bg-slate-700 p-2 rounded-lg shadow-2xl border-4 border-slate-600 mb-6" style={{ gridTemplateColumns: `repeat(${PIXEL_MAP[0].length}, 1fr)` }}>
        {grid.map((row, r) => 
          row.map((cell, c) => (
            <div key={`${r}-${c}`} onClick={() => handleCellClick(r, c)} className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-xs font-bold rounded-sm cursor-pointer transition-all duration-300 relative ${cell.filled ? 'scale-100 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.3)]' : 'bg-white/10 text-white/30 hover:bg-white/20'}`} style={{ backgroundColor: cell.filled ? PALETTE[cell.code].color : undefined, boxShadow: cell.filled ? `0 0 10px ${PALETTE[cell.code].color}, inset 2px 2px 5px rgba(255,255,255,0.5)` : 'none' }}>
              {!cell.filled && cell.code}
            </div>
          ))
        )}
      </div>

      <div className="flex gap-4 bg-black/30 p-3 rounded-2xl border border-white/10">
        {Object.entries(PALETTE).map(([key, data]) => (
          <button key={key} onClick={() => setSelectedGem(key)} className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold border-4 transition-all transform ${selectedGem === key ? 'scale-110 border-white shadow-lg' : 'scale-100 border-transparent opacity-70'}`} style={{ backgroundColor: data.color }}>{data.label}</button>
        ))}
      </div>
      <p className="text-white/40 text-xs mt-3">اختاري اللون ودوسي على الحرف المناسب</p>
    </div>
  );
};

// 🏃‍♀️ Catch The Grades Game
const CatchGame = () => {
  const [score, setScore] = useState(0);
  const [basketLeft, setBasketLeft] = useState(50);
  const [items, setItems] = useState([]); 
  const [gameOver, setGameOver] = useState(false);
  const gameLoopRef = useRef();
  const SPAWN_RATE = 1000;
  
  const moveLeft = () => setBasketLeft(l => Math.max(l - 10, 0));
  const moveRight = () => setBasketLeft(l => Math.min(l + 10, 90));

  useEffect(() => {
    let lastSpawn = 0;
    const loop = (time) => {
      if (gameOver) return;
      if (time - lastSpawn > SPAWN_RATE) {
        lastSpawn = time;
        setItems(prev => [...prev, { id: Date.now(), left: Math.random() * 90, top: 0, type: Math.random() > 0.3 ? 'good' : 'bad', symbol: Math.random() > 0.5 ? (Math.random() > 0.3 ? '❤️' : '🅰️') : (Math.random() > 0.3 ? '👻' : '💔') }]);
      }
      setItems(prev => {
        return prev.map(item => ({ ...item, top: item.top + 1.5 })).filter(item => {
          if (item.top > 85 && item.top < 95 && Math.abs(item.left - basketLeft) < 10) {
            if (item.type === 'good') {
              setScore(s => s + 10);
              if (window.navigator.vibrate) window.navigator.vibrate(20);
            } else {
              setScore(s => Math.max(0, s - 20));
              if (window.navigator.vibrate) window.navigator.vibrate(100);
            }
            return false;
          }
          return item.top < 100;
        });
      });
      gameLoopRef.current = requestAnimationFrame(loop);
    };
    gameLoopRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(gameLoopRef.current);
  }, [basketLeft, gameOver]);

  return (
    <div className="flex-1 bg-gradient-to-b from-slate-800 to-slate-900 relative overflow-hidden select-none">
      <div className="absolute top-4 left-4 bg-white/20 px-4 py-2 rounded-full text-white font-bold z-10">Score: {score}</div>
      {items.map(item => (<div key={item.id} className="absolute text-2xl transition-none" style={{ left: `${item.left}%`, top: `${item.top}%` }}>{item.symbol}</div>))}
      <div className="absolute bottom-4 text-4xl transition-all duration-100 ease-linear" style={{ left: `${basketLeft}%` }}>🛒</div>
      <div className="absolute inset-0 flex"><div className="w-1/2 h-full z-20" onClick={moveLeft}></div><div className="w-1/2 h-full z-20" onClick={moveRight}></div></div>
      <div className="absolute bottom-2 w-full text-center text-white/30 text-xs pointer-events-none"> يمين أو شمال للحركة</div>
    </div>
  );
};

// 🔨 Whack A Mole Game (The NEW Shooter Game)
const ShooterGame = () => {
  const [score, setScore] = useState(0);
  const [activeHole, setActiveHole] = useState(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHitting, setIsHitting] = useState(false);
  const gameRef = useRef(null);

  // تحريك الشاكوش مع الماوس
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (gameRef.current) {
        const rect = gameRef.current.getBoundingClientRect();
        setCursorPos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };
    // للموبايل (Touch)
    const handleTouchMove = (e) => {
       if (gameRef.current && e.touches[0]) {
        const rect = gameRef.current.getBoundingClientRect();
        setCursorPos({
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  // منطق ظهور الدكتور عشوائياً (Updated for speed and win condition)
  useEffect(() => {
    if (score >= 10) return; // Stop game loop if won

    const interval = setInterval(() => {
      const randomHole = Math.floor(Math.random() * 9);
      setActiveHole(randomHole);
      // Faster disappearance: 600ms instead of 800ms
      setTimeout(() => setActiveHole(null), 600); 
    }, 700); // Faster appearance: 700ms instead of 1000ms

    return () => clearInterval(interval);
  }, [score]); // Re-run when score changes to check win condition

  const whack = (index) => {
    if (score >= 10) return;

    setIsHitting(true);
    setTimeout(() => setIsHitting(false), 100); // أنيميشن الضربة

    if (index === activeHole) {
      setScore(s => s + 1);
      setActiveHole(null); // يختفي فوراً لما يتضرب
      if (window.navigator.vibrate) window.navigator.vibrate(50);
      if (score + 1 === 10) {
         confetti({ particleCount: 150, spread: 70, colors: ['#f43f5e', '#ffffff'] }); 
      }
    }
  };

  // Render Win State
  if (score >= 10) {
    return (
      <div className="flex-1 relative bg-[#5d4037] flex flex-col items-center justify-center p-4 rounded-2xl border-4 border-[#3e2723] text-center">
         <div className="text-6xl mb-4 animate-bounce">🎉</div>
         <h2 className="text-3xl font-bold text-green-400 mb-2">أخدنا حقنا! 😂</h2>
         <p className="text-white">خلاص كفاية عليه كدة</p>
         <button onClick={() => setScore(0)} className="mt-6 bg-[#3e2723] text-[#d7ccc8] px-6 py-2 rounded-full hover:bg-[#4e342e] transition">العب تاني</button>
      </div>
    );
  }

  // Render Game State
  return (
    <div ref={gameRef} className="flex-1 relative bg-[#5d4037] flex flex-col items-center justify-center p-4 overflow-hidden cursor-none touch-none rounded-2xl border-4 border-[#3e2723]">
      <h3 className="absolute top-4 text-white text-xl font-bold bg-black/40 px-4 py-1 rounded-full z-10 border border-white/20">Score: {score}/10</h3>
      
      {/* Grid of Holes */}
      <div className="grid grid-cols-3 gap-4 w-full max-w-[300px] z-0">
        {Array.from({ length: 9 }).map((_, idx) => (
          <div 
            key={idx} 
            className="relative w-full aspect-square bg-[#3e2723] rounded-full shadow-[inset_0_10px_20px_rgba(0,0,0,0.5)] border-b-4 border-[#4e342e] overflow-hidden"
            onMouseDown={() => whack(idx)}
            onTouchStart={() => whack(idx)}
          >
            {/* The Doctor Mole */}
            <div 
              className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[90%] transition-transform duration-100 ease-out ${activeHole === idx ? 'translate-y-0' : 'translate-y-[110%]'}`}
            >
               <img src={DOCTOR_AVATAR} alt="Doctor" className="w-full h-full object-contain drop-shadow-xl pointer-events-none select-none" />
            </div>
            
            {/* Dirt overlay for hiding */}
            <div className="absolute bottom-0 w-full h-[15%] bg-[#3e2723] rounded-b-full z-10"></div>
          </div>
        ))}
      </div>

      {/* Custom Hammer Cursor */}
      <div 
        className="pointer-events-none fixed z-50 transition-transform duration-75"
        style={{ 
          left: cursorPos.x, 
          top: cursorPos.y,
          transform: `translate(-20%, -20%) rotate(${isHitting ? '-45deg' : '0deg'})`,
          position: 'absolute' 
        }}
      >
        <div className="text-6xl filter drop-shadow-lg">🔨</div>
      </div>
      
      <p className="text-white/50 text-xs mt-4 z-10">اضربي الدكتور بالشاكوش بسرعة! 😂</p>
    </div>
  );
};

const MemoryGame = () => {
  const ICONS = ['📚', '☕', '🤍', '🎓', '⏰', '✏️'];
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);

  useEffect(() => {
    const initialCards = [...ICONS, ...ICONS].sort(() => Math.random() - 0.5).map((icon, id) => ({ id, icon }));
    setCards(initialCards);
  }, []);

  const handleCardClick = (id) => {
    if (flipped.length === 2 || flipped.includes(id) || solved.includes(id)) return;
    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);
    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (cards[first].icon === cards[second].icon) {
        setSolved([...solved, first, second]);
        setFlipped([]);
        if (solved.length + 2 === cards.length) confetti();
      } else {
        setTimeout(() => setFlipped([]), 800);
      }
    }
  };

  return (
    <div className="flex-1 bg-slate-800 flex flex-col items-center justify-center p-4">
      <h3 className="text-white mb-4 font-bold">تنشيط ذاكرة سريع 🧠</h3>
      <div className="grid grid-cols-4 gap-3 w-full max-w-xs">
        {cards.map((card, index) => (
          <div key={index} onClick={() => handleCardClick(index)} className={`aspect-square flex items-center justify-center text-2xl rounded-lg cursor-pointer transition-all duration-300 transform ${flipped.includes(index) || solved.includes(index) ? 'bg-pink-500 text-white rotate-0' : 'bg-white/10 text-transparent rotate-180 hover:bg-white/20'}`}>
            {card.icon}
          </div>
        ))}
      </div>
    </div>
  );
};

const GameModal = ({ type, onClose }) => {
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 backdrop-blur-md animate-fadeIn p-4">
      <div className="w-[600px] h-[700px] bg-gray-900 rounded-3xl border border-white/20 relative overflow-hidden flex flex-col">
        <button onClick={onClose} className="absolute top-4 right-4 text-white/50 hover:text-white z-50 bg-black/50 p-1 rounded-full"><X size={24} /></button>
        {type === 'shooter' && <ShooterGame />}
        {type === 'memory' && <MemoryGame />}
        {type === 'diamond' && <DiamondPaintingGame />}
        {type === 'catcher' && <CatchGame />}
      </div>
    </div>
  );
};

// --------------------------------------------------------
// 📋 To-Do List
// --------------------------------------------------------
const DailyTodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const savedTasks = localStorage.getItem('examGift_todo');
    if (savedTasks) setTasks(JSON.parse(savedTasks));
  }, []);

  const saveTasks = (newTasks) => {
    setTasks(newTasks);
    localStorage.setItem('examGift_todo', JSON.stringify(newTasks));
  };

  const addTask = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const newTask = { id: Date.now(), text: input, completed: false };
    saveTasks([...tasks, newTask]);
    setInput('');
  };

  const toggleTask = (id) => {
    const newTasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    saveTasks(newTasks);
    const allDone = newTasks.length > 0 && newTasks.every(t => t.completed);
    if (allDone) { confetti({ particleCount: 100, spread: 70, colors: ['#a855f7', '#ec4899'] }); }
  };

  const deleteTask = (id) => {
    saveTasks(tasks.filter(t => t.id !== id));
  };

  const allCompleted = tasks.length > 0 && tasks.every(t => t.completed);

  return (
    <div className="w-full mt-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[24px] p-4 md:p-6 shadow-xl animate-fadeIn">
      <div className="flex items-center gap-2 mb-4 text-pink-200"><CheckCircle size={20} /><h3 className="text-lg font-bold">مهام اليوم (Daily Quests)</h3></div>
      <form onSubmit={addTask} className="flex gap-2 mb-4">
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="وراكي إيه تذاكريه النهاردة؟" className="flex-1 bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-white placeholder-white/40 outline-none focus:border-pink-500/50 transition-colors" />
        <button type="submit" className="bg-pink-500 hover:bg-pink-600 text-white p-2 rounded-xl transition-colors"><Plus size={24} /></button>
      </form>
      <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
        {tasks.length === 0 && <div className="text-center text-white/30 text-sm py-4 italic">لسة مفيش مهام.. اكتبي خطة اليوم يا دكتوووورة 💪</div>}
        {tasks.map(task => (
          <div key={task.id} className={`flex items-center justify-between p-3 rounded-xl border transition-all duration-300 ${task.completed ? 'bg-green-500/10 border-green-500/30' : 'bg-white/5 border-white/5'}`}>
            <div className="flex items-center gap-3 overflow-hidden">
              <button onClick={() => toggleTask(task.id)} className="text-white/80 hover:text-pink-400 transition-colors">{task.completed ? <CheckSquare className="text-green-400" /> : <Square />}</button>
              <span className={`text-white truncate ${task.completed ? 'line-through opacity-50' : ''}`}>{task.text}</span>
            </div>
            <button onClick={() => deleteTask(task.id)} className="text-white/20 hover:text-red-400 p-1"><Trash2 size={16} /></button>
          </div>
        ))}
      </div>
      {allCompleted && <div className="mt-4 p-3 bg-green-500/20 border border-green-500/30 rounded-xl text-center text-green-200 text-sm font-bold animate-pulse">عاااااش اوي ! افتكري دايما، إنتي قدها 🌟</div>}
    </div>
  );
};

// --------------------------------------------------------
// 🧩 PUZZLE PIECE
// --------------------------------------------------------
const JigsawPiece = ({ index, totalPieces, isUnlocked, imageUrl, onClick }) => {
  let cols = 2, rows = 2;
  if (totalPieces <= 2) { cols = 2; rows = 1; }
  else if (totalPieces === 3) { cols = 2; rows = 2; }
  const col = index % cols;
  const row = Math.floor(index / cols);

  const flatTop = "h 100"; const flatRight = "v 100"; const flatBottom = "h -100"; const flatLeft = "v -100";
  const tabTop = "h 35 c 0 -20 10 -25 15 -25 s 15 5 15 25 h 35"; const slotTop = "h 35 c 0 20 10 25 15 25 s 15 -5 15 -25 h 35"; 
  const tabRight = "v 35 c 20 0 25 10 25 15 s -5 15 -25 15 v 35"; const slotRight = "v 35 c -20 0 -25 10 -25 15 s 5 15 25 15 v 35";
  const tabBottom = "h -35 c 0 20 -10 25 -15 25 s -15 -5 -15 -25 h -35"; const slotBottom = "h -35 c 0 -20 -10 -25 -15 -25 s -15 5 -15 25 h -35";
  const tabLeft = "v -35 c -20 0 -25 -10 -25 -15 s 5 -15 25 -15 v -35"; const slotLeft = "v -35 c 20 0 25 -10 25 -15 s -5 -15 -25 -15 v -35";
  
  let d = "";
  if (totalPieces === 4 || totalPieces === 3) {
    if (index === 0) d = `M 0 0 ${flatTop} ${tabRight} ${tabBottom} ${flatLeft} Z`;
    if (index === 1) d = `M 0 0 ${flatTop} ${flatRight} ${tabBottom} ${slotLeft} Z`;
    if (index === 2) d = `M 0 0 ${slotTop} ${tabRight} ${flatBottom} ${flatLeft} Z`;
    if (index === 3) d = `M 0 0 ${slotTop} ${flatRight} ${flatBottom} ${slotLeft} Z`;
  } else if (totalPieces === 2) {
    if (index === 0) d = `M 0 0 ${flatTop} ${tabRight} ${flatBottom} ${flatLeft} Z`;
    if (index === 1) d = `M 0 0 ${flatTop} ${flatRight} ${flatBottom} ${slotLeft} Z`;
  }
  let isBigBottom = (totalPieces === 3 && index === 2);
  if (isBigBottom) { d = `M 0 0 ${slotTop} h 0 ${slotTop} v 100 h -200 v -100 Z`; }

  const viewBox = "-25 -25 150 150"; const bigViewBox = "-25 -25 250 150";
  const imgW = cols * 100; const imgH = rows * 100;
  const imgX = -(col * 100); const imgY = -(row * 100);

  return (
    <div onClick={!isUnlocked ? onClick : undefined} style={{position: 'absolute', width: isBigBottom ? '100%' : `${100/cols}%`, height: isBigBottom ? '50%' : `${100/rows}%`, left: isBigBottom ? '0' : `${col * (100/cols)}%`, top: isBigBottom ? '50%' : `${row * (100/rows)}%`, zIndex: isUnlocked ? 0 : 10, overflow: 'visible', cursor: isUnlocked ? 'default' : 'pointer'}} className={`transition-all duration-500 ${!isUnlocked && 'hover:z-20 hover:scale-[1.02]'}`}>
      <svg viewBox={isBigBottom ? bigViewBox : viewBox} width="100%" height="100%" style={{ overflow: 'visible' }}>
        <defs>
          <clipPath id={`clip-${index}`}><path d={d} /></clipPath>
          <filter id="bevel"><feGaussianBlur in="SourceAlpha" stdDeviation="1" result="blur"/><feSpecularLighting in="blur" surfaceScale="5" specularConstant="1" specularExponent="20" lightingColor="#ffffff" result="spec"><fePointLight x="-5000" y="-10000" z="20000"/></feSpecularLighting><feComposite in="spec" in2="SourceAlpha" operator="in" result="specOut"/><feComposite in="SourceGraphic" in2="specOut" operator="arithmetic" k1="0" k2="1" k3="1" k4="0"/></filter>
        </defs>
        {!isUnlocked && <path d={d} fill="black" opacity="0.3" transform="translate(2, 2)" />}
        <g clipPath={`url(#clip-${index})`}>
          <rect x="-50" y="-50" width="300" height="300" fill="#2a2a2a" />
          <image 
            href={imageUrl} 
            x={imgX} 
            y={imgY} 
            width={imgW} 
            height={imgH} 
            preserveAspectRatio="none" 
            style={{ opacity: isUnlocked ? 1 : 0, transition: 'opacity 0.5s ease' }} 
          />
          {isUnlocked && <rect x="-50" y="-50" width="300" height="300" fill="white" opacity="0.1" className="animate-pulse" />}
        </g>
        <path d={d} fill="none" stroke="white" strokeWidth="1" strokeOpacity={isUnlocked ? "0" : "0.5"} filter={!isUnlocked ? "url(#bevel)" : ""} />
        {!isUnlocked && <foreignObject x={isBigBottom ? 85 : 35} y={35} width="30" height="30"><div className="flex items-center justify-center w-full h-full bg-black/40 rounded-full backdrop-blur-sm border border-white/20"><Lock size={14} color="white" /></div></foreignObject>}
      </svg>
    </div>
  );
};

export default function App() {
  const [progress, setProgress] = useState({});
  const [panicMode, setPanicMode] = useState(false);
  const [duaMode, setDuaMode] = useState(false);
  const [gameMode, setGameMode] = useState(null);
  const [activeExamIndex, setActiveExamIndex] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('modernExamGiftProgress_v20'); 
    if (saved) setProgress(JSON.parse(saved));
  }, []);

  const saveProgress = (newProgress) => {
    setProgress(newProgress);
    localStorage.setItem('modernExamGiftProgress_v20', JSON.stringify(newProgress));
  };

  const handleReset = () => {
    if (confirm('هل أنت متأكد؟ سيتم حذف جميع الأكواد والمهام والبدء من جديد.')) {
      localStorage.removeItem('modernExamGiftProgress_v20');
      localStorage.removeItem('examGift_todo');
      window.location.reload();
    }
  };

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const index = EXAMS_DATA.findIndex(e => e.date >= today);
    if (index !== -1) setActiveExamIndex(index);
    else setActiveExamIndex(EXAMS_DATA.length - 1);
  }, []);

  const activeExam = EXAMS_DATA[activeExamIndex];
  const unlockedCount = progress[activeExam.id] || 0;
  const isCompleted = unlockedCount >= activeExam.totalPieces;

  const handleUnlock = (code) => {
    const requiredCode = activeExam.codes[unlockedCount];
    if (code.toLowerCase().trim() === requiredCode) {
      const newProgress = { ...progress, [activeExam.id]: unlockedCount + 1 };
      saveProgress(newProgress);
      confetti({ particleCount: 150, spread: 70, colors: ['#FF69B4', '#FFB6C1', '#FFFFFF'] });
      if (unlockedCount + 1 === activeExam.totalPieces) {
         setTimeout(() => { confetti({ particleCount: 300, spread: 120, startVelocity: 45 }); }, 800);
      }
      return true;
    }
    return false;
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#0f0c29] bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] font-sans text-slate-800 overflow-x-hidden relative selection:bg-pink-500 selection:text-white">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-pink-600/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <MusicPlayer />
      {panicMode && <PanicModal onClose={() => setPanicMode(false)} />}
      {duaMode && <DuaModal onClose={() => setDuaMode(false)} />}
      {gameMode && <GameModal type={gameMode} onClose={() => setGameMode(null)} />}

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-6 flex flex-col min-h-screen">
        <header className="text-center mb-4 pt-12 relative">
          <button onClick={() => setDuaMode(true)} className="absolute right-0 top-0 p-2 bg-yellow-500/20 text-yellow-300 rounded-full hover:bg-yellow-500/40 transition-colors animate-pulse-slow" title="رسالة طمأنينة"><Moon size={20} /></button>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 backdrop-blur-xl rounded-full text-pink-200 text-sm font-medium mb-3 border border-white/10 shadow-lg"><Star size={14} className="fill-current" /> {activeExam.date} • {activeExam.displayDate}</div>
          <h1 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 mb-2 drop-shadow-sm">{activeExam.subject}</h1>
          <p className="text-purple-200/60 text-lg font-light">{activeExam.description}</p>
          {!isCompleted && <CountdownTimer targetDate={activeExam.date} />}
        </header>

        <main className="flex-grow flex flex-col items-center justify-start w-full">
          <div className="w-full bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[32px] p-4 md:p-6 shadow-2xl relative overflow-visible ring-1 ring-white/10">
            {activeExam.gameType && !isCompleted && (
              <button onClick={() => setGameMode(activeExam.gameType)} className="absolute top-4 left-4 z-40 bg-white/10 hover:bg-white/20 text-white p-2 rounded-xl flex items-center gap-2 text-xs font-bold border border-white/10 transition-all hover:scale-105"><Gamepad2 size={16} /> العب شوية</button>
            )}
            {isCompleted && (
               <div className="text-center py-4 animate-fadeIn absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm rounded-[32px]"><div className="text-6xl mb-4 animate-bounce drop-shadow-lg">🎉</div><h2 className="text-3xl font-bold text-white mb-2">{activeExam.giftName}</h2><p className="text-pink-200">ألف مبروك يا امنيييية ❤️</p></div>
            )}
            <div className="relative w-full aspect-square md:aspect-video rounded-xl bg-black/20 shadow-inner border border-white/5" style={{ overflow: 'visible', padding: '10px' }}>
               <div className="absolute inset-0 opacity-10 rounded-xl" style={{backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px', overflow: 'hidden'}}></div>
               
               {isCompleted ? (
                   <img src={activeExam.imageUrl} alt="Gift" className="w-full h-full object-cover rounded-xl animate-fadeIn transition-all duration-1000" />
               ) : (
                   Array.from({ length: activeExam.totalPieces }).map((_, idx) => (
                      <JigsawPiece key={idx} index={idx} totalPieces={activeExam.totalPieces} imageUrl={activeExam.imageUrl} isUnlocked={unlockedCount > idx || isCompleted} onClick={() => {}} />
                   ))
               )}

            </div>
            {!isCompleted && (
              <div className="mt-8"><PuzzleInput pieceNumber={unlockedCount + 1} onUnlock={handleUnlock} /><p className="text-center text-white/30 text-xs mt-3 font-light"> ابعتيلي بعد ما تخلصي مذاكرة علشان اقولك الكود 😉</p></div>
            )}
            {!isCompleted && <DailyTodoList />}
          </div>
        </main>

        <div className="mt-6 w-full">
           <div className="flex gap-3 overflow-x-auto pb-4 px-2 no-scrollbar snap-x touch-pan-x">
            {EXAMS_DATA.map((exam, idx) => {
              const isDone = (progress[exam.id] || 0) >= exam.totalPieces;
              const isActive = idx === activeExamIndex;
              
              // Logic for Sequential Locking
              let isLocked = false;
              if (idx > 0) {
                 const prevExamId = EXAMS_DATA[idx - 1].id;
                 const prevExamProgress = progress[prevExamId] || 0;
                 if (prevExamProgress < EXAMS_DATA[idx - 1].totalPieces) {
                    isLocked = true;
                 }
              }

              return (
                <button 
                  key={exam.id} 
                  onClick={() => !isLocked && setActiveExamIndex(idx)} 
                  disabled={isLocked}
                  className={`flex-shrink-0 snap-center flex flex-col items-center justify-center w-16 h-20 rounded-2xl transition-all duration-300 border 
                  ${isActive ? 'bg-gradient-to-b from-pink-500 to-purple-600 border-pink-400 text-white shadow-lg scale-105' : 
                    isLocked ? 'bg-slate-800/50 border-slate-700 text-slate-600 cursor-not-allowed grayscale' :
                    'bg-white/5 border-white/10 text-white/50 hover:bg-white/10'}`}
                >
                  <span className="text-[10px] font-bold mb-1 opacity-70">{exam.date.split('-')[1]}/{exam.date.split('-')[2]}</span>
                  {isLocked ? <Lock size={16} /> : isDone ? <CheckCircle size={18} className="text-green-400" /> : isActive ? <Star size={18} className="fill-white" /> : <Unlock size={16} className="opacity-50" />}
                </button>
              );
            })}
          </div>
        </div>

        <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-40">
           <button onClick={() => setPanicMode(true)} className="bg-red-500/80 backdrop-blur-md text-white p-4 rounded-full shadow-2xl hover:bg-red-600 transition-all hover:scale-110 border border-red-400 animate-pulse-slow flex items-center gap-2"><AlertTriangle size={24} /></button>
        </div>
      </div>
    </div>
  );
}

function PuzzleInput({ pieceNumber, onUnlock }) {
  const [val, setVal] = useState('');
  const [status, setStatus] = useState('idle'); 
  const handleSubmit = (e) => { e.preventDefault(); if(!val) return; const success = onUnlock(val); if (success) { setStatus('success'); setVal(''); setTimeout(() => setStatus('idle'), 2000); } else { setStatus('error'); setTimeout(() => setStatus('idle'), 1000); } };
  return (
    <form onSubmit={handleSubmit} className="relative group">
      <div className={`relative flex items-center bg-black/20 backdrop-blur-xl rounded-2xl border transition-all duration-300 ${status === 'error' ? 'border-red-400/50 bg-red-500/10 shake' : 'border-white/10 group-focus-within:border-pink-500/50 group-focus-within:bg-black/40'}`}>
        <input type="text" value={val} onChange={(e) => setVal(e.target.value)} placeholder={`اكتبي كود القطعة رقم ${pieceNumber}...`} className="w-full bg-transparent border-none text-white placeholder-white/30 px-4 py-4 outline-none font-medium tracking-wide" />
        <button type="submit" className="bg-white/10 text-white p-2 m-2 rounded-xl hover:bg-pink-500 transition-colors"><Unlock size={20} /></button>
      </div>
    </form>
  );
}
