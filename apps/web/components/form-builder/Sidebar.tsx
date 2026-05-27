"use client";

import React, { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { ElementType } from "../../lib/form-builder/types";
import { useFormStore } from "../../lib/form-builder/store";

interface SidebarItemProps {
    type: ElementType;
    label: string;
    icon: React.ReactNode;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ type, label, icon }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: `sidebar-${type}`,
        data: {
            type,
        },
    });

    const style = transform
        ? {
              transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
          }
        : undefined;

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            className="flex items-center gap-3 p-3 mb-2 bg-white/80 dark:bg-black rounded-xl shadow-sm border border-black/10 dark:border-white/70 dark:border-[#6FC3DF] cursor-grab hover:border-indigo-500/50 hover:shadow-md transition-all text-slate-700 dark:text-white"
        >
            <span className="text-xl text-slate-500 dark:text-white">
                {icon}
            </span>
            <span className="font-medium text-sm">{label}</span>
        </div>
    );
};

export const Sidebar: React.FC = () => {
    const [activeTab, setActiveTab] = useState<"elements" | "design">(
        "elements",
    );
    const {
        backgroundUrl,
        customAppBg,
        customCanvasBg,
        customTextColor,
        theme,
        setFormStyle,
        setTheme,
    } = useFormStore();

    return (
        <div className="w-[320px] h-full bg-white/80 dark:bg-black border-r border-black/10 dark:border-white/70 dark:border-[#6FC3DF] flex flex-col transition-colors z-20 shadow-lg backdrop-blur-xl">
            {/* Tabs */}
            <div className="p-4 border-b border-black/10 dark:border-white/70 dark:border-[#6FC3DF]">
                <div className="grid grid-cols-2 bg-[#f6f4f1]/80 dark:bg-black rounded-full p-1 border border-black/10 dark:border-white/70 dark:border-[#6FC3DF]">
                    <button
                        onClick={() => setActiveTab("elements")}
                        className={`py-2 text-xs font-semibold uppercase tracking-[0.2em] rounded-full transition-colors ${activeTab === "elements" ? "bg-white dark:bg-white/20 text-indigo-600 dark:text-sky-300 shadow-sm" : "text-slate-500 hover:text-slate-700 dark:text-white dark:hover:text-slate-200"}`}
                    >
                        Elements
                    </button>
                    <button
                        onClick={() => setActiveTab("design")}
                        className={`py-2 text-xs font-semibold uppercase tracking-[0.2em] rounded-full transition-colors ${activeTab === "design" ? "bg-white dark:bg-white/20 text-indigo-600 dark:text-sky-300 shadow-sm" : "text-slate-500 hover:text-slate-700 dark:text-white dark:hover:text-slate-200"}`}
                    >
                        Design
                    </button>
                </div>
            </div>

            {activeTab === "elements" ? (
                <div className="p-6 flex flex-col flex-1 overflow-hidden">
                    <p className="text-xs font-semibold text-slate-400 dark:text-white uppercase tracking-[0.25em] mb-4">
                        Drag to add
                    </p>
                    <div className="flex-1 overflow-y-auto">
                        <SidebarItem
                            type="text"
                            label="Heading / Text"
                            icon="T"
                        />
                        <SidebarItem
                            type="short-input"
                            label="Short text"
                            icon="="
                        />
                        <SidebarItem
                            type="long-input"
                            label="Long text"
                            icon="☰"
                        />
                        <SidebarItem
                            type="email"
                            label="Email"
                            icon="✉"
                        />
                        <SidebarItem
                            type="number"
                            label="Number"
                            icon="#"
                        />
                        <SidebarItem
                            type="single-select"
                            label="Single select"
                            icon="◉"
                        />
                        <SidebarItem
                            type="multi-select"
                            label="Multi select"
                            icon="☑"
                        />
                        <SidebarItem
                            type="checkbox"
                            label="Checkbox"
                            icon="✓"
                        />
                        <SidebarItem
                            type="dropdown"
                            label="Dropdown"
                            icon="▾"
                        />
                        <SidebarItem
                            type="rating"
                            label="Rating"
                            icon="★"
                        />
                        <SidebarItem
                            type="date"
                            label="Date"
                            icon="📅"
                        />
                        <SidebarItem
                            type="poll"
                            label="Poll"
                            icon="📊"
                        />
                        <SidebarItem
                            type="image"
                            label="Image Placeholder"
                            icon="🖼"
                        />
                    </div>
                </div>
            ) : (
                <div className="p-6 flex flex-col flex-1 overflow-y-auto gap-6 text-slate-800 dark:text-white">
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-[0.2em] mb-2 text-slate-500 dark:text-white">
                            Background image URL
                        </label>
                        <input
                            type="text"
                            placeholder="Leave empty for solid background"
                            value={backgroundUrl || ""}
                            onChange={(e) =>
                                setFormStyle({ backgroundUrl: e.target.value })
                            }
                            className="w-full p-2.5 border rounded-xl text-sm focus:outline-none border-black/10 dark:border-white/70 dark:border-[#6FC3DF] bg-white/80 dark:bg-black focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/20 transition-shadow"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-[0.2em] mb-2 text-slate-500 dark:text-white">
                            Page background color
                        </label>
                        <div className="flex items-center gap-2">
                            <input
                                type="color"
                                value={
                                    customAppBg?.startsWith("#")
                                        ? customAppBg
                                        : "#f3f4f6"
                                }
                                onChange={(e) =>
                                    setFormStyle({
                                        customAppBg: e.target.value,
                                    })
                                }
                                className="w-8 h-8 rounded cursor-pointer border-0 p-0"
                            />
                            <input
                                type="text"
                                placeholder="#f3f4f6"
                                value={customAppBg || ""}
                                onChange={(e) =>
                                    setFormStyle({
                                        customAppBg: e.target.value,
                                    })
                                }
                                className="flex-1 p-2.5 border rounded-xl text-sm focus:outline-none border-black/10 dark:border-white/70 dark:border-[#6FC3DF] bg-white/80 dark:bg-black focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/20 transition-shadow"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-[0.2em] mb-2 text-slate-500 dark:text-white">
                            Canvas color
                        </label>
                        <div className="flex items-center gap-2">
                            <input
                                type="color"
                                value={
                                    customCanvasBg?.startsWith("#")
                                        ? customCanvasBg
                                        : "#ffffff"
                                }
                                onChange={(e) =>
                                    setFormStyle({
                                        customCanvasBg: e.target.value,
                                    })
                                }
                                className="w-8 h-8 rounded cursor-pointer border-0 p-0"
                            />
                            <input
                                type="text"
                                placeholder="#ffffff"
                                value={customCanvasBg || ""}
                                onChange={(e) =>
                                    setFormStyle({
                                        customCanvasBg: e.target.value,
                                    })
                                }
                                className={`flex-1 p-2.5 border rounded-xl text-sm focus:outline-none ${!customCanvasBg ? "border-rose-500/70 bg-rose-50/60 dark:bg-rose-500/10" : "border-black/10 dark:border-white/70 dark:border-[#6FC3DF] bg-white/80 dark:bg-black focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/20"} transition-shadow`}
                            />
                        </div>
                        {!customCanvasBg && (
                            <span className="text-xs text-rose-500 mt-1 block font-medium">
                                This field is required
                            </span>
                        )}
                    </div>

                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-[0.2em] mb-2 text-slate-500 dark:text-white">
                            Text color
                        </label>
                        <div className="flex items-center gap-2">
                            <input
                                type="color"
                                value={
                                    customTextColor?.startsWith("#")
                                        ? customTextColor
                                        : "#000000"
                                }
                                onChange={(e) =>
                                    setFormStyle({
                                        customTextColor: e.target.value,
                                    })
                                }
                                className="w-8 h-8 rounded cursor-pointer border-0 p-0"
                            />
                            <input
                                type="text"
                                placeholder="#000000"
                                value={customTextColor || ""}
                                onChange={(e) =>
                                    setFormStyle({
                                        customTextColor: e.target.value,
                                    })
                                }
                                className={`flex-1 p-2.5 border rounded-xl text-sm focus:outline-none ${!customTextColor ? "border-rose-500/70 bg-rose-50/60 dark:bg-rose-500/10" : "border-black/10 dark:border-white/70 dark:border-[#6FC3DF] bg-white/80 dark:bg-black focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/20"} transition-shadow`}
                            />
                        </div>
                        {!customTextColor && (
                            <span className="text-xs text-rose-500 mt-1 block font-medium">
                                This field is required
                            </span>
                        )}
                    </div>

                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-[0.2em] mb-2 text-slate-500 dark:text-white">
                            Canvas theme
                        </label>
                        <select
                            value={theme}
                            onChange={(e) =>
                                setTheme(
                                    e.target.value as
                                        | "light"
                                        | "dark"
                                        | "glassmorphism",
                                )
                            }
                            className="w-full p-2.5 border border-black/10 dark:border-white/70 dark:border-[#6FC3DF] rounded-xl bg-white/80 dark:bg-black text-sm focus:outline-none focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/20 transition-shadow"
                        >
                            <option value="light">Light (Solid)</option>
                            <option value="dark">Dark (Solid)</option>
                            <option value="glassmorphism">
                                Glassmorphism (Frosted)
                            </option>
                        </select>
                    </div>
                </div>
            )}
        </div>
    );
};
