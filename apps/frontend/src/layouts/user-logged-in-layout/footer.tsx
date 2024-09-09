import { Button } from '@/components/ui/button';
import { CircleArrowOutUpRight } from 'lucide-react';

export const Footer = () => (
  <footer className="py-4 mx-auto">
    <div className="flex items-center gap-4">
      <span className="text-center">Developer by Larissa Rabelo</span>
      <Button
        variant="ghost"
        className="p-2"
        onClick={() => {
          window.open('https://www.larissarabelo.com', '_blank');
        }}
      >
        <CircleArrowOutUpRight />
      </Button>
    </div>
  </footer>
);
