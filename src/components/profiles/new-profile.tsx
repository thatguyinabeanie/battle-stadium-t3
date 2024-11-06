"use client";
import { useRouter } from "next/navigation";

import { createProfile } from "~/app/server-actions/profiles/actions";
import { type AccountMe } from "~/lib/api";
import Form from "next/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface NewProfileProps {
  me: AccountMe;
}

export default function NewProfile({ me }: Readonly<NewProfileProps>) {
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    await createProfile(formData.get("profile") as string, me.id);
    router.push("/dashboard?tab=profiles");
  };

  return (
    <Form action={handleSubmit} className="flex flex-row">
      <Input name="profile" placeholder="new profile" />
      <Button color="primary" type="submit">
        Add Profile
      </Button>
    </Form>
  );
}
