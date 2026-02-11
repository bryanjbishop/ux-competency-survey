// UX Competency Framework v8 - Structured Edition
// FamilySearch UX Organization

// Rating Scale (1-5)
const ratingScale = [
    { value: 1, label: "Developing", description: "I'm learning this skill" },
    { value: 2, label: "Emerging", description: "I can do this with guidance" },
    { value: 3, label: "Proficient", description: "I can do this independently" },
    { value: 4, label: "Advanced", description: "I can mentor others on this" },
    { value: 5, label: "Expert", description: "I'm defining best practices for this" }
];

const competencies = {
    intern: {
        role: "Intern",
        description: "You're developing foundational skills and learning to ask the right questions, conduct basic research, and understand the difference between outputs and outcomes.",
        questions: [
            {
                id: "intern_product_strategy",
                competency: "Product Strategy",
                title: "Product Strategy (Before you work)",
                description: "At this stage, you're developing your strategic thinking by understanding user needs and how design decisions connect to broader organizational goals. You're learning to ask the right questions, conduct basic research, and understand the difference between outputs (features we build) and outcomes (impact we create).",
                subCompetencies: [
                    {
                        id: "intern-ps-01",
                        fullText: "You ask good questions to clarify project objectives and partner with senior leaders to stay on track before getting too deep into a project",
                        shortText: "Asks clarifying questions early",
                        improvementResources: [
                            "Shadow 3 senior designer project kickoffs; document the top 5 questions they ask before starting work",
                            "Create a \"Pre-flight Checklist\" with your mentor: What's the user problem? What does success look like? Who are the stakeholders? Use it before every project for 1 month",
                            "Practice \"Question, Don't Assume\" rule: Before making any design decision, write down 1 question you need answered first"
                        ]
                    },
                    {
                        id: "intern-ps-02",
                        fullText: "You understand simple research methods (interviews, feedback sessions) and participate in weekly user touchpoints to learn Continuous Discovery Habits",
                        shortText: "Participates in basic research",
                        improvementResources: [
                            "Attend 5 user research sessions with note-taking template: What they said | What they did | What surprised you. Review notes with mentor after each session",
                            "Complete \"Research Basics\" internal course, then conduct 2 supervised feedback sessions with mentor observing and coaching",
                            "Read \"Just Enough Research\" by Erika Hall (chapters 1-3), then practice asking open-ended questions: Replace 3 yes/no questions with \"Tell me about...\" versions"
                        ]
                    },
                    {
                        id: "intern-ps-03",
                        fullText: "You're learning the difference between outputs (shipping features) and outcomes (creating user and business value)",
                        shortText: "Distinguishes outputs from outcomes",
                        improvementResources: [
                            "For your next 3 projects, complete this exercise with PM: \"We're building [feature]. The outcome we want is [user behavior change]. We'll measure it with [metric].\"",
                            "Attend \"Outcomes vs Outputs\" training module, then review 3 past projects with mentor—identify what was measured (features shipped? user behavior changed?)",
                            "Create a \"So What?\" habit: Every time you propose a solution, ask \"So what will users be able to do that they couldn't before?\" Write down your answers"
                        ]
                    },
                    {
                        id: "intern-ps-04",
                        fullText: "You recognize how design solutions further organizational goals and ensure designs adhere to Church standards and branding guidelines",
                        shortText: "Connects designs to goals",
                        improvementResources: [
                            "Read FamilySearch's mission statement and product strategy docs for your area. For your next 3 designs, write 1 sentence explaining how your work supports organizational mission",
                            "Complete Church branding guidelines training, then audit 3 of your designs with mentor to identify any guideline violations before handoff",
                            "Attend 3 product strategy presentations with your PM. After each one, write: \"How does my current project support this strategy?\""
                        ]
                    }
                ]
            },
            {
                id: "intern_craft_quality",
                competency: "Craft and Quality",
                title: "Craft and Quality (While you work)",
                description: "Your focus here is building foundational skills and developing an eye for quality work. You're learning established patterns, how to execute clean, thoughtful designs, and how to prototype for learning, not just for visual polish.",
                subCompetencies: [
                    {
                        id: "intern-cq-01",
                        fullText: "You're familiar with layout, typography, color basics, and common design patterns, with a rudimentary understanding of HTML/CSS/JavaScript for feasible handoffs",
                        shortText: "Knows design and code basics",
                        improvementResources: [
                            "Complete \"Design Fundamentals\" internal course, then recreate 5 existing Zion UI components to understand their construction principles",
                            "Study HTML/CSS basics through freeCodeCamp's Responsive Web Design certification (first 3 sections), then pair with an engineer to understand 1 handoff",
                            "Daily practice for 2 weeks: Analyze 1 well-designed interface, note typography choices, layout grid, and color usage"
                        ]
                    },
                    {
                        id: "intern-cq-02",
                        fullText: "You use Zion UI components and understand basic accessibility requirements (WCAG standards)",
                        shortText: "Uses system components accessibly",
                        improvementResources: [
                            "Complete \"Accessibility 101\" training, then use screen reader for 2 hours to experience your designs as blind users would",
                            "Review WCAG 2.1 AA guidelines (Levels A and AA), then conduct accessibility audit of 3 designs with mentor providing feedback",
                            "Study Zion UI accessibility documentation thoroughly, then audit 3 of your designs to ensure proper component usage and color contrast"
                        ]
                    },
                    {
                        id: "intern-cq-03",
                        fullText: "Your work demonstrates awareness of existing patterns and strives for simplicity with clear hierarchy",
                        shortText: "Applies patterns with hierarchy",
                        improvementResources: [
                            "Study 10 production designs from senior designers, document the patterns used (navigation, forms, cards, etc.) and when each pattern is appropriate",
                            "For your next 3 designs, create 3 visual hierarchy versions (using size, color, weight), get feedback from mentor on which communicates most clearly",
                            "Complete Zion UI pattern library review, recreate 5 common patterns to build muscle memory, then apply patterns to next design project"
                        ]
                    },
                    {
                        id: "intern-cq-04",
                        fullText: "You seek feedback from seasoned team members and prototype quickly to refine solutions based on user or mentor feedback",
                        shortText: "Seeks feedback and iterates",
                        improvementResources: [
                            "Present work-in-progress to UX 2+ designer twice per week for 1 month before designs are \"complete,\" document changes made based on feedback",
                            "Learn rapid prototyping in Figma (clickable prototypes with basic interactions), create 5 quick prototypes for next project, test with 3 users",
                            "Create feedback loop habit: After receiving critique, write \"What I'll change\" and \"Why\" before next iteration, review with mentor weekly"
                        ]
                    }
                ]
            },
            {
                id: "intern_communication",
                competency: "Communication and Collaboration",
                title: "Communication and Collaboration (Working together)",
                description: "Building strong working relationships is essential at every level. You're learning how to share your work, accept feedback graciously, work effectively with cross-functional partners, and participate meaningfully in product trio discussions.",
                subCompetencies: [
                    {
                        id: "intern-cc-01",
                        fullText: "You share your work regularly (once a week) in design critique and take feedback graciously",
                        shortText: "Shares work and accepts feedback",
                        improvementResources: [
                            "Attend design critique 2x per week for 1 month, present work-in-progress (not finished work) to practice receiving feedback early",
                            "Read \"Discussing Design\" by Adam Connor & Aaron Irizarry (chapters 1-3), then practice: After receiving feedback, say \"Thank you, let me think about that\" instead of defending",
                            "Complete \"Growth Mindset\" training module, then keep a feedback journal: What feedback did you get? What will you apply? How did it improve your work?"
                        ]
                    },
                    {
                        id: "intern-cc-02",
                        fullText: "You can explain the intent and goals of your design solutions clearly in both verbal and written form",
                        shortText: "Explains design intent clearly",
                        improvementResources: [
                            "Use presentation template for next 5 projects: Context (problem) → Solution (design) → Rationale (why this works). Practice with mentor before stakeholder presentation",
                            "Watch 5 excellent design presentations from senior designers, note their structure, pacing, and how they explain decisions",
                            "Read \"Articulating Design Decisions\" by Tom Greever (chapters 1-4), then practice explaining 1 design decision daily to mentor using the book's framework"
                        ]
                    },
                    {
                        id: "intern-cc-03",
                        fullText: "You actively listen to engineers and PMs in trio meetings, engaging constructively with respect and an open mind, and share user insights from research sessions",
                        shortText: "Listens and engages constructively",
                        improvementResources: [
                            "Schedule weekly 30-minute chats with your PM and engineering partners for 1 month to understand their perspectives and constraints",
                            "Shadow PM for 1 day and engineer for 1 day, document what they prioritize and how they make decisions, share learnings with mentor",
                            "Read \"Inspired\" by Marty Cagan (Part I), then practice active listening in trio meetings: Take notes on others' concerns, ask 1 clarifying question before responding"
                        ]
                    }
                ]
            },
            {
                id: "intern_action_impact",
                competency: "Action and Impact",
                title: "Action and Impact (Shipping)",
                description: "Learning to ship work and understand its real-world impact is a critical skill. You're developing your ability to frame problems, work iteratively, see projects through to completion, and understand that shipping is about learning what works, not just delivering features.",
                subCompetencies: [
                    {
                        id: "intern-ai-01",
                        fullText: "You meet project deadlines without holding up engineering, checking in with PM/Eng to keep projects on track",
                        shortText: "Meets deadlines reliably",
                        improvementResources: [
                            "Use project management tool to track all tasks with deadlines, break work into 1-day chunks, check off completed items daily",
                            "Daily standup with mentor for 2 weeks to build accountability: What did you finish yesterday? What will you finish today? Any blockers?",
                            "Practice: Set personal deadlines 1 day before real deadline for next 3 projects, create buffer for unexpected feedback or changes"
                        ]
                    },
                    {
                        id: "intern-ai-02",
                        fullText: "You use basic problem-framing skills and transfer user insights into workable solutions that ship",
                        shortText: "Frames problems into solutions",
                        improvementResources: [
                            "Complete \"Problem Framing Workshop\" (internal 2-hour session), then practice \"5 Whys\" technique on 3 recent projects with mentor guidance",
                            "Use problem statement template for next 3 projects: \"[User] needs [need] because [insight].\" Get PM/mentor approval before designing solutions",
                            "Study 3 project briefs that show strong vs. weak problem framing with mentor, identify differences, apply learnings to next project"
                        ]
                    },
                    {
                        id: "intern-ai-03",
                        fullText: "Your work ships into the world, and you ask questions to understand its impact on users and business outcomes",
                        shortText: "Ships work and measures impact",
                        improvementResources: [
                            "For your next 3 shipped features, attend the post-launch review meeting, write down: What metric improved? What user behavior changed? What surprised you?",
                            "Shadow analytics review meetings (5 sessions), learn basic metrics for your product: DAU, conversion rate, retention, NPS",
                            "Read \"Lean Analytics\" by Croll & Yoskovitz (chapters 1-3), then create simple measurement plan for next project: What will we track? Why?"
                        ]
                    },
                    {
                        id: "intern-ai-04",
                        fullText: "You're learning that failure is part of learning; when something doesn't work, you're curious about why",
                        shortText: "Views failure as learning",
                        improvementResources: [
                            "Attend 3 project retrospectives or post-mortems, note how team discusses what didn't work without blame, document 1 learning from each",
                            "For your next 3 projects, create 3 design versions before settling on an approach, document why you rejected the other two",
                            "Read \"Sprint\" by Jake Knapp (chapters on rapid iteration), then practice: When design feedback is critical, ask \"What can I learn from this?\" instead of defending"
                        ]
                    }
                ]
            },
            {
                id: "intern_leveling_up",
                competency: "Leveling Up Others",
                title: "Leveling Up Others (Internal influence)",
                description: "Even as an intern, you contribute to the team culture and help create a positive, collaborative environment. Your enthusiasm and willingness to learn helps energize the team.",
                subCompetencies: [
                    {
                        id: "intern-luo-01",
                        fullText: "You contribute to design culture by offering perspectives in critiques and showing enthusiasm for supporting peers",
                        shortText: "Contributes to design culture",
                        improvementResources: [
                            "Participate actively in 10 design critiques, provide 1 piece of constructive feedback using \"I observe... I wonder... What if...\" framework",
                            "Share 1 learning each week in team meeting: What you learned, how it helped your work, how others might apply it",
                            "Attend all design team events and meetings for 3 months, volunteer for 1 team culture initiative (design lunch, show-and-tell, game night)"
                        ]
                    },
                    {
                        id: "intern-luo-02",
                        fullText: "You participate in hiring processes as needed and refer candidates you're interested in working with",
                        shortText: "Participates in hiring activities",
                        improvementResources: [
                            "Shadow 5 design interviews observing senior designer's evaluation approach, learn hiring rubric and evaluation criteria for intern/UX 1 level",
                            "Study FamilySearch design team values and culture fit criteria, participate in 3 interviews with senior designer leading",
                            "Refer 2 candidates to design team (network building through school, bootcamp, meetups), write referral explaining why they'd be great fit"
                        ]
                    }
                ]
            },
            {
                id: "intern_independence",
                competency: "Independence",
                title: "Independence (Self-sufficiency)",
                description: "You're building the foundation for independent work. At this stage, you work best with guidance and structure, and you're learning when to ask for help versus when to push forward.",
                subCompetencies: [
                    {
                        id: "intern-ind-01",
                        fullText: "You manage small tasks effectively with guidance, meet deadlines, and ask for help when blocked",
                        shortText: "Manages tasks with guidance",
                        improvementResources: [
                            "Create daily task list with priorities, share with mentor at start of day, review at end of day for 2 weeks to build self-management",
                            "Use \"30-minute rule\": Try solving problem independently for 30 minutes before asking for help, document what you tried when asking",
                            "Practice \"Question-Assumption-Options\" framework: When blocked, write down: What's the question? What do I assume? What are 3 options? Then ask mentor"
                        ]
                    },
                    {
                        id: "intern-ind-02",
                        fullText: "You're learning to work through problems with support while building confidence",
                        shortText: "Builds problem-solving confidence",
                        improvementResources: [
                            "Keep decision journal for 2 weeks: What small decisions did you make independently? What was the outcome? What did you learn?",
                            "Read \"The Effective Engineer\" by Edmond Lau (chapters on problem-solving), identify 3 techniques to try in next project",
                            "Practice making small low-stakes decisions independently daily for 1 month (component choice, color, spacing), review decisions with mentor weekly"
                        ]
                    }
                ]
            },
            {
                id: "intern_skill_development",
                competency: "Skill Development",
                title: "Skill Development (Continuous learning)",
                description: "Continuous learning is essential for growth. Focus on building your foundational skills in tools, principles, and professional practices while developing your unique design perspective.",
                subCompetencies: [
                    {
                        id: "intern-sd-01",
                        fullText: "You're learning industry-standard design tools (Figma, Sketch, Adobe Creative Suite) and building speed with them",
                        shortText: "Learning design tools",
                        improvementResources: [
                            "Complete Figma fundamental tutorials (official Figma learning), practice 30 minutes daily for 30 days to build tool muscle memory",
                            "Recreate 10 production designs pixel-perfect to develop eye for detail and learn advanced tool techniques from senior designers' files",
                            "Watch 5 advanced Figma tutorials on components, auto-layout, variants; try each technique in practice file before using in real project"
                        ]
                    },
                    {
                        id: "intern-sd-02",
                        fullText: "You're developing strong design fundamentals: typography, color theory, layout, composition, visual hierarchy, accessibility basics, and basic design principles",
                        shortText: "Developing design fundamentals",
                        improvementResources: [
                            "Read \"Refactoring UI\" by Adam Wathan & Steve Schoger, apply 1 principle per day to your work for 2 weeks",
                            "Daily practice: Analyze 1 beautiful interface, note visual decisions (typeface choice, color palette, spacing system), recreate 1 component",
                            "Complete \"Visual Design Fundamentals\" internal course, then get design review from UX 2+ on every screen before proceeding to next"
                        ]
                    },
                    {
                        id: "intern-sd-03",
                        fullText: "You're learning to give and receive critique constructively, developing portfolio documentation skills, and exploring prototyping techniques",
                        shortText: "Learning critique and documentation",
                        improvementResources: [
                            "Attend design critique 2x per week for 1 month, focus on learning critique format and language, practice giving 1 piece of feedback per session",
                            "Read \"Discussing Design\" by Adam Connor & Aaron Irizarry, then practice feedback framework: Observation → Question → Suggestion",
                            "Create documentation for 3 completed projects using template: Problem → Solution → Process → Outcome, get feedback from mentor on clarity"
                        ]
                    },
                    {
                        id: "intern-sd-04",
                        fullText: "You're participating in learning opportunities and exploring how emerging tools (including AI) can enhance your work with guidance",
                        shortText: "Explores learning and tools",
                        improvementResources: [
                            "Create personal learning plan with 3-month goals, share with mentor, schedule monthly check-ins to review progress",
                            "Attend 3 design talks/webinars monthly, write 1-paragraph summary of key learning and how you'll apply it to your work",
                            "Experiment with AI design tools (ChatGPT, Midjourney, etc.) under mentor guidance for 3 tasks, document: What worked? What didn't? When is human judgment essential?"
                        ]
                    }
                ]
            }
        ]
    },

    ux1: {
        role: "UX 1 - Associate Designer",
        description: "You're developing more independence in your research and strategic thinking. You're moving from following directions to actively shaping the work, asking better questions, challenging assumptions, and building conviction in your design decisions through evidence.",
        questions: [
            {
                id: "ux1_product_strategy",
                competency: "Product Strategy",
                title: "Product Strategy (Before you work)",
                description: "You're developing more independence in your research and strategic thinking. You're moving from following directions to actively shaping the work, asking better questions, challenging assumptions, and building conviction in your design decisions through evidence. You're beginning to practice Continuous Discovery Habits.",
                bullets: [
                    "You conduct basic interviews and surveys, observing and capturing user needs effectively, and participate in weekly user touchpoints with increasing confidence",
                    "You occasionally proactively identify gaps in problem definitions and read and interpret product requirements, presenting multiple paths forward",
                    "You understand the voice of the customer and are learning to connect design work to measurable outcomes (not just feature completion)",
                    "You justify ideas based on real evidence versus intuition and are starting to recognize industry patterns and trends"
                ]
            },
            {
                id: "ux1_craft_quality",
                competency: "Craft and Quality",
                title: "Craft and Quality (While you work)",
                description: "You're transitioning from learning patterns to applying them with judgment. Your work is becoming more polished as you develop an intuitive sense for quality, knowing when good enough is good enough, and when to push for excellence.",
                bullets: [
                    "Your work is starting to require less oversight from the team, and you follow established structures set by senior designers",
                    "You take time to understand Zion UI design system, lean on existing patterns, and create simple flows with mentoring to ensure usability and accessibility",
                    "You design with accessibility in mind from the start, understanding how to use Zion UI's accessible components correctly",
                    "You understand and adhere to FamilySearch's design principles with decreasing need for guidance, and prototype solutions to test assumptions with users"
                ]
            },
            {
                id: "ux1_communication",
                competency: "Communication and Collaboration",
                title: "Communication and Collaboration (Working together)",
                description: "You're building confidence as a communicator and finding your voice. You're learning that communication isn't just about presenting polished work, it's about inviting collaboration early, being receptive to feedback, and building trust through transparency in the product trio.",
                bullets: [
                    "You're comfortable presenting work to broader stakeholders with clear communication and are receptive to constructive feedback in critiques",
                    "You listen actively to engineers and PMs in trio meetings, communicating project goals clearly when asked and sharing user research insights",
                    "You document decision making in a way that's clear and easy for others to understand, including the outcomes you're trying to achieve"
                ]
            },
            {
                id: "ux1_action_impact",
                competency: "Action and Impact",
                title: "Action and Impact (Shipping)",
                description: "You're developing the discipline of consistent delivery. Shipping isn't just about meeting deadlines, it's about learning to balance craft with pragmatism, understanding that shipped work creates real value and real learning opportunities. You're beginning to measure what happens after launch.",
                bullets: [
                    "You meet project deadlines, occasionally ahead of schedule, checking in frequently to avoid blocking progress",
                    "You ship work regularly and understand its impact on the business, asking questions about outcomes and user response",
                    "You maintain an organized workflow, track progress on assigned tasks, and are curious about what happens after your work goes live",
                    "When designs don't perform as expected, you're curious and open to learning why"
                ]
            },
            {
                id: "ux1_leveling_up",
                competency: "Leveling Up Others",
                title: "Leveling Up Others (Internal influence)",
                description: "You're starting to contribute more actively to team processes and provide helpful feedback to others. You're becoming a more engaged team member beyond just your individual work.",
                bullets: [
                    "You participate in hiring processes, refer potential candidates, and support interns and new team members with onboarding",
                    "You regularly participate in design team meetings, critiques, and events",
                    "You seek to provide actionable feedback to other projects when possible"
                ]
            },
            {
                id: "ux1_independence",
                competency: "Independence",
                title: "Independence (Self-sufficiency)",
                description: "You're building autonomy through structured support. You're learning the crucial skill of knowing when to push forward independently and when to pause and ask questions, finding the balance between self-reliance and collaboration.",
                bullets: [
                    "You're learning to move forward on tasks with modest supervision, though you still require frequent check-ins",
                    "You ask good questions to clarify requirements before starting work and are building confidence to make small decisions independently"
                ]
            },
            {
                id: "ux1_skill_development",
                competency: "Skill Development",
                title: "Skill Development (Continuous learning)",
                description: "You're moving from learning to proficiency. Focus on mastering your core tools, developing your design judgment, and building the soft skills that make you an effective collaborator.",
                bullets: [
                    "You're achieving proficiency in primary design tools and building speed and confidence in execution",
                    "You're strengthening your grasp of design principles and can articulate why certain design decisions work or don't work",
                    "You're developing communication skills: presenting work clearly, writing concise documentation, explaining your rationale",
                    "You're learning basic analytics tools to understand user behavior and measure outcomes, and developing research methodologies to synthesize findings into actionable insights"
                ]
            }
        ]
    },

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
                description: "Your craft has matured to the point where quality is becoming automatic rather than effortful. You've internalized the fundamentals deeply enough that you can focus on the harder problems: complex information architecture, system-level thinking, and designing for edge cases without being reminded.",
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
                description: "You're an effective communicator and collaborator. Importantly, you care less about \"being right\" and more about helping your team move forward; you check your ego at the door. You're a true partner in the product trio.",
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
                description: "You've developed strong delivery instincts and understand the rhythm of product development. You know how to maintain momentum, breaking through obstacles, managing your own energy, and making smart trade-offs between quality and speed without needing someone to tell you which to prioritize. You focus on delivering the right thing, not just shipping for the sake of shipping.",
                bullets: [
                    "You consistently meet deadlines, sometimes ahead of schedule, and embrace \"perfect is the enemy of good\"; you know when to ship to learn",
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
                title: "Skill Development (Continuous learning)",
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

    ux3: {
        role: "UX 3 - Mid-Level Designer",
        description: "You've developed strategic intuition—the ability to synthesize user needs, business constraints, and technical realities into coherent direction. You guide teams not just in solving problems, but in identifying which problems are worth solving and when.",
        questions: [
            {
                id: "ux3_product_strategy",
                competency: "Product Strategy",
                title: "Product Strategy (Before you work)",
                description: "You've developed strategic intuition—the ability to synthesize user needs, business constraints, and technical realities into coherent direction. You guide teams not just in solving problems, but in identifying which problems are worth solving and when. You lead discovery efforts and coach others in outcome-focused thinking.",
                bullets: [
                    "You orchestrate comprehensive continuous discovery for large, complex initiatives, leading weekly touchpoints and coaching mid-level designers on research best practices",
                    "You guide teams to converge on the right problem statements, balancing user data, business constraints, and technical feasibility, building consensus using your thorough product and customer understanding",
                    "You contribute to product roadmaps based on discovery insights, weigh trade-offs among user needs, feasibility, and business outcomes (not just features), and have strong intuition on what's needed to move objectives forward",
                    "You use opportunity solution trees or similar frameworks to help teams visualize and prioritize the right work"
                ]
            },
            {
                id: "ux3_craft_quality",
                competency: "Craft and Quality",
                title: "Craft and Quality (While you work)",
                description: "Your craft has reached a level where others look to your work as the standard. You handle complexity with apparent ease, solving intricate problems, knowing when existing patterns serve and when new ones are needed, and delivering work so thorough that edge cases and details are anticipated rather than discovered.",
                bullets: [
                    "You solve intricate information architecture issues, ensure cross-product consistency using Zion UI, and own multiple complex flows ensuring seamless user experience",
                    "You actively contribute to Zion UI evolution, identifying system gaps, proposing improvements, and validating new patterns with user research",
                    "You innovate new patterns only when truly beneficial, validating them with research, and deeply understand when industry patterns are effective",
                    "Your designs are consistently a shining example of completeness; people rarely need clarification on hover states, edge cases, screen sizes, or accessibility requirements",
                    "You champion accessibility across your projects and can conduct thorough accessibility audits"
                ]
            },
            {
                id: "ux3_communication",
                competency: "Communication and Collaboration",
                title: "Communication and Collaboration (Working together)",
                description: "You've become a unifying force across teams. You navigate complex stakeholder dynamics with confidence, build genuine shared ownership of outcomes, and create environments where knowledge sharing happens naturally rather than through forced processes.",
                bullets: [
                    "You engage any stakeholder (including leadership) with confidence and clarity, and delegate effectively when a project requires it",
                    "You foster a culture of open feedback and shared ownership within trios, regularly sharing project context, discovery insights, and outcomes across teams to maintain alignment",
                    "Knowledge flows freely rather than being siloed; you actively share what you learn from both successes and failures",
                    "You facilitate difficult conversations and navigate disagreement productively, helping teams reach decisions even when perspectives conflict"
                ]
            },
            {
                id: "ux3_action_impact",
                competency: "Action and Impact",
                title: "Action and Impact (Shipping)",
                description: "You're recognized as someone who \"gets big things done\"—not through heroics, but through smart decomposition, clear sequencing, and the ability to maintain team momentum even through complex, ambiguous work. People trust that when you take something on, it will ship and deliver measurable outcomes.",
                bullets: [
                    "You break down large problems into smaller deliverables to maintain momentum and focus on high business-impact outcomes (not just high-visibility features)",
                    "You set an example for producing work that delivers results; people see you as a \"doer\" who focuses on what matters",
                    "You not only meet deadlines but often orchestrate projects to finish ahead of schedule, and you're prolific at filing and resolving bugs",
                    "You measure and share the outcomes of shipped work, using data to inform next iterations and celebrate learning from experiments, even when they don't work as planned"
                ]
            },
            {
                id: "ux3_leveling_up",
                competency: "Leveling Up Others",
                title: "Leveling Up Others (Internal influence)",
                description: "You've become a force multiplier for the team. You run design processes that bring out the best thinking in others, coach across levels with equal effectiveness, and model how to maintain high standards while being genuinely supportive rather than critical.",
                bullets: [
                    "You comfortably run design processes at scale (critiques, workshops, brainstorming sessions, discovery sessions)",
                    "Colleagues actively seek your feedback; you're respected for your expertise, guidance, and ability to coach others in Continuous Discovery practices",
                    "You actively coach junior and mid-level designers and invest in developing future leaders, sharing not just design skills but strategic thinking",
                    "You create a culture where it's safe to experiment, fail fast, and share learnings"
                ]
            },
            {
                id: "ux3_independence",
                competency: "Independence",
                title: "Independence (Self-sufficiency)",
                description: "You operate with full autonomy on complex work, trusted to navigate ambiguity without a map. You don't wait for opportunities to be defined—you spot them, shape them, and drive them forward, self-managing toward maximum impact.",
                bullets: [
                    "You require minimal guidance even on complex, ambiguous tasks and proactively flag new opportunities to leadership",
                    "You self-manage priorities effectively for maximal business and user impact (not just maximal output)",
                    "You're confident making strategic decisions that affect multiple product areas",
                    "You know when to advocate strongly for user needs and when to compromise, making these trade-offs transparently"
                ]
            },
            {
                id: "ux3_skill_development",
                competency: "Skill Development",
                title: "Skill Development (Continuous learning)",
                description: "You've achieved expertise and are beginning to shape how others think about design. Your focus is on developing specialized depth, codifying what you know so others can learn from it, and contributing back to the broader design community.",
                bullets: [
                    "You have expert-level proficiency across design tools and contribute to or lead Zion UI design system strategy",
                    "You have mastered advanced design craft and can articulate subtle quality differences, teaching others to see them",
                    "You have deep specialization in multiple areas (e.g., accessibility, data visualization, AI integration, research methods) and are recognized as a subject matter expert",
                    "You're proficient in analyzing quantitative data, setting up experiments, and interpreting results to guide design decisions",
                    "You're developing thought leadership, mentoring across disciplines, and teaching others when to leverage new tools versus when human expertise is essential"
                ]
            }
        ]
    },

    ux4: {
        role: "UX 4 - Senior Designer",
        description: "You operate at a strategic level, shaping how the organization thinks about and invests in user experience. You partner with executives as a peer, translating user insights into business strategy and ensuring design thinking permeates the highest levels of product and company direction.",
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
                    "You set the bar for quality at FamilySearch; people look up to your work and often follow your patterns",
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
                    "You embody the company's values and actively promote company culture; you're seen as a role model for collaboration across trios and departments",
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
                description: "Your impact transcends individual projects—you influence business outcomes across multiple areas through both direct work and the standards you set. You have an impeccable track record not because you avoid risk, but because you have the judgment to know which battles matter and the discipline to see them through to measurable results.",
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
                description: "You're not just developing individuals—you're shaping the organization's design culture and capabilities. Your influence on talent extends beyond mentorship to making the organization the kind of place where excellent designers want to work and grow. You create other leaders with a \"high-tide rises all boats\" approach.",
                bullets: [
                    "You actively shape the entire design organization's capabilities, culture, and practices, mentoring design leaders at all levels",
                    "You're recognized as a key reason talent joins and stays; you cultivate organizational design culture and inspire the team through both your work and your leadership",
                    "You have incredibly strong leadership and coaching abilities; when you work with others, they consistently learn and bring those learnings to other aspects of their work, often becoming leaders themselves",
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
                title: "Skill Development (Continuous learning)",
                description: "You're a master of your craft and a recognized internal leader. Focus on shaping the future of design at FamilySearch, developing other leaders, and ensuring the organization's design capabilities continue to evolve.",
                bullets: [
                    "You have mastery across the entire design technology stack and can articulate and teach the highest levels of design craft",
                    "You define what good design means at the organizational level and understand design's role in business strategy",
                    "You have recognized expertise in multiple specializations, shape internal best practices, and drive organizational transformation in tools, processes, and methodologies",
                    "You're deeply proficient in data analysis and experimentation, establishing how teams measure and learn from their work",
                    "You coach senior leaders and executives on design thinking, outcome-based strategy, and user-centered decision-making"
                ]
            }
        ]
    }
};
