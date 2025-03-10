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
    // validators: {
    //   // onChange: userSchema,
    //   onChange: ({ value }) => {
    //     console.log(value);
    //   },
    //   onSubmit: async ({ value }) => {
    //     // Do something with form data
    //     console.log(value);
    //   },
    // },
  });
  return <div>Hello</div>;
};
