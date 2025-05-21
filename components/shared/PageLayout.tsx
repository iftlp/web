import type { FC, ReactElement, ReactNode } from 'react'
import { Children, isValidElement } from 'react'
import type { LucideIcon } from 'lucide-react'
import { Info } from 'lucide-react'
import { BreadCrumb } from '@/components/shared/breadcrumb/Breadcrumb'

export type PageLayoutProps = {
  children: ReactNode
}

const Root: FC<PageLayoutProps> = ({ children }) => {
  const childrenArray = Children.toArray(children) as ReactElement[]

  const getChildByDisplayName = (name: string) =>
    childrenArray.find(
      (child) =>
        isValidElement(child) && (child.type as FC)?.displayName === name,
    )

  const actions = getChildByDisplayName('Actions')
  const title = getChildByDisplayName('Title')
  const description = getChildByDisplayName('Description')
  const content = getChildByDisplayName('Content')

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <BreadCrumb />
        </div>
        {actions}
      </div>

      {title}
      {description}
      {content}
    </div>
  )
}

const Actions: FC<PageLayoutProps> = ({ children }) => (
  <div className="flex items-center gap-2 pr-4">{children}</div>
)
Actions.displayName = 'Actions'

const Title: FC<PageLayoutProps> = ({ children }) => (
  <h1 className="flex items-center gap-2 px-4 text-2xl font-semibold">
    {children}
  </h1>
)
Title.displayName = 'Title'

const Description: FC<PageLayoutProps & { icon?: LucideIcon }> = ({
  children,
  icon: Comp = Info,
}) => (
  <div className="flex gap-2 px-4 text-sm text-muted-foreground">
    <Comp className="mt-0.5 size-4 shrink-0" />
    <span className="whitespace-pre-line">{children}</span>
  </div>
)
Description.displayName = 'Description'

const Content: FC<PageLayoutProps> = ({ children }) => children
Content.displayName = 'Content'

export const PageLayout = {
  Root,
  Actions,
  Title,
  Description,
  Content,
}
