import Home from './pages/Home.jsx'
import TreatmentsIndex from './pages/TreatmentsIndex.jsx'
import TreatmentDetail from './pages/TreatmentDetail.jsx'
import ConditionsIndex from './pages/ConditionsIndex.jsx'
import ConditionDetail from './pages/ConditionDetail.jsx'
import LocationDetail from './pages/LocationDetail.jsx'
import { PROCEDURES } from './data/procedures.js'
import { CONDITIONS } from './data/conditions.js'
import { LOCATIONS } from './data/locations.js'

export const routes = [
  { path: '/', Component: Home },
  { path: '/about', Component: Home },
  { path: '/team', Component: Home },
  { path: '/treatments', Component: TreatmentsIndex },
  {
    path: '/treatments/:slug',
    Component: TreatmentDetail,
    getStaticPaths: () => PROCEDURES.map((p) => `/treatments/${p.slug}`),
  },
  { path: '/conditions', Component: ConditionsIndex },
  {
    path: '/conditions/:slug',
    Component: ConditionDetail,
    getStaticPaths: () => CONDITIONS.map((c) => `/conditions/${c.slug}`),
  },
  {
    path: '/locations/:slug',
    Component: LocationDetail,
    getStaticPaths: () => LOCATIONS.map((l) => `/locations/${l.slug}`),
  },
  { path: '/insurance', Component: Home },
  { path: '/contact', Component: Home },
  { path: '/blog', Component: Home },
  { path: '/reviews', Component: Home },
  { path: '/privacy', Component: Home },
  { path: '/terms', Component: Home },
  { path: '/accessibility', Component: Home },
]

export default routes
