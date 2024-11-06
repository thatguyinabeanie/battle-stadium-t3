"use client";

import { Profile } from "~/lib/api";
import { Input } from "~/components/ui/input";


interface ProfilesAutocompleteProps {
  profiles: Profile[];
}

export default function ProfilesAutocomplete({ profiles }: Readonly<ProfilesAutocompleteProps>) {
  return (
    <div>
      <Input type="text" list="profiles" placeholder="Select profile" />
    </div>
  );
}

