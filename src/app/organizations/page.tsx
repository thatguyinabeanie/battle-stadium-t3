import { type Metadata } from "next";

import { type Tournament } from "~/lib/api";
import PartneredOrganizations from "~/components/organizations/partnered-organizations";


export const metadata: Metadata = {
  title: "Organizations",
};

export interface OrganizationsPageProps {
  orgs: Tournament[];
}

export default async function OrganizationsPage() {
  return (
    <>
      <div className="pt-2" />

      <PartneredOrganizations />

      {/* <NextUiTable /> */}
    </>
  );
}
