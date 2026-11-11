/* Google Analytics 4, loaded only after the visitor accepts (LGPD): nothing is sent before a "yes".
   The choice is kept in localStorage; "Cookies" in the footer reopens the banner. */
(function () {
  var ID = "";   /* GA4 measurement ID (G-XXXXXXX) */
  if (!ID || !/(^|\.)lauramagrin\.github\.io$/.test(location.hostname) && !window.GA_TEST) return;
  var KEY = "ga-consent", pt = /^\/pt(\/|$)/.test(location.pathname) || document.documentElement.lang === "pt";
  var get = function () { try { return localStorage.getItem(KEY); } catch (e) { return null; } };
  var set = function (v) { try { localStorage.setItem(KEY, v); } catch (e) {} };
  var loaded = false;
  function load() {
    if (loaded) return; loaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", ID, { anonymize_ip: true });
    var s = document.createElement("script"); s.async = true; s.src = "https://www.googletagmanager.com/gtag/js?id=" + ID; document.head.appendChild(s);
  }
  function banner() {
    if (document.getElementById("consent")) return;
    var b = document.createElement("div"); b.id = "consent"; b.className = "consent"; b.setAttribute("role", "region"); b.setAttribute("aria-label", pt ? "Cookies" : "Cookies");
    b.innerHTML = "<p>" + (pt
      ? "Uso cookies de análise (Google Analytics) só para saber quais projetos e artigos são mais vistos. Nada de anúncios."
      : "I use analytics cookies (Google Analytics) only to see which projects and articles get read. No ads.") +
      "</p><div><button type=\"button\" class=\"btn solid\" data-c=\"yes\">" + (pt ? "Aceitar" : "Accept") +
      "</button><button type=\"button\" class=\"btn\" data-c=\"no\">" + (pt ? "Recusar" : "Decline") + "</button></div>";
    b.addEventListener("click", function (e) {
      var c = e.target.closest && e.target.closest("[data-c]"); if (!c) return;
      set(c.dataset.c); b.remove(); if (c.dataset.c === "yes") load();
    });
    document.body.appendChild(b);
  }
  window.LMConsent = banner;
  var v = get();
  if (v === "yes") load();
  else if (!v) { if (document.body) banner(); else document.addEventListener("DOMContentLoaded", banner); }
})();
