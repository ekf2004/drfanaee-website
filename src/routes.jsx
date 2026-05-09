import Home from './pages/Home.jsx'
import TreatmentsIndex from './pages/TreatmentsIndex.jsx'
import TreatmentDetail from './pages/TreatmentDetail.jsx'
import { PROCEDURES } from './data/procedures.js'

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
  { path: '/conditions', Component: Home },
  { path: '/locations/west-islip', Component: Home },
  { path: '/locations/smithtown', Component: Home },
  { path: '/locations/bellmore', Component: Home },
  { path: '/insurance', Component: Home },
  { path: '/contact', Component: Home },
  { path: '/blog', Component: Home },
  { path: '/reviews', Component: Home },
  { path: '/privacy', Component: Home },
  { path: '/terms', Component: Home },
  { path: '/accessibility', Component: Home },
]

export default routes
