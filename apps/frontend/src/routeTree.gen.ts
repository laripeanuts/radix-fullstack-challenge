/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as UnauthenticatedImport } from './routes/_unauthenticated'
import { Route as AuthenticatedImport } from './routes/_authenticated'
import { Route as IndexImport } from './routes/index'
import { Route as AuthenticatedDashboardImport } from './routes/_authenticated/dashboard'
import { Route as UnauthenticatedSignUpIndexImport } from './routes/_unauthenticated/sign-up/index'
import { Route as UnauthenticatedSignInIndexImport } from './routes/_unauthenticated/sign-in/index'

// Create/Update Routes

const UnauthenticatedRoute = UnauthenticatedImport.update({
  id: '/_unauthenticated',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticatedRoute = AuthenticatedImport.update({
  id: '/_authenticated',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticatedDashboardRoute = AuthenticatedDashboardImport.update({
  path: '/dashboard',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const UnauthenticatedSignUpIndexRoute = UnauthenticatedSignUpIndexImport.update(
  {
    path: '/sign-up/',
    getParentRoute: () => UnauthenticatedRoute,
  } as any,
)

const UnauthenticatedSignInIndexRoute = UnauthenticatedSignInIndexImport.update(
  {
    path: '/sign-in/',
    getParentRoute: () => UnauthenticatedRoute,
  } as any,
)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/_authenticated': {
      id: '/_authenticated'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthenticatedImport
      parentRoute: typeof rootRoute
    }
    '/_unauthenticated': {
      id: '/_unauthenticated'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof UnauthenticatedImport
      parentRoute: typeof rootRoute
    }
    '/_authenticated/dashboard': {
      id: '/_authenticated/dashboard'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof AuthenticatedDashboardImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_unauthenticated/sign-in/': {
      id: '/_unauthenticated/sign-in/'
      path: '/sign-in'
      fullPath: '/sign-in'
      preLoaderRoute: typeof UnauthenticatedSignInIndexImport
      parentRoute: typeof UnauthenticatedImport
    }
    '/_unauthenticated/sign-up/': {
      id: '/_unauthenticated/sign-up/'
      path: '/sign-up'
      fullPath: '/sign-up'
      preLoaderRoute: typeof UnauthenticatedSignUpIndexImport
      parentRoute: typeof UnauthenticatedImport
    }
  }
}

// Create and export the route tree

interface AuthenticatedRouteChildren {
  AuthenticatedDashboardRoute: typeof AuthenticatedDashboardRoute
}

const AuthenticatedRouteChildren: AuthenticatedRouteChildren = {
  AuthenticatedDashboardRoute: AuthenticatedDashboardRoute,
}

const AuthenticatedRouteWithChildren = AuthenticatedRoute._addFileChildren(
  AuthenticatedRouteChildren,
)

interface UnauthenticatedRouteChildren {
  UnauthenticatedSignInIndexRoute: typeof UnauthenticatedSignInIndexRoute
  UnauthenticatedSignUpIndexRoute: typeof UnauthenticatedSignUpIndexRoute
}

const UnauthenticatedRouteChildren: UnauthenticatedRouteChildren = {
  UnauthenticatedSignInIndexRoute: UnauthenticatedSignInIndexRoute,
  UnauthenticatedSignUpIndexRoute: UnauthenticatedSignUpIndexRoute,
}

const UnauthenticatedRouteWithChildren = UnauthenticatedRoute._addFileChildren(
  UnauthenticatedRouteChildren,
)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '': typeof UnauthenticatedRouteWithChildren
  '/dashboard': typeof AuthenticatedDashboardRoute
  '/sign-in': typeof UnauthenticatedSignInIndexRoute
  '/sign-up': typeof UnauthenticatedSignUpIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '': typeof UnauthenticatedRouteWithChildren
  '/dashboard': typeof AuthenticatedDashboardRoute
  '/sign-in': typeof UnauthenticatedSignInIndexRoute
  '/sign-up': typeof UnauthenticatedSignUpIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/_authenticated': typeof AuthenticatedRouteWithChildren
  '/_unauthenticated': typeof UnauthenticatedRouteWithChildren
  '/_authenticated/dashboard': typeof AuthenticatedDashboardRoute
  '/_unauthenticated/sign-in/': typeof UnauthenticatedSignInIndexRoute
  '/_unauthenticated/sign-up/': typeof UnauthenticatedSignUpIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '' | '/dashboard' | '/sign-in' | '/sign-up'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '' | '/dashboard' | '/sign-in' | '/sign-up'
  id:
    | '__root__'
    | '/'
    | '/_authenticated'
    | '/_unauthenticated'
    | '/_authenticated/dashboard'
    | '/_unauthenticated/sign-in/'
    | '/_unauthenticated/sign-up/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AuthenticatedRoute: typeof AuthenticatedRouteWithChildren
  UnauthenticatedRoute: typeof UnauthenticatedRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AuthenticatedRoute: AuthenticatedRouteWithChildren,
  UnauthenticatedRoute: UnauthenticatedRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_authenticated",
        "/_unauthenticated"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/_authenticated": {
      "filePath": "_authenticated.tsx",
      "children": [
        "/_authenticated/dashboard"
      ]
    },
    "/_unauthenticated": {
      "filePath": "_unauthenticated.tsx",
      "children": [
        "/_unauthenticated/sign-in/",
        "/_unauthenticated/sign-up/"
      ]
    },
    "/_authenticated/dashboard": {
      "filePath": "_authenticated/dashboard.tsx",
      "parent": "/_authenticated"
    },
    "/_unauthenticated/sign-in/": {
      "filePath": "_unauthenticated/sign-in/index.tsx",
      "parent": "/_unauthenticated"
    },
    "/_unauthenticated/sign-up/": {
      "filePath": "_unauthenticated/sign-up/index.tsx",
      "parent": "/_unauthenticated"
    }
  }
}
ROUTE_MANIFEST_END */
