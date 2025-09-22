"use client"

import * as React from "react"
import {
  AudioWaveform,
  Blocks,
  Calendar,
  Command,
  Home,
  Inbox,
  MessageCircleQuestion,
  Search,
  Settings2,
  Sparkles,
  Trash2,
} from "lucide-react"

import { Social } from "@/components/nav-social"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import {  Utility } from "@/components/nav-utility"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Engagement } from "./nav-engagement"

// This is sample data.
const data = {
  teams: [
    {
      name: "Jungle",
      logo: Command,
      plan: "Enterprise",
    },
    
  ],
  navMain: [
    {
      title: "Search",
      url: "#",
      icon: Search,
    },
    {
      title: "Ask AI",
      url: "#",
      icon: Sparkles,
    },
    {
      title: "Home",
      url: "#",
      icon: Home,
      isActive: true,
    },
    {
      title: "Inbox",
      url: "#",
      icon: Inbox,
      badge: "10",
    },
  ],
  navSecondary: [
    {
      title: "Calendar",
      url: "#",
      icon: Calendar,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
    },
    {
      title: "Templates",
      url: "#",
      icon: Blocks,
    },
    {
      title: "Trash",
      url: "#",
      icon: Trash2,
    },
    {
      title: "Help",
      url: "#",
      icon: MessageCircleQuestion,
    },
  ],
  social: [
    {
      name: "Clubs & Communities",
      url: "#",
      emoji: "📊",
    },
    {
      name: "Gamification & Rewards System",
      url: "#",
      emoji: "🍳",
    },
    
    // {
    //   name: "Daily Habit Tracker & Goal Setting",
    //   url: "#",
    //   emoji: "✅",
    // },
  ],
  utility: [
   
    {
      name: "Events Calendar",
      emoji: "💼",
      pages: [
        {
          name: "Fests",
          url: "#",
          emoji: "🎯",
        },
        {
          name: "Hackathons",
          url: "#",
          emoji: "🧠",
        },
        {
          name: "Cultural Events",
          url: "#",
          emoji: "🤝",
        },
        {
          name: "Club Meetings",
          url: "#",
          emoji: "🤝",
        },
      ],
    },
    
  ],
  engagement: [
   
    {
      name: "Daily polls & Quizzes",
      emoji: "💼",
      pages: [
        {
          name: "Streaks & LeaderBoards",
          url: "#",
          emoji: "🎯",
        },
        {
          name: "Challenges",
          url: "#",
          emoji: "🧠",
        },
      ],
    },
    
  ],
}

export function SidebarLeft({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <div className="flex items-center space-x-2 px-2">
          {/* <TeamSwitcher teams={data.teams} /> --- IGNORE --- */}
          <span className="text-lg font-medium">Jungle</span>
        </div>
        <NavMain items={data.navMain} />
      </SidebarHeader>
      <SidebarContent>
        <Social social={data.social} />
        <Utility utilities={data.utility} />
        <Engagement engagement={data.engagement} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
