import { createBrowserRouter } from 'react-router'
import { GalleryPage } from './gallery/GalleryPage'
import { HomePage } from './gallery/HomePage'
import { LabLayout } from './gallery/LabLayout'
import { NotFound } from './gallery/NotFound'
import { Root } from './gallery/Root'
import { WeekPage } from './gallery/WeekPage'

export const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      {
        // Lab chrome: header plus the lab theme
        element: <LabLayout />,
        children: [
          { index: true, element: <HomePage /> },
          { path: 'gallery', element: <GalleryPage /> },
          { path: '*', element: <NotFound /> },
        ],
      },
      // Week pages are full-bleed in their own theme, with no lab chrome
      { path: 'w/:week', element: <WeekPage /> },
    ],
  },
])
