import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navigation = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Registration", path: "/registration" },
    { name: "AI Workshops", path: "/ai-workshops" },
    { name: "Learning Apps", path: "/learning-apps" },
    { name: "MCCP 6020", path: "/mccp" },
  ];

  return (
    <nav className="bg-gradient-header">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center space-x-3">
            <div className="text-primary-foreground">
              <h1 className="text-xl font-bold">HKBU Language Centre</h1>
              <p className="text-sm opacity-90 hidden sm:block">English for Research Publication</p>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "px-6 py-2 rounded-md text-sm font-medium transition-all",
                  location.pathname === item.path || (item.path === "/mccp" && location.pathname.startsWith("/mccp"))
                    ? "bg-primary-foreground/20 text-primary-foreground"
                    : "text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
          
          {/* Mobile Navigation - Hamburger Menu */}
          <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] bg-background">
                <SheetHeader>
                  <SheetTitle className="text-left">Navigation</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col space-y-2 mt-6">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "px-4 py-3 rounded-md text-base font-medium transition-all",
                        location.pathname === item.path || (item.path === "/mccp" && location.pathname.startsWith("/mccp"))
                          ? "bg-primary/10 text-primary"
                          : "text-foreground hover:bg-muted"
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
