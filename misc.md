---
layout: page
title: Misc
permalink: /misc
---

<section class="misc-page">
  <div class="misc-wrap">
    <!-- ===== Main: Past collaborators (primary content) ===== -->
    <main class="misc-main">
      <h1 class="misc-title">Past Supporters and Collaborators</h1>

      <div class="misc-card">
        <p class="misc-text">
          Download the PDF
          <a href="https://drive.google.com/file/d/10a1xLuJ5Q6iOPjchg42H5qcY-SPkOPwd/view" target="_blank" rel="noopener">here</a>.
        </p>
      </div>
    </main>

    <!-- ===== Sidebar: Pets (right side, vertical stack) ===== -->
    <aside class="misc-aside">
      <h2 class="aside-title">Our Pets</h2>

      <div class="pets-stack">
        <figure class="pet-card">
          <img src="{{ 'images/people/coco.jpeg' | relative_url }}" alt="Coco the cat">
          <figcaption class="pet-name">Coco</figcaption>
        </figure>

        <figure class="pet-card">
          <img src="{{ 'images/people/zoey.jpeg' | relative_url }}" alt="Zoey the dog">
          <figcaption class="pet-name">Zoey</figcaption>
        </figure>
      </div>
    </aside>
  </div>
</section>

<style>
/* ========== Layout ========== */
.misc-page { max-width: 1100px; margin: 0 auto; padding: 0 1rem; }
.misc-wrap {
  display: grid;
  grid-template-columns: minmax(600px, 1fr) 280px; /* main | sidebar */
  gap: 2rem;
  align-items: start;
}

/* Mobile: stack, pets go below */
@media (max-width: 900px) {
  .misc-wrap { grid-template-columns: 1fr; }
  .misc-aside { order: 2; }
  .misc-main { order: 1; }
}

/* ========== Main content styles ========== */
.misc-title {
  text-align: center;
  font-size: clamp(1.9rem, 3.2vw, 2.6rem);
  font-weight: 800;
  margin: 1.25rem 0 1.25rem;
}

.misc-card {
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 8px 22px rgba(0,0,0,.06);
  padding: 1.25rem 1.25rem;
}

.misc-text {
  font-size: 1.05rem;
  text-align: center;
  margin: 0;
}

/* ========== Sidebar (Pets) ========== */
.aside-title {
  text-align: center;
  font-size: clamp(1.4rem, 2.2vw, 1.75rem);
  font-weight: 700;
  margin: .5rem 0 1rem;
}

.pets-stack {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Reduced image size: a bit larger than thumbnails, vertical stack */
.pet-card {
  margin: 0;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0,0,0,.06);
  overflow: hidden;
  width: 100%;
  max-width: 240px;              /* adjust: 220–260px to taste */
  margin-left: auto;
  margin-right: auto;
}

.pet-card img {
  width: 100%;
  aspect-ratio: 4 / 3;          /* slightly shorter than square */
  object-fit: cover;
  display: block;
}

.pet-name {
  text-align: center;
  font-size: 1.05rem;
  padding: .55rem 0 .75rem;
  font-weight: 600;
}

/* Tidy up spacing on very small screens */
@media (max-width: 480px) {
  .misc-wrap { gap: 1.25rem; }
  .pet-name { font-size: 1rem; }
}
</style>
