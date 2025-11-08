"use client"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Building2, DollarSign, Package, Users } from "lucide-react"
import Link from "next/link"

interface MobileNavProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function MobileNav({ open, onOpenChange }: MobileNavProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-64 p-0">
        <SheetHeader className="border-b p-4">
          <SheetTitle className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-sm font-bold text-primary-foreground">ERP</span>
            </div>
            <span>Menu</span>
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-1 p-4">
          <Link
            href="/dashboard"
            onClick={() => onOpenChange(false)}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent"
          >
            <Building2 className="h-4 w-4" />
            Dashboard
          </Link>
          <Link
            href="/hr"
            onClick={() => onOpenChange(false)}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
          >
            <Users className="h-4 w-4" />
            HR Management
          </Link>
          <Link
            href="/inventory"
            onClick={() => onOpenChange(false)}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
          >
            <Package className="h-4 w-4" />
            Inventory
          </Link>
          <Link
            href="/accounting"
            onClick={() => onOpenChange(false)}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
          >
            <DollarSign className="h-4 w-4" />
            Accounting
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
