"use client";
import React from "react";
import { useDroppable } from "@dnd-kit/core";
import {
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useFormStore } from "../../lib/form-builder/store";
import { FormElement as IFormElement, ElementType } from "../../lib/form-builder/types";

// Simple rendering for the actual element placed on the canvas
const ElementTitle: React.FC<{ el: IFormElement }> = ({ el }) => {
    const { updateElementProps } = useFormStore();
    return (
        <label
            className="font-semibold text-lg outline-none empty:before:content-[attr(data-placeholder)] empty:before:opacity-50 empty:before:italic cursor-text block mb-3"
            contentEditable
            suppressContentEditableWarning
            data-placeholder="Enter question title..."
            onBlur={(e) =>
                updateElementProps(el.id, {
                    question: e.currentTarget.textContent,
                })
            }
        >
            {el.props.question}
        </label>
    );
};

const CanvasElement: React.FC<{ el: IFormElement }> = ({ el }) => {
    const { updateElementProps } = useFormStore();
    const { type, props } = el;
    switch (type) {
        case "text":
            return (
                <h3
                    className="text-2xl font-semibold tracking-tight border-b border-dashed border-current/20 pb-2 min-w-[200px] outline-none empty:before:content-[attr(data-placeholder)] empty:before:opacity-50 empty:before:italic"
                    contentEditable
                    suppressContentEditableWarning
                    data-placeholder="Enter your heading..."
                    onBlur={(e) =>
                        updateElementProps(el.id, {
                            text: e.currentTarget.textContent,
                        })
                    }
                >
                    {props.text}
                </h3>
            );
        case "short-input":
            return (
                <div className="flex flex-col w-full">
                    <ElementTitle el={el} />
                    <input
                        type="text"
                        placeholder={props.placeholder || "Short answer text"}
                        className="w-full p-3 border border-black/10 dark:border-white/70 dark:border-[#6FC3DF] rounded-xl bg-white/70 dark:bg-black pointer-events-none placeholder:opacity-50 shadow-sm"
                    />
                </div>
            );
        case "long-input":
            return (
                <div className="flex flex-col w-full">
                    <ElementTitle el={el} />
                    <textarea
                        placeholder={
                            props.placeholder || "Long description text..."
                        }
                        className="w-full p-3 border border-black/10 dark:border-white/70 dark:border-[#6FC3DF] rounded-xl bg-white/70 dark:bg-black min-h-[110px] pointer-events-none placeholder:opacity-50 shadow-sm"
                    />
                </div>
            );
        case "email":
            return (
                <div className="flex flex-col w-full">
                    <ElementTitle el={el} />
                    <input
                        type="email"
                        placeholder={props.placeholder || "Email address"}
                        className="w-full p-3 border border-black/10 dark:border-white/70 dark:border-[#6FC3DF] rounded-xl bg-white/70 dark:bg-black pointer-events-none placeholder:opacity-50 shadow-sm"
                    />
                </div>
            );
        case "number":
            return (
                <div className="flex flex-col w-full">
                    <ElementTitle el={el} />
                    <input
                        type="number"
                        placeholder={props.placeholder || "Number"}
                        className="w-full p-3 border border-black/10 dark:border-white/70 dark:border-[#6FC3DF] rounded-xl bg-white/70 dark:bg-black pointer-events-none placeholder:opacity-50 shadow-sm"
                    />
                </div>
            );
        case "date":
            return (
                <div className="flex flex-col w-full">
                    <ElementTitle el={el} />
                    <input
                        type="date"
                        className="w-full p-3 border border-black/10 dark:border-white/70 dark:border-[#6FC3DF] rounded-xl bg-white/70 dark:bg-black pointer-events-none placeholder:opacity-50 shadow-sm text-slate-500"
                    />
                </div>
            );
        case "checkbox":
            return (
                <div className="flex flex-col w-full">
                    <ElementTitle el={el} />
                    <div className="flex items-center gap-2 mt-1">
                        <input type="checkbox" className="w-5 h-5 accent-indigo-500 pointer-events-none" />
                        <span className="text-lg font-medium">{props.label || "Checkbox Label"}</span>
                    </div>
                </div>
            );
        case "dropdown":
            return (
                <div className="flex flex-col w-full">
                    <ElementTitle el={el} />
                    <select className="w-full p-3 border border-black/10 dark:border-white/70 dark:border-[#6FC3DF] rounded-xl bg-white/70 dark:bg-black pointer-events-none shadow-sm text-slate-500">
                        <option>{props.label || "Select an option"}</option>
                    </select>
                </div>
            );
        case "rating":
            return (
                <div className="flex flex-col w-full">
                    <ElementTitle el={el} />
                    <div className="flex gap-2 text-2xl text-amber-400 pointer-events-none mt-1">
                        <span>★</span><span>★</span><span>★</span><span>★</span><span className="text-slate-300 dark:text-slate-600">★</span>
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
                    <ElementTitle el={el} />
                    {options.map((opt: string, i: number) => (
                        <div
                            key={i}
                            className="flex items-center gap-2 group/opt rounded-xl border border-transparent hover:border-black/10 dark:border-white/70 dark:hover:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 px-2 py-1 transition-colors"
                        >
                            <input
                                type={isMulti ? "checkbox" : "radio"}
                                disabled
                                className="accent-indigo-500"
                            />
                            <span
                                className="outline-none empty:before:content-[attr(data-placeholder)] empty:before:opacity-50 cursor-text min-w-[50px] border-b border-transparent focus:border-current hover:border-current/50 flex-1"
                                contentEditable
                                suppressContentEditableWarning
                                data-placeholder={`Option ${i + 1}`}
                                onBlur={(e) => {
                                    const newOptions = [...options];
                                    newOptions[i] =
                                        e.currentTarget.textContent ||
                                        `Option ${i + 1}`;
                                    updateElementProps(el.id, {
                                        options: newOptions,
                                    });
                                }}
                            >
                                {opt}
                            </span>
                            {options.length > 1 && (
                                <button
                                    onClick={() => {
                                        const newOptions = options.filter(
                                            (_: any, idx: number) => idx !== i,
                                        );
                                        updateElementProps(el.id, {
                                            options: newOptions,
                                        });
                                    }}
                                    className="opacity-0 group-hover/opt:opacity-100 text-rose-500 hover:text-rose-600 transition-opacity ml-auto"
                                    title="Remove option"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    ))}
                    <button
                        onClick={() =>
                            updateElementProps(el.id, {
                                options: [
                                    ...options,
                                    `Option ${options.length + 1}`,
                                ],
                            })
                        }
                        className="mt-1 text-sm text-indigo-600 hover:text-indigo-700 font-medium text-left self-start px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 dark:bg-black dark:hover:bg-white/20 rounded-full transition-colors"
                    >
                        + Add Option
                    </button>
                </div>
            );
        case "image":
            return (
                <div className="flex flex-col w-full">
                    <ElementTitle el={el} />
                    {props.url ? (
                        <img
                            src={props.url}
                            alt="User added"
                            className="max-w-full rounded-2xl object-contain h-48 mx-auto pointer-events-none shadow-sm"
                        />
                    ) : (
                        <div className="w-full h-32 bg-black/5 dark:bg-black rounded-2xl flex items-center justify-center opacity-60 italic border-2 border-dashed border-black/10 dark:border-[#6FC3DF]/60 dark:border-white">
                            Click Settings to add Image URL
                        </div>
                    )}
                </div>
            );
        default:
            return <div>Unknown element</div>;
    }
};

const SortableItem: React.FC<{ el: IFormElement }> = ({ el }) => {
    const { removeElement, updateElementProps } = useFormStore();

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: el.id, data: { type: el.type, isSortable: true } });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 100 : 1,
        opacity: isDragging ? 0.5 : 1,
    };

    const handleEdit = (e: React.MouseEvent) => {
        e.stopPropagation(); // prevent drag
        if (el.type === "image") {
            const url = prompt("Enter image URL:", el.props.url || "");
            if (url !== null) updateElementProps(el.id, { url });
        } else if (el.type === "short-input" || el.type === "long-input" || el.type === "email" || el.type === "number") {
            const placeholder = prompt(
                "Enter placeholder text:",
                el.props.placeholder || "",
            );
            if (placeholder !== null)
                updateElementProps(el.id, { placeholder });
        } else if (el.type === "checkbox" || el.type === "dropdown") {
            const label = prompt(
                "Enter label text:",
                el.props.label || "",
            );
            if (label !== null)
                updateElementProps(el.id, { label });
        }

    };

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation(); // prevent drag
        removeElement(el.id);
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="group relative p-4 rounded-2xl border border-transparent hover:border-indigo-500/30 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
        >
            <div
                className="absolute top-2 left-2 p-1 opacity-40 cursor-grab hover:opacity-100 group-hover:opacity-100 transition-opacity"
                {...attributes}
                {...listeners}
            >
                <span className="text-xl">⋮⋮</span>
            </div>

            <div className="pl-6">
                <CanvasElement el={el} />
            </div>

            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2 z-20">
                {el.type !== "text" && (
                    <button
                        onPointerDown={(e) => {
                            e.stopPropagation();
                            updateElementProps(el.id, { required: !el.props.required });
                        }}
                        className={`px-3 py-1.5 rounded-full shadow-md border text-xs font-medium transition-colors ${el.props.required ? "bg-indigo-600 text-white border-indigo-700 hover:bg-indigo-700" : "bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700"}`}
                    >
                        Required {el.props.required ? "On" : "Off"}
                    </button>
                )}
                {["short-input", "long-input", "email", "number", "image", "checkbox", "dropdown"].includes(el.type) && (
                    <button
                        onPointerDown={handleEdit}
                        className="px-3 py-1.5 bg-slate-800 text-slate-200 rounded-full shadow-md border border-slate-700 hover:bg-slate-700 text-xs font-medium transition-colors"
                    >
                        Settings
                    </button>
                )}
                <button
                    onPointerDown={handleDelete}
                    className="px-3 py-1.5 bg-rose-600 text-white rounded-full shadow-md border border-rose-700 hover:bg-rose-700 text-xs font-medium transition-colors"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export const Canvas: React.FC = () => {
    const {
        elements,
        backgroundUrl,
        theme,
        customCanvasBg,
        customTextColor,
        companyName,
        setCompanyName,
    } = useFormStore();
    const { isOver, setNodeRef } = useDroppable({
        id: "canvas-dropzone",
    });

    const getThemeClasses = () => {
        switch (theme) {
            case "dark":
                return "bg-[#0f172a] text-slate-100 ring-1 ring-white/10 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.65)]";
            case "glassmorphism":
                return "bg-white/45 text-slate-900 dark:text-white dark:text-white backdrop-blur-xl ring-1 ring-white/30 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.35)]";
            default:
                return "bg-white text-slate-900 dark:text-white ring-1 ring-slate-200/70 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.35)]";
        }
    };

    return (
        <div className="flex-1 h-full bg-transparent p-10 overflow-y-auto relative flex justify-center items-start transition-colors">
            {backgroundUrl && (
                <div
                    className="absolute inset-0 z-0 opacity-15 bg-cover bg-center"
                    style={{ backgroundImage: `url(${backgroundUrl})` }}
                />
            )}

            <div
                ref={setNodeRef}
                className={`relative z-10 w-full max-w-3xl min-h-[820px] rounded-3xl transition-all duration-300 p-10 md:p-12 flex flex-col gap-8 ${getThemeClasses()} ${isOver ? "ring-2 ring-indigo-500/40 scale-[1.01]" : ""}`}
                style={{
                    backgroundColor: customCanvasBg || undefined,
                    color: customTextColor || undefined,
                }}
            >
                <div className="w-full border-b border-current/20 pb-4 mb-2">
                    <h1
                        className="text-3xl md:text-4xl font-semibold outline-none empty:before:content-[attr(data-placeholder)] empty:before:opacity-40 empty:before:italic cursor-text tracking-tight"
                        contentEditable
                        suppressContentEditableWarning
                        data-placeholder="Company name"
                        onBlur={(e) =>
                            setCompanyName(e.currentTarget.textContent || "")
                        }
                    >
                        {companyName}
                    </h1>
                </div>

                {elements.length === 0 ? (
                    <div className="absolute inset-0 flex items-center justify-center text-slate-400 border-2 border-dashed border-black/10 dark:border-[#6FC3DF]/60 m-8 rounded-2xl pointer-events-none bg-white/40 dark:bg-black">
                        <p className="text-lg">
                            Drag elements here to build your form
                        </p>
                    </div>
                ) : (
                    <SortableContext
                        items={elements.map((e) => e.id)}
                        strategy={verticalListSortingStrategy}
                    >
                        {elements.map((el) => (
                            <SortableItem key={el.id} el={el} />
                        ))}
                    </SortableContext>
                )}
            </div>
        </div>
    );
};
