import { createContext, useContext, useEffect, useState } from "react";

export type Route = "/" | "/about" | "/projects" | "/contact";

export const ROUTES: { path: Route; n: string; label: string }[] = [
  { path: "/about", n: "1", label: "About" },
  { path: "/projects", n: "2", label: "Projects" },
  { path: "/contact", n: "3", label: "Contact" },
];

function normalize(pathname: string, hash: string = ""): Route {
  let clean = (pathname || "/").replace(/\/+$/, "").toLowerCase() || "/";
  clean = clean.replace(/\/index\.html$/, "");
  if (!clean || clean === "/") {
    if (hash) {
      const hashClean = hash.replace(/^#\/?/, "").toLowerCase();
      if (hashClean === "about" || hashClean === "projects" || hashClean === "contact") {
        return `/${hashClean}` as Route;
      }
    }
    return "/";
  }
  return clean === "/about" || clean === "/projects" || clean === "/contact" ? (clean as Route) : "/";
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
  const [route, setRoute] = useState<Route>(() =>
    typeof window !== "undefined" ? normalize(window.location.pathname, window.location.hash) : "/"
  );

  useEffect(() => {
    const onPop = () => setRoute(normalize(window.location.pathname, window.location.hash));
    window.addEventListener("popstate", onPop);
    window.addEventListener("hashchange", onPop);
    return () => {
      window.removeEventListener("popstate", onPop);
      window.removeEventListener("hashchange", onPop);
    };
  }, []);

  const navigate = (r: Route) => {
    if (r === route) return;
    window.history.pushState({}, "", r);
    setRoute(r);
  };

  return { route, navigate };
}
