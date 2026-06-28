import Hero from '@/components/home/Hero';
import { FeaturedTools, NewTools, CategoryPreview } from '@/components/home/HomeComponents';
import ChatBot from '@/components/chatbot/ChatBot';

export default function HomePage() {
  return (
    <div className="animate-fade-in-up">
      <Hero />
      <FeaturedTools />
      <NewTools />
      <CategoryPreview />
      <ChatBot />
    </div>
  );
}