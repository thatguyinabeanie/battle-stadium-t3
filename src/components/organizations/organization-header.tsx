import { type ReactNode } from "react";
import { type Organization } from "~/lib/api";
import OrganizationLogo from "./organization-logo";

interface OrganizationHeaderProps {
  children: ReactNode;
  organization: Organization;
}

const HEIGHT_WIDTH = 175;

export default function OrganizationHeader({ children, organization }: Readonly<OrganizationHeaderProps>) {
  return (
    <div className="flex flex-row justify-around items-center w-full h-full py-8">
      <OrganizationLogo logoSize={HEIGHT_WIDTH} organization={organization} />

      <div className="flex flex-col justify-between items-center h-full text-center mx-4 ">{children}</div>

      <OrganizationLogo className="hidden sm:flex" logoSize={HEIGHT_WIDTH} organization={organization} />
    </div>
  );
}
