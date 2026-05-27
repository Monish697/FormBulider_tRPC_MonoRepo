"use client";
import React from "react";
import { useFormStore } from "../../lib/form-builder/store";
import { templates } from "../../lib/form-builder/templates";
import { ThemeToggle } from "../ThemeToggle";

export const ThemeSelector: React.FC<{ onSelect: () => void }> = ({
    onSelect,
}) => {
    const { appTheme, toggleAppTheme, loadTemplate, setTheme, setFormStyle } =
        useFormStore();

    const handleCreateOwn = () => {
        loadTemplate([]);
        setTheme("light");
        setFormStyle({
            backgroundUrl: null,
            customAppBg: null,
            customCanvasBg: null,
            customTextColor: null,
        });
        onSelect();
    };

    const handleSelectTemplate = (template: (typeof templates)[0]) => {
        // We deep clone the elements to generate fresh IDs so if they load it twice, IDs don't collide
        const clonedElements = template.elements.map((el) => ({
            ...el,
            id: Math.random().toString(36).substring(2, 9),
        }));
        loadTemplate(clonedElements);
        setTheme(template.formTheme);
        setFormStyle({
            backgroundUrl: template.backgroundUrl || null,
            customAppBg: template.customAppBg || null,
            customCanvasBg: template.customCanvasBg || null,
            customTextColor: template.customTextColor || null,
        });
        onSelect();
    };

    return (
        <div
            className="relative w-full min-h-screen overflow-hidden font-sans transition-colors bg-[#f6f4f1] text-slate-900 dark:bg-black dark:text-white"
        >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-sky-400/10 dark:from-indigo-500/10 dark:to-sky-400/10" />

            <div className="relative z-10 flex min-h-screen flex-col">
                {/* Header */}
                <div className="px-8 pt-8 pb-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-sky-500 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/30">
                            FF
                        </div>
                        <div className="flex flex-col leading-tight">
                            <span className="font-semibold text-lg tracking-tight">
                                FormFlow
                            </span>
                            <span className="text-xs text-slate-500 dark:text-white">
                                Business templates
                            </span>
                        </div>
                    </div>
                    <ThemeToggle />
                </div>

                {/* Main Content */}
                <div className="flex-1 max-w-6xl w-full mx-auto px-6 pb-16">
                    <div className="mt-10 text-center flex flex-col items-center gap-4">
                        <span className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/60 dark:border-[#6FC3DF] bg-white/70 dark:bg-black px-3 py-1 text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-white">
                            Popular business forms
                        </span>
                        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
                            Build beautiful, business-ready forms.
                        </h2>
                        <p className="max-w-2xl text-base md:text-lg text-slate-600 dark:text-white">
                            Launch lead capture, onboarding, support, and
                            feedback flows in minutes with modern templates.
                        </p>
                    </div>

                    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {/* Create Your Own Card */}
                        <button
                            onClick={handleCreateOwn}
                            className="group relative flex flex-col items-center justify-center h-52 rounded-3xl border border-dashed border-black/10 dark:border-[#6FC3DF]/70 dark:border-white bg-white/60 dark:bg-black hover:border-indigo-500/60 hover:bg-white/80 dark:hover:bg-white/10 transition-all"
                        >
                            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-500/10 to-sky-500/10 flex items-center justify-center group-hover:from-indigo-500/20 group-hover:to-sky-500/20 transition-colors mb-3">
                                <span className="text-2xl text-slate-400 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-sky-300">
                                    +
                                </span>
                            </div>
                            <span className="font-medium text-slate-600 dark:text-white group-hover:text-indigo-700 dark:group-hover:text-sky-300">
                                Create from scratch
                            </span>
                        </button>

                        {/* Template Cards */}
                        {templates.map((template) => (
                            <button
                                key={template.id}
                                onClick={() => handleSelectTemplate(template)}
                                className="text-left flex flex-col h-52 rounded-3xl border border-black/10 dark:border-white/60 dark:border-[#6FC3DF] bg-white/80 dark:bg-black p-6 hover:shadow-2xl hover:-translate-y-1 transition-all group relative overflow-hidden"
                            >
                                <div
                                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-4 border ${template.color}`}
                                >
                                    {template.icon}
                                </div>
                                <h3 className="font-semibold text-lg text-slate-900 dark:text-white dark:text-white mb-1 group-hover:text-indigo-600 dark:group-hover:text-sky-300 transition-colors">
                                    {template.name}
                                </h3>
                                <p className="text-sm text-slate-500 dark:text-white line-clamp-2">
                                    {template.description}
                                </p>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
