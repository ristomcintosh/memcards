// makeAxeBuilder is a playwright test fixture that returns a function that can be used to run axe tests on a page
import AxeBuilderBase from "@axe-core/playwright";
import type {
  PlaywrightTestArgs,
  PlaywrightTestOptions,
  PlaywrightWorkerArgs,
  PlaywrightWorkerOptions,
  TestFixture,
} from "@playwright/test";

export const makeAxeBuilder: TestFixture<
  () => AxeBuilder,
  PlaywrightTestArgs &
    PlaywrightTestOptions &
    PlaywrightWorkerArgs &
    PlaywrightWorkerOptions
> = async ({ page }, use) => {
  const makeAxeBuilder = () => new AxeBuilder({ page });
  await use(makeAxeBuilder);
};

export class AxeBuilder extends AxeBuilderBase {
  analyzeWithLogger = async () => {
    const results = await this.analyze();
    if (results.violations.length > 0) {
      console.log("Accessibility violations:", results.violations.length);
      console.log(results.violations);
      console.log(
        "Nodes with violations:",
        results.violations.map((v) => v.nodes),
      );
    }
    return results;
  };
}
