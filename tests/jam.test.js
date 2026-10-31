const test=require("node:test"),assert=require("node:assert/strict"),J=require("../parking-jam-core.js");
test("levels 1-60 generate with enough vehicles and balanced passengers",()=>{
  for(let L=1;L<=60;L++){const g=J.newGame(L);assert.ok(g.vehicles.length>=4,`level ${L} too few vehicles`);
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
