// UX Competency Definitions
const competencies = {
    ux2: {
        role: "UX 2 - Junior Designer",
        description: "You're a solid contributor on intermediate tasks and own small to medium projects. You're broadening your knowledge and developing deeper skills. You've shifted from a purely reactive resource to a more active partner in the product trio.",
        questions: [
            {
                id: "ux2_product_strategy",
                competency: "Product Strategy",
                title: "Product Strategy (Before you work)",
                description: "You're shifting from reactive execution to proactive problem-solving. You're learning to see beyond the stated requirements to the real user and business needs underneath, using research not just to validate solutions, but to reframe problems more effectively. You actively practice Continuous Discovery Habits.",
                bullets: [
                    "You independently plan and conduct weekly user touchpoints (interviews, lightweight usability tests) and use insights to refine project scope",
                    "You identify gaps in problem definitions and propose solutions backed by user data, mapping assumptions and testing them with users",
                    "You understand how design impacts business outcomes (conversion, retention, engagement) and regularly use both qualitative and quantitative data to measure success",
                    "You have a deep understanding of the current tooling industry and know when to focus on the big picture versus zoom into details"
                ]
            },
            {
                id: "ux2_craft_quality",
                competency: "Craft and Quality",
                title: "Craft and Quality (While you work)",
                description: "Your craft has matured to the point where quality is becoming automatic rather than effortful. You've internalized the fundamentals deeply enough that you can focus on the harder problems, complex information architecture, system-level thinking, and designing for edge cases without being reminded.",
                bullets: [
                    "Your work is crisp and thorough with very few pixel-artifacts, misalignments, or gestalt principle issues",
                    "You create and refine information architecture across features, ensuring logical consistency, and design moderate-to-complex flows leveraging established Zion UI patterns",
                    "You actively use and contribute feedback to Zion UI, identifying gaps or improvement opportunities",
                    "You produce mid-to-high-fidelity prototypes for usability validation and rapid experimentation, iterate based on user feedback, and your work exemplifies FamilySearch's design principles",
                    "You design for accessibility by default and can identify and fix common A11y issues"
                ]
            },
            {
                id: "ux2_communication",
                competency: "Communication and Collaboration",
                title: "Communication and Collaboration (Working together)",
                description: "You're an effective communicator and collaborator. Importantly, you care less about \"being right\" and more about helping your team move forward, you check your ego at the door. You're a true partner in the product trio.",
                bullets: [
                    "You present work to broader stakeholders, document decisions clearly, and can easily explain the rationale for design decisions within a larger context",
                    "You share design iterations regularly and research discoveries with the trio, setting an example for \"open design\" and collaborative sense-making",
                    "You care less about \"being right\" and more about helping your team move forward, fostering transparency and trust through your collaborative approach",
                    "You respectfully challenge assumptions when needed and advocate for user needs even when facing pushback"
                ]
            },
            {
                id: "ux2_action_impact",
                competency: "Action and Impact",
                title: "Action and Impact (Shipping)",
                description: "You've developed strong delivery instincts and understand the rhythm of product development. You know how to maintain momentum, breaking through obstacles, managing your own energy, and making smart trade-offs between quality and speed without needing someone to tell you which to prioritize.",
                bullets: [
                    "You consistently meet deadlines, sometimes ahead of schedule, and embrace \"perfect is the enemy of good\", you know when to ship to learn",
                    "You ship small experiments to validate assumptions quickly rather than waiting for perfect solutions",
                    "You file bugs regularly and unblock yourself swiftly, maintaining momentum",
                    "You measure outcomes after launch, not just completion, and adjust based on what you learn; you're consistently able to unblock yourself to never be stalled or idle",
                    "When experiments fail, you share learnings openly and iterate quickly"
                ]
            },
            {
                id: "ux2_leveling_up",
                competency: "Leveling Up Others",
                title: "Leveling Up Others (Internal influence)",
                description: "You're transitioning from focusing solely on your own growth to actively investing in others. You're discovering that teaching reinforces your own understanding and that lifting others up strengthens the entire team.",
                bullets: [
                    "You actively participate in design critiques, offering constructive, clear, actionable feedback regularly",
                    "You mentor interns and UX 1 designers in fundamental tasks and processes, including Continuous Discovery practices",
                    "You facilitate design sessions when needed and seek opportunities to help others outside of your standard projects"
                ]
            },
            {
                id: "ux2_independence",
                competency: "Independence",
                title: "Independence (Self-sufficiency)",
                description: "You've achieved reliable independence on most standard work. You can carry projects through from ambiguous beginning to shipped end, sensing risks before they become problems and making sound judgment calls without constant validation.",
                bullets: [
                    "You carry small-to-medium projects end-to-end with minimal check-ins and proactively flag risks or issues before they become blockers",
                    "You identify next steps intuitively and rarely wait for direction",
                    "You're confident in making project-level decisions without heavy oversight"
                ]
            },
            {
                id: "ux2_skill_development",
                competency: "Skill Development",
                title: "Skill Development",
                description: "You're moving toward mastery of your craft. Focus on deepening expertise in specific areas, developing your strategic thinking, and building your voice in the design community.",
                bullets: [
                    "You've achieved mastery of core design tools and workflows; you can work efficiently and teach others",
                    "You can identify and articulate nuanced design quality issues: hierarchy problems, visual weight, rhythm, balance, accessibility barriers",
                    "You understand advanced design principles and can apply them intentionally with critical judgment",
                    "You're proficient with analytics platforms (understanding conversion funnels, user behavior patterns, A/B test results), building expertise in specific areas (accessibility, motion, interaction design, AI integration), and becoming more active in the design community"
                ]
            }
        ]
    },
    ux4: {
        role: "UX 4 - Senior Designer",
        description: "You're a clear organizational leader. People across the company look to you for advice and guidance. You oversee major product areas or multiple product lines. You deeply understand the business and proactively identify strategic opportunities.",
        questions: [
            {
                id: "ux4_product_strategy",
                competency: "Product Strategy",
                title: "Product Strategy (Before you work)",
                description: "You operate at a strategic level, shaping how the organization thinks about and invests in user experience. You partner with executives as a peer, translating user insights into business strategy and ensuring design thinking and Continuous Discovery practices permeate the highest levels of product and company direction.",
                bullets: [
                    "You establish robust discovery approaches that inform critical decisions across product lines and mentor teams in planning, conducting, and interpreting research at an organizational level",
                    "You're a clear subject-matter expert on the product with strong intuition on what's needed, and you're frequently looked to for guidance on strategic direction",
                    "You connect design decisions to key business outcomes (revenue, retention, acquisition, engagement), present compelling ROI arguments to leadership, and partner with executives to shape product roadmaps",
                    "You champion outcome-based thinking organization-wide, helping shift culture from \"shipping features\" to \"delivering measurable value\""
                ]
            },
            {
                id: "ux4_craft_quality",
                competency: "Craft and Quality",
                title: "Craft and Quality (While you work)",
                description: "You define what excellent design means at FamilySearch, not through mandates, but through work that's so consistently strong that it becomes the natural reference point. Your influence on quality extends beyond individual projects to shape organizational standards and, at times, industry expectations.",
                bullets: [
                    "You oversee structural consistency across multiple product lines and set frameworks others adopt",
                    "You set the bar for quality at FamilySearch, people look up to your work and often follow your patterns",
                    "You champion and guide Zion UI's evolution, ensuring system decisions connect to user outcomes and organizational goals, and making strategic decisions about when to expand or refine the system",
                    "You consistently produce designs that raise the collective quality bar, in some cases influencing industry thinking, and create design patterns others adopt across the ecosystem",
                    "You establish accessibility standards and practices organization-wide, ensuring FamilySearch remains a leader in inclusive design"
                ]
            },
            {
                id: "ux4_communication",
                competency: "Communication and Collaboration",
                title: "Communication and Collaboration (Working together)",
                description: "You've become a cultural anchor for the organization, someone who embodies what great collaboration looks like regardless of seniority. Your influence extends across departments because you lead with humility, maintain perspective during challenges, and improve how teams work together rather than just what they produce.",
                bullets: [
                    "You embody the company's values and actively promote company culture, you're seen as a role model for collaboration across trios and departments",
                    "Despite your seniority and expert knowledge, you always act with humility and without ego, maintaining constructive energy even during setbacks and modeling resilience for others",
                    "You find ways to improve process and communication across departments, not just within design, and demonstrate the value of design thinking to non-designers",
                    "You mentor executives and senior leaders in user-centered and outcome-based thinking, helping them understand the strategic value of design",
                    "You navigate complex organizational dynamics and facilitate alignment across competing priorities with grace and effectiveness"
                ]
            },
            {
                id: "ux4_action_impact",
                competency: "Action and Impact",
                title: "Action and Impact (Shipping)",
                description: "Your impact transcends individual projects, you influence business outcomes across multiple areas through both direct work and the standards you set. You have an impeccable track record not because you avoid risk, but because you have the judgment to know which battles matter and the discipline to see them through to measurable results.",
                bullets: [
                    "You influence high-level business outcomes across multiple departments or product pillars; your impact is felt in multiple areas of the company",
                    "You maintain an impeccable track record of delivering critical work on time (or early) that drives measurable business and user outcomes",
                    "You have excellent judgment on how to spend time in ways best for the business, lead by example getting your hands dirty, and frequently suggest and execute extra projects outside of core duties",
                    "You help the organization focus on outcomes over outputs, establishing metrics and measurement practices that guide strategic decisions",
                    "You create a culture where intelligent failure is valued as learning, conducting and championing post-mortems that improve organizational practices"
                ]
            },
            {
                id: "ux4_leveling_up",
                competency: "Leveling Up Others",
                title: "Leveling Up Others (Internal influence)",
                description: "You're not just developing individuals, you're shaping the organization's design culture and capabilities. Your influence on talent extends beyond mentorship to making the organization the kind of place where excellent designers want to work and grow. You create other leaders with a \"high-tide rises all boats\" approach.",
                bullets: [
                    "You actively shape the entire design organization's capabilities, culture, and practices, mentoring design leaders at all levels",
                    "You're recognized as a key reason talent joins and stays; you cultivate organizational design culture and inspire the team through both your work and your leadership",
                    "You have incredibly strong leadership and coaching abilities, when you work with others, they consistently learn and bring those learnings to other aspects of their work, often becoming leaders themselves",
                    "You establish and run programs that develop design capability across the organization (workshops, training, mentorship programs)",
                    "If external opportunities arise (speaking, writing, advisory roles), you represent FamilySearch well, though your primary focus remains internal organizational impact"
                ]
            },
            {
                id: "ux4_independence",
                competency: "Independence",
                title: "Independence (Self-sufficiency)",
                description: "You operate with complete autonomy at the strategic level, identifying opportunities, shaping initiatives, and driving change without needing direction. The relationship has inverted: rather than receiving guidance, you provide it to the organization's most senior leaders.",
                bullets: [
                    "You operate autonomously, identifying and driving strategic initiatives without direction, and require no supervision",
                    "Instead, you provide guidance to the highest levels of leadership on design strategy, user needs, and product direction",
                    "You're trusted to make decisions that affect organizational direction and significant resources",
                    "You balance organizational constraints with user needs, making strategic trade-offs transparently and advocating effectively when necessary"
                ]
            },
            {
                id: "ux4_skill_development",
                competency: "Skill Development",
                title: "Skill Development",
                description: "You're a master of your craft and a recognized internal leader. Focus on shaping the future of design at FamilySearch, developing other leaders, and ensuring the organization's design capabilities continue to evolve.",
                bullets: [
                    "You have mastery across the entire design technology stack and can articulate and teach the highest levels of design craft",
                    "You define what good design means at the organizational level and understand design's role in business strategy",
                    "You have recognized expertise in multiple specializations, shape internal best practices, and drive organizational transformation in tools, processes, and methodologies",
                    "You're deeply proficient in data analysis and experimentation, establishing how teams measure and learn from their work",
                    "You coach senior leaders and executives on design thinking, outcome-based strategy, and user-centered decision-making",
                    "Your primary focus is elevating design capability organization-wide, developing talent, establishing practices, and ensuring FamilySearch design continues to raise the bar"
                ]
            }
        ]
    }
};

// Rating scale definition
const ratingScale = [
    {
        value: 1,
        label: "Developing",
        description: "I'm learning this skill"
    },
    {
        value: 2,
        label: "Emerging",
        description: "I can do this with guidance"
    },
    {
        value: 3,
        label: "Proficient",
        description: "I can do this independently"
    },
    {
        value: 4,
        label: "Advanced",
        description: "I can mentor others on this"
    },
    {
        value: 5,
        label: "Expert",
        description: "I'm defining best practices for this"
    }
];
