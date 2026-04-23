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
    text: { en: "Semen retention and lust control are not about suppression; they are about transmuting your most potent biological energy into drive, creativity, and success.", mm: "ကာမစိတ်ကို ထိန်းချုပ်ခြင်းဆိုသည်မှာ ဖိနှိပ်ထားခြင်းမဟုတ်ဘဲ၊ သင့်ခန္ဓာကိုယ်၏ အပြင်းထန်ဆုံးသော ဇီဝစွမ်းအင်များကို ကိုယ်ပိုင်ရည်မှန်းချက်၊ တီထွင်ဖန်တီးမှုနှင့် အောင်မြင်မှုများအဖြစ်သို့ ပြောင်းလဲပစ်ခြင်းဖြစ်သည်။" },
    author: "The Alchemy of Energy"
  },
  {
    text: { en: "Excessive sexual indulgence burns out your dopamine receptors, leaving you unmotivated and empty. Mastering your lust restores your drive for real accomplishments.", mm: "ကာမဂုဏ်ခံစားမှုများကို အလွန်အကျွံ လိုက်စားခြင်းသည် သင့်ဦးနှောက်ရှိ ဒိုပါမင်းစနစ်ကို ပျက်စီးစေပြီး စိတ်အားငယ်မှုနှင့် ဟာလာဟင်းလင်းဖြစ်မှုကိုသာ ကျန်ရစ်စေသည်။ ကာမစိတ်ကို စိုးမိုးနိုင်မှသာ စစ်မှန်သောအောင်မြင်မှုများအတွက် တွန်းအားကို ပြန်လည်ရရှိမည်ဖြစ်သည်။" },
    author: "Neurological Reset"
  },
  {
    text: { en: "When you retain your life force and conquer lust, your body language, eye contact, and vocal resonance naturally project an undeniable, magnetic dominance.", mm: "သင်၏ ဘဝစွမ်းအင်များကို မဖြုန်းတီးဘဲ ကာမစိတ်ကို အနိုင်ယူနိုင်သောအခါ၊ သင့်ကိုယ်ဟန်အမူအရာ၊ မျက်လုံးချင်းဆုံမှုနှင့် အသံဩဇာတို့သည် လူအများကြားတွင် သဘာဝကျကျ ဩဇာတိက္ကမ ကြီးမားလာမည်ဖြစ်သည်။" },
    author: "Magnetic Presence"
  },
  {
    text: { en: "A man who cannot control his sexual impulses can be easily manipulated by anyone and anything. Lust is the chain that binds a weak mind.", mm: "မိမိ၏ လိင်မှုဆိုင်ရာ စေ့ဆော်မှုများကို မထိန်းချုပ်နိုင်သူအား မည်သူမဆို အလွယ်တကူ ခြယ်လှယ်နိုင်သည်။ ကာမတပ်မက်ခြင်းသည် အားနည်းသောစိတ်ကို ချည်နှောင်ထားသည့် သံကြိုးပင်ဖြစ်သည်။" },
    author: "Mastery of Self"
  },
  {
    text: { en: "Why control your urges? Because living without the constant fog of lust gives you a razor-sharp mind and an unfair advantage in a highly distracted world.", mm: "ကာမစိတ်ကို ဘာကြောင့် ထိန်းချုပ်သင့်သလဲ။ အကြောင်းမှာ ကာမတိမ်တိုက်များ ကင်းစင်သွားသောအခါ အလွန်ထက်မြက်သည့် အသိဉာဏ်ကို ရရှိပြီး၊ လှည့်စားမှုများသော ဤကမ္ဘာကြီးတွင် သင့်အား များစွာ အသာစီးရစေသောကြောင့် ဖြစ်သည်။" },
    author: "The Edge"
  },
  {
    text: { en: "Lust is a fire that can never be satisfied by feeding it. True peace and unshakable confidence only come when you decide to starve the fire.", mm: "ကာမစိတ်ဆိုသည်မှာ ထင်းထည့်ပေးရုံဖြင့် မည်သည့်အခါမျှ ငြိမ်းမသွားနိုင်သော မီးတောက်ဖြစ်သည်။ ထိုမီးတောက်ကို ငတ်မွတ်အောင်ထားဖို့ ဆုံးဖြတ်လိုက်သည့်အခါမှသာ စစ်မှန်သောအေးချမ်းမှုနှင့် တုန်လှုပ်ခြင်းမရှိသော ယုံကြည်မှုကို ရရှိမည်ဖြစ်သည်။" },
    author: "Inner Peace"
  },
  {
    text: { en: "Your sexual energy is the force of creation. You can either use it to create the life of your dreams, or waste it endlessly on temporary pixels and empty fantasies.", mm: "သင့်၏ လိင်ပိုင်းဆိုင်ရာစွမ်းအင်သည် ဖန်တီးနိုင်စွမ်း၏ အရင်းအမြစ်ဖြစ်သည်။ ၎င်းကို အသုံးပြု၍ သင်အိပ်မက်မက်သော ဘဝကို တည်ဆောက်နိုင်သလို၊ တဒင်္ဂသာယာမှုနှင့် စိတ်ကူးယဉ်မှုများဖြင့် အချည်းနှီး ဖျက်ဆီးပစ်နိုင်သည်။" },
    author: "Creative Force"
  },
  {
    text: { en: "True masculinity starts with self-restraint. By guarding your seed and rejecting cheap dopamine, you step out of a boy's mindset and forge a warrior's spirit.", mm: "စစ်မှန်သော ယောက်ျားပီသမှုသည် မိမိကိုယ်ကို ထိန်းချုပ်ခြင်းမှ စတင်သည်။ မိမိ၏စွမ်းအင်ကို စောင့်ရှောက်ကာ တန်ဖိုးနည်းသော သာယာမှုများကို ငြင်းပယ်ခြင်းဖြင့် ငယ်ရွယ်သူ၏စိတ်ဓာတ်မှ ရုန်းထွက်ကာ စစ်သည်တော်တစ်ဦး၏ စိတ်ဓာတ်ကို တည်ဆောက်နိုင်မည်ဖြစ်သည်။" },
    author: "The Warrior Path"
  },
  {
    text: { en: "Lust cheapens your existence to chasing passing feelings. Focusing on your higher purpose elevates you from an animalistic drive to a life of profound meaning.", mm: "ကာမစိတ်နောက်သို့ လိုက်ခြင်းသည် သင့်ဘဝတန်ဖိုးကို ယာယီခံစားချက်များအောက်သို့ နှိမ့်ချလိုက်ခြင်းပင်ဖြစ်သည်။ မိမိ၏ မြင့်မြတ်သော ရည်မှန်းချက်များအပေါ် အာရုံစိုက်ခြင်းက တိရစ္ဆာန်ဆန်သော စေ့ဆော်မှုများမှ ကျော်လွန်ကာ အဓိပ္ပါယ်ရှိသော ဘဝတစ်ခုအဖြစ် မြှင့်တင်ပေးသည်။" },
    author: "Purpose over Pleasure"
  },
  {
    text: { en: "The discomfort of ignoring your lust today is the exact price you pay for the unbreakable focus, pristine health, and iron will you will enjoy tomorrow.", mm: "ယနေ့ သင့်ကာမစိတ်ကို လျစ်လျူရှုလိုက်ရခြင်း၏ မသက်သာမှုသည်၊ မနက်ဖြန်တွင် သင်ရရှိခံစားရမည့် ကျိုးပဲ့မသွားနိုင်သော အာရုံစိုက်မှု၊ အကောင်းဆုံးသော ကျန်းမာရေးနှင့် သံမဏိစိတ်ဓာတ်တို့အတွက် ပေးဆပ်ရသည့် အတိအကျသော တန်ဖိုးပင်ဖြစ်သည်။" },
    author: "The Price of Greatness"
  }
];
