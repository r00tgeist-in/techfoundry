import { createContext, useContext, useEffect, useState } from "react";

export type Route = "/" | "/about" | "/projects" | "/contact";

export const ROUTES: { path: Route; n: string; label: string }[] = [
  { path: "/about", n: "1", label: "About" },
  { path: "/projects", n: "2", label: "Projects" },
  { path: "/contact", n: "3", label: "Contact" },
];

function normalize(pathname: string): Route {
  const clean = pathname.replace(/\/+$/, "").toLowerCase() || "/";
  return clean === "/about" || clean === "/projects" || clean === "/contact" ? clean : "/";
}

interface NavState {
  route: Route;
  navigate: (r: Route) => void;
}

export const NavContext = createContext<NavState>({ route: "/", navigate: () => {} });

export function useNav() {
  return useContext(NavContext);
}

export function useRouter() {
  const [route, setRoute] = useState<Route>(() => normalize(window.location.pathname));

  useEffect(() => {
    const onPop = () => setRoute(normalize(window.location.pathname));
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const navigate = (r: Route) => {
    if (r === route) return;
    window.history.pushState({}, "", r);
    setRoute(r);
  };

  return { route, navigate };
}
