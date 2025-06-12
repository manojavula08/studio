
"use client";

import { useState, useEffect, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { updateUserProfile, getUserProfile, type UserProfileData } from "@/app/actions/user-profile-actions";
import { Loader2 } from "lucide-react";

export function ProfileTab() {
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, startSavingTransition] = useTransition();
  const { toast } = useToast();

  useEffect(() => {
    setIsLoading(true);
    getUserProfile().then(response => {
      if (response.success && response.data) {
        setFullName(response.data.fullName || '');
        setCompanyName(response.data.companyName || '');
        setEmail(response.data.email || 'Not available');
      } else if (!response.success) {
        // Don't show error toast on initial load if profile just doesn't exist yet
        // toast({ title: "Error loading profile", description: response.message, variant: "destructive" });
        console.warn("Failed to load profile or profile not found:", response.message);
        setEmail('Could not load email');
      } else {
        // response.success is true but no data (e.g. new user)
         setEmail(auth.currentUser?.email || 'Not available'); // Try to get from auth directly for new profile
      }
    }).catch(error => {
      console.error("Exception while fetching profile:", error);
      toast({ title: "Error", description: "An exception occurred while fetching your profile.", variant: "destructive" });
    })
    .finally(() => {
      setIsLoading(false);
    });
  }, [toast]);


  const handleProfileSave = () => {
    startSavingTransition(async () => {
      const result = await updateUserProfile({ fullName, companyName });
      if (result.success) {
        toast({ title: "Success", description: result.message });
      } else {
        toast({ title: "Error", description: result.message, variant: "destructive" });
      }
    });
  };

  const handlePasswordUpdate = () => {
    alert("Password update functionality to be implemented separately.");
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
              <AvatarFallback>{fullName ? fullName.charAt(0).toUpperCase() : 'U'}</AvatarFallback>
            </Avatar>
            <Button variant="outline" disabled>Change Picture (soon)</Button>
          </div>
          {isLoading ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input disabled placeholder="Loading..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input disabled placeholder="Loading..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company Name (Optional)</Label>
                <Input disabled placeholder="Loading..." />
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input 
                    id="fullName" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Your Name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" value={email} disabled />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company Name (Optional)</Label>
                <Input 
                  id="company" 
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Your Company Inc." 
                />
              </div>
            </>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={handleProfileSave} disabled={isSaving || isLoading}>
            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isSaving ? "Saving..." : "Save Profile Changes"}
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Change Password</CardTitle>
          <CardDescription>Update your account password. This feature will be available soon.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input id="currentPassword" type="password" placeholder="••••••••" disabled />
          </div>
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input id="newPassword" type="password" placeholder="••••••••" disabled />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input id="confirmPassword" type="password" placeholder="••••••••" disabled />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handlePasswordUpdate} disabled>Update Password (soon)</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

// Need to get auth instance for current user email if profile is new
import { auth } from "@/lib/firebase/firestore";
