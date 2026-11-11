(function(){
"use strict";

var state = {found:0, diag:null, step:0, tries:0, fb:null, toolFb:null};
var lang = 'zh';

var T = {
  tagLine: {zh:'WILD CASE FILES · 原型 v0.4', en:'WILD CASE FILES · Prototype v0.4', es:'WILD CASE FILES · Prototipo v0.4'},
  appTitle: {zh:'野生诊所', en:'Wild Case Files', es:'Casos Silvestres'},
  caseLabel: {zh:'案例 01', en:'Case 01', es:'Caso 01'},
  titleH2: {zh:'野生诊所', en:'Wild Case Files', es:'Casos Silvestres'},
  titleDesc: {
    zh:'一个关于异域/野生小动物的叙事向兽医游戏原型。<br>本案例：一只被男孩带来的受伤刺猬。',
    en:'A story-driven vet game prototype about exotic &amp; wild animals.<br>This case: an injured hedgehog brought in by a boy.',
    es:'Un prototipo de juego de veterinaria narrativo sobre animales exóticos y silvestres.<br>Este caso: un erizo herido que trae un niño.'
  },
  startBtn: {zh:'开始接诊', en:'Start the clinic', es:'Comenzar consulta'},
  titleFootnote: {
    zh:'这是一个玩法验证原型，角色/美术/文案都是占位版本，<br>用来测试"检查→诊断→治疗→故事结局"这条主线是否好玩。',
    en:'This is a gameplay-proof prototype — characters, art and copy are all placeholders,<br>built to test whether "examine → diagnose → treat → story ending" is fun.',
    es:'Este es un prototipo para validar la jugabilidad — personajes, arte y textos son provisionales,<br>sirve para probar si "examinar → diagnosticar → tratar → final" resulta divertido.'
  },
  boyName: {zh:'男孩 · 小宇', en:'Boy · Theo', es:'Niño · Teo'},
  introBoyLine: {
    zh:'"医生！我在后院浇花的时候看到它缩成一团一动不动……它平时晚上才出来的，白天这样是不是很不好？"',
    en:'"Doctor! I found it curled up and not moving while watering the backyard... It usually only comes out at night — is it bad that it\'s out in daylight like this?"',
    es:'"¡Doctora! Lo encontré hecho una bola, sin moverse, mientras regaba el jardín... Normalmente solo sale de noche — ¿es malo que esté así de día?"'
  },
  vetName: {zh:'你 · 兽医', en:'You · Vet', es:'Tú · Veterinaria'},
  introVetLine: {
    zh:'别担心，我先给它做个检查，你可以在旁边陪着它。',
    en:"Don't worry, let me examine it first — you can stay right beside it.",
    es:'Tranquilo, primero lo voy a examinar — puedes quedarte a su lado.'
  },
  startExamBtn: {zh:'开始检查', en:'Begin examination', es:'Iniciar examen'},
  examHintPre: {zh:'点击刺猬身上的三个部位，找出异常线索（已找到 ', en:'Tap three spots on the hedgehog to find the clues (found ', es:'Toca tres zonas del erizo para encontrar las pistas (encontradas '},
  examHintPost: {zh:'/3）', en:'/3)', es:'/3)'},
  hotspot1: {zh:'体重', en:'Weight', es:'Peso'},
  hotspot2: {zh:'背部', en:'Back', es:'Espalda'},
  hotspot3: {zh:'脚爪', en:'Paws', es:'Patas'},
  clue1: {
    zh:'🩺 体重明显偏轻，肋骨能摸到——可能最近没怎么进食。',
    en:"🩺 Noticeably underweight, ribs are easy to feel — it may not have been eating much lately.",
    es:'🩺 Notablemente bajo de peso, se le notan las costillas — puede que no haya comido bien últimamente.'
  },
  clue2: {
    zh:'🩺 背部刺有几处稀疏，皮肤发红发痒——不像是撞伤，更像是某种皮肤问题。',
    en:"🩺 Patchy, thinning spines on the back with red, itchy skin underneath — doesn't look like trauma, more like some kind of skin problem.",
    es:'🩺 Zonas de espinas ralas en la espalda con piel enrojecida y con picor — no parece un golpe, más bien algún problema de piel.'
  },
  clue3: {
    zh:'🩺 脚爪干净、步态正常，没有外伤或骨折迹象。',
    en:"🩺 Paws are clean, gait is normal — no sign of injury or fracture.",
    es:'🩺 Patas limpias, camina con normalidad — sin señales de herida o fractura.'
  },
  toDiagBtn: {zh:'三条线索都找到后 → 下诊断', en:'Find all 3 clues → Make a diagnosis', es:'Encuentra las 3 pistas → Diagnosticar'},
  diagVetLine: {
    zh:'体重轻、背部皮肤发红掉刺、但脚爪和步态都正常——你觉得问题出在哪？',
    en:"Underweight, red, itchy skin and thinning spines on the back, but normal paws and gait — what do you think is going on?",
    es:'Bajo de peso, piel enrojecida y pérdida de espinas en la espalda, pero patas y marcha normales — ¿cuál crees que es el problema?'
  },
  diagOpt1: {zh:'摔伤导致的内伤，需要立刻手术', en:'Internal injury from a fall — needs surgery right away', es:'Lesión interna por una caída — necesita cirugía inmediata'},
  diagOpt2: {zh:'螨虫感染，并伴随因不适而少食', en:'Mite infection, with reduced eating from the discomfort', es:'Infección por ácaros, con menos apetito por la molestia'},
  diagOpt3: {zh:'只是换季正常脱刺，不用处理', en:'Just normal seasonal spine shedding — no treatment needed', es:'Solo muda de espinas estacional normal — no necesita tratamiento'},
  treatIntro: {
    zh:'判断是螨虫感染。按正确顺序使用工具完成治疗——顺序错了也没关系，再试一次就好，刺猬不会有危险。',
    en:"Diagnosed as a mite infection. Use the tools in the right order to treat it — if you get the order wrong, just try again — the hedgehog won't be at risk.",
    es:'Diagnóstico: infección por ácaros. Usa las herramientas en el orden correcto para tratarlo — si te equivocas de orden, inténtalo otra vez — el erizo no corre peligro.'
  },
  toolLabel1: {zh:'温和药浴', en:'Gentle medicated bath', es:'Baño medicinal suave'},
  toolLabel2: {zh:'抗螨滴剂', en:'Anti-mite drops', es:'Gotas antiácaros'},
  toolLabel3: {zh:'高蛋白软食', en:'High-protein soft food', es:'Comida blanda proteica'},
  treatHint: {
    zh:'本案例的正确顺序：先温和清洁 → 再针对性药物 → 最后补充体力。<br>（提示：这是为了讲故事而简化的流程，不同动物、不同药物的真实兽医护理顺序并不一样——真正的宠物或野生动物生病，请一定交给专业兽医处理。）',
    en:'Correct order in this case: gentle cleaning first → targeted medication → then rebuild strength.<br>(Note: this sequence is simplified for the story — real veterinary care varies by animal and medication. A sick or injured real animal always needs a real vet.)',
    es:'Orden correcto en este caso: primero limpieza suave → luego medicación específica → por último reforzar las fuerzas.<br>(Nota: esta secuencia está simplificada para la historia — el cuidado veterinario real varía según el animal y el medicamento. Un animal real enfermo o herido siempre necesita un veterinario de verdad.)'
  },
  toEndBtn: {zh:'完成治疗 → 查看结局', en:'Finish treatment → See the outcome', es:'Terminar tratamiento → Ver el final'},
  diagFb1: {
    zh:'再看看线索：脚爪和步态都正常，也没有外伤迹象——不太像摔伤。换一个答案试试？',
    en:"Look at the clues again: the paws and gait are normal, with no sign of injury — a fall doesn't fit. Try another answer?",
    es:'Mira otra vez las pistas: las patas y la marcha son normales, sin señales de herida — una caída no encaja. ¿Pruebas otra respuesta?'
  },
  diagFb3: {
    zh:'再想想：正常换刺不会让皮肤发红发痒，体重也不会明显变轻。换一个答案试试？',
    en:"Think again: normal spine shedding doesn't make the skin red and itchy, or cause clear weight loss. Try another answer?",
    es:'Piénsalo otra vez: la muda normal de espinas no deja la piel roja y con picor, ni hace perder tanto peso. ¿Pruebas otra respuesta?'
  },
  diagFbOk: {
    zh:'对！皮肤发红发痒加上掉刺，是螨虫的常见表现；不舒服让它吃得少，所以变瘦了。',
    en:'Yes! Red, itchy skin with thinning spines is a common sign of mites — and feeling unwell made it eat less, so it lost weight.',
    es:'¡Sí! La piel roja con picor y las espinas ralas son una señal común de ácaros — y al sentirse mal comió menos, por eso adelgazó.'
  },
  toolFbWrong: {
    zh:'还不是这一步哦——想想提示里的顺序，再试一次。',
    en:'Not this one yet — check the order in the hint and try again.',
    es:'Este todavía no — revisa el orden de la pista e inténtalo otra vez.'
  },
  toolFb1: {
    zh:'✓ 洗干净了，刺猬放松了一点。',
    en:'✓ All clean — the hedgehog relaxes a little.',
    es:'✓ Ya está limpio — el erizo se relaja un poco.'
  },
  toolFb2: {
    zh:'✓ 滴剂用好了，接下来让它补充体力。',
    en:'✓ Drops applied — now help it rebuild its strength.',
    es:'✓ Gotas aplicadas — ahora ayúdalo a recuperar fuerzas.'
  },
  toolFb3: {
    zh:'✓ 它开始小口小口吃东西了！',
    en:"✓ It's starting to eat, one small bite at a time!",
    es:'✓ ¡Empieza a comer, bocadito a bocadito!'
  },
  endingBestBadge: {zh:'★★★ 一次就诊断正确', en:'★★★ Right on the first try', es:'★★★ Acertaste a la primera'},
  endingOkBadge: {zh:'★★ 再看一次，找到了答案', en:'★★ Looked again and got it', es:'★★ Miraste otra vez y acertaste'},
  endingBestText: {
    zh:'你判断出是螨虫感染合并营养不良，按清洁→用药→补食的顺序处理后，刺猬的状态明显放松下来，蜷缩的身体慢慢舒展开。你把它留院观察两天，背部的红肿开始消退。',
    en:"You correctly identified a mite infection combined with malnutrition. After treating it in order — clean, medicate, feed — the hedgehog visibly relaxed, slowly uncurling. You keep it for two days of observation, and the redness on its back starts to fade.",
    es:'Identificaste correctamente una infección por ácaros junto con desnutrición. Tras tratarlo en orden — limpiar, medicar, alimentar — el erizo se relaja visiblemente y se va desenrollando poco a poco. Lo dejas en observación dos días, y el enrojecimiento de su espalda empieza a ceder.'
  },
  endingBestBoy: {
    zh:'太好了……它看起来没那么难受了。我以后会经常来后院检查有没有新的刺猬朋友，发现不对马上带它来找你！',
    en:"That's such a relief... it looks a lot less uncomfortable now. I'll keep checking the backyard for new hedgehog friends — I'll bring them straight to you if something seems wrong!",
    es:'Qué alivio... se ve mucho menos incómodo. Voy a seguir revisando el jardín por si aparecen más erizos amigos — ¡te los traeré enseguida si algo no anda bien!'
  },
  endingOkText: {
    zh:'第一个想法不太对，但你没有着急，而是回头把线索重新看了一遍，找到了真正的原因：螨虫感染合并营养不良。按清洁→用药→补食的顺序处理后，刺猬慢慢舒展开身体，背部的红肿开始消退。',
    en:"Your first idea didn't fit, but you didn't rush — you went back over the clues and found the real cause: a mite infection combined with malnutrition. After treating it in order — clean, medicate, feed — the hedgehog slowly uncurls, and the redness on its back starts to fade.",
    es:'Tu primera idea no encajaba, pero no te apresuraste: repasaste las pistas y encontraste la causa real: una infección por ácaros junto con desnutrición. Tras tratarlo en orden — limpiar, medicar, alimentar — el erizo se va desenrollando y el enrojecimiento de su espalda empieza a ceder.'
  },
  endingOkBoy: {
    zh:'原来医生也会再检查一遍呀……还好你又看了一次！它看起来舒服多了。',
    en:"So even doctors check twice... I'm glad you looked again! It looks so much more comfortable now.",
    es:'Así que hasta los doctores revisan dos veces... ¡Qué bueno que miraste otra vez! Se ve mucho más cómodo.'
  },
  learnTitle: {zh:'今天学到的', en:'What you learned today', es:'Lo que aprendiste hoy'},
  learn1: {
    zh:'刺猬是夜行动物——白天躺在外面一动不动，常常是生病或虚弱的信号。',
    en:'Hedgehogs are nocturnal — one lying still out in the open in daytime is often sick or weak.',
    es:'Los erizos son nocturnos — uno quieto y a la vista en pleno día suele estar enfermo o débil.'
  },
  learn2: {
    zh:'兽医会把几条线索放在一起看，而不是只凭一个症状下结论。',
    en:'Vets put several clues together instead of deciding from a single symptom.',
    es:'Los veterinarios juntan varias pistas en lugar de decidir por un solo síntoma.'
  },
  learn3: {
    zh:'第一次猜错没关系——回头重新检查，本来就是看病的一部分。',
    en:"A wrong first guess is okay — going back to re-check is part of the job.",
    es:'Equivocarse al primer intento no pasa nada — volver a revisar es parte del trabajo.'
  },
  restartBtn: {zh:'重新试玩这个案例', en:'Replay this case', es:'Volver a jugar este caso'},
  endFootnote: {
    zh:'这是原型中的唯一一个案例，为了讲故事做了简化。<br>如果你在现实中发现受伤的野生动物，请告诉身边的大人，并联系真正的兽医或野生动物救助机构，不要自己喂食或用药。',
    en:'This is the only case in the prototype, simplified for the story.<br>If you find an injured wild animal in real life, tell a trusted adult and contact a real vet or wildlife rescue — never feed or medicate it yourself.',
    es:'Este es el único caso del prototipo, simplificado para la historia.<br>Si encuentras un animal silvestre herido en la vida real, avisa a un adulto de confianza y contacta a un veterinario real o un centro de rescate — nunca le des comida ni medicinas tú mismo.'
  }
};

function $(id){ return document.getElementById(id); }

function setLang(l){
  lang = l;
  var btns = document.querySelectorAll('#vetapp .lang-btn');
  for (var i=0;i<btns.length;i++) btns[i].classList.remove('active');
  $('vlangBtn-'+l).classList.add('active');
  applyLang();
}

function applyLang(){
  $('vtagLine').innerText = T.tagLine[lang];
  $('vappTitle').innerText = T.appTitle[lang];
  $('vcaseLabel').innerText = T.caseLabel[lang];
  $('vtitleH2').innerText = T.titleH2[lang];
  $('vtitleDesc').innerHTML = T.titleDesc[lang];
  $('vstartBtn').innerText = T.startBtn[lang];
  $('vtitleFootnote').innerHTML = T.titleFootnote[lang];
  $('vboyName1').innerText = T.boyName[lang];
  $('vboyName2').innerText = T.boyName[lang];
  $('vintroBoyLine').innerText = T.introBoyLine[lang];
  $('vvetName1').innerText = T.vetName[lang];
  $('vvetName2').innerText = T.vetName[lang];
  $('vvetName3').innerText = T.vetName[lang];
  $('vintroVetLine').innerText = T.introVetLine[lang];
  $('vstartExamBtn').innerText = T.startExamBtn[lang];
  $('vexamHintPre').childNodes[0].nodeValue = T.examHintPre[lang];
  $('vexamSuffix').innerText = T.examHintPost[lang];
  $('vhs1').innerText = T.hotspot1[lang];
  $('vhs2').innerText = T.hotspot2[lang];
  $('vhs3').innerText = T.hotspot3[lang];
  $('vclue1').innerText = T.clue1[lang];
  $('vclue2').innerText = T.clue2[lang];
  $('vclue3').innerText = T.clue3[lang];
  $('vtoDiagBtn').innerText = T.toDiagBtn[lang];
  $('vdiagVetLine').innerText = T.diagVetLine[lang];
  $('vdiagOpt1').innerText = T.diagOpt1[lang];
  $('vdiagOpt2').innerText = T.diagOpt2[lang];
  $('vdiagOpt3').innerText = T.diagOpt3[lang];
  $('vtreatIntro').innerText = T.treatIntro[lang];
  $('vtoolLabel1').innerText = T.toolLabel1[lang];
  $('vtoolLabel2').innerText = T.toolLabel2[lang];
  $('vtoolLabel3').innerText = T.toolLabel3[lang];
  $('vtreatHint').innerHTML = T.treatHint[lang];
  $('vtoEndBtn').innerText = T.toEndBtn[lang];
  $('vrestartBtn').innerText = T.restartBtn[lang];
  $('vendFootnote').innerHTML = T.endFootnote[lang];
  $('vlearnTitle').innerText = T.learnTitle[lang];
  $('vlearn1').innerText = T.learn1[lang];
  $('vlearn2').innerText = T.learn2[lang];
  $('vlearn3').innerText = T.learn3[lang];
  showFb('vdiagFeedback', state.fb);
  showFb('vtoolFeedback', state.toolFb);
  if ($('vscreen-end').classList.contains('active')) {
    renderEnding();
  }
}

function goTo(id){
  var screens = document.querySelectorAll('#vetapp .screen');
  for (var i=0;i<screens.length;i++) screens[i].classList.remove('active');
  $('vscreen-'+id).classList.add('active');
}

function findClue(n){
  var hs = $('vhs'+n);
  if (hs.classList.contains('found')) return;
  hs.classList.add('found');
  $('vclue'+n).classList.add('show');
  state.found++;
  $('vfoundCount').innerText = state.found;
  $('vpd'+n).classList.add('done');
  if (state.found>=3) $('vtoDiagBtn').disabled = false;
}

function showFb(id, fb){
  var el = $(id);
  if (!fb) { el.className = 'feedback'; el.innerText = ''; return; }
  el.innerText = T[fb.key][lang];
  el.className = 'feedback show ' + (fb.ok ? 'ok' : 'retry');
}

function pickDiag(btn,n){
  if (state.diag !== null) return;
  var correct = (n === 2);
  if (!correct) {
    btn.disabled = true;
    btn.classList.add('wrong');
    state.tries++;
    state.fb = {key:'diagFb'+n, ok:false};
    showFb('vdiagFeedback', state.fb);
    return;
  }
  var opts = document.querySelectorAll('#vdiagOptions .opt-btn');
  for (var i=0;i<opts.length;i++) opts[i].disabled = true;
  btn.classList.add('correct');
  state.diag = (state.tries === 0);
  state.fb = {key:'diagFbOk', ok:true};
  showFb('vdiagFeedback', state.fb);
  setTimeout(function(){ goTo('treat'); }, 2200);
}

function useTool(el,n){
  if (el.classList.contains('used')) return;
  if (n === state.step + 1) {
    state.step++;
    el.classList.add('used');
    state.toolFb = {key:'toolFb'+n, ok:true};
  } else {
    el.classList.add('wrongflash');
    setTimeout(function(){ el.classList.remove('wrongflash'); },300);
    state.toolFb = {key:'toolFbWrong', ok:false};
  }
  showFb('vtoolFeedback', state.toolFb);
  if (state.step>=3) $('vtoEndBtn').disabled = false;
}

function restart(){
  state = {found:0, diag:null, step:0, tries:0, fb:null, toolFb:null};
  var hs = document.querySelectorAll('#vetapp .hotspot');
  for (var i=0;i<hs.length;i++) hs[i].classList.remove('found');
  var chips = document.querySelectorAll('#vetapp .clue-chip');
  for (i=0;i<chips.length;i++) chips[i].classList.remove('show');
  var dots = document.querySelectorAll('#vetapp .progress-steps .dot');
  for (i=0;i<dots.length;i++) dots[i].classList.remove('done');
  $('vtoDiagBtn').disabled = true;
  var opts = document.querySelectorAll('#vdiagOptions .opt-btn');
  for (i=0;i<opts.length;i++){ opts[i].disabled=false; opts[i].classList.remove('correct','wrong'); }
  var tools = document.querySelectorAll('#vetapp .tool');
  for (i=0;i<tools.length;i++) tools[i].classList.remove('used');
  $('vtoEndBtn').disabled = true;
  $('vfoundCount').innerText = '0';
  showFb('vdiagFeedback', null);
  showFb('vtoolFeedback', null);
  goTo('title');
}

function renderEnding(){
  var badge = $('vendBadge');
  var text = $('vendText');
  var boy = $('vboyLine');
  if (state.diag === true) {
    badge.className = 'ending-badge best';
    badge.innerText = T.endingBestBadge[lang];
    text.innerText = T.endingBestText[lang];
    boy.innerText = T.endingBestBoy[lang];
  } else {
    badge.className = 'ending-badge ok';
    badge.innerText = T.endingOkBadge[lang];
    text.innerText = T.endingOkText[lang];
    boy.innerText = T.endingOkBoy[lang];
  }
}

function init(){
  if (!$('vetapp')) return;
  $('vlangBtn-zh').addEventListener('click', function(){ setLang('zh'); });
  $('vlangBtn-en').addEventListener('click', function(){ setLang('en'); });
  $('vlangBtn-es').addEventListener('click', function(){ setLang('es'); });
  $('vstartBtn').addEventListener('click', function(){ goTo('intro'); });
  $('vstartExamBtn').addEventListener('click', function(){ goTo('exam'); });
  $('vhs1').addEventListener('click', function(){ findClue(1); });
  $('vhs2').addEventListener('click', function(){ findClue(2); });
  $('vhs3').addEventListener('click', function(){ findClue(3); });
  $('vtoDiagBtn').addEventListener('click', function(){ goTo('diag'); });
  $('vdiagOpt1').addEventListener('click', function(){ pickDiag(this,1); });
  $('vdiagOpt2').addEventListener('click', function(){ pickDiag(this,2); });
  $('vdiagOpt3').addEventListener('click', function(){ pickDiag(this,3); });
  var tools = document.querySelectorAll('#vetapp .tool');
  for (var i=0;i<tools.length;i++){
    (function(t){
      var n = parseInt(t.getAttribute('data-step'),10);
      t.addEventListener('click', function(){ useTool(t,n); });
    })(tools[i]);
  }
  $('vtoEndBtn').addEventListener('click', function(){ goTo('end'); });
  $('vrestartBtn').addEventListener('click', restart);
  var obs = new MutationObserver(function(){
    if ($('vscreen-end').classList.contains('active')) renderEnding();
  });
  obs.observe($('vscreen-end'), {attributes:true});
  applyLang();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
})();
