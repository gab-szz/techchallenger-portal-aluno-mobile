const {
  withMainActivity,
  withAndroidManifest,
} = require("@expo/config-plugins");
const {
  mergeContents,
} = require("@expo/config-plugins/build/utils/generateCode");

module.exports = function withDisableScreenshotProtection(config) {
  config = withMainActivity(config, async (config) => {
    const mainActivity = config.modResults;

    if (mainActivity.language === "java") {
      const onCreateMethod = mainActivity.contents.match(
        /protected void onCreate\(Bundle savedInstanceState\) \{[\s\S]*?\n\s*\}/
      );

      if (onCreateMethod) {
        const newContent = onCreateMethod[0].replace(
          /super\.onCreate\(savedInstanceState\);/,
          `super.onCreate(savedInstanceState);
    getWindow().clearFlags(android.view.WindowManager.LayoutParams.FLAG_SECURE);`
        );
        mainActivity.contents = mainActivity.contents.replace(
          onCreateMethod[0],
          newContent
        );
      }
    }

    return config;
  });

  return config;
};
