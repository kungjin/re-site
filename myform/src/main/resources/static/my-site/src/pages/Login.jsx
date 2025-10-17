import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function onSubmit(e){
    e.preventDefault();
    setErr(""); setLoading(true);
    try{
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({ email, password: pw }),
      });
      if(res.ok){ navigate("/"); }
      else setErr(await res.text() || "로그인 실패");
    }catch{ setErr("네트워크 오류"); }
    finally{ setLoading(false); }
  }

  return (
    <div style={{minHeight:"100dvh", display:"grid", placeItems:"center", background:"#f7f8fb"}}>
      <form onSubmit={onSubmit} style={{width:"100%",maxWidth:360,padding:24,borderRadius:16,background:"#fff",boxShadow:"0 10px 30px rgba(0,0,0,.08)",border:"1px solid rgba(2,6,23,.08)"}}>
        <h2 style={{marginTop:0}}>로그인</h2>
        <label>이메일</label>
        <input type="email" required value={email} onChange={e=>setEmail(e.target.value)} style={input}/>
        <label>비밀번호</label>
        <input type="password" required value={pw} onChange={e=>setPw(e.target.value)} style={input}/>
        {err && <p style={{color:"#dc2626"}}>{err}</p>}
        <button disabled={loading} type="submit" style={btn}>{loading?"로그인 중...":"로그인"}</button>
      </form>
    </div>
  );
}
const input = {width:"100%",padding:"12px 14px",borderRadius:12,border:"1px solid rgba(2,6,23,.12)",margin:"6px 0 14px"};
const btn = {width:"100%",padding:"12px 14px",borderRadius:12,border:"none",background:"linear-gradient(135deg,#0ea5e9,#22d3ee)",color:"#02131a",fontWeight:700,cursor:"pointer"};
