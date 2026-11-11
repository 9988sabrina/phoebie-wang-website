(function(){
"use strict";

var STORE_KEY = 'vetCaseStars';
var lang = 'zh';
var caseIdx = 0;
var state = newState();

function newState(){ return {found:0, solved:false, tries:0, step:0, fb:null, toolFb:null}; }

var UI = {
  tagLine: {zh:'WILD CASE FILES · v0.6', en:'WILD CASE FILES · v0.6', es:'WILD CASE FILES · v0.6'},
  appTitle: {zh:'野生诊所', en:'Wild Case Files', es:'Casos Silvestres'},
  caseHome: {zh:'选择病例', en:'Choose a case', es:'Elige un caso'},
  caseNo: {zh:'病例 0', en:'Case 0', es:'Caso 0'},
  titleDesc: {
    zh:'检查小动物、找线索、下诊断、完成治疗——每个病例都是一个小故事。',
    en:'Examine the animal, find the clues, make a diagnosis and treat it — every case is a little story.',
    es:'Examina al animal, busca las pistas, haz el diagnóstico y trátalo — cada caso es una pequeña historia.'
  },
  notPlayed: {zh:'还没接诊', en:'Not played yet', es:'Aún sin jugar'},
  titleFootnote: {
    zh:'故事做了简化；现实中生病或受伤的动物，请交给真正的兽医。',
    en:'The stories are simplified — a sick or injured real animal always needs a real vet.',
    es:'Las historias están simplificadas — un animal real enfermo o herido siempre necesita un veterinario de verdad.'
  },
  vetName: {zh:'你 · 兽医', en:'You · Vet', es:'Tú · Veterinaria'},
  startExamBtn: {zh:'开始检查', en:'Begin examination', es:'Iniciar examen'},
  examHint: {zh:'点击三个圆圈做检查，找出线索（已找到 {n}/3）', en:'Tap the three circles to examine and find the clues (found {n}/3)', es:'Toca los tres círculos para examinar y encontrar las pistas ({n}/3)'},
  toDiagBtn: {zh:'线索找齐了 → 下诊断', en:'All clues found → Make a diagnosis', es:'Pistas completas → Diagnosticar'},
  toDiagBtnWait: {zh:'先找齐三条线索', en:'Find all 3 clues first', es:'Primero encuentra las 3 pistas'},
  toTreatBtn: {zh:'开始治疗 →', en:'Start treatment →', es:'Empezar tratamiento →'},
  toolFbWrong: {
    zh:'还不是这一步哦——想想提示里的顺序，再试一次。',
    en:'Not this one yet — check the order in the hint and try again.',
    es:'Este todavía no — revisa el orden de la pista e inténtalo otra vez.'
  },
  toEndBtn: {zh:'完成治疗 → 看结局', en:'Finish treatment → See the ending', es:'Terminar tratamiento → Ver el final'},
  endingBestBadge: {zh:'★★★ 一次就诊断正确', en:'★★★ Right on the first try', es:'★★★ Acertaste a la primera'},
  endingOkBadge: {zh:'★★ 再看一次，找到了答案', en:'★★ Looked again and got it', es:'★★ Miraste otra vez y acertaste'},
  learnTitle: {zh:'今天学到的', en:'What you learned today', es:'Lo que aprendiste hoy'},
  nextBtn: {zh:'下一个病例 →', en:'Next case →', es:'Siguiente caso →'},
  homeBtn: {zh:'回到病例列表', en:'Back to all cases', es:'Volver a los casos'},
  careNo: {zh:'过家家', en:'Pretend play', es:'Juego de casita'},
  careName: {zh:'照顾小屋', en:'The Care Room', es:'La casita de cuidados'},
  careSub: {zh:'喂饭 · 洗澡 · 打扮 · 哄睡觉', en:'Feed · Bathe · Dress up · Bedtime', es:'Comer · Baño · Disfraces · A dormir'},
  toCareBtn: {zh:'🏠 带它去照顾小屋', en:'🏠 Take it to the Care Room', es:'🏠 Llévalo a la casita de cuidados'},
  careHomeBtn: {zh:'回到病例列表', en:'Back to all cases', es:'Volver a los casos'},
  actFeed: {zh:'喂饭', en:'Feed', es:'Comer'},
  actBath: {zh:'洗澡', en:'Bath', es:'Baño'},
  actBrush: {zh:'梳毛', en:'Brush', es:'Cepillar'},
  actHug: {zh:'抱抱', en:'Cuddle', es:'Mimos'},
  actDress: {zh:'打扮', en:'Dress up', es:'Disfrazar'},
  actSleep: {zh:'睡觉', en:'Sleep', es:'Dormir'},
  actWake: {zh:'起床', en:'Wake up', es:'Despertar'},
  nameHint: {zh:'（点名字可以改名）', en:'(tap the name to rename)', es:'(toca el nombre para cambiarlo)'},
  careNote: {zh:'想怎么玩都可以，没有错的玩法。做满 5 件不同的事，就能拿到一张照顾员贴纸！', en:'Play any way you like — there are no wrong moves. Do 5 different things to earn a carer sticker!', es:'Juega como quieras — no hay errores. ¡Haz 5 cosas distintas y gana una pegatina de cuidador!'},
  hello: {zh:'今天想和我玩什么呀？', en:'What shall we play today?', es:'¿A qué jugamos hoy?'},
  pickFood: {zh:'我饿啦——选一样给我吧！', en:"I'm hungry — pick something for me!", es:'Tengo hambre — ¡elige algo para mí!'},
  bBath: {zh:'泡泡好舒服，洗得香香的！', en:'Bubbles feel so nice — all clean!', es:'¡Qué ricas las burbujas — todo limpio!'},
  bHug: {zh:'嘿嘿，最喜欢你了！', en:'Hee hee, I like you the most!', es:'Ji ji, ¡tú eres mi favorito!'},
  bDress: {zh:'好看吗？', en:'How do I look?', es:'¿Qué tal me veo?'},
  bDressOff: {zh:'还是什么都不戴最轻松～', en:'Wearing nothing is comfy too!', es:'¡Sin nada también estoy cómodo!'},
  bSleep: {zh:'呼……晚安……', en:'Zzz... good night...', es:'Zzz... buenas noches...'},
  bWake: {zh:'睡饱啦，早上好！', en:'I slept so well — good morning!', es:'¡Dormí muy bien — buenos días!'},
  rewardText: {zh:'🏅 今天照顾得真棒！获得照顾员贴纸，一共 {n} 张', en:'🏅 Wonderful caring today! You earned a carer sticker — {n} in total', es:'🏅 ¡Qué bien lo cuidaste hoy! Ganaste una pegatina de cuidador — {n} en total'},
  newDayBtn: {zh:'☀️ 新的一天', en:'☀️ A new day', es:'☀️ Un nuevo día'},
  restartBtn: {zh:'再玩一次这个病例', en:'Replay this case', es:'Repetir este caso'}
};

var CASES = [
{
  id:'hedgehog', sick:'assets/vet/hedgehog-sick.svg', well:'assets/vet/hedgehog-well.svg', owner:'assets/vet/boy.svg',
  correct:2, icons:['🧴','💧','🍲'],
  t:{
    name: {zh:'后院里的刺猬', en:'The hedgehog in the backyard', es:'El erizo del jardín'},
    ownerName: {zh:'男孩 · 小宇', en:'Boy · Theo', es:'Niño · Teo'},
    introOwner: {
      zh:'"医生！我在后院浇花的时候看到它缩成一团一动不动……它平时晚上才出来的，白天这样是不是很不好？"',
      en:'"Doctor! I found it curled up and not moving while I was watering the backyard... It usually only comes out at night — is it bad that it\'s out in daylight like this?"',
      es:'"¡Doctora! Lo encontré hecho una bola, sin moverse, mientras regaba el jardín... Normalmente solo sale de noche — ¿es malo que esté así de día?"'
    },
    introVet: {
      zh:'别担心，我先给它做个检查，你可以在旁边陪着它。',
      en:"Don't worry, let me examine it first — you can stay right beside it.",
      es:'Tranquilo, primero lo voy a examinar — puedes quedarte a su lado.'
    },
    hs: [
      {zh:'体重', en:'Weight', es:'Peso'},
      {zh:'背部', en:'Back', es:'Espalda'},
      {zh:'脚爪', en:'Paws', es:'Patas'}
    ],
    clues: [
      {zh:'🩺 体重明显偏轻，肋骨能摸到——可能最近没怎么进食。', en:'🩺 Noticeably underweight, ribs are easy to feel — it may not have been eating much lately.', es:'🩺 Notablemente bajo de peso, se le notan las costillas — puede que no haya comido bien últimamente.'},
      {zh:'🩺 背部刺有几处稀疏，皮肤发红发痒——不像是撞伤，更像是某种皮肤问题。', en:"🩺 Patchy, thinning spines on the back with red, itchy skin underneath — doesn't look like a knock, more like some kind of skin problem.", es:'🩺 Zonas de espinas ralas en la espalda con piel enrojecida y con picor — no parece un golpe, más bien algún problema de piel.'},
      {zh:'🩺 脚爪干净、步态正常，没有外伤或骨折迹象。', en:'🩺 Paws are clean and it walks normally — no sign of injury or fracture.', es:'🩺 Patas limpias, camina con normalidad — sin señales de herida o fractura.'}
    ],
    diagVet: {
      zh:'体重轻、背部皮肤发红掉刺、但脚爪和步态都正常——你觉得问题出在哪？',
      en:'Underweight, red itchy skin and thinning spines on the back, but normal paws and walking — what do you think is going on?',
      es:'Bajo de peso, piel roja con picor y espinas ralas en la espalda, pero patas y marcha normales — ¿cuál crees que es el problema?'
    },
    opts: [
      {zh:'摔伤导致的内伤，需要立刻手术', en:'Internal injury from a fall — needs surgery right away', es:'Lesión interna por una caída — necesita cirugía inmediata'},
      {zh:'螨虫感染，并伴随因不适而少食', en:'Mite infection, and eating less because it feels unwell', es:'Infección por ácaros, y come menos por el malestar'},
      {zh:'只是换季正常脱刺，不用处理', en:'Just normal seasonal spine shedding — no treatment needed', es:'Solo muda de espinas estacional normal — no necesita tratamiento'}
    ],
    fb: [
      {zh:'再看看线索：脚爪和步态都正常，也没有外伤迹象——不太像摔伤。换一个答案试试？', en:"Look at the clues again: the paws and walking are normal, with no sign of injury — a fall doesn't fit. Try another answer?", es:'Mira otra vez las pistas: las patas y la marcha son normales, sin señales de herida — una caída no encaja. ¿Pruebas otra respuesta?'},
      {zh:'对！皮肤发红发痒加上掉刺，是螨虫的常见表现；不舒服让它吃得少，所以变瘦了。', en:'Yes! Red, itchy skin with thinning spines is a common sign of mites — and feeling unwell made it eat less, so it lost weight.', es:'¡Sí! La piel roja con picor y las espinas ralas son una señal común de ácaros — y al sentirse mal comió menos, por eso adelgazó.'},
      {zh:'再想想：正常换刺不会让皮肤发红发痒，体重也不会明显变轻。换一个答案试试？', en:"Think again: normal spine shedding doesn't make the skin red and itchy, or cause clear weight loss. Try another answer?", es:'Piénsalo otra vez: la muda normal de espinas no deja la piel roja y con picor, ni hace perder tanto peso. ¿Pruebas otra respuesta?'}
    ],
    treatIntro: {
      zh:'判断是螨虫感染。按正确顺序使用工具完成治疗——顺序错了也没关系，再试一次就好，刺猬不会有危险。',
      en:"It's a mite infection. Use the tools in the right order to treat it — if you get the order wrong, just try again; the hedgehog won't be at risk.",
      es:'Es una infección por ácaros. Usa las herramientas en el orden correcto — si te equivocas de orden, inténtalo otra vez; el erizo no corre peligro.'
    },
    tools: [
      {zh:'温和药浴', en:'Gentle medicated bath', es:'Baño medicinal suave'},
      {zh:'抗螨滴剂', en:'Anti-mite drops', es:'Gotas antiácaros'},
      {zh:'高蛋白软食', en:'High-protein soft food', es:'Comida blanda proteica'}
    ],
    toolFb: [
      {zh:'✓ 洗干净了，刺猬放松了一点。', en:'✓ All clean — the hedgehog relaxes a little.', es:'✓ Ya está limpio — el erizo se relaja un poco.'},
      {zh:'✓ 滴剂用好了，接下来让它补充体力。', en:'✓ Drops applied — now help it rebuild its strength.', es:'✓ Gotas aplicadas — ahora ayúdalo a recuperar fuerzas.'},
      {zh:'✓ 它开始小口小口吃东西了！', en:"✓ It's starting to eat, one small bite at a time!", es:'✓ ¡Empieza a comer, bocadito a bocadito!'}
    ],
    treatHint: {
      zh:'本病例的顺序：先温和清洁 → 再针对性药物 → 最后补充体力。<br>（这是为了讲故事而简化的流程，不同动物、不同药物的真实护理顺序并不一样。）',
      en:'Order in this case: gentle cleaning first → targeted medicine → then rebuild strength.<br>(Simplified for the story — real veterinary care varies by animal and medicine.)',
      es:'Orden en este caso: primero limpieza suave → luego medicina específica → por último recuperar fuerzas.<br>(Simplificado para la historia — el cuidado veterinario real varía según el animal y la medicina.)'
    },
    endBest: {
      zh:'你判断出是螨虫感染合并营养不良，按清洁→用药→补食的顺序处理后，刺猬明显放松下来，蜷缩的身体慢慢舒展开。你把它留院观察两天，背部的红肿开始消退。',
      en:'You spotted a mite infection together with poor nutrition. After cleaning, medicine and food — in that order — the hedgehog relaxes and slowly uncurls. You keep it in for two days, and the redness on its back starts to fade.',
      es:'Detectaste una infección por ácaros junto con mala nutrición. Tras limpiar, medicar y alimentar — en ese orden — el erizo se relaja y se va desenrollando. Lo dejas dos días en observación y el enrojecimiento de su espalda empieza a ceder.'
    },
    endOk: {
      zh:'第一个想法不太对，但你没有着急，而是回头把线索重新看了一遍，找到了真正的原因：螨虫感染合并营养不良。按清洁→用药→补食的顺序处理后，刺猬慢慢舒展开身体，背部的红肿开始消退。',
      en:"Your first idea didn't fit, but you didn't rush — you went back over the clues and found the real cause: a mite infection together with poor nutrition. After cleaning, medicine and food, the hedgehog slowly uncurls and the redness on its back starts to fade.",
      es:'Tu primera idea no encajaba, pero no te apresuraste: repasaste las pistas y encontraste la causa real: una infección por ácaros junto con mala nutrición. Tras limpiar, medicar y alimentar, el erizo se va desenrollando y el enrojecimiento empieza a ceder.'
    },
    ownerBest: {
      zh:'太好了……它看起来没那么难受了。等它好了，我们一起把它送回后院吧！',
      en:"That's such a relief... it looks so much less uncomfortable. When it's better, let's take it back to the backyard together!",
      es:'Qué alivio... se ve mucho menos incómodo. Cuando se cure, ¡lo llevamos juntos de vuelta al jardín!'
    },
    ownerOk: {
      zh:'原来医生也会再检查一遍呀……还好你又看了一次！它看起来舒服多了。',
      en:"So even doctors check twice... I'm glad you looked again! It looks so much more comfortable now.",
      es:'Así que hasta los doctores revisan dos veces... ¡Qué bueno que miraste otra vez! Se ve mucho más cómodo.'
    },
    learn: [
      {zh:'刺猬是夜行动物——白天躺在外面一动不动，常常是生病或虚弱的信号。', en:'Hedgehogs are nocturnal — one lying still out in the open in daytime is often sick or weak.', es:'Los erizos son nocturnos — uno quieto y a la vista en pleno día suele estar enfermo o débil.'},
      {zh:'兽医会把几条线索放在一起看，而不是只凭一个症状下结论。', en:'Vets put several clues together instead of deciding from a single symptom.', es:'Los veterinarios juntan varias pistas en lugar de decidir por un solo síntoma.'},
      {zh:'第一次猜错没关系——回头重新检查，本来就是看病的一部分。', en:'A wrong first guess is okay — going back to re-check is part of the job.', es:'Equivocarse al primer intento no pasa nada — volver a revisar es parte del trabajo.'}
    ],
    endFootnote: {
      zh:'如果你在现实中发现受伤的野生动物，请告诉身边的大人，并联系真正的兽医或野生动物救助机构，不要自己喂食或用药。',
      en:'If you find an injured wild animal in real life, tell a trusted adult and contact a real vet or wildlife rescue — never feed or medicate it yourself.',
      es:'Si encuentras un animal silvestre herido en la vida real, avisa a un adulto de confianza y contacta a un veterinario o un centro de rescate — nunca le des comida ni medicinas tú mismo.'
    }
  }
},
{
  id:'rabbit', sick:'assets/vet/rabbit-sick.svg', well:'assets/vet/rabbit-well.svg', owner:'assets/vet/girl.svg',
  correct:2, icons:['🦷','🥣','🌾'],
  t:{
    name: {zh:'不吃胡萝卜的兔子', en:"The rabbit who won't eat", es:'El conejo que no quiere comer'},
    ownerName: {zh:'女孩 · 朵朵', en:'Girl · Mia', es:'Niña · Mía'},
    introOwner: {
      zh:'"医生，团子这几天连最爱的胡萝卜都只闻一闻就走开，下巴的毛老是湿湿的。家里的干草吃完好几个星期了，我们一直只喂兔粮和零食……"',
      en:'"Doctor, Mochi just sniffs his favorite carrot and walks away, and the fur on his chin is always wet. We ran out of hay weeks ago, so he\'s only had pellets and treats..."',
      es:'"Doctora, Mochi solo huele su zanahoria favorita y se va, y siempre tiene mojado el pelo de la barbilla. Se nos acabó el heno hace semanas y solo le damos pienso y premios..."'
    },
    introVet: {
      zh:'谢谢你讲得这么清楚，这些细节都很有用。我先给团子做个检查。',
      en:"Thank you for explaining so clearly — those details really help. Let me examine Mochi first.",
      es:'Gracias por explicarlo tan bien — esos detalles ayudan mucho. Primero voy a examinar a Mochi.'
    },
    hs: [
      {zh:'体重', en:'Weight', es:'Peso'},
      {zh:'下巴', en:'Chin', es:'Barbilla'},
      {zh:'耳朵', en:'Ears', es:'Orejas'}
    ],
    clues: [
      {zh:'🩺 比上次体检轻了不少——它这段时间确实吃得很少。', en:"🩺 Quite a bit lighter than at his last check-up — he really hasn't been eating much.", es:'🩺 Pesa bastante menos que en su última revisión — de verdad ha comido muy poco.'},
      {zh:'🩺 下巴的毛湿成一片，是在流口水——嘴里可能有地方不舒服。', en:'🩺 The fur on his chin is soaked — he is drooling, so something in his mouth may be bothering him.', es:'🩺 El pelo de la barbilla está empapado — está babeando, así que algo en la boca puede molestarle.'},
      {zh:'🩺 耳朵干净、不红，也没有异味——没有耳朵发炎的迹象。', en:'🩺 Ears are clean, not red and have no smell — no sign of an ear infection.', es:'🩺 Orejas limpias, sin enrojecimiento ni olor — sin señales de infección de oído.'}
    ],
    diagVet: {
      zh:'变瘦、流口水、对着爱吃的东西却不吃，耳朵正常——再加上好几周没有干草。你觉得问题出在哪？',
      en:"Weight loss, drooling, turning away from food he loves, normal ears — plus weeks without hay. What do you think is going on?",
      es:'Pérdida de peso, babeo, rechaza la comida que le encanta, orejas normales — y además semanas sin heno. ¿Cuál crees que es el problema?'
    },
    opts: [
      {zh:'耳朵发炎让它头晕，所以不想吃', en:"An ear infection is making him dizzy, so he doesn't want to eat", es:'Una infección de oído lo marea, por eso no quiere comer'},
      {zh:'牙齿长得太长，一嚼东西就疼', en:'His teeth have grown too long, so chewing hurts', es:'Le han crecido demasiado los dientes y le duele masticar'},
      {zh:'只是挑食，换个口味就好了', en:'He is just being picky — a new flavor will fix it', es:'Solo es caprichoso — con otro sabor se arregla'}
    ],
    fb: [
      {zh:'再看看线索：耳朵检查是干净正常的，不像耳朵发炎。换一个答案试试？', en:"Look at the clues again: his ears were clean and normal, so an ear infection doesn't fit. Try another answer?", es:'Mira otra vez las pistas: sus orejas estaban limpias y normales, una infección de oído no encaja. ¿Pruebas otra respuesta?'},
      {zh:'对！兔子的牙齿一辈子都在长，要靠嚼干草来磨短。好几周没有干草，牙齿太长，一嚼就疼，所以流口水、吃不下。', en:"Yes! A rabbit's teeth never stop growing, and chewing hay wears them down. After weeks without hay his teeth got too long, chewing hurts — so he drools and can't eat.", es:'¡Sí! Los dientes de un conejo nunca dejan de crecer, y masticar heno los desgasta. Tras semanas sin heno le crecieron demasiado y le duele masticar — por eso babea y no puede comer.'},
      {zh:'再想想：挑食不会让它流口水，体重也不会掉这么多。换一个答案试试？', en:"Think again: being picky wouldn't make him drool or lose this much weight. Try another answer?", es:'Piénsalo otra vez: ser caprichoso no lo haría babear ni perder tanto peso. ¿Pruebas otra respuesta?'}
    ],
    treatIntro: {
      zh:'判断是牙齿过长。按正确顺序完成治疗——顺序错了也没关系，再试一次就好。',
      en:"His teeth are overgrown. Complete the treatment in the right order — if you get the order wrong, just try again.",
      es:'Tiene los dientes demasiado largos. Completa el tratamiento en el orden correcto — si te equivocas, inténtalo otra vez.'
    },
    tools: [
      {zh:'兽医修牙', en:'Vet trims the teeth', es:'La veterinaria lima los dientes'},
      {zh:'软质恢复食', en:'Soft recovery food', es:'Comida blanda de recuperación'},
      {zh:'每天吃干草', en:'Hay every day', es:'Heno todos los días'}
    ],
    toolFb: [
      {zh:'✓ 牙修好了，团子动了动嘴巴——不疼了。', en:"✓ Teeth trimmed — Mochi wiggles his mouth. It doesn't hurt any more.", es:'✓ Dientes limados — Mochi mueve la boca. Ya no le duele.'},
      {zh:'✓ 它把软食舔得干干净净，体力慢慢回来了。', en:'✓ He licks the soft food clean — his strength is coming back.', es:'✓ Se termina toda la comida blanda — va recuperando fuerzas.'},
      {zh:'✓ 团子抱着干草嚼个不停！', en:"✓ Mochi can't stop munching his hay!", es:'✓ ¡Mochi no para de masticar su heno!'}
    ],
    treatHint: {
      zh:'本病例的顺序：先由兽医修牙 → 再喂软食恢复体力 → 最后回到每天吃干草。<br>（修牙只能由兽医来做，千万不要在家里自己剪。）',
      en:'Order in this case: the vet trims the teeth first → soft food to regain strength → then back to hay every day.<br>(Only a vet should trim teeth — never try it at home.)',
      es:'Orden en este caso: primero la veterinaria lima los dientes → luego comida blanda para recuperar fuerzas → y después heno todos los días.<br>(Solo un veterinario debe limar los dientes — nunca lo intentes en casa.)'
    },
    endBest: {
      zh:'你把"流口水、变瘦、没有干草"几条线索连在一起，判断出是牙齿过长。修好牙的当天，团子就重新开始吃东西了。你叮嘱朵朵：干草每天都要有，过几周再带它回来复查。',
      en:'You linked the clues — drooling, weight loss, no hay — and worked out that his teeth were overgrown. The same day his teeth were trimmed, Mochi started eating again. You remind Mia: hay every single day, and a check-up in a few weeks.',
      es:'Uniste las pistas — babeo, pérdida de peso, sin heno — y descubriste que tenía los dientes demasiado largos. El mismo día que se los limaron, Mochi volvió a comer. Le recuerdas a Mía: heno todos los días y revisión en unas semanas.'
    },
    endOk: {
      zh:'第一个想法不太对，但你回头把线索重新看了一遍，注意到"流口水"和"好几周没有干草"，找到了真正的原因：牙齿过长。修好牙的当天，团子就重新开始吃东西了。',
      en:"Your first idea didn't fit, but you went back over the clues, noticed the drooling and the weeks without hay, and found the real cause: overgrown teeth. The same day his teeth were trimmed, Mochi started eating again.",
      es:'Tu primera idea no encajaba, pero repasaste las pistas, te fijaste en el babeo y en las semanas sin heno, y encontraste la causa real: dientes demasiado largos. El mismo día que se los limaron, Mochi volvió a comer.'
    },
    ownerBest: {
      zh:'原来干草不只是吃的，还是它的"牙刷"！我回家就把干草架装得满满的。',
      en:"So hay isn't just food — it's his toothbrush! I'm filling his hay rack the moment we get home.",
      es:'¡Así que el heno no es solo comida — es su cepillo de dientes! En cuanto lleguemos a casa le lleno el comedero de heno.'
    },
    ownerOk: {
      zh:'还好你又看了一次线索！我回家就把干草架装得满满的，再也不让它断粮了。',
      en:"I'm so glad you looked at the clues again! I'm filling his hay rack the moment we get home — he'll never run out again.",
      es:'¡Qué bueno que miraste las pistas otra vez! En cuanto lleguemos le lleno el comedero de heno — no le volverá a faltar.'
    },
    learn: [
      {zh:'兔子的牙齿一辈子都在长，要靠每天嚼干草来磨短。', en:"A rabbit's teeth grow all its life — chewing hay every day keeps them worn down.", es:'Los dientes de un conejo crecen toda su vida — masticar heno a diario los mantiene desgastados.'},
      {zh:'干草应该是兔子每天最主要的食物，兔粮和零食只是配角。', en:"Hay should be the main part of a rabbit's diet; pellets and treats are only extras.", es:'El heno debe ser la base de la dieta de un conejo; el pienso y los premios son solo extras.'},
      {zh:'主人讲的生活细节（比如"干草吃完了"）也是重要的线索。', en:'What the owner tells you about daily life (like "we ran out of hay") is an important clue too.', es:'Lo que cuenta el dueño sobre el día a día (como "se nos acabó el heno") también es una pista importante.'}
    ],
    endFootnote: {
      zh:'如果你的兔子不吃东西或流口水，请尽快带它去看真正的兽医——不要自己修牙或喂药。',
      en:'If your rabbit stops eating or starts drooling, take it to a real vet quickly — never trim teeth or give medicine yourself.',
      es:'Si tu conejo deja de comer o empieza a babear, llévalo pronto a un veterinario de verdad — nunca le limes los dientes ni le des medicinas tú mismo.'
    }
  }
}
];

var ACCS = ['', '🎀', '👑', '🌸', '🎩', '🧣'];
var PETS = [
  {
    names: {zh:['栗子','球球','小刺'], en:['Chestnut','Bramble','Pip'], es:['Castaña','Bolita','Púas']},
    brush: {zh:'刺也要轻轻梳——痒痒的，好舒服！', en:'Gentle on the spines — that tickles, so nice!', es:'Suave con las púas — ¡qué cosquillas tan ricas!'},
    foods: [
      {ico:'💧', ok:true, name:{zh:'清水', en:'Water', es:'Agua'}, say:{zh:'咕嘟咕嘟——清水最好啦！', en:'Glug glug — fresh water is the best!', es:'Glu glu — ¡el agua fresca es lo mejor!'}},
      {ico:'🐛', ok:true, name:{zh:'虫虫餐', en:'Bug dinner', es:'Cena de bichitos'}, say:{zh:'脆脆的，我最爱吃虫虫！', en:'Crunchy! Bugs are my favorite!', es:'¡Crujiente! ¡Los bichitos son mis favoritos!'}},
      {ico:'🥛', ok:false, name:{zh:'牛奶', en:'Milk', es:'Leche'}, say:{zh:'刺猬不能喝牛奶，会肚子疼——换成清水吧！', en:"Hedgehogs can't drink milk — it gives us a tummy ache. Water, please!", es:'Los erizos no podemos tomar leche — nos duele la barriga. ¡Agua, por favor!'}}
    ]
  },
  {
    names: {zh:['团子','雪球','糯米'], en:['Mochi','Snowball','Clover'], es:['Mochi','Copito','Trébol']},
    brush: {zh:'毛梳得顺顺的，蓬蓬的！', en:'My fur is all smooth and fluffy!', es:'¡Mi pelo quedó suave y esponjoso!'},
    foods: [
      {ico:'🌾', ok:true, name:{zh:'干草', en:'Hay', es:'Heno'}, say:{zh:'嚼嚼嚼——顺便磨磨牙！', en:'Munch munch — and it keeps my teeth short!', es:'Ñam ñam — ¡y me desgasta los dientes!'}},
      {ico:'🥬', ok:true, name:{zh:'青菜', en:'Leafy greens', es:'Hojas verdes'}, say:{zh:'新鲜的叶子，好吃！', en:'Fresh leaves — yummy!', es:'Hojas frescas — ¡qué ricas!'}},
      {ico:'🥕', ok:true, name:{zh:'胡萝卜', en:'Carrot', es:'Zanahoria'}, say:{zh:'好甜！不过胡萝卜是零食，一小口就够啦。', en:'So sweet! But carrot is a treat — one little bite is enough.', es:'¡Qué dulce! Pero la zanahoria es un premio — con un bocadito basta.'}}
    ]
  }
];
var CARE_KEY = 'vetCareRoom';
var care = loadCare();
var careUi = {bubble:null, food:false, asleep:false, fx:''};

function loadCare(){
  var d = {pet:0, name:[0,0], acc:[0,0], done:[], stickers:0};
  try {
    var s = JSON.parse(window.localStorage.getItem(CARE_KEY));
    if (s && s.name && s.acc && s.done) { for (var k in d) { if (s[k] !== undefined) d[k] = s[k]; } }
  } catch (e) {}
  return d;
}
function saveCare(){
  try { window.localStorage.setItem(CARE_KEY, JSON.stringify(care)); } catch (e) {}
}

function $(id){ return document.getElementById(id); }
function L(o){ return o[lang]; }
function C(){ return CASES[caseIdx]; }

function loadStars(){
  try { return JSON.parse(window.localStorage.getItem(STORE_KEY)) || {}; } catch (e) { return {}; }
}
function saveStars(id, n){
  try {
    var s = loadStars();
    if (!s[id] || n > s[id]) { s[id] = n; window.localStorage.setItem(STORE_KEY, JSON.stringify(s)); }
  } catch (e) {}
}

function activeScreen(){
  var el = document.querySelector('#vetapp .screen.active');
  return el ? el.id.replace('vscreen-','') : 'title';
}

function setLang(l){
  lang = l;
  var btns = document.querySelectorAll('#vetapp .lang-btn');
  for (var i=0;i<btns.length;i++) btns[i].classList.remove('active');
  $('vlangBtn-'+l).classList.add('active');
  render();
}

function showFb(id, text, ok){
  var el = $(id);
  if (!text) { el.className = 'feedback'; el.innerText = ''; return; }
  el.innerText = text;
  el.className = 'feedback show ' + (ok ? 'ok' : 'retry');
}

function render(){
  var c = C(), t = c.t, i;
  var onTitle = activeScreen() === 'title';
  $('vtagLine').innerText = L(UI.tagLine);
  $('vappTitle').innerText = L(UI.appTitle);
  $('vcaseLabel').innerText = onTitle ? L(UI.caseHome) : (activeScreen() === 'care' ? L(UI.careName) : L(UI.caseNo) + (caseIdx+1));
  $('vtitleH2').innerText = L(UI.appTitle);
  $('vtitleDesc').innerText = L(UI.titleDesc);
  $('vtitleFootnote').innerText = L(UI.titleFootnote);
  var stars = loadStars();
  for (i=0;i<CASES.length;i++){
    $('vcaseNo'+i).innerText = L(UI.caseNo) + (i+1);
    $('vcaseName'+i).innerText = L(CASES[i].t.name);
    var n = stars[CASES[i].id];
    $('vcaseStars'+i).innerText = n ? (n >= 3 ? '★★★' : '★★☆') : L(UI.notPlayed);
    $('vcaseStars'+i).className = 'case-stars' + (n ? ' done' : '');
  }
  $('vetapp').className = 'case-' + c.id + ' pet-' + CASES[care.pet].id;
  $('vownerAv1').src = c.owner; $('vownerAv2').src = c.owner;
  $('vimgIntro').src = c.sick; $('vimgExam').src = c.sick; $('vimgTreat').src = c.sick; $('vimgEnd').src = c.well;
  if (state.step >= 3) $('vimgTreat').src = c.well;
  $('vownerName1').innerText = L(t.ownerName); $('vownerName2').innerText = L(t.ownerName);
  $('vintroOwnerLine').innerText = L(t.introOwner);
  $('vvetName1').innerText = L(UI.vetName); $('vvetName2').innerText = L(UI.vetName); $('vvetName3').innerText = L(UI.vetName);
  $('vintroVetLine').innerText = L(t.introVet);
  $('vstartExamBtn').innerText = L(UI.startExamBtn);
  $('vexamHint').innerText = L(UI.examHint).replace('{n}', state.found);
  for (i=1;i<=3;i++){
    $('vhs'+i).innerText = L(t.hs[i-1]);
    $('vclue'+i).innerText = L(t.clues[i-1]);
    $('vdiagOpt'+i).innerText = L(t.opts[i-1]);
    $('vtoolIco'+i).innerText = c.icons[i-1];
    $('vtoolLabel'+i).innerText = L(t.tools[i-1]);
    $('vlearn'+i).innerText = L(t.learn[i-1]);
  }
  $('vtoDiagBtn').innerText = state.found >= 3 ? L(UI.toDiagBtn) : L(UI.toDiagBtnWait);
  $('vdiagVetLine').innerText = L(t.diagVet);
  $('vtoTreatBtn').innerText = L(UI.toTreatBtn);
  $('vtreatIntro').innerText = L(t.treatIntro);
  $('vtreatHint').innerHTML = L(t.treatHint);
  $('vtoEndBtn').innerText = L(UI.toEndBtn);
  $('vlearnTitle').innerText = L(UI.learnTitle);
  $('vnextBtn').innerText = caseIdx < CASES.length-1 ? L(UI.nextBtn) : L(UI.homeBtn);
  $('vrestartBtn').innerText = L(UI.restartBtn);
  $('vtoCareBtn').innerText = L(UI.toCareBtn);
  renderCare();
  $('vendFootnote').innerText = L(t.endFootnote);
  showFb('vdiagFeedback', state.fb ? L(t.fb[state.fb.n-1]) : '', state.fb && state.fb.ok);
  showFb('vtoolFeedback', state.toolFb ? (state.toolFb.ok ? L(t.toolFb[state.toolFb.n-1]) : L(UI.toolFbWrong)) : '', state.toolFb && state.toolFb.ok);
  var best = state.tries === 0;
  $('vendBadge').className = 'ending-badge ' + (best ? 'best' : 'ok');
  $('vendBadge').innerText = L(best ? UI.endingBestBadge : UI.endingOkBadge);
  $('vendText').innerText = L(best ? t.endBest : t.endOk);
  $('vownerEndLine').innerText = L(best ? t.ownerBest : t.ownerOk);
}

function renderCare(){
  var p = PETS[care.pet], i;
  $('vcareNo').innerText = L(UI.careNo);
  $('vcareName').innerText = L(UI.careName);
  $('vcareSub').innerText = L(UI.careSub);
  $('vpetTab0').className = 'pet-tab' + (care.pet === 0 ? ' active' : '');
  $('vpetTab1').className = 'pet-tab' + (care.pet === 1 ? ' active' : '');
  $('vpetName').innerText = L(p.names)[care.name[care.pet]] + ' ✎';
  $('vpetName').title = L(UI.nameHint);
  var full = care.done.length >= 5, h = '';
  for (i=0;i<5;i++) h += i < care.done.length ? '❤️' : '🤍';
  $('vhearts').innerText = h;
  $('vcareImg').src = CASES[care.pet].well;
  $('vacc').innerText = ACCS[care.acc[care.pet]];
  $('vfx').innerText = careUi.fx;
  $('vroom').className = 'room' + (careUi.asleep ? ' night' : '');
  $('vbubble').innerText = careUi.bubble ? L(careUi.bubble) : L(UI.hello);
  $('vactFeedL').innerText = L(UI.actFeed);
  $('vactBathL').innerText = L(UI.actBath);
  $('vactBrushL').innerText = L(UI.actBrush);
  $('vactHugL').innerText = L(UI.actHug);
  $('vactDressL').innerText = L(UI.actDress);
  $('vactSleepL').innerText = careUi.asleep ? L(UI.actWake) : L(UI.actSleep);
  $('vfoodRow').className = 'food-row' + (careUi.food ? ' show' : '');
  for (i=0;i<3;i++) $('vfood'+(i+1)).innerText = p.foods[i].ico + ' ' + L(p.foods[i].name);
  $('vreward').className = 'reward' + (full ? ' show' : '');
  $('vrewardText').innerText = L(UI.rewardText).replace('{n}', care.stickers);
  $('vnewDayBtn').innerText = L(UI.newDayBtn);
  $('vcareNote').innerText = L(UI.careNote);
  $('vcareHomeBtn').innerText = L(UI.careHomeBtn);
}

function careDone(kind){
  if (care.done.length >= 5 || care.done.indexOf(kind) !== -1) return;
  care.done.push(kind);
  if (care.done.length >= 5) care.stickers++;
}

function bounce(){
  var w = $('vpetWrap');
  w.classList.remove('bounce');
  void w.offsetWidth;
  w.classList.add('bounce');
}

function careAct(kind, bubble, fx, counts){
  if (kind !== 'sleep') careUi.asleep = false;
  careUi.food = false;
  careUi.bubble = bubble;
  careUi.fx = fx;
  if (counts !== false) careDone(kind);
  saveCare();
  render();
  bounce();
}

function openCare(pet){
  if (pet !== undefined) care.pet = pet;
  careUi = {bubble:null, food:false, asleep:false, fx:''};
  goTo('care');
}

function switchPet(i){
  care.pet = i;
  careUi = {bubble:null, food:false, asleep:false, fx:''};
  saveCare();
  render();
  bounce();
}

function feed(i){
  var f = PETS[care.pet].foods[i];
  careAct('feed', f.say, f.ok ? f.ico : '🙅', f.ok);
  if (!f.ok) { careUi.food = true; render(); }
}

function goTo(id){
  var screens = document.querySelectorAll('#vetapp .screen');
  for (var i=0;i<screens.length;i++) screens[i].classList.remove('active');
  $('vscreen-'+id).classList.add('active');
  render();
  var app = $('vetapp');
  if (app.scrollIntoView && app.getBoundingClientRect().top < 0) app.scrollIntoView();
}

function resetCase(){
  state = newState();
  var i, list;
  list = document.querySelectorAll('#vetapp .hotspot');
  for (i=0;i<list.length;i++) list[i].classList.remove('found');
  list = document.querySelectorAll('#vetapp .clue-chip');
  for (i=0;i<list.length;i++) list[i].classList.remove('show');
  list = document.querySelectorAll('#vetapp .progress-steps .dot');
  for (i=0;i<list.length;i++) list[i].classList.remove('done');
  list = document.querySelectorAll('#vdiagOptions .opt-btn');
  for (i=0;i<list.length;i++){ list[i].disabled = false; list[i].classList.remove('correct','wrong'); }
  list = document.querySelectorAll('#vetapp .tool');
  for (i=0;i<list.length;i++) list[i].classList.remove('used');
  $('vtoDiagBtn').disabled = true;
  $('vtoTreatBtn').disabled = true;
  $('vtoEndBtn').disabled = true;
}

function startCase(i){
  caseIdx = i;
  resetCase();
  goTo('intro');
}

function findClue(n){
  var hs = $('vhs'+n);
  if (hs.classList.contains('found')) return;
  hs.classList.add('found');
  $('vclue'+n).classList.add('show');
  $('vpd'+n).classList.add('done');
  state.found++;
  if (state.found >= 3) $('vtoDiagBtn').disabled = false;
  render();
}

function pickDiag(n){
  if (state.solved) return;
  var btn = $('vdiagOpt'+n);
  if (n !== C().correct) {
    btn.disabled = true;
    btn.classList.add('wrong');
    state.tries++;
    state.fb = {n:n, ok:false};
    render();
    return;
  }
  var opts = document.querySelectorAll('#vdiagOptions .opt-btn');
  for (var i=0;i<opts.length;i++) opts[i].disabled = true;
  btn.classList.add('correct');
  state.solved = true;
  state.fb = {n:n, ok:true};
  $('vtoTreatBtn').disabled = false;
  render();
}

function useTool(n){
  var el = $('vtool'+n);
  if (el.classList.contains('used')) return;
  if (n === state.step + 1) {
    state.step++;
    el.classList.add('used');
    state.toolFb = {n:n, ok:true};
  } else {
    el.classList.add('wrongflash');
    setTimeout(function(){ el.classList.remove('wrongflash'); }, 300);
    state.toolFb = {n:n, ok:false};
  }
  if (state.step >= 3) $('vtoEndBtn').disabled = false;
  render();
}

function finish(){
  saveStars(C().id, state.tries === 0 ? 3 : 2);
  goTo('end');
}

function bind(id, fn){ $(id).addEventListener('click', fn); }

function init(){
  if (!$('vetapp')) return;
  bind('vlangBtn-zh', function(){ setLang('zh'); });
  bind('vlangBtn-en', function(){ setLang('en'); });
  bind('vlangBtn-es', function(){ setLang('es'); });
  bind('vcaseBtn0', function(){ startCase(0); });
  bind('vcaseBtn1', function(){ startCase(1); });
  bind('vstartExamBtn', function(){ goTo('exam'); });
  [1,2,3].forEach(function(n){
    bind('vhs'+n, function(){ findClue(n); });
    bind('vdiagOpt'+n, function(){ pickDiag(n); });
    bind('vtool'+n, function(){ useTool(n); });
  });
  bind('vtoDiagBtn', function(){ goTo('diag'); });
  bind('vtoTreatBtn', function(){ goTo('treat'); });
  bind('vtoEndBtn', finish);
  bind('vnextBtn', function(){
    if (caseIdx < CASES.length-1) { startCase(caseIdx+1); } else { resetCase(); goTo('title'); }
  });
  bind('vcareBtn', function(){ openCare(); });
  bind('vtoCareBtn', function(){ openCare(caseIdx); });
  bind('vcareHomeBtn', function(){ resetCase(); goTo('title'); });
  bind('vpetTab0', function(){ switchPet(0); });
  bind('vpetTab1', function(){ switchPet(1); });
  bind('vpetName', function(){
    care.name[care.pet] = (care.name[care.pet] + 1) % 3;
    saveCare(); render();
  });
  bind('vactFeed', function(){
    careUi.asleep = false; careUi.food = !careUi.food; careUi.fx = '';
    careUi.bubble = UI.pickFood; render();
  });
  [0,1,2].forEach(function(i){ bind('vfood'+(i+1), function(){ feed(i); }); });
  bind('vactBath', function(){ careAct('bath', UI.bBath, '🫧'); });
  bind('vactBrush', function(){ careAct('brush', PETS[care.pet].brush, '✨'); });
  bind('vactHug', function(){ careAct('hug', UI.bHug, '💗'); });
  bind('vactDress', function(){
    care.acc[care.pet] = (care.acc[care.pet] + 1) % ACCS.length;
    careAct('dress', care.acc[care.pet] ? UI.bDress : UI.bDressOff, '');
  });
  bind('vactSleep', function(){
    if (careUi.asleep) { careUi.asleep = false; careAct('wake', UI.bWake, '☀️', false); }
    else { careUi.asleep = true; careAct('sleep', UI.bSleep, '💤'); }
  });
  bind('vnewDayBtn', function(){
    care.done = []; careUi = {bubble:null, food:false, asleep:false, fx:''};
    saveCare(); render();
  });
  bind('vcaseLabel', function(){ resetCase(); goTo('title'); });
  bind('vrestartBtn', function(){ startCase(caseIdx); });
  render();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
})();
