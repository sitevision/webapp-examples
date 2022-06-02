import router from "@sitevision/api/common/router";

export default () => {
  window.navigator.serviceWorker
    .register(router.getStandaloneUrl("/service-worker.js"), {
      scope: "/",
    })
    .then(() => {
      console.log("service worker registered");
    });
};
