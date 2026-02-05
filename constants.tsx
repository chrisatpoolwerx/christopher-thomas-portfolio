
import { Project } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'poolchex',
    title: 'Poolchex',
    subtitle: 'AI-Native Product Design',
    oneLine: 'Designing an AI-native assistant that transforms complex water chemistry into clear, actionable guidance for pool owners.',
    context: 'Pool water chemistry is inherently technical — dense with measurements, thresholds, and interdependencies. Yet most consumer tools present raw data, forcing homeowners to interpret specialist information without expertise.',
    role: 'Lead Product Designer',
    scope: [
      'Led product design from concept through launch',
      'Defined the conversational interaction model',
      'Crafted the visual language and behavioral system',
      'Prototyped AI-driven workflows',
      'Partnered closely with engineering and data teams'
    ],
    hardThings: [
      'Translating multi-variable chemical data into plain language',
      'Establishing trust in AI-generated recommendations',
      'Preventing cognitive overload during problem states',
      'Designing for both novice and expert pool owners'
    ],
    insight: 'Users don’t want to understand pool chemistry — they want to understand what to do next.',
    modelDescription: 'Rather than presenting test results as charts or dashboards, I designed Poolchex to function as an interpretive layer — transforming chemical readings into prioritized recommendations delivered through conversational UI.',
    principles: [
      { title: 'Progressive Disclosure', description: 'Surface only what is necessary in the moment, revealing deeper context as confidence grows.' },
      { title: 'Calm Authority', description: 'Recommendations are delivered with clarity and restraint to reinforce trust.' },
      { title: 'Action-Oriented Feedback', description: 'Every diagnostic moment leads naturally to a corrective step.' }
    ],
    craft: [
      { section: 'Crafting Clarity', content: 'The interface uses a restrained visual system to minimize perceptual noise, allowing recommendations to carry visual weight.' },
      { section: 'Behavioral Design', content: 'Motion is purposeful and minimal, reinforcing causality — actions feel connected to outcomes rather than decorative.' },
      { section: 'Conversational Tone', content: 'Language was intentionally engineered to balance expertise with approachability.' }
    ],
    outcome: 'Poolchex successfully launched as an AI-powered consumer platform, redefining how pool owners engage with water health. By replacing raw diagnostics with guided resolution, the product reduces uncertainty and empowers confident decision-making.',
    reflection: 'In future iterations, I would further compress diagnostic states to create an even greater sense of perceptual calm — particularly during high-attention problem scenarios.',
    heroImage: '/assets/projects/poolchex/hero.jpg',
    visuals: [
      'https://images.unsplash.com/photo-1519781542704-957ff19eff00?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200'
    ],
    tools: ['Sketch', 'Principle', 'Keynote', 'Pixelmator Pro', 'Figma', 'Xcode', 'Gemini']
  },
  {
  id: 'healthy-pool',
  title: 'Healthy Pool Plan',
  subtitle: 'Comprehensive Pool Assessment System',
  oneLine: 'Designing a systematic assessment experience that transforms complex pool diagnostics into clear, actionable insights for pool owners.',
  context: 'Traditional pool service is transactional — technicians fix immediate problems, but owners rarely understand the full picture of their pool\'s health. Healthy Pool Plan reimagined this interaction entirely: transforming a routine service visit into a comprehensive diagnostic experience that documents current conditions, identifies emerging issues, and provides clear guidance on what matters most.',
  role: 'Lead Product Designer',
  scope: [
    'Led end-to-end assessment experience design',
    'Designed the schema-driven inspection workflow for technicians',
    'Created the customer-facing report presentation layer',
    'Unified physical assessment and digital documentation',
    'Partnered with product, operations, and engineering to build the mobile and backend systems'
  ],
  hardThings: [
    'Translating highly technical pool diagnostics into customer-understandable insights',
    'Designing a schema flexible enough to capture every pool configuration',
    'Balancing thoroughness with technician efficiency during on-site assessments',
    'Creating reports that inform without overwhelming',
    'Orchestrating data flow between mobile assessment, backend processing, and report generation',
    'Building trust in findings customers couldn\'t independently verify'
  ],
  insight: 'Pool owners don\'t need to become experts — they need to know what\'s working, what\'s not, and what to do about it. The assessment experience must translate technical depth into confident next steps.',
  modelDescription: 'Rather than a simple checklist, the experience was structured as a systematic diagnostic journey — where technicians document pool structure, equipment, water quality, and safety systems in detail, then the system synthesizes this data into a clear narrative of pool health with prioritized recommendations.',
  principles: [
    { title: 'Comprehensive but Clear', description: 'Capture complete technical detail while presenting insights in plain language.' },
    { title: 'Guided Assessment', description: 'Structure the inspection workflow to ensure consistency and completeness across all technicians.' },
    { title: 'Evidence-Based Trust', description: 'Documentation and photos make findings tangible and verifiable.' },
    { title: 'Actionable Guidance', description: 'Every finding translates to clear recommendations customers can act on.' }
  ],
  craft: [
    { title: 'Schema-Driven Forms', description: 'Built a flexible field system that adapts to different pool types while maintaining consistent data quality — supporting everything from simple toggles to complex conditional fields.' },
    { title: 'Assessment Workflow', description: 'Designed the technician mobile experience to guide through pool structure, equipment inventory, water testing, and safety checks in a logical sequence that mirrors how pools actually work.' },
    { title: 'Visual Documentation', description: 'Integrated photo capture at key assessment points, making findings concrete and giving customers visual confirmation of what was observed.' },
    { title: 'Report Hierarchy', description: 'Structured the output to prioritize critical issues while providing complete detail — customers see what matters most first, with full documentation available when needed.' },
    { title: 'Data Translation Layer', description: 'Designed the bridge between technical field data and customer-readable insights, transforming database values into clear status indicators and recommendations.' },
    { title: 'Cross-Platform Continuity', description: 'Ensured the experience feels cohesive from mobile assessment capture to web-based report viewing, with consistent visual language and information architecture.' }
  ],
  outcomes: [
    'Created a systematic assessment approach that works across diverse pool configurations',
    'Enabled technicians to capture comprehensive pool data efficiently during service visits',
    'Established a scalable schema that supports both Australian and US market requirements',
    'Built trust through transparent, documented findings that customers can verify',
    'Transformed one-time assessments into baseline documentation for ongoing pool health tracking'
  ],
  reflection: 'The real challenge wasn\'t designing forms or reports — it was creating a system that respects both technical rigor and customer comprehension. Technicians need tools that don\'t slow them down. Customers need information they can actually use. The assessment experience succeeds when both parties gain clarity: technicians document with confidence, and owners understand their pool\'s true condition for the first time.',
    heroImage: '/assets/projects/healthy-pool/hero.jpg',
    visuals: [
      'https://images.unsplash.com/photo-1574672280600-4accfa5b6f98?auto=format&fit=crop&q=80&w=1200'
    ],
    tools: ['Sketch', 'Principle', 'Keynote', 'Pixelmator Pro', 'Figma', 'Flutter', 'Gemini']
  },
  {
    id: 'dominos-global',
    title: "Domino's Global App",
    subtitle: 'Designing at Planetary Scale',
    oneLine: 'Reimagining a global ordering platform to deliver faster, more intuitive experiences for millions worldwide.',
    context: "Domino's digital ordering platform is central to its global operations, handling millions of transactions daily across diverse markets. The DPE NextGen initiative aimed to modernize this platform, enhancing user experience, operational efficiency, and scalability.",
    role: 'Lead Product Designer, Global Platform',
    scope: [
      'Directed product design for mobile and web ordering experiences',
      'Defined interaction patterns for high-frequency purchasing',
      'Led simplification of complex customization flows',
      'Collaborated with engineering, product, and international stakeholders',
      'Guided design system evolution across markets'
    ],
    hardThings: [
      'Managing millions of concurrent users during peak demand',
      'Balancing deep product customization with user-friendly interfaces',
      'Ensuring localization across global markets',
      'Integrating promotional content without disrupting user flow',
      'Catering to both habitual and first-time users'
    ],
    insight: 'In high-frequency commerce, cognitive friction compounds — even small delays erode momentum.',
    modelDescription: 'The redesign focused on preserving user momentum by reducing decision fatigue, compressing steps, and making progress continuously visible. For instance, the customization process was streamlined from a 7-step to a progressive flow, enhancing user engagement.',
    momentumDescription: 'The redesign focused on preserving user momentum by reducing decision fatigue, compressing steps, and making progress continuously visible. The customization process was streamlined from a multi-step journey to a progressive flow, enhancing user engagement and reducing drop-off.',
    systemsDescription: 'To support global consistency while enabling regional flexibility, we evolved a modular design system. This allowed teams to scale improvements without fragmenting the experience, ensuring a cohesive user interface across markets.',
    principles: [
      { title: 'Momentum Preservation', description: 'Reducing decision points to ensure the user never feels "stuck" in a configuration loop.' },
      { title: 'Global Modularity', description: 'Patterns that scale across cultures while allowing for local operational requirements.' },
      { title: 'Progressive Disclosure', description: 'Surface options contextually to prevent overwhelming users with choices upfront.' },
      { title: 'Continuous Feedback', description: 'Progress is always visible — users know exactly where they are in the journey.' }
    ],
    craft: [
      { section: 'Hierarchy', content: 'Visual hierarchy was recalibrated to emphasize decision-critical elements while reducing promotional noise, supporting rapid scanning for repeat customers.' },
      { section: 'Motion', content: 'Micro-interactions were tuned to reinforce responsiveness, ensuring the interface felt immediate even during complex configurations.' },
      { section: 'Information Density', content: 'Content was structured to support rapid scanning, enabling repeat customers to navigate flows almost reflexively.' }
    ],
    outcome: 'The platform contributed to over $1B in digital revenue growth while significantly improving ordering efficiency. User engagement metrics showed a marked increase, and customer feedback highlighted the enhanced usability and speed of the new interface.',
    reflection: 'Designing at this scale reinforced the importance of restraint — the most impactful improvements were often the least visible, quietly removing friction from behaviors customers repeat every week.',
    heroImage: '/assets/projects/dominos-global/hero.jpg',
    visuals: [
      '/assets/projects/dominos-global/craft-hierarchy.jpg',
      '/assets/projects/dominos-global/craft-motion.jpg',
      '/assets/projects/dominos-global/craft-density.jpg'
    ],
    tools: ['Sketch', 'Principle', 'Keynote', 'Pixelmator Pro', 'Zeplin']
  },
  {
    id: 'ar-pizza',
    title: 'AR Pizza Chef',
    subtitle: 'Spatial Interaction',
    oneLine: 'Reimagining food customization through spatial interaction.',
    context: 'Customizing a pizza is inherently visual, yet traditional interfaces reduce the experience to lists and modifiers. AR Pizza Chef explored a more natural model — allowing customers to construct their pizza in physical space, transforming configuration into an intuitive, hands-on experience.',
    role: 'Lead Product Designer',
    scope: [
      'Led interaction design for the AR experience',
      'Defined spatial manipulation patterns',
      'Crafted the visual behavior of ingredients',
      'Directed prototyping and experiential testing',
      'Collaborated with engineering to align interaction with technical constraints'
    ],
    hardThings: [
      'Limited precedent for spatial food interaction',
      'Balancing realism with interface clarity',
      'Preventing gesture fatigue',
      'Maintaining responsiveness in 3D space',
      'Ensuring the experience enhanced — rather than slowed — ordering'
    ],
    insight: 'When customization becomes physical, decision-making becomes faster and more confident.',
    modelDescription: 'Rather than choosing toppings from a list, customers assemble their pizza directly — placing ingredients, adjusting quantity, and immediately understanding the outcome.',
    principles: [
      { title: 'Direct Manipulation', description: 'Objects behave as users expect in the physical world.' },
      { title: 'Immediate Feedback', description: 'Every gesture produces a visible, satisfying response.' },
      { title: 'Play Without Friction', description: 'Delight should never introduce delay into the ordering flow.' },
      { title: 'Familiarity Through Physics', description: 'Motion and placement mirror real-world behavior to reduce learning time.' }
    ],
    craft: [
      { section: 'Spatial Restraint', content: 'Ingredient motion was intentionally controlled to avoid perceptual chaos, ensuring the environment felt responsive rather than theatrical.' },
      { section: 'Depth & Focus', content: 'Visual layering guides attention naturally toward the active plane, preventing cognitive drift within the 3D space.' },
      { section: 'Material Realism', content: 'Textures were calibrated to feel believable without tipping into simulation — preserving clarity over spectacle.' }
    ],
    outcome: 'The experience demonstrated how spatial computing can transform transactional interfaces into intuitive, experiential ones — earning industry recognition and informing future interaction exploration.',
    reflection: 'Designing for emerging mediums reinforced the importance of restraint — the most successful moments felt inevitable, not novel.',
    heroImage: 'https://images.unsplash.com/photo-1593504049359-74330189a355?auto=format&fit=crop&q=80&w=2000',
    visuals: [
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&q=80&w=1200'
    ],
    tools: ['Sketch', 'Principle', 'Keynote', 'Pixelmator Pro', 'Xcode', 'Reality Composer']
  }
];
