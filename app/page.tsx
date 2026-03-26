"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";
import { useLogin } from "./services/query";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store";

export default function Home() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const router = useRouter();

  // 1. Hook into the Zustand store action
  const setAuth = useAuthStore((state) => state.setAuth);

  // 2. The login mutation
  const { mutate, isPending } = useLogin();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    mutate(
      { email, password },
      {
        onSuccess: (data) => {
          if (data.success) {
            setAuth({
              token: data.token,
              user: data.user
            });

            console.log(`Welcome back, ${data.user.name}`);

            // 4. Redirect to dashboard
            router.push("/dashboard");
          }
        },
        onError: (error: any) => {
          // Extract specific error message if your API provides one
          const msg = error.response?.data?.message || "Invalid credentials. Please try again.";
          setErrorMessage(msg);
        },
      }
    );
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 relative overflow-hidden font-sans">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none flex justify-center items-center">
        <div className="w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-sidebar-primary/5 rounded-full blur-3xl absolute -top-40 -left-20" />
        <div className="w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] bg-primary/5 rounded-full blur-3xl absolute -bottom-40 -right-20" />
      </div>

      <div className="z-10 w-full max-w-md bg-card text-card-foreground border border-border/40 shadow-2xl rounded-2xl overflow-hidden backdrop-blur-xl">
        <div className="p-8 pb-6 flex flex-col items-center">
          <Image
            src="/assets/logo.png"
            alt="ZPL Logo"
            width={40}
            height={40}
            className="h-10 w-auto"
            priority
          />
          <h1 className="text-2xl font-bold tracking-tight text-foreground mb-1">Welcome Captains!</h1>
          <p className="text-sm text-muted-foreground text-center">
            Sign in to your ZPL team dashboard
          </p>
        </div>

        <div className="px-8 pb-8">
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="teamname@zpl.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 px-4 rounded-xl bg-background/50 focus:bg-background transition-colors"
                disabled={isPending}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-foreground">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-12 px-4 rounded-xl bg-background/50 focus:bg-background transition-colors"
                disabled={isPending}
              />
            </div>

            {errorMessage && (
              <div className="text-sm font-medium text-destructive bg-destructive/10 p-3.5 rounded-xl flex items-center gap-2.5 animate-in fade-in zoom-in-95 duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                {errorMessage}
              </div>
            )}

            <Button
              type="submit"
              className="w-full h-12 text-base font-medium rounded-xl mt-4 bg-primary hover:opacity-90 transition-all shadow-md disabled:opacity-70"
              disabled={isPending}
            >
              {isPending ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
                  <span>Signing in...</span>
                </div>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </div>

        <div className="bg-muted/30 p-4 border-t border-border/40 flex justify-center items-center">
          <p className="text-[13px] text-muted-foreground/80 font-medium">
            ZPL Managers &copy; {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </div>
  );
}