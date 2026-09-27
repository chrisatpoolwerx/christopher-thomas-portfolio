import React from 'react';
import { flushSync } from 'react-dom';
import { Link, LinkProps, useNavigate } from 'react-router-dom';

// Page navigation through the View Transitions API: the browser snapshots the old page,
// React renders the new one synchronously, and elements sharing a view-transition-name
// (project title and image) morph between the two. Browsers without support, and users
// who prefer reduced motion, get a plain navigation.

let arrivedViaViewTransition = false;

// Back/forward navigations never go through a view transition
if (typeof window !== 'undefined') {
  window.addEventListener('popstate', () => {
    arrivedViaViewTransition = false;
  });
}

// True when the current page was reached by a view transition, so its hero can skip
// its own entrance animation and let the morph do the work
export const didArriveViaViewTransition = () => arrivedViaViewTransition;

const supportsViewTransitions = () =>
  typeof document !== 'undefined' &&
  'startViewTransition' in document &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const useTransitionNavigate = () => {
  const navigate = useNavigate();
  return (to: string) => {
    if (!supportsViewTransitions()) {
      arrivedViaViewTransition = false;
      navigate(to);
      return;
    }
    (document as Document & { startViewTransition: (cb: () => void) => unknown }).startViewTransition(() => {
      arrivedViaViewTransition = true;
      flushSync(() => navigate(to));
      window.scrollTo(0, 0);
    });
  };
};

// Drop-in replacement for <Link> that navigates with a view transition
export const TransitionLink = React.forwardRef<HTMLAnchorElement, LinkProps & { to: string }>(({ to, onClick, target, ...rest }, ref) => {
  const go = useTransitionNavigate();
  return (
    <Link
      ref={ref}
      to={to}
      target={target}
      {...rest}
      onClick={(event) => {
        onClick?.(event);
        const isModified = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
        if (event.defaultPrevented || event.button !== 0 || isModified || target) return;
        event.preventDefault();
        go(to);
      }}
    />
  );
});

// Shared element names, so the same project's title and image are matched across pages.
// The class lets the stylesheet treat all project titles (or images) the same way.
export const projectTransitionName = (kind: 'title' | 'image', id: string) => `project-${kind}-${id}`;

export const projectTransitionStyle = (kind: 'title' | 'image', id: string, active = true): React.CSSProperties =>
  active ? ({ viewTransitionName: projectTransitionName(kind, id), viewTransitionClass: `project-${kind}` } as React.CSSProperties) : {};
