// app.json을 기반으로 환경별 설정을 동적으로 주입한다.
// - APP_ENV: 'staging'이면 별도 앱(패키지명 .stg 접미사)으로 빌드되어 프로덕션과 공존 가능
// - BUILD_NUMBER: GitHub Actions의 github.run_number (로컬 빌드는 1)
module.exports = ({ config }) => {
  const isStaging = process.env.APP_ENV === 'staging';
  const buildNumber = process.env.BUILD_NUMBER ?? '1';

  return {
    ...config,
    name: isStaging ? `${config.name} (STG)` : config.name,
    ios: {
      ...config.ios,
      buildNumber,
      bundleIdentifier: isStaging
        ? `${config.ios.bundleIdentifier}.stg`
        : config.ios.bundleIdentifier,
    },
    android: {
      ...config.android,
      versionCode: Number(buildNumber),
      package: isStaging ? `${config.android.package}.stg` : config.android.package,
    },
  };
};
