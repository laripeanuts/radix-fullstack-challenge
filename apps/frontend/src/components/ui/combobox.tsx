import { Check, ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils/cn';

export type ComboboxSelectOption = {
  value: string;
  label: string;
};

type ComboboxProps = {
  placeholder?: string;
  value?: string | null;
  setValue: (value: string) => void;
  options: ComboboxSelectOption[];
  autoFocus?: boolean;
};

export function Combobox({
  placeholder = 'Select',
  options,
  value,
  setValue,
  autoFocus = false,
}: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [localValue, setLocalValue] = useState(value || '');
  const allOptions = [{ value: '', label: placeholder }, ...options];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between w-full"
          autoFocus={autoFocus}
        >
          {localValue
            ? allOptions.find((option) => option.value === localValue)?.label
            : placeholder}
          <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-full p-0 popover-content-width-full"
        align="start"
      >
        <Command>
          <CommandInput placeholder="Search equipment..." />
          <CommandList>
            <CommandEmpty>No equipment found.</CommandEmpty>
            <CommandGroup>
              {allOptions.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  disabled={option.value === ''}
                  onSelect={(currentValue) => {
                    if (currentValue !== '') {
                      const newValue =
                        currentValue === localValue ? '' : currentValue;
                      setValue(newValue);
                      setLocalValue(newValue);
                      setOpen(false);
                    }
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      localValue === option.value ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
