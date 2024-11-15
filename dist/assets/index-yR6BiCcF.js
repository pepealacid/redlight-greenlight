(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))t(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&t(c)}).observe(document,{childList:!0,subtree:!0});function n(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function t(o){if(o.ep)return;o.ep=!0;const s=n(o);fetch(o.href,s)}})();class D{savePlayerName(e){sessionStorage.setItem("currentPlayer",e)}getPlayerName(){return sessionStorage.getItem("currentPlayer")}savePlayerScore(e,n){const t=this.getPlayerData(e),o={username:e,score:n,maxScore:t?Math.max(t.maxScore,n):n};localStorage.setItem(e,JSON.stringify(o))}getPlayerData(e){const n=localStorage.getItem(e);return n?JSON.parse(n):null}getAllPlayerNames(){return Object.keys(localStorage).filter(n=>{const t=localStorage.getItem(n);try{const o=JSON.parse(t);return o&&o.username}catch{return!1}})}initializePlayer(e){if(!this.getPlayerData(e)){const n={username:e,score:0,maxScore:0};localStorage.setItem(e,JSON.stringify(n))}}getRanking(){return this.getAllPlayerNames().map(t=>this.getPlayerData(t)).filter(t=>t&&t.maxScore!==0).sort((t,o)=>o.maxScore-t.maxScore).slice(0,3)}}const u=new D;function P(){const a=document.getElementById("app");a.classList.add("home-view"),a.classList.remove("game-view");const e=u.getAllPlayerNames(),n=u.getRanking();a.innerHTML=`
    <form id="playerForm">
      <input type="text" id="playerName" placeholder="Enter your name" required autocomplete="off"/>
      <select id="existingPlayers">
        <option value="">Select an existing user</option>
        ${c(e)}
      </select>
      <button type="submit">Play</button>
    </form>
    ${f(n)}
  `;const t=document.getElementById("playerForm"),o=document.getElementById("playerName"),s=document.getElementById("existingPlayers");h();function c(r){return r.map(l=>`<option value="${l}">${l}</option>`).join("")}function f(r){return r.length?`
        <section class="ranking">
          <h2>Ranking</h2>
          <div class="podium">
            ${p("second",r[1],2)}
            ${p("first",r[0],1)}
            ${p("third",r[2],3)}
          </div>
        </section>
      `:""}function p(r,l,m){return`
      <div class="podium-box ${r}">
        <div class="podium-info">
          <p class="bold podium-name">${l?l.username:""}</p>
          <p class="podium-score">${l?`${l.maxScore} points`:""}</p>
        </div>
        <span class="position">${m}</span>
      </div>
    `}function y(r){u.savePlayerName(r),u.savePlayerScore(r,0),window.history.pushState({},"","/game"),g()}function h(){s.addEventListener("change",()=>{const r=s.value;o.value=r}),o.addEventListener("input",()=>{s.value&&(s.value="")}),t.addEventListener("submit",r=>{r.preventDefault();const l=o.value;u.getPlayerData(l)?(u.savePlayerName(l),window.history.pushState({},"","/game"),g()):y(l)})}}class G extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get observedAttributes(){return["playername","score"]}connectedCallback(){const e=this.getAttribute("playername")||"Player",n=this.getAttribute("score")||0;this.render(e,n)}attributeChangedCallback(e,n,t){(e==="playername"||e==="score")&&this.render(this.getAttribute("playername"),this.getAttribute("score"))}render(e,n){this.shadowRoot.innerHTML=`
      <style>
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 20px;
          background-color: #333;
          color: #fff;
        }

        .username {
          font-size: 1.2em;
        }

        .buttons-container {
          display: flex;
          gap: 10px;
        }

        .button {
          padding: 8px 16px;
          font-size: 1em;
          background-color: #57ff94;
          color: #333;
          border: none;
          cursor: pointer;
          border-radius: 5px;
          width: 35px;
          height: 35px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .button img {
          width: 12px;
        }

        .save-button:hover {
          background-color: #45d07f;
        }
      </style>

      <div class="navbar">
        <div class="username">👤 ${e}</div>
        <div class="buttons-container">
          <button class="button mute-button" id="muteButton">🔊</button>
          <button class="button save-button">
            <img src="./assets/img/exit.svg" alt="exit button" />
          </button>
        </div>
      </div>
    `,this.shadowRoot.querySelector(".mute-button").addEventListener("click",()=>{this.toggleMute()}),this.shadowRoot.querySelector(".save-button").addEventListener("click",()=>{this.saveScore(e,n),this.exitGame()})}saveScore(e,n){u.savePlayerScore(e,n),window.history.pushState({},"","/home"),g()}toggleMute(){const e=this.shadowRoot.querySelector("#muteButton"),n=e.classList.toggle("muted");e.textContent=n?"🔇":"🔊",this.dispatchEvent(new CustomEvent("toggleMute",{detail:{isMuted:n},bubbles:!0,composed:!0}))}exitGame(){this.dispatchEvent(new CustomEvent("exitGame",{bubbles:!0,composed:!0}))}}customElements.define("nav-bar",G);class T extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get observedAttributes(){return["isgreen"]}connectedCallback(){this.render()}render(){const e=this.getAttribute("isgreen")==="true",n=e?"./assets/img/boy-back.png":"./assets/img/boy-front.png",t=e?"Go!":"Stop!";this.shadowRoot.innerHTML=`
      <style>
        .person {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
        }
        img {
          width: 80px;
          height: auto;
        }
      </style>
      <div class="person">
        <img src="${n}" alt="${t}" />
      </div>
    `}}customElements.define("person-icon",T);function d(){const a=document.getElementById("app");d.isGreen=!1,d.isMuted=!1,a.classList.add("game-view"),a.classList.remove("home-view");const e=u.getPlayerName(),n=u.getPlayerData(e)||{score:0,maxScore:0};let t=Number(n.score),o=null,s;const c=new Audio("../../assets/audio/song.mp3");c.loop=!0,a.innerHTML=`
    <nav-bar playerName="${e}" score="${t}"></nav-bar>
    <div class="max">Max Score: <span id="maxScoreValue">${n.maxScore}</span></div>
    <div id="person-container"></div> 
    <div class="controls">
      <button id="leftButton">Left</button>
      <button id="rightButton">Right</button>
    </div>
    <div class="score-container">Score: <span id="scoreValue">${t}</span></div>
  `;const f=document.getElementById("scoreValue"),p=document.getElementById("maxScoreValue"),y=document.getElementById("person-container"),h=document.querySelector(".score-container"),r=document.querySelector("nav-bar");l();function l(){x(t),L(n.maxScore),b(),I()}function m(){u.savePlayerScore(e,t),c.pause(),c.currentTime=0,clearTimeout(s),window.removeEventListener("popstate",m),r.removeEventListener("exitGame",m)}function b(){clearTimeout(s),d.isGreen?E():M()}function E(){c.pause(),d.isGreen=!1,S(!1),s=setTimeout(b,3e3)}function M(){d.isMuted||c.play(),d.isGreen=!0,S(!0);const i=B(t);s=setTimeout(b,i)}function B(i){const v=Math.max(1e4-i*100,2e3),$=Math.floor(Math.random()*3e3)-1500;return v+$}function S(i){y.innerHTML="";const v=document.createElement("person-icon");v.setAttribute("isgreen",i.toString()),y.appendChild(v)}function x(i){r.setAttribute("score",i),f.textContent=i}function L(i){p.textContent=i}function N(){t=0,f.textContent=t,h.classList.add("red-background","counter-animate"),o=null,u.savePlayerScore(e,t),setTimeout(()=>{h.classList.remove("red-background","counter-animate")},4e3)}function k(){t>n.maxScore&&(n.maxScore=t,L(t),u.savePlayerScore(e,t))}function w(i){d.isGreen?(o!==i?(t++,o=i):t>0&&t--,x(t),k()):N()}function I(){document.getElementById("leftButton").addEventListener("click",()=>w("left")),document.getElementById("rightButton").addEventListener("click",()=>w("right")),r.addEventListener("toggleMute",i=>{d.isMuted=i.detail.isMuted,d.isMuted?c.pause():d.isGreen&&c.play()}),window.addEventListener("popstate",m),r.addEventListener("exitGame",m)}}function g(){console.log("Router executed");const a=window.location.pathname;a==="/"||a==="/home"?(history.pushState(null,"","/home"),P()):a==="/game"?d():(history.pushState(null,"","/home"),P())}window.addEventListener("popstate",g);document.addEventListener("DOMContentLoaded",()=>{g(),"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("./service-worker.js").then(a=>{console.log("Service Worker registered successfully:",a)}).catch(a=>{console.log("Service Worker registration failed:",a)})})});
