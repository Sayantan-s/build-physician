import { roadmapApi } from "@apis/hooks/useRoadmap";
import { Visibility } from "@components/stories/atoms/Visibility";
import { useSwitch } from "@hooks/useSwitch";
import { FieldApi, useForm } from "@tanstack/react-form";
import { Link, createFileRoute } from "@tanstack/react-router";
import { FormEventHandler } from "react";

export const Route = createFileRoute("/_auth/_layout/roadmaps/")({
  component: Roadmaps,
});

interface ICreateRoadmap {
  name: string;
  description: string;
}

function Roadmaps() {
  const [isOpen, { on, off }] = useSwitch();
  const { mutate, isPending } = roadmapApi.useCreateRoadmap({ redirect: true });
  const { isPending: isFetchingAllRoadmaps, data: roadmaps } =
    roadmapApi.useFetchAllRoadmaps();

  const form = useForm<ICreateRoadmap>({
    defaultValues: { name: "", description: "" },
    onSubmit: async ({ value }) => {
      form.reset();
      await mutate(value);
      off();
    },
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  };

  const handleChange = (
    field: FieldApi<ICreateRoadmap, any, undefined, undefined, string>
  ) => {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      field.handleChange(e.target.value);
    };
  };

  return (
    <div>
      <button onClick={on}>Create Roadmap</button>
      <Visibility show={isOpen}>
        <form onSubmit={handleSubmit}>
          <form.Field
            name="name"
            children={(field) => (
              <input
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={handleChange(field)}
                placeholder="e.g. LifeCycle Builder"
              />
            )}
          />
          <form.Field
            name="description"
            children={(field) => (
              <textarea
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={handleChange(field)}
                placeholder="e.g. Roadmap tool discussions re...."
              />
            )}
          />
          <button disabled={isPending}>{isPending ? "..." : "Create"}</button>
        </form>
      </Visibility>
      {roadmaps?.map((roadmap) => (
        <div key={roadmap.id}>
          <h3>
            <Link to={`/roadmaps/${roadmap.id}/edit`}>{roadmap.name}</Link>
          </h3>
          <p>{roadmap.description}</p>
        </div>
      ))}
    </div>
  );
}
