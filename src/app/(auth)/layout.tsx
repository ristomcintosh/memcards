import { LogoIconWithText } from "@/components/ui/logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex flex-col border-l-8 border-brand-500 border-t-8 py-4 min-h-full bg-surface-light dark:bg-surface-dark sm:dark:bg-inherit sm:bg-inherit">
      <div className="flex items-center px-8 justify-between">
        <div className="w-32 sm:w-60" aria-hidden="true">
          <LogoIconWithText />
        </div>
        <ThemeToggle />
      </div>
      <div className="flex sm:items-center justify-center flex-1">
        <div className="w-full sm:max-w-lg p-8 sm:p-14 sm:bg-surface-light sm:dark:bg-surface-dark sm:shadow-lg sm:rounded-xl">
          {children}
        </div>
      </div>
    </main>
  );
}
