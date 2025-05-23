'use client'

import { Collapsible } from '@/components/ui/collapsible'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import * as React from 'react'
import type { SidebarLinkType } from '@/types/sidebar'

export function NavGroup({
  pages,
  title,
}: {
  title?: string
  pages: SidebarLinkType[]
}) {
  const pathname = usePathname()
  return (
    <SidebarGroup>
      {title && <SidebarGroupLabel>{title}</SidebarGroupLabel>}
      <SidebarMenu>
        {pages.map((item) => {
          const isActive = pathname.startsWith(item.url)
          return (
            <Collapsible key={item.name} asChild className="group/collapsible">
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip={item.name}
                  asChild
                  isActive={isActive}
                >
                  <Link href={item.url}>
                    {item.icon && (
                      <item.icon className={isActive ? 'text-primary' : ''} />
                    )}
                    <span>{item.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </Collapsible>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
