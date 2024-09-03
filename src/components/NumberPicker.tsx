"use client";

import type { TicketPurchaseFields } from "@/components/TicketPurchase";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGameConfig } from "@/hooks/useGameConfig";
import { getRandomPicks } from "@/lib/random";
import { cn } from "@/lib/utils";
import { ErrorMessage } from "@hookform/error-message";
import { DicesIcon, Trash2Icon } from "lucide-react";
import { Controller, type Control } from "react-hook-form";

export function NumberPicker({
  index,
  control,
  name,
  onRemove,
}: {
  index: number;
  control: Control<TicketPurchaseFields>;
  name: `numbers.${number}`;
  onRemove?: (index: number) => void;
}) {
  const { numPicks, maxBallValue } = useGameConfig();

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { value, name, onChange, onBlur },
        fieldState: { error },
        formState: { errors },
      }) => {
        const disabled = value.size === numPicks;
        return (
          <Card className={cn(error && "border-destructive")}>
            <CardHeader>
              <CardTitle>Ticket #{index + 1}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex flex-wrap items-center justify-start gap-2">
                  {[...Array(maxBallValue)].map((_, index) => {
                    const checked = value.has(index + 1);
                    return (
                      <label
                        key={index}
                        className="justify-self-center self-center"
                        htmlFor={`${name}.${index}`}
                      >
                        <input
                          type="checkbox"
                          id={`${name}.${index}`}
                          className="peer hidden"
                          disabled={!checked && disabled}
                          checked={checked}
                          onChange={(e) => {
                            if (e.currentTarget.checked) {
                              onChange(value.add(index + 1));
                            } else {
                              value.delete(index + 1);
                              onChange(value);
                            }
                          }}
                          onBlur={onBlur}
                        />
                        <div className="relative size-12 font-semibold flex items-center justify-center rounded-full border border-input peer-checked:border-primary peer-checked:[&>*]:block cursor-pointer overflow-hidden peer-disabled:opacity-50 peer-disabled:cursor-not-allowed">
                          {index + 1}
                          <span className="hidden absolute text-primary opacity-10 text-4xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            ✗
                          </span>
                        </div>
                      </label>
                    );
                  })}
                </div>
                <ErrorMessage
                  as={<div className="text-destructive text-sm" />}
                  errors={errors}
                  name={name}
                />
              </div>
            </CardContent>
            <CardFooter className="gap-2 justify-between">
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => onChange(getRandomPicks(numPicks, maxBallValue))}
                className="gap-2"
              >
                <DicesIcon size="1em" /> Randomize numbers
              </Button>
              {!!onRemove && (
                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                  onClick={() => onRemove?.(index)}
                  className="size-9"
                >
                  <Trash2Icon className="size-4" />
                </Button>
              )}
            </CardFooter>
          </Card>
        );
      }}
    />
  );
}
