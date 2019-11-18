import {gondola, TestCase, TestModule} from "gondolajs";

TestModule("Simple Test");

Before(() => {
    gondola.navigate("http://google.com");
});

TestCase("1st simple test case", () => {
    // gondola.navigate("http://google.com");
    gondola.checkWindowExist("Google");
});

TestCase("2st simple test case", () => {
    gondola.checkWindowExist("Google");
});
