'use strict';
const root = document.documentElement;
const themeButton = document.getElementById('theme-toggle');
const languageButton = document.getElementById('language-toggle');
const storage = { get(key) { try { return localStorage.getItem(key); } catch { return null; } }, set(key, value) { try { localStorage.setItem(key, value); } catch { /* Preferences still work without storage. */ } } };
const arabic = {
  skip:'انتقل إلى المحتوى',aboutNav:'نبذة عني',skillsNav:'المهارات',projectsNav:'المشاريع',contactNav:'تواصل معي',intro:'مهندس بالتخصص. فضولي بطبيعتي.',hello:'مرحباً، أنا حمزة.',build:'عقلية مهندس',curiosity:'وشغف مطوّر',heroDescription:'من الأنظمة الميكانيكية إلى التجارب الرقمية المدروسة. مطوّر ومصمم ومتعلم مدى الحياة — غالباً مع كوب من الشاي بالنعناع.',explore:'استكشف أعمالي',talk:'لنتحدث',teaCaption:'الأفكار الجيدة تبدأ بلحظة هدوء.',teaLabel:'قليل من النعناع. منظور جديد.',heroFoot:'تصميم مدروس. برمجة هادفة. تواصل إنساني.',aboutTitle:'مسارات مختلفة.\nوعقل فضولي واحد.',bio1: 'مهندس ميكانيك تحول لمطور .NET و React بخبرة 4 سنوات. بدافع الفضول وحب التعلم، تخرجت من 42 عمّان، درست UI/UX و AWS، وحالياً بتعلم أمن سيبراني. أهتم بجمال التصاميم وبساطتها. أستمتع بحل المشاكل البرمجية، مساعدة الآخرين، وجلسات النقاش التقنية اللي دائماً برافقها كوب شاي بالنعناع.',
  
  
  tag1:'أبني',tag2:'أتعلم',tag3:'أشارك المعرفة',tag4:'عاشق للشاي بالنعناع',portraitAlt:'رسم توضيحي مؤقت مكان صورة حمزة',portraitNote:'أتطور باستمرار. وأتعلم دائماً.',skillsLabel:'02 / أدواتي',skillsTitle:'بعض ما أقدّمه.',skillsIntro:'تفكير تقني.\nومنظور إنساني.',skill1:'تصميم UI/UX',skill2:'تطوير الويب المتكامل',skill3:'سحابة AWS',skill4:'حل المشكلات',skill5:'الإرشاد والتعليم',skillDesc1:'تجارب واضحة ومريحة تضع الإنسان في المركز.',skillDesc2:'أربع سنوات من ربط الواجهات والأنظمة باستخدام .NET وReact.',skillDesc3:'أساس في التقنيات السحابية اكتسبته في لومينوس.',skillDesc4:'عقلية هندسية صقلتها من خلال برنامج 42.',skillDesc5:'أشارك ما أعرفه وأتعلم ممن حولي.',projectsLabel:'03 / دفتر المشاريع',projectsTitle:'صُنعت لأتعلم.\nوبُنيت لأترك أثراً.',projectsIntro:'مساحة للأعمال على طول الطريق.\nتفاصيل المشاريع قريباً.',soon:'التفاصيل قريباً',github:'استكشف حسابي على GitHub',contactLabel:'04 / أهلاً بك',contactTitle:'حوارات جميلة.\nوإمكانيات رائعة.',contactIntro:'لديك فكرة أو سؤال أو شيء تود مشاركته؟\nلنتواصل. سأحضّر الشاي.',name:'اسمك',email:'بريدك الإلكتروني',namePlaceholder:'بماذا أناديك؟',formNote:'يفتح هذا النموذج تطبيق بريدك الإلكتروني مع مقدمة جاهزة للإرسال.',submit:'قل مرحباً',fullName:'حمزة المحيسن',footerNote:'صُنع بعناية وفضول وشاي بالنعناع.',top:'إلى الأعلى ↑'
};
// Keep section names direct and consistent in both languages.
Object.assign(arabic, {
  intro: 'مهندس. مطوّر. متعلم مدى الحياة.', aboutTitle: 'تعرف عليّ.',
  skillsLabel: 'المهارات', skillsTitle: 'مهاراتي.',
  projectsLabel: 'المشاريع', projectsTitle: 'مشاريعي.',
  contactLabel: 'التواصل', contactTitle: 'لنتواصل.'
});
const english = new Map();
document.querySelectorAll('[data-i18n]').forEach(element => english.set(element, element.innerHTML));
const englishPlaceholder = document.getElementById('name').placeholder;
const englishAlt = document.querySelector('[data-alt]').alt;
let language = storage.get('portfolio-language') === 'ar' ? 'ar' : 'en';
const preferredDark = window.matchMedia('(prefers-color-scheme: dark)');
let theme = storage.get('portfolio-theme');
if (!['light', 'dark'].includes(theme)) theme = preferredDark.matches ? 'dark' : 'light';
function applyTheme() {
  root.dataset.theme = theme;
  themeButton.setAttribute('aria-pressed', String(theme === 'dark'));
  themeButton.setAttribute('aria-label', language === 'ar' ? (theme === 'dark' ? 'تفعيل المظهر الفاتح' : 'تفعيل المظهر الداكن') : `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
  document.getElementById('theme-icon').textContent = theme === 'dark' ? '☀' : '☾';
}
function applyLanguage() {
  root.lang = language;
  root.dir = language === 'ar' ? 'rtl' : 'ltr';
  english.forEach((original, element) => {
    if (language === 'en') element.innerHTML = original;
    else if (arabic[element.dataset.i18n]) {
      element.replaceChildren(...arabic[element.dataset.i18n].split('\n').flatMap((line, index) => index ? [document.createElement('br'), document.createTextNode(line)] : [document.createTextNode(line)]));
    }
  });
  languageButton.textContent = language === 'en' ? 'عربي' : 'EN';
  languageButton.lang = language === 'en' ? 'ar' : 'en';
  languageButton.setAttribute('aria-label', language === 'en' ? 'Switch to Arabic' : 'Switch to English');
  document.querySelector('nav').setAttribute('aria-label', language === 'ar' ? 'التنقل الرئيسي' : 'Main navigation');
  document.getElementById('name').placeholder = language === 'ar' ? arabic.namePlaceholder : englishPlaceholder;
  document.querySelector('[data-alt]').alt = language === 'ar' ? arabic.portraitAlt : englishAlt;
  document.getElementById('form-status').textContent = '';
  document.title = language === 'ar' ? 'حمزة المحيسن — صُنع بفضول' : 'Hamza Almuhiesn — Made with curiosity';
  applyTheme();
}
themeButton.addEventListener('click', () => { theme = theme === 'light' ? 'dark' : 'light'; storage.set('portfolio-theme', theme); applyTheme(); });
languageButton.addEventListener('click', () => { language = language === 'en' ? 'ar' : 'en'; storage.set('portfolio-language', language); applyLanguage(); });
preferredDark.addEventListener('change', event => { if (!storage.get('portfolio-theme')) { theme = event.matches ? 'dark' : 'light'; applyTheme(); } });
document.getElementById('name').addEventListener('input', event => event.target.setCustomValidity(''));
document.getElementById('contact-form').addEventListener('submit', event => {
  event.preventDefault();
  const nameField = document.getElementById('name');
  const name = nameField.value.trim();
  if (!name) { nameField.setCustomValidity(language === 'ar' ? 'يرجى إدخال اسمك.' : 'Please enter your name.'); nameField.reportValidity(); return; }
  const email = document.getElementById('email').value.trim();
  const subject = language === 'ar' ? `مرحباً حمزة — من ${name}` : `Hello Hamza — from ${name}`;
  const body = language === 'ar' ? `مرحباً حمزة،\n\nأنا ${name} وأود التواصل معك.\n\nبريدي الإلكتروني: ${email}\n\n` : `Hi Hamza,\n\nI'm ${name}, and I'd love to connect.\n\nMy email: ${email}\n\n`;
  window.location.href = `mailto:halmuhesn@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  document.getElementById('form-status').textContent = language === 'ar' ? 'مسودة البريد جاهزة. أرسلها من تطبيق بريدك. إذا لم يُفتح، استخدم رابط البريد بجانب النموذج.' : 'Your email draft is ready. Send it from your email app. If it didn’t open, use the email link beside this form.';
});
document.getElementById('year').textContent = new Date().getFullYear();
applyLanguage();
