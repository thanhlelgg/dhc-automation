import {gondola, TestCase, TestModule} from "gondolajs";

TestModule("Simple Test");

TestCase("1st simple test case", () => {
    gondola.navigate("http://google.com");
    gondola.checkWindowExist("Google");
});
