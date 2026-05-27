"use client";
import React from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { trpc } from "~/trpc/client";
import {
    DndContext,
    DragEndEvent,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
    DragOverlay,
} from "@dnd-kit/core";
import { Sidebar } from "./Sidebar";
import { Canvas } from "./Canvas";
import { useFormStore } from "../../lib/form-builder/store";
import { ElementType } from "../../lib/form-builder/types";

const generateId = () => Math.random().toString(36).substring(2, 9);

const EmailInput = ({ emails, onChange }: { emails: string[], onChange: (emails: string[]) => void }) => {
    const [inputValue, setInputValue] = React.useState("");

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            const newEmail = inputValue.trim();
            if (newEmail && !emails.includes(newEmail)) {
                onChange([...emails, newEmail]);
            }
            setInputValue("");
        } else if (e.key === "Backspace" && !inputValue && emails.length > 0) {
            onChange(emails.slice(0, -1));
        }
    };

    const removeEmail = (emailToRemove: string) => {
        onChange(emails.filter(e => e !== emailToRemove));
    };

    return (
        <div className="flex flex-wrap items-center gap-1.5 px-2 py-1.5 border border-black/10 dark:border-white/30 rounded-lg bg-white/50 dark:bg-black/50 min-w-[250px] max-w-[400px]">
            {emails.map(email => (
                <span key={email} className="flex items-center gap-1 bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300 px-2 py-0.5 rounded text-xs font-medium">
                    {email}
                    <button onClick={() => removeEmail(email)} className="hover:text-indigo-900 dark:hover:text-indigo-100 text-sm leading-none">&times;</button>
                </span>
            ))}
            <input
                type="text"
                placeholder={emails.length === 0 ? "Add emails (press Enter)" : "Add more..."}
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 min-w-[120px] bg-transparent outline-none text-xs text-slate-800 dark:text-white"
            />
        </div>
    );
};

export const FormBuilder: React.FC<{
    onBack: () => void;
    onPreview: () => void;
    formId?: string;
}> = ({ onBack, onPreview, formId }) => {
    const {
        addElement,
        appTheme,
        toggleAppTheme,
        elements,
        reorderElements,
        backgroundUrl,
        customAppBg,
        visibility,
        setVisibility,
        allowedEmails,
        setAllowedEmails,
        companyName,
        theme,
        customCanvasBg,
        customTextColor,
    } = useFormStore();
    const [activeId, setActiveId] = React.useState<string | null>(null);
    const router = useRouter();

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5, // 5px movement before drag starts (allows clicks on buttons to work)
            },
        }),
    );

    const handleDragStart = (event: any) => {
        setActiveId(event.active.id);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        setActiveId(null);
        const { over, active } = event;

        if (!over) return;

        // Handle reordering inside Canvas
        if (active.data.current?.isSortable && over.data.current?.isSortable) {
            if (active.id !== over.id) {
                const oldIndex = elements.findIndex(
                    (el) => el.id === active.id,
                );
                const newIndex = elements.findIndex((el) => el.id === over.id);
                reorderElements(oldIndex, newIndex);
            }
            return;
        }

        // Handle dropping new item from Sidebar
        if (
            !active.data.current?.isSortable &&
            (over.id === "canvas-dropzone" || over.data.current?.isSortable)
        ) {
            const type = active.data.current?.type as ElementType;
            if (type) {
                // If dropped over a sortable item, we could insert it at a specific index,
                // but for simplicity we'll append it for now (or you can calculate index based on over.id)
                const newElement = {
                    id: generateId(),
                    type,
                    x: 0,
                    y: 0,
                    props: {},
                };

                addElement(newElement);

                if (over.id !== "canvas-dropzone") {
                    // It was dropped onto an existing element, let's move it to that position
                    setTimeout(() => {
                        const {
                            elements: currentElements,
                            reorderElements: reorder,
                        } = useFormStore.getState();
                        const oldIndex = currentElements.findIndex(
                            (e) => e.id === newElement.id,
                        );
                        let newIndex = currentElements.findIndex(
                            (e) => e.id === over.id,
                        );
                        // if dropping below half point, maybe insert after, but dnd-kit closestCenter does this ok.
                        if (oldIndex !== -1 && newIndex !== -1) {
                            reorder(oldIndex, newIndex);
                        }
                    }, 0);
                }
            }
        }
    };

    const updateMutation = trpc.form.update.useMutation({
        onSuccess: () => {
            toast.success("Form saved successfully!");
            router.push("/dashboard");
        },
        onError: (err) => toast.error("Failed to save: " + err.message)
    });

    const handleSaveToDB = () => {
        if (!formId) {
            toast.error("No Form ID found to save to.");
            return;
        }

        let dbVisibility: "public" | "unlisted" | "private" = "public";
        let dbStatus: "draft" | "published" | "unpublished" = "published";

        if (visibility === "private") {
            dbVisibility = "private";
            dbStatus = "published";
        } else if (visibility === "unlisted") {
            dbVisibility = "unlisted";
            dbStatus = "draft";
        }

        updateMutation.mutate({
            id: formId,
            title: companyName || "Interactive Form",
            visibility: dbVisibility,
            status: dbStatus,
            allowedEmails: allowedEmails,
            elements: elements,
        });
    };

    return (
        <div
            className={`min-h-screen flex flex-col font-sans transition-colors relative ${appTheme === "dark" ? "dark:bg-black text-slate-100" : "bg-[#f6f4f1] text-slate-900 dark:text-white"}`}
            style={{ backgroundColor: customAppBg || undefined }}
        >
            {/* Background Image Overlay */}
            {backgroundUrl && (
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${backgroundUrl})` }}
                    />
                    <div className="absolute inset-0 bg-white/60 dark:bg-black/70 backdrop-blur-sm transition-colors" />
                </div>
            )}

            {/* Top Navigation / Toolbar */}
            <div className="h-16 md:h-[72px] border-b border-black/10 dark:border-white/70 dark:border-[#6FC3DF] flex items-center justify-between px-6 bg-white/80 dark:bg-black backdrop-blur-xl shadow-sm z-20 transition-colors">
                <div className="flex items-center gap-4">
                    {onBack && (
                        <button
                            onClick={onBack}
                            className="px-4 py-2 rounded-full bg-white/80 dark:bg-black hover:bg-white dark:hover:bg-white/20 transition-colors shadow-sm border border-black/10 dark:border-white/70 dark:border-[#6FC3DF] text-sm font-medium"
                        >
                            ← Back
                        </button>
                    )}
                    <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white dark:text-white">
                        FormFlow Studio
                    </h1>
                </div>

                <div className="flex items-center gap-6">
                    {/* Visibility Controls */}
                    <div className="flex items-center bg-[#f6f4f1]/80 dark:bg-black p-1.5 rounded-full border border-black/10 dark:border-white/70 dark:border-[#6FC3DF]">
                        <button
                            onClick={() => setVisibility("public")}
                            className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-colors ${visibility === "public" ? "bg-white dark:bg-white/20 shadow-sm text-indigo-600 dark:text-sky-300" : "text-slate-500 hover:text-slate-700 dark:text-white dark:hover:text-slate-200"}`}
                        >
                            Public
                        </button>
                        <button
                            onClick={() => setVisibility("private")}
                            className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-colors ${visibility === "private" ? "bg-white dark:bg-white/20 shadow-sm text-indigo-600 dark:text-sky-300" : "text-slate-500 hover:text-slate-700 dark:text-white dark:hover:text-slate-200"}`}
                        >
                            Private
                        </button>
                        <button
                            onClick={() => setVisibility("unlisted")}
                            className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-colors ${visibility === "unlisted" ? "bg-white dark:bg-white/20 shadow-sm text-amber-600 dark:text-amber-300" : "text-slate-500 hover:text-slate-700 dark:text-white dark:hover:text-slate-200"}`}
                        >
                            Unlisted
                        </button>
                    </div>

                    {visibility === "private" && (
                        <div className="flex items-center">
                            <EmailInput emails={allowedEmails} onChange={setAllowedEmails} />
                        </div>
                    )}

                    <div className="flex items-center gap-3 border-l border-black/10 dark:border-white/70 dark:border-[#6FC3DF] pl-6">
                        <button
                            onClick={toggleAppTheme}
                            className="px-4 py-2 rounded-full bg-white/80 dark:bg-black text-slate-600 dark:text-white hover:bg-white dark:hover:bg-white/20 transition-colors shadow-sm border border-black/10 dark:border-white/70 dark:border-[#6FC3DF] text-sm font-medium"
                        >
                            {appTheme === "dark"
                                ? "☀️ Light Mode"
                                : "🌙 Dark Mode"}
                        </button>

                        <button
                            onClick={onPreview}
                            className="px-4 py-2 bg-white/80 dark:bg-black text-slate-700 dark:text-white border border-black/10 dark:border-white/70 dark:border-[#6FC3DF] hover:bg-white dark:hover:bg-white/20 rounded-full font-medium transition-colors shadow-sm"
                        >
                            Preview
                        </button>

                        <button
                            onClick={handleSaveToDB}
                            disabled={updateMutation.isPending}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-full font-semibold transition-all shadow-lg shadow-indigo-600/30 flex items-center gap-2 disabled:opacity-50"
                        >
                            {updateMutation.isPending ? "Saving..." : "Save to DB"}
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden z-10 relative">
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                >
                    <Sidebar />
                    <main className="flex-1 overflow-y-auto p-10 flex justify-center">
                        <Canvas />
                    </main>
                    <DragOverlay>
                        {activeId ? (
                            <div className="p-3 bg-white/90 dark:bg-slate-900/80 shadow-xl rounded-xl border border-indigo-500/40 cursor-grabbing">
                                Dragging Element
                            </div>
                        ) : null}
                    </DragOverlay>
                </DndContext>
            </div>
        </div>
    );
};

export default FormBuilder;
