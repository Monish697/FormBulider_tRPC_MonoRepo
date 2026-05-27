"use client";
import React, { useState } from "react";
import { toast } from "sonner";
import { useFormStore } from "../../lib/form-builder/store";
import { FormElement as IFormElement } from "../../lib/form-builder/types";

const ViewerElementTitle: React.FC<{ el: IFormElement }> = ({ el }) => {
    if (el.type === "text") return null;
    if (!el.props.question) return null;
    return (
        <label className="font-semibold text-lg block mb-3">
            {el.props.question}
            {el.props.required && <span className="text-rose-500 ml-1">*</span>}
        </label>
    );
};


const ViewerElement: React.FC<{ el: IFormElement, value: any, onChange: (val: any) => void }> = ({ el, value, onChange }) => {
    const { type, props } = el;
    switch (type) {
        case "text":
            return (
                <h3 className="text-2xl font-semibold tracking-tight border-b border-dashed border-current/20 pb-2">
                    {props.text}
                </h3>
            );
        case "short-input":
            return (
                <div className="flex flex-col w-full">
                    <ViewerElementTitle el={el} />
                    <input
                        type="text"
                        value={value || ""}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder={props.placeholder || "Short answer"}
                        className="w-full p-3 border border-black/10 dark:border-white/70 dark:border-[#6FC3DF] rounded-xl bg-white/80 dark:bg-black placeholder:opacity-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/50 transition-shadow"
                    />
                </div>
            );
        case "long-input":
            return (
                <div className="flex flex-col w-full">
                    <ViewerElementTitle el={el} />
                    <textarea
                        value={value || ""}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder={props.placeholder || "Long description..."}
                        className="w-full p-3 border border-black/10 dark:border-white/70 dark:border-[#6FC3DF] rounded-xl bg-white/80 dark:bg-black min-h-[110px] placeholder:opacity-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/50 transition-shadow"
                    />
                </div>
            );
        case "email":
            return (
                <div className="flex flex-col w-full">
                    <ViewerElementTitle el={el} />
                    <input
                        type="email"
                        value={value || ""}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder={props.placeholder || "Email address"}
                        className="w-full p-3 border border-black/10 dark:border-white/70 dark:border-[#6FC3DF] rounded-xl bg-white/80 dark:bg-black placeholder:opacity-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/50 transition-shadow"
                    />
                </div>
            );
        case "number":
            return (
                <div className="flex flex-col w-full">
                    <ViewerElementTitle el={el} />
                    <input
                        type="number"
                        value={value || ""}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder={props.placeholder || "Number"}
                        className="w-full p-3 border border-black/10 dark:border-white/70 dark:border-[#6FC3DF] rounded-xl bg-white/80 dark:bg-black placeholder:opacity-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/50 transition-shadow"
                    />
                </div>
            );
        case "date":
            return (
                <div className="flex flex-col w-full">
                    <ViewerElementTitle el={el} />
                    <input
                        type="date"
                        value={value || ""}
                        onChange={(e) => onChange(e.target.value)}
                        className="w-full p-3 border border-black/10 dark:border-white/70 dark:border-[#6FC3DF] rounded-xl bg-white/80 dark:bg-black placeholder:opacity-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/50 transition-shadow text-slate-700 dark:text-white"
                    />
                </div>
            );
        case "checkbox":
            return (
                <div className="flex flex-col w-full">
                    <ViewerElementTitle el={el} />
                    <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-colors w-fit mt-1">
                        <input
                            type="checkbox"
                            checked={!!value}
                            onChange={(e) => onChange(e.target.checked)}
                            className="w-5 h-5 accent-indigo-600 cursor-pointer"
                        />
                        <span className="text-lg font-medium">{props.label || "Checkbox Label"}</span>
                    </label>
                </div>
            );
        case "dropdown":
            return (
                <div className="flex flex-col w-full">
                    <ViewerElementTitle el={el} />
                    <select value={value || ""} onChange={(e) => onChange(e.target.value)} className="w-full p-3 border border-black/10 dark:border-white/70 dark:border-[#6FC3DF] rounded-xl bg-white/80 dark:bg-black focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/50 transition-shadow text-slate-700 dark:text-white">
                        <option value="" disabled>{props.label || "Select an option"}</option>
                        <option value="opt1">Option 1</option>
                        <option value="opt2">Option 2</option>
                    </select>
                </div>
            );
        case "rating":
            return (
                <div className="flex flex-col w-full">
                    <ViewerElementTitle el={el} />
                    <div className="flex gap-2 text-3xl cursor-pointer w-fit mt-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span 
                                key={star}
                                onClick={() => onChange(star)}
                                className={star <= (value || 0) ? "text-amber-400" : "text-slate-300 dark:text-slate-600 hover:text-amber-200"}
                            >
                                ★
                            </span>
                        ))}
                    </div>
                </div>
            );
        case "single-select":
        case "multi-select":
        case "poll":
            const options = props.options || ["Option 1", "Option 2"];
            const isMulti = type === "multi-select";
            return (
                <div className="flex flex-col gap-2 w-full">
                    <ViewerElementTitle el={el} />
                    <div className="flex flex-col gap-2 mt-2">
                        {options.map((opt: string, i: number) => (
                            <label
                                key={i}
                                className="flex items-center gap-3 cursor-pointer p-2.5 hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-colors border border-transparent hover:border-black/10 dark:border-white/70 dark:hover:border-white/10"
                            >
                                <input
                                    type={isMulti ? "checkbox" : "radio"}
                                    name={isMulti ? undefined : `poll-${el.id}`}
                                    value={opt}
                                    checked={isMulti ? (value || []).includes(opt) : value === opt}
                                    onChange={(e) => {
                                        if (isMulti) {
                                            const current = value || [];
                                            const newVal = e.target.checked 
                                                ? [...current, opt] 
                                                : current.filter((v: string) => v !== opt);
                                            onChange(newVal);
                                        } else {
                                            onChange(opt);
                                        }
                                    }}
                                    className="w-4 h-4 text-indigo-600 cursor-pointer accent-indigo-600"
                                />
                                <span className="cursor-pointer">{opt}</span>
                            </label>
                        ))}
                    </div>
                </div>
            );
        case "image":
            return (
                <div className="flex flex-col w-full">
                    <ViewerElementTitle el={el} />
                    {props.url && (
                        <img
                            src={props.url}
                            alt="Form Graphic"
                            className="max-w-full rounded-2xl object-contain h-48 mx-auto shadow-sm"
                        />
                    )}
                </div>
            );
        default:
            return null;
    }
};

export const FormViewer: React.FC<{ 
    onBack?: () => void;
    onSubmit?: (responses: Record<string, any>) => void;
    isSubmitting?: boolean;
    initialElements?: IFormElement[];
    initialThemeProps?: any;
}> = ({ onBack, onSubmit, isSubmitting, initialElements, initialThemeProps }) => {
    const store = useFormStore();
    
    // Use store values if in builder, otherwise use passed initial values (for public forms)
    const elements = initialElements || store.elements;
    const backgroundUrl = initialThemeProps?.backgroundUrl || store.backgroundUrl;
    const customAppBg = initialThemeProps?.customAppBg || store.customAppBg;
    const theme = initialThemeProps?.theme || store.theme;
    const customCanvasBg = initialThemeProps?.customCanvasBg || store.customCanvasBg;
    const customTextColor = initialThemeProps?.customTextColor || store.customTextColor;
    const companyName = initialThemeProps?.companyName || store.companyName;
    const appTheme = initialThemeProps?.appTheme || store.appTheme;

    const [responses, setResponses] = useState<Record<string, any>>({});

    const handleResponseChange = (id: string, value: any) => {
        setResponses(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = () => {
        if (onSubmit) {
            onSubmit(responses);
        } else {
            toast.info("Preview Mode: Form submissions are disabled here.");
        }
    };

    const getThemeClasses = () => {
        switch (theme) {
            case "dark":
                return "bg-[#0f172a] text-slate-100 ring-1 ring-white/10 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.65)]";
            case "glassmorphism":
                return "bg-white/45 text-slate-900 dark:text-white dark:text-white backdrop-blur-xl shadow-[0_30px_80px_-40px_rgba(15,23,42,0.35)] ring-1 ring-white/30";
            default:
                return "bg-white text-slate-900 dark:text-white shadow-[0_30px_80px_-40px_rgba(15,23,42,0.35)] ring-1 ring-slate-200/70";
        }
    };

    return (
        <div
            className={`w-full min-h-screen flex flex-col font-sans transition-colors relative ${appTheme === "dark" ? "dark:bg-black text-slate-100" : "bg-[#f6f4f1] text-slate-900 dark:text-white"}`}
            style={{ backgroundColor: customAppBg || undefined }}
        >
            {/* Background Image Overlay */}
            {backgroundUrl && (
                <div className="fixed inset-0 z-0 pointer-events-none">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${backgroundUrl})` }}
                    />
                    <div className="absolute inset-0 bg-white/60 dark:bg-black/70 backdrop-blur-sm transition-colors" />
                </div>
            )}

            {onBack && (
                <div className="fixed top-6 left-6 z-50">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 px-4 py-2 bg-white/90 dark:bg-black text-slate-700 dark:text-white rounded-full font-medium shadow-lg border border-black/10 dark:border-white/70 dark:border-[#6FC3DF] hover:scale-105 transition-transform"
                    >
                        ← Back to Editor
                    </button>
                </div>
            )}

            {/* Form Container */}
            <div className="relative z-10 w-full max-w-3xl mx-auto py-20 px-6">
                <div
                    className={`w-full rounded-3xl transition-all duration-300 p-8 md:p-12 flex flex-col gap-8 ${getThemeClasses()}`}
                    style={{
                        backgroundColor: customCanvasBg || undefined,
                        color: customTextColor || undefined,
                    }}
                >
                    {/* Company Name Header */}
                    {companyName && (
                        <div className="w-full border-b border-current/20 pb-4 mb-4 text-center">
                            <h1 className="text-3xl font-black tracking-tight uppercase">
                                {companyName}
                            </h1>
                        </div>
                    )}

                    <div className="flex flex-col gap-8">
                        {elements.map((el) => (
                            <div key={el.id} className="relative">
                                <ViewerElement 
                                    el={el} 
                                    value={responses[el.id]} 
                                    onChange={(val) => handleResponseChange(el.id, val)} 
                                />
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 pt-8 border-t border-current/20 flex justify-end">
                        <button
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-full shadow-lg shadow-indigo-600/30 transition-colors w-full sm:w-auto disabled:opacity-50"
                        >
                            {isSubmitting ? "Submitting..." : "Submit Responses"}
                        </button>
                    </div>
                </div>

                {/* Footer Brand */}
                <div className="mt-8 text-center text-sm opacity-50 font-medium pb-8">
                    Powered by FormFlow
                </div>
            </div>
        </div>
    );
};

export default FormViewer;
