import { FieldApi, useForm } from "@tanstack/react-form";
import { createFileRoute } from "@tanstack/react-router";
import { FormEventHandler } from "react";

export const Route = createFileRoute("/_noauth/test")({
  component: Test,
});

interface IParticipantDetail {
  name: string;
  email: string;
}

interface IInviteParticipants {
  candidate: IParticipantDetail;
  interviewer: IParticipantDetail;
  language: string;
}

function Test() {
  const form = useForm<IInviteParticipants>({
    defaultValues: {
      candidate: {
        name: "",
        email: "",
      },
      interviewer: { name: "", email: "" },
      language: "",
    },
    onSubmit: async ({ value }) => {
      form.reset();
      console.log(value);
    },
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  };

  const handleChange = (
    field: FieldApi<IInviteParticipants, any, undefined, undefined, string>
  ) => {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      field.handleChange(e.target.value);
    };
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <form.Field
          name="candidate.name"
          children={(field) => (
            <input
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={handleChange(field)}
              placeholder="e.g. Candidate Name"
            />
          )}
        />
        <form.Field
          name="candidate.email"
          children={(field) => (
            <textarea
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={handleChange(field)}
              placeholder="e.g. rajesh.89@gma..."
            />
          )}
        />
        <form.Field
          name="interviewer.name"
          children={(field) => (
            <input
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={handleChange(field)}
              placeholder="e.g. Interviewer Name"
            />
          )}
        />
        <form.Field
          name="interviewer.email"
          children={(field) => (
            <textarea
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={handleChange(field)}
              placeholder="e.g. xavi.89@gma..."
            />
          )}
        />
        <button>Send Invites</button>
      </form>
    </div>
  );
}
