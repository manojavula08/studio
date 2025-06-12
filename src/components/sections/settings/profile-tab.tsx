
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import {
  getUserProfile,
  updateUserProfile,
} from "@/app/actions/user-profile-actions";

export function ProfileTab() {
  const { toast } = useToast();
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");

  useEffect(() => {
    const uid = localStorage.getItem("uid");
    if (!uid) return;
    getUserProfile(uid).then((res) => {
      if (res.success && res.data) {
        setFullName(res.data.fullName || "");
        setCompanyName(res.data.company || "");
      }
    });
  }, []);

  const handleProfileSave = async () => {
    const uid = localStorage.getItem("uid");
    if (!uid) {
      toast({ title: "Error", description: "User not logged in" });
      return;
    }
    const result = await updateUserProfile(uid, fullName, companyName);
    if (result.success) {
      toast({ title: "Profile updated" });
    } else {
      toast({
        title: "Error",
        description: result.error || "Failed to update profile",
        variant: "destructive",
      });
    }
  };

  const handlePasswordUpdate = () => {
    toast({ title: "Password update attempted (placeholder)" });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Profile Information</CardTitle>
          <CardDescription>Update your personal details and profile picture.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src="https://placehold.co/100x100.png" alt="User avatar" data-ai-hint="user avatar professional" />
              <AvatarFallback>AC</AvatarFallback>
            </Avatar>
            <Button variant="outline">Change Picture</Button>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" disabled />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="company">Company Name (Optional)</Label>
            <Input
              id="company"
              placeholder="Your Company Inc."
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleProfileSave}>Save Profile Changes</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Change Password</CardTitle>
          <CardDescription>Update your account password. For security, you'll need to enter your current password.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input id="currentPassword" type="password" placeholder="••••••••" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input id="newPassword" type="password" placeholder="••••••••" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input id="confirmPassword" type="password" placeholder="••••••••" />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handlePasswordUpdate}>Update Password</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
