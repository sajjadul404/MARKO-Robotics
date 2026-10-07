export const PRODUCTS = [
  {
    id: 'ai-bot',
    title: 'AI Bot',
    tagline: 'Enterprise Autonomous Reasoning & Conversational Core',
    description:
      'Empower operations with intelligent, secure conversational AI. Automate complex client workflows with seamless reasoning engines.',
    longDescription:
      'Engineered for high-throughput commercial operations, the MARKO AI Bot combines deterministic multi-agent orchestration with zero-retention enterprise encryption. Deploy across customer operations, internal engineering desks, and automated supply chain dispatch with sub-120ms latency.',
    price: '$1,499',
    numericPrice: 1499,
    image: '/src/assets/images/product_ai_brain_1791063713710.jpg',
    specs: [
      'Multi-agent deterministic workflow execution',
      'Zero-retention enterprise data encryption (SOC2 Type II)',
      'Sub-120ms conversational response latency',
      'Direct ERP, CRM, and warehouse bus integration',
      'Custom domain fine-tuning and local guardrail enforcement',
      'Real-time audit logs and human-in-the-loop escalation',
    ],
    metrics: [
      { label: 'Response Latency', value: '< 120ms' },
      { label: 'Concurrent Agents', value: 'Up to 500' },
      { label: 'System Uptime SLA', value: '99.99%' },
    ],
    tiers: [
      {
        name: 'Standard Node License',
        price: 1499,
        summary: 'Up to 50 concurrent autonomous agents + standard API bus',
      },
      {
        name: 'Enterprise Cluster',
        price: 2999,
        summary: 'Unlimited agents + dedicated on-premise neural gateway',
      },
    ],
    includedItems: [
      'MARKO Neural Core Runtime License',
      'Pre-built ERP / CRM / Warehouse Connectors',
      'Dedicated Onboarding & Architecture Calibration',
      '24/7 Priority Engineering Support',
    ],
    deploymentTime: 'Under 48 hours',
    architecture: 'Distributed Neural Core',
    sku: 'MRK-AI-900',
  },
  {
    id: 'robotics',
    title: 'Robotics',
    tagline: '6-Axis & 7-Axis Precision Industrial Manipulation Unit',
    description:
      'Advanced robotic arms and mobility devices engineered for extreme precision, warehouse automation, and automated laboratory work.',
    longDescription:
      'Constructed with aerospace-grade titanium-aluminum composite linkages and optical torque sensors on every joint, MARKO Robotics arms deliver 0.02mm repeatability under continuous 24/7 industrial workloads. Ready for cleanroom laboratories, PCB assembly, and high-density fulfillment centers.',
    price: '$12,900',
    numericPrice: 12900,
    image: '/src/assets/images/product_robotics_arm_1791063726622.jpg',
    specs: [
      '6-axis & 7-axis force-torque feedback articulation',
      '0.02mm repeatability tolerance under full payload',
      'Cleanroom ISO Class 4 certified actuator seals',
      'Real-time collision avoidance via 360° optical array',
      'Modular quick-swap end-effector pneumatic & electric mount',
      'ROS 2 & MARKO Autonomous Control SDK included',
    ],
    metrics: [
      { label: 'Repeatability', value: '±0.02 mm' },
      { label: 'Max Payload', value: '18.5 kg' },
      { label: 'Reach Radius', value: '1,350 mm' },
    ],
    tiers: [
      {
        name: 'Aegis-7 Base Manipulator',
        price: 12900,
        summary: '6-axis industrial arm + standard controller cabinet',
      },
      {
        name: 'Aegis-7 Pro + Vision Array',
        price: 16400,
        summary: '7-axis arm + dual stereo depth cameras & precision gripper',
      },
    ],
    includedItems: [
      'Aegis-7 Articulated Robotic Arm Assembly',
      'High-Frequency Real-Time Control Cabinet',
      'Optical Safety Curtain & Emergency Stop Module',
      'On-Site Calibration & 3-Year Hardware Warranty',
    ],
    deploymentTime: '2–4 weeks on-site calibration',
    architecture: 'Aegis-7 Mechatronic Frame',
    sku: 'MRK-RBT-702',
  },
  {
    id: 'smart-tech',
    title: 'Smart Technology',
    tagline: 'Commercial Spatial Telemetry & Connected IoT Mesh',
    description:
      'Connected IoT networks and sensory array hardware giving your commercial facilities real-time spatial awareness and optimization.',
    longDescription:
      'Transform commercial buildings, factories, and logistics hubs into self-optimizing environments. The MARKO Smart Technology suite combines ultra-low-power spatial sensor nodes with an edge-computed digital twin hub for real-time energy, occupancy, and equipment telemetry.',
    price: '$3,250',
    numericPrice: 3250,
    image: '/src/assets/images/product_smart_iot_1791063737178.jpg',
    specs: [
      'Mesh telemetry across up to 10,000 spatial nodes',
      'Predictive HVAC, power, and assembly load balancing',
      'Edge-computed anomaly detection with local failover',
      'Unified digital twin spatial visualization API',
      'Sub-GHz & Wi-Fi 6E dual-band encrypted radio backhaul',
      'Zero-downtime over-the-air firmware orchestration',
    ],
    metrics: [
      { label: 'Mesh Capacity', value: '10,000 Nodes' },
      { label: 'Energy Savings', value: 'Up to 34%' },
      { label: 'Edge Sync Rate', value: '100 Hz' },
    ],
    tiers: [
      {
        name: 'Commercial Starter Kit (25 Nodes)',
        price: 3250,
        summary: '1 Edge Hub + 25 multi-spectrum spatial telemetry nodes',
      },
      {
        name: 'Facility Full Mesh (100 Nodes)',
        price: 8900,
        summary: '2 Redundant Edge Hubs + 100 spatial telemetry nodes',
      },
    ],
    includedItems: [
      'MARKO Spatial Edge Compute Hub',
      'Multi-Sensor Telemetry Nodes (Thermal, Optical, Acoustic)',
      'Digital Twin Dashboard & API Access Key',
      'Mounting Hardware & PoE Injector Kit',
    ],
    deploymentTime: '1 week modular rollout',
    architecture: 'Spatial Node Mesh',
    sku: 'MRK-IOT-450',
  },
];

export const PULSE_GALLERY = [
  {
    id: 'synthesis-hq',
    title: 'Synthesis Global Operations Center',
    date: 'October 14, 2026',
    location: 'Silicon Valley, CA',
    category: 'Campus Tour',
    image: '/src/assets/images/pulse_lobby_office_1791063761034.jpg',
    summary:
      'Inside our flagship architectural hub where hardware systems engineers and AI researchers collaborate under one roof.',
  },
  {
    id: 'architecture-review',
    title: 'Next-Gen Spatial Hardware Blueprint Review',
    date: 'November 02, 2026',
    location: 'Silicon Valley, CA',
    category: 'Engineering Workshop',
    image: '/src/assets/images/pulse_team_collaboration_1791063772409.jpg',
    summary:
      'Cross-disciplinary systems architects finalizing structural schematics for modular industrial automation deployments.',
  },
  {
    id: 'quantum-forum',
    title: 'Quantum Leap Global Innovation Forum',
    date: 'December 09, 2026',
    location: 'San Francisco, CA',
    category: 'Keynote Summit',
    image: '/src/assets/images/pulse_global_forum_1791063783270.jpg',
    summary:
      'Annual keynote unveiling new reasoning engine benchmarks and autonomous manufacturing partnerships for global enterprises.',
  },
  {
    id: 'aether-lab',
    title: 'Aether Robotics Precision Actuator Lab',
    date: 'January 18, 2027',
    location: 'Palo Alto, CA',
    category: 'Live Demonstration',
    image: '/src/assets/images/pulse_robotics_engineers_1791063795254.jpg',
    summary:
      'Hands-on calibration and stress-testing of fine-motor robotic manipulators engineered for laboratory automation.',
  },
];

export const RESEARCH_PAPERS = [
  {
    id: 'paper-aegis-kinematics',
    title:
      'Deterministic Torque Feedback & Sub-Millimeter Actuation in 7-Axis Robotic Manipulators',
    authors: 'Dr. Elena Vance, Marcus Chen, Dr. Aris Thorne',
    date: 'September 2026',
    category: 'Mechatronics & Control Systems',
    readTime: '14 min read',
    image: '/src/assets/images/about_blueprint_schematic_1791063749796.jpg',
    description:
      'This paper presents the mechanical and algorithmic architecture behind the Aegis-7 robotic hand and manipulator assembly. By combining optical harmonic-drive strain gauges with a 2kHz closed-loop control bus, our system eliminates micro-oscillations during high-speed pick-and-place and fragile laboratory handling.',
    keyFindings: [
      '42% reduction in trajectory settling time across variable payloads up to 18.5 kg.',
      '0.02mm positional repeatability verified over 1.2 million continuous actuation cycles.',
      'Real-time slip detection within 1.8 milliseconds using fingertip optical tactile arrays.',
    ],
    paperUrl: 'https://arxiv.org/abs/2303.04137',
  },
  {
    id: 'paper-neural-core',
    title:
      'Zero-Retention Multi-Agent Reasoning Engines for Autonomous Industrial Workflows',
    authors: 'Dr. Soren Lindqvist, Priya Nair, Devon Brooks',
    date: 'July 2026',
    category: 'Artificial Intelligence & Reasoning',
    readTime: '11 min read',
    image: '/src/assets/images/product_ai_brain_1791063713710.jpg',
    description:
      'Enterprise automation requires reasoning models that never hallucinate unsafe hardware states or leak proprietary telemetry. We introduce a formally verified planner that translates natural-language operational directives into deterministic state-machine execution graphs.',
    keyFindings: [
      'Sub-120ms end-to-end planning latency across 500 concurrent autonomous agents.',
      '100% compliance with formal safety invariants on live warehouse dispatch buses.',
      'Zero-retention memory enclaves ensuring complete data sovereignty for regulated industries.',
    ],
    paperUrl: 'https://arxiv.org/abs/2308.08155',
  },
  {
    id: 'paper-spatial-mesh',
    title:
      'High-Density Spatial Telemetry & Edge Digital Twins for Autonomous Facilities',
    authors: 'Dr. Kenji Sato, Clara Rossi, Omar Farooq',
    date: 'May 2026',
    category: 'Spatial Computing & IoT',
    readTime: '9 min read',
    image: '/src/assets/images/product_smart_iot_1791063737178.jpg',
    description:
      'Large-scale commercial and manufacturing facilities suffer from RF interference and sensor drift. This study details our self-healing sub-GHz and Wi-Fi 6E spatial node mesh capable of synchronizing 10,000+ acoustic, thermal, and optical sensors into a unified 3D digital twin.',
    keyFindings: [
      '99.98% packet delivery reliability in high-interference steel manufacturing plants.',
      '34% average reduction in facility HVAC and peak assembly power consumption.',
      'Autonomous localized failover within 8ms when primary cloud backhaul is severed.',
    ],
    paperUrl: 'https://arxiv.org/abs/2310.06825',
  },
];

export const INITIAL_ORDERS = [
  {
    id: 'MRK-4092',
    createdAt: '2026-10-06 14:20',
    productId: 'robotics',
    productTitle: 'Robotics',
    quantity: 1,
    totalAmount: 12900,
    fullName: 'Sajjadul Islam',
    email: '20244103008@cse.bubt.edu.bd',
    company: 'BUBT Robotics Lab',
    phone: '01560060092',
    address: 'Mirpur-2, Dhaka, Bangladesh',
    paymentMethod: 'bKash',
    senderNumber: '01711849200',
    transactionId: 'BKS849201X',
    status: 'Verified',
  },
  {
    id: 'MRK-4091',
    createdAt: '2026-10-05 18:45',
    productId: 'ai-bot',
    productTitle: 'AI Bot',
    quantity: 2,
    totalAmount: 2998,
    fullName: 'Tanvir Ahmed',
    email: 'tanvir@apexautomation.io',
    company: 'Apex Industrial Labs',
    phone: '01819540320',
    address: 'Gulshan-2, Dhaka, Bangladesh',
    paymentMethod: 'Nagad',
    senderNumber: '01819540320',
    transactionId: 'NGD738291X',
    status: 'Pending',
  },
  {
    id: 'MRK-4090',
    createdAt: '2026-10-04 11:10',
    productId: 'smart-tech',
    productTitle: 'Smart Technology',
    quantity: 1,
    totalAmount: 3250,
    fullName: 'Dr. Elena Vance',
    email: 'elena@synthesis.ai',
    company: 'Synthesis Operations',
    phone: '+1 (415) 890-2341',
    address: '450 Automation Parkway, San Jose, CA',
    paymentMethod: 'VISA',
    senderNumber: '4532 •••• 8891',
    transactionId: 'VISA-992041',
    status: 'Shipped',
  },
];

export const INITIAL_MESSAGES = [
  {
    id: 'MSG-101',
    createdAt: '2026-10-06 12:15',
    name: 'Rafiqul Hasan',
    email: 'rafiqul@dhakatech.com',
    industry: 'Robotics & Automation',
    message:
      'We are looking to deploy 3 Aegis-7 robotic arms for our PCB assembly line in Gazipur. Could we schedule a technical demo this week?',
    status: 'Unread',
  },
  {
    id: 'MSG-102',
    createdAt: '2026-10-05 09:30',
    name: 'Nusrat Jahan',
    email: 'nusrat@neuralworks.bd',
    industry: 'AI Bot Platform',
    message:
      'Interested in integrating MARKO AI Bot with our existing ERP and warehouse inventory system.',
    status: 'Resolved',
  },
];

