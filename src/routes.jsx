import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Team from './pages/Team.jsx'
import Contact from './pages/Contact.jsx'
import Insurance from './pages/Insurance.jsx'
import Reviews from './pages/Reviews.jsx'
import Privacy from './pages/Privacy.jsx'
import Terms from './pages/Terms.jsx'
import Accessibility from './pages/Accessibility.jsx'
import TreatmentsIndex from './pages/TreatmentsIndex.jsx'
import TreatmentDetail from './pages/TreatmentDetail.jsx'
import ConditionsIndex from './pages/ConditionsIndex.jsx'
import ConditionDetail from './pages/ConditionDetail.jsx'
import LocationDetail from './pages/LocationDetail.jsx'
import BlogIndex from './pages/BlogIndex.jsx'
import BlogPost from './pages/BlogPost.jsx'
import { PROCEDURES } from './data/procedures.js'
import { CONDITIONS } from './data/conditions.js'
import { LOCATIONS } from './data/locations.js'
import { BLOG_POSTS } from './data/blog.js'

export const routes = [
  { path: '/', Component: Home },
  { path: '/about', Component: About },
  { path: '/team', Component: Team },
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
  { path: '/blog', Component: BlogIndex },
  {
    path: '/blog/:slug',
    Component: BlogPost,
    getStaticPaths: () => {
      const today = new Date().toISOString().slice(0, 10)
      return BLOG_POSTS
        .filter((p) => !p.publishDate || p.publishDate <= today)
        .map((p) => `/blog/${p.slug}`)
    },
  },
  { path: '/insurance', Component: Insurance },
  { path: '/contact', Component: Contact },
  { path: '/reviews', Component: Reviews },
  { path: '/privacy', Component: Privacy },
  { path: '/terms', Component: Terms },
  { path: '/accessibility', Component: Accessibility },
]

export default routes
