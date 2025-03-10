import { Slider } from "@components/stories/atoms/Slider";
import { useForm } from "@tanstack/react-form";
import React from "react";
import { z } from "zod";

const userSchema = z.object({
  currency: z.union([z.literal("INR"), z.literal("USD"), z.literal("EURO")]),
  income: z.number(),
  expenditureRatio: z.number(),
});

export const Home = () => {
  const form = useForm({
    defaultValues: {
      currency: "",
      income: 0.0,
      expenditureRatio: [50],
    },
    validators: {
      // onChange: userSchema,
      onChange: ({ value }) => {
        console.log(value);
      },
      onSubmit: async ({ value }) => {
        // Do something with form data
        console.log(value);
      },
    },
  });
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <form.Field name="income">
          {(field) => {
            return (
              <input
                name={field.name}
                type="number"
                onChange={(e) => field.handleChange(e.target.valueAsNumber)}
                placeholder="Income value"
              />
            );
          }}
        </form.Field>
        <form.Field name="expenditureRatio">
          {(field) => {
            return (
              <Slider
                name={field.name}
                value={field.state.value}
                step={1}
                onValueChange={(value) => field.handleChange(value)}
                className="w-[60%]"
              />
            );
          }}
        </form.Field>
      </form>
    </div>
  );
};
