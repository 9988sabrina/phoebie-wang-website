(function(){
"use strict";

var state = {found:0, diag:null, step:0};
var lang = 'zh';

var T = {
  tagLine: {zh:'WILD CASE FILES · 原型 v0.2', en:'WILD CASE FILES · Prototype v0.2', es:'WILD CASE FILES · Prototipo v0.2'},
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
    zh:'🩺 背部刺有几处稀疏，皮肤发红——不像是撞伤，更像是寄生虫或螨虫引起的皮肤问题。',
    en:"🩺 Patchy, thinning spines on the back with red skin underneath — doesn't look like trauma, more like a mite or parasite skin issue.",
    es:'🩺 Zonas de espinas ralas en la espalda con piel enrojecida — no parece un golpe, más bien un problema de piel por ácaros o parásitos.'
  },
  clue3: {
    zh:'🩺 脚爪干净、步态正常，没有外伤或骨折迹象。',
    en:"🩺 Paws are clean, gait is normal — no sign of injury or fracture.",
    es:'🩺 Patas limpias, camina con normalidad — sin señales de herida o fractura.'
  },
  toDiagBtn: {zh:'三条线索都找到后 → 下诊断', en:'Find all 3 clues → Make a diagnosis', es:'Encuentra las 3 pistas → Diagnosticar'},
  diagVetLine: {
    zh:'体重轻、背部皮肤发红掉刺、但脚爪和步态都正常——你觉得问题出在哪？',
    en:"Underweight, red irritated skin with hair loss on the back, but normal paws and gait — what do you think is going on?",
    es:'Bajo de peso, piel enrojecida y pérdida de espinas en la espalda, pero patas y marcha normales — ¿cuál crees que es el problema?'
  },
  diagOpt1: {zh:'摔伤导致的内伤，需要立刻手术', en:'Internal injury from a fall — needs surgery right away', es:'Lesión interna por una caída — necesita cirugía inmediata'},
  diagOpt2: {zh:'螨虫感染，并伴随因不适而少食', en:'Mite infection, with reduced eating from the discomfort', es:'Infección por ácaros, con menos apetito por la molestia'},
  diagOpt3: {zh:'只是换季正常脱刺，不用处理', en:'Just normal seasonal spine shedding — no treatment needed', es:'Solo muda de espinas estacional normal — no necesita tratamiento'},
  treatIntro: {
    zh:'判断是螨虫感染。按正确顺序使用工具完成治疗——顺序错了也没关系，只是会多花一点时间，刺猬不会有危险。',
    en:"Diagnosed as a mite infection. Use the tools in the right order to treat it — getting the order wrong just costs a little extra time, the hedgehog won't be at risk.",
    es:'Diagnóstico: infección por ácaros. Usa las herramientas en el orden correcto para tratarlo — si te equivocas de orden solo tardará un poco más, el erizo no corre peligro.'
  },
  toolLabel1: {zh:'温和药浴', en:'Gentle medicated bath', es:'Baño medicinal suave'},
  toolLabel2: {zh:'抗螨滴剂', en:'Anti-mite drops', es:'Gotas antiácaros'},
  toolLabel3: {zh:'高蛋白软食', en:'High-protein soft food', es:'Comida blanda proteica'},
  treatHint: {
    zh:'正确顺序：先温和清洁 → 再针对性药物 → 最后补充体力。<br>（提示：真实兽医流程中，直接上药而不先清洁患处，容易让药效打折——这也是本案例想做得比市面同类App更"内行"一点的地方。）',
    en:'Correct order: gentle cleaning first → targeted medication → then rebuild strength.<br>(Note: in real veterinary practice, applying medication before cleaning the area often reduces its effectiveness — a small detail we wanted this case to get more right than typical apps in this genre.)',
    es:'Orden correcto: primero limpieza suave → luego medicación específica → por último reforzar las fuerzas.<br>(Nota: en la práctica veterinaria real, aplicar medicamento antes de limpiar la zona suele reducir su efecto — un detalle que quisimos cuidar mejor que las apps típicas de este género.)'
  },
  toEndBtn: {zh:'完成治疗 → 查看结局', en:'Finish treatment → See the outcome', es:'Terminar tratamiento → Ver el final'},
  endingBestBadge: {zh:'✓ 诊断正确', en:'✓ Correct diagnosis', es:'✓ Diagnóstico correcto'},
  endingPoorBadge: {zh:'✕ 诊断有误', en:'✕ Misdiagnosed', es:'✕ Diagnóstico erróneo'},
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
  endingPoorText: {
    zh:'治疗方向不对，刺猬的状态没有明显好转，你又重新检查了一遍线索，才意识到问题其实出在皮肤和营养，不是外伤。好在发现得还不算晚，你立刻调整了治疗方案。',
    en:"The treatment was off track and the hedgehog didn't visibly improve. Going back over the clues, you realize the real issue was skin and nutrition, not injury. Luckily it's not too late — you adjust the treatment plan right away.",
    es:'El tratamiento no era el correcto y el erizo no mejora de forma visible. Al repasar las pistas, te das cuenta de que el problema real era la piel y la nutrición, no una lesión. Por suerte no es demasiado tarde — ajustas el plan de tratamiento de inmediato.'
  },
  endingPoorBoy: {
    zh:'它还好吗……没事就好，医生你会一直把它治好的对吧？',
    en:"Is it okay...? As long as it's fine. You'll keep treating it until it's better, right, doctor?",
    es:'¿Está bien...? Mientras esté bien. Lo seguirás tratando hasta que se cure, ¿verdad, doctora?'
  },
  restartBtn: {zh:'重新试玩这个案例', en:'Replay this case', es:'Volver a jugar este caso'},
  endFootnote: {
    zh:'这是原型中的唯一一个案例。如果这个玩法方向您觉得值得做下去，<br>下一步会扩展更多异域动物案例 + 完整美术 + 分支剧情记忆系统。',
    en:'This is the only case in the prototype. If this direction feels worth pursuing,<br>next steps are more exotic-animal cases + full art + a branching story memory system.',
    es:'Este es el único caso del prototipo. Si esta dirección vale la pena seguir,<br>los próximos pasos son más casos de animales exóticos + arte definitivo + un sistema de memoria narrativa ramificada.'
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

function pickDiag(btn,correct){
  var opts = document.querySelectorAll('#vdiagOptions .opt-btn');
  for (var i=0;i<opts.length;i++) opts[i].disabled = true;
  btn.classList.add(correct?'correct':'wrong');
  state.diag = correct;
  setTimeout(function(){ goTo('treat'); }, 700);
}

function useTool(el,n){
  if (el.classList.contains('used')) return;
  state.step++;
  if (n === state.step) {
    el.classList.add('used');
  } else {
    el.classList.add('wrongflash');
    setTimeout(function(){ el.classList.remove('wrongflash'); },300);
    state.step--;
    return;
  }
  if (state.step>=3) $('vtoEndBtn').disabled = false;
}

function restart(){
  state = {found:0, diag:null, step:0};
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
    badge.className = 'ending-badge poor';
    badge.innerText = T.endingPoorBadge[lang];
    text.innerText = T.endingPoorText[lang];
    boy.innerText = T.endingPoorBoy[lang];
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
  $('vdiagOpt1').addEventListener('click', function(){ pickDiag(this,false); });
  $('vdiagOpt2').addEventListener('click', function(){ pickDiag(this,true); });
  $('vdiagOpt3').addEventListener('click', function(){ pickDiag(this,false); });
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
