/* ── BLOG & FAQ MODULE ──────────────────────────────────────── */

const POSTS = [
  { id:1, cat:'Tech', title:'Understanding Data Dictionaries in DBMS', excerpt:'A deep-dive into structured requirements and schema controls.', date:'Jun 12 2026', tags:['DBMS','Backend'] },
  { id:2, cat:'Career', title:'How to Crack Your First Tech Interview', excerpt:'Practical tips on DSA prep, mock rounds, and confidence building.', date:'Jun 18 2026', tags:['Career','Interview'] },
  { id:3, cat:'Mentorship', title:'What Good Mentorship Really Looks Like', excerpt:'Insights from mentors who shaped 100+ engineering careers.', date:'Jun 22 2026', tags:['Mentorship'] },
  { id:4, cat:'Tech', title:'Git Workflows for Team Projects', excerpt:'Branch strategies, PR reviews, and CI/CD integration simplified.', date:'Jun 25 2026', tags:['Git','DevOps'] },
  { id:5, cat:'Enrollment', title:'How to Choose the Right Program', excerpt:'Breaking down our tracks to help you pick the perfect fit.', date:'Jun 27 2026', tags:['Programs','Enrollment'] },
  { id:6, cat:'Career', title:'Building a Portfolio That Gets Noticed', excerpt:'Projects, storytelling, and the art of presenting your work.', date:'Jun 28 2026', tags:['Portfolio','Career'] },
];

const FULL_ARTICLES = {
  1:`<p>A <strong>data dictionary</strong> is a centralized repository of information about data — its meaning, relationships, origin, usage, and format. In DBMS, it acts as the system's metadata store, enabling consistent schema management across teams.</p><p>At Techbrill, trainees learn to build and maintain data dictionaries as part of real sprint deliverables — not just theory.</p><h4>Key Components</h4><ul><li>Table & column definitions</li><li>Data types and constraints</li><li>Relationship maps (ERDs)</li><li>Ownership and access rules</li></ul><p>Mastering this early separates junior developers from engineers who think in systems.</p>`,
  2:`<p>The technical interview landscape has evolved. Companies now test problem-solving <em>approach</em> over rote memorization. Here's how to prepare strategically.</p><h4>The 3-Phase Approach</h4><ul><li><strong>Phase 1:</strong> DSA foundations — arrays, trees, graphs, dynamic programming</li><li><strong>Phase 2:</strong> Mock interviews with peers and mentors</li><li><strong>Phase 3:</strong> Behavioral storytelling using the STAR method</li></ul><p>At Techbrill, mock interview cycles are baked into every program week from Week 8 onward.</p>`,
};

const COMMENTS = {
  1:[{author:'Riya S.', date:'Jun 14', text:'This article helped me understand schema design so much better!'}],
  2:[{author:'Dev K.', date:'Jun 20', text:'The 3-phase approach is exactly what I needed. Thanks!'},{author:'Anjali M.', date:'Jun 21', text:'Phase 2 is underrated — mock rounds changed everything for me.'}],
};

const FAQS = [
  { q:'What programs does Techbrill offer?', a:'We offer Full-Stack Engineering, Data Science, DevOps, and UI/UX Design tracks — ranging from 12 to 24 weeks.' },
  { q:'How does the mentorship program work?', a:'Each trainee is paired with an industry mentor for weekly 1-on-1 sessions, code reviews, and career guidance throughout the program.' },
  { q:'What is the enrollment process?', a:'Fill out the interest form → attend an orientation call → confirm your slot with a fee payment → get onboarded within 48 hours.' },
  { q:'Are there EMI or scholarship options?', a:'Yes! We offer need-based scholarships and flexible EMI plans (3/6/12 months) for all programs.' },
  { q:'Do I need prior coding experience?', a:'Our beginner tracks require zero prior experience. Advanced tracks recommend 6+ months of coding familiarity.' },
  { q:'What kind of projects will I build?', a:'Production-grade projects: fintech dashboards, e-commerce platforms, ML pipelines, and API microservices — all with real GitHub history.' },
];

/* ── STATE ── */
let activeFilter = 'All', searchQuery = '', activePost = null;

/* ── RENDER BLOG LIST ── */
function renderBlog() {
  const cats = ['All', ...new Set(POSTS.map(p => p.cat))];
  const filtered = POSTS.filter(p =>
    (activeFilter === 'All' || p.cat === activeFilter) &&
    (p.title + p.excerpt).toLowerCase().includes(searchQuery.toLowerCase())
  );

  document.getElementById('blog').innerHTML = `
    <div class="container">
      <div class="section-header">
        <h2>Knowledge Base &amp; Industry Insights</h2>
        <p>Tips, guides and stories from our mentors and alumni.</p>
      </div>
      <div class="blog-controls">
        <input id="blogSearch" class="search-input blog-search" placeholder="Search articles…" value="${searchQuery}" />
        <div class="blog-cats">
          ${cats.map(c=>`<button class="cat-btn${activeFilter===c?' active':''}" data-cat="${c}">${c}</button>`).join('')}
        </div>
      </div>
      <div class="blog__grid">
        ${filtered.length ? filtered.map(postCard).join('') : '<p class="blog-empty">No articles found.</p>'}
      </div>
    </div>`;

  document.getElementById('blogSearch').addEventListener('input', e => { searchQuery = e.target.value; renderBlog(); });
  document.querySelectorAll('.cat-btn').forEach(b => b.addEventListener('click', () => { activeFilter = b.dataset.cat; renderBlog(); }));
  document.querySelectorAll('.blog-read-btn').forEach(b => b.addEventListener('click', () => openPost(+b.dataset.id)));
}

function postCard(p) {
  return `<div class="card blog-card">
    <span class="badge">${p.cat}</span>
    <h3>${p.title}</h3>
    <p>${p.excerpt}</p>
    <div class="blog-meta"><span>${p.date}</span></div>
    <button class="btn btn--primary blog-read-btn" data-id="${p.id}" style="margin-top:.75rem;font-size:.85rem;padding:.5rem 1rem">Read Article →</button>
  </div>`;
}

/* ── BLOG DETAIL ── */
function openPost(id) {
  activePost = POSTS.find(p => p.id === id);
  const body = FULL_ARTICLES[id] || `<p>${activePost.excerpt} (Full article coming soon.)</p>`;
  const related = POSTS.filter(p => p.id !== id && p.cat === activePost.cat).slice(0,2);
  const comments = COMMENTS[id] || [];

  document.getElementById('blog').innerHTML = `
    <div class="container blog-detail">
      <button class="btn btn--secondary back-btn" id="backBtn">← Back to Blog</button>
      <article class="blog-article card">
        <span class="badge">${activePost.cat}</span>
        <h2>${activePost.title}</h2>
        <div class="blog-meta">${activePost.date} · ${activePost.tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div>
        <div class="article-body">${body}</div>
      </article>

      <section class="comments-section">
        <h3>Comments (${comments.length})</h3>
        <div class="comments-list">
          ${comments.map(c=>`<div class="card comment-card"><strong>${c.author}</strong><span class="comment-date">${c.date}</span><p>${c.text}</p></div>`).join('') || '<p class="blog-empty">Be the first to comment!</p>'}
        </div>
        <form class="comment-form card" id="commentForm">
          <input name="name" placeholder="Your name" required class="search-input" style="margin-bottom:.75rem"/>
          <textarea name="msg" placeholder="Write a comment…" required rows="3" style="width:100%;padding:.75rem;border:1px solid var(--clr-border);border-radius:6px;background:var(--clr-bg);color:var(--clr-text-primary);resize:vertical"></textarea>
          <button type="submit" class="btn btn--primary" style="margin-top:.75rem">Post Comment</button>
        </form>
      </section>

      ${related.length ? `<section class="related-posts">
        <h3>Related Posts</h3>
        <div class="blog__grid">${related.map(postCard).join('')}</div>
      </section>` : ''}
    </div>`;

  document.getElementById('backBtn').addEventListener('click', () => { activePost = null; renderBlog(); });
  document.getElementById('commentForm').addEventListener('submit', e => {
    e.preventDefault();
    const fd = new FormData(e.target);
    if (!COMMENTS[id]) COMMENTS[id] = [];
    COMMENTS[id].push({ author: fd.get('name'), date: 'Just now', text: fd.get('msg') });
    openPost(id);
  });
  document.querySelectorAll('.blog-read-btn').forEach(b => b.addEventListener('click', () => openPost(+b.dataset.id)));
}

/* ── FAQ ACCORDION ── */
function renderFAQ() {
  document.getElementById('faq').innerHTML = `
    <div class="container">
      <div class="section-header">
        <h2>Frequently Asked Questions</h2>
        <p>Programs, mentorship, enrollment and more — answered.</p>
      </div>
      <div class="faq__list">
        ${FAQS.map((f,i)=>`
        <div class="faq-item card" id="faq-${i}">
          <button class="faq-q" data-i="${i}">${f.q}<span class="faq-icon">+</span></button>
          <div class="faq-a" id="faq-a-${i}">${f.a}</div>
        </div>`).join('')}
      </div>
    </div>`;

  document.querySelectorAll('.faq-q').forEach(btn => btn.addEventListener('click', () => {
    const i = btn.dataset.i;
    const ans = document.getElementById(`faq-a-${i}`);
    const open = ans.classList.toggle('open');
    btn.querySelector('.faq-icon').textContent = open ? '−' : '+';
  }));
}

/* ── INIT ── */
renderBlog();
renderFAQ();