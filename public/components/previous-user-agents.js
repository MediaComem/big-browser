Vue.component('previous-user-agents', {
  data() {
    return {
      uas: []
    };
  },
  beforeMount() {
    loadPreviousUserAgents().then(uas => (this.uas = uas));
  },
  template: `
    <div class='col-lg-8 offset-lg-2' v-if='uas.length'>
      <h2 class='text-secondary'>Big Browser also watched...</h2>
      <div class='list-group mt-4'>
        <div class='list-group-item' v-for='ua in uas'>
          <p>{{ ua.ua }}</p>
          <small>{{ moment(ua.createdAt).format('LLLL') }}</small>
        </div>
      </div>
    </div>
  `
});

function loadPreviousUserAgents() {
  return request({
    url: '/ua'
  });
}
