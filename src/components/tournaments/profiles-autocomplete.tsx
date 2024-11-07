"use client";

import { type Profile } from "~/lib/api";
import { Input } from "~/components/ui/input";


interface ProfilesAutocompleteProps {
  profiles: Profile[];
}

export default function ProfilesAutocomplete({ profiles }: Readonly<ProfilesAutocompleteProps>) {
  console.log('profiles', profiles);  // eslint-disable-line no-console
  return (
    <div>
      <Input type="text" list="profiles" placeholder="Select profile" />
    </div>
  );
}

