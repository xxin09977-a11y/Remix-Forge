import { Quote, BenefitStage, Translation } from './types';

export const COLORS = {
  bg: '#0a0a0a',
  gold: '#c9a84c',
  white: '#ffffff',
  red: '#ef4444',
  gray: '#262626',
};

export const T: Translation = {
  DAYS: { en: 'DAYS', mm: 'ရက်များ' },
  DAY_STREAK: { en: 'DAY STREAK', mm: 'ရက်မြောက် စွဲမြဲမှု' },
  CONQUERED: { en: 'I CONQUERED TODAY', mm: 'ယနေ့ အနိုင်ရတယ်' },
  SEALED: { en: 'SEALED ✓', mm: 'အတည်ပြုပြီး ✓' },
  HOME: { en: 'HOME', mm: 'ပင်မ' },
  WISDOM: { en: 'WISDOM', mm: 'ဥာဏ်ပညာ' },
  SETTINGS: { en: 'SETTINGS', mm: 'သတ်မှတ်ချက်' },
  BENEFITS: { en: 'BENEFITS', mm: 'အကျိုးကျေးဇူးများ' },
  URGE_HELP: { en: '⚡ URGE HELP', mm: '⚡ အရေးပေါ် အကူအညီ' },
  RESET: { en: 'Reset Soul Streak', mm: 'စွဲမြဲမှုဇယား ပြန်စမည်' },
  CONFIRM: { en: 'Confirm', mm: 'အတည်ပြုသည်' },
  CANCEL: { en: 'Cancel', mm: 'မလုပ်တော့ပါ' },
  LANGUAGE: { en: 'Language', mm: 'ဘာသာစကား' },
  START_DATE: { en: 'Commencement Date', mm: 'စတင်သည့်ရက်စွဲ' },
  THEME: { en: 'Appearance', mm: 'အသွင်အပြင်' },
  DARK_MODE: { en: 'Obsidian Mode', mm: 'အနက်ရောင် ဗားရှင်း' },
  LIGHT_MODE: { en: 'Daylight Mode', mm: 'အလင်းရောင် ဗားရှင်း' },
  NEXT_REVELATION: { en: 'Next Revelation', mm: 'နောက်ထပ် သင်ခန်းစာ' },
  BREATHING: { en: 'Breathing', mm: 'အသက်ရှူလေ့ကျင့်ခန်း' },
  COLD_SHOWER: { en: 'Cold Shower', mm: 'ရေအေးချိုးခြင်း' },
  URGE_SURFING: { en: 'Urge Surfing', mm: 'စိတ်လှိုင်းကို ဖြတ်ကျော်ခြင်း' },
  MOTIVATIONAL_SHOCK: { en: 'Motivational Shock', mm: 'စိတ်လှုပ်ရှားဖွယ် ကိုးကားချက်များ' },
  INHALE: { en: 'Inhale', mm: 'အသက်ရှူသွင်း' },
  HOLD: { en: 'Hold', mm: 'အောင့်ထား' },
  EXHALE: { en: 'Exhale', mm: 'အသက်ရှူထုတ်' },
  STRENGTH_MSG: { en: 'YOU ARE STRONGER THAN THIS', mm: 'သင်သည် ဤအရာထက် ပိုမို ကြံ့ခိုင်ပါသည်' },
  COLD_SHOWER_MSG: { en: 'GET UP. GO NOW.', mm: 'ထလိုက်ပါ။ အခုပဲ သွားလိုက်ပါ။' },
  URGE_WAVE_MSG: { en: "The urge is a wave. Don't fight it. Watch it.", mm: "စေ့ဆော်စိတ်သည် လှိုင်းတစ်ခုကဲ့သို့ပင်။ မတိုက်ခိုက်ပါနှင့်။ ကြည့်နေလိုက်ပါ။" },
};

export const BENEFITS: { en: BenefitStage[]; mm: BenefitStage[] } = {
  en: [
    { days: 1, label: 'Day 1-3', icon: '🧠', description: 'Brain fog lifts rapidly. You experience a noticeable surge in raw energy, sharper thoughts, and a restored sense of inner drive.' },
    { days: 7, label: 'Day 7', icon: '🔥', description: 'Testosterone peaks naturally up to 45%. You feel significantly sharper focus, heightened physical vitality, and a renewed emotional baseline.' },
    { days: 14, label: 'Day 14', icon: '🗣️', description: 'Vocal cords relax leading to a deeper, resonant voice. You project natural confidence and maintain commanding, unwavering eye contact.' },
    { days: 30, label: 'Day 30', icon: '⚡', description: 'Dopamine receptors begin healing. You experience a powerful motivational surge, clearer life goals, and significantly deeper, restorative sleep.' },
    { days: 60, label: 'Day 60', icon: '🎭', description: 'Social anxiety evaporates. Your natural charisma emerges effortlessly, allowing fluid conversations and a magnetic presence among peers.' },
    { days: 90, label: 'Day 90', icon: '💎', description: 'The brain achieves complete neurological rewiring. Peak mental clarity, bulletproof willpower, and profound emotional stability become your new default state.' },
    { days: 180, label: 'Day 180', icon: '🌊', description: 'A permanent new baseline is established. Artificial stimuli are no longer appealing. You command your desires with absolute mastery and inner peace.' },
    { days: 365, label: 'Day 365', icon: '🔱', description: 'Full physical and psychological transformation. Your identity shift is complete. You walk through life as an entirely elevated, fully realized version of yourself.' },
  ],
  mm: [
    { days: 1, label: 'နေ့ ၁-၃', icon: '🧠', description: 'ဦးနှောက် ကြည်လင်လာပြီး အတွေးအခေါ်များ ရှင်းလင်းလာမည်။ အင်အားများ ပြန်လည်ပြည့်ဖြိုးလာကာ စိတ်ထဲတွင် လန်းဆန်းတက်ကြွမှုကို စတင်ခံစားရမည်။' },
    { days: 7, label: 'နေ့ ၇', icon: '🔥', description: 'ဟော်မုန်းဓာတ် ၄၅% အထိ သဘာဝအတိုင်း မြင့်တက်လာမည်။ အာရုံစူးစိုက်မှု သိသိသာသာ ကောင်းမွန်လာပြီး စိတ်ပိုင်းဆိုင်ရာ တည်ငြိမ်မှုနှင့် ခွန်အားများ ပိုမိုပြည့်ဝလာမည်။' },
    { days: 14, label: 'နေ့ ၁၄', icon: '🗣️', description: 'အသံပိုမို ဩရှည်ပြီး နက်ရှိုင်းလာမည်။ လူအများရှေ့တွင် မိမိကိုယ်ကို ယုံကြည်မှု အပြည့်အဝ ရှိလာမည်ဖြစ်ပြီး မျက်လုံးချင်းဆုံ၍ ရဲဝံ့စွာ ပြောဆိုဆက်ဆံနိုင်လာမည်။' },
    { days: 30, label: 'နေ့ ၃၀', icon: '⚡', description: 'ဒိုပါမင်း (Dopamine) စနစ် ပြန်လည်ကောင်းမွန်လာမည်။ စိတ်အားထက်သန်မှု သိသိသာသာ မြင့်တက်လာပြီး ဘဝရည်မှန်းချက်များ ရှင်းလင်းလာကာ အိပ်စက်ခြင်း ပိုမိုကောင်းမွန်လာမည်။' },
    { days: 60, label: 'နေ့ ၆၀', icon: '🎭', description: 'လူမှုဆက်ဆံရေး ကြောက်ရွံ့မှုများ လုံးဝ ပျောက်ကွယ်သွားမည်။ မိမိ၏ သဘာဝ ဆွဲဆောင်မှု အပြည့်အဝ ပေါ်လွင်လာပြီး အခြားသူများနှင့် လွတ်လပ်သက်သောင့်သက်သာ ဆက်ဆံနိုင်လာမည်။' },
    { days: 90, label: 'နေ့ ၉၀', icon: '💎', description: 'ဦးနှောက်ကြိုးဝိုင်း အပြည့်အဝ ပြန်လည် ဖွဲ့စည်းတည်ဆောက်ပြီးဖြစ်သည်။ စိတ်ပိုင်းဆိုင်ရာ အမြင့်ဆုံး ကြည်လင်ပြတ်သားမှုနှင့် ခိုင်မာသော စိတ်ဓာတ်ခွန်အားတို့ကို ပိုင်ဆိုင်နိုင်ပြီဖြစ်သည်။' },
    { days: 180, label: 'နေ့ ၁၈၀', icon: '🌊', description: 'အမူအကျင့်နှင့် စိတ်နေစိတ်ထား အသစ်တစ်ခု အခိုင်အမာ တည်ဆောက်နိုင်ပြီဖြစ်သည်။ အပေါ်ယံ သွေးဆောင်မှုများကို လုံးဝစိတ်ဝင်စားတော့မည်မဟုတ်ဘဲ အေးချမ်းတည်ငြိမ်မှုကို ရရှိမည်။' },
    { days: 365, label: 'နေ့ ၃၆၅', icon: '🔱', description: 'ရုပ်ပိုင်းဆိုင်ရာနှင့် စိတ်ပိုင်းဆိုင်ရာ အကြွင်းမဲ့ အဆင့်မြှင့်တင်မှု ပြီးမြောက်ပြီဖြစ်သည်။ အတိတ်ကပုံစံမှ လုံးဝကင်းစင်သွားပြီး အကောင်းဆုံး သာလွန်သော လူသားသစ်တစ်ယောက်အဖြစ် ဘဝကို ဖြတ်သန်းနိုင်ပြီဖြစ်သည်။' },
  ],
};

export const QUOTES: Quote[] = [
  {
    text: { en: "Discipline is choosing between what you want now and what you want most.", mm: "စည်းကမ်းရှိခြင်းဆိုသည်မှာ ယခုသင်အလိုရှိသောအရာနှင့် သင်အလိုအပ်ဆုံးအရာတို့အကြား ရွေးချယ်ခြင်းဖြစ်သည်။" },
    author: "Abraham Lincoln"
  },
  {
    text: { en: "He who conquers others is strong; he who conquers himself is mighty.", mm: "အခြားသူများကို အနိုင်ရသူသည် သန်မာသော်လည်း မိမိကိုယ်ကို အနိုင်ရသူသည်သာ ခွန်အားအကြီးဆုံးဖြစ်သည်။" },
    author: "Lao Tzu"
  },
  {
    text: { en: "The first and greatest victory is to conquer yourself.", mm: "ပထမဆုံးနှင့် အကြီးမြတ်ဆုံးသော အောင်ပွဲမှာ မိမိကိုယ်ကို အနိုင်ယူခြင်းဖြစ်သည်။" },
    author: "Plato"
  },
  {
    text: { en: "Waste no more time arguing what a good man should be. Be one.", mm: "လူကောင်းတစ်ယောက် ဘယ်လိုဖြစ်သင့်သလဲဆိုတာကို ငြင်းခုံပြီး အချိန်မဖြုန်းပါနဲ့။ ကိုယ်တိုင်သာ လူကောင်းတစ်ယောက် ဖြစ်အောင်လုပ်ပါ။" },
    author: "Marcus Aurelius"
  },
  {
    text: { en: "Suffering is the true test of life.", mm: "ဆင်းရဲဒုက္ခခံရခြင်းသည် ဘဝ၏ စစ်မှန်သော စမ်းသပ်မှုဖြစ်သည်။" },
    author: "David Goggins"
  },
  {
    text: { en: "The man who moves a mountain begins by carrying away small stones.", mm: "တောင်တစ်တောင်ကို ရွှေ့မည့်သူသည် ကျောက်ခဲလေးများကို စတင်သယ်ဆောင်ခြင်းမှ စတင်ရသည်။" },
    author: "Confucius"
  },
  {
    text: { en: "It is not that we have a short time to live, but that we waste a lot of it.", mm: "ကျွန်ုပ်တို့တွင် အသက်ရှင်ရန် အချိန်တိုတောင်းလှသည်မဟုတ်ဘဲ ကျွန်ုပ်တို့က အချိန်များကို ဖြုန်းတီးနေကြခြင်းသာဖြစ်သည်။" },
    author: "Seneca"
  },
  {
    text: { en: "Don't stop when you're tired. Stop when you're done.", mm: "မောပန်းလာတဲ့အခါ မရပ်တန့်လိုက်ပါနဲ့။ အောင်မြင်ပြီးသွားတဲ့အခါမှသာ ရပ်တန့်ပါ။" },
    author: "David Goggins"
  },
  {
    text: { en: "Small disciplines repeated with consistency every day lead to great achievements.", mm: "နေ့စဉ်မှန်မှန်ပြုလုပ်သော သေးငယ်သည့် စည်းကမ်းများသည် ကြီးမားသော အောင်မြင်မှုများဆီသို့ ဦးတည်စေသည်။" },
    author: "John Maxwell"
  },
  {
    text: { en: "Freedom is the only worthy goal in life. It is won by disregarding things that lie beyond our control.", mm: "လွတ်လပ်မှုသည် ဘဝတွင် တစ်ခုတည်းသော တန်ဖိုးရှိသည့် ပန်းတိုင်ဖြစ်သည်။ မိမိမထိန်းချုပ်နိုင်သောအရာများကို လျစ်လျူရှုခြင်းဖြင့်သာ ၎င်းကို ရရှိနိုင်သည်။" },
    author: "Epictetus"
  },
  {
    text: { en: "You have power over your mind - not outside events. Realize this, and you will find strength.", mm: "မင်းရဲ့စိတ်ကို မင်းထိန်းချုပ်နိုင်တယ်၊ ပြင်ပဖြစ်ရပ်တွေကို မဟုတ်ဘူး။ ဒါကို သိရှိနားလည်ရင် မင်း ခွန်အားကို တွေ့လိမ့်မယ်။" },
    author: "Marcus Aurelius"
  },
  {
    text: { en: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.", mm: "ကျွန်ုပ်တို့သည် အဖန်တလဲလဲ ပြုလုပ်သောအရာများအတိုင်း ဖြစ်လာသည်။ ထို့ကြောင့် ထူးချွန်ခြင်းသည် လုပ်ရပ်တစ်ခုမဟုတ်ဘဲ အလေ့အကျင့်တစ်ခုသာဖြစ်သည်။" },
    author: "Aristotle"
  },
  {
    text: { en: "Hard times create strong men. Strong men create good times.", mm: "ခက်ခဲသောအချိန်များသည် သန်မာသောလူများကို ဖြစ်ပေါ်စေသည်။ သန်မာသောလူများသည် ကောင်းမွန်သောအချိန်များကို ဖန်တီးကြသည်။" },
    author: "G. Michael Hopf"
  },
  {
    text: { en: "Energy and persistence conquer all things.", mm: "စွမ်းအင်နှင့် ဇွဲလုံ့လတို့သည် အရာခပ်သိမ်းကို အောင်နိုင်စေသည်။" },
    author: "Benjamin Franklin"
  },
  {
    text: { en: "Fall seven times, stand up eight.", mm: "ခုနစ်ကြိမ်လဲရင် ရှစ်ကြိမ်မြောက် ပြန်ထပါ။" },
    author: "Japanese Proverb"
  },
  {
    text: { en: "Rule your mind or it will rule you.", mm: "မင်းရဲ့စိတ်ကို မင်းစိုးမိုးပါ၊ မဟုတ်ရင် အဲဒီစိတ်က မင်းကို ပြန်ပြီးစိုးမိုးလိမ့်မယ်။" },
    author: "Horace"
  },
  {
    text: { en: "A disciplined mind leads to happiness.", mm: "စည်းကမ်းရှိသော စိတ်သည် ပျော်ရွှင်မှုကို ဆောင်ကြဉ်းပေးသည်။" },
    author: "Buddha"
  },
  {
    text: { en: "Action is the foundational key to all success.", mm: "လက်တွေ့လုပ်ဆောင်ခြင်းသည် အောင်မြင်မှုအားလုံး၏ အခြေခံအချက်ဖြစ်သည်။" },
    author: "Pablo Picasso"
  },
  {
    text: { en: "Don't count the days, make the days count.", mm: "ရက်တွေကို မရေတွက်ပါနဲ့၊ ရက်တွေက တန်ဖိုးရှိအောင်သာ လုပ်ပါ။" },
    author: "Muhammad Ali"
  },
  {
    text: { en: "Strength does not come from physical capacity. It comes from an indomitable will.", mm: "ခွန်အားသည် ရုပ်ပိုင်းဆိုင်ရာ စွမ်းဆောင်ရည်မှ လာသည်မဟုတ်ဘဲ မဆုတ်မနစ်သော စိတ်ဓာတ်မှသာ လာခြင်းဖြစ်သည်။" },
    author: "Mahatma Gandhi"
  },
  {
    text: { en: "At 37, your 53kg frame is built for agility and endurance, not exhaustion. Channel your vital energy into absolute mental clarity instead of endless drain.", mm: "အသက် ၃၇ နှစ်အရွယ်တွင်၊ သင့်ခန္ဓာကိုယ်သည် မောပန်းနွမ်းနယ်နေရန်မဟုတ်ဘဲ သွက်လက်တက်ကြွပြီး ကြံ့ခိုင်နေရန် ဖြစ်သည်။ သင်၏ အဖိုးတန်စွမ်းအင်များကို အချည်းနှီး မဖြုန်းတီးဘဲ အသိဉာဏ် ကြည်လင်လာစေရန်အတွက်သာ အသုံးပြုပါ။" },
    author: "Vitality Coach"
  },
  {
    text: { en: "True presence isn't measured in height or weight; it's measured in absolute self-control. Retain your vital energy, stand tall, and let your iron-clad discipline fill the room.", mm: "လူတစ်ယောက်ရဲ့ ဩဇာတိက္ကမကို အရပ်အမြင့်နဲ့တိုင်းတာလို့မရပါဘူး၊ မိမိကိုယ်ကို ထိန်းချုပ်နိုင်စွမ်းနဲ့သာ တိုင်းတာနိုင်ပါတယ်။ စွမ်းအင်တွေကို ထိန်းသိမ်းပါ၊ စည်းကမ်းကြီးမားစွာနဲ့ မတ်မတ်ရပ်တည်ပါ။" },
    author: "Discipline Coach"
  },
  {
    text: { en: "Brain fog doesn't belong in your late thirties. Break the cycle, protect your dopamine, and watch your mind slice through daily challenges like a razor.", mm: "ဦးနှောက်တိမ်ဖုံးနေခြင်းသည် အသက် ၃၀ ကျော်အရွယ်တွင် ရှိမနေသင့်ပါ။ ဤသံသရာကိုဖြတ်တောက်ပြီး သင့်ဒိုပါမင်းကို ကာကွယ်ပါ။ သင့်စိတ်က နေ့စဉ်စိန်ခေါ်မှုများကို ထက်မြက်စွာ ဖြတ်ကျော်ပါလိမ့်မည်။" },
    author: "Mental Coach"
  },
  {
    text: { en: "Your late 30s are your prime building years. Every urge you master sharpens your willpower and fortifies your physical stamina. Dominate your impulses.", mm: "အသက် ၃၀ ကျော်အပိုင်းအခြားသည် ဆက်လက်တည်ဆောက်ရမည့် အကောင်းဆုံးအချိန်ဖြစ်သည်။ သင်အောင်နိုင်ခဲ့သော စေ့ဆော်မှုတိုင်းသည် သင့်စိတ်ဓာတ်ကို ပိုမိုခိုင်မာစေသည်။ စိတ်ကို အပြည့်အဝ စိုးမိုးနိုင်ပါစေ။" },
    author: "Willpower Coach"
  }
];
