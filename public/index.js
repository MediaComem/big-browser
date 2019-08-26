const app = new Vue({
  el: '#app',
  data: {},
  template: `
    <div class='text-center mb-5'>
      <current-user-agent />
      <previous-user-agents class='mt-5' />
    </div>
  `
});