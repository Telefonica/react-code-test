// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

const originalConsoleWarn = console.warn;

jest.setTimeout(30000);

beforeEach(() => {
    jest.spyOn(global.console, "warn").mockImplementation((...args) => {
        // There is a known issue in JSS that makes this warning to trigger when rendering in Node
        if (
            args[0].includes(
                '[JSS] Rule is not linked. Missing sheet option "link: true"'
            )
        ) {
            return;
        }
        originalConsoleWarn(...args);
    });
});
