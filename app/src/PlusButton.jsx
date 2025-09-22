import { useState } from "react";
import { useToast } from "./ToastProvider";

export function AddStructureButton({ onAdd }) {
  const [flash, setFlash] = useState(false);
  const { notify } = useToast();

  const handleClick = () => {
    onAdd?.();                 // <-- your existing add logic
    notify("Added!");
    setFlash(true);
    setTimeout(() => setFlash(false), 350); // brief flash
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={[
        "inline-flex h-8 w-8 items-center justify-center rounded-md border text-base font-bold transition",
        flash
          ? "bg-green-500 border-green-600 text-white"
          : "bg-background border-border hover:bg-accent"
      ].join(" ")}
      aria-label="Add"
      title="Add"
    >
      +
    </button>
  );
}
