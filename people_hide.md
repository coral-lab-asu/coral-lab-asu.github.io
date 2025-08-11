
<!-- ===== Buttons row (IMAGE ONLY) ===== -->
<div class="people-sections">
  <!-- Ph.D. -->
  <div class="section-card" data-target="phd-panel" role="button" tabindex="0">
    <img src="{{ 'images/logo/PhD.jpeg' | relative_url }}" alt="Ph.D." class="button-img-fixed">
    <p class="card-sub">Advancing the frontiers of knowledge, one discovery at a time.</p>
  </div>

  <!-- Graduate -->
  <div class="section-card" data-target="grad-panel" role="button" tabindex="0">
    <img src="{{ 'images/logo/Grad_underGrad.jpeg' | relative_url }}" alt="Graduate" class="button-img-fixed">
    <p class="card-sub">Equipped with expertise, poised to shape the foundation for tomorrow’s breakthroughs.</p>
  </div>

  <!-- Alumni -->
  <div class="section-card" data-target="alumni-panel" role="button" tabindex="0">
    <img src="{{ 'images/logo/Alumini.jpeg' | relative_url }}" alt="Alumni" class="button-img-fixed">
    <p class="card-sub">Carrying our legacy into new horizons of impact.</p>
  </div>
</div>

<style>
/* tighter tiles so all three fit above the fold */
.button-img-fixed {
  width: 100%;
  height: 150px;        /* was 200px */
  object-fit: contain;
  background-color: #ffc627;
  padding: 10px;
  border-radius: 12px 12px 0 0;
}
.card-sub {
  font-style: italic;
  font-size: 0.82rem;   /* was 0.9rem */
  text-align: center;
  margin-top: 0.35rem;  /* was 0.5rem */
  line-height: 1.35;
}
.section-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 0.6rem;   /* was 1rem */
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 6px 16px rgba(0,0,0,.08);
  cursor: pointer;
}

/* extra squeeze on shorter laptop screens */
@media (max-height: 820px) {
  .button-img-fixed { height: 140px; }
}
@media (max-height: 760px) {
  .button-img-fixed { height: 130px; }
  .card-sub { font-size: 0.78rem; }
}
</style>


<!-- ===== Panels under the buttons ===== -->

<!-- Ph.D. -->
<div id="phd-panel" class="people-panel hidden">
  <h2>Ph.D. Students</h2>
  <div class="card-grid">
    <a href="https://abhijit85.github.io/" target="_blank" class="person-link">
      <div class="person-card">
        <img src="{{ 'images/people/abhi_chakraborty.jpeg' | relative_url }}" alt="Abhi Chakraborty">
        <p>Abhi Chakraborty</p>
      </div>
    </a>

    <a href="https://www.linkedin.com/in/manan-roy-choudhury-2b2093208/" target="_blank" class="person-link">
      <div class="person-card">
        <img src="{{ 'images/people/manan_choudhury.jpeg' | relative_url }}" alt="Manan Roy Choudhury">
        <p>Manan Roy Choudhury</p>
      </div>
    </a>

    <a href="https://tejasanvekar.github.io/" target="_blank" class="person-link">
      <div class="person-card">
        <img src="{{ 'images/people/tejas_anvekar.jpeg' | relative_url }}" alt="Tejas Anvekar">
        <p>Tejas Anvekar</p>
      </div>
    </a>
        <a href="http://eunwooim.github.io" target="_blank" class="person-link">
      <div class="person-card">
        <img src="{{ 'images/people/Eun Woo Im.jpeg' | relative_url }}" alt="Eun Woo Im">
        <p>Eun Woo Im</p>
      </div>
   
    </a>
        <a href="https://www.linkedin.com/in/sandipande-301/" target="_blank" class="person-link">
      <div class="person-card">
        <img src="{{ 'images/people/Sandipan.jpg' | relative_url }}" alt="Sandipan De">
        <p>Sandipan De</p>
      </div>
    </a>
  </div>
</div>

<!-- Undergrad/Graduate -->
<!-- Graduate -->
<div id="grad-panel" class="people-panel hidden">
  <h2>Graduate Students</h2>
  <div class="card-grid">
    <a href="https://www.linkedin.com/in/adarshsingh7647" target="_blank" class="person-link">
      <div class="person-card">
        <img src="{{ 'images/people/adarsh_singh.jpeg' | relative_url }}" alt="Adarsh Singh">
        <p>Adarsh Singh</p>
      </div>
    </a>

    <a href="https://personalportfolio-git-main-namans-projects-599c78da.vercel.app/" target="_blank" class="person-link">
      <div class="person-card">
        <img src="{{ 'images/people/naman.jpg' | relative_url }}" alt="Naman Ahuja">
        <p>Naman Ahuja</p>
      </div>
    </a>

    <a href="https://www.linkedin.com/in/rohit-khoja344/" target="_blank" class="person-link">
      <div class="person-card">
        <img src="{{ 'images/people/rohit.jpg' | relative_url }}" alt="Rohit Khoja">
        <p>Rohit Khoja</p>
      </div>
    </a>
    <a href="http://linkedin.com/in/ashish-raj-shekhar-877ba9218" target="_blank" class="person-link">
      <div class="person-card">
        <img src="{{ 'images/people/A R Shekhar.JPG' | relative_url }}" alt="A R Shekhar">
        <p>A R Shekhar</p>
      </div>
    </a>
        <a href="https://www.linkedin.com/in/gauravnajpande/" target="_blank" class="person-link">
      <div class="person-card">
        <img src="{{ 'images/people/gaurav.JPG' | relative_url }}" alt="Gaurav Najpande">
        <p>Gaurav Najpande</p>
      </div>
    </a>
        <a href="https://mayankvyas-git-main-mayank-glitch-cpus-projects.vercel.app/" target="_blank" class="person-link">
      <div class="person-card">
        <img src="{{ 'images/people/Mayank Vyas.jpeg' | relative_url }}" alt="Mayank Vyas">
        <p>Mayank Vyas</p>
      </div>
    </a>
        <a href="http://dhruvmadhwal.github.io" target="_blank" class="person-link">
      <div class="person-card">
        <img src="{{ 'images/people/Dhruv.jpeg' | relative_url }}" alt="Dhruv Madhwal">
        <p>Dhruv Madhwal</p>
      </div>
        </a>
        <a href="https://anirudh6415.github.io/" target="_blank" class="person-link">
      <div class="person-card">
        <img src="{{ 'images/people/Anirudh.png' | relative_url }}" alt="Anirudh Iyengar Kaniyar Narayana Iyengar">
        <p>Anirudh Iyengar Kaniyar Narayana Iyengar</p>
      </div>
    </a>
        <a href="https://vibhu-dixit.github.io/website/" target="_blank" class="person-link">
      <div class="person-card">
        <img src="{{ 'images/people/Vibhu Dixit.jpg' | relative_url }}" alt="Vibhu Dixit">
        <p>Vibhu Dixit</p>
      </div>
    </a>
        <a href="https://www.linkedin.com/in/nehavaleti" target="_blank" class="person-link">
      <div class="person-card">
        <img src="{{ 'images/people/Neha Photo.jpg' | relative_url }}" alt="Neha Valeti">
        <p>Neha Valeti</p>
      </div>
    </a>
        <a href="https://www.linkedin.com/in/suparno-roy-chowdhury" target="_blank" class="person-link">
      <div class="person-card">
        <img src="{{ 'images/people/Suparno.jpg' | relative_url }}" alt="Suparno Roy Chowdhury">
        <p>Suparno Roy Chowdhury</p>
      </div>
    </a>
        <a href="https://sanikac10.github.io/my-portfolio/" target="_blank" class="person-link">
      <div class="person-card">
        <img src="{{ 'images/people/Sanika.JPG' | relative_url }}" alt="Sanika Chavan">
        <p>Sanika Chavan</p>
      </div>
    </a>
        <a href="https://www.linkedin.com/in/tampuravi/" target="_blank" class="person-link">
      <div class="person-card">
        <img src="{{ 'images/people/Tampu.jpeg' | relative_url }}" alt="Tampu Ravi Kumar">
        <p>Tampu Ravi Kumar</p>
      </div>
    </a>
 <a href="https://www.linkedin.com/in/rishabh-baral-5b9247141" target="_blank" class="person-link">
      <div class="person-card">
        <img src="{{ 'images/people/Rishabh.jpeg' | relative_url }}" alt="Rishabh Baral">
        <p>Rishabh Baral</p>
      </div>
    </a>
        <a href="https://www.linkedin.com/in/ritam-upadhyay-51ba81192/" target="_blank" class="person-link">
      <div class="person-card">
        <img src="{{ 'images/people/ritam_upadhyay.jpg' | relative_url }}" alt="Ritam Upadhyay">
        <p>Ritam Upadhyay</p>
      </div>
    </a>
  </div>

  <h2>Undergraduate Students</h2>
  <div class="card-grid single-center">
    <a href="https://www.linkedin.com/in/junha-park-ab2b4b181/" target="_blank" class="person-link">
      <div class="person-card">
        <img src="{{ 'images/people/Junha park.jpeg' | relative_url }}" alt="Junha Park">
        <p>Junha Park</p>
      </div>
    </a>
  </div>
</div>


<!-- ===================== Alumni Panel (wraps Alumni Section) ===================== -->
<div id="alumni-panel" class="people-panel hidden">
  <!-- ===================== Alumni Section (ASU colors, compact heights) ===================== -->
  <section id="alumni" class="alumni-section">
    <style>
      /* ---- Scoped base ---- */
      section#alumni.alumni-section { padding: 2rem 0; }
      section#alumni .alumni-title { font-size: clamp(1.5rem, 2vw, 2rem); font-weight: 700; margin: 0 0 1rem; }
      section#alumni .alumni-subtitle { margin: 0 0 1.5rem; color: #555; font-size: 0.95rem; }
      section#alumni .alumni-container { max-width: 1100px; margin: 0 auto; padding: 0 1rem; }

      /* 3 per row desktop, 2 tablet, 1 mobile; allow cards to keep natural height */
      section#alumni .alumni-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1rem;
        align-items: start;              /* prevents tall cards from stretching shorter ones */
      }
      @media (max-width: 900px) {
        section#alumni .alumni-grid { grid-template-columns: repeat(2, 1fr); }
      }
      @media (max-width: 600px) {
        section#alumni .alumni-grid { grid-template-columns: 1fr; }
      }

      section#alumni .alumni-card {
        display: flex; flex-direction: column;
        border: 1px solid #e6e6e6; border-radius: 14px; background: #fff; overflow: hidden;
        box-shadow: 0 2px 10px rgba(0,0,0,0.04);
        transition: transform .15s ease, box-shadow .15s ease;
      }
      section#alumni .alumni-card:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,0,0,0.08); }

      /* ---- Photo: forced 1:1 square ---- */
      section#alumni .alumni-photo-link { display:block; }
      section#alumni .alumni-photo-wrap {
        position: relative; width: 100%;
        padding-top: 100%;
        background: #f6f6f6; overflow: hidden;
      }
      section#alumni .alumni-photo {
        position: absolute; inset: 0;
        width: 100%; height: 100% !important;
        object-fit: cover; display: block;
      }

      /* ---- Content ---- */
      section#alumni .alumni-content {
        padding: 0.9rem 1rem 1rem;
        display: flex; flex-direction: column;
        gap: 0.35rem;
      }
      section#alumni .alumni-name {
        font-weight: 600;
        text-decoration: none;
        color: #ffc627;                  /* ASU Gold */
        font-size: 0.92rem;
        line-height: 1.2;
      }
      section#alumni .alumni-name:hover { text-decoration: underline; }
      section#alumni .alumni-role {
        font-size: 0.78rem;              /* smaller than name */
        color: #8c1d40;                  /* ASU Maroon */
      }

      /* ---- Company row (no forced push to bottom) ---- */
      section#alumni .alumni-company {
        display: flex; align-items: center; gap: 0.5rem;
        padding-top: 0.5rem; border-top: 1px solid #f0f0f0;
      }
      section#alumni .company-logo {
        max-height: 22px; width: auto; object-fit: contain; display: block;
        filter: saturate(0.9) contrast(1.05);
      }
      section#alumni .company-name {
        font-size: 0.9rem; color: #333; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
      }
    </style>

    <div class="alumni-container">
      <h2 class="alumni-title">Alumni</h2>
      <p class="alumni-subtitle">Former members and their current affiliations.</p>

      <div class="alumni-grid">
        <!-- With company -->
        <article class="alumni-card">
          <a href="https://www.linkedin.com/in/devanshu0gupta/" target="_blank" class="alumni-photo-link" rel="noopener">
            <div class="alumni-photo-wrap">
              <img src="{{ 'images/people/devanshu_gupta.jpeg' | relative_url | uri_escape }}" alt="Portrait of Devanshu Gupta" class="alumni-photo" loading="lazy">
            </div>
          </a>
          <div class="alumni-content">
            <a href="https://www.linkedin.com/in/devanshu0gupta/" target="_blank" class="alumni-name" rel="noopener">Devanshu Gupta</a>
            <div class="alumni-role">MS in Computer Science</div>
            <div class="alumni-company">
              <img src="{{ 'images/logo/Amazon logo.jpeg' | relative_url | uri_escape }}" alt="Amazon logo" class="company-logo" loading="lazy">
              <div class="company-name">Amazon</div>
            </div>
          </div>
        </article>

        <!-- With company -->
        <article class="alumni-card">
          <a href="https://www.linkedin.com/in/kannak-sharma/">
            <div class="alumni-photo-wrap">
              <img src="{{ 'images/people/kannak_sharma.jpeg' | relative_url | uri_escape }}" alt="Portrait of Kanak Sharma" class="alumni-photo" loading="lazy">
            </div>
          </a>
          <div class="alumni-content">
            <a href="#" class="alumni-name">Kanak Sharma</a>
            <div class="alumni-role">MS in Robotics and Autonomous Systems</div>
            <div class="alumni-company">
              <img src="{{ 'images/logo/Amazon logo.jpeg' | relative_url | uri_escape }}" alt="Amazon logo" class="company-logo" loading="lazy">
              <div class="company-name">Amazon</div>
            </div>
          </div>
        </article>

        <!-- With company -->
        <article class="alumni-card">
          <a href="https://www.linkedin.com/in/poojah-ganesan-8571251a1">
            <div class="alumni-photo-wrap">
              <img src="{{ 'images/people/poojah_ganesan.jpeg' | relative_url | uri_escape }}" alt="Portrait of Poojah Ganesan" class="alumni-photo" loading="lazy">
            </div>
          </a>
          <div class="alumni-content">
            <a href="#" class="alumni-name">Poojah Ganesan</a>
            <div class="alumni-role">MS in Computer Science</div>
            <div class="alumni-company">
              <img src="{{ 'images/logo/Amazon logo.jpeg' | relative_url | uri_escape }}" alt="Amazon logo" class="company-logo" loading="lazy">
              <div class="company-name">Amazon</div>
            </div>
          </div>
        </article>

        <!-- With company -->
        <article class="alumni-card">
          <a href="https://www.linkedin.com/in/rajat-aayush-jha-4596b616b/">
            <div class="alumni-photo-wrap">
              <img src="{{ 'images/people/rajat.jpg' | relative_url | uri_escape }}" alt="Portrait of Rajat Aayush Jha" class="alumni-photo" loading="lazy">
            </div>
          </a>
          <div class="alumni-content">
            <a href="#" class="alumni-name">Rajat Aayush Jha</a>
            <div class="alumni-role">MS in Computer Science</div>
            <div class="alumni-company">
              <img src="{{ 'images/logo/Amazon logo.jpeg' | relative_url | uri_escape }}" alt="Amazon logo" class="company-logo" loading="lazy">
              <div class="company-name">Amazon</div>
            </div>
          </div>
        </article>

        <!-- No company (compact card, no extra bottom space) -->
        <article class="alumni-card">
          <a href="https://fenil-b.github.io/">
            <div class="alumni-photo-wrap">
              <img src="{{ 'images/people/fenil_bardoliya.jpeg' | relative_url | uri_escape }}" alt="Portrait of Fenil Bardoliya" class="alumni-photo" loading="lazy">
            </div>
          </a>
          <div class="alumni-content">
            <a href="#" class="alumni-name">Fenil Bardoliya</a>
            <div class="alumni-role">MS in Computer Science</div>
          </div>
        </article>

        <!-- No company -->
        <article class="alumni-card">
          <a href="https://www.linkedin.com/in/jainiltrivedi04/">
            <div class="alumni-photo-wrap">
              <img src="{{ 'images/people/jainil_trivedi.jpeg' | relative_url | uri_escape }}" alt="Portrait of Jainil Trivedi" class="alumni-photo" loading="lazy">
            </div>
          </a>
          <div class="alumni-content">
            <a href="#" class="alumni-name">Jainil Trivedi</a>
            <div class="alumni-role">MS in Computer Science</div>
          </div>
        </article>

        <!-- No company -->
        <article class="alumni-card">
          <a href="https://krish-oo7.github.io/portfolio.io">
            <div class="alumni-photo-wrap">
              <img src="{{ 'images/people/krishna_rajput.jpeg' | relative_url | uri_escape }}" alt="Portrait of Krishna Singh Rajput" class="alumni-photo" loading="lazy">
            </div>
          </a>
          <div class="alumni-content">
            <a href="#" class="alumni-name">Krishna Singh Rajput</a>
            <div class="alumni-role">MS in Data Science</div>
          </div>
        </article>

        <!-- No company -->
        <article class="alumni-card">
          <a href="https://www.linkedin.com/in/prasham-titiya-99b686205/">
            <div class="alumni-photo-wrap">
              <img src="{{ 'images/people/prasham_titiya.jpeg' | relative_url | uri_escape }}" alt="Portrait of Prasham Titiya" class="alumni-photo" loading="lazy">
            </div>
          </a>
          <div class="alumni-content">
            <a href="#" class="alumni-name">Prasham Titiya</a>
            <div class="alumni-role">MS in Computer Science</div>
          </div>
        </article>
      </div>
    </div>
  </section>
  <!-- =================== /Alumni Section =================== -->
</div>
<!-- =================== /Alumni Panel =================== -->

<script>
document.addEventListener('DOMContentLoaded', function() {
  const cards = document.querySelectorAll('.section-card');
  const panels = document.querySelectorAll('.people-panel');

  function togglePanel(el) {
    const target = document.getElementById(el.dataset.target);
    panels.forEach(p => { if (p !== target) p.classList.add('hidden'); });
    target.classList.toggle('hidden');
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  cards.forEach(card => {
    card.addEventListener('click', () => togglePanel(card));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); togglePanel(card); }
    });
  });
});
</script>

<style>
/* ===== PI hover ===== */
.pi-card { display:inline-block; border-radius:14px; padding:8px; transition:all .25s ease; }
.pi-inner { display:flex; flex-direction:column; align-items:center; text-align:center; }
.pi-photo { width:260px; height:260px; object-fit:cover; border-radius:14px; transition:transform .25s ease, box-shadow .25s ease; }
.pi-name { margin-top:1rem; font-size:1.35rem; color:#222; font-weight:600; transition:color .25s ease; }
.pi-card:hover .pi-photo { transform:scale(1.05); box-shadow:0 10px 22px rgba(0,0,0,.18); }
.pi-card:hover .pi-name { color:#8c1d40; }

/* ===== Buttons row: image-only, responsive grid ===== */
.people-sections {
  display: grid;
  grid-template-columns: repeat(3, 1fr);   /* 3 across desktop */
  gap: 1rem;                               /* was 1.25rem */
  margin: 0 auto 0.8rem;                   /* was 1.5rem */
  max-width: 1100px;
}
@media (max-width: 900px) { .people-sections { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 580px) { .people-sections { grid-template-columns: 1fr; } }

/* Image fills the whole card */
.section-card {
  background: transparent;
  border: none;
  border-radius: 12px;
  padding: 0;
  cursor: pointer;
  overflow: hidden;
  box-shadow: 0 6px 16px rgba(0,0,0,.08);
  transition: transform .12s ease, box-shadow .12s ease;
}
.section-card:hover { transform: translateY(-3px); box-shadow: 0 10px 22px rgba(0,0,0,.12); }

.button-img-full {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;      /* switch to 'contain' if you prefer no cropping */
  border-radius: 12px;
}

/* ===== Panels under buttons ===== */
.people-panel { background:#fff; border:1px solid rgba(0,0,0,.06); border-radius:12px; padding:1rem 1.25rem; box-shadow:0 6px 16px rgba(0,0,0,.06); margin-bottom:1rem; }
.people-panel.hidden { display:none; }
.placeholder { color:#666; margin:.5rem 0 0; }

/* ===== Person cards in panels ===== */
.card-grid { display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:1.25rem; }
.person-link { text-decoration:none; color:inherit; }
.person-card { display:flex; flex-direction:column; align-items:center; border-radius:12px; padding:.5rem; transition:transform .2s ease, box-shadow .2s ease, background-color .2s ease; }
.person-card img { width:180px; height:180px; object-fit:cover; border-radius:14px; transition:transform .2s ease, box-shadow .2s ease; }
.person-card p { margin-top:.6rem; font-weight:600; color:#222; text-align:center; transition:color .2s ease; }
.person-card:hover { transform:translateY(-4px); box-shadow:0 8px 18px rgba(0,0,0,.12); background-color:rgba(255,198,39,0.12); }
.person-card:hover img { transform:scale(1.04); box-shadow:0 6px 14px rgba(0,0,0,.15); }
.person-card:hover p { color:#8c1d40; }
</style>

<!-- ===== Fit-to-page & nicer focus (optional overrides) ===== -->
<style>
  .button-img-fixed{
    height: clamp(220px, 28vh, 300px) !important; /* try 220–300px range */
  }
  .section-card{
    padding-bottom: 1rem !important;
  }
</style>

<!-- ===== ASU color override for names (Ph.D., Graduate, Undergraduate) ===== -->
<style>
  #phd-panel .person-card p,
  #grad-panel .person-card p {
    color: #ffc627 !important;
    font-weight: 700 !important;         /* ASU Gold */
  }
  #phd-panel .person-card:hover p,
  #grad-panel .person-card:hover p {
    color: #8c1d40 !important;
    font-weight: 700 !important;         /* ASU Maroon on hover */
  }
</style>
