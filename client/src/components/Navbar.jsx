import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink } from "@/components/ui/navigation-menu"

export default function Navbar({ page, setPage, setIsLoggedIn }) {
  const currentPage =
    page === "dashboard" ? "Dashboard" :
    page === "pos" ? "POS" :
    page === "inventory" ? "Inventory" :
    ""
  return (
    <div className="flex justify-between items-center px-8 py-3 bg-[#9d1a1f] shadow-md text-white">

      <div className="flex items-center gap-3">
        <img
          src="/assets/images/LoveCee_Logo.png"
          alt="Love Cee Logo"
          className="w-15 h-15 object-contain drop-shadow-sm"
        />
        <h1 className="text-2xl font-bold tracking-wide">Love, Cee</h1>
      </div>
      

      <NavigationMenu className="pr-5">
        <NavigationMenuList>

          {/* MAIN MENU */}
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-white/15 text-white px-5 py-2 rounded-xl hover:bg-white/25 transition font-semibold">
              {currentPage}
            </NavigationMenuTrigger>

            <NavigationMenuContent className="bg-white rounded-md shadow-2xl p-2 min-w-fit">

              <NavigationMenuLink
                className={`block px-4 py-2 rounded-lg cursor-pointer text-[#9d1a1f] transition hover:bg-[#f4f0e5] ${
                  page === "dashboard" && "bg-[#f4f0e5] font-bold"
                }`}
                onClick={() => setPage("dashboard")}
              >
                Dashboard
              </NavigationMenuLink>

              <NavigationMenuLink
                className={`block px-4 py-2 rounded-lg cursor-pointer text-[#9d1a1f] transition hover:bg-[#f4f0e5] ${
                  page === "pos" && "bg-[#f4f0e5] font-bold"
                }`}
                onClick={() => setPage("pos")}
              >
                POS
              </NavigationMenuLink>

              <NavigationMenuLink
                className={`block px-4 py-2 rounded-lg cursor-pointer text-[#9d1a1f] transition hover:bg-[#f4f0e5] ${
                  page === "inventory" && "bg-[#f4f0e5] font-bold"
                }`}
                onClick={() => setPage("inventory")}
              >
                Inventory
              </NavigationMenuLink>

              <NavigationMenuLink
                className={`block px-4 py-2 rounded-lg cursor-pointer text-[#9d1a1f] transition hover:bg-[#f4f0e5] ${
                  page === "inventory" && "bg-[#f4f0e5] font-bold"
                }`}
                onClick={() => setIsLoggedIn(false)}
              >
                Logout
              </NavigationMenuLink>

            </NavigationMenuContent>
          </NavigationMenuItem>

        </NavigationMenuList>
      </NavigationMenu>

    </div>
  )
}
