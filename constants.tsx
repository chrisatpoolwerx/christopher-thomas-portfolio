
import { Project } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'poolchex',
    title: 'Poolchex',
    subtitle: 'Intelligent Pool Care Assistant',
    oneLine: 'Designing an AI-native pool care assistant that transforms complex chemistry into calm, guided action — wrapped in an interface that feels intrinsically connected to water.',
    context: "Pool maintenance is information-dense, technical, and often reactive. Most tools present raw measurements — pH, chlorine, alkalinity — leaving homeowners to interpret specialist data without expertise. Poolchex reimagines this relationship entirely. Rather than visualizing chemistry, the product behaves like an expert: interpreting readings, generating treatment plans on-device, and guiding owners toward resolution with clarity and confidence. The ambition was not to build a better utility — but to design an experience that felt contextual, intelligent, and deeply native to iOS.",
    role: 'Lead Product Designer',
    scope: [
      'Led product design from concept through build',
      'Defined the interaction model for AI-guided pool care',
      'Designed the visual system and component language',
      'Directed computer vision capture UX',
      'Crafted motion, haptics, and micro-interaction strategy',
      'Partnered closely with engineering to align performance with experience'
    ],
    hardThings: [
      'Creating a mathematically-generated water simulation that feels alive without competing for attention',
      'Making camera-based strip scanning feel reliable through alignment, confidence, and fallback states',
      'Balancing on-device AI intelligence with deterministic safety constraints',
      'Designing haptic and motion systems that make glass feel physical'
    ],
    insight: "Users don’t want to understand pool chemistry — they want to understand what to do next.",
    modelDescription: 'Poolchex was guided by three principles: Reduce cognitive burden wherever possible. Make intelligence perceptible, not abstract. Create emotional resonance without sacrificing clarity.',
    principles: [
      { title: 'Reduce Cognitive Burden', description: 'Transform multi-variable chemistry into immediate comprehension through a single health score and AI-generated explanations.' },
      { title: 'Perceptible Intelligence', description: 'Streaming responses, contextual haptics, and matched geometry make the AI feel present rather than hidden.' },
      { title: 'Emotional Resonance', description: 'Time-shifting palettes and organic water motion create an interface that honors the sensory relationship pool owners have with water.' }
    ],
    craft: [
      { section: 'The Animated Water Field', content: 'Every screen is backed by a mathematically-generated water simulation — not video, not gradient — but a live mesh driven by interfering wave equations combining slow structural swells with higher-frequency surface ripples.' },
      { section: 'Time as Material', content: 'The palette shifts throughout the day — softened pastels at dawn, vivid cyan at noon, warm reflections at dusk, moonlit silvers at night. The app looks different at breakfast than it does at midnight.' },
      { section: 'Performance as Craft', content: 'Motion only delights when it remains invisible to the processor. Animation begins at 30fps and ramps to 60fps once stable. The mesh renders as a single cached layer with hit testing disabled.' }
    ],
    outcome: 'Poolchex transformed pool care from interpretive guesswork into guided action — combining computer vision, on-device intelligence, and a cohesive design system into a single, calm experience. Rather than behaving like a maintenance tool, the product feels like a knowledgeable companion.',
    reflection: 'Designing Poolchex reinforced a belief I return to often: The best intelligent products don\'t announce their intelligence — they express it through clarity.',
    heroImage: '/assets/projects/poolchex/hero.jpg',
    visuals: [
      '/assets/projects/poolchex/water-field.jpg',
      '/assets/projects/poolchex/time-palette.jpg',
      '/assets/projects/poolchex/performance.jpg'
    ],
    tools: ['Sketch', 'Xcode', 'Principle', 'SwiftUI', 'Core ML', 'Vision']
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
      '/assets/projects/dominos-global/craft-motion.m4v',
      '/assets/projects/dominos-global/craft-density.jpg'
    ],
    tools: ['Sketch', 'Principle', 'Keynote', 'Pixelmator Pro', 'Zeplin']
  },
  {
    id: 'ar-pizza',
    title: 'AR Pizza Chef',
    subtitle: 'Spatial Commerce Experience',
    oneLine: 'Turning pizza customization into a joyful, high-conversion spatial experience — integrated directly into ordering.',
    context: "Customising a pizza is typically a necessary but tedious step — dense with options, low delight, and easy to rush. We explored how AR could transform that moment into something tactile and expressive without breaking the ordering flow.",
    role: 'Lead Product Designer, Ordering Platform / Next Gen UI',
    scope: [
      'Led UX + UI design for New Pizza Chef as an integrated ordering experience',
      'Ran focus groups and user research to validate direction and shape the concept',
      'Adapted the Next Generation UI system into AR (card metaphor, navigation colours)',
      'Defined interaction patterns, animations, and delight mechanics',
      'Partnered with Deloitte Digital under a tight 6-month delivery window'
    ],
    hardThings: [
      'Early concept started as standalone AR app; research showed embedding into core ordering was the winning path',
      'Shipping fast: ~6-month turnaround with external build partner (Deloitte Digital)',
      'Inclusivity: not every device supported ARKit, and not every user wanted camera-on AR',
      'Making "joy" real: delight had to be intentional, not noisy — and support comprehension'
    ],
    insight: "AR shouldn't be a novelty layer — it should make a real workflow feel easier, clearer, and more engaging.",
    modelDescription: 'Under-thumb customisation with direct manipulation. A swipe-navigable ingredient picker keeps customisations ergonomic, with single-gesture add/remove interactions.',
    arOptionalDescription: "For devices without ARKit — or users who simply didn't want to place a pizza on the floor — we added a camera-off toggle and rendered the pizza against a neutral background.",
    principles: [
      { title: 'Under-Thumb Navigation', description: 'Swipe-navigable ingredient picker keeps customisation fast and ergonomic.' },
      { title: 'AR Optional', description: 'Camera-off toggle for devices without ARKit or users who prefer it.' },
      { title: 'Direct Manipulation', description: 'Single-gesture add/remove interactions for speed and clarity.' },
      { title: 'Designed Delight', description: 'Easter egg animations reward exploration without sacrificing speed.' }
    ],
    craft: [
      { section: 'Tactile Animation', content: 'Motion as communication: animation conveyed ingredient changes with tactility and clarity, not decoration.' },
      { section: 'Designed Delight', content: 'Custom 2D "Easter egg" animations for specific ingredients rewarded exploration and reinforced joy as a design goal.' },
      { section: 'System Consistency', content: 'First implementation of Next Generation UI inside the Domino\'s app: card-metaphor UI and updated navigation colour system adapted for AR.' }
    ],
    outcomes: [
      'Shipped as an upgrade inside the Domino\'s ordering app, not a standalone experiment',
      'Recognised by IDC\'s 2019 Digital Transformation Awards as Omni Experience Innovator — won overall globally in category',
      '"Beloved feature" impact: repeatedly called out in customer reviews as surprisingly great/fun',
      'Commercial impact: users who built a pizza in New Pizza Chef were almost certain to convert',
      'Expanded to Mac via iOS apps with higher-resolution textures, positioned for global rollout'
    ],
    reflection: "The biggest learning was restraint: the best 'wow' moments were the ones that made the workflow feel more natural — not more complicated. The bar for delight in commerce is high: it has to earn its place by improving comprehension and momentum.",
    heroImage: '/assets/projects/ar-pizza/hero.jpg',
    visuals: [
      '/assets/projects/ar-pizza/craft-animation.mp4',
      '/assets/projects/ar-pizza/craft-delight.jpg',
      '/assets/projects/ar-pizza/craft-system.jpg'
    ],
    tools: ['Sketch', 'Principle', 'Keynote', 'Pixelmator Pro', 'Xcode', 'Reality Composer']
  }
];
