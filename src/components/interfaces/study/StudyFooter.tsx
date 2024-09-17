import { Button } from "@/components/ui/button";

export type StudyFooterProps = {
  flipCard: () => void;
  nextCard: () => void;
};

export const StudyFooter = ({ flipCard, nextCard }: StudyFooterProps) => (
  <section className="py-3 dark:bg-zinc-700 dark:border-t-zinc-400/80 bg-zinc-50 border-t">
    <div className="flex justify-around max-w-md mx-auto">
      <Button size="lg" variant="outline" onClick={flipCard}>
        Flip
      </Button>
      <Button size="lg" onClick={nextCard}>
        Next
      </Button>
    </div>
  </section>
);
