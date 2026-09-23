/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Destinations from './components/Destinations';
import Itinerary from './components/Itinerary';
import Gallery from './components/Gallery';
import VideoGallery from './components/VideoGallery';
import Members from './components/Members';
import BaliQuiz from './components/BaliQuiz';
import Guestbook from './components/Guestbook';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-[#0c0c0e] text-[#f4f4f2] flex flex-col selection:bg-amber-400 selection:text-zinc-950 font-sans">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Destinations />
        <Itinerary />
        <Gallery />
        <VideoGallery />
        <Members />
        <BaliQuiz />
        <Guestbook />
      </main>
      <Footer />
    </div>
  );
}
