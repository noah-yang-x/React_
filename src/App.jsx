import React, { useMemo, useState } from 'react';
import {
  Building2,
  Code2,
  Eye,
  EyeOff,
  Info,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  Star,
  Trees,
  X,
} from 'lucide-react';
import {
  brand,
  caseStudies,
  metrics,
  news,
  services,
  stageGroups,
  stages,
  team,
} from './data.js';

export default function App() {
  const [activeStageId, setActiveStageId] = useState(stages[1].id);
  const [codeMode, setCodeMode] = useState('js');
  const [previewVisible, setPreviewVisible] = useState(true);
  const [previewWidth, setPreviewWidth] = useState(48);
  const [stageMenuOpen, setStageMenuOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState(services[0].id);
  const [expandedCaseId, setExpandedCaseId] = useState(caseStudies[0].id);
  const [favoriteCaseIds, setFavoriteCaseIds] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    interest: services[0].title,
    message: '',
  });
  const [submittedName, setSubmittedName] = useState('');

  const activeStage = stages.find((stage) => stage.id === activeStageId) ?? stages[0];
  const activeService = services.find((service) => service.id === selectedServiceId) ?? services[0];
  const industries = ['All', ...new Set(caseStudies.map((item) => item.industry))];
  const visibleCases = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return caseStudies.filter((item) => {
      const matchesQuery = query
        ? `${item.title} ${item.summary} ${item.industry}`.toLowerCase().includes(query)
        : true;
      const matchesIndustry =
        selectedIndustry === 'All' ? true : item.industry === selectedIndustry;
      return matchesQuery && matchesIndustry;
    });
  }, [searchQuery, selectedIndustry]);

  const layoutStyle = previewVisible
    ? { gridTemplateColumns: `${previewWidth}% minmax(420px, 1fr)` }
    : { gridTemplateColumns: '0 minmax(420px, 1fr)' };

  function chooseStage(stageId) {
    setActiveStageId(stageId);
    setStageMenuOpen(false);
  }

  function toggleFavorite(caseId) {
    setFavoriteCaseIds((current) =>
      current.includes(caseId)
        ? current.filter((id) => id !== caseId)
        : [...current, caseId],
    );
  }

  function updateForm(field, value) {
    setFormData((current) => ({ ...current, [field]: value }));
  }

  function submitContact(event) {
    event.preventDefault();
    setSubmittedName(formData.name || 'there');
  }

  return (
    <div className="learning-app">
      <header className="top-bar">
        <div className="app-title">
          <strong>MordenTown React</strong>
          <span>成品页面 + 代码主线</span>
        </div>

        <div className="top-controls">
          <button type="button" className="icon-button" onClick={() => setPreviewVisible((value) => !value)}>
            {previewVisible ? <EyeOff size={17} /> : <Eye size={17} />}
            {previewVisible ? '隐藏页面' : '显示页面'}
          </button>
          <label className="width-control">
            <span>页面宽度</span>
            <input
              type="range"
              min="30"
              max="65"
              value={previewWidth}
              disabled={!previewVisible}
              onChange={(event) => setPreviewWidth(Number(event.target.value))}
            />
          </label>
          <div className="mode-switch" aria-label="Code mode">
            <button
              type="button"
              className={codeMode === 'js' ? 'selected' : ''}
              onClick={() => setCodeMode('js')}
            >
              JS
            </button>
            <button
              type="button"
              className={codeMode === 'ts' ? 'selected' : ''}
              onClick={() => setCodeMode('ts')}
            >
              TS View
            </button>
          </div>
        </div>
      </header>

      <main className={previewVisible ? 'workbench' : 'workbench preview-collapsed'} style={layoutStyle}>
        <section className="finished-page-pane" aria-label="MordenTown finished website preview">
          <div className="pane-label">
            <Building2 size={16} />
            已开发页面
          </div>
          <ProjectPreview
            activeService={activeService}
            selectedServiceId={selectedServiceId}
            setSelectedServiceId={setSelectedServiceId}
            expandedCaseId={expandedCaseId}
            setExpandedCaseId={setExpandedCaseId}
            favoriteCaseIds={favoriteCaseIds}
            toggleFavorite={toggleFavorite}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedIndustry={selectedIndustry}
            setSelectedIndustry={setSelectedIndustry}
            industries={industries}
            visibleCases={visibleCases}
            formData={formData}
            updateForm={updateForm}
            submitContact={submitContact}
            submittedName={submittedName}
          />
        </section>

        <section className="code-pane" aria-label="React code">
          <CodeWorkspace stage={activeStage} codeMode={codeMode} />
        </section>
      </main>

      <div className="stage-launcher">
        {stageMenuOpen ? (
          <div className="stage-popover">
            <div className="stage-popover-head">
              <strong>开发步骤</strong>
              <button type="button" onClick={() => setStageMenuOpen(false)} aria-label="Close stages">
                <X size={16} />
              </button>
            </div>
            {stageGroups.map((group) => (
              <section key={group.label}>
                <h2>{group.label}</h2>
                {group.ids.map((stageId) => {
                  const stage = stages.find((item) => item.id === stageId);
                  if (!stage) return null;
                  return (
                    <button
                      key={stage.id}
                      type="button"
                      className={stage.id === activeStageId ? 'stage-row active' : 'stage-row'}
                      onClick={() => chooseStage(stage.id)}
                    >
                      <span>{stage.number}</span>
                      <div>
                        <strong>{stage.title}</strong>
                        <small>{stage.feature}</small>
                      </div>
                    </button>
                  );
                })}
              </section>
            ))}
          </div>
        ) : null}
        <button type="button" className="stage-button" onClick={() => setStageMenuOpen((value) => !value)}>
          {stageMenuOpen ? <PanelLeftClose size={18} /> : <PanelLeftOpen size={18} />}
          开发步骤
        </button>
      </div>
    </div>
  );
}

function CodeWorkspace({ stage, codeMode }) {
  const [openNote, setOpenNote] = useState(null);
  const fullCode = codeMode === 'js' ? mordenTownFullJsCode : mordenTownFullTsCode;

  return (
    <article className="code-workspace">
      <div className="code-header">
        <div>
          <span>Stage {stage.number}</span>
          <h1>{stage.title}</h1>
          <p>{stage.task}</p>
        </div>
        <div className="note-actions">
          <button
            type="button"
            className={openNote === 'use' ? 'icon-button active' : 'icon-button'}
            onClick={() => setOpenNote(openNote === 'use' ? null : 'use')}
          >
            <Info size={17} />
            怎么用
          </button>
          <button
            type="button"
            className={openNote === 'why' ? 'icon-button active' : 'icon-button'}
            onClick={() => setOpenNote(openNote === 'why' ? null : 'why')}
          >
            为什么
          </button>
          <button
            type="button"
            className={openNote === 'practice' ? 'icon-button active' : 'icon-button'}
            onClick={() => setOpenNote(openNote === 'practice' ? null : 'practice')}
          >
            练习
          </button>
        </div>
      </div>

      {openNote ? (
        <div className="inline-note">
          {openNote === 'use' ? <p>{stage.correctUse}</p> : null}
          {openNote === 'why' ? <p>{stage.why}</p> : null}
          {openNote === 'practice' ? <p>{stage.exercise}</p> : null}
        </div>
      ) : null}

      <div className="code-meta">
        {stage.concepts.map((concept) => (
          <span key={concept}>{concept}</span>
        ))}
      </div>

      <div className="code-stack">
        <div className="code-card step-code">
          <div>
            <Code2 size={16} />
            {codeMode === 'js' ? '当前步骤代码' : '当前步骤 TS 对照'}
          </div>
          <pre>
            <code>{codeMode === 'js' ? stage.jsCode : stage.tsCode}</code>
          </pre>
        </div>

        <div className="code-card full-code">
          <div>
            <Code2 size={16} />
            {codeMode === 'js' ? 'MordenTown 页面实现代码' : 'MordenTown TypeScript 结构对照'}
          </div>
          <pre>
            <code>{fullCode}</code>
          </pre>
        </div>
      </div>
    </article>
  );
}

const mordenTownFullJsCode = `import { useMemo, useState } from 'react';
import { services, caseStudies, metrics, team, news } from './data.js';

export default function MordenTownPage() {
  const [selectedServiceId, setSelectedServiceId] = useState(services[0].id);
  const [expandedCaseId, setExpandedCaseId] = useState(caseStudies[0].id);
  const [favoriteCaseIds, setFavoriteCaseIds] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    interest: services[0].title,
    message: '',
  });

  const activeService = services.find((service) => service.id === selectedServiceId);
  const industries = ['All', ...new Set(caseStudies.map((item) => item.industry))];

  const visibleCases = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return caseStudies.filter((item) => {
      const text = \`\${item.title} \${item.summary} \${item.industry}\`.toLowerCase();
      const matchesQuery = query ? text.includes(query) : true;
      const matchesIndustry =
        selectedIndustry === 'All' ? true : item.industry === selectedIndustry;

      return matchesQuery && matchesIndustry;
    });
  }, [searchQuery, selectedIndustry]);

  function toggleFavorite(caseId) {
    setFavoriteCaseIds((current) =>
      current.includes(caseId)
        ? current.filter((id) => id !== caseId)
        : [...current, caseId]
    );
  }

  function updateForm(field, value) {
    setFormData((current) => ({ ...current, [field]: value }));
  }

  function submitContact(event) {
    event.preventDefault();
    // Submit formData to API later.
  }

  return (
    <SiteShell>
      <HeroSection />

      <ServicesSection
        services={services}
        activeService={activeService}
        selectedServiceId={selectedServiceId}
        onSelectService={setSelectedServiceId}
      />

      <MetricsSection metrics={metrics} />

      <CaseStudiesSection
        cases={visibleCases}
        industries={industries}
        searchQuery={searchQuery}
        selectedIndustry={selectedIndustry}
        expandedCaseId={expandedCaseId}
        favoriteCaseIds={favoriteCaseIds}
        onSearchChange={setSearchQuery}
        onIndustryChange={setSelectedIndustry}
        onExpandCase={setExpandedCaseId}
        onToggleFavorite={toggleFavorite}
      />

      <TeamSection members={team} />
      <NewsSection items={news} />

      <ContactSection
        formData={formData}
        onFieldChange={updateForm}
        onSubmit={submitContact}
      />
    </SiteShell>
  );
}

function ServicesSection({ services, activeService, selectedServiceId, onSelectService }) {
  return (
    <section id="services">
      <SectionHeading eyebrow="Services" title="Four practical layers" />
      <div className="service-tabs">
        {services.map((service) => (
          <button
            key={service.id}
            className={service.id === selectedServiceId ? 'selected' : ''}
            onClick={() => onSelectService(service.id)}
          >
            {service.title}
          </button>
        ))}
      </div>
      <ServiceCard service={activeService} featured />
      <div className="services-grid">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </section>
  );
}

function CaseStudiesSection({
  cases,
  industries,
  searchQuery,
  selectedIndustry,
  expandedCaseId,
  favoriteCaseIds,
  onSearchChange,
  onIndustryChange,
  onExpandCase,
  onToggleFavorite,
}) {
  return (
    <section id="cases">
      <input value={searchQuery} onChange={(event) => onSearchChange(event.target.value)} />
      {industries.map((industry) => (
        <button key={industry} onClick={() => onIndustryChange(industry)}>
          {industry}
        </button>
      ))}
      {cases.map((caseStudy) => (
        <CaseCard
          key={caseStudy.id}
          caseStudy={caseStudy}
          expanded={expandedCaseId === caseStudy.id}
          favorite={favoriteCaseIds.includes(caseStudy.id)}
          onExpand={() => onExpandCase(caseStudy.id)}
          onFavorite={() => onToggleFavorite(caseStudy.id)}
        />
      ))}
    </section>
  );
}`;

const mordenTownFullTsCode = `type Service = {
  id: string;
  title: string;
  tag: string;
  summary: string;
};

type CaseStudy = {
  id: string;
  title: string;
  industry: 'Community' | 'Building' | 'Data';
  metric: string;
  summary: string;
};

type ContactFormData = {
  name: string;
  email: string;
  company: string;
  interest: string;
  message: string;
};

type ServicesSectionProps = {
  services: Service[];
  activeService: Service;
  selectedServiceId: string;
  onSelectService: (id: string) => void;
};

function ServicesSection({
  services,
  activeService,
  selectedServiceId,
  onSelectService,
}: ServicesSectionProps) {
  return (
    <section id="services">
      {services.map((service) => (
        <button
          key={service.id}
          className={service.id === selectedServiceId ? 'selected' : ''}
          onClick={() => onSelectService(service.id)}
        >
          {service.title}
        </button>
      ))}
      <ServiceCard service={activeService} featured />
    </section>
  );
}

type CaseStudiesSectionProps = {
  cases: CaseStudy[];
  industries: Array<'All' | CaseStudy['industry']>;
  searchQuery: string;
  selectedIndustry: 'All' | CaseStudy['industry'];
  expandedCaseId: string;
  favoriteCaseIds: string[];
  onSearchChange: (value: string) => void;
  onIndustryChange: (value: 'All' | CaseStudy['industry']) => void;
  onExpandCase: (id: string) => void;
  onToggleFavorite: (id: string) => void;
};

function updateForm<K extends keyof ContactFormData>(
  field: K,
  value: ContactFormData[K],
) {
  setFormData((current) => ({ ...current, [field]: value }));
}`;

function ProjectPreview({
  activeService,
  selectedServiceId,
  setSelectedServiceId,
  expandedCaseId,
  setExpandedCaseId,
  favoriteCaseIds,
  toggleFavorite,
  searchQuery,
  setSearchQuery,
  selectedIndustry,
  setSelectedIndustry,
  industries,
  visibleCases,
  formData,
  updateForm,
  submitContact,
  submittedName,
}) {
  return (
    <div className="site-preview">
      <div className="browser-bar">
        <span />
        <span />
        <span />
        <strong>mordentown.example</strong>
      </div>

      <div className="morden-site">
        <header className="site-header">
          <div className="site-logo">
            <Building2 size={22} />
            <strong>{brand.name}</strong>
          </div>
          <nav>
            <a href="#services">Services</a>
            <a href="#cases">Cases</a>
            <a href="#contact">Contact</a>
          </nav>
          <button type="button">
            <Menu size={16} />
            Menu
          </button>
        </header>

        <section className="hero-section">
          <div>
            <span className="site-eyebrow">Smart city company</span>
            <h2>{brand.tagline}</h2>
            <p>{brand.description}</p>
            <div className="hero-actions">
              <a href="#services">Explore services</a>
              <a href="#contact">Plan a project</a>
            </div>
          </div>
          <div className="city-card">
            <Trees size={28} />
            <strong>Urban systems made warmer.</strong>
            <p>Community, building, data, and resident services in one coherent experience.</p>
          </div>
        </section>

        <section id="services" className="site-section">
          <SectionHeading
            eyebrow="Services"
            title="Four practical layers for modern city life"
          />
          <div className="service-tabs">
            {services.map((service) => (
              <button
                key={service.id}
                type="button"
                className={service.id === selectedServiceId ? 'selected' : ''}
                onClick={() => setSelectedServiceId(service.id)}
              >
                {service.title}
              </button>
            ))}
          </div>
          <div className="selected-service">
            <span>{activeService.tag}</span>
            <h3>{activeService.title}</h3>
            <p>{activeService.summary}</p>
          </div>
          <div className="services-grid">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </section>

        <section className="metrics-row">
          {metrics.map((metric) => (
            <div key={metric.label}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </div>
          ))}
        </section>

        <section id="cases" className="site-section">
          <SectionHeading eyebrow="Cases" title="Searchable project stories" />
          <div className="case-tools">
            <label>
              <Search size={16} />
              <input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search cases"
              />
            </label>
            <div>
              {industries.map((industry) => (
                <button
                  key={industry}
                  type="button"
                  className={industry === selectedIndustry ? 'selected' : ''}
                  onClick={() => setSelectedIndustry(industry)}
                >
                  {industry}
                </button>
              ))}
            </div>
          </div>
          <p className="result-count">{visibleCases.length} case studies visible</p>
          <div className="cases-grid">
            {visibleCases.map((caseStudy) => (
              <CaseCard
                key={caseStudy.id}
                caseStudy={caseStudy}
                expanded={expandedCaseId === caseStudy.id}
                favorite={favoriteCaseIds.includes(caseStudy.id)}
                onExpand={() => setExpandedCaseId(caseStudy.id)}
                onFavorite={() => toggleFavorite(caseStudy.id)}
              />
            ))}
          </div>
        </section>

        <section className="site-section compact-section">
          <SectionHeading eyebrow="Team" title="People behind the platform" />
          <div className="team-grid">
            {team.map((member) => (
              <article key={member.id}>
                <span>{member.name.slice(0, 1)}</span>
                <strong>{member.name}</strong>
                <p>{member.role}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="site-section compact-section">
          <SectionHeading eyebrow="News" title="Recent field notes" />
          <div className="news-list">
            {news.map((item) => (
              <article key={item.id}>
                <span>{item.date}</span>
                <strong>{item.title}</strong>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="site-section contact-grid">
          <div>
            <SectionHeading eyebrow="Contact" title="Plan a calmer city service" />
            <p>
              The form is controlled by React state, so the preview and submit message use one
              source of truth.
            </p>
            {submittedName ? (
              <div className="submit-message">Thanks, {submittedName}. MordenTown will reply soon.</div>
            ) : null}
          </div>
          <form onSubmit={submitContact} className="contact-form">
            <input
              value={formData.name}
              onChange={(event) => updateForm('name', event.target.value)}
              placeholder="Name"
            />
            <input
              value={formData.email}
              onChange={(event) => updateForm('email', event.target.value)}
              placeholder="Email"
            />
            <input
              value={formData.company}
              onChange={(event) => updateForm('company', event.target.value)}
              placeholder="Company"
            />
            <select
              value={formData.interest}
              onChange={(event) => updateForm('interest', event.target.value)}
            >
              {services.map((service) => (
                <option key={service.id}>{service.title}</option>
              ))}
            </select>
            <textarea
              value={formData.message}
              onChange={(event) => updateForm('message', event.target.value)}
              placeholder="Tell us about your project"
            />
            <button type="submit">Send request</button>
          </form>
        </section>
      </div>
    </div>
  );
}

function SectionHeading({ eyebrow, title }) {
  return (
    <div className="section-heading">
      <span>{eyebrow}</span>
      <h3>{title}</h3>
    </div>
  );
}

function ServiceCard({ service }) {
  return (
    <article className="service-card">
      <span>{service.tag}</span>
      <h4>{service.title}</h4>
      <p>{service.summary}</p>
    </article>
  );
}

function CaseCard({ caseStudy, expanded, favorite, onExpand, onFavorite }) {
  return (
    <article className={expanded ? 'case-card expanded' : 'case-card'}>
      <div>
        <span>{caseStudy.industry}</span>
        <button type="button" onClick={onFavorite} aria-label={`Favorite ${caseStudy.title}`}>
          <Star size={15} fill={favorite ? 'currentColor' : 'none'} />
        </button>
      </div>
      <h4>{caseStudy.title}</h4>
      <strong>{caseStudy.metric}</strong>
      {expanded ? <p>{caseStudy.summary}</p> : null}
      <button type="button" onClick={onExpand}>
        {expanded ? 'Selected' : 'View details'}
      </button>
    </article>
  );
}
