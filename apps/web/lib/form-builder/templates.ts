import { FormElement, Theme } from "./types";

const generateId = () => Math.random().toString(36).substring(2, 9);

export interface Template {
    id: string;
    name: string;
    description: string;
    icon: string;
    color: string;
    formTheme: Theme;
    backgroundUrl?: string;
    customAppBg?: string;
    customCanvasBg?: string;
    customTextColor?: string;
    elements: FormElement[];
}

export const templates: Template[] = [
    {
        id: "demo-request",
        name: "Demo Request",
        description: "B2B sales demo and qualification form",
        icon: "🚀",
        color: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800",
        formTheme: "light",
        backgroundUrl:
            "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80",
        customCanvasBg: "#ffffff",
        customTextColor: "#0f172a",
        elements: [
            {
                id: generateId(),
                type: "text",
                x: 0,
                y: 0,
                props: { text: "Request a Product Demo" },
            },
            {
                id: generateId(),
                type: "short-input",
                x: 0,
                y: 0,
                props: { placeholder: "Full Name" },
            },
            {
                id: generateId(),
                type: "short-input",
                x: 0,
                y: 0,
                props: { placeholder: "Work Email" },
            },
            {
                id: generateId(),
                type: "short-input",
                x: 0,
                y: 0,
                props: { placeholder: "Company Name" },
            },
            {
                id: generateId(),
                type: "poll",
                x: 0,
                y: 0,
                props: {
                    question: "Company Size",
                    options: ["1-10", "11-50", "51-200", "201-1000", "1000+"],
                },
            },
            {
                id: generateId(),
                type: "long-input",
                x: 0,
                y: 0,
                props: { placeholder: "What would you like to solve?" },
            },
        ],
    },
    {
        id: "lead-qualification",
        name: "Lead Qualification",
        description: "Capture pipeline-ready sales leads",
        icon: "🎯",
        color: "bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-400 border-sky-200 dark:border-sky-800",
        formTheme: "glassmorphism",
        backgroundUrl:
            "https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=1600&q=80",
        customCanvasBg: "#f8fafc",
        customTextColor: "#0f172a",
        elements: [
            {
                id: generateId(),
                type: "text",
                x: 0,
                y: 0,
                props: { text: "Sales Lead Qualification" },
            },
            {
                id: generateId(),
                type: "short-input",
                x: 0,
                y: 0,
                props: { placeholder: "Full Name" },
            },
            {
                id: generateId(),
                type: "short-input",
                x: 0,
                y: 0,
                props: { placeholder: "Role / Title" },
            },
            {
                id: generateId(),
                type: "short-input",
                x: 0,
                y: 0,
                props: { placeholder: "Work Email" },
            },
            {
                id: generateId(),
                type: "poll",
                x: 0,
                y: 0,
                props: {
                    question: "Buying Timeline",
                    options: [
                        "This month",
                        "1-3 months",
                        "3-6 months",
                        "Exploring",
                    ],
                },
            },
            {
                id: generateId(),
                type: "poll",
                x: 0,
                y: 0,
                props: {
                    question: "Estimated Budget",
                    options: ["< $5k", "$5k-$25k", "$25k-$100k", "$100k+"],
                },
            },
            {
                id: generateId(),
                type: "long-input",
                x: 0,
                y: 0,
                props: { placeholder: "Current tools or process" },
            },
        ],
    },
    {
        id: "support-ticket",
        name: "Support Ticket",
        description: "Customer support issue intake",
        icon: "🛟",
        color: "bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-800",
        formTheme: "light",
        backgroundUrl:
            "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1600&q=80",
        customCanvasBg: "#ffffff",
        customTextColor: "#111827",
        elements: [
            {
                id: generateId(),
                type: "text",
                x: 0,
                y: 0,
                props: { text: "Customer Support Request" },
            },
            {
                id: generateId(),
                type: "short-input",
                x: 0,
                y: 0,
                props: { placeholder: "Account Email" },
            },
            {
                id: generateId(),
                type: "short-input",
                x: 0,
                y: 0,
                props: { placeholder: "Product Area" },
            },
            {
                id: generateId(),
                type: "poll",
                x: 0,
                y: 0,
                props: {
                    question: "Priority",
                    options: [
                        "P1 - Critical",
                        "P2 - High",
                        "P3 - Normal",
                        "P4 - Low",
                    ],
                },
            },
            {
                id: generateId(),
                type: "long-input",
                x: 0,
                y: 0,
                props: { placeholder: "Describe the issue" },
            },
        ],
    },
    {
        id: "customer-feedback",
        name: "NPS Feedback",
        description: "Measure customer satisfaction and loyalty",
        icon: "⭐",
        color: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800",
        formTheme: "glassmorphism",
        backgroundUrl:
            "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80",
        customCanvasBg: "#ffffff",
        customTextColor: "#78350f",
        elements: [
            {
                id: generateId(),
                type: "text",
                x: 0,
                y: 0,
                props: { text: "Net Promoter Score (NPS)" },
            },
            {
                id: generateId(),
                type: "poll",
                x: 0,
                y: 0,
                props: {
                    question: "How likely are you to recommend us?",
                    options: [
                        "0",
                        "1",
                        "2",
                        "3",
                        "4",
                        "5",
                        "6",
                        "7",
                        "8",
                        "9",
                        "10",
                    ],
                },
            },
            {
                id: generateId(),
                type: "long-input",
                x: 0,
                y: 0,
                props: {
                    placeholder: "What is the primary reason for your score?",
                },
            },
        ],
    },
    {
        id: "employee-onboarding",
        name: "Employee Onboarding",
        description: "HR + IT new hire setup checklist",
        icon: "👋",
        color: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
        formTheme: "light",
        backgroundUrl:
            "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
        customCanvasBg: "#ecfdf5",
        customTextColor: "#064e3b",
        elements: [
            {
                id: generateId(),
                type: "text",
                x: 0,
                y: 0,
                props: { text: "New Hire IT Setup Request" },
            },
            {
                id: generateId(),
                type: "short-input",
                x: 0,
                y: 0,
                props: { placeholder: "Employee Name & ID" },
            },
            {
                id: generateId(),
                type: "poll",
                x: 0,
                y: 0,
                props: {
                    question: "Preferred Device",
                    options: [
                        'MacBook Pro 14"',
                        'MacBook Air 15"',
                        "Windows ThinkPad",
                    ],
                },
            },
            {
                id: generateId(),
                type: "poll",
                x: 0,
                y: 0,
                props: {
                    question: "Required Access",
                    options: [
                        "GitHub Enterprise",
                        "AWS Console",
                        "Figma",
                        "All of the above",
                    ],
                },
            },
        ],
    },
    {
        id: "vendor-onboarding",
        name: "Vendor Onboarding",
        description: "Supplier compliance and payment details",
        icon: "🤝",
        color: "bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 border-teal-200 dark:border-teal-800",
        formTheme: "dark",
        backgroundUrl:
            "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1600&q=80",
        customCanvasBg: "#0f172a",
        customTextColor: "#99f6e4",
        elements: [
            {
                id: generateId(),
                type: "text",
                x: 0,
                y: 0,
                props: { text: "Vendor Onboarding" },
            },
            {
                id: generateId(),
                type: "short-input",
                x: 0,
                y: 0,
                props: { placeholder: "Legal Business Name" },
            },
            {
                id: generateId(),
                type: "short-input",
                x: 0,
                y: 0,
                props: { placeholder: "Tax ID / VAT" },
            },
            {
                id: generateId(),
                type: "short-input",
                x: 0,
                y: 0,
                props: { placeholder: "Primary Contact Email" },
            },
            {
                id: generateId(),
                type: "poll",
                x: 0,
                y: 0,
                props: {
                    question: "Payment Terms",
                    options: ["Net 15", "Net 30", "Net 45", "Net 60"],
                },
            },
            {
                id: generateId(),
                type: "long-input",
                x: 0,
                y: 0,
                props: { placeholder: "Services or products provided" },
            },
        ],
    },
    {
        id: "event-registration",
        name: "Event Registration",
        description: "Conference, webinar, or workshop signup",
        icon: "📅",
        color: "bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400 border-violet-200 dark:border-violet-800",
        formTheme: "light",
        backgroundUrl:
            "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1600&q=80",
        customCanvasBg: "#f8fafc",
        customTextColor: "#312e81",
        elements: [
            {
                id: generateId(),
                type: "text",
                x: 0,
                y: 0,
                props: { text: "Event Registration" },
            },
            {
                id: generateId(),
                type: "short-input",
                x: 0,
                y: 0,
                props: { placeholder: "Full Name" },
            },
            {
                id: generateId(),
                type: "short-input",
                x: 0,
                y: 0,
                props: { placeholder: "Work Email" },
            },
            {
                id: generateId(),
                type: "poll",
                x: 0,
                y: 0,
                props: {
                    question: "Attendance Type",
                    options: ["In-person", "Virtual"],
                },
            },
            {
                id: generateId(),
                type: "long-input",
                x: 0,
                y: 0,
                props: {
                    placeholder: "Dietary requirements or accessibility needs",
                },
            },
        ],
    },
    {
        id: "job-application",
        name: "Job Application",
        description: "Standard employment application",
        icon: "💼",
        color: "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700",
        formTheme: "light",
        customCanvasBg: "#ffffff",
        customTextColor: "#0f172a",
        elements: [
            {
                id: generateId(),
                type: "text",
                x: 0,
                y: 0,
                props: { text: "Job Application" },
            },
            {
                id: generateId(),
                type: "short-input",
                x: 0,
                y: 0,
                props: { placeholder: "Full Name" },
            },
            {
                id: generateId(),
                type: "short-input",
                x: 0,
                y: 0,
                props: { placeholder: "Email Address" },
            },
            {
                id: generateId(),
                type: "short-input",
                x: 0,
                y: 0,
                props: { placeholder: "Role Applying For" },
            },
            {
                id: generateId(),
                type: "poll",
                x: 0,
                y: 0,
                props: {
                    question: "Employment Type",
                    options: ["Full Time", "Part Time", "Contract"],
                },
            },
            {
                id: generateId(),
                type: "long-input",
                x: 0,
                y: 0,
                props: { placeholder: "LinkedIn or Portfolio URL" },
            },
            {
                id: generateId(),
                type: "long-input",
                x: 0,
                y: 0,
                props: { placeholder: "Why are you interested in this role?" },
            },
        ],
    },
];
