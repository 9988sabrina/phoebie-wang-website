const test=require("node:test"),assert=require("node:assert/strict"),J=require("../parking-jam-core.js");
test("levels 1-60 generate with enough vehicles and balanced passengers",()=>{
  for(let L=1;L<=60;L++){const g=J.newGame(L);assert.ok(g.vehicles.length>=(g.fixed?2:4),`level ${L} too few vehicles`);
    assert.equal(g.queue.length,g.vehicles.reduce((n,v)=>n+v.cap,0),`level ${L} passenger count`);
    for(const c of J.COLORS){const need=g.vehicles.filter(v=>v.color===c).reduce((n,v)=>n+v.cap,0);assert.equal(g.queue.filter(x=>x===c).length,need,`level ${L} colour ${c}`)}
    const seen=new Set();for(const v of g.vehicles)for(const [x,y] of J.cellsOf(v)){assert.ok(x>=0&&y>=0&&x<g.w&&y<g.h,`level ${L} off board`);assert.ok(!seen.has(x+","+y),`level ${L} overlap`);seen.add(x+","+y)}}
});
test("every level is winnable by following the removal order (5 bays are enough)",()=>{
  for(let L=1;L<=60;L++){const g=J.newGame(L);for(const id of g.order){const r=J.tap(g,id);assert.equal(r.type,"moved",`level ${L} vehicle ${id} ${r.type}`);assert.notEqual(g.status,"lost",`level ${L} jammed`)}
    assert.equal(g.status,"won",`level ${L} not won`);assert.equal(g.queue.length,0)}
});
test("the hint always points at a vehicle that can drive out, and following hints from the start wins",()=>{
  for(let L=1;L<=20;L++){const g=J.newGame(L);let n=0;while(g.status==="play"&&n++<200){const h=J.hint(g);assert.ok(h>=0,`level ${L} no hint`);assert.ok(J.isFree(g,h));assert.equal(J.tap(g,h).type,"moved")}assert.equal(g.status,"won",`level ${L}`)}
});
test("a blocked vehicle does not move and names its blocker",()=>{
  let found=false;for(let L=1;L<=10&&!found;L++){const g=J.newGame(L);const b=g.vehicles.find(v=>!J.isFree(g,v.id));if(!b)continue;const before=g.alive.length;const r=J.tap(g,b.id);assert.equal(r.type,"blocked");assert.ok(g.alive.includes(r.blocker));assert.equal(g.alive.length,before);assert.equal(g.moves,0);found=true}
  assert.ok(found)
});
test("generation is deterministic",()=>{assert.deepEqual(J.generate(7),J.generate(7))});
test("jam is detected when all bays hold vehicles nobody can board",()=>{
  const g=J.newGame(4);g.queue=["none"];g.status="play";for(const id of g.alive.slice()){if(g.status!=="play")break;if(J.isFree(g,id))J.tap(g,id)}
  if(g.slots.every(x=>x))assert.equal(g.status,"lost")
});
test("tutorial levels 1 and 2 are hand-made and winnable; undo restores the exact state",()=>{
  for(const L of [1,2]){const g=J.newGame(L);assert.ok(g.fixed);for(const id of g.order)assert.equal(J.tap(g,id).type,"moved");assert.equal(g.status,"won")}
  const g=J.newGame(5);const before=JSON.stringify(J.save(g));const snap=J.save(g);J.tap(g,J.hint(g));assert.notEqual(JSON.stringify(J.save(g)),before);J.restore(g,snap);assert.equal(JSON.stringify(J.save(g)),before)
});
test("difficulty follows the ease bands: gentle early, a real puzzle late",()=>{
  for(const L of [3,6,10,14,20,30,40,50,60]){const g=J.newGame(L);const [lo,hi]=J.easeBand(L);assert.ok(g.ease>=lo-0.15&&g.ease<=hi+0.05,`level ${L} ease ${g.ease} outside [${lo},${hi}]`)}
  const early=J.newGame(5).ease,late=J.newGame(55).ease;assert.ok(early>late,"level 55 should be harder than level 5")
});
test("the daily puzzle is the same for the same date and winnable",()=>{
  const d=new Date(2026,9,31);const a=J.newDaily(d),b=J.newDaily(d);assert.deepEqual(a.vehicles,b.vehicles);assert.deepEqual(a.queue,b.queue);
  for(const id of a.order)assert.equal(J.tap(a,id).type,"moved");assert.equal(a.status,"won")
});
test("parking-jam page: undo, sound, language and daily controls exist and no third-party code",()=>{
  const fs=require("node:fs"),h=fs.readFileSync(require("node:path").join(__dirname,"..","parking-jam.html"),"utf8");
  for(const id of ["jam-undo","jam-sound","jam-lang","jam-daily","jam-coach","jam-track"])assert.match(h,new RegExp('id="'+id+'"'));
  assert.doesNotMatch(h,/https?:\/\/[^"]*\.(js|css|mp3|wav|ogg)/)
});
