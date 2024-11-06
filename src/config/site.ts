export const siteConfig = {
  name: "Battle Stadium",
  description: "A modern tournament platform. Built by the community, for the community.",
};

interface NavbarItemConfig {
  key: string;
  label: string;
}

export const NavbarItemsConfigs: NavbarItemConfig[] = [
  {
    key: "organizations",
    label: "Organizations",
  },
  {
    key: "tournaments",
    label: "Tournaments",
  },
  {
    key: "players",
    label: "Players",
  },
  {
    key: "analytics",
    label: "Analytics",
  },
  {
    key: "dashboard",
    label: "Dashboard",
  }
]

export type SiteConfig = typeof siteConfig;
