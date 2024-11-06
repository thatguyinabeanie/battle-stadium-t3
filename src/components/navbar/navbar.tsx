import { auth } from "@clerk/nextjs/server";
import { NavigationMenu,  NavigationMenuList } from "../ui/navigation-menu";
import { getAccountMe } from "~/app/server-actions/accounts/actions";
import NavbarLinks from "./navbar-links";


export default async function Navbar() {
  const clerkAuth = await auth();
  const me = (await getAccountMe())?.data;

  return (
    <NavigationMenu>
      <NavigationMenuList className="space-x-6">

      <NavbarLinks isSignedIn={!!clerkAuth.sessionId} />

      </NavigationMenuList>
    </NavigationMenu>
  )
}
