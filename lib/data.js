// Central content store — swap for CMS API calls later without touching layouts.

const U = 'https://images.unsplash.com';

export const nav = [
  { key: 'home', label: 'Home', href: '/' },
  { key: 'about', label: 'About', href: '/about' },
  {
    key: 'capabilities', label: 'Capabilities', href: '/capabilities',
    menu: [
      { label: 'Skilling', href: '/skilling' },
      { label: 'Simulation', href: '/simulation' },
      { label: 'Services', href: '/services' },
    ],
  },
  { key: 'projects', label: 'Projects', href: '/projects' },
  {
    key: 'insights', label: 'Insights', href: '/insights',
    menu: [
      { label: 'Blog', href: '/insights?category=Blog' },
      { label: 'News', href: '/insights?category=News' },
      { label: 'Events', href: '/insights#events' },
      { label: 'Announcements', href: '/insights?category=Announcement' },
    ],
  },
  { key: 'careers', label: 'Careers', href: '/careers' },
  { key: 'contact', label: 'Contact', href: '/contact' },
];

export const socials = [
  { name: 'LinkedIn', glyph: 'in', href: 'https://linkedin.com/company/ecoconnect-services' },
  { name: 'Instagram', glyph: 'ig', href: '#' },
  { name: 'Facebook', glyph: 'fb', href: '#' },
  { name: 'YouTube', glyph: 'yt', href: '#' },
  { name: 'X', glyph: 'x', href: '#' },
];

export const homeStats = [
  { target: 120, suffix: '+', label: 'Projects Delivered' },
  { target: 14, suffix: '', label: 'States Covered' },
  { target: 60, suffix: '+', label: 'Industry Partners' },
  { target: 8500, suffix: '+', label: 'Professionals Trained' },
];

export const pillars = [
  { n: '01', title: 'Skilling', line: 'Preparing industry-ready talent for future-focused sectors.' },
  { n: '02', title: 'Simulation', line: 'Supporting product development, validation, and engineering innovation.' },
  { n: '03', title: 'Services', line: 'Delivering project execution, operations, maintenance, and deployment.' },
];

export const capabilities = [
  { eyebrow: 'Capability 01', title: 'Skilling', href: '/skilling', img: `${U}/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80`, alt: 'Hands-on technical training session', desc: 'Building industry-ready talent through practical, industry-aligned training programmes.' },
  { eyebrow: 'Capability 02', title: 'Simulation', href: '/simulation', img: `${U}/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80`, alt: 'Electronics and simulation engineering', desc: 'Engineering, validation, and technical support across emerging energy technologies.' },
  { eyebrow: 'Capability 03', title: 'Services', href: '/services', img: `${U}/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80`, alt: 'On-site project execution', desc: 'Project execution, operations management, audits, and technology deployment.' },
];

export const industries = [
  { glyph: 'EM', name: 'Electric Mobility' }, { glyph: 'CV', name: 'Commercial Vehicles' },
  { glyph: 'RE', name: 'Renewable Energy' }, { glyph: 'BS', name: 'Battery Energy Storage' },
  { glyph: 'UT', name: 'Utilities' }, { glyph: 'PE', name: 'Power Electronics' },
  { glyph: 'IM', name: 'Industrial Manufacturing' }, { glyph: 'DC', name: 'Data Centres' },
  { glyph: 'GV', name: 'Government' }, { glyph: 'SI', name: 'Smart Infrastructure' },
];

export const whyCards = [
  { title: 'Industry-Led Expertise', desc: 'Programmes, engineering, and delivery shaped directly by industry requirements — not theory.' },
  { title: 'Integrated Capabilities', desc: 'Skilling, Simulation, and Services under one roof, compounding value across every engagement.' },
  { title: 'End-to-End Execution', desc: 'From requirement analysis to commissioning and operations — one accountable partner throughout.' },
];

export const partners = [
  { label: 'VoltEdge Motors', group: 'Industry' }, { label: 'NIT Trichy', group: 'Academic' },
  { label: 'State Energy Dept.', group: 'Government' }, { label: 'GridCore Systems', group: 'Technology' },
  { label: 'SunPeak Renewables', group: 'Industry' }, { label: 'IIT Madras RP', group: 'Academic' },
  { label: 'Skill India Mission', group: 'Government' }, { label: 'CellForge Energy', group: 'Technology' },
];

export const projects = [
  { slug: 'solar-commissioning-support', capability: 'Services', industry: 'Renewable Energy', location: 'Rajasthan', title: 'Utility-Scale Solar Commissioning Support', summary: 'Testing, commissioning, and O&M enablement for a 40 MW solar installation.', client: 'IPP developer', duration: '9 months',
    challenge: 'A 40 MW plant faced commissioning delays with unresolved protection-coordination issues and an untrained O&M team.',
    solution: 'Ecoconnect deployed a commissioning task force, re-ran protection studies, executed staged energisation, and trained the client O&M crew on live systems.',
    technologies: ['Protection coordination studies', 'Staged energisation', 'SCADA validation', 'O&M certification'],
    outcomes: 'Plant energised 6 weeks ahead of revised schedule; zero safety incidents; O&M team certified and self-sufficient in 90 days.',
    img: `${U}/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1600&q=80`,
    gallery: [`${U}/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=900&q=80`, `${U}/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=900&q=80`, `${U}/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=900&q=80`] },
  { slug: 'bess-validation-study', capability: 'Simulation', industry: 'BESS', location: 'Gujarat', title: 'Battery Storage System Validation Study', summary: 'System modelling and performance simulation for a grid-connected BESS deployment.', client: 'Storage developer', duration: '4 months',
    challenge: 'A 100 MWh BESS needed interconnection approval with unproven protection and thermal designs.',
    solution: 'Full system model in MATLAB/PSCAD, 14 fault scenarios, thermal derating analysis, and a compliance-ready study report.',
    technologies: ['MATLAB / Simulink', 'PSCAD transient studies', 'Thermal modelling', 'Grid-code compliance'],
    outcomes: 'First-pass interconnection approval; thermal redesign avoided an estimated 8% capacity derate in summer months.',
    img: `${U}/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1600&q=80`,
    gallery: [`${U}/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=900&q=80`, `${U}/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80`, `${U}/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=900&q=80`] },
  { slug: 'ev-technician-coe', capability: 'Skilling', industry: 'Electric Mobility', location: 'Maharashtra', title: 'EV Technician Centre of Excellence', summary: 'Industry-aligned training centre producing job-ready EV service and diagnostics talent.', client: 'EV OEM + academic partner', duration: 'Ongoing',
    challenge: 'An OEM’s service network expansion was bottlenecked by a shortage of high-voltage-trained technicians.',
    solution: 'Co-designed curriculum, commissioned a hands-on HV lab, and ran rolling 12-week cohorts with OEM assessors.',
    technologies: ['HV safety lab', 'OEM diagnostics rigs', 'Competency assessment', 'Placement pipeline'],
    outcomes: '600+ technicians certified; 85% placed into the OEM network; onboarding time cut from 4 months to 3 weeks.',
    img: `${U}/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=1600&q=80`,
    gallery: [`${U}/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=900&q=80`, `${U}/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=900&q=80`, `${U}/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80`] },
  { slug: 'dc-fast-charge-load-study', capability: 'Simulation', industry: 'Electric Mobility', location: 'Karnataka', title: 'DC Fast-Charge Network Load Study', summary: 'Grid-impact and transformer sizing study across a 40-site charging network.', client: 'Charge-point operator', duration: '3 months',
    challenge: 'Oversized transformer specs across 40 planned sites threatened network capex viability.',
    solution: 'Site-wise load simulation with utilisation profiles, coincidence factors, and demand-management options.',
    technologies: ['Load-flow simulation', 'Utilisation modelling', 'Demand management', 'Site archetyping'],
    outcomes: 'Capex reduced 18% with no derating; standardised three site archetypes for faster rollout.',
    img: `${U}/photo-1558389186-438424b00a68?auto=format&fit=crop&w=1600&q=80`,
    gallery: [`${U}/photo-1558389186-438424b00a68?auto=format&fit=crop&w=900&q=80`, `${U}/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=900&q=80`, `${U}/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80`] },
  { slug: 'plant-safety-audit-programme', capability: 'Services', industry: 'Industrial', location: 'Tamil Nadu', title: 'Plant Electrical Safety Audit Programme', summary: 'Multi-site electrical safety and energy audit for a manufacturing group.', client: 'Manufacturing group', duration: '6 months',
    challenge: 'Ageing electrical infrastructure across five plants with no unified safety baseline.',
    solution: 'Standardised audit protocol, thermographic surveys, arc-flash assessment, and a prioritised remediation roadmap.',
    technologies: ['Thermographic survey', 'Arc-flash assessment', 'Energy audit', 'Remediation roadmap'],
    outcomes: '312 findings closed; insurance premium reduction secured; zero electrical incidents in the following year.',
    img: `${U}/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=80`,
    gallery: [`${U}/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=900&q=80`, `${U}/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=900&q=80`, `${U}/photo-1532601224476-15c79f2f7a51?auto=format&fit=crop&w=900&q=80`] },
  { slug: 'solar-om-workforce-programme', capability: 'Skilling', industry: 'Renewable Energy', location: 'Multi-state', title: 'Solar O&M Workforce Programme', summary: 'State-mission-aligned solar installation and O&M skilling across three states.', client: 'Government skilling mission', duration: '18 months',
    challenge: 'Rapid solar capacity addition outpacing available certified installation and O&M workforce.',
    solution: 'Mobile training units, standardised assessment, and placement tie-ups with EPC contractors.',
    technologies: ['Mobile training units', 'Standardised assessment', 'EPC placement tie-ups', 'Field certification'],
    outcomes: '2,400 candidates certified; 78% placement within 60 days; programme extended to two more states.',
    img: `${U}/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=1600&q=80`,
    gallery: [`${U}/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=900&q=80`, `${U}/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=900&q=80`, `${U}/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80`] },
];

export const projectStats = [
  { target: 120, suffix: '+', label: 'Projects Delivered' },
  { target: 14, suffix: '', label: 'States Covered' },
  { target: 60, suffix: '+', label: 'Industry Partners' },
  { target: 8500, suffix: '+', label: 'Professionals Trained' },
];

export const projectTestimonials = [
  { quote: 'They committed to a commissioning date most vendors called impossible — and beat it.', name: 'Project Director', role: 'Solar IPP' },
  { quote: 'The simulation reports were bank-grade. Our lenders signed off without a second round.', name: 'CTO', role: 'Storage developer' },
  { quote: 'Hiring their graduates is the closest thing to de-risked recruitment we have found.', name: 'VP Operations', role: 'EV OEM' },
];

export const articles = [
  { slug: 'execution-gap', category: 'Technical Article', date: 'Jul 2026', author: 'Ecoconnect Editorial', read: '9 min read', title: 'The Execution Gap: Why Clean Energy Targets Miss and How Integrated Delivery Closes It', excerpt: 'Capacity targets fail on the ground, not on paper. A look at the workforce, validation, and delivery gaps between announcement and commissioning.', img: `${U}/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1600&q=80`, featured: true,
    content: ['Every year, clean energy capacity targets are announced with confidence — and every year, a meaningful share of that capacity slips. The gap is rarely in the technology or the financing. It is in execution: the certified workforce that isn’t available when installation starts, the design that was never validated against grid codes, the commissioning plan discovered to be optimistic only when the site team assembles.', 'We call this the execution gap, and it compounds. A missing protection study delays energisation; a delayed energisation idles a training-starved O&M team; an idle plant erodes the financial case that justified the target in the first place.', 'Closing the gap requires treating talent, engineering validation, and field delivery as one integrated pipeline rather than three procurement line items. When the team that models the system also briefs the crew that commissions it — and when that crew was trained on the same equipment it will operate — schedule risk collapses.', 'That is the thesis Ecoconnect is built on: Skilling, Simulation, and Services under one accountable roof. Not because integration is elegant, but because the alternative is the gap.'] },
  { slug: 'simulation-first-engineering', category: 'Blog', date: 'Jul 2026', author: 'Rahul Deshpande', read: '7 min read', title: 'Why Simulation-First Engineering De-Risks Clean Energy Projects', excerpt: 'Modelling before procurement catches the failures that cost the most to fix in the field.', img: `${U}/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1600&q=80`,
    content: ['The cheapest place to find a design fault is in a model. The most expensive is a commissioned site. Between those two points, the cost of correction rises by roughly an order of magnitude at every stage — specification, procurement, installation, energisation.', 'Simulation-first engineering inverts the traditional sequence. Instead of designing to standards and verifying at commissioning, the full system — sources, converters, protection, control — is modelled and stressed before a single purchase order is raised.', 'On a recent 100 MWh storage engagement, fourteen simulated fault scenarios surfaced a protection-coordination flaw that would have failed interconnection testing. The fix cost a week of engineering time. Found at site, it would have cost a season.', 'The lesson is consistent across our practice: validation is not a compliance checkbox. It is the highest-leverage capital-protection tool a developer has.'] },
  { slug: 'coe-network-expansion', category: 'News', date: 'Jun 2026', author: 'Editorial', read: '3 min read', title: 'Ecoconnect Expands Centre of Excellence Network', excerpt: 'Two new CoEs commissioned with EV and BESS labs, adding 1,200 annual training seats.', img: `${U}/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80`,
    content: ['Ecoconnect Services has commissioned two new Centres of Excellence, expanding the network’s annual capacity by 1,200 training seats across electric mobility and battery energy storage disciplines.', 'Both centres feature live high-voltage laboratories, OEM diagnostic equipment, and dedicated BESS training rigs — the same infrastructure standard that has driven an 85% placement rate across existing centres.', 'The expansion was developed in partnership with academic institutions and anchor hiring partners, with the first cohorts beginning in August 2026.'] },
  { slug: 'scaling-ev-workforce', category: 'Case Study', date: 'Jun 2026', author: 'Priya Nair', read: '8 min read', title: 'Scaling EV Workforce Development with Academic Partners', excerpt: 'How a co-owned CoE model took technician onboarding from 4 months to 3 weeks.', img: `${U}/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80`,
    content: ['When an EV OEM’s service network expansion stalled for want of high-voltage-trained technicians, the conventional answer — recruit and retrain — was too slow. Four months of onboarding per technician meant the network grew slower than the vehicle parc.', 'The alternative was a co-owned Centre of Excellence: the OEM contributed diagnostic equipment and assessors, the academic partner contributed campus and candidates, and Ecoconnect designed the curriculum and ran delivery.', 'Rolling 12-week cohorts now feed the service network directly. Graduates arrive certified on the exact diagnostic workflows they will use, cutting onboarding to three weeks.', 'Six hundred technicians later, the model is being replicated across two more institutions — evidence that workforce capacity, approached as infrastructure, scales like infrastructure.'] },
  { slug: 'grid-codes-bess', category: 'Technical Article', date: 'May 2026', author: 'Rahul Deshpande', read: '11 min read', title: 'Grid Codes for BESS: What Changed and What It Means for Developers', excerpt: 'A practical walkthrough of the compliance studies interconnection now demands.', img: `${U}/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1600&q=80`,
    content: ['Recent grid-code revisions have materially raised the evidentiary bar for battery storage interconnection. Where a single load-flow study once sufficed, developers now face requirements spanning fault ride-through, frequency response, and harmonic performance.', 'The practical consequence: compliance studies must begin at design stage, not application stage. Retrofitting a non-compliant protection philosophy after procurement is the single most common — and most expensive — failure mode we see.', 'This article walks through the study package a bankable application now requires, the modelling fidelity each study demands, and the design decisions that should be locked only after simulation results are in.'] },
  { slug: 'om-contract-underperforming', category: 'Blog', date: 'May 2026', author: 'Kavitha Rao', read: '6 min read', title: 'Five Signs Your O&M Contract Is Underperforming', excerpt: 'Availability numbers can hide degradation. Here is what to actually measure.', img: `${U}/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=1600&q=80`,
    content: ['Contractual availability is the most quoted — and least informative — number in O&M reporting. A plant can hit 99% availability while quietly losing yield to soiling, derating, and deferred maintenance.', 'The signals that matter are subtler: performance-ratio drift against weather-corrected baselines, rising thermal signatures in switchgear, growing mean-time-to-repair on repeat faults, spares consumption trending above design assumptions, and preventive-maintenance completion slipping against schedule.', 'Each is measurable. Each is routinely absent from monthly reports. If your dashboard shows only availability and generation, you are auditing the contractor’s paperwork, not the asset’s health.'] },
  { slug: 'green-skilling-mission', category: 'Announcement', date: 'Apr 2026', author: 'Editorial', read: '2 min read', title: 'Ecoconnect Joins State Green Skilling Mission as Execution Partner', excerpt: 'Three-state programme targeting 5,000 certified renewable-energy professionals.', img: `${U}/photo-1532601224476-15c79f2f7a51?auto=format&fit=crop&w=1600&q=80`,
    content: ['Ecoconnect Services has signed an MoU to serve as execution partner for a state-led Green Skilling Mission spanning three states, targeting 5,000 certified renewable-energy professionals over 24 months.', 'The programme combines mobile training units for rural reach, standardised assessment aligned to national occupational standards, and placement tie-ups with EPC contractors operating in each state.', 'Enrolment for the first cohorts opens in the coming quarter through partner institutions.'] },
];

export const insightArticleCards = articles.filter((a) => !a.featured);

export const events = [
  { status: 'Upcoming', date: 'Sep 2026 · Pune', title: 'BESS Engineering Masterclass', desc: 'One-day intensive on storage sizing, protection, and grid-code compliance.', cta: 'Register →', primary: true },
  { status: 'Upcoming', date: 'Oct 2026 · Online', title: 'Careers in the Energy Transition — Open Webinar', desc: 'Programme walkthrough, alumni panel, and live Q&A for prospective learners.', cta: 'Register →', primary: true },
  { status: 'Past', date: 'May 2026 · Delhi', title: 'EV Infrastructure Summit — Panel', desc: 'Our simulation lead on de-risking fast-charge network rollouts.', cta: 'View Recap →', primary: false },
];

export const announcements = [
  { date: 'Jul 2026', title: 'Two New Centres of Excellence Commissioned', desc: 'EV and BESS labs adding 1,200 annual training seats across Maharashtra and Karnataka.' },
  { date: 'May 2026', title: 'MoU Signed with State Green Skilling Mission', desc: 'Three-state programme targeting 5,000 certified renewable-energy professionals.' },
  { date: 'Mar 2026', title: 'Simulation Practice Crosses 100 Delivered Studies', desc: 'Milestone spanning grid integration, BESS validation, and charging-network design.' },
  { date: 'Jan 2026', title: 'Services Division Wins Multi-Site O&M Contract', desc: 'Annual support contract covering five industrial facilities.' },
];

/* ---------- About ---------- */
export const aboutVmp = [
  { glyph: 'V', title: 'Vision', desc: 'To become a trusted execution partner that helps build the technologies, talent, and capabilities driving the industries of tomorrow.' },
  { glyph: 'M', title: 'Mission', desc: 'To bridge the gap between innovation and implementation by integrating workforce development, engineering, and on-ground execution.' },
  { glyph: 'P', title: 'Purpose', desc: 'To accelerate the clean energy and sustainable mobility transition with practical, scalable, industry-aligned solutions.' },
];

export const aboutJourney = [
  { year: '2019', title: 'Founded', desc: 'Ecoconnect Services established with an execution-first charter.' },
  { year: '2020', title: 'First Training Programme', desc: 'Launched industry-aligned EV skilling cohort with hiring partners.' },
  { year: '2021', title: 'Centre of Excellence', desc: 'First CoE commissioned with hands-on labs and live equipment.' },
  { year: '2022', title: 'Industry Partnerships', desc: 'Signed multi-year workforce and engineering partnerships.' },
  { year: '2023', title: 'Government Collaborations', desc: 'Joined state skilling missions and public-sector programmes.' },
  { year: '2024', title: 'Simulation Expansion', desc: 'Scaled system modelling, validation, and grid-study practice.' },
  { year: '2025', title: 'Services Launch', desc: 'Full project execution, O&M, and audit portfolio live.' },
  { year: '2026', title: 'Major Milestones', desc: '120+ projects delivered and 8,500+ professionals trained.' },
];

export const aboutFlow = [
  { step: 'STEP 01', title: 'Skilling', href: '/skilling', arrow: true },
  { step: 'STEP 02', title: 'Simulation', href: '/simulation', arrow: true },
  { step: 'STEP 03', title: 'Services', href: '/services', arrow: true },
  { step: 'OUTCOME', title: 'Industry Impact', href: '/projects', arrow: false },
];

export const aboutLeaders = [
  { name: 'Aryan Gupta', role: 'Founder & CEO', bio: 'Leads Ecoconnect’s integrated Skilling, Simulation, and Services strategy.', img: `${U}/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80` },
  { name: 'Priya Nair', role: 'Head of Skilling', bio: 'Built CoE networks and industry-aligned curricula at national scale.', img: `${U}/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80` },
  { name: 'Rahul Deshpande', role: 'Head of Simulation', bio: 'Power systems engineer specialising in BESS and grid integration.', img: `${U}/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80` },
  { name: 'Kavitha Rao', role: 'Head of Services', bio: 'Leads execution, commissioning, and O&M delivery nationwide.', img: `${U}/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80` },
];

export const aboutEcosystem = [
  { name: 'VoltEdge Motors', group: 'Industry' }, { name: 'SunPeak Renewables', group: 'Industry' },
  { name: 'NIT Trichy', group: 'Academic' }, { name: 'IIT Madras RP', group: 'Academic' },
  { name: 'State Energy Dept.', group: 'Government' }, { name: 'Skill India Mission', group: 'Government' },
  { name: 'GridCore Systems', group: 'Technology' }, { name: 'CellForge Energy', group: 'Technology' },
  { name: 'AmpLoop Labs', group: 'Startup' }, { name: 'TerraWatt Mobility', group: 'Startup' },
];

export const aboutWhy = [
  { title: 'Execution First', desc: 'We are measured on commissioned projects and placed talent — not slideware.' },
  { title: 'Integrated Model', desc: 'Skilling, Simulation, and Services reinforce each other on every engagement.' },
  { title: 'Ecosystem Reach', desc: 'Active partnerships across industry, academia, startups, and government.' },
  { title: 'Domain Depth', desc: 'EV, renewables, BESS, power electronics, and digital infrastructure under one roof.' },
];

/* ---------- Capabilities ---------- */
export const capabilityCards = [
  { eyebrow: 'SKILLING', title: 'Skilling', tagline: 'Building Industry-Ready Talent', href: '/skilling', img: `${U}/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1400&q=80`, alt: 'Hands-on technical training', desc: 'Practical, industry-aligned training programmes, Centres of Excellence, and career pathways that produce deployment-ready professionals for the energy transition.' },
  { eyebrow: 'SIMULATION', title: 'Simulation', tagline: 'Engineering. Validation. Deployment.', href: '/simulation', img: `${U}/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80`, alt: 'Power electronics engineering', desc: 'System modelling, performance simulation, electrical studies, and design validation that de-risk decisions before capital is committed.' },
  { eyebrow: 'SERVICES', title: 'Services', tagline: 'From Planning to Execution', href: '/services', img: `${U}/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1400&q=80`, alt: 'Project execution on site', desc: 'Project planning, engineering support, execution, operations & maintenance, and audits — delivered by one accountable on-ground team.' },
];

export const capabilityFlow = [
  { step: 'STEP 01', title: 'Skilling', desc: 'Talent trained on real equipment', arrow: true },
  { step: 'STEP 02', title: 'Simulation', desc: 'Designs validated before build', arrow: true },
  { step: 'STEP 03', title: 'Services', desc: 'Projects executed on the ground', arrow: true },
  { step: 'OUTCOME', title: 'Industry Impact', desc: 'Commissioned, operating assets', arrow: false },
];

export const capabilityWhy = [
  { title: 'Industry-Aligned Expertise', desc: 'Every programme and project is shaped by current industry requirements.' },
  { title: 'End-to-End Support', desc: 'One partner from requirement analysis to operations — no handoff gaps.' },
  { title: 'Cross-Functional Knowledge', desc: 'Insights from training, engineering, and field delivery feed each other.' },
  { title: 'Long-Term Partnerships', desc: 'We stay through the lifecycle: upskilling, optimisation, and O&M.' },
];

/* ---------- Skilling ---------- */
export const skillingPhilosophy = [
  { n: '01', title: 'Industry-Aligned Learning', desc: 'Curricula co-designed with employers, refreshed as technology and hiring needs evolve.' },
  { n: '02', title: 'Hands-on Experience', desc: 'Live equipment, real fault scenarios, and field exposure — not just classrooms.' },
  { n: '03', title: 'Outcome-Oriented Development', desc: 'Assessments, certifications, and placement support that end in employment.' },
];

export const skillingEcosystem = [
  { n: '01', title: 'Industry Requirements' }, { n: '02', title: 'Curriculum Design' },
  { n: '03', title: 'Practical Learning' }, { n: '04', title: 'Centre of Excellence' },
  { n: '05', title: 'Industry Exposure' }, { n: '06', title: 'Assessments & Certifications' },
  { n: '07', title: 'Placement & Career Support' }, { n: '08', title: 'Continuous Upskilling' },
];

export const skillingCollab = [
  { glyph: 'CU', title: 'Industry-Designed Curriculum', desc: 'Programmes co-created and refreshed with hiring partners.' },
  { glyph: 'GL', title: 'Expert Guest Lectures', desc: 'Practitioners from OEMs and developers teach live sessions.' },
  { glyph: 'IV', title: 'Industrial Visits', desc: 'Plant, site, and lab exposure built into every cohort.' },
  { glyph: 'LP', title: 'Live Projects', desc: 'Learners work on real engagement deliverables under supervision.' },
  { glyph: 'IN', title: 'Internships', desc: 'Structured placements with partner organisations.' },
  { glyph: 'CT', title: 'Corporate & Academic Training', desc: 'Upskilling programmes for companies and institutions.' },
];

export const skillingGallery = [
  { img: `${U}/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1400&q=80`, caption: 'High-voltage systems lab' },
  { img: `${U}/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=80`, caption: 'Instructor-led cohort session' },
  { img: `${U}/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80`, caption: 'Power electronics workbench' },
  { img: `${U}/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1400&q=80`, caption: 'Centre of Excellence campus' },
];

export const skillingProgrammes = [
  { category: 'Electric Mobility', name: 'EV Service Technician Programme', overview: 'Diagnostics, high-voltage safety, and service workflows on production EVs.', audience: 'ITI / Diploma graduates', duration: '12 weeks' },
  { category: 'Electric Mobility', name: 'EV Charging Infrastructure Engineer', overview: 'AC/DC charger installation, commissioning, and CPO operations.', audience: 'Engineers', duration: '8 weeks' },
  { category: 'Renewable Energy', name: 'Solar PV Design & Installation', overview: 'Rooftop and utility-scale PV design, installation, and safety codes.', audience: 'Technicians & engineers', duration: '10 weeks' },
  { category: 'Renewable Energy', name: 'Wind O&M Fundamentals', overview: 'Turbine systems, preventive maintenance, and site safety.', audience: 'Working professionals', duration: '6 weeks' },
  { category: 'BESS & Power', name: 'Battery Energy Storage Specialist', overview: 'Cell-to-container architecture, BMS, thermal management, and grid codes.', audience: 'Engineers', duration: '10 weeks' },
  { category: 'BESS & Power', name: 'Power Electronics for the Grid', overview: 'Converters, inverters, and control for renewable integration.', audience: 'Graduate engineers', duration: '8 weeks' },
];
export const skillingProgrammeCategories = ['All', 'Electric Mobility', 'Renewable Energy', 'BESS & Power'];

export const skillingCareerDev = [
  { glyph: 'CG', name: 'Career Guidance' }, { glyph: 'RI', name: 'Resume & Interview Prep' },
  { glyph: 'PA', name: 'Placement Assistance' }, { glyph: 'IO', name: 'Internship Opportunities' },
  { glyph: 'NW', name: 'Industry Networking' }, { glyph: 'CL', name: 'Continuous Learning' },
];

export const skillingTestimonials = [
  { quote: 'Ecoconnect graduates joined our service network deployment-ready. Onboarding time dropped from months to weeks.', name: 'Head of After-Sales', role: 'EV OEM partner' },
  { quote: 'The CoE model gave our students industry exposure we could never build alone.', name: 'Director', role: 'Engineering college partner' },
  { quote: 'A skilling partner that actually understands plant operations is rare. This one does.', name: 'Plant Head', role: 'Manufacturing partner' },
];

export const skillingStats = [
  { target: 8500, suffix: '+', label: 'Professionals Trained' },
  { target: 12, suffix: '', label: 'Centres of Excellence' },
  { target: 85, suffix: '%', label: 'Placement Rate' },
  { target: 40, suffix: '+', label: 'Hiring Partners' },
];

/* ---------- Simulation ---------- */
export const simPhilosophy = [
  { n: '01', title: 'Design Before Deployment', desc: 'Model the system, stress the design, and surface failure modes before anything is procured or built.' },
  { n: '02', title: 'Data-Driven Decisions', desc: 'Every recommendation is backed by quantified performance, loss, and reliability analysis.' },
  { n: '03', title: 'Validation & Optimization', desc: 'Iterate designs against real operating conditions until they are efficient, safe, and bankable.' },
];

export const simEngCaps = [
  { title: 'System Modelling & Analysis', desc: 'Digital models of electrical and energy systems for behaviour prediction.' },
  { title: 'Performance Simulation', desc: 'Yield, efficiency, and loss simulation across operating envelopes.' },
  { title: 'Electrical System Studies', desc: 'Load flow, short circuit, protection coordination, and arc-flash studies.' },
  { title: 'Battery & Energy Storage Analysis', desc: 'Cell-to-container sizing, thermal behaviour, and lifecycle modelling.' },
  { title: 'Renewable Energy System Design', desc: 'Solar and wind plant design, layout optimisation, and energy estimates.' },
  { title: 'Power Electronics Simulation', desc: 'Converter and inverter topologies, control loops, and switching analysis.' },
  { title: 'Grid Integration Studies', desc: 'Interconnection compliance, stability, and power quality assessment.' },
  { title: 'Design Validation & Optimization', desc: 'Independent verification and optimisation of third-party designs.' },
];

export const simWorkflow = [
  { n: '01', title: 'Requirement Analysis' }, { n: '02', title: 'System Modelling' },
  { n: '03', title: 'Simulation & Analysis' }, { n: '04', title: 'Performance Evaluation' },
  { n: '05', title: 'Design Optimization' }, { n: '06', title: 'Validation' },
  { n: '07', title: 'Technical Documentation' }, { n: '08', title: 'Implementation Support' },
];

export const simTools = [
  { name: 'MATLAB / Simulink', use: 'System & control modelling' },
  { name: 'ETAP', use: 'Electrical system studies' },
  { name: 'PSCAD', use: 'Transient simulation' },
  { name: 'AutoCAD Electrical', use: 'Schematics & layouts' },
  { name: 'ANSYS', use: 'Thermal & structural analysis' },
  { name: 'Python Toolchain', use: 'Data analysis & automation' },
];

export const simWhy = [
  { title: 'Industry-Focused Engineering', desc: 'Studies scoped around your operating reality, not textbook assumptions.' },
  { title: 'Practical Problem Solving', desc: 'Recommendations your site team can actually implement.' },
  { title: 'Cross-Domain Expertise', desc: 'EV, renewables, BESS, power electronics, and grid under one team.' },
  { title: 'Reliable Technical Support', desc: 'Documentation and implementation support through commissioning.' },
];

export const simCases = [
  { tag: 'BESS', title: '100 MWh BESS Grid-Integration Study', outcome: 'Interconnection approved first-pass; protection scheme validated across 14 fault scenarios.', img: `${U}/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1200&q=80`, alt: 'Energy storage infrastructure' },
  { tag: 'Solar', title: 'Utility Solar Plant Yield Optimisation', outcome: 'Layout redesign recovered 3.2% annual energy yield before construction began.', img: `${U}/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1200&q=80`, alt: 'Solar farm aerial view' },
  { tag: 'EV', title: 'DC Fast-Charge Network Load Study', outcome: 'Transformer sizing optimised across 40 sites, cutting capex 18% with no derating.', img: `${U}/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=1200&q=80`, alt: 'EV fast charging station' },
];

/* ---------- Services ---------- */
export const servicePhilosophy = [
  { n: '01', title: 'Plan Rigorously', desc: 'Every engagement starts with site truth and requirement clarity — not assumptions.' },
  { n: '02', title: 'Execute Transparently', desc: 'Milestones, quality gates, and reporting your team can see at all times.' },
  { n: '03', title: 'Support Continuously', desc: 'We stay past commissioning — operations, maintenance, and improvement.' },
];

export const servicePortfolio = [
  { title: 'Project Planning & Consulting', desc: 'Front-end advisory that sets projects up to succeed before ground is broken.', subs: ['Feasibility studies', 'Techno-commercial assessment', 'Regulatory & compliance guidance', 'Project structuring & DPRs'] },
  { title: 'Engineering & Design Support', desc: 'Detailed engineering that turns validated concepts into buildable designs.', subs: ['Detailed electrical design', 'Equipment specification & BoQ', 'Vendor evaluation support', 'Design review & value engineering'] },
  { title: 'Project Execution', desc: 'On-ground delivery with schedule, quality, and safety ownership.', subs: ['Site management & supervision', 'Installation & integration', 'Testing & commissioning', 'Quality & safety management'] },
  { title: 'Operations & Maintenance Support', desc: 'Keeping commissioned assets performing at their engineered potential.', subs: ['Preventive & corrective maintenance', 'Performance monitoring', 'Spares & inventory planning', 'Remote diagnostics support'] },
  { title: 'Audits & Assessments', desc: 'Independent verification of safety, performance, and compliance.', subs: ['Energy audits', 'Electrical safety audits', 'Asset condition assessment', 'Compliance & standards audits'] },
];

export const serviceFramework = [
  { n: '01', title: 'Understand Requirements' }, { n: '02', title: 'Site Assessment' },
  { n: '03', title: 'Solution Design' }, { n: '04', title: 'Project Planning' },
  { n: '05', title: 'Implementation' }, { n: '06', title: 'Testing & Commissioning' },
  { n: '07', title: 'Operations Support' }, { n: '08', title: 'Continuous Improvement' },
];

export const serviceIndustries = [
  { glyph: 'EM', name: 'Electric Mobility' }, { glyph: 'RE', name: 'Renewable Energy' },
  { glyph: 'BS', name: 'Battery Energy Storage' }, { glyph: 'CV', name: 'Commercial Vehicles' },
  { glyph: 'MF', name: 'Manufacturing' }, { glyph: 'UT', name: 'Utilities' },
  { glyph: 'SI', name: 'Smart Infrastructure' }, { glyph: 'GV', name: 'Government Projects' },
  { glyph: 'ED', name: 'Educational Institutions' },
];

export const serviceWhyPartner = [
  { title: 'End-to-End Execution', desc: 'From concept to commissioning and beyond — no handoff gaps.' },
  { title: 'Cross-Functional Expertise', desc: 'Skilling, engineering, and execution strengths on every project.' },
  { title: 'Industry-Focused Solutions', desc: 'Aligned with operational realities and business objectives.' },
  { title: 'Long-Term Support', desc: 'Ongoing technical guidance and continuous improvement post-delivery.' },
];

export const serviceModels = [
  { title: 'Project-Based', desc: 'Fixed-scope delivery with milestone-linked commercials.' },
  { title: 'Technical Consulting', desc: 'Expert advisory on demand for engineering and execution decisions.' },
  { title: 'Annual Support Contracts', desc: 'Year-round O&M, audits, and performance management.' },
  { title: 'Training & Implementation', desc: 'Deploy the technology and skill the team that runs it.' },
  { title: 'Enterprise Solutions', desc: 'Multi-site, multi-year programmes with a dedicated team.' },
];

/* ---------- Careers ---------- */
export const careersWhyJoin = [
  { title: 'Meaningful Impact', desc: 'Your projects commission real assets and place real people into careers.' },
  { title: 'Continuous Learning', desc: 'Access to our own CoEs, certifications, and cross-functional rotations.' },
  { title: 'Collaborative Environment', desc: 'Engineers, trainers, and field teams solving the same problem together.' },
  { title: 'Career Growth', desc: 'A fast-scaling company where responsibility comes early and visibly.' },
];

export const careersValues = [
  { glyph: 'IN', name: 'Integrity' }, { glyph: 'IV', name: 'Innovation' }, { glyph: 'CO', name: 'Collaboration' },
  { glyph: 'EX', name: 'Excellence' }, { glyph: 'SU', name: 'Sustainability' }, { glyph: 'CF', name: 'Customer Focus' },
];

export const careersJobs = [
  { title: 'Senior Power Systems Engineer', dept: 'Simulation', location: 'Pune', type: 'Full-time', exp: '5–8 yrs' },
  { title: 'EV Training Programme Lead', dept: 'Skilling', location: 'Bengaluru', type: 'Full-time', exp: '4–6 yrs' },
  { title: 'Site Execution Manager — Solar', dept: 'Services', location: 'Jaipur', type: 'Full-time', exp: '6–10 yrs' },
  { title: 'BESS Commissioning Engineer', dept: 'Services', location: 'Ahmedabad', type: 'Full-time', exp: '3–5 yrs' },
  { title: 'Curriculum Designer — Renewable Energy', dept: 'Skilling', location: 'Pune / Remote', type: 'Full-time', exp: '3–6 yrs' },
  { title: 'Business Development Manager', dept: 'Corporate', location: 'Mumbai', type: 'Full-time', exp: '4–8 yrs' },
];
export const careersDepts = ['All', 'Skilling', 'Simulation', 'Services', 'Corporate'];

export const careersInternships = [
  { title: 'Internship Opportunities', desc: 'Hands-on placements across skilling, simulation, and services teams.' },
  { title: 'Graduate Trainee Programme', desc: 'Structured 12-month rotation for fresh engineering graduates.' },
  { title: 'Industrial Training', desc: 'Short-term training attachments for diploma and ITI students.' },
  { title: 'Research Collaborations', desc: 'Joint projects with academic and research institutions.' },
  { title: 'Campus Recruitment', desc: 'Annual hiring drives at partner institutions.' },
];

export const careersBenefits = [
  { glyph: 'PD', name: 'Professional Development' }, { glyph: 'TT', name: 'Technical Training' },
  { glyph: 'FL', name: 'Flexible Learning' }, { glyph: 'CW', name: 'Collaborative Environment' },
  { glyph: 'IE', name: 'Industry Exposure' }, { glyph: 'CA', name: 'Career Advancement' },
];

export const careersProcess = [
  { n: '01', title: 'Application' }, { n: '02', title: 'Review' }, { n: '03', title: 'Assessment' },
  { n: '04', title: 'Interview' }, { n: '05', title: 'Selection' }, { n: '06', title: 'Offer & Onboarding' },
];

export const careersFaqs = [
  { q: 'How long does the hiring process take?', a: 'Typically 2–3 weeks from application to offer. Field roles with safety certifications may include an additional practical assessment.' },
  { q: 'Do you hire fresh graduates?', a: 'Yes — through our internship and graduate programme intakes, and directly into junior engineering and training roles.' },
  { q: 'Is remote work possible?', a: 'Corporate and design roles offer hybrid arrangements. Execution and training roles are site-based by nature.' },
  { q: 'Can Ecoconnect programme alumni apply?', a: 'Absolutely — a significant share of our trainers and field engineers came through our own programmes.' },
];

/* ---------- Contact ---------- */
export const contactFaqs = [
  { q: 'How quickly will I hear back?', a: 'Within one business day for all enquiries. Urgent project matters are routed directly to the relevant delivery head.' },
  { q: 'Do you work outside India?', a: 'Our delivery footprint is India-first, with simulation and advisory engagements served remotely for international clients.' },
  { q: 'Can I visit a Centre of Excellence?', a: 'Yes — partner and institutional visits are scheduled every month. Choose "Skilling Programmes" in the form and mention a preferred date.' },
  { q: 'How do government collaborations work?', a: 'We participate in state skilling missions and public programmes through formal MoUs. Select "Government Collaboration" and our partnerships team will respond.' },
];

export const contactCategories = ['Business Partnership', 'Skilling Programmes', 'Simulation Services', 'Technical Services', 'Government Collaboration', 'Academic Collaboration', 'Careers', 'Media', 'General'];

/* ---------- Site-wide search ---------- */
const staticPageEntries = [
  { type: 'Page', title: 'Home', desc: 'Building the capabilities behind the energy transition.', href: '/' },
  { type: 'Page', title: 'About Ecoconnect', desc: 'Company overview, vision, mission, leadership, journey, and ecosystem.', href: '/about' },
  { type: 'Page', title: 'Capabilities', desc: 'Skilling, Simulation, and Services — one integrated execution partner.', href: '/capabilities' },
  { type: 'Page', title: 'Skilling', desc: 'Industry-aligned training programmes, Centres of Excellence, and placement support.', href: '/skilling' },
  { type: 'Page', title: 'Simulation', desc: 'System modelling, electrical studies, validation, and engineering optimisation.', href: '/simulation' },
  { type: 'Page', title: 'Services', desc: 'Project planning, execution, operations & maintenance, and audits.', href: '/services' },
  { type: 'Page', title: 'Projects', desc: 'Project portfolio across clean energy and sustainable mobility.', href: '/projects' },
  { type: 'Page', title: 'Insights', desc: 'Blog, news, events, and announcements from the energy transition.', href: '/insights' },
  { type: 'Page', title: 'Careers', desc: 'Open positions, internships, and the general application.', href: '/careers' },
  { type: 'Page', title: 'Contact', desc: 'Enquiries, partnerships, and office information.', href: '/contact' },
];

export const searchIndex = [
  ...staticPageEntries,
  ...projects.map((p) => ({ type: 'Project', title: p.title, desc: `${p.capability} · ${p.industry} · ${p.location} — ${p.summary}`, href: `/projects/${p.slug}` })),
  ...articles.map((a) => ({ type: 'Article', title: a.title, desc: `${a.category} · ${a.date} — ${a.excerpt}`, href: `/insights/${a.slug}` })),
  ...events.map((e) => ({ type: 'Event', title: e.title, desc: `${e.status} · ${e.date} — ${e.desc}`, href: '/insights' })),
  ...announcements.map((an) => ({ type: 'Announcement', title: an.title, desc: `${an.date} — ${an.desc}`, href: '/insights' })),
  ...skillingProgrammes.map((pr) => ({ type: 'Programme', title: pr.name, desc: `${pr.category} · ${pr.duration} · ${pr.audience} — ${pr.overview}`, href: '/skilling' })),
  ...careersJobs.map((j) => ({ type: 'Job', title: j.title, desc: `${j.dept} · ${j.location} · ${j.type} · ${j.exp}`, href: '/careers' })),
];

export const searchTypes = ['All', 'Page', 'Project', 'Article', 'Event', 'Announcement', 'Programme', 'Job'];

export function getProject(slug) {
  return projects.find((p) => p.slug === slug) || null;
}
export function getArticle(slug) {
  return articles.find((a) => a.slug === slug) || null;
}
