"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

export default function Settings() {

  return (
    <div className="w-full max-w-2xl flex-col p-10 rounded-3xl backdrop-blur border-small border-opacity-15 border-neutral-400">


      <Tabs>
        <TabsList>
          <TabsTrigger value="account" title="Account">Account</TabsTrigger>
          <TabsTrigger value="appearance" title="Appearance">Appearance</TabsTrigger>
          <TabsTrigger value="connections" title="Connections">Connections</TabsTrigger>
        </TabsList>

        <TabsContent value="account">Make changes to your account here.</TabsContent>
        <TabsContent value="appearance">Make changes to the site's appearance here.</TabsContent>
      </Tabs>
    </div>
  );
}
