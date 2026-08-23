const A={
 idle:t=>({body:0,head:0,shoulder:0.18,elbow:0.65,hip:-0.05,knee:0.22,frontLeg:0.22+Math.sin(t*5)*.05,backLeg:-.18-Math.sin(t*5)*.05}),
 walk:t=>({body:Math.sin(t*12)*.08,head:0,shoulder:0.7*Math.sin(t*12),elbow:0.5,hip:0.65*Math.sin(t*12),knee:0.65*Math.sin(t*12+Math.PI),frontLeg:0.65*Math.sin(t*12),backLeg:-0.65*Math.sin(t*12)}),
 punch1:p=>({body:-.32*p,head:.12*p,shoulder:-.65+1.75*p,elbow:1.15*(1-p),hip:-.12*p,knee:.1,frontLeg:.08,backLeg:-.15}),
 punch2:p=>({body:-.42*p,head:.15*p,shoulder:-1.05+2.15*p,elbow:1.35*(1-p),hip:-.22*p,knee:.12,frontLeg:.18,backLeg:-.22}),
 kick:p=>({body:-.3*p,head:.1*p,shoulder:.25,elbow:.7,hip:-.4+1.9*p,knee:1.05*(1-p),frontLeg:.1,backLeg:-.32}),
 jump:p=>({body:-.05,head:0,shoulder:.3,elbow:.6,hip:.2,knee:.5,frontLeg:.3,backLeg:-.4}),
 blast:p=>({body:-.15,head:.05,shoulder:-.3+1.2*p,elbow:.6*(1-p),hip:-.1,knee:.2,frontLeg:.05,backLeg:-.1}),
 dash:p=>({body:-.45,head:.18,shoulder:-.4,elbow:.5,hip:-.2,knee:.5,frontLeg:.45,backLeg:-.45}),
 hit:p=>({body:.28*p,head:.22*p,shoulder:.8,elbow:.7,hip:.3,knee:.4,frontLeg:.2,backLeg:-.25}),
 ult:p=>({body:Math.sin(p*Math.PI)*.2,head:0,shoulder:-1.2+2.4*p,elbow:.3,hip:-.5+1*p,knee:.6,frontLeg:.5,backLeg:-.5})
};