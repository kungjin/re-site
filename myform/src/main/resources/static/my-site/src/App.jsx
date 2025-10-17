import React, { useEffect, useRef, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login.jsx";


function Home() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const headerRef = useRef(null);

  // 테마 적용
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) themeColor.setAttribute("content", theme === "dark" ? "#0b0c10" : "#ffffff");
  }, [theme]);

  // 헤더 스크롤 축소
  useEffect(() => {
    const onScroll = () => {
      if (!headerRef.current) return;
      if (window.scrollY > 12) headerRef.current.classList.add("scrolled");
      else headerRef.current.classList.remove("scrolled");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 연도
  const year = new Date().getFullYear();

  return (
    <>
      <div className="skip">
        <a href="#main">본문으로 바로가기</a>
      </div>

      {/* Header */}
      <header id="site-header" ref={headerRef}>
        <div className="container nav" role="navigation" aria-label="주요">
           {/* Link로 바꿔야 클라이언트 라우팅 */}
          <Link to="/" className="brand" aria-label="홈으로">
            <span className="brand-badge" aria-hidden="true">Y</span>
            <span>Your Brand</span>
          </Link>

          <nav className="nav-links" aria-label="메인 메뉴">
            <a href="#work">작업</a>
            <a href="#services">서비스</a>
            <a href="#about">소개</a>
            <a href="#contact">문의</a>
            {/* 로그인 페이지로 이동 */}
            <Link to="/login">로그인</Link>
          </nav>

          <div className="nav-cta">
            <button
              id="themeToggle"
              className="btn icon-btn"
              aria-label="테마 전환"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              <span aria-hidden="true">{theme === "dark" ? "🌙" : "🌞"}</span>
            </button>
            <a className="btn" href="#work" aria-label="포트폴리오 보기">포트폴리오</a>
            <a className="btn primary" href="#contact" aria-label="프로젝트 문의하기">프로젝트 문의</a>

            <button
              className="hamburger icon-btn"
              aria-label="모바일 메뉴 열기"
              aria-controls="drawer"
              aria-expanded={drawerOpen}
              onClick={() => setDrawerOpen((v) => !v)}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <aside id="drawer" className={`drawer ${drawerOpen ? "open" : ""}`} aria-label="모바일 메뉴">
        <ul onClick={(e) => {
          if (e.target.tagName === "A") setDrawerOpen(false);
        }}>
          <li><a href="#work">작업</a></li>
          <li><a href="#services">서비스</a></li>
          <li><a href="#about">소개</a></li>
          <li><a href="#contact">문의</a></li>
          <li style={{ padding: "12px 6px" }}>
            <a className="btn primary" href="#contact" style={{ width: "100%", textAlign: "center" }}>
              프로젝트 문의
            </a>
          </li>
        </ul>
      </aside>

      <main id="main">
        {/* Hero */}
        <section className="hero">
          <div className="container hero-grid">
            <div className="hero-left">
              <div className="eyebrow">Design · Character · Web</div>
              <h1>도시에 남기는 흔적, <br />브랜드가 되는 순간.</h1>
              <p className="lead">
                Your Brand는 스트릿 감성과 캐릭터 디자인, 웹 인터랙션을 결합해 사람들이 기억하는 경험을 만듭니다.
              </p>
              <div className="cta-row">
                <a className="btn primary" href="#work">작업 보러가기</a>
                <a className="btn" href="#services">서비스 소개</a>
              </div>
              <div className="hero-card" style={{ marginTop: 16 }}>
                <strong>최근 소식</strong>
                <p className="muted" style={{ margin: ".4em 0 0" }}>
                  새 프로젝트 공개 · 2025-10-17 — 리브랜딩 케이스 스터디 업데이트
                </p>
              </div>
            </div>

            <div className="hero-right">
              <div className="hero-media">16:10 Preview / 커버 이미지</div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="section">
          <div className="container">
            <h2>무엇을 만드나요</h2>
            <p className="muted">브랜드를 움직이게 하는 핵심 결과물에 집중합니다.</p>
            <div className="grid-3" style={{ marginTop: 18 }}>
              <article className="card">
                <div className="kicker">Brand &amp; Identity</div>
                <h3 style={{ margin: ".3em 0" }}>브랜딩 &amp; 시스템</h3>
                <p className="muted">로고/타이포, 색·컴포넌트 가이드, 사용 규칙까지 확장 가능한 아이덴티티.</p>
              </article>
              <article className="card">
                <div className="kicker">Character</div>
                <h3 style={{ margin: ".3em 0" }}>캐릭터 아트</h3>
                <p className="muted">도시의 언어가 되는 캐릭터. 스케치→콘셉트→어플리케이션까지.</p>
              </article>
              <article className="card">
                <div className="kicker">Web</div>
                <h3 style={{ margin: ".3em 0" }}>웹 인터랙션</h3>
                <p className="muted">가벼운 퍼포먼스와 선명한 UI. 반응형·접근성 기본.</p>
              </article>
            </div>
          </div>
        </section>

        {/* Work */}
        <section id="work" className="section">
          <div className="container">
            <h2>대표 작업</h2>
            <p className="muted">썸네일만 바꿔도 바로 포트폴리오로.</p>
            <div className="grid-4" style={{ marginTop: 14 }}>
              {["11", "12", "13", "14"].map((id) => (
                <a className="thumb" href="#" key={id} aria-label={`프로젝트 ${id} 썸네일`}>
                  <img alt={`프로젝트 ${id}`} src={`https://picsum.photos/640/480?random=${id}`} />
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section">
          <div className="container">
            <div className="cta">
              <h2 style={{ margin: ".2em 0 .3em" }}>새 프로젝트를 고민 중인가요?</h2>
              <p className="muted">간단한 설명만 보내주시면 초안 제안을 보내드립니다.</p>
              <div className="cta-row" style={{ justifyContent: "center" }}>
                <a className="btn primary" href="#contact">프로젝트 문의</a>
                <a className="btn" href="mailto:hello@yourbrand.com">hello@yourbrand.com</a>
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="section">
          <div className="container">
            <h2>소개</h2>
            <p className="muted">
              Your Brand는 실험적이되 실용적인 결과물을 지향합니다. 도시에 남는 흔적처럼, 작고 정확한 임팩트를 설계합니다.
            </p>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="section">
          <div className="container">
            <h2>문의</h2>
            <p className="muted">이메일 또는 아래 포맷으로 간단히 보내주세요.</p>
            <div className="card" style={{ marginTop: 12 }}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("문의 예시입니다. 실제 처리 로직을 연결하세요.");
                }}
              >
                <label>이름<br />
                  <input required name="name" placeholder="홍길동" className="input" />
                </label>
                <label>이메일<br />
                  <input required type="email" name="email" placeholder="you@example.com" className="input" />
                </label>
                <label>내용<br />
                  <textarea required name="message" rows="5" placeholder="프로젝트 개요, 일정, 예산 범위 등" className="input"></textarea>
                </label>
                <button className="btn primary" type="submit">보내기</button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer>
        <div className="container foot">
          <small>© <span>{year}</span> Your Brand. All rights reserved.</small>
          <div className="social" aria-label="소셜 링크">
            <a href="#" aria-label="Instagram">Instagram</a>
            <a href="#" aria-label="Behance">Behance</a>
            <a href="#" aria-label="GitHub">GitHub</a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default function App(){
  // 라우팅 스위치
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login/>} />
    </Routes>
  );
}
