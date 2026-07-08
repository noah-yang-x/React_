export const brand = {
  name: 'MordenTown',
  tagline: 'Human-centered smart city experiences.',
  description:
    'MordenTown helps communities, buildings, and city teams create cleaner, calmer, more connected places to live.',
};

export const services = [
  {
    id: 'community',
    title: 'Smart Communities',
    tag: 'Resident Experience',
    summary:
      'Digital services for shared spaces, community requests, events, and safer daily operations.',
  },
  {
    id: 'building',
    title: 'Green Buildings',
    tag: 'Low Carbon',
    summary:
      'Energy-aware building dashboards that help operators reduce waste without reducing comfort.',
  },
  {
    id: 'data',
    title: 'Urban Data Platform',
    tag: 'City Intelligence',
    summary:
      'Clean data pipelines and visual decision tools for mobility, energy, and public services.',
  },
  {
    id: 'app',
    title: 'Resident App',
    tag: 'Mobile Service',
    summary:
      'A friendly mobile layer for payments, notices, repair requests, and local recommendations.',
  },
];

export const caseStudies = [
  {
    id: 'harbor-loop',
    title: 'Harbor Loop Renewal',
    industry: 'Community',
    metric: '42% faster service response',
    summary:
      'A waterfront district connected resident reports, facility teams, and public events in one shared dashboard.',
  },
  {
    id: 'cedar-grid',
    title: 'Cedar Grid Offices',
    industry: 'Building',
    metric: '18% energy reduction',
    summary:
      'A mixed-use office campus used occupancy signals and energy reports to tune lighting and cooling schedules.',
  },
  {
    id: 'northline',
    title: 'Northline Mobility Hub',
    industry: 'Data',
    metric: '31% clearer peak planning',
    summary:
      'A city transit team combined passenger flow, local events, and service alerts into one planning view.',
  },
  {
    id: 'sunset-court',
    title: 'Sunset Court Living',
    industry: 'Community',
    metric: '9,800 residents served',
    summary:
      'A residential area launched a simple resident app for notices, repairs, and neighborhood programs.',
  },
];

export const metrics = [
  { label: 'District projects', value: '48' },
  { label: 'Residents supported', value: '240k' },
  { label: 'Average energy saved', value: '21%' },
];

export const team = [
  { id: 'nina', name: 'Nina Sato', role: 'Urban Experience Lead' },
  { id: 'marco', name: 'Marco Chen', role: 'Platform Architect' },
  { id: 'aya', name: 'Aya Mori', role: 'Resident Product Designer' },
];

export const news = [
  {
    id: 'playbook',
    title: 'Designing calmer resident service flows',
    date: '2026.07',
  },
  {
    id: 'energy',
    title: 'What building teams need from energy dashboards',
    date: '2026.06',
  },
  {
    id: 'data',
    title: 'A practical data model for neighborhood operations',
    date: '2026.05',
  },
];

export const stages = [
  {
    id: 'stage-0',
    number: '00',
    title: '项目初始化',
    feature: '创建 React + JS 项目入口',
    concepts: ['createRoot', 'App', 'JSX', 'import / export'],
    task: '创建 React 入口，并让 App 渲染 MordenTown 官网第一屏。',
    correctUse:
      '用 main.jsx 负责挂载应用，用 App.jsx 负责描述根组件。组件返回 JSX，JSX 描述你希望页面长什么样。',
    why:
      'React 不直接让你手写一堆 DOM 操作，而是让你用组件描述 UI。createRoot 把 React 组件树接到真实 DOM 的 root 节点上。',
    exercise:
      '把 App 的标题改成 MordenTown，并添加一句品牌说明。',
    visual: ['index.html #root', 'createRoot(root)', '<App />', '<h1>MordenTown</h1>'],
    jsCode: `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
    tsCode: `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);`,
  },
  {
    id: 'stage-1',
    number: '01',
    title: '预设 UI 结构',
    feature: '搭建官网组件骨架',
    concepts: ['Component', 'JSX', 'children', 'composition'],
    task: '搭建官网骨架：SiteShell、Header、HomePage、HeroSection、Footer。',
    correctUse:
      '一个组件负责一个清晰的 UI 区块。页面通过组件组合完成，而不是把所有 JSX 写在 App 里。',
    why:
      '组件拆分让结构更容易阅读和维护。官网由多个区块组成，正适合用组件组合表达。',
    exercise:
      '创建 SiteShell 组件，让 Header、main 内容、Footer 通过 children 组合在一起。',
    visual: ['App', 'SiteShell', 'Header', 'HomePage', 'HeroSection', 'Footer'],
    jsCode: `function SiteShell({ children }) {
  return (
    <div className="site-shell">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}`,
    tsCode: `type SiteShellProps = {
  children: React.ReactNode;
};

function SiteShell({ children }: SiteShellProps) {
  return <main>{children}</main>;
}`,
  },
  {
    id: 'stage-2',
    number: '02',
    title: 'props 与静态内容',
    feature: '用数据渲染服务卡片',
    concepts: ['props', 'data down', 'component reuse', 'conditional rendering'],
    task: '把服务内容抽成数据，并用 ServiceCard 渲染服务区块。',
    correctUse:
      '父组件准备数据，子组件通过 props 接收数据并渲染。子组件像函数一样根据输入输出 UI。',
    why:
      'props 让同一个组件可以展示不同内容。ServiceCard 只写一次，就能展示四个服务。',
    exercise:
      '给 ServiceCard 增加 tag props，并在卡片上显示服务标签。',
    visual: ['HomePage data', 'ServicesSection props', 'ServiceCard title', 'ServiceCard summary'],
    jsCode: `function ServiceCard({ title, summary, tag }) {
  return (
    <article>
      <span>{tag}</span>
      <h3>{title}</h3>
      <p>{summary}</p>
    </article>
  );
}`,
    tsCode: `type ServiceCardProps = {
  title: string;
  summary: string;
  tag: string;
};

function ServiceCard({ title, summary, tag }: ServiceCardProps) {
  return <article>{title}</article>;
}`,
  },
  {
    id: 'stage-3',
    number: '03',
    title: '列表渲染与 key',
    feature: '渲染案例、团队和新闻列表',
    concepts: ['map', 'list rendering', 'key', 'empty state'],
    task: '用 map 渲染案例、团队和新闻列表。',
    correctUse:
      '数组数据用 map 转成组件列表。每个列表项使用稳定 id 作为 key。',
    why:
      'React 用 key 识别列表项身份。官网中的案例、团队、新闻都是结构相同的数据列表。',
    exercise:
      '创建 CaseCard，并用 caseStudies.map 渲染全部案例。',
    visual: ['caseStudies[]', 'map(case)', '<CaseCard key={case.id} />', 'Case list UI'],
    jsCode: `{caseStudies.map((item) => (
  <CaseCard key={item.id} caseStudy={item} />
))}`,
    tsCode: `type CaseStudy = {
  id: string;
  title: string;
  industry: string;
  summary: string;
};`,
  },
  {
    id: 'stage-4',
    number: '04',
    title: '事件与 useState',
    feature: '服务分类、案例展开、收藏案例',
    concepts: ['event handling', 'useState', 'state update', 'conditional UI'],
    task: '添加服务选择、案例展开和收藏交互。',
    correctUse:
      '用户操作会改变 UI 时，用 state 保存变化。点击事件中调用 setState，然后 React 根据新 state 重新渲染。',
    why:
      'React 的 UI 来自 state。你改变 state，而不是手动找 DOM 改文字或样式。',
    exercise:
      '添加 selectedServiceId state，点击服务按钮后更新当前选中的服务。',
    visual: ['click service button', 'setSelectedServiceId(id)', 'state changes', 'UI highlights selected service'],
    jsCode: `const [selectedServiceId, setSelectedServiceId] = useState('community');

function handleSelect(id) {
  setSelectedServiceId(id);
}`,
    tsCode: `const [selectedServiceId, setSelectedServiceId] = useState<string>('community');

function handleSelect(id: string) {
  setSelectedServiceId(id);
}`,
  },
  {
    id: 'stage-5',
    number: '05',
    title: '搜索、筛选与 derived state',
    feature: '筛选 MordenTown 案例',
    concepts: ['controlled input', 'filter', 'derived state', 'minimal state'],
    task: '实现案例搜索、行业筛选和筛选结果展示。',
    correctUse:
      '保存 query 和 selectedIndustry，visibleCases 由 caseStudies、query、selectedIndustry 计算出来。',
    why:
      '筛选结果不是独立事实，而是由原始数据和筛选条件推导出的结果。React 中应保存最小必要 state。',
    exercise:
      '实现 searchQuery 输入框，并用 filter 计算 visibleCases。',
    visual: ['caseStudies', 'searchQuery', 'selectedIndustry', 'visibleCases', 'CaseCard list'],
    jsCode: `const [searchQuery, setSearchQuery] = useState('');

const visibleCases = caseStudies.filter((item) =>
  item.title.toLowerCase().includes(searchQuery.toLowerCase())
);`,
    tsCode: `const [searchQuery, setSearchQuery] = useState('');

const visibleCases: CaseStudy[] = caseStudies.filter((item) =>
  item.title.toLowerCase().includes(searchQuery.toLowerCase())
);`,
  },
  {
    id: 'stage-6',
    number: '06',
    title: '表单与受控组件',
    feature: '联系 MordenTown 表单',
    concepts: ['controlled component', 'form state', 'onSubmit', 'textarea / select'],
    task: '实现联系表单，并用 React state 管理所有字段。',
    correctUse:
      '表单字段 value 绑定 React state，onChange 更新 state，提交时读取 state。',
    why:
      '受控组件让表单数据始终在 React 中。这样预览、校验、提交都可以基于同一份 state 完成。',
    exercise:
      '创建 formData state，并把 input、select、textarea 都绑定到 formData。',
    visual: ['input change', 'formData state', 'live preview', 'submit message'],
    jsCode: `const [formData, setFormData] = useState({
  name: '',
  email: '',
  interest: 'Smart Communities',
});

function updateField(field, value) {
  setFormData((current) => ({ ...current, [field]: value }));
}`,
    tsCode: `type FormData = {
  name: string;
  email: string;
  interest: string;
};

const [formData, setFormData] = useState<FormData>({
  name: '',
  email: '',
  interest: 'Smart Communities',
});`,
  },
  {
    id: 'stage-7',
    number: '07',
    title: 'useEffect 与本地保存',
    feature: '保存主题和收藏案例',
    concepts: ['useEffect', 'localStorage', 'external system', 'lazy initial state'],
    task: '把主题和收藏案例保存到 localStorage，并在刷新后恢复。',
    correctUse:
      'localStorage 是 React 外部系统。初始化时读取，state 改变后用 effect 同步。',
    why:
      'effect 适合把 React 状态同步到外部系统。普通 UI 计算不需要 effect。',
    exercise:
      '为 favoriteCaseIds 添加 localStorage 保存逻辑。',
    visual: ['favoriteCaseIds state', 'useEffect', 'localStorage', 'reload restores state'],
    jsCode: `useEffect(() => {
  localStorage.setItem('favorites', JSON.stringify(favoriteCaseIds));
}, [favoriteCaseIds]);`,
    tsCode: `useEffect(() => {
  localStorage.setItem('favorites', JSON.stringify(favoriteCaseIds));
}, [favoriteCaseIds]);`,
  },
  {
    id: 'stage-8',
    number: '08',
    title: 'custom hooks',
    feature: '抽取可复用逻辑',
    concepts: ['custom hook', 'hook rules', 'reusable state logic'],
    task: '把 localStorage、筛选和表单逻辑抽成 custom hooks。',
    correctUse:
      '重复的是状态逻辑时抽 hook，重复的是 UI 结构时抽组件。hook 名称以 use 开头。',
    why:
      'custom hook 可以复用逻辑，同时让页面组件更专注于 UI。',
    exercise:
      '创建 useCaseFilters，让 CaseStudiesSection 只负责渲染。',
    visual: ['CaseStudiesSection', 'useCaseFilters', 'query/filter state', 'visibleCases'],
    jsCode: `function useCaseFilters(items) {
  const [query, setQuery] = useState('');
  const visibleCases = items.filter((item) => item.title.includes(query));
  return { query, setQuery, visibleCases };
}`,
    tsCode: `function useCaseFilters(items: CaseStudy[]) {
  const [query, setQuery] = useState('');
  const visibleCases = items.filter((item) => item.title.includes(query));
  return { query, setQuery, visibleCases };
}`,
  },
  {
    id: 'stage-9',
    number: '09',
    title: 'useReducer',
    feature: '集中管理复杂 UI 状态',
    concepts: ['useReducer', 'action', 'dispatch', 'state transition'],
    task: '用 reducer 集中管理选择服务、展开案例、收藏案例等 UI 状态。',
    correctUse:
      '用 action 描述发生了什么，reducer 根据 state 和 action 返回下一个 state。',
    why:
      '多个相关状态变化分散在组件里会变难追踪。reducer 让状态变化集中、可读。',
    exercise:
      '把 toggleFavorite 和 expandCase 改成 dispatch action。',
    visual: ['user action', 'dispatch', 'uiReducer', 'next state', 're-render'],
    jsCode: `function uiReducer(state, action) {
  switch (action.type) {
    case 'selectService':
      return { ...state, selectedServiceId: action.id };
    default:
      return state;
  }
}`,
    tsCode: `type Action =
  | { type: 'selectService'; id: string }
  | { type: 'expandCase'; id: string };

function uiReducer(state: UIState, action: Action): UIState {
  return state;
}`,
  },
  {
    id: 'stage-10',
    number: '10',
    title: 'Context',
    feature: '主题和语言设置',
    concepts: ['createContext', 'Provider', 'useContext'],
    task: '创建 SiteSettingsContext，让页面深层组件读取主题和语言。',
    correctUse:
      'Context 用于跨层共享数据，例如主题、语言、全站设置。局部数据仍然留在局部组件。',
    why:
      '当很多深层组件都需要同一份全站设置时，Context 比逐层传 props 更清楚。',
    exercise:
      '创建 SiteSettingsProvider，并在 Header 中读取 language。',
    visual: ['SiteSettingsProvider', 'Header reads context', 'HomePage reads context', 'Footer reads context'],
    jsCode: `const SiteSettingsContext = createContext(null);

function useSiteSettings() {
  return useContext(SiteSettingsContext);
}`,
    tsCode: `type SiteSettings = {
  theme: 'light' | 'dark';
  language: 'zh' | 'ja' | 'en';
};`,
  },
  {
    id: 'stage-11',
    number: '11',
    title: 'React Router',
    feature: '多页面官网',
    concepts: ['Routes', 'Route', 'NavLink', 'params'],
    task: '把官网拆成多页面，并为案例详情添加路由参数。',
    correctUse:
      '页面级内容交给 route 管理，导航使用 Link / NavLink，详情页用 URL param 表达当前资源。',
    why:
      '官网通常有多个页面。Router 让页面切换不刷新整个应用，同时保留可分享 URL。',
    exercise:
      '创建 /cases/:caseId，并根据 caseId 找到对应案例。',
    visual: ['URL', 'Route match', 'Page component', 'Case detail'],
    jsCode: `<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/cases/:caseId" element={<CaseDetailPage />} />
</Routes>`,
    tsCode: `const { caseId } = useParams<{ caseId: string }>();`,
  },
];

export const stageGroups = [
  { label: 'MVP', ids: ['stage-0', 'stage-1', 'stage-2', 'stage-3', 'stage-4', 'stage-5', 'stage-6'] },
  { label: 'Next', ids: ['stage-7', 'stage-8', 'stage-9', 'stage-10', 'stage-11'] },
];
