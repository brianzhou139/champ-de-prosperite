/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 */

interface IRoute{
  path?: string
  icon?: string
  name: string
  routes?: IRoute[]
  checkActive?(pathname: String, route: IRoute): boolean
  exact?: boolean
}

export function routeIsActive (pathname: String, route: IRoute): boolean {
  if (route.checkActive) {
    return route.checkActive(pathname, route)
  }

  return route?.exact
    ? pathname == route?.path
    : (route?.path ? pathname.indexOf(route.path) === 0 : false)
}

const routes: IRoute[] = [
  {
    path: '/', // the url
    icon: 'HomeIcon', // the component being exported from icons/index.js
    name: 'Weather News', // name that appear in Sidebar
    exact: true,
  },
  /*
  {
    path: '/dashboard/announcements',
    icon: 'BellIcon',
    name: 'Announcements',
  },*/
  {
    path: '/dashboard/market-guide',
    icon: 'ChartIcon',
    name: 'Market Guide',
  },
  {
    path: '/dashboard/import-from-url',
    icon: 'DocumentDownIcon',
    name: 'Import Web Article',
  },
  {
    path: '/dashboard/farmers',
    icon: 'PeopleIcon',
    name: 'Farmers',
  },
  {
    path: '/dashboard/admins',
    icon: 'UserPlusIcon',
    name: 'Admins',
  },
  {
    path: '/dashboard/apk-and-bundle',
    icon: 'AndroidIcon',
    name: 'Apk And Bundle',
  },
]

export type {IRoute}
export default routes;
