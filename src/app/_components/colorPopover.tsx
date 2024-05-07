"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { flat, gradients, greys, pastels } from "../_data/colors";
import { updateCategory } from "~/server/queries";
import { ICategory } from "../_interfaces";
import { toast } from "sonner";
import { IconPalette } from "../_assets/icons";
import { useState } from "react";

export default function ColorPopover({ category }: { category: ICategory }) {
  const [chosen, setChosen] = useState<boolean>(false);

  return (
    <Popover open={chosen}>
      <PopoverTrigger asChild>
        <button onClick={() => setChosen(true)}>
          <IconPalette
            style={{
              color:
                category.color[0] === "l"
                  ? category.color.split(",")[1]
                  : category.color,
            }}
          />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap gap-2">
            {greys.map((color, index) => (
              <div
                key={index}
                className="h-5 w-5 rounded"
                style={{
                  background: color,
                  border: color === category.color ? "3px solid #22c55e" : "",
                }}
                onClick={async () => {
                  const { error } = await updateCategory(
                    category.id,
                    "color",
                    color,
                  );
                  if (error) toast.error(error);
                  setChosen(false);
                }}
              />
            ))}
          </div>
          <div className="h-[1px] bg-zinc-200 dark:bg-zinc-800" />
          <div className="flex flex-wrap gap-2">
            {pastels.map((color, index) => (
              <div
                key={index}
                className="h-5 w-5 rounded"
                style={{
                  background: color,
                  border: color === category.color ? "3px solid #22c55e" : "",
                }}
                onClick={async () => {
                  const { error } = await updateCategory(
                    category.id,
                    "color",
                    color,
                  );
                  if (error) toast.error(error);
                  setChosen(false);
                }}
              />
            ))}
          </div>
          <div className="h-[1px] bg-zinc-200 dark:bg-zinc-800" />
          <div className="flex flex-wrap gap-2">
            {flat.map((color, index) => (
              <div
                key={index}
                className="h-5 w-5 rounded"
                style={{
                  background: color,
                  border: color === category.color ? "3px solid #22c55e" : "",
                }}
                onClick={async () => {
                  const { error } = await updateCategory(
                    category.id,
                    "color",
                    color,
                  );
                  if (error) toast.error(error);
                  setChosen(false);
                }}
              />
            ))}
          </div>
          <div className="h-[1px] bg-zinc-200 dark:bg-zinc-800" />
          <div className="flex gap-2">
            {gradients.map((color, index) => (
              <div
                key={index}
                className="h-5 w-5 rounded"
                style={{
                  background: color,
                  border: color === category.color ? "3px solid #22c55e" : "",
                }}
                onClick={async () => {
                  const { error } = await updateCategory(
                    category.id,
                    "color",
                    color,
                  );
                  if (error) toast.error(error);
                  setChosen(false);
                }}
              />
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
