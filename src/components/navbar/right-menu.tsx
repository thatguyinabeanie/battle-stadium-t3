import React from "react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Badge } from "../ui/badge";
import { Icon } from "@iconify/react/dist/iconify.js";

export function RightMenu() {
  return (
    <div>
      <Button>
        <Icon className="text-default-500" icon="solar:magnifer-linear" width={ 22 } />
      </Button>

      <Link passHref href="/dashboard?tab=settings">
        <Button>
          <Icon className="text-default-500" icon="solar:settings-linear" width={ 24 } />
        </Button>

        <Popover>
          <PopoverTrigger>
            <Badge color="danger" content="5">
              <Icon className="text-default-500" icon="solar:bell-linear" width={ 22 } />
            </Badge>
          </PopoverTrigger>
          <PopoverContent className="max-w-[90vw] p-0 sm:max-w-[380px]">
            <p className="text-center text-default-500 py-4">See all notifications</p>
          </PopoverContent>
        </Popover>
      </Link>
    </div>
  );
}
