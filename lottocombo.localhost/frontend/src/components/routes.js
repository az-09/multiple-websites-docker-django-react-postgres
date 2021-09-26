import AboutPage from "../views/AboutPage"
import WinNumsPage from "../views/WinNumsPage"
import QuickPicksPage from "../views/QuickPicksPage"
import TopOccurPage from "../views/TopOccurPage"

const routes = [
    {
        path: '/top-occurrence',
        component: TopOccurPage,
        title: 'Top Occurrence',
    },{
        path: '/about',
        component: AboutPage,
        title: 'About',
    },
    {
        path: '/winning-numbers',
        component: WinNumsPage,
        title: 'Winning Numbers',
    },
    {
        path: '/quick-picks',
        component: QuickPicksPage,
        title: 'Quick Picks',
    },
]

export default routes