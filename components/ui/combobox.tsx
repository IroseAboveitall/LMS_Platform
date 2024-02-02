"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ComboboxProps {
  options: { label: string; value: string; categoryId: string }[];
  categoryId?: string; // default value : it is categoryId
  onChange: (value: string) => void;
}

// export const Combobox = ({ options, value, onChange }: ComboboxProps) => {
export const Combobox = ({ options, categoryId, onChange }: ComboboxProps) => {
  const [open, setOpen] = React.useState(false);
  // const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[230px] justify-between"
        >
          {categoryId
            ? options.find((option) => option.categoryId === categoryId)?.label
            : "Select option..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[230px] p-0">
        <Command>
          <CommandInput placeholder="Search option..." />
          <CommandEmpty>No option found.</CommandEmpty>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                key={option.value}
                value={option.value}
                // value={option.categoryId}
                onSelect={() => {
                  // onChange(currentValue === value ? "" : currentValue);
                  onChange(
                    option.categoryId === categoryId ? "" : option.categoryId
                  );
                  // onChange(
                  //   option.categoryId === categoryId ? "" : option.value
                  // );
                  // setValue(currentValue === value ? "" : currentValue);
                  // setValue(option.value === value ? "" : option.value);
                  // setValue(option.value === value1 ? "" : option.value);
                  // const value = options.find(
                  //   (option) => option.label.toLowerCase() === currentValue
                  // )?.value;
                  // setValue(value ?? "");
                  // setValue(option.value === value ? "" : option.value);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    categoryId === option.categoryId
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
