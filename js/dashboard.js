/* ── STUDENT DASHBOARD MODULE ──────────────────────────────── */

const STUDENT = {
  name: 'sammi raj',
  program: 'Full-Stack Engineering Track',
  avatar: 'sr',
  week: 14,
  totalWeeks: 24,
};

const ASSIGNMENTS = [
  { title: 'Build a REST API with Node.js', due: 'Jul 2', status: 'pending' },
  { title: 'Code Review: Auth Module PR #12', due: 'Jul 4', status: 'pending' },
  { title: 'PostgreSQL Schema Design Task', due: 'Jun 28', status: 'done' },
  { title: 'Deploy App to AWS EC2', due: 'Jun 25', status: 'done' },
];

const PROGRESS = [
  { label: 'Core Modules', pct: 72 },
  { label: 'Projects Completed', pct: 58 },
  { label: 'Mock Interviews', pct: 40 },
  { label: 'DSA Practice', pct: 65 },
];

const ATTENDANCE = [
  { week: 'Week 12', days: [1,1,1,0,1] },
  { week: 'Week 13', days: [1,1,0,1,1] },
  { week: 'Week 14', days: [1,0,1,1,0] },
];

const CERTS = [
  { title: 'JavaScript Fundamentals', date: 'Mar 2026', earned: true },
  { title: 'React & Component Design', date: 'Apr 2026', earned: true },
  { title: 'Backend APIs & Databases', date: 'May 2026', earned: true },
  { title: 'Full-Stack Deployment', date: 'Upcoming', earned: false },
];

const SUBMISSIONS = [
  { title: 'Sprint 1 – Todo App', score: '92/100', date: 'Apr 10', grade: 'A' },
  { title: 'Sprint 2 – Auth System', score: '87/100', date: 'May 5', grade: 'B+' },
  { title: 'Sprint 3 – Fintech Dashboard', score: '95/100', date: 'Jun 1', grade: 'A+' },
];

/* ── TAB CONFIG ── */
const TABS = ['Assignments','Progress','Attendance','Certificates','Submissions'];
let activeTab = 'Assignments';

/* ── RENDER DASHBOARD ── */
function renderDashboard() {
  const progressPct = Math.round((STUDENT.week / STUDENT.totalWeeks) * 100);

  document.getElementById('dashboard').innerHTML = `
    <div class="container">
      <div class="section-header">
        <h2>Student Dashboard</h2>
        <p>Track your learning journey, tasks, and achievements.</p>
      </div>

      <!-- Profile Strip -->
      <div class="dash-profile card">
        <div class="dash-avatar">${STUDENT.avatar}</div>
        <div class="dash-profile-info">
          <h3>${STUDENT.name}</h3>
          <p>${STUDENT.program}</p>
        </div>
        <div class="dash-journey">
          <span class="dash-week-label">Week ${STUDENT.week} of ${STUDENT.totalWeeks}</span>
          <div class="dash-bar"><div class="dash-bar-fill" style="width:${progressPct}%"></div></div>
          <span class="dash-pct">${progressPct}% Complete</span>
        </div>
      </div>

      <!-- Tabs -->
      <div class="dashboard-tabs dash-tabs" role="tablist">
        ${TABS.map(t => `<button class="tab-btn${activeTab===t?' active':''}" data-tab="${t}">${t}</button>`).join('')}
      </div>

      <!-- Panel -->
      <div class="dash-panel" id="dashPanel">
        ${renderPanel(activeTab)}
      </div>

      <!-- Tech Stack & Placement (always shown below) -->
      <div class="dash-bottom-grid">
        <div class="card">
          <h4>🛠 Tech Stack Focus</h4>
          <div class="tech-pills">
            ${['Python','JavaScript','React','Node.js','PostgreSQL','Docker','Git','AWS'].map(t=>`<span class="tech-pill">${t}</span>`).join('')}
          </div>
        </div>
        <div class="card">
          <h4>🚀 Placement Process</h4>
          <ol class="placement-steps">
            <li>Profile Verification</li>
            <li>Technical Grid Evaluation</li>
            <li>Mock Interview Rounds</li>
            <li>Company System Matching</li>
          </ol>
        </div>
      </div>
    </div>`;

  /* Tab click events */
  document.querySelectorAll('.dash-tabs .tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      activeTab = btn.dataset.tab;
      renderDashboard();
    });
  });
}

/* ── PANEL CONTENT ── */
function renderPanel(tab) {
  if (tab === 'Assignments') {
    return `<div class="dash-list">
      ${ASSIGNMENTS.map(a => `
        <div class="dash-row card">
          <span class="dash-status-dot ${a.status}"></span>
          <div class="dash-row-info">
            <strong>${a.title}</strong>
            <span class="dash-due">Due: ${a.due}</span>
          </div>
          <span class="badge ${a.status==='done'?'badge--green':'badge--yellow'}">${a.status==='done'?'Done':'Pending'}</span>
        </div>`).join('')}
    </div>`;
  }

  if (tab === 'Progress') {
    return `<div class="progress-list">
      ${PROGRESS.map(p => `
        <div class="progress-item">
          <div class="progress-label">
            <span>${p.label}</span><strong>${p.pct}%</strong>
          </div>
          <div class="dash-bar"><div class="dash-bar-fill" style="width:${p.pct}%"></div></div>
        </div>`).join('')}
    </div>`;
  }

  if (tab === 'Attendance') {
    const days = ['M','T','W','T','F'];
    return `<div class="attendance-table">
      <div class="att-header">
        <span class="att-week-label"></span>
        ${days.map(d=>`<span class="att-day">${d}</span>`).join('')}
      </div>
      ${ATTENDANCE.map(w => `
        <div class="att-row">
          <span class="att-week-label">${w.week}</span>
          ${w.days.map(d=>`<span class="att-dot ${d?'present':'absent'}">${d?'✓':'✗'}</span>`).join('')}
        </div>`).join('')}
      <p class="att-summary">Overall Attendance: <strong style="color:var(--clr-accent)">80%</strong></p>
    </div>`;
  }

  if (tab === 'Certificates') {
    return `<div class="certs-grid">
      ${CERTS.map(c => `
        <div class="card cert-card ${c.earned?'':'cert-locked'}">
          <div class="cert-icon">${c.earned?'🏅':'🔒'}</div>
          <h4>${c.title}</h4>
          <p>${c.date}</p>
          ${c.earned?`<button class="btn btn--primary cert-btn">Download</button>`:`<span class="badge">Locked</span>`}
        </div>`).join('')}
    </div>`;
  }

  if (tab === 'Submissions') {
    return `<div class="dash-list">
      ${SUBMISSIONS.map(s => `
        <div class="dash-row card">
          <div class="sub-grade">${s.grade}</div>
          <div class="dash-row-info">
            <strong>${s.title}</strong>
            <span class="dash-due">Submitted: ${s.date}</span>
          </div>
          <span class="badge badge--green">${s.score}</span>
        </div>`).join('')}
    </div>`;
  }
  return '';
}

renderDashboard();