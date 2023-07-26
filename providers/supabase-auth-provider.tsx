"use client";

import { Profile } from "@/types/collections";
import { Session } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useMemo } from "react";
import useSWR from "swr";
import { useSupabase } from "./supabase-provider";

interface ContextI {
    user: Profile | null | undefined;
    error: any;
    isLoading: boolean;
    mutate: any;
    signOut: () => Promise<void>;
    signInWithSpotify: () => Promise<void>;
}

const Context = createContext<ContextI>({
    user: null,
    error: null,
    isLoading: true,
    mutate: null,
    signOut: async () => {},
    signInWithSpotify: async () => {},
});

export default function SupabaseAuthProvider({
                                                 serverSession,
                                                 children,
                                             }: {
    serverSession?: Session | null;
    children: React.ReactNode;
}) {
    const { supabase } = useSupabase();
    const router = useRouter();

    // Get USER
    const getUser = async () => {
        const { data: user, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", serverSession?.user?.id)
            .single();
        if (error) {
            console.log(error);
            return null;
        } else {
            return user;
        }
    };

    const {
        data: user,
        error,
        isLoading,
        mutate,
    } = useSWR(serverSession ? "profile-context" : null, getUser);

    // Sign Out
    const signOut = async () => {
        await supabase.auth.signOut();
        router.push("/login");
    };

    // Sign-In with Spotify
    const signInWithSpotify = async () => {
        await supabase.auth.signInWithOAuth({ provider: "spotify" });
    };

    // Refresh the Page to Sync Server and Client
    useEffect(() => {
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((event, session) => {
            if (session?.access_token !== serverSession?.access_token) {
                router.refresh();
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [router, supabase, serverSession?.access_token]);

    const exposed: ContextI = useMemo(() => ({
        user,
        error,
        isLoading,
        mutate,
        signOut,
        signInWithSpotify,
    }), [user, error, isLoading, mutate]);

    return <Context.Provider value={exposed}>{children}</Context.Provider>;
}

export const useAuth = () => {
    let context = useContext(Context);
    if (context === undefined) {
        throw new Error("useAuth must be used inside SupabaseAuthProvider");
    } else {
        return context;
    }
};
