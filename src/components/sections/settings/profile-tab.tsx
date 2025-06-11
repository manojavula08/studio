
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function ProfileTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Profile Information</CardTitle>
        <CardDescription>Update your personal details and profile picture.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center space-x-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src="https://placehold.co/100x100.png" alt="User avatar" data-ai-hint="user avatar professional" />
            <AvatarFallback>UP</AvatarFallback>
          </Avatar>
          <Button variant="outline">Change Picture</Button>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input id="fullName" defaultValue="Alex Chen" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" defaultValue="alex.chen@example.com" disabled />
          </div>
        </div>
         <div className="space-y-2">
            <Label htmlFor="company">Company Name (Optional)</Label>
            <Input id="company" placeholder="Your Company Inc." />
          </div>
      </CardContent>
      <CardFooter>
        <Button>Save Changes</Button>
      </CardFooter>
    </Card>
  );
}
